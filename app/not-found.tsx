import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative z-10 overflow-hidden overflow-x-clip py-20">
      {/* Warm ember radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[250px] sm:h-[300px] bg-[radial-gradient(circle,rgba(255,94,20,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      {/* 404 Kicker */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#18150F]/70 backdrop-blur-md mb-6 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14] animate-pulse" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF5E14] font-semibold">
          ERROR 404 // SIGNAL LOST
        </span>
      </div>

      {/* Monumental Headline */}
      <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl text-[#121824] dark:text-[#F5F2EB] tracking-tight mb-6 leading-tight">
        Lost in the <span className="italic text-[#FF5E14]">noise.</span>
      </h1>

      <p className="font-sans text-base sm:text-lg text-[#121824]/75 dark:text-[#F5F2EB]/75 max-w-lg mb-10 font-light leading-relaxed">
        The link you followed has moved, expired, or does not exist in our studio archive.
        Return to the signal.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-grotesk uppercase tracking-[0.2em] font-semibold text-white bg-[#FF5E14] hover:bg-[#E04F0E] transition-all shadow-[0_0_30px_rgba(255,94,20,0.35)] active:scale-95"
        >
          <span>Return Home</span>
          <span className="ml-1.5 font-sans">→</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs font-grotesk uppercase tracking-[0.2em] font-medium text-[#121824] dark:text-[#F5F2EB] bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/15 hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition-all"
        >
          Start a Project
        </Link>
      </div>
    </div>
  );
}
