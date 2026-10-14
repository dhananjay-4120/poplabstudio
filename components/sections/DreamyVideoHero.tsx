'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DreamyVideoHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Studio Hero"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 md:pt-44 pb-10 sm:pb-14 px-5 sm:px-10 md:px-16 lg:px-20 z-10 bg-[#050505]"
    >
      {/* =========================================================================
          1. FULL-BLEED AMBIENT DREAMY VIDEO LAYER (Desktop + Mobile)
          ========================================================================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        {/* Procedural Liquid Glass Aura (Failsafe Instant Underlay) */}
        <div className="absolute inset-0 bg-[#050505]">
          {/* Luminous Warm Amber & Oceanic Caustics */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[750px] sm:w-[1000px] h-[550px] sm:h-[700px] rounded-full pointer-events-none opacity-40 blur-[130px] animate-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 94, 20, 0.35) 0%, rgba(14, 77, 122, 0.25) 45%, transparent 75%)',
              animationDuration: '8s',
            }}
          />
        </div>

        {/* Ambient Video Loop (Veo / Cinematic Studio Stream) */}
        {mounted && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero-sunrise-poster.webp"
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03] opacity-65 sm:opacity-75 transition-opacity duration-1000 mix-blend-screen"
          >
            <source src="/hero_clean.mp4" type="video/mp4" />
            <source src="/hero-sunrise.webm" type="video/webm" />
          </video>
        )}

        {/* Cinematic Scrims: Edge Falloff to Pure Void #050505 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,5,0.7)_65%,#050505_100%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          2. MINIMALIST EDITORIAL HEADLINE STAGE (Max Impact, Zero Clutter)
          ========================================================================= */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto relative z-20">
        {/* Floating Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F5F2EB]/90 font-medium">
            Creative Growth Studio · 2026
          </span>
        </motion.div>

        {/* Master Punchy Headline: 5-7 Words */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-[84px] tracking-[-0.03em] text-white leading-[1.04] mb-6 max-w-4xl"
        >
          WE MAKE BRANDS <br />
          <span className="text-[#FF5E14] font-serif italic font-normal tracking-normal">
            IMPOSSIBLE
          </span>{' '}
          TO IGNORE.
        </motion.h1>

        {/* High-Status Value Hook: Under 20 Words */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-base sm:text-lg md:text-xl text-[#F5F2EB]/75 font-light max-w-2xl leading-relaxed mb-10"
        >
          Story First. Growth Always. We engineer provocative brand identity,
          cinematic film, and high-velocity acquisition for category leaders.
        </motion.p>

        {/* Action Pair: Primary Pill CTA + Frosted Secondary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary High-Contrast White Pill */}
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-sans text-sm font-semibold tracking-wide text-black bg-white hover:bg-[#F5F2EB] transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.22)] hover:scale-105 active:scale-95"
          >
            <span>Start a Project</span>
            <span className="ml-2 text-base leading-none">→</span>
          </Link>

          {/* Secondary Liquid Glass Pill */}
          <a
            href="#engines"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide text-[#F5F2EB]/90 liquid-glass-pill transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Explore The 3 Engines</span>
            <span className="ml-2 text-xs opacity-60">↓</span>
          </a>
        </motion.div>
      </div>

      {/* =========================================================================
          3. BOTTOM FLOATING TELEMETRY CAPSULE (Apple / Scrollytelling Cue)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-4xl mx-auto pt-8 border-t border-white/[0.08] relative z-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#F5F2EB]/60">
              01 · Brand Architecture
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D7A]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#F5F2EB]/60">
              02 · Cultural Attention
            </span>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#F5F2EB]/60">
              03 · Revenue Velocity
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
