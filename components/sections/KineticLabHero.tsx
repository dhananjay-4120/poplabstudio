'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowUpRight, Activity, Terminal, ShieldCheck, Zap } from 'lucide-react';

// Emil Kowalski spring physics config
const springTransition = { type: 'spring' as const, stiffness: 300, damping: 30 };

/**
 * KineticLabCanvas:
 * An interactive, 60fps kinetic particle matrix & force field.
 * Reacts to mouse pointer movements with spring physics and draws delicate
 * telemetry lattice vectors between proximate nodes.
 */
interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

const KineticLabCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
      isHovered: false,
    };

    const particles: Particle[] = [];
    const particleCount = Math.min(75, Math.max(30, Math.floor((width * height) / 20000)));

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const isAccent = Math.random() < 0.22;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: isAccent ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.8,
          alpha: isAccent ? Math.random() * 0.6 + 0.35 : Math.random() * 0.35 + 0.15,
          color: isAccent ? '#FF5E14' : '#F5F2EB',
        });
      }
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovered = true;
    };

    const onPointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovered = false;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle architectural gridlines
      const gridSize = 120;
      ctx.strokeStyle = 'rgba(245, 242, 235, 0.025)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!shouldReduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse repulsion force
          if (mouse.isHovered) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              const angle = Math.atan2(dy, dx);
              p.x -= Math.cos(angle) * force * 3.5;
              p.y -= Math.sin(angle) * force * 3.5;
            }
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#FF5E14' 
          ? `rgba(255, 94, 20, ${p.alpha})`
          : `rgba(245, 242, 235, ${p.alpha})`;
        ctx.fill();

        // Connect proximate neighbors with lattice lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color === '#FF5E14' || p2.color === '#FF5E14'
              ? `rgba(255, 94, 20, ${lineAlpha * 1.5})`
              : `rgba(245, 242, 235, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw faint interactive cursor aura
      if (mouse.isHovered && !shouldReduceMotion) {
        const auraGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        auraGrad.addColorStop(0, 'rgba(255, 94, 20, 0.08)');
        auraGrad.addColorStop(0.5, 'rgba(14, 77, 122, 0.04)');
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      cancelAnimationFrame(animId);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 opacity-70"
      aria-hidden="true"
    />
  );
};

export default function KineticLabHero() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'roas' | 'aeo' | 'cro'>('roas');
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  const textY = useTransform(scrollY, [0, 500], [0, 90]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);

  // Telemetry HUD telemetry stats
  const stats = [
    { label: 'AVG CLIENT ROAS', value: '4.8x', sub: 'Horizontal Meta/Google scale' },
    { label: 'CAC PAYBACK', value: '<2.4 MO', sub: 'Server-side CAPI attribution' },
    { label: 'AEO / GEO VISIBILITY', value: '98.4%', sub: 'ChatGPT & Perplexity citations' },
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] min-h-screen overflow-hidden overflow-x-clip bg-[#070B10] text-[#F5F2EB] flex flex-col justify-between pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-12 px-5 sm:px-10 md:px-16 lg:px-24 z-10 selection:bg-[#FF5E14] selection:text-white"
    >
      {/* =========================================================================
          1. 60FPS KINETIC PARTICLE MATRIX & ARCHITECTURAL GRID
          ========================================================================= */}
      <KineticLabCanvas />

      {/* Ambient Radial Spotlight (Warm Amber Laboratory Burn) */}
      <div 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[650px] rounded-full pointer-events-none opacity-20 blur-[130px] -z-10"
        style={{
          background: 'radial-gradient(circle, #FF5E14 0%, #0E4D7A 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Noise / Tactile Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-15 opacity-60" />

      {/* =========================================================================
          2. HERO CONTENT & ASYMMETRIC GRID COMPOSITION
          ========================================================================= */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-30 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column: Master Typography & Direct-Response Pitch (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Telemetry Kicker Pill */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-inner"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E14] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E14]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#F5F2EB]/90 font-medium">
              SYS-01 // CREATIVE GROWTH LAB &bull; CHANDIGARH &times; GLOBAL
            </span>
          </motion.div>

          {/* Master Display Headline */}
          <motion.h1
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="font-serif text-[clamp(2.75rem,6.8vw,6.25rem)] leading-[0.98] tracking-tight mb-6 max-w-[14ch]"
          >
            We build brands <br />
            people <span className="italic font-serif text-[#FF5E14]">notice.</span>
          </motion.h1>

          {/* Narrative Value Proposition */}
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...springTransition, delay: 0.3 }}
            className="font-sans text-[clamp(1rem,1.15vw+0.65rem,1.25rem)] max-w-[46ch] leading-relaxed font-light text-[#F5F2EB]/75 mb-8 sm:mb-10"
          >
            Story First. Performance Always. We unite high-craft brand identity, 
            creator-driven cultural PR, and server-side paid media to scale customer acquisition, 
            reduce blended CAC, and generate defensible revenue.
          </motion.p>

          {/* Direct-Response Conversion CTAs */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...springTransition, delay: 0.4 }}
            className="flex items-center gap-5 sm:gap-6 flex-wrap"
          >
            <MagneticButton href="/contact" variant="primary" strength={0.35}>
              Claim Growth Diagnostic &rarr;
            </MagneticButton>

            <a
              href="#engines"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-[#F5F2EB]/70 hover:text-[#FF5E14] transition-colors py-2"
            >
              <span>Explore 4-Act Engine</span>
              <span className="transform group-hover:translate-y-0.5 transition-transform duration-200">
                &darr;
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Interactive Laboratory Telemetry Capsule (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 0.45 }}
          className="lg:col-span-5 w-full flex flex-col justify-center"
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-7 shadow-2xl overflow-hidden group">
            {/* Corner Registration Crosshairs */}
            <div className="absolute top-2.5 left-2.5 font-mono text-[9px] text-white/20 select-none">+</div>
            <div className="absolute top-2.5 right-2.5 font-mono text-[9px] text-white/20 select-none">+</div>
            <div className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-white/20 select-none">+</div>
            <div className="absolute bottom-2.5 right-2.5 font-mono text-[9px] text-white/20 select-none">+</div>

            {/* Header HUD */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/60">
                  GROWTH_CORE_ENGINE.v2
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] tracking-wider uppercase text-emerald-400">
                  ONLINE
                </span>
              </div>
            </div>

            {/* Performance Metrics Rows */}
            <div className="space-y-4 mb-6">
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-white/[0.04] bg-white/[0.02] hover:border-[#FF5E14]/30 hover:bg-white/[0.04] transition-all"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/50 mb-0.5">
                      {stat.label}
                    </div>
                    <div className="text-xs text-white/70 font-light">
                      {stat.sub}
                    </div>
                  </div>
                  <div className="font-mono text-lg sm:text-xl font-bold text-[#FF5E14] tracking-tight">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Real-time Studio Engine Pipeline Badges */}
            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#FF5E14]" />
                CAPI SYNC: 100%
              </span>
              <span>GEO CITATIONS: ACTIVE</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* =========================================================================
          3. BOTTOM ANCHOR TICKER (TELEMETRY STRIP)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-30 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08] text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#F5F2EB]/50"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
          <span>POPLAB STUDIO &bull; ARCHITECTURE // CHANDIGARH</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[#F5F2EB]/40">
          <span className="hover:text-[#F5F2EB] transition-colors cursor-default">01 / BRAND ENGINE</span>
          <span className="hover:text-[#F5F2EB] transition-colors cursor-default">02 / ATTENTION ENGINE</span>
          <span className="hover:text-[#F5F2EB] transition-colors cursor-default">03 / GROWTH ENGINE</span>
        </div>

        <div className="text-[#F5F2EB]/40">
          COORDS: 30.7226&deg; N, 76.7684&deg; E
        </div>
      </motion.div>
    </section>
  );
}
