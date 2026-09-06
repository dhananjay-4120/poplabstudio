import React from 'react';
import HeritageFooter from '@/components/sections/HeritageFooter';
import Link from 'next/link';

export const metadata = {
  title: 'Heritage Grove Footer Showcase — Pop Lab Studio',
  description: 'Hand-drawn teal ink landscape with flying cranes and seamless motion loop in Next.js.',
};

export default function HeritagePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-500">
      {/* Editorial Intro Banner */}
      <section className="pt-36 pb-16 px-6 max-w-5xl mx-auto text-center">
        <span className="font-mono text-xs text-[#FF5E14] uppercase tracking-widest block mb-4">
          // MOTION STUDY &bull; HERITAGE GROVE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light mb-6 tracking-tight">
          Teal Ink Landscape &amp; Looping Cranes
        </h1>
        <p className="font-sans text-base sm:text-lg opacity-70 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Full-viewport footer showcase with 1080p hand-drawn ink landscape video background and seamless
          dual-buffer crossfade looping.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/heritage-footer.html"
            target="_blank"
            className="px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/[0.15] border border-black/10 dark:border-white/[0.12] text-xs font-mono uppercase tracking-widest transition-all"
          >
            Open Standalone index.html ↗
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-[#FF5E14] hover:bg-[#E04F0E] text-xs font-mono uppercase tracking-widest text-white transition-all shadow-md hover:shadow-lg"
          >
            Return to Pop Lab Home &rarr;
          </Link>
        </div>
      </section>

      {/* The Animated Heritage Footer (Responsive & Dual-Theme) */}
      <HeritageFooter />
    </div>
  );
}
