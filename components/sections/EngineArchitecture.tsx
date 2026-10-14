'use client';

import React, { useState } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface EngineSpec {
  id: string;
  number: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  inputSignal: string;
  outputSignal: string;
  telemetryMetric: string;
  tags: string[];
  spotlight: string;
}

const ENGINES: EngineSpec[] = [
  {
    id: 'brand',
    number: '01',
    code: 'SYS.01 // BRAND ARCHITECTURE',
    title: 'Brand Engine',
    subtitle: 'Identity · Film · Category Strategy',
    description:
      'We engineer provocative positioning, tactile identity systems, and cinematic film assets that command category authority and eliminate price resistance.',
    inputSignal: 'RAW PRODUCT & FOUNDER THESIS',
    outputSignal: 'FEEDS ENGINE 02 -> PRICING POWER & NARRATIVE HOOKS',
    telemetryMetric: 'PRICE ELASTICITY // +38% MARGIN',
    tags: [
      'Brand Archetypes',
      'Cinematic Film',
      'Packaging Systems',
      'Design Language',
    ],
    spotlight: 'rgba(255, 94, 20, 0.14)',
  },
  {
    id: 'attention',
    number: '02',
    code: 'SYS.02 // CULTURAL GRAVITY',
    title: 'Attention Engine',
    subtitle: 'Cultural PR · Creators · GEO / AEO',
    description:
      'Turn brand narrative into front-page cultural gravity. We orchestrate Tier-1 press features, creator whitelisting waves, and AI search (GEO/AEO) answer citations.',
    inputSignal: 'CATEGORY IDENTITY FROM ENGINE 01',
    outputSignal: 'FEEDS ENGINE 03 -> HIGH-INTENT ORGANIC DEMAND',
    telemetryMetric: 'SEARCH & AI CITATION VELOCITY // 4.2X',
    tags: [
      'National PR & Press',
      'Creator Whitelisting',
      'AI Search (GEO/AEO)',
      'Cultural Drops',
    ],
    spotlight: 'rgba(245, 242, 235, 0.08)',
  },
  {
    id: 'growth',
    number: '03',
    code: 'SYS.03 // REVENUE VELOCITY',
    title: 'Growth Engine',
    subtitle: 'Performance · Quick Commerce · CRO',
    description:
      'Convert cultural attention into compounding revenue across Meta, Google Ads, Quick Commerce (Blinkit / Zepto), and frictionless 1-click Shopify checkouts.',
    inputSignal: 'CULTURAL TRUST & DEMAND FROM ENGINE 02',
    outputSignal: 'LOOPS TO ENGINE 01 -> REINVESTED CASH CONTRIBUTION',
    telemetryMetric: 'BLENDED CAC COMPRESSION // -31%',
    tags: [
      'Paid Acquisition',
      'Blinkit & Zepto Scale',
      'Funnel CRO',
      'LTV Flywheel',
    ],
    spotlight: 'rgba(255, 94, 20, 0.14)',
  },
];

