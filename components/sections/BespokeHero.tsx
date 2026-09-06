'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

// Emil Kowalski spring physics config
const springTransition = { type: 'spring' as const, stiffness: 300, damping: 30 };

/**
 * InkMistCanvas: Organic, breathing mountain mist wisps rendered on HTML5 Canvas.
 * Replaces geometric particle bubbles with horizontal multi-altitude wispy fog ribbons.
 */
const InkMistCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mist wisps simulating mountain fog layers
    const wisps: {
      x: number;
      y: number;
      width: number;
      height: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
      phase: number;
    }[] = [];

    const initWisps = () => {
      wisps.length = 0;
      const count = Math.min(6, Math.max(3, Math.floor(width / 240)));
      for (let i = 0; i < count; i++) {
        wisps.push({
          x: Math.random() * width,
          y: height * 0.4 + Math.random() * (height * 0.45),
          width: Math.random() * 350 + 200,
          height: Math.random() * 60 + 30,
          speedX: (Math.random() * 0.2 + 0.05) * (i % 2 === 0 ? 1 : -0.6),
          opacity: Math.random() * 0.025 + 0.01,
          pulseSpeed: Math.random() * 0.006 + 0.002,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initWisps();
    };

    window.addEventListener('resize', onResize);
    initWisps();

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      wisps.forEach((w) => {
        w.x += w.speedX;
        w.phase += w.pulseSpeed;

        // Wrap around horizontally
        if (w.x - w.width > width) w.x = -w.width;
        if (w.x + w.width < 0) w.x = width + w.width;

        const currentOpacity = w.opacity * (1 + 0.2 * Math.sin(w.phase));

        // Draw whisper-soft horizontal elliptical cloud ribbon
        const gradient = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.width * 0.5);
        gradient.addColorStop(0, `rgba(245, 242, 235, ${currentOpacity * 1.2})`);
        gradient.addColorStop(0.5, `rgba(245, 242, 235, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(245, 242, 235, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(w.x, w.y, w.width * 0.5, w.height * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20 z-20"
    />
  );
};

export default function BespokeHero() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
    const updateTheme = () => {
      const isLight = document.documentElement.classList.contains('light');
      setIsDark(!isLight);
    };

    updateTheme();

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Scroll offsets for text
  const textY = useTransform(scrollY, [0, 600], [0, 140]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0.15]);
  return (
    <section
      id="hero"
      className={`relative w-full min-h-[100svh] min-h-screen overflow-hidden overflow-x-clip transition-colors duration-500 flex flex-col justify-between pt-28 sm:pt-36 md:pt-44 pb-10 sm:pb-14 px-5 sm:px-10 md:px-16 lg:px-20 z-10 ${
        isDark ? 'bg-[#070B10]' : 'bg-[#F5F2EB]'
      }`}
    >
      {/* =========================================================================
          THE AWAKENING: AUTHENTIC JAPANESE INK WASH SUNRISE VIDEO
          One-time cinematic sunrise entrance: cranes gliding, mist rolling,
          and amber sun rising behind the ancient pine mountain ridge.
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/hero-sunrise-poster.webp"
          className={`w-full h-full object-cover object-bottom transition-all duration-1000 ${
            isDark
              ? 'invert-[0.96] contrast-[1.1] brightness-[0.75] opacity-35 sm:opacity-45'
              : 'contrast-[1.0] opacity-35 sm:opacity-45'
          }`}
        >
          <source src="/hero-sunrise-mobile.webm" type="video/webm" media="(max-width: 768px)" />
          <source src="/hero-sunrise.webm" type="video/webm" />
          <source src="/hero-sunrise-fast.mp4" type="video/mp4" />
        </video>
      </div>

      {/* =========================================================================
          FLUID INK MIST ENGINE (CANVAS RIBBONS)
          ========================================================================= */}
      <InkMistCanvas />

      {/* Directional Vignette for High-Contrast Typography */}
      <div
        className={`absolute inset-0 pointer-events-none z-25 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-r from-[#070B10]/80 via-[#070B10]/35 to-transparent'
            : 'bg-gradient-to-r from-[#F5F2EB]/85 via-[#F5F2EB]/40 to-transparent'
        }`}
      />
      <div
        className={`absolute inset-0 pointer-events-none z-25 transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-t from-[#070B10] via-transparent to-[#070B10]/20'
            : 'bg-gradient-to-t from-[#F5F2EB] via-transparent to-[#F5F2EB]/20'
        }`}
      />

      {/* =========================================================================
          4. SCULPTED DIRECT-RESPONSE HERO TYPOGRAPHY & CALLS TO ACTION
          ========================================================================= */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-40 flex flex-col items-start text-left max-w-4xl my-auto"
      >
        {/* Kicker Badge */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springTransition, delay: 0.15 }}
          className="mb-6"
        >
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md shadow-sm transition-colors ${
              isDark ? 'border-white/12 bg-white/[0.04]' : 'border-black/10 bg-white/70'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#FF5E14] font-semibold">
              // CREATIVE GROWTH STUDIO &bull; POP LAB
            </span>
          </div>
        </motion.div>

        {/* Master Headline (Fluid Clamp Scale) */}
        <motion.h1
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springTransition, delay: 0.25 }}
          className={`font-serif text-[clamp(2.75rem,7.2vw,6.5rem)] leading-[0.98] tracking-tight mb-6 sm:mb-8 max-w-[15ch] transition-colors ${
            isDark ? 'text-[#F5F2EB]' : 'text-[#070B10]'
          }`}
        >
          We build brands <br />
          people <span className="italic font-serif text-[#FF5E14]">notice.</span>
        </motion.h1>

        {/* Narrative Description */}
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springTransition, delay: 0.35 }}
          className={`font-sans text-[clamp(0.95rem,1.2vw+0.65rem,1.25rem)] max-w-[48ch] leading-relaxed font-light mb-8 sm:mb-10 transition-colors ${
            isDark ? 'text-[#F5F2EB]/75' : 'text-[#070B10]/80'
          }`}
        >
          Story First. Performance Always. We unite brand identity, creator-driven cultural PR,
          and server-side paid media to scale customer acquisition, reduce blended CAC, and generate defensible revenue.
        </motion.p>

        {/* Direct-Response Dual CTAs (Interactive Magnetic Physics) */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springTransition, delay: 0.45 }}
          className="flex items-center gap-4 sm:gap-5 flex-wrap"
        >
          <MagneticButton href="/contact" variant="primary" strength={0.35}>
            Claim Growth Diagnostic &rarr;
          </MagneticButton>
          <MagneticButton
            href="#services"
            variant="secondary"
            strength={0.25}
            className={!isDark ? '!bg-white/80 !text-[#070B10] !border-black/20 shadow-sm' : ''}
          >
            Explore 4-Act Engine
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          5. KINETIC NARRATIVE TICKER (BOTTOM ANCHOR)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className={`relative z-40 w-full pt-8 flex items-center justify-between border-t text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-colors ${
          isDark ? 'border-white/[0.08] text-[#F5F2EB]/50' : 'border-black/10 text-[#070B10]/60'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          THE AWAKENING &bull; CREATIVE GROWTH STUDIO
        </span>
        <div className="hidden sm:flex items-center gap-6 text-[#F5F2EB]/40">
          <span className="hover:text-[#F5F2EB] transition-colors">01 / BRAND ENGINE</span>
          <span className="hover:text-[#F5F2EB] transition-colors">02 / ATTENTION ENGINE</span>
          <span className="hover:text-[#F5F2EB] transition-colors">03 / GROWTH ENGINE</span>
        </div>
      </motion.div>
    </section>
  );
}
