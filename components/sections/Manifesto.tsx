'use client';

import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  HandDrawnHighlight,
  InkSealStamp,
} from '@/components/ui/VisualSoul';

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="w-full py-24 sm:py-32 md:py-40 px-5 sm:px-10 md:px-16 lg:px-20 relative z-10 max-w-6xl mx-auto border-t border-[#F5F2EB]/10"
    >
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F5F2EB]/15 bg-[#18150F]/70 backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#FF5E14]">
            THE ANTI-SILO MANIFESTO
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F5F2EB] tracking-tight max-w-3xl leading-[1.08] mb-6">
          Marketing shouldn&apos;t <br className="hidden sm:inline" />
          <HandDrawnHighlight strokeColor="#FF5E14"><em>live in silos.</em></HandDrawnHighlight>
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#F5F2EB]/70 font-light max-w-2xl leading-relaxed">
          Your PR shouldn&apos;t ignore your social strategy. Your creatives shouldn&apos;t be
          disconnected from your media spend. When brand, attention, and commerce operate in isolation,
          you bleed margin.
        </p>
      </div>

      {/* Side-by-side interactive comparison with spotlight hover physics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* The Broken Traditional Silo */}
        <SpotlightCard
          spotlightColor="rgba(239, 68, 68, 0.12)"
          className="p-8 sm:p-10 flex flex-col justify-between border-white/[0.06] bg-[#0C121D]/70"
        >
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#121824]/50 dark:text-[#F5F2EB]/40 font-medium">
                THE TRADITIONAL SILO
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 uppercase tracking-wider">
                COMPARTMENTALIZED
              </span>
            </div>

            <ul className="space-y-5 font-sans text-sm sm:text-base text-[#121824]/80 dark:text-[#F5F2EB]/70">
              <li className="flex items-start gap-3.5">
                <span className="text-red-500 dark:text-red-400 font-mono text-sm select-none mt-0.5">✕</span>
                <span>Four disconnected agencies with zero shared P&L accountability.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="text-red-500 dark:text-red-400 font-mono text-sm select-none mt-0.5">✕</span>
                <span>Artistic brand films that look gorgeous but generate zero pipeline.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="text-red-500 dark:text-red-400 font-mono text-sm select-none mt-0.5">✕</span>
                <span>Media spend that halts the moment ad budgets are trimmed.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
            <span className="font-mono text-xs text-[#121824]/50 dark:text-[#F5F2EB]/40 uppercase tracking-widest block">
              Outcome: Bloated agency retainers, rising CAC, diluted positioning, zero compounding equity.
            </span>
          </div>
        </SpotlightCard>

        {/* The Pop Lab System */}
        <SpotlightCard
          spotlightColor="rgba(255, 94, 20, 0.25)"
          className="p-8 sm:p-10 flex flex-col justify-between border-[#FF5E14]/30 bg-gradient-to-br from-[#FFF9F6] to-[#FFF3EC] dark:from-[#131E30]/90 dark:to-[#0A101A]/95 shadow-[0_12px_40px_rgba(255,94,20,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
        >
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] font-semibold">
                THE POP LAB SYSTEM
              </span>
              <div className="flex items-center gap-2">
                <InkSealStamp text="POP LAB" subtext="UNIFIED" size={36} />
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/30 uppercase tracking-wider">
                  SYNCHRONIZED
                </span>
              </div>
            </div>

            <ul className="space-y-5 font-sans text-sm sm:text-base text-[#121824] dark:text-[#F5F2EB]/95">
              <li className="flex items-start gap-3.5">
                <span className="text-[#FF5E14] font-mono text-sm select-none mt-0.5">✓</span>
                <span>One integrated war-room orchestrating strategy, creative, PR, and commerce.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="text-[#FF5E14] font-mono text-sm select-none mt-0.5">✓</span>
                <span>High-velocity cultural PR that directly converts into paid ad collateral.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="text-[#FF5E14] font-mono text-sm select-none mt-0.5">✓</span>
                <span>Every campaign engineered to build permanent, unassailable brand authority.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-8 border-t border-black/[0.08] dark:border-white/[0.08]">
            <span className="font-mono text-xs text-[#FF5E14] uppercase tracking-widest block font-medium">
              Outcome: 30–40% lower blended CAC, 14-day rapid deployment sprints, permanent category moat.
            </span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