export default function EngineArchitecture() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section
      id="engines"
      aria-labelledby="engines-heading"
      className="w-full scroll-mt-28 sm:scroll-mt-36 py-24 sm:py-32 md:py-40 px-5 sm:px-10 md:px-16 lg:px-20 relative z-10 max-w-7xl mx-auto bg-[#070B10] border-t border-[#F5F2EB]/15"
    >
      {/* Top Architectural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-16">
        <div className="max-w-2xl">
          {/* Kinetic Telemetry Eyebrow — Crisp Rectangular Lab Spec, No Muddy Brown */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-[#F5F2EB]/20 bg-[#070B10] mb-6">
            <span
              aria-hidden="true"
              className="w-2 h-2 bg-[#FF5E14] animate-pulse"
            />
            <span className="font-mono tabular-nums text-[11px] uppercase tracking-[0.22em] text-[#F5F2EB] font-medium">
              SEC.05 // THE THREE CONNECTED ENGINES
            </span>
          </div>

          <h2
            id="engines-heading"
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F5F2EB] tracking-tight leading-[1.04]"
          >
            One connected{' '}
            <span className="italic text-[#FF5E14]">architecture.</span>
          </h2>
        </div>

        <div className="max-w-md border-l-2 border-[#FF5E14] pl-5 py-1">
          <p className="font-sans text-sm sm:text-base text-[#F5F2EB]/85 font-normal leading-relaxed">
            Isolated agencies leak margin. In our lab, each engine multiplies
            the next: brand authority compresses acquisition cost, cultural PR
            ignites organic search velocity, and high-converting checkout
            infrastructure compounds cash contribution.
          </p>
        </div>
      </div>

      {/* Interactive System Bus Bar (Clean Sans Micro-UI Controls + Tabular Mono Indices) */}
      <div className="border border-[#F5F2EB]/15 bg-[#070B10] mb-px">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F5F2EB]/15 px-4 sm:px-6 py-3 gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono tabular-nums text-[11px] uppercase tracking-[0.18em] text-[#F5F2EB]/75">
              PIPELINE TOPOLOGY:
            </span>
            <span className="font-mono tabular-nums text-[11px] uppercase tracking-[0.18em] text-[#F5F2EB] font-medium">
              01 BRAND -&gt; 02 ATTENTION -&gt; 03 GROWTH
            </span>
          </div>

          {/* Micro-UI Interactive Selector Tabs — Clean Sans per System Standard */}
          <div
            role="tablist"
            aria-label="Inspect Engine Stage"
            className="flex items-center gap-1.5"
          >
            {ENGINES.map((engine, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={engine.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(idx)}
                  className={`font-sans text-xs font-medium tracking-wide px-3 py-1.5 transition-colors duration-200 border ${
                    isSelected
                      ? 'bg-[#FF5E14] text-[#070B10] border-[#FF5E14] font-semibold'
                      : 'bg-[#070B10] text-[#F5F2EB]/80 border-[#F5F2EB]/15 hover:border-[#F5F2EB]/40 hover:text-[#F5F2EB]'
                  }`}
                >
                  <span className="font-mono tabular-nums mr-1.5">
                    {engine.number}
                  </span>
                  {engine.title.replace(' Engine', '')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Connected 3-Engine Architectural Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#F5F2EB]/15">
          {ENGINES.map((engine, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={engine.number}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="relative group"
              >
                <SpotlightCard
                  spotlightColor={engine.spotlight}
                  className={`engine-card h-full rounded-none border-0 p-7 sm:p-9 flex flex-col justify-between transition-colors duration-300 ${
                    isActive ? 'bg-[#F5F2EB]/[0.03]' : 'bg-[#070B10]'
                  }`}
                >
                  {/* Top Active Indicator Bar */}
                  <div
                    aria-hidden="true"
                    className={`h-0.5 w-full mb-6 transition-colors duration-300 ${
                      isActive ? 'bg-[#FF5E14]' : 'bg-[#F5F2EB]/10'
                    }`}
                  />

                  <div>
                    {/* Telemetry Header Row */}
                    <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[#F5F2EB]/12">
                      <div>
                        <span className="block font-mono tabular-nums text-[11px] uppercase tracking-[0.18em] text-[#F5F2EB] font-medium mb-1">
                          {engine.code}
                        </span>
                        <span className="inline-block font-mono tabular-nums text-[11px] uppercase tracking-[0.12em] text-[#F5F2EB]/75">
                          {engine.telemetryMetric}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`font-mono tabular-nums text-3xl font-light transition-colors duration-300 ${
                          isActive ? 'text-[#FF5E14]' : 'text-[#F5F2EB]/25'
                        }`}
                      >
                        {engine.number}
                      </span>
                    </div>

                    {/* Engine Title & High-Contrast Subtitle */}
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F2EB] tracking-tight mb-2">
                      {engine.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#F5F2EB]/80 mb-5">
                      {engine.subtitle}
                    </p>

                    {/* Core Narrative Description (WCAG AAA 17.65:1 / 14.5:1) */}
                    <p className="font-sans text-sm sm:text-[15px] text-[#F5F2EB]/85 font-normal leading-relaxed mb-8">
                      {engine.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Kinetic Signal Handoff Readout */}
                    <div className="border border-[#F5F2EB]/15 bg-[#070B10] p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono tabular-nums uppercase tracking-[0.16em] text-[#F5F2EB]/70">
                        <span>IN // {engine.inputSignal}</span>
                      </div>
                      <div className="h-px bg-[#F5F2EB]/10" />
                      <div className="flex items-center justify-between text-[11px] font-mono tabular-nums uppercase tracking-[0.14em] text-[#F5F2EB] font-medium">
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="inline-block w-1.5 h-1.5 bg-[#FF5E14]"
                          />
                          {engine.outputSignal}
                        </span>
                      </div>
                    </div>

                    {/* Spec-Sheet Capability Modules (Clean Sans Micro-UI Chips) */}
                    <div className="pt-5 border-t border-[#F5F2EB]/12">
                      <span className="block font-mono tabular-nums text-[10px] uppercase tracking-[0.2em] text-[#F5F2EB]/70 mb-3">
                        DEPLOYED CAPABILITIES //
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {engine.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-sans font-medium px-2.5 py-1 bg-[#F5F2EB]/[0.04] text-[#F5F2EB]/90 border border-[#F5F2EB]/15"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {/* Bottom Closed-Loop Telemetry Footer */}
        <div className="border-t border-[#F5F2EB]/15 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#070B10]">
          <span className="font-mono tabular-nums text-[11px] uppercase tracking-[0.18em] text-[#F5F2EB]/80">
            FLYWHEEL STATUS // CLOSED-LOOP COMPOUNDING ACTIVE
          </span>
          <span className="font-mono tabular-nums text-[11px] uppercase tracking-[0.18em] text-[#F5F2EB]">
            ACTIVE STAGE: ENGINE 0{activeIndex + 1} —{' '}
            {ENGINES[activeIndex].title.toUpperCase()}
          </span>
        </div>
      </div>
    </section>
  );
}
