import React from 'react';
import JapanesePaintingLandscape from '@/components/sections/JapanesePaintingLandscape';
import Link from 'next/link';

export const metadata = {
  title: 'Detailed Japanese Painting SVG Showcase — Pop Lab Studio',
  description: 'Authentic vector Ukiyo-e and Sumi-e landscape with Torii gate, ancient gnarled pine trees, craggy mountains, and flying cranes.',
};

export default function ArtPreviewPage() {
  return (
    <div className="min-h-screen bg-[#070B10] text-[#F5F2EB] flex flex-col justify-between relative overflow-hidden">
      {/* Top Banner & Navigation */}
      <header className="pt-32 pb-8 px-6 max-w-5xl mx-auto text-center z-30">
        <span className="font-mono text-xs text-[#FF5E14] uppercase tracking-widest block mb-3">
          // ART SHOWCASE &bull; HIGH-DETAIL VECTOR ARTWORK
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-light mb-4 tracking-tight">
          Authentic Japanese Painting Vector (1920&times;1080)
        </h1>
        <p className="font-sans text-sm sm:text-base opacity-70 max-w-2xl mx-auto mb-6 font-light">
          Extracted multi-layer vector illustration featuring ancient gnarled pines (*Matsu*), traditional Torii shrine gate, layered ink-wash peaks, ukiyo-e clouds, and red-crowned cranes.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-[#FF5E14] hover:bg-[#E04F0E] text-xs font-mono uppercase tracking-widest text-white transition-all shadow-md"
          >
            View on Live Homepage &rarr;
          </Link>
          <a
            href="/japanese_landscape.svg"
            target="_blank"
            className="px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-mono uppercase tracking-widest text-white transition-all"
          >
            Open Raw SVG File ↗
          </a>
        </div>
      </header>

      {/* Main Full-Scale Canvas Display */}
      <div className="relative w-full h-[70vh] min-h-[500px] border-y border-white/10 overflow-hidden bg-[#070B10]">
        <JapanesePaintingLandscape isDark={true} className="absolute inset-0" />
      </div>

      {/* Footer Info */}
      <footer className="py-8 text-center text-xs font-mono text-[#F5F2EB]/40 z-30">
        POP LAB STUDIO &bull; CRAFTED VECTOR ASSET PIPELINE
      </footer>
    </div>
  );
}
