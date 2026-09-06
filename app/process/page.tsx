import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  InkSealStamp,
  HandDrawnArrow,
  HandDrawnHighlight,
  HandDrawnLoopArrowDown,
  SignalFiltrationDiagram,
  AttributionSignalDiagram,
  SprintProcessFlowDiagram,
} from '@/components/ui/VisualSoul';

export const metadata: Metadata = {
  title: 'Our Methodology & 4-Stage Sprint Process — Pop Lab Studio',
  description:
    'How Pop Lab Studio runs creative growth: channel fit before clever, friction as data, creative as the primary lever, and attribution before optimization.',
  openGraph: {
    title: 'Our Methodology & 4-Stage Sprint Process — Pop Lab Studio',
    description:
      'A method, not a magic trick. The operational system behind our paid media, creative production, and conversion rate engineering.',
    url: 'https://poplabstudio.com/process',
    siteName: 'Pop Lab Studio',
    type: 'website',
  },
};

const PRINCIPLES = [
  {
    num: '01',
    title: 'Channel fit before clever',
    body: 'Search catches active demand. Meta builds emotional desire. LinkedIn engages executives gatekeeping six-figure enterprise decisions. They are not interchangeable - most costly marketing failures stem from treating them as if they are. We engineer the channel that matches where your actual buyer makes decisions.',
  },
  {
    num: '02',
    title: 'Friction is strategic data',
    body: 'A high CPC is not inherently a leak to eliminate. In ultra-luxury jewellery and private wealth, high click costs serve as an upfront qualification filter, weeding out curious non-buyers. In local services, that same CPC is a fatal defect. The metric is meaningless without the buyer journey wrapped around it.',
  },
  {
    num: '03',
    title: 'Creative is the primary lever',
    body: 'Audience targeting plateaus quickly once algorithmic broad delivery activates. Creative testing does not. The final 30% of efficiency on scaling accounts consistently stems from an emotionally compelling video hook or authentic founder premise - never a marginally tweaked lookalike audience.',
  },
  {
    num: '04',
    title: 'Attribution before optimisation',
    body: 'If event telemetry is broken, the rest is theatre. We deploy server-to-server Conversions API (CAPI), Google Enhanced Conversions, and Offline Conversion Imports (OCI) before spending client capital. Clean data is the prerequisite for machine learning to optimize bids accurately.',
  },
];

const ONBOARDING_SPRINTS = [
  {
    stage: '01',
    title: 'The Diagnostic Teardown',
    timeline: 'Day 0 · 30-Minute Screen-Share',
    desc: 'A live screen-shared audit of your current ad accounts, tracking stack, and landing page funnels. We identify where budget is bleeding, calculate your marginal ROAS, and provide an actionable angle roadmap. Zero high-pressure sales slides - you walk away with immediate value whether we collaborate or not.',
  },
  {
    stage: '02',
    title: 'Deep Audit & Attribution Architecture',
    timeline: 'Week 1 · Full Foundation',
    desc: 'We configure server-side tracking (Meta CAPI + Google Enhanced Conversions via sGTM), audit search query reports, construct comprehensive negative keyword lists, and link CRM conversion milestones for closed-won telemetry.',
  },
  {
    stage: '03',
    title: 'Creative Architecture & Initial Launch',
    timeline: 'Week 2 · Live Deployment',
    desc: 'We synthesize customer review mining into high-converting video and static scripts. Campaigns are built in clean, isolated structures designed for qualified buyer actions rather than vanity reach.',
  },
  {
    stage: '04',
    title: 'Weekly Rapid Iteration & Cleansing',
    timeline: 'Ongoing Sprints',
    desc: 'Search query reports inspected weekly, underperforming hooks ruthlessly pruned, and winning angles branched into new variations. You receive a transparent weekly briefing with real business metrics, not confusing agency jargon.',
  },
  {
    stage: '05',
    title: 'Controlled Horizontal Scaling',
    timeline: 'When Unit Economics Earn It',
    desc: 'Once acquisition economics stabilize and prove profitable, we scale spend methodically - protecting marginal ROAS through creative expansion and landing page CRO rather than reckless budget spikes.',
  },
];

