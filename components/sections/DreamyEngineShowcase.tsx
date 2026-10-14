'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Engine {
  id: string;
  num: string;
  label: string;
  headline: string;
  subtext: string;
  multiplier: string;
  tags: string[];
  accentColor: string;
}

const ENGINES: Engine[] = [
  {
    id: 'brand',
    num: '01',
    label: 'Brand Engine',
    headline: 'Provocative Identity & Cinematic Film',
    subtext:
      'We craft iconic visual worlds, packaging systems, and cinematic film that command category authority and eliminate pricing resistance.',
    multiplier: '+38% PRICING POWER',
    tags: ['Positioning Archetypes', 'Cinematic Film', 'Packaging Systems', 'Visual Language'],
    accentColor: '#FF5E14',
  },
  {
    id: 'attention',
    num: '02',
    label: 'Attention Engine',
    headline: 'Cultural PR & AI Search Citations',
    subtext:
      'Turn brand narrative into front-page gravity. We orchestrate Tier-1 press, creator whitelisting, and LLM answer engine citations (GEO/AEO).',
    multiplier: '4.2X ORGANIC VELOCITY',
    tags: ['Tier-1 National Press', 'Creator Whitelisting', 'AI Search (GEO/AEO)', 'Cultural Drops'],
    accentColor: '#0E4D7A',
  },
  {
    id: 'growth',
    num: '03',
    label: 'Growth Engine',
    headline: 'High-Velocity Paid & Quick Commerce',
    subtext:
      'Convert attention into compounding cashflow across Meta, Google Ads, Quick Commerce (Blinkit / Zepto), and frictionless CRO checkouts.',
    multiplier: '-31% BLENDED CAC',
    tags: ['Paid Acquisition', 'Blinkit & Zepto Scale', 'Funnel CRO', 'LTV Flywheel'],
    accentColor: '#FF5E14',
  },
];

export default function DreamyEngineShowcase() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeEngine = ENGINES[activeIdx];

  return (
    <section
      id="engines"
      aria-label="The 3 Connected Engines"
      className="w-full scroll-mt-28 sm:scroll-mt-36 py-24 sm:py-32 md:py-40 px-5 sm:px-10 md:px-16 lg:px-20 relative z-10 max-w-7xl mx-auto bg-[#050505]"
    >
      {/* Section Eyebrow & Title */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] backdrop-blur-xl mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F5F2EB]/80 font-medium">
            ONE CONNECTED SYSTEM
          </span>
        </div>

        <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] max-w-3xl mb-4">
          Three compounding engines. <br className="hidden sm:inline" />
          <span className="italic font-serif font-normal text-[#FF5E14]">Zero friction.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#F5F2EB]/70 font-light max-w-xl leading-relaxed">
          Brand identity commands attention. Attention fuels acquisition. Acquisition reinvests into brand.
        </p>
      </div>

      {/* Interactive Liquid Glass Stage */}
      <div className="w-full rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Ambient Glow behind active engine */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full pointer-events-none opacity-25 blur-[120px] transition-all duration-700"
          style={{
            backgroundColor: activeEngine.accentColor,
          }}
        />

        {/* Top Interactive Tabs (Apple-Style Glass Selector) */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] max-w-xl mx-auto mb-12 sm:mb-16">
          {ENGINES.map((engine, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={engine.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`relative flex-1 py-3 px-4 sm:px-6 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'text-black shadow-lg'
                    : 'text-[#F5F2EB]/65 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-engine-tab"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  <span className="font-mono text-[10px] opacity-60">{engine.num}</span>
                  <span>{engine.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Engine Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEngine.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Narrative Hook & Multiplier */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] font-mono text-xs font-bold tracking-wider">
                <span>✦</span>
                <span>{activeEngine.multiplier}</span>
              </div>

              <h3 className="font-sans font-bold text-2xl sm:text-4xl text-white tracking-tight leading-snug">
                {activeEngine.headline}
              </h3>

              <p className="font-sans text-base sm:text-lg text-[#F5F2EB]/75 font-light leading-relaxed max-w-xl">
                {activeEngine.subtext}
              </p>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeEngine.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-sans text-[#F5F2EB]/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Glass Visual Artifact Capsule */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full aspect-[4/3] rounded-2xl border border-white/[0.12] bg-[#070B10]/80 p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                    STAGE // {activeEngine.num}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E14] animate-ping" />
                </div>

                <div className="my-auto py-4">
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                    {activeEngine.multiplier}
                  </div>
                  <div className="text-xs font-mono text-[#F5F2EB]/50 uppercase tracking-wider">
                    Downstream Velocity Metric
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-sans text-[#F5F2EB]/70">
                  <span>Pop Lab Proprietary Flywheel</span>
                  <span className="text-[#FF5E14]">Verified →</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
