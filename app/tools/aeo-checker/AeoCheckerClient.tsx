'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/pop/Button';
import PageHeader from '@/components/pop/PageHeader';
import Section from '@/components/pop/Section';

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

const DEEP_SCAN_STEPS = [
  { pct: 15, label: 'Checking your domain, SSL certificate and server headers', detail: 'Confirming the site can be reached.' },
  { pct: 32, label: 'Checking which AI crawlers your robots.txt allows', detail: 'Looking at rules for GPTBot and other AI search bots.' },
  { pct: 50, label: 'Reading your Schema.org data and sameAs links', detail: 'Checking whether your brand is clearly identified.' },
  { pct: 68, label: 'Looking for an /llms.txt file', detail: 'Checking for a plain-text guide written for AI tools.' },
  { pct: 85, label: 'Checking how answer-ready your page text is', detail: 'Looking for short, factual passages and statistics.' },
  { pct: 98, label: 'Calculating your score', detail: 'Almost done.' },
];

export default function AeoCheckerClient() {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepIdx, setScanStepIdx] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Gate state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateSuccess, setGateSuccess] = useState(false);
  const [gateError, setGateError] = useState<string | null>(null);
  const [gateForm, setGateForm] = useState({
    brandName: '',
    email: '',
    phone: '',
  });

  const resultsRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const scannerTopRef = useRef<HTMLDivElement>(null);

  const handleScan = async (e?: React.FormEvent, customUrl?: string) => {
    if (e) e.preventDefault();
    const rawTarget = customUrl || urlInput;
    if (!rawTarget || rawTarget.trim().length < 3) {
      setError('Please enter a valid website domain (e.g. yourbrand.com)');
      return;
    }

    let cleaned = rawTarget.trim();
    // Normalize if user accidentally pasted duplicated http/https
    cleaned = cleaned.replace(/^(https?:\/\/)+/gi, 'https://');
    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = 'https://' + cleaned;
    }

    setError(null);
    setIsScanning(true);
    setScanProgress(5);
    setScanStepIdx(0);
    setResult(null);
    setIsUnlocked(false);
    setGateSuccess(false);

    // Launch live API scan in parallel
    const apiPromise = fetch('/api/tools/aeo-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: cleaned }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to scan domain');
      return data;
    });

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      // Step 0: DNS & SSL
      setScanProgress(15);
      setScanStepIdx(0);
      await wait(1000);

      // Step 1: GPTBot & Crawlers
      setScanProgress(32);
      setScanStepIdx(1);
      await wait(1100);

      // Step 2: Schema Graph
      setScanProgress(51);
      setScanStepIdx(2);
      await wait(1200);

      // Step 3: LLMs.txt
      setScanProgress(69);
      setScanStepIdx(3);
      await wait(1100);

      // Step 4: RAG Chunking
      setScanProgress(86);
      setScanStepIdx(4);
      await wait(1000);

      // Step 5: Citation Index
      setScanProgress(98);
      setScanStepIdx(5);

      const data = await apiPromise;
      await wait(600);
      setScanProgress(100);

      setResult(data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch (err: any) {
      setError(err.message || 'Diagnostic scan interrupted. Please verify the domain and try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError(null);

    if (!gateForm.email || !gateForm.email.includes('@')) {
      setGateError('Please enter a valid work email address.');
      return;
    }
    if (!gateForm.phone || gateForm.phone.replace(/\D/g, '').length < 7) {
      setGateError('Please enter a valid phone or WhatsApp number.');
      return;
    }

    setGateSubmitting(true);

    // Pull stored UTM data
    let utmData: Record<string, string> = {};
    try {
      const stored = sessionStorage.getItem('poplab_utm_data');
      if (stored) utmData = JSON.parse(stored);
    } catch {}

    const payload = {
      brandName: gateForm.brandName || result?.domain || 'AEO Scanner Prospect',
      website: result?.url || urlInput,
      countryCode: '+91',
      phone: gateForm.phone,
      email: gateForm.email,
      adSpend: 'Inbound via Free AEO Tool',
      roadblock: `AEO Readiness Score: ${result?.overallScore}/100 (${result?.ratingLabel})`,
      message: `User unlocked full AEO audit report for ${result?.domain}. Scores - AEO: ${result?.radarData.aeo}, GEO: ${result?.radarData.geo}, Crawlers: ${result?.radarData.crawlers}, Tech: ${result?.radarData.techSeo}.`,
      utmSource: utmData.utm_source || 'aeo-free-tool',
      utmMedium: utmData.utm_medium || 'organic-tool',
      utmCampaign: utmData.utm_campaign || 'aeo-scanner-v1',
    };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Browser tracking
      if (typeof window !== 'undefined') {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'aeoToolLeadUnlocked',
            domain: result?.domain,
            score: result?.overallScore,
          });
        }
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', {
            content_name: 'AEO Tool Lead Unlocked',
            status: 'Audit Unlocked',
          });
        }
      }

      setIsUnlocked(true);
      setGateSuccess(true);
    } catch {
      // Unblock user even if analytics network dropped
      setIsUnlocked(true);
      setGateSuccess(true);
    } finally {
      setGateSubmitting(false);
    }
  };

  // Generate 6-Point Spider Radar Polygon Points (SVG viewbox 300x300, center at 150, 150, radius 100)
  const renderRadarPolygon = (radar: DiagnosticResult['radarData']) => {
    const center = 150;
    const maxRadius = 105;
    const values = [
      radar.aeo,
      radar.geo,
      radar.crawlers,
      radar.techSeo,
      radar.contentQuality,
      radar.pageSpeed,
    ];

    const points = values.map((val, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const r = (Math.max(15, Math.min(100, val)) / 100) * maxRadius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    return points;
  };
  type Level = 'pass' | 'warn' | 'fail';

  const scoreLevel = (score: number): Level => (score >= 70 ? 'pass' : score >= 50 ? 'warn' : 'fail');

  const severityLevel = (severity: 'critical' | 'warning' | 'info'): Level =>
    severity === 'critical' ? 'fail' : severity === 'warning' ? 'warn' : 'pass';

  const StatusChip = ({ level }: { level: Level }) => {
    const map = {
      pass: { text: 'Pass', icon: '✓', cls: 'border-cream/30 text-cream' },
      warn: { text: 'Needs work', icon: '!', cls: 'bg-pop/15 text-pop-light border-pop/40' },
      fail: { text: 'Missing', icon: '✕', cls: 'bg-pop text-night border-pop' },
    }[level];
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-semibold leading-none ${map.cls}`}
      >
        <span aria-hidden="true">{map.icon}</span>
        {map.text}
      </span>
    );
  };

  const FactChip = ({ level, children }: { level: Level | 'neutral'; children: React.ReactNode }) => {
    const cls =
      level === 'fail'
        ? 'bg-pop text-night border-pop'
        : level === 'warn'
          ? 'bg-pop/15 text-pop-light border-pop/40'
          : level === 'pass'
            ? 'border-cream/30 text-cream'
            : 'border-cream/20 text-cream/80';
    return (
      <span className={`rounded-full border px-3 py-1 text-[13px] font-semibold leading-none ${cls}`}>
        {children}
      </span>
    );
  };

  const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const FAQ_ITEMS = [
    {
      q: 'Can’t our existing SEO agency handle this for us?',
      a: 'Sometimes. AI search visibility leans less on backlinks and keywords and more on technical groundwork: structured data (Schema.org), a machine-readable /llms.txt file, pages AI crawlers can read, and consistent facts about your brand across the web. Ask your agency whether they cover those.',
    },
    {
      q: 'How fast do AI search engines pick up changes once implemented?',
      a: 'Real-time search models (like Perplexity and live ChatGPT Search) query the open web directly. By deploying automated IndexNow ping APIs and clean entity graphs, changes can be picked up quickly, often within days. Timing varies by engine and isn’t guaranteed.',
    },
    {
      q: 'Does Answer Engine Optimization replace our paid Meta or Google Ads?',
      a: 'No, it supports them. When consumers see your Meta ad, their next step is often asking an AI assistant: "Is [Your Brand] legitimate?". If the AI can verify and recommend you, your paid ads are more likely to convert.',
    },
    {
      q: 'Why do old keyword stuffing tricks get penalized by AI engines?',
      a: 'AI models read pages the way people do. Text stuffed with repeated keywords reads as low quality, so it’s less likely to be quoted or recommended. Clear, specific answers work better.',
    },
  ];

  const inputCls =
    'w-full h-12 rounded-xl border border-cream/20 bg-deep px-4 text-base text-cream placeholder:text-cream/45 focus:border-pop focus:outline-none';

  return (
    <>
      {/* 1. HERO + SCAN INPUT */}
      <PageHeader
        context="Free AI search check"
        title="Will ChatGPT recommend your brand?"
        lede="This free check scans your website for the signals AI answer engines such as ChatGPT, Perplexity and Google AI Overviews use when they decide which brands to recommend. Enter your domain and you get a score and a list of what to fix."
      />

      <Section ariaLabel="Run the check" className="!pt-0 !pb-8 sm:!pb-12">
        <div ref={scannerTopRef} className="rounded-2xl border border-cream/10 bg-deep p-6 sm:p-8">
          <form onSubmit={(e) => handleScan(e)} noValidate>
            <label htmlFor="aeo-url" className="block text-xl sm:text-2xl font-display mb-4 text-cream">
              Which website should we check?
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="aeo-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="yourbrand.com"
                disabled={isScanning}
                className="w-full sm:flex-1 h-14 rounded-full border border-cream/20 bg-night px-6 text-base sm:text-lg text-cream placeholder:text-cream/45 focus:border-pop focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isScanning}
                className="inline-flex h-14 items-center justify-center rounded-full bg-pop px-7 text-base sm:text-[17px] font-semibold text-night shadow-glow transition-colors hover:bg-pop-light select-none disabled:opacity-60 disabled:pointer-events-none"
              >
                {isScanning ? 'Checking your site...' : 'Run the free check'}
              </button>
            </div>
            <p className="mt-3 text-[15px] text-cream/70">Works with any brand domain or online store URL. It takes about ten seconds.</p>
          </form>

          {error && (
            <div role="alert" className="mt-5 rounded-xl border border-pop/40 bg-night p-4 text-[15px] text-pop font-semibold">
              {error}
            </div>
          )}

          {isScanning && (
            <div className="mt-6" role="status" aria-live="polite">
              <div className="flex items-center justify-between gap-4 text-[15px] font-semibold mb-2">
                <span>{DEEP_SCAN_STEPS[scanStepIdx]?.label}</span>
                <span>{scanProgress}%</span>
              </div>
              <div
                className="h-3 w-full overflow-hidden rounded-full bg-cream/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={scanProgress}
                aria-label="Check progress"
              >
                <div className="h-full rounded-full bg-pop transition-[width] duration-500" style={{ width: `${scanProgress}%` }} />
              </div>
              <p className="mt-2 text-[15px] text-cream/70">{DEEP_SCAN_STEPS[scanStepIdx]?.detail}</p>
            </div>
          )}
        </div>
      </Section>

      {/* 2. RESULTS */}
      {result && !isScanning && (
        <Section ariaLabel="Your results" className="!pt-8 !pb-8 sm:!pb-12">
          <div ref={resultsRef} className="space-y-8 scroll-mt-28">
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Overall score */}
              <div className="lg:col-span-5 rounded-2xl border border-cream/10 bg-deep p-6 sm:p-8">
                <h2 className="text-lg font-semibold">AI readiness score for {result.domain}</h2>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[clamp(4.5rem,12vw,8rem)] leading-none text-pop">{result.overallScore}</span>
                  <span className="text-xl font-semibold text-cream/70">out of 100</span>
                </p>
                <div className="mt-4">
                  <span className="inline-flex rounded-full border border-cream/20 px-4 py-1.5 text-[15px] font-semibold text-cream">
                    {sentenceCase(result.ratingLabel)}
                  </span>
                </div>
                <p className="mt-5 text-[17px] leading-relaxed text-cream/75">{result.summaryText}</p>
              </div>

              {/* Radar */}
              <div className="lg:col-span-7 rounded-2xl border border-cream/10 bg-deep p-6 sm:p-8">
                <h2 className="text-lg font-semibold">Score breakdown</h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 items-center">
                  <svg className="w-full max-w-[280px] mx-auto" viewBox="0 0 300 300" role="img" aria-label="Radar chart of the six scores listed beside it">
                    {[0.25, 0.5, 0.75, 1].map((scale) => (
                      <polygon
                        key={scale}
                        points={[0, 1, 2, 3, 4, 5]
                          .map((i) => {
                            const a = (Math.PI / 3) * i - Math.PI / 2;
                            const r = 105 * scale;
                            return `${150 + r * Math.cos(a)},${150 + r * Math.sin(a)}`;
                          })
                          .join(' ')}
                        fill="none"
                        stroke="#F5F2EB"
                        strokeOpacity="0.15"
                        strokeWidth="1"
                      />
                    ))}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                      const a = (Math.PI / 3) * i - Math.PI / 2;
                      return (
                        <line
                          key={i}
                          x1="150"
                          y1="150"
                          x2={150 + 105 * Math.cos(a)}
                          y2={150 + 105 * Math.sin(a)}
                          stroke="#F5F2EB"
                          strokeOpacity="0.15"
                          strokeWidth="1"
                        />
                      );
                    })}
                    <polygon
                      points={renderRadarPolygon(result.radarData)}
                      fill="#FF5E14"
                      fillOpacity="0.25"
                      stroke="#FF5E14"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <ul className="space-y-2 text-[15px] text-cream/80">
                    {[
                      ['AEO graph', result.radarData.aeo],
                      ['GEO data', result.radarData.geo],
                      ['AI crawler access', result.radarData.crawlers],
                      ['Technical setup', result.radarData.techSeo],
                      ['Content and trust', result.radarData.contentQuality],
                      ['Page speed', result.radarData.pageSpeed],
                    ].map(([name, val]) => (
                      <li key={name as string} className="flex items-center justify-between gap-3 border-b border-cream/10 pb-1.5">
                        <span>{name}</span>
                        <span className="font-semibold text-cream">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Per-parameter rows */}
            <div>
              <h2 className="font-display text-subsection mb-5">What we found</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(result.metrics).map(([key, metric]) => (
                  <li key={key} className="rounded-2xl border border-cream/10 bg-deep p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold leading-snug">{metric.label}</h3>
                      <StatusChip level={scoreLevel(metric.score)} />
                    </div>
                    <p className="font-display text-4xl leading-none text-pop">
                      {metric.score}
                      <span className="text-base font-semibold text-cream/70"> / 100</span>
                    </p>
                    <p className="text-[15px] text-cream/75">{metric.status}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detected facts */}
            <div className="rounded-2xl border border-cream/10 bg-navy p-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-3">Details we detected</h2>
              <div className="flex flex-wrap gap-2">
                <FactChip level="neutral">{result.badges.schemasCount} schemas</FactChip>
                <FactChip level={result.badges.sameAsCount > 0 ? 'pass' : 'fail'}>sameAs links: {result.badges.sameAsCount}</FactChip>
                <FactChip level={result.badges.princetonStatsCount >= 4 ? 'pass' : 'warn'}>Statistics on page: {result.badges.princetonStatsCount}</FactChip>
                <FactChip level={result.badges.ragBlocksCount > 0 ? 'pass' : 'warn'}>Answer-ready text blocks: {result.badges.ragBlocksCount}</FactChip>
                <FactChip level={result.badges.hasLlmsTxt ? 'pass' : 'warn'}>/llms.txt: {result.badges.hasLlmsTxt ? 'Active' : 'Missing'}</FactChip>
                <FactChip level={result.badges.hasFaqSchema ? 'pass' : 'warn'}>FAQ schema: {result.badges.hasFaqSchema ? 'Yes' : 'No'}</FactChip>
                <FactChip level={result.badges.hasAuthorSignal ? 'pass' : 'warn'}>Author named: {result.badges.hasAuthorSignal ? 'Found' : 'Missing'}</FactChip>
                <FactChip level="neutral">{result.badges.wordCount} words</FactChip>
                <FactChip level={result.badges.https ? 'pass' : 'fail'}>HTTPS: {result.badges.https ? 'Yes' : 'No'}</FactChip>
              </div>
            </div>

            {/* Gated findings */}
            <div ref={gateRef} className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-subsection">Full fix list</h2>
                <span className="text-[15px] font-semibold text-cream/70">{result.gatedFindings.length} findings</span>
              </div>

              <ul className="space-y-4">
                {result.gatedFindings.map((finding, idx) => (
                  <li key={idx} className="rounded-2xl border border-cream/10 bg-deep p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[15px] font-semibold text-cream/70">{finding.category}</span>
                      <StatusChip level={severityLevel(finding.severity)} />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{finding.title}</h3>
                    {isUnlocked ? (
                      <>
                        <p className="text-[16px] leading-relaxed text-cream/75 mb-3">{finding.description}</p>
                        <p className="border-t border-cream/10 pt-3 text-[15px] text-cream/75">
                          <span className="font-semibold">What it costs you: </span>
                          {finding.impact}
                        </p>
                      </>
                    ) : (
                      <div aria-hidden="true" className="space-y-2 select-none">
                        <div className="h-3 w-full rounded bg-cream/15" />
                        <div className="h-3 w-4/5 rounded bg-cream/15" />
                        <div className="h-3 w-2/5 rounded bg-cream/15" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {!isUnlocked && (
                <div className="rounded-2xl border border-cream/10 bg-deep p-6 sm:p-8">
                  <h3 className="font-display text-subsection">Unlock the full fix list</h3>
                  <p className="mt-3 max-w-[60ch] text-[17px] leading-relaxed text-cream/75">
                    We found <strong>{result.gatedFindings.length} issues</strong> that can stop ChatGPT, Perplexity and Copilot from recommending <strong>{result.domain}</strong>. Enter your details to see what each one is and how to fix it.
                  </p>

                  <form onSubmit={handleGateSubmit} className="mt-6 space-y-4 max-w-2xl">
                    <div>
                      <label htmlFor="gate-brand" className="block text-[15px] font-medium text-cream/80 mb-1.5">Company or brand name</label>
                      <input
                        id="gate-brand"
                        type="text"
                        placeholder="Your company"
                        required
                        value={gateForm.brandName}
                        onChange={(e) => setGateForm({ ...gateForm, brandName: e.target.value })}
                        className={inputCls}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="gate-email" className="block text-[15px] font-medium text-cream/80 mb-1.5">Work email</label>
                        <input
                          id="gate-email"
                          type="email"
                          placeholder="founder@yourbrand.com"
                          required
                          value={gateForm.email}
                          onChange={(e) => setGateForm({ ...gateForm, email: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="gate-phone" className="block text-[15px] font-medium text-cream/80 mb-1.5">Phone or WhatsApp number</label>
                        <input
                          id="gate-phone"
                          type="tel"
                          placeholder="+91..."
                          required
                          value={gateForm.phone}
                          onChange={(e) => setGateForm({ ...gateForm, phone: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {gateError && (
                      <p role="alert" className="text-pop text-[15px] font-semibold">
                        {gateError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={gateSubmitting}
                      className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full bg-pop px-7 text-base sm:text-[17px] font-semibold text-night shadow-glow transition-colors hover:bg-pop-light select-none disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {gateSubmitting ? 'Unlocking...' : 'Unlock the fix list'}
                    </button>

                    <p className="text-[14px] text-cream/70">
                      No spam. We’ll use these details to follow up about your results and a diagnostic call.
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* Post-unlock booking */}
            {isUnlocked && (
              <div className="rounded-2xl border border-cream/10 bg-deep p-6 sm:p-10">
                <p className="text-[15px] font-semibold text-cream/70">Full audit unlocked</p>
                <h3 className="font-display text-subsection mt-2 max-w-[22ch]">Want Pop Lab Studio to fix this for you?</h3>
                <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-cream/75">
                  We build the Schema.org markup, the /llms.txt file and the server-side setup that help AI engines cite you first. Book a free 30-minute diagnostic call with our team.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button href="https://cal.com/poplab-studio-o0cj4m/30min" variant="primary" size="lg">
                    Book a 30-minute diagnostic
                  </Button>
                  <Button
                    href="https://wa.me/918837565738?text=Hi%20Pop%20Lab%2C%20I%20just%20ran%20an%20AEO%20scan%20on%20my%20domain%20and%20want%20to%20fix%20our%20AI%20citations."
                    variant="ghost"
                    size="lg"
                  >
                    Message us on WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 3. EXPLAINERS (ALWAYS VISIBLE) */}
      <Section ariaLabel="Why AI search is different">
        <h2 className="font-display text-section max-w-[20ch] scroll-pop">Why old SEO tactics don’t show up in AI search</h2>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-cream/75">
          Traditional Google search matches keywords and counts backlinks. AI engines (ChatGPT, Perplexity, Copilot, Google AI Overviews) read how entities relate to each other and answer in conversation. Here is the difference.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-cream/10 bg-deep p-6 sm:p-8">
            <p className="text-[15px] font-semibold text-cream/70">Traditional keyword SEO</p>
            <h3 className="font-display text-subsection mt-2">You get ten blue links</h3>
            <p className="mt-3 text-[17px] leading-relaxed text-cream/75">
              Optimises for search bots that scan for repeated keywords and backlinks.
            </p>
            <ol className="mt-5 space-y-3">
              {[
                'User searches: "best luxury jewelry near me"',
                'Bot indexes raw keywords and backlink volume',
                'Returns ten blue links cluttered with ads',
              ].map((t, i) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-cream/15 p-3 text-[15px]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cream/30 text-[13px] font-semibold">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[15px] text-cream/75"><span className="font-semibold text-cream">The downside: </span>more and more searches end without a click, so users skip the links.</p>
          </div>

          <div className="rounded-2xl border border-pop/40 bg-deep p-6 sm:p-8">
            <p className="text-[15px] font-semibold text-cream/70">Answer engine optimisation (AEO / GEO)</p>
            <h3 className="font-display text-subsection mt-2">You get one recommendation</h3>
            <p className="mt-3 text-[17px] leading-relaxed text-cream/75">
              Built for AI assistants that write a direct answer and look for verified facts about your brand.
            </p>
            <ol className="mt-5 space-y-3">
              {[
                'Founder asks: "Which studio should we hire to scale our brand?"',
                'The AI reads your /llms.txt, Schema graph and page text',
                'It recommends one answer and links to the brand it trusts',
              ].map((t, i) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-pop/40 bg-pop/10 p-3 text-[15px]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pop text-night text-[13px] font-semibold">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[15px] text-cream/75"><span className="font-semibold text-cream">The upside: </span>the brand that gets cited gets the buyer who was ready to act.</p>
          </div>
        </div>
      </Section>

      <Section ariaLabel="How AI engines choose">
        <h2 className="font-display text-section max-w-[20ch] scroll-pop">How AI engines choose who to recommend</h2>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-cream/75">
          When a buyer asks an AI assistant a question, it works through three stages in a fraction of a second.
        </p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              t: 'It finds relevant pages',
              d: 'The AI turns the question into a numeric representation. Instead of matching exact words, it looks for depth on the topic, authoritative case studies and hard numbers.',
              k: 'Relevance matters more than word count',
            },
            {
              t: 'It filters for pages it can read',
              d: 'AI engines favour sites with clean Schema.org markup and a standard /llms.txt knowledge file. Slow, unstructured sites are easier to skip.',
              k: 'Clean markup beats a bloated CMS',
            },
            {
              t: 'It cites a source',
              d: 'The model writes a confident recommendation and attaches your domain as the source, sending qualified buyers straight to your site.',
              k: 'One citation beats ten blue links',
            },
          ].map((s, i) => (
            <li key={s.t} className="flex flex-col justify-between rounded-2xl border border-cream/10 bg-deep p-6">
              <div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-pop text-night font-semibold">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-cream/75">{s.d}</p>
              </div>
              <p className="mt-5 border-t border-cream/10 pt-3 text-[15px] font-semibold">{s.k}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section ariaLabel="Common blind spots" tone="navy">
        <h2 className="font-display text-section max-w-[20ch] scroll-pop">Three blind spots that cost you customers in AI search</h2>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-cream/75">
          Many founders assume AI assistants can read their site. These three hidden problems are common.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              t: 'Silent crawler blocks',
              d: 'Some Webflow, Shopify and WordPress setups disallow GPTBot and Perplexity in the default robots.txt rules, which makes AI citation impossible.',
              f: 'Fix: allow AI crawlers explicitly',
            },
            {
              t: 'A missing /llms.txt file',
              d: 'When AI models read heavy client-side JavaScript, they can get pricing and capabilities wrong. An /llms.txt file gives them verified answers directly.',
              f: 'Fix: add a machine-readable knowledge file',
            },
            {
              t: 'Unanchored knowledge graph',
              d: 'Without Schema.org sameAs links connecting your domain to Crunchbase, LinkedIn and media articles, AI models have little to verify you against.',
              f: 'Fix: link your entities in JSON-LD',
            },
          ].map((b) => (
            <li key={b.t} className="flex flex-col justify-between rounded-2xl border border-cream/10 bg-deep p-6">
              <div>
                <h3 className="text-xl font-semibold">{b.t}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-cream/75">{b.d}</p>
              </div>
              <p className="mt-5 border-t border-cream/10 pt-3 text-[15px] font-semibold">{b.f}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" ariaLabel="Questions">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 className="font-display text-section lg:col-span-5 scroll-pop">Questions about <em className="accent">AEO.</em></h2>
          <div className="lg:col-span-7 border-t border-cream/10">
            {FAQ_ITEMS.map((f) => (
              <details key={f.q} className="group border-b border-cream/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/25 text-xl font-light leading-none transition-transform group-open:rotate-45 group-open:border-pop group-open:text-pop"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 -mt-1 text-[17px] leading-relaxed text-cream/75 max-w-[60ch]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section ariaLabel="Next step" tone="cream">
        <h2 className="font-display text-section max-w-[20ch] scroll-pop">Get recommended by AI before your competitors do</h2>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-night/80">
          Few brands have set up their site for AI search yet. The first to add clean structured data and a knowledge file are the ones AI assistants learn to trust.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button variant="primary" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Check your website
          </Button>
          <Button href="https://cal.com/poplab-studio-o0cj4m/30min" variant="ghost" size="lg" className="!border-night/30 !text-night hover:!bg-night/10">
            Book a 30-minute diagnostic
          </Button>
        </div>
      </Section>
    </>
  );
}
