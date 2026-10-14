'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactCTA() {
  return (
    <section
      id="contact"
      aria-label="Direct Partnership Consultation"
      className="w-full scroll-mt-28 sm:scroll-mt-36 py-24 sm:py-32 md:py-40 px-5 sm:px-10 md:px-16 relative z-10 max-w-5xl mx-auto text-center"
    >
      <div className="relative p-8 sm:p-14 md:p-16 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Warm Ember & Obsidian Caustics */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,94,20,0.25)_0%,rgba(255,94,20,0.05)_50%,transparent_75%)] pointer-events-none blur-3xl" />

        {/* Studio Kicker Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] backdrop-blur-xl mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF5E14] font-semibold">
            PARTNERSHIP INQUIRIES
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.06] mb-5 max-w-2xl mx-auto">
          Ready to build <br />
          <span className="italic font-serif font-normal text-[#FF5E14]">cultural gravity?</span>
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg text-[#F5F2EB]/70 font-light max-w-lg mx-auto mb-10 leading-relaxed">
          We take on a strictly limited roster of ambitious brands each quarter. Direct senior execution, zero junior hand-offs.
        </p>

        {/* Action Pair */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-sans text-sm font-semibold tracking-wide text-black bg-white hover:bg-[#F5F2EB] transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95"
          >
            <span>Book 30-Min Diagnostic</span>
            <span className="ml-2 text-base leading-none">→</span>
          </Link>

          <a
            href="https://wa.me/918837565738"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full font-sans text-sm font-medium tracking-wide text-white liquid-glass-pill transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] mr-2" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Trust Safeguards */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs font-mono uppercase tracking-wider text-[#F5F2EB]/50 border-t border-white/[0.08] pt-8 max-w-lg mx-auto">
          <span>Senior Partner Access</span>
          <span>·</span>
          <span>Zero Long-Term Lock-in</span>
          <span>·</span>
          <span>Full IP Ownership</span>
        </div>
      </div>
    </section>
  );
}
