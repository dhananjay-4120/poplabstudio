'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070B10] text-[#F5F2EB] min-h-screen flex items-center justify-center p-6 antialiased font-sans">
        <div className="flex flex-col items-center justify-center text-center max-w-md">
          <div className="w-14 h-14 rounded-full bg-[#FF5E14]/10 border border-[#FF5E14]/30 flex items-center justify-center mb-6">
            <span className="w-3 h-3 rounded-full bg-[#FF5E14] animate-ping" />
          </div>

          <h2 className="text-2xl font-serif tracking-tight mb-3">
            Pop Lab Studio Connection Refreshed
          </h2>

          <p className="text-sm text-[#F5F2EB]/70 mb-8 font-light leading-relaxed">
            The studio application updated in the background. Tap below to reload the experience.
          </p>

          <button
            onClick={() => {
              reset();
              window.location.reload();
            }}
            className="px-8 py-3 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold text-white bg-[#FF5E14] hover:bg-[#E04F0E] transition-all cursor-pointer shadow-[0_0_30px_rgba(255,94,20,0.35)] active:scale-95"
          >
            Reload Studio →
          </button>
        </div>
      </body>
    </html>
  );
}
