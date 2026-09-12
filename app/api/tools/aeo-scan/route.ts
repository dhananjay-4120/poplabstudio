import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface DiagnosticResult {
  url: string;
  domain: string;
  overallScore: number;
  ratingLabel: 'CRITICAL' | 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT';
  ratingColor: string;
  summaryText: string;
  pageType: string;
  radarData: {
    aeo: number;
    geo: number;
    crawlers: number;
    techSeo: number;
    contentQuality: number;
    pageSpeed: number;
  };
  metrics: {
    aeo: { score: number; status: string; label: string };
    geo: { score: number; status: string; label: string };
    crawlers: { score: number; status: string; label: string };
    techSeo: { score: number; status: string; label: string };
    contentQuality: { score: number; status: string; label: string };
    pageSpeed: { score: number; status: string; label: string };
  };
  badges: {
    schemasCount: number;
    questionHeadingsCount: number;
    wordCount: number;
    https: boolean;
    hasLlmsTxt: boolean;
  };
  unlockedHighlights: string[];
  gatedFindings: {
    category: string;
    severity: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
    impact: string;
  }[];
}

// In-memory rate limiting map (IP -> timestamps array)
const scanRateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_SCANS_PER_WINDOW = 6; // Max 6 scans per minute per IP

function isScanRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = scanRateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_SCANS_PER_WINDOW) {
    return true;
  }
  validTimestamps.push(now);
  scanRateLimitMap.set(ip, validTimestamps);
  return false;
}

function isBlockedTarget(hostname: string): boolean {
  const clean = hostname.toLowerCase().trim();
  if (
    clean === 'localhost' ||
    clean === '127.0.0.1' ||
    clean === '0.0.0.0' ||
    clean.endsWith('.internal') ||
    clean.endsWith('.local') ||
    clean.startsWith('192.168.') ||
    clean.startsWith('10.') ||
    clean.startsWith('172.16.') ||
    clean.startsWith('172.17.') ||
    clean.startsWith('172.18.') ||
    clean.startsWith('172.19.') ||
    clean.startsWith('172.20.') ||
    clean.startsWith('172.21.') ||
    clean.startsWith('172.22.') ||
    clean.startsWith('172.23.') ||
    clean.startsWith('172.24.') ||
    clean.startsWith('172.25.') ||
    clean.startsWith('172.26.') ||
    clean.startsWith('172.27.') ||
    clean.startsWith('172.28.') ||
    clean.startsWith('172.29.') ||
    clean.startsWith('172.30.') ||
    clean.startsWith('172.31.') ||
    clean.startsWith('169.254.')
  ) {
    return true;
  }
  // Must have at least one dot to be a valid domain
  if (!clean.includes('.') || clean.length < 4 || clean.length > 150) {
    return true;
  }
  return false;
}