const AI_INTEGRATIONS = [
  {
    title: 'Creative Velocity',
    desc: 'LLMs enable us to script, format, and storyboard a dozen ad angle variations in hours rather than weeks, preventing creative fatigue from bottlenecking high-spend accounts.',
    badge: 'ACCELERATION',
  },
  {
    title: 'Customer Mining',
    desc: 'Automated clustering of thousands of verified customer reviews and competitor complaints to unearth raw, emotionally charged phrases that move high-ticket prospects.',
    badge: 'RESEARCH',
  },
  {
    title: 'Telemetry Auditing',
    desc: 'Algorithmic analysis of search query reports and bid variances across multiple accounts to flag budget leaks faster, while capital allocation calls remain 100% human.',
    badge: 'PRECISION',
  },
];

export default function ProcessPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'The Pop Lab Growth Sprint Methodology',
    description: 'A 5-stage sprint methodology for scaling paid media, brand strategy, and conversion rate engineering.',
    step: ONBOARDING_SPRINTS.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full relative z-10 pt-28 sm:pt-36 pb-24 px-5 sm:px-10 md:px-16 max-w-6xl mx-auto overflow-x-hidden">
        {/* Top Folio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-black/10 dark:border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#121824]/60 dark:text-[#F5F2EB]/50">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
            THE OPERATING SYSTEM · METHODOLOGY
          </span>
          <span>HOW WE RUN GROWTH</span>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <InkSealStamp text="POP LAB" subtext="METHOD" size={48} />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5E14]">
              DISCIPLINE OVER SHORTCUTS
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121824] dark:text-[#F5F2EB] tracking-tight leading-[1.05] mb-6">
            A method, not <br />
            <HandDrawnHighlight strokeColor="#FF5E14"><em>a magic trick.</em></HandDrawnHighlight>
          </h1>

          <p className="font-sans text-base sm:text-xl text-[#121824]/80 dark:text-[#F5F2EB]/75 font-light leading-relaxed max-w-2xl">
            We don&apos;t possess mysterious agency secrets. We have a disciplined operating process executed identically every sprint - and the diligence to maintain it long after week one. Here is exactly how client accounts are governed.
          </p>
        </div>

        {/* SECTION 1: Four Core Principles */}
        <section className="mb-24">
          <div className="mb-10 pb-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14]">
              FOUR CORE PRINCIPLES
            </span>
            <span className="font-mono text-xs text-[#121824]/50 dark:text-[#F5F2EB]/40">
              NON-NEGOTIABLE STANDARDS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 dark:bg-white/10 rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="p-8 sm:p-10 bg-white dark:bg-[#0D1522] hover:bg-black/[0.01] dark:hover:bg-[#10192A] transition-colors"
              >
                <span className="font-mono text-xs text-[#FF5E14] font-bold block mb-4">
                  // {p.num}
                </span>
                <h3 className="font-serif text-2xl text-[#121824] dark:text-[#F5F2EB] mb-4">
                  {p.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#121824]/75 dark:text-[#F5F2EB]/70 font-light leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Architecture Diagrams & Sprint Flow */}
        <section className="mb-24 space-y-10">
          <SprintProcessFlowDiagram />
          <SignalFiltrationDiagram />
          <AttributionSignalDiagram />
        </section>

        {/* SECTION 2: 5-Stage Onboarding & Sprint System */}
        <section className="mb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#090D14] text-[#121824] dark:text-[#F5F2EB] border border-black/10 dark:border-white/10 relative overflow-hidden shadow-xl dark:shadow-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255,94,20,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="max-w-2xl mb-12">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] block mb-2 font-semibold">
                  THE ONBOARDING &amp; SPRINT TIMELINE
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#121824] dark:text-white">
                  From first teardown to scaling, step by step.
                </h2>
              </div>

              <div className="space-y-4">
                {ONBOARDING_SPRINTS.map((item, idx) => (
                  <React.Fragment key={item.stage}>
                    <div
                      className="touch-motion-card p-6 sm:p-8 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:border-[#FF5E14]/30 transition-all shadow-sm relative overflow-hidden"
                    >
                      {/* Ambient mobile glint */}
                      <div className="ambient-card-glint absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#FF5E14]/30 to-transparent pointer-events-none" />

                      <div className="md:col-span-2">
                        <span className="font-serif text-4xl sm:text-5xl text-[#FF5E14] leading-none">
                          {item.stage}
                        </span>
                      </div>

                      <div className="md:col-span-10 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-serif text-2xl text-[#121824] dark:text-white">
                            {item.title}
                          </h3>
                          <span className="font-mono text-xs text-[#121824]/60 dark:text-white/50 uppercase tracking-wider">
                            {item.timeline}
                          </span>
                        </div>
                        <p className="font-sans text-sm sm:text-base text-[#121824]/75 dark:text-white/75 font-light leading-relaxed max-w-2xl">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Authentic handmade loop-the-loop scribble connector (User Ref 2) */}
                    {idx < ONBOARDING_SPRINTS.length - 1 && (
                      <div className="flex justify-center my-2 opacity-85 py-0.5">
                        <HandDrawnLoopArrowDown color="#818cf8" width={48} height={32} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Where AI Fits */}
        <section className="mb-24">
          <div className="max-w-2xl mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] block mb-2">
              PRAGMATIC WORKFLOW INTEGRATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121824] dark:text-[#F5F2EB]">
              AI for speed. Senior operators for everything that matters.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AI_INTEGRATIONS.map((ai, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/20">
                    {ai.badge}
                  </span>
                  <span className="font-mono text-xs text-[#121824]/40 dark:text-[#F5F2EB]/40">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#121824] dark:text-[#F5F2EB] mb-3">
                  {ai.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#121824]/75 dark:text-[#F5F2EB]/70 font-light leading-relaxed">
                  {ai.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables Matrix Table */}
        <section className="mb-24">
          <div className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
            <span>CLIENT DELIVERABLES</span>
            <span>WHAT YOU RECEIVE</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0D1522]">
            <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                  <th className="px-5 py-4 text-[#121824]/70 dark:text-[#F5F2EB]/60 uppercase font-semibold">
                    Sprint Phase
                  </th>
                  <th className="px-5 py-4 text-[#121824]/70 dark:text-[#F5F2EB]/60 uppercase font-semibold">
                    Core Output
                  </th>
                  <th className="px-5 py-4 text-[#121824]/70 dark:text-[#F5F2EB]/60 uppercase font-semibold">
                    Client Asset Retained
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 text-[#121824]/80 dark:text-[#F5F2EB]/75">
                <tr>
                  <td className="px-5 py-4 font-semibold text-[#FF5E14]">Phase 01 · Diagnostic</td>
                  <td className="px-5 py-4">Live screen-share account leak breakdown</td>
                  <td className="px-5 py-4">Ad Spend Leakage Map &amp; Angle Backlog</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-semibold text-[#FF5E14]">Phase 02 · Tracking</td>
                  <td className="px-5 py-4">Server-side CAPI + GTM setup &amp; negative lists</td>
                  <td className="px-5 py-4">100% Client-Owned Verified GTM Container</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-semibold text-[#FF5E14]">Phase 03 · Creative</td>
                  <td className="px-5 py-4">Four simultaneous format batches &amp; launch</td>
                  <td className="px-5 py-4">High-Res Video Master Files &amp; Static Ad Sets</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-semibold text-[#FF5E14]">Phase 04 · Optimization</td>
                  <td className="px-5 py-4">Weekly pruning, search term hygiene, hook updates</td>
                  <td className="px-5 py-4">Executive Weekly P&amp;L Performance Telemetry</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-semibold text-[#FF5E14]">Phase 05 · Controlled Scale</td>
                  <td className="px-5 py-4">Methodical spend scaling &amp; multi-channel expansion</td>
                  <td className="px-5 py-4">Scaling Playbook &amp; Validated Winner Matrix</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Conversion Box */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#FF5E14]/10 border border-[#FF5E14]/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] block mb-3">
              EXPERIENCE THE METHOD
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#121824] dark:text-white mb-4">
              See the process run live on <em>your numbers.</em>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#121824]/80 dark:text-white/80 font-light leading-relaxed mb-8 max-w-lg mx-auto">
              We take on a strictly limited number of partner accounts each quarter. Book the 30-minute diagnostic teardown and we&apos;ll audit your accounts live on screen share.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF5E14] hover:bg-[#E04F0E] text-white font-grotesk text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-[0_0_30px_rgba(255,94,20,0.4)] hover:scale-105"
            >
              <span>Book a Teardown Call</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
