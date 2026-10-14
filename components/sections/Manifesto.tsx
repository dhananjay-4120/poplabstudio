'use client';

import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      aria-label="The Anti-Silo Manifesto"
      className="w-full scroll-mt-28 sm:scroll-mt-36 py-24 sm:py-32 md:py-40 px-5 sm:px-10 md:px-16 lg:px-20 relative z-10 max-w-6xl mx-auto bg-[#050505] border-t border-white/[0.08]"
    >
      <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] backdrop-blur-xl mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF5E14] font-medium">
            THE ANTI-SILO MANIFESTO
          </span>
        </div>

        <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] max-w-3xl mb-4">
          Marketing shouldn&apos;t <br className="hidden sm:inline" />
          <span className="italic font-serif font-normal text-[#FF5E14]">live in silos.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#F5F2EB]/70 font-light max-w-xl leading-relaxed">
          When brand identity, paid acquisition, and PR operate in isolation, you burn cash and bleed margin.
        </p>
      </div>

      {/* 2-Column Side-by-Side Frosted Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: The Broken Traditional Agency Model */}
        <SpotlightCard
          spotlightColor="rgba(239, 68, 68, 0.12)"
          className="p-8 sm:p-10 flex flex-col justify-between border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl"
        >
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F5F2EB]/50 font-medium">
                TRADITIONAL SILO
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 uppercase tracking-wider">
                COMPARTMENTALIZED
              </span>
            </div>

            <ul className="space-y-4 font-sans text-sm sm:text-base text-[#F5F2EB]/75">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-0.5">✕</span>
                <span>Four separate agencies with zero shared accountability.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-0.5">✕</span>
                <span>Brand films that look pretty but drive zero pipeline.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-mono text-sm mt-0.5">✕</span>
                <span>Performance buyers burning budget on generic Canva templates.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.06] font-mono text-xs text-red-400/80">
            RESULT: RISING CAC &amp; DILUTED PRICING POWER
          </div>
        </SpotlightCard>

        {/* Right: The Pop Lab Connected Flywheel */}
        <SpotlightCard
          spotlightColor="rgba(255, 94, 20, 0.16)"
          className="p-8 sm:p-10 flex flex-col justify-between border-[#FF5E14]/30 bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_40px_rgba(255,94,20,0.08)]"
        >
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] font-medium">
                POP LAB STUDIO
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FF5E14]/20 text-[#FF5E14] border border-[#FF5E14]/40 uppercase tracking-wider">
                SYNCHRONIZED
              </span>
            </div>

            <ul className="space-y-4 font-sans text-sm sm:text-base text-white">
              <li className="flex items-start gap-3">
                <span className="text-[#FF5E14] font-mono text-sm mt-0.5">✓</span>
                <span>One unified studio managing brand, media, and PR under one P&amp;L.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF5E14] font-mono text-sm mt-0.5">✓</span>
                <span>Cinematic creative designed specifically to lower paid CAC.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF5E14] font-mono text-sm mt-0.5">✓</span>
                <span>Cultural PR and AI citations that generate compounding organic demand.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.06] font-mono text-xs text-[#FF5E14]">
            RESULT: BLENDED EFFICIENCY &amp; CATEGORY GRAVITY
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
