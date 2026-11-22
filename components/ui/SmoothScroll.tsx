'use client';

import React from 'react';
import { ReactLenis, useLenis } from 'lenis/react';

/**
 * High-performance scroll state container.
 * Read directly in requestAnimationFrame / useFrame loops without triggering React state re-renders.
 */
export const scrollMetrics = {
  velocity: 0,
  progress: 0,
  current: 0,
  target: 0,
};

function LenisScrollSync() {
  useLenis((lenis) => {
    scrollMetrics.velocity = lenis.velocity;
    scrollMetrics.progress = lenis.progress;
    scrollMetrics.current = lenis.scroll;
    scrollMetrics.target = lenis.targetScroll;
  });

  return null;
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <LenisScrollSync />
      {children}
    </ReactLenis>
  );
}
