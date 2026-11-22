'use client';

import React, { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Check if error is related to chunk loading failure
    const isChunk =
      error.message?.includes('ChunkLoadError') ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('dynamically imported module');

    if (isChunk) {
      const key = 'poplab_chunk_retry_timestamp';
      const now = Date.now();
      const last = sessionStorage.getItem(key);
      if (!last || now - parseInt(last, 10) > 10000) {
        sessionStorage.setItem(key, now.toString());
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative z-10 overflow-hidden py-24 bg-[#070B10] text-[#F5F2EB]">
      <div className="w-16 h-16 rounded-full bg-[#FF5E14]/10 border border-[#FF5E14]/30 flex items-center justify-center mb-6">
        <span className="w-3 h-3 rounded-full bg-[#FF5E14] animate-ping" />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#18150F]/70 backdrop-blur-md mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF5E14] font-semibold">
          SYSTEM REFRESH REQUIRED
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EB] tracking-tight mb-4 max-w-xl leading-tight">
        Signal momentarily <span className="italic text-[#FF5E14]">interrupted.</span>
      </h1>

      <p className="font-sans text-sm sm:text-base text-[#F5F2EB]/70 max-w-md mb-8 font-light leading-relaxed">
        A newer version of the studio experience was deployed, or your connection briefly stalled. Click below to reconnect.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => {
            reset();
            window.location.reload();
          }}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-grotesk uppercase tracking-[0.2em] font-semibold text-white bg-[#FF5E14] hover:bg-[#E04F0E] transition-all shadow-[0_0_30px_rgba(255,94,20,0.35)] active:scale-95 cursor-pointer"
        >
          Reconnect Signal →
        </button>
        <button
          onClick={() => {
            window.location.href = '/';
          }}
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs font-grotesk uppercase tracking-[0.2em] font-medium text-[#F5F2EB] bg-white/[0.05] border border-white/15 hover:bg-white/[0.1] transition-all cursor-pointer"
        >
          Return to Studio
        </button>
      </div>
    </div>
  );
}
