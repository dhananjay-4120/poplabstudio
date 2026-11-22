'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * AtmosphericBackground
 * 
 * Replaces heavy, flickering WebGL canvases with a high-craft, hardware-accelerated
 * atmospheric layer:
 * 1. 35mm Tactile Film Grain / Noise Overlay (SVG feTurbulence)
 * 2. Mouse-Reactive Ambient Torch Aura (Lerped at 60fps via requestAnimationFrame)
 * 3. Minimalist Architectural Grid & Registration Crosshairs ('+')
 * 4. Deep Atmospheric Contrast Vignette (WCAG AAA legibility)
 */
export default function AtmosphericBackground() {
  const [mounted, setMounted] = useState(false);
  const auraRef = useRef<HTMLDivElement>(null);
  
  // Physics state for smooth lerped mouse tracking
  const mouseState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isActive: false,
  });

  useEffect(() => {
    setMounted(true);

    // Center the aura initially
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    mouseState.current.targetX = initialX;
    mouseState.current.targetY = initialY;
    mouseState.current.currentX = initialX;
    mouseState.current.currentY = initialY;

    const handlePointerMove = (e: PointerEvent) => {
      mouseState.current.targetX = e.clientX;
      mouseState.current.targetY = e.clientY;
      mouseState.current.isActive = true;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let animationFrameId: number;

    const animateAura = () => {
      const state = mouseState.current;
      // Butter-smooth lerp factor (0.075 provides fluid organic trailing)
      state.currentX += (state.targetX - state.currentX) * 0.075;
      state.currentY += (state.targetY - state.currentY) * 0.075;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateAura);
    };

    animationFrameId = requestAnimationFrame(animateAura);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Void Base Layer */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* 2. Architectural Blueprint Grid & Crosshairs */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Subtle Coordinate Registration Dots */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 94, 20, 0.8) 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          backgroundPosition: '-0.5px -0.5px',
        }}
      />

      {/* 3. Mouse-Reactive Ambient Torch Aura (Hardware accelerated) */}
      <div
        ref={auraRef}
        className="absolute top-0 left-0 -ml-[350px] -mt-[350px] w-[700px] h-[700px] pointer-events-none will-change-transform transition-opacity duration-1000"
        style={{
          opacity: mounted ? 1 : 0,
        }}
      >
        {/* Warm Ember Core Glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 94, 20, 0.12) 0%, rgba(255, 94, 20, 0.04) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Maritime Azure Deep Atmospheric Aura */}
        <div
          className="absolute -inset-16 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(14, 77, 122, 0.14) 0%, rgba(26, 36, 54, 0.05) 50%, transparent 75%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Static Subtle Atmosphere Ambient */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255, 94, 20, 0.04) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animationDuration: '10s',
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14, 77, 122, 0.06) 0%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />

      {/* 4. Tactile 35mm Film Grain / Noise Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.04] mix-blend-multiply dark:mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="poplab-tactile-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#poplab-tactile-grain)" />
      </svg>

      {/* 5. Cinematic Vignette (Preserves Editorial Contrast & Readability) */}
      <div className="absolute inset-0 pointer-events-none opacity-100 bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,rgba(5,5,5,0.92)_100%)]" />

    </div>
  );
}
