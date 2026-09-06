'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CASE_STUDIES } from '@/data/case-studies';
import {
  InkSealStamp,
  HandDrawnHighlight,
  SignalFiltrationDiagram,
} from '@/components/ui/VisualSoul';

type FilterKey = 'all' | 'meta' | 'google' | 'b2b' | 'd2c';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All Cases (8)' },
  { key: 'meta', label: 'Meta Performance' },
  { key: 'google', label: 'Google Search' },
  { key: 'd2c', label: 'Shopify / D2C' },
  { key: 'b2b', label: 'B2B Enterprise' },
];

export default function WorkClient() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredCases =
    activeFilter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.filterCategory === activeFilter);

  return (
    <div className="w-full relative z-10 pt-28 sm:pt-36 pb-24 px-5 sm:px-10 md:px-16 max-w-6xl mx-auto overflow-x-hidden">
      {/* Top Folio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-black/10 dark:border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
          SELECTED WORK · PERFORMANCE ARCHITECTURE
        </span>
        <span>VOL. 03 // AD ACCOUNT AUDITS</span>
      </div>

      {/* Hero Narrative */}
      <div className="max-w-3xl mb-16 sm:mb-20 relative">
        <div className="flex items-center gap-3 mb-4">
          <InkSealStamp text="POP LAB" subtext="PROOF" size={48} />
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5E14]">
            VERIFIABLE SPEND &amp; REVENUE DATA
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121824] dark:text-[#F5F2EB] tracking-tight leading-[1.05] mb-6">
          Selected work, <br />
          names <HandDrawnHighlight strokeColor="#FF5E14"><em>withheld.</em></HandDrawnHighlight>
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#121824]/80 dark:text-[#F5F2EB]/75 font-light leading-relaxed max-w-2xl">
          Real campaigns across luxury, D2C, travel, B2B and wellness. Client names are withheld under strict confidentiality agreements - the numbers are exactly as run, pulled straight from verified Meta and Google Ads managers.
        </p>

      </div>

      {/* Verifiable Proof Metric Capsule Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 dark:bg-white/10 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 mb-20 shadow-sm">
        <div className="p-6 sm:p-8 bg-white dark:bg-[#0D1522]">
          <div className="font-serif text-2xl sm:text-3xl text-[#FF5E14] mb-1">₹24.72L</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
            D2C Bakery Purchase Value
          </div>
          <div className="font-mono text-[11px] text-[#121824]/80 dark:text-[#F5F2EB]/80 mt-2 font-medium">
            4.10x Blended ROAS
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white dark:bg-[#0D1522]">
          <div className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-white mb-1">₹628</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
            Luxury Jewellery CPC
          </div>
          <div className="font-mono text-[11px] text-[#121824]/80 dark:text-[#F5F2EB]/80 mt-2 font-medium">
            Intent Filter · 5-7 Consults
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white dark:bg-[#0D1522]">
          <div className="font-serif text-2xl sm:text-3xl text-[#FF5E14] mb-1">11.4L</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
            Europe Travel Reach
          </div>
          <div className="font-mono text-[11px] text-[#121824]/80 dark:text-[#F5F2EB]/80 mt-2 font-medium">
            ₹131 CPL vs ₹130 Target
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white dark:bg-[#0D1522]">
          <div className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-white mb-1">97</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
            Enterprise Meetings Booked
          </div>
          <div className="font-mono text-[11px] text-[#121824]/80 dark:text-[#F5F2EB]/80 mt-2 font-medium">
            54.7% Acceptance Rate
          </div>
        </div>
      </div>

      {/* Philosophical Filter Band */}
      <div className="mb-20">
        <SignalFiltrationDiagram />
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
        {FILTERS.map((f) => {
          const isSelected = activeFilter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-[#FF5E14] text-white shadow-[0_0_20px_rgba(255,94,20,0.35)]'
                  : 'bg-black/[0.04] dark:bg-white/[0.04] text-[#121824]/70 dark:text-[#F5F2EB]/60 hover:text-[#121824] dark:hover:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/5 dark:border-white/5'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Case Studies List / Grid */}
      <div className="space-y-8">
        {filteredCases.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group block p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 hover:border-[#FF5E14]/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Details (7 cols) */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 font-mono text-xs mb-3">
                  <span className="text-[#FF5E14] font-semibold">{cs.index}</span>
                  <span className="text-black/30 dark:text-white/30">•</span>
                  <span className="text-[#121824]/60 dark:text-[#F5F2EB]/50 uppercase tracking-wider">
                    {cs.categoryTag}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl text-[#121824] dark:text-[#F5F2EB] group-hover:text-[#FF5E14] transition-colors mb-4">
                  {cs.title} <em>{cs.italicAccent}</em>
                </h2>

                <p className="font-sans text-sm sm:text-base text-[#121824]/75 dark:text-[#F5F2EB]/70 font-light leading-relaxed mb-6 max-w-xl">
                  {cs.heroLede}
                </p>

                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5E14] group-hover:translate-x-1 transition-transform">
                  <span>Read Deep-Dive Analysis</span>
                  <span>→</span>
                </div>
              </div>

              {/* Right Key Metrics Grid (5 cols) */}
              <div className="lg:col-span-5 w-full">
                <div className="grid grid-cols-2 gap-px bg-black/10 dark:bg-white/10 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
                  {cs.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 bg-black/[0.02] dark:bg-[#121A2A]"
                    >
                      <div
                        className={`font-serif text-xl sm:text-2xl mb-1 ${
                          m.isHero ? 'text-[#FF5E14]' : 'text-[#121824] dark:text-[#F5F2EB]'
                        }`}
                      >
                        {m.value}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#121824]/60 dark:text-[#F5F2EB]/50 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Conversion CTA Strip */}
      <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#090D14] text-[#121824] dark:text-[#F5F2EB] border border-black/10 dark:border-white/10 text-center relative overflow-hidden shadow-xl dark:shadow-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(255,94,20,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] block mb-3">
            YOUR AD ACCOUNT NEXT
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#121824] dark:text-white mb-4 leading-tight">
            Want this kind of read on <em>your spend?</em>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#121824]/75 dark:text-white/75 font-light leading-relaxed mb-8 max-w-lg mx-auto">
            Book a 30-minute growth diagnostic. We&apos;ll open your ad accounts live on screen share, pinpoint where budget is leaking, and map your highest-margin opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF5E14] hover:bg-[#E04F0E] text-white font-grotesk text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-[0_0_30px_rgba(255,94,20,0.4)] hover:scale-105"
          >
            <span>Book a Teardown</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
