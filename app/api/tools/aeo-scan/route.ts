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
    princetonStatsCount: number;
    sameAsCount: number;
    ragBlocksCount: number;
    hasFaqSchema: boolean;
    hasAuthorSignal: boolean;
    hasTables: boolean;
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

    // 2. Structured Data / Schema Analysis & sameAs Entity Anchors
    const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    let schemasCount = 0;
    const detectedSchemas: string[] = [];
    const sameAsLinks: string[] = [];
    let hasFaqSchema = false;
    let hasAuthorSchema = false;

    schemaMatches.forEach((match) => {
      try {
        const content = match.replace(/<script[^>]*>|<\/script>/gi, '').trim();
        const parsed = JSON.parse(content);

        const inspectItem = (item: any) => {
          if (!item || typeof item !== 'object') return;
          if (item['@type']) {
            const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
            types.forEach((t: string) => {
              if (t && !detectedSchemas.includes(t)) {
                detectedSchemas.push(t);
                schemasCount++;
              }
              if (/faqpage|question|answer/i.test(t)) {
                hasFaqSchema = true;
              }
              if (/person|author/i.test(t)) {
                hasAuthorSchema = true;
              }
            });
          }
          if (item.sameAs) {
            const urls = Array.isArray(item.sameAs) ? item.sameAs : [item.sameAs];
            urls.forEach((u: string) => {
              if (typeof u === 'string' && u.trim().length > 5 && !sameAsLinks.includes(u)) {
                sameAsLinks.push(u);
              }
            });
          }
          if (item['@graph'] && Array.isArray(item['@graph'])) {
            item['@graph'].forEach(inspectItem);
          }
        };

        if (Array.isArray(parsed)) {
          parsed.forEach(inspectItem);
        } else {
          inspectItem(parsed);
        }
      } catch {
        schemasCount++;
      }
    });

    const sameAsCount = sameAsLinks.length;

    // 3. Question Headings & Conversational Extraction
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
        cleanH.startsWith('does') ||
        cleanH.startsWith('which') ||
        cleanH.startsWith('is') ||
        cleanH.startsWith('should')
      ) {
        questionHeadingsCount++;
      }
    });

    // 4. Princeton KDD 2024 GEO Empirical Data & Statistics Check
    // Princeton Research Factor: Text containing empirical numbers, metrics & stats receives +37% to +40% higher citation
    const statMatches =
      html.match(
        /\b\d+(\.\d+)?%\b|(?:\$|€|£|₹)\s?\d+([\.,]\d+)?|\b\d+(\.\d+)?x\b|\[\d+\]|\b(19|20)\d\d\b|\b\d{2,}(,\d{3})*\s*(users|clients|customers|revenue|hours|seconds|percent|growth|roas|cac|cr|roi)\b/gi
      ) || [];
    const princetonStatsCount = statMatches.length;

    // 5. Atomic 40-60 Word RAG Answer Blocks
    // AI search models (Perplexity, Google AI Overviews) extract self-contained 35-65 word definition chunks
    const paragraphMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
    let ragBlocksCount = 0;
    paragraphMatches.forEach((p) => {
      const cleanP = p.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const pWords = cleanP.split(/\s+/).filter(Boolean).length;
      if (pWords >= 35 && pWords <= 65) {
        ragBlocksCount++;
      }
    });

    // 6. Structured Comparison & Tables (tables, definition lists)
    const hasTables = /<table\b|<dl\b|<div[^>]*role=["']table["']/i.test(html);

    // 7. Author & E-E-A-T Attribution Signals
    const hasAuthorSignal =
      hasAuthorSchema ||
      /<meta[^>]*name=["']author["']/i.test(html) ||
      /rel=["']author["']/i.test(html) ||
      /(?:written|reviewed|authored|published|curated)\s+(?:by\s+)?[A-Z][a-z]+\s+[A-Z][a-z]+/i.test(html);

    // 8. Content Freshness Signals
    const hasFreshnessSignal =
      /"dateModified"|"datePublished"/i.test(html) ||
      /<meta[^>]*property=["']article:(?:modified_time|published_time)["']/i.test(html) ||
      /\b(2025|2026)\b/i.test(html);

    // 9. Technical & Meta Signals
    const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html);
    const hasTitle = /<title[^>]*>(.*?)<\/title>/i.test(html);
    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html);
    const hasH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.test(html);
    const hasCanonical = /<link[^>]*rel=["']canonical["']/i.test(html);
    const hasOgImage = /<meta[^>]*property=["']og:image["']/i.test(html);

    // 10. Word Count & CSR Script Trap
    const scriptTagsCount = (html.match(/<script\b/gi) || []).length;
    const bodyText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    const isClientRenderedTrap = wordCount < 200 && scriptTagsCount > 12;

    // =========================================================================
    // RIGOROUS MULTI-DIMENSIONAL SCORING CALIBRATION
    // Raises the bar so generic unoptimized domains score 38-55%, not 90%.
    // =========================================================================

    // Dimension 1: AEO Architecture (Entity Graph, Schema & Protocol)
    let aeoScore = 10;
    if (schemasCount >= 3) aeoScore += 25;
    else if (schemasCount >= 1) aeoScore += 12;

    if (sameAsCount >= 3) aeoScore += 25;
    else if (sameAsCount >= 1) aeoScore += 12;

    if (hasLlmsTxt) aeoScore += 25;
    if (hasFaqSchema) aeoScore += 15;
    aeoScore = Math.min(98, Math.max(15, aeoScore));

    // Dimension 2: GEO Extractability (Princeton Data, RAG Blocks & Q&A)
    let geoScore = 12;
    if (princetonStatsCount >= 9) geoScore += 25;
    else if (princetonStatsCount >= 4) geoScore += 18;
    else if (princetonStatsCount >= 1) geoScore += 8;

    if (ragBlocksCount >= 3) geoScore += 25;
    else if (ragBlocksCount >= 1) geoScore += 15;

    if (questionHeadingsCount >= 3) geoScore += 20;
    else if (questionHeadingsCount >= 1) geoScore += 10;

    if (hasTables) geoScore += 18;
    geoScore = Math.min(96, Math.max(15, geoScore));

    // Dimension 3: AI Crawler Clearance (robots.txt Directives)
    // Starts at 90; blocked bots subtract 20 each; unverified robots defaults to 75
    let crawlerCalc = robotsTxt ? 90 : 75;
    blockedBots.forEach(() => {
      crawlerCalc -= 20;
    });
    if (/allow:\s*\/|user-agent:\s*\*/i.test(lowerRobots)) crawlerCalc += 10;
    crawlerScore = Math.min(100, Math.max(15, crawlerCalc));

    // Dimension 4: Technical SEO & SSR Hydration
    let techSeoScore = 15;
    if (isHttps) techSeoScore += 20;
    if (hasTitle) techSeoScore += 15;
    if (hasMetaDesc) techSeoScore += 15;
    if (hasH1) techSeoScore += 10;
    if (hasCanonical) techSeoScore += 10;
    if (hasViewport) techSeoScore += 10;
    if (!isClientRenderedTrap && wordCount > 350) techSeoScore += 10;
    techSeoScore = Math.min(98, Math.max(25, techSeoScore));

    // Dimension 5: Content Authority & E-E-A-T Signals
    let contentQualityScore = 15;
    if (wordCount > 1000) contentQualityScore += 25;
    else if (wordCount > 500) contentQualityScore += 18;
    else if (wordCount > 250) contentQualityScore += 10;

    if (hasAuthorSignal) contentQualityScore += 25;
    if (hasFreshnessSignal) contentQualityScore += 20;
    if (hasOgImage) contentQualityScore += 15;
    contentQualityScore = Math.min(95, Math.max(18, contentQualityScore));

    // Dimension 6: Page Speed Estimation (Server TTFB Response Latency)
    let pageSpeedScore = 80;
    if (fetchDuration > 2500) pageSpeedScore = 30;
    else if (fetchDuration > 1600) pageSpeedScore = 48;
    else if (fetchDuration > 900) pageSpeedScore = 65;
    else if (fetchDuration < 450) pageSpeedScore = 95;

    // Overall Composite Score (Rigorous Weighted Balance)
    const overallScore = Math.round(
      aeoScore * 0.28 +
      geoScore * 0.26 +
      crawlerScore * 0.15 +
      contentQualityScore * 0.13 +
      techSeoScore * 0.10 +
      pageSpeedScore * 0.08
    );

    let ratingLabel: 'CRITICAL' | 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT' = 'FAIR';
    let ratingColor = '#FF9900';

    if (overallScore >= 82) {
      ratingLabel = 'EXCELLENT';
      ratingColor = '#10B981';
    } else if (overallScore >= 68) {
      ratingLabel = 'GOOD';
      ratingColor = '#22C55E';
    } else if (overallScore >= 52) {
      ratingLabel = 'FAIR';
      ratingColor = '#F59E0B';
    } else if (overallScore >= 38) {
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
      `${schemasCount} Schema entity types & ${sameAsCount} external Knowledge Graph anchors detected.`,
      `${princetonStatsCount} Princeton empirical data signals & ${ragBlocksCount} atomic RAG answer blocks verified.`,
    ];

    // DYNAMIC & HONEST VULNERABILITIES FOR THE GATED SECTION
    const gatedFindings = [
      {
        category: 'Entity Disambiguation',
        severity: (sameAsCount === 0 ? 'critical' : sameAsCount < 3 ? 'warning' : 'info') as 'critical' | 'warning' | 'info',
        title: sameAsCount === 0 ? 'Zero External Knowledge Graph Anchors (sameAs)' : `${sameAsCount} Entity Anchors Configured`,
        description: 'Large Language Models require bidirectional Schema.org sameAs links (Wikidata, Crunchbase, LinkedIn) to distinguish your brand from generic vertical competitors.',
        impact: 'ChatGPT Search & Perplexity cite competing brands because your domain entity cannot be verified.',
      },
      {
        category: 'Princeton GEO Data Grounding',
        severity: (princetonStatsCount < 3 ? 'critical' : princetonStatsCount < 7 ? 'warning' : 'info') as 'critical' | 'warning' | 'info',
        title: princetonStatsCount < 3 ? 'Severe Quantitative Data Deficit' : `${princetonStatsCount} Verified Empirical Data Signals`,
        description: 'The Princeton KDD 2024 GEO benchmark proved that empirical statistics (% / $ / multipliers) provide a +37% citation boost. Vague marketing copy is filtered out by RAG synthesizers.',
        impact: 'AI answer engines prefer third-party aggregators and Reddit threads over your marketing claims.',
      },
      {
        category: 'LLM Ingestion Protocol',
        severity: (!hasLlmsTxt ? 'critical' : 'info') as 'critical' | 'info',
        title: hasLlmsTxt ? 'Machine-Readable /llms.txt Protocol Active' : 'Missing /llms.txt Machine Knowledge Base',
        description: 'Modern autonomous buying agents and search LLMs ingest clean Markdown indices rather than bloated client-side JavaScript.',
        impact: 'AI engines hallucinate pricing and capabilities or fail to index your core service offerings.',
      },
      {
        category: 'RAG Snippet Chunking',
        severity: (ragBlocksCount === 0 ? 'warning' : 'info') as 'warning' | 'info',
        title: ragBlocksCount === 0 ? 'Absence of 40-60 Word Atomic Answer Blocks' : `${ragBlocksCount} Atomic RAG Chunks Detected`,
        description: 'Google AI Overviews and Claude extract answers from discrete 40-60 word definition passages placed directly beneath question headings.',
        impact: 'Zero-click AI summary snippets default to competitor comparison portals.',
      },
      {
        category: 'Conversational Schema & Crawlers',
        severity: (!hasFaqSchema || blockedBots.length > 0 ? 'critical' : 'info') as 'critical' | 'info',
        title: blockedBots.length > 0 ? `Active Blocks on ${blockedBots.join(', ')}` : !hasFaqSchema ? 'Missing Structured FAQPage Schema' : 'Optimal Conversational Ingestion',
        description: 'Without structured FAQPage schemas or explicit AI bot clearance, conversational prompts fail to trigger direct accordion answer cards in AI search.',
        impact: 'High-intent buying questions in your niche are answered without your domain cited.',
      },
    ];

    const responseData: DiagnosticResult = {
      url: normalizedUrl,
      domain: hostname,
      overallScore,
      ratingLabel,
      ratingColor,
      summaryText: `This domain scored ${overallScore}/100 for AI citation readiness (${ratingLabel}). Found ${schemasCount} schemas, ${sameAsCount} entity anchors, ${princetonStatsCount} data points, and ${ragBlocksCount} atomic RAG answer blocks. ${crawlerScore >= 80 ? 'Core AI search bots can access your content.' : 'Crawler restrictions detected in robots.txt.'}`,
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
        aeo: { score: aeoScore, status: getStatusText(aeoScore), label: 'AEO (KNOWLEDGE GRAPH)' },
        geo: { score: geoScore, status: getStatusText(geoScore), label: 'GEO (PRINCETON DATA)' },
        crawlers: { score: crawlerScore, status: getStatusText(crawlerScore), label: 'AI CRAWLERS' },
        techSeo: { score: techSeoScore, status: getStatusText(techSeoScore), label: 'TECHNICAL & SSR' },
        contentQuality: { score: contentQualityScore, status: getStatusText(contentQualityScore), label: 'E-E-A-T & AUTHORITY' },
        pageSpeed: { score: pageSpeedScore, status: getStatusText(pageSpeedScore), label: 'PAGE SPEED' },
      },
      badges: {
        schemasCount,
        questionHeadingsCount,
        wordCount,
        https: isHttps,
        hasLlmsTxt,
        princetonStatsCount,
        sameAsCount,
        ragBlocksCount,
        hasFaqSchema,
        hasAuthorSignal,
        hasTables,
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
