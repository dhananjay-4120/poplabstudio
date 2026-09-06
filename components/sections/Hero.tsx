'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 280,
        damping: 28,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-5 sm:px-10 md:px-16 lg:px-20 z-10"
    >
      {/* =========================================================================
          DESKTOP BACKGROUND VIDEO LAYER (Widescreen Landscape Only - hidden on mobile)
          ========================================================================= */}
      <div className="hidden md:block absolute inset-0 -z-10 overflow-hidden bg-[#090D14]">
        {mounted && (
          <video
            src="/hero_clean.mp4"
            autoPlay
            loop
            muted
            playsInline
            suppressHydrationWarning
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.04] pointer-events-none opacity-95 transition-opacity duration-1000"
          />
        )}

        {/* Warm Amber Lamp Backlight on Desktop */}
        <div className="absolute top-1/4 right-10 w-[550px] h-[550px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,94,20,0.28)_0%,rgba(255,94,20,0.08)_45%,transparent_70%)] blur-3xl -z-10" />

        {/* Directional Desktop Vignette: Text Contrast on Left, Lamp on Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090D14] via-[#090D14]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-transparent to-[#090D14]/40 pointer-events-none" />
      </div>

      {/* =========================================================================
          1. MOBILE BESPOKE HERO COMPOSITION (< md)
             Intentionally designed mobile rhythm:
             Kicker → Headline → Cinematic Video Capsule → Description → Dual CTAs
          ========================================================================= */}
      <div className="flex flex-col md:hidden w-full max-w-lg mx-auto my-auto pt-2">
        {/* Mobile Kicker Pill */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-[#F5F2EB]/15 bg-white/80 dark:bg-[#18150F]/80 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF5E14] font-semibold">
              CREATIVE GROWTH STUDIO
            </span>
          </div>
        </div>

        {/* Mobile Sculpted Headline */}
        <h1 className="font-serif text-[42px] xs:text-5xl sm:text-6xl tracking-tight text-[#121824] dark:text-[#F5F2EB] leading-[1.02] mb-6">
          We build <br />
          brands <br />
          people <span className="italic font-serif text-[#FF5E14]">notice.</span>
        </h1>

        {/* Mobile Cinematic Video Capsule (Embedded Flow Artifact) */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 shadow-2xl mb-6 bg-[#090D14] group">
          {mounted && (
            <video
              src="/hero_clean.mp4"
              autoPlay
              loop
              muted
              playsInline
              suppressHydrationWarning
              className="w-full h-full object-cover object-[72%_center] scale-[1.02] pointer-events-none"
            />
          )}

          {/* Warm Amber Radiant Glow behind Video Artifact */}
          <div className="absolute -inset-4 bg-[radial-gradient(circle,rgba(255,94,20,0.30)_0%,transparent_70%)] blur-2xl pointer-events-none -z-10" />

          {/* Cinematic subtle edge vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Mobile Description */}
        <p className="font-sans text-sm sm:text-base text-[#121824]/75 dark:text-[#F5F2EB]/80 font-normal leading-relaxed mb-6">
          From brand strategy and creative campaigns to PR, creators, performance marketing, and
          commerce — Pop Lab unites every growth lever under one roof.
        </p>

        {/* Mobile Action Buttons */}
        <div className="flex flex-col gap-3 w-full mb-6">
          <MagneticButton
            href="#contact"
            variant="primary"
            className="w-full py-4 text-xs font-semibold justify-center shadow-[0_0_30px_rgba(255,94,20,0.4)]"
          >
            <span>Let&apos;s Make Your Brand Matter</span>
            <span className="text-base font-sans ml-1">→</span>
          </MagneticButton>

          <MagneticButton
            href="#services"
            variant="secondary"
            className="w-full py-3.5 text-xs font-medium justify-center"
          >
            <span>See The Work</span>
          </MagneticButton>
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP HERO COMPOSITION (md: and above)
             Widescreen Landscape Canvas with generous negative space
          ========================================================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex max-w-3xl flex-col items-start text-left my-auto"
      >
        {/* Kicker Pill */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-black/10 dark:border-[#F5F2EB]/15 bg-white/80 dark:bg-[#18150F]/70 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF5E14] font-semibold">
              CREATIVE GROWTH STUDIO
            </span>
          </div>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#121824] dark:text-[#F5F2EB] leading-[1.05] mb-6"
        >
          We build brands <br />
          people <span className="italic font-serif text-[#FF5E14]">notice.</span>
        </motion.h1>

        {/* Narrative Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-lg md:text-xl text-[#121824]/75 dark:text-[#F5F2EB]/80 font-normal leading-relaxed max-w-2xl mb-10"
        >
          From brand strategy and creative campaigns to PR, creators, performance marketing, and
          commerce — Pop Lab unites every growth lever under one roof.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center gap-4 w-auto"
        >
          <MagneticButton
            href="#contact"
            variant="primary"
            className="px-8 py-4 font-medium tracking-wide transition-all shadow-[0_0_35px_rgba(255,94,20,0.35)]"
          >
            <span>Let&apos;s Make Your Brand Matter</span>
            <span className="text-base font-sans ml-1">→</span>
          </MagneticButton>

          <MagneticButton
            href="#services"
            variant="secondary"
            className="px-8 py-4 font-medium tracking-wide transition-all"
          >
            <span>See The Work</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          3. KINETIC TICKER (Shared Footer Strip)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full border-t border-black/10 dark:border-[#F5F2EB]/10 pt-4 pb-2 mt-6 sm:mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] sm:text-xs font-mono tracking-widest text-[#121824]/50 dark:text-[#F5F2EB]/40 uppercase"
      >
        <span className="text-[#FF5E14]/90 font-medium">Story First. Growth Always.</span>
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 sm:pb-0 text-[10px] sm:text-xs">
          <span>STRATEGY</span>
          <span>→</span>
          <span>CREATIVE</span>
          <span>→</span>
          <span>PR</span>
          <span>→</span>
          <span>CREATORS</span>
          <span>→</span>
          <span>PERFORMANCE</span>
          <span>→</span>
          <span>COMMERCE</span>
        </div>
      </motion.div>
    </section>
  );
}
