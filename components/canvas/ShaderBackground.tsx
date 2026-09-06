'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { CSSGradientFallback } from './ViewportCanvas';

/**
 * Isolated dynamic import with ssr: false to prevent WebGL hydration errors.
 * Displays an anti-void CSS gradient fallback during initialization.
 */
const ViewportCanvas = dynamic(() => import('./ViewportCanvas'), {
  ssr: false,
  loading: () => <CSSGradientFallback />,
});

export default function ShaderBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Dynamic 3D WebGL Canvas Layer */}
      <ViewportCanvas />

      {/* Dark Atmospheric Contrast Overlay (Maintains WCAG AAA contrast for Bone Alabaster typography) */}
      <div className="absolute inset-0 bg-[#090D14]/65 pointer-events-none" />

      {/* Radial Vignette Overlay for Cinematic Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(9, 13, 20, 0.85) 100%)',
        }}
      />
    </div>
  );
}
