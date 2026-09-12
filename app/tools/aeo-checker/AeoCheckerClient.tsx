'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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

const SCAN_STAGES = [
  'Establishing secure connection...',
  'Inspecting robots.txt for GPTBot & Perplexity permissions...',
  'Parsing Schema.org JSON-LD entity graph...',
  'Evaluating semantic question & answer chunking...',
  'Measuring time-to-first-semantic token & RAG readiness...',
  'Synthesizing multi-dimensional AI visibility report...',
];

export default function AeoCheckerClient() {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStageIdx, setScanStageIdx] = useState(0);
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

  // Stage cycling animation during scan
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanStageIdx((prev) => (prev + 1) % SCAN_STAGES.length);
      }, 700);
    } else {
      setScanStageIdx(0);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleScan = async (e?: React.FormEvent, customUrl?: string) => {
    if (e) e.preventDefault();
    const targetUrl = customUrl || urlInput;
    if (!targetUrl || targetUrl.trim().length < 3) {
      setError('Please enter a valid website domain (e.g. yourbrand.com)');
      return;
    }

    setError(null);
    setIsScanning(true);
    setResult(null);
    setIsUnlocked(false);
    setGateSuccess(false);

    try {
      const res = await fetch('/api/tools/aeo-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to scan domain');
      }

      setResult(data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } catch (err: any) {
      setError(err.message || 'Diagnostic scan interrupted. Please try again.');
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

  const getSeverityStyle = (severity: 'critical' | 'warning' | 'info') => {
    switch (severity) {
      case 'critical':
        return 'border-red-500/40 bg-red-500/[0.05] text-red-400';
      case 'warning':
        return 'border-amber-500/40 bg-amber-500/[0.05] text-amber-400';
      case 'info':
        return 'border-emerald-500/40 bg-emerald-500/[0.05] text-emerald-400';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto selection:bg-[#FF5E14] selection:text-white">
      {/* 1. HERO & INTRO HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF5E14]/30 bg-[#FF5E14]/10 text-[#FF5E14] text-xs font-mono mb-6 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14] animate-ping" />
          Enterprise Lead Magnet &bull; 100% Free
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F5F2EB] leading-[1.08] mb-6">
          Is ChatGPT Citing Your Brand, <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#FF5E14]">or Your Competitor?</span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#F5F2EB]/70 font-light leading-relaxed max-w-2xl mx-auto mb-10">
          The instant Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) scanner.
          Inspect your machine-readable knowledge graph, AI crawler clearances, and RAG extraction readiness.
        </p>

        {/* 2. SCAN INPUT BAR */}
        <form
          onSubmit={(e) => handleScan(e)}
          className="relative max-w-2xl mx-auto rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:border-[#FF5E14]/70 transition-all"
        >
          <div className="flex-1 flex items-center gap-3 w-full px-4 py-2">
            <span className="text-[#FF5E14] font-mono text-sm font-semibold">https://</span>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="yourbrand.com"
              disabled={isScanning}
              className="w-full bg-transparent border-0 outline-none text-white text-base placeholder:text-stone-500 font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isScanning}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FF5E14] text-white hover:bg-[#E04F0E] transition-all font-mono text-xs uppercase tracking-wider font-semibold shadow-lg hover:shadow-[#FF5E14]/30 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
          >
            {isScanning ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Scanning...</span>
              </>
            ) : (
              <span>Run AI Audit ↗</span>
            )}
          </button>
        </form>

        {/* Quick Sample Domain Chips */}
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs font-mono text-[#F5F2EB]/50">
          <span>Try sample:</span>
          {['poplabstudio.com', 'stripe.com', 'shopify.com'].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setUrlInput(sample);
                handleScan(undefined, sample);
              }}
              className="px-2.5 py-0.5 rounded border border-white/10 hover:border-[#FF5E14]/40 text-[#F5F2EB]/70 hover:text-white transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono max-w-xl mx-auto">
            ⚠ {error}
          </div>
        )}
      </div>

      {/* 3. LIVE SCANNING PROGRESS OVERLAY */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto my-12 p-6 rounded-2xl border border-white/15 bg-white/[0.02] backdrop-blur-xl text-center"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#FF5E14]/30 border-t-[#FF5E14] animate-spin mx-auto mb-4" />
            <p className="font-mono text-xs text-[#FF5E14] uppercase tracking-wider mb-2">
              Step {scanStageIdx + 1} of {SCAN_STAGES.length}
            </p>
            <p className="font-sans text-sm text-[#F5F2EB]/80 animate-pulse">
              {SCAN_STAGES[scanStageIdx]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. RESULTS DASHBOARD */}
      {result && !isScanning && (
        <div ref={resultsRef} className="mt-12 space-y-8 animate-fadeIn">
          {/* TOP CARD: OVERALL AI READINESS SCORE */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5E14]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F5F2EB]/60">
                Overall AI Readiness Score
              </span>

              {/* Circular Gauge */}
              <div className="relative w-44 h-44 mx-auto my-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-white/[0.08]"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    stroke={result.ratingColor}
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 68}
                    strokeDashoffset={
                      2 * Math.PI * 68 - (result.overallScore / 100) * (2 * Math.PI * 68)
                    }
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute flex flex-col items-center">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-white">
                    {result.overallScore}
                  </span>
                  <span className="font-mono text-[10px] text-white/50 tracking-wider">/ 100</span>
                </div>
              </div>

              {/* Rating Label */}
              <div
                className="inline-block font-mono text-sm uppercase font-bold tracking-widest px-4 py-1 rounded-full mb-4"
                style={{
                  color: result.ratingColor,
                  backgroundColor: `${result.ratingColor}15`,
                  border: `1px solid ${result.ratingColor}30`,
                }}
              >
                {result.ratingLabel}
              </div>

              <p className="font-sans text-sm sm:text-base text-[#F5F2EB]/80 font-light leading-relaxed mb-6">
                {result.summaryText}
              </p>

              {/* Detected Badges Row */}
              <div className="flex items-center justify-center gap-2.5 flex-wrap pt-4 border-t border-white/10 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/90">
                  {result.badges.schemasCount} Schemas
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/90">
                  {result.badges.questionHeadingsCount} Question Headings
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/90">
                  {result.badges.wordCount} Words
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-emerald-400">
                  HTTPS: {result.badges.https ? 'Yes' : 'No'}
                </span>
                <span className={`px-3 py-1 rounded-full border ${result.badges.hasLlmsTxt ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-amber-500/40 text-amber-400 bg-amber-500/10'}`}>
                  /llms.txt: {result.badges.hasLlmsTxt ? 'Detected' : 'Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* MIDDLE COCKPIT: SPIDER RADAR CHART & 6 CATEGORY CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Radar Polygon Visual (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F5F2EB]/60 mb-4 self-start">
                Score Breakdown
              </span>

              <div className="relative w-64 h-64 flex items-center justify-center my-2">
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  {/* Concentric Hexagon Guide Rings */}
                  {[0.25, 0.5, 0.75, 1].map((scale) => (
                    <polygon
                      key={scale}
                      points={[0, 1, 2, 3, 4, 5].map((i) => {
                        const a = (Math.PI / 3) * i - Math.PI / 2;
                        const r = 105 * scale;
                        return `${150 + r * Math.cos(a)},${150 + r * Math.sin(a)}`;
                      }).join(' ')}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* 6 Dimension Axis Rays */}
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const a = (Math.PI / 3) * i - Math.PI / 2;
                    return (
                      <line
                        key={i}
                        x1="150"
                        y1="150"
                        x2={150 + 105 * Math.cos(a)}
                        y2={150 + 105 * Math.sin(a)}
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* The Dynamic Radar Polygon */}
                  <polygon
                    points={renderRadarPolygon(result.radarData)}
                    fill="rgba(255, 94, 20, 0.25)"
                    stroke="#FF5E14"
                    strokeWidth="2.5"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full text-[10px] font-mono text-[#F5F2EB]/60 pt-4 border-t border-white/10">
                <span>Top: AEO ({result.radarData.aeo})</span>
                <span>Top-R: GEO ({result.radarData.geo})</span>
                <span>Bot-R: Crawlers ({result.radarData.crawlers})</span>
                <span>Bottom: Tech ({result.radarData.techSeo})</span>
                <span>Bot-L: Content ({result.radarData.contentQuality})</span>
                <span>Top-L: Speed ({result.radarData.pageSpeed})</span>
              </div>
            </div>

            {/* 6 Dimensional Metric Cards (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(result.metrics).map(([key, metric]) => {
                const isGood = metric.score >= 70;
                const isFair = metric.score >= 50 && metric.score < 70;
                const strokeColor = isGood ? '#10B981' : isFair ? '#F59E0B' : '#EF4444';

                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/15 bg-white/[0.02] backdrop-blur-lg p-5 flex flex-col justify-between hover:border-white/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#F5F2EB]/70">
                        {metric.label}
                      </span>
                      {/* Mini Ring */}
                      <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="3"
                          fill="none"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          stroke={strokeColor}
                          strokeWidth="3"
                          strokeDasharray={2 * Math.PI * 14}
                          strokeDashoffset={2 * Math.PI * 14 - (metric.score / 100) * (2 * Math.PI * 14)}
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </div>

                    <div>
                      <span className="font-serif text-3xl font-light text-white">
                        {metric.score}
                      </span>
                      <div className="mt-2 flex items-center justify-between font-mono text-[11px]">
                        <span style={{ color: strokeColor }}>{metric.status}</span>
                        <span className="text-[#F5F2EB]/40">&rarr;</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. THE GATED CURIOSITY SECTION (BLURRED PREVIEW + LEAD CAPTURE) */}
          <div ref={gateRef} className="relative rounded-3xl border border-white/15 overflow-hidden mt-12">
            {/* THE DEEP FINDINGS (BLURRED WHEN LOCKED) */}
            <div
              className={`p-6 sm:p-10 space-y-6 transition-all duration-700 ${
                isUnlocked ? 'filter-none' : 'filter blur-md select-none opacity-40 pointer-events-none'
              }`}
            >
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <h3 className="font-serif text-2xl font-light text-white">
                  Full Technical Remediation &amp; Competitor Leak Audit
                </h3>
                <span className="font-mono text-xs text-[#FF5E14]">
                  {result.gatedFindings.length} Critical Directives
                </span>
              </div>

              <div className="space-y-4">
                {result.gatedFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-5 ${getSeverityStyle(finding.severity)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                        {finding.category}
                      </span>
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-current">
                        {finding.severity}
                      </span>
                    </div>
                    <h4 className="font-sans text-base font-medium text-white mb-1">
                      {finding.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#F5F2EB]/80 mb-2 leading-relaxed">
                      {finding.description}
                    </p>
                    <div className="font-mono text-xs text-red-300/90 pt-2 border-t border-white/10 flex items-center gap-2">
                      <span>⚠ Downstream Impact:</span>
                      <span className="font-sans text-white/90">{finding.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* THE FROSTED GLASS OVERLAY & LEAD CAPTURE FORM (VISIBLE WHEN LOCKED) */}
            {!isUnlocked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-xl">
                <div className="max-w-xl w-full rounded-3xl border border-white/20 bg-[#090D14]/90 p-6 sm:p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FF5E14]/20 rounded-full blur-3xl pointer-events-none" />

                  <div className="w-12 h-12 rounded-full border border-[#FF5E14]/40 bg-[#FF5E14]/10 text-[#FF5E14] flex items-center justify-center mx-auto mb-4 text-xl">
                    🔒
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E14] font-semibold">
                    Locked Technical Report
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-2 mb-3">
                    Unlock Your Full AEO/GEO Deep Audit
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#F5F2EB]/70 font-light leading-relaxed mb-6">
                    Our scanner uncovered <strong className="text-white">{result.gatedFindings.length} technical bottlenecks</strong> preventing ChatGPT, Perplexity, and Copilot from recommending <span className="text-[#FF5E14]">{result.domain}</span>. Enter your details below to unblur the findings immediately.
                  </p>

                  <form onSubmit={handleGateSubmit} className="space-y-3.5 text-left">
                    <div>
                      <label className="sr-only">Brand or Company Name</label>
                      <input
                        type="text"
                        placeholder="Company / Brand Name"
                        required
                        value={gateForm.brandName}
                        onChange={(e) => setGateForm({ ...gateForm, brandName: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-stone-500 font-sans focus:outline-none focus:border-[#FF5E14]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="sr-only">Work Email</label>
                        <input
                          type="email"
                          placeholder="founder@yourbrand.com"
                          required
                          value={gateForm.email}
                          onChange={(e) => setGateForm({ ...gateForm, email: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-stone-500 font-sans focus:outline-none focus:border-[#FF5E14]"
                        />
                      </div>

                      <div>
                        <label className="sr-only">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          placeholder="WhatsApp Number (+91...)"
                          required
                          value={gateForm.phone}
                          onChange={(e) => setGateForm({ ...gateForm, phone: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-stone-500 font-sans focus:outline-none focus:border-[#FF5E14]"
                        />
                      </div>
                    </div>

                    {gateError && (
                      <p className="font-mono text-xs text-red-400 text-center">⚠ {gateError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={gateSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#FF5E14] text-white hover:bg-[#E04F0E] transition-all font-mono text-xs uppercase tracking-wider font-semibold shadow-lg hover:shadow-[#FF5E14]/30 disabled:opacity-50 mt-2"
                    >
                      {gateSubmitting ? 'Unlocking Audit...' : 'Unlock Audit & View Leaks ↗'}
                    </button>

                    <p className="font-mono text-[10px] text-center text-[#F5F2EB]/40">
                      Zero spam. We will send your report PDF and open your diagnostic schedule slot.
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* 6. POST-UNLOCK CALL TO ACTION (CAL.COM BOOKING CARD) */}
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-[#FF5E14]/40 bg-gradient-to-b from-[#FF5E14]/10 to-transparent p-8 sm:p-12 text-center relative overflow-hidden"
            >
              <div className="max-w-2xl mx-auto">
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF5E14] font-semibold">
                  ✓ Full Audit Unlocked
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-light text-white mt-2 mb-4">
                  Want Pop Lab Studio to Fix Your AEO Architecture?
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#F5F2EB]/80 font-light leading-relaxed mb-8">
                  We engineer custom Schema.org knowledge models, /llms.txt protocols, and server-side Next.js attribution that make AI engines cite you first. Book a private 30-minute diagnostic session with our senior partners.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://cal.com/poplab-studio-o0cj4m/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF5E14] text-white hover:bg-[#E04F0E] transition-all font-mono text-xs uppercase tracking-wider font-semibold shadow-xl shadow-[#FF5E14]/20"
                  >
                    Schedule 30-Min Screen-Share ↗
                  </a>

                  <a
                    href="https://wa.me/918837565738?text=Hi%20Pop%20Lab%2C%20I%20just%20ran%20an%20AEO%20scan%20on%20my%20domain%20and%20want%20to%20fix%20our%20AI%20citations."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 text-white transition-all font-mono text-xs uppercase tracking-wider font-semibold"
                  >
                    WhatsApp Senior Partner ↗
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