function cleanDomain(input: string): { normalizedUrl: string; hostname: string } {
  let trimmed = input.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'https://' + trimmed;
  }
  try {
    const parsed = new URL(trimmed);
    return { normalizedUrl: parsed.origin + parsed.pathname, hostname: parsed.hostname };
  } catch {
    return { normalizedUrl: 'https://' + input.trim(), hostname: input.trim() };
  }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. IP Rate Limiting
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown-ip';

    if (isScanRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Scan rate limit exceeded. Please wait a moment before running another audit.' },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
    }

    const rawUrl = body.url;
    if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim().length < 3) {
      return NextResponse.json({ error: 'A valid website domain or URL is required' }, { status: 400 });
    }

    const { normalizedUrl, hostname } = cleanDomain(rawUrl);

    // 2. SSRF & Internal Network Security Shield
    if (isBlockedTarget(hostname)) {
      return NextResponse.json(
        { error: 'Invalid domain. Scans are only permitted on public web domains.' },
        { status: 400 }
      );
    }

    // Fetch HTML and robots.txt in parallel with 6s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const headers = {
      'User-Agent':
        'Mozilla/5.0 (compatible; PopLabAEOScanner/1.0; +https://poplabstudio.com/tools/aeo-checker)',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    };

    let html = '';
    let robotsTxt = '';
    let hasLlmsTxt = false;
    let fetchDuration = 0;
    let isHttps = normalizedUrl.startsWith('https://');

    try {
      const robotsUrl = `https://${hostname}/robots.txt`;
      const llmsUrl = `https://${hostname}/llms.txt`;

      const [pageRes, robotsRes, llmsRes] = await Promise.allSettled([
        fetch(normalizedUrl, { headers, signal: controller.signal, redirect: 'follow' }),
        fetch(robotsUrl, { headers, signal: controller.signal }),
        fetch(llmsUrl, { headers, signal: controller.signal }),
      ]);

      clearTimeout(timeoutId);
      fetchDuration = Date.now() - startTime;

      if (pageRes.status === 'fulfilled' && pageRes.value.ok) {
        html = await pageRes.value.text();
      } else if (pageRes.status === 'fulfilled') {
        html = await pageRes.value.text().catch(() => '');
      }

      if (robotsRes.status === 'fulfilled' && robotsRes.value.ok) {
        robotsTxt = await robotsRes.value.text();
      }

      if (llmsRes.status === 'fulfilled' && llmsRes.value.ok) {
        const text = await llmsRes.value.text();
        if (text && text.length > 20) {
          hasLlmsTxt = true;
        }
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      // Even if external fetch partially times out, gracefully handle
    }

    if (!html || html.length < 50) {
      // Fallback synthetic baseline if site blocks automated requests or Cloudflare challenge
      html = `<html><head><title>${hostname}</title></head><body><h1>${hostname}</h1></body></html>`;
    }

    // 1. Crawler Analysis in robots.txt
    let crawlerScore = 100;
    const lowerRobots = robotsTxt.toLowerCase();
    const blockedBots: string[] = [];

    const botsToCheck = [
      { bot: 'gptbot', name: 'OpenAI (ChatGPT)' },
      { bot: 'perplexitybot', name: 'Perplexity AI' },
      { bot: 'claudebot', name: 'Anthropic Claude' },
      { bot: 'google-extended', name: 'Google Gemini' },
      { bot: 'ccbot', name: 'Common Crawl' },
    ];

    botsToCheck.forEach(({ bot, name }) => {
      const regex = new RegExp(`user-agent:\\s*${bot}[\\s\\S]*?disallow:\\s*\\/`, 'i');
      if (regex.test(lowerRobots)) {
        blockedBots.push(name);
        crawlerScore -= 20;
      }
    });
    crawlerScore = Math.max(20, crawlerScore);

    // 2. Structured Data / Schema Analysis
    const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    let schemasCount = 0;
    const detectedSchemas: string[] = [];

    schemaMatches.forEach((match) => {
      try {
        const content = match.replace(/<script[^>]*>|<\/script>/gi, '').trim();
        const parsed = JSON.parse(content);
        const types = Array.isArray(parsed['@type'])
          ? parsed['@type']
          : [parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Schema')];
        types.forEach((t: string) => {
          if (t && !detectedSchemas.includes(t)) {
            detectedSchemas.push(t);
            schemasCount++;
          }
        });
      } catch {
        schemasCount++;
      }
    });

    // 3. Question Headings & Content Extraction
    const headingMatches = html.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi) || [];
    let questionHeadingsCount = 0;
    headingMatches.forEach((h) => {
      const cleanH = h.replace(/<[^>]*>/g, '').trim().toLowerCase();
      if (
        cleanH.includes('?') ||
        cleanH.startsWith('how') ||
        cleanH.startsWith('what') ||
        cleanH.startsWith('why') ||
        cleanH.startsWith('where') ||
        cleanH.startsWith('can') ||
        cleanH.startsWith('does')
      ) {
        questionHeadingsCount++;
      }
    });

    // 4. Word Count & Semantic Text
    const bodyText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

    // 5. Technical Signals
    const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html);
    const hasTitle = /<title[^>]*>(.*?)<\/title>/i.test(html);
    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html);
    const hasH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.test(html);

    // Dimension Calculations
    // AEO: Schema density + Question headings + llms.txt
    let aeoScore = 20;
    if (schemasCount >= 3) aeoScore += 35;
    else if (schemasCount >= 1) aeoScore += 20;
    if (questionHeadingsCount >= 3) aeoScore += 25;
    else if (questionHeadingsCount >= 1) aeoScore += 15;
    if (hasLlmsTxt) aeoScore += 20;
    aeoScore = Math.min(96, Math.max(28, aeoScore));

    // GEO: Generative Context, Word Count, Semantic Depth
    let geoScore = 30;
    if (wordCount > 1000) geoScore += 35;
    else if (wordCount > 500) geoScore += 25;
    else if (wordCount > 200) geoScore += 15;
    if (hasMetaDesc) geoScore += 15;
    if (hasH1) geoScore += 15;
    if (hasLlmsTxt) geoScore += 10;
    geoScore = Math.min(95, Math.max(32, geoScore));

    // Tech SEO: HTTPS, Viewport, Title, Canonical
    let techSeoScore = 40;
    if (isHttps) techSeoScore += 25;
    if (hasTitle) techSeoScore += 15;
    if (hasViewport) techSeoScore += 15;
    if (hasMetaDesc) techSeoScore += 10;
    techSeoScore = Math.min(98, Math.max(45, techSeoScore));

    // Content Quality: Semantic density and readability
    let contentQualityScore = Math.min(95, Math.max(35, Math.round(wordCount / 18) + (questionHeadingsCount * 8) + 20));

    // Page Speed Estimation (derived from server TTFB response latency)
    let pageSpeedScore = 85;
    if (fetchDuration > 2500) pageSpeedScore = 40;
    else if (fetchDuration > 1500) pageSpeedScore = 60;
    else if (fetchDuration > 800) pageSpeedScore = 75;

    // Overall Composite Score (weighted)
    const overallScore = Math.round(
      aeoScore * 0.28 +
      geoScore * 0.24 +
      crawlerScore * 0.16 +
      techSeoScore * 0.14 +
      contentQualityScore * 0.10 +
      pageSpeedScore * 0.08
    );

    let ratingLabel: 'CRITICAL' | 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT' = 'FAIR';
    let ratingColor = '#FF9900';

    if (overallScore >= 85) {
      ratingLabel = 'EXCELLENT';
      ratingColor = '#10B981';
    } else if (overallScore >= 70) {
      ratingLabel = 'GOOD';
      ratingColor = '#22C55E';
    } else if (overallScore >= 55) {
      ratingLabel = 'FAIR';
      ratingColor = '#F59E0B';
    } else if (overallScore >= 40) {
      ratingLabel = 'POOR';
      ratingColor = '#F97316';
    } else {
      ratingLabel = 'CRITICAL';
      ratingColor = '#EF4444';
    }

    const getStatusText = (score: number) => {
      if (score >= 80) return 'Excellent';
      if (score >= 65) return 'Good';
      if (score >= 50) return 'Fair';
      return 'Critical';
    };

    const unlockedHighlights = [
      `Overall AI Citation Index rated ${ratingLabel} (${overallScore}/100).`,
      `${schemasCount} structured Schema entity types detected on page.`,
      crawlerScore >= 80
        ? 'Core AI bots (ChatGPT, Perplexity) have crawl clearance.'
        : `Warning: AI crawlers may be restricted in robots.txt.`,
    ];

    const gatedFindings = [
      {
        category: 'Entity Citation Architecture',
        severity: (schemasCount < 3 ? 'critical' : 'warning') as 'critical' | 'warning',
        title: 'Missing Enterprise Knowledge Graph Anchors',
        description: 'Perplexity and ChatGPT Search require bidirectional entity verification to prevent synthetic hallucination.',
        impact: 'High-ticket buyers receive competitor recommendations instead of your brand.',
      },
      {
        category: 'LLM Ingestion Protocol',
        severity: (!hasLlmsTxt ? 'critical' : 'info') as 'critical' | 'info',
        title: hasLlmsTxt ? 'Machine-Readable Protocol Detected' : 'Missing /llms.txt Machine Knowledge Standard',
        description: 'Modern AI agents prioritize domains with structured markdown documentation files over raw HTML bloat.',
        impact: 'AI answer engines skip unoptimized sections during real-time retrieval.',
      },
      {
        category: 'RAG Answer Extraction',
        severity: (questionHeadingsCount < 2 ? 'warning' : 'info') as 'warning' | 'info',
        title: 'Sub-Optimal Semantic Question & Answer Hierarchy',
        description: 'Google AI Overviews and Claude extract answers from discrete 40-60 word atomic summary chunks.',
        impact: 'Zero-click AI snippets default to third-party forums or review aggregators.',
      },
      {
        category: 'Robots & Crawler Hygiene',
        severity: (blockedBots.length > 0 ? 'critical' : 'info') as 'critical' | 'info',
        title: blockedBots.length > 0 ? `Active Blocks on ${blockedBots.join(', ')}` : 'Full Crawler Accessibility',
        description: 'Crawler directives determine whether AI models train and cite your domain in real-time search mode.',
        impact: 'Search queries in your vertical bypass your landing pages entirely.',
      },
      {
        category: 'Mobile Vector Render Latency',
        severity: (pageSpeedScore < 70 ? 'warning' : 'info') as 'warning' | 'info',
        title: 'DOM Hydration & Time to First Semantic Token',
        description: 'Headless AI scrapers impose strict 1500ms timeouts on client-side JS before falling back to cached SERP data.',
        impact: 'Dynamic product/service catalogs fail to render for search agents.',
      },
    ];

    const responseData: DiagnosticResult = {
      url: normalizedUrl,
      domain: hostname,
      overallScore,
      ratingLabel,
      ratingColor,
      summaryText: `This domain scored ${overallScore}/100 for AI readiness — rated ${ratingLabel}. ${schemasCount} types of structured data implemented. ${crawlerScore >= 80 ? 'Key AI crawlers can access your content.' : 'Crawler restrictions detected.'}`,
      pageType: schemasCount > 0 ? 'Product / Service Page' : 'Editorial / Content Page',
      radarData: {
        aeo: aeoScore,
        geo: geoScore,
        crawlers: crawlerScore,
        techSeo: techSeoScore,
        contentQuality: contentQualityScore,
        pageSpeed: pageSpeedScore,
      },
      metrics: {
        aeo: { score: aeoScore, status: getStatusText(aeoScore), label: 'AEO' },
        geo: { score: geoScore, status: getStatusText(geoScore), label: 'GEO' },
        crawlers: { score: crawlerScore, status: getStatusText(crawlerScore), label: 'AI CRAWLERS' },
        techSeo: { score: techSeoScore, status: getStatusText(techSeoScore), label: 'TECHNICAL SEO' },
        contentQuality: { score: contentQualityScore, status: getStatusText(contentQualityScore), label: 'CONTENT QUALITY' },
        pageSpeed: { score: pageSpeedScore, status: getStatusText(pageSpeedScore), label: 'PAGE SPEED' },
      },
      badges: {
        schemasCount,
        questionHeadingsCount,
        wordCount,
        https: isHttps,
        hasLlmsTxt,
      },
      unlockedHighlights,
      gatedFindings,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Analysis temporarily unavailable. Please verify the URL and try again.',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
