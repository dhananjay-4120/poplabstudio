import React from 'react';

const WORDS = ['Brand', 'Content', 'Meta ads', 'Google ads', 'Reels', 'Marketplaces', 'AI search', 'Growth'];

function Track({ className = '' }: { className?: string }) {
  const items = [...WORDS, ...WORDS];
  return (
    <div className={`flex w-max ${className}`}>
      {items.map((w, i) => (
        <span key={i} className="flex items-center gap-6 pr-6 font-display text-[clamp(1.6rem,3.4vw,2.75rem)] leading-none whitespace-nowrap">
          {w}
          <svg viewBox="0 0 40 40" className="h-[0.7em] w-[0.7em] shrink-0" aria-hidden="true">
            <path d="M20 0 C22 14 26 18 40 20 C26 22 22 26 20 40 C18 26 14 22 0 20 C14 18 18 14 20 0Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Two crossing tape bands that scroll in opposite directions. Purely decorative. */
export default function MarqueeBand() {
  return (
    <div aria-hidden="true" className="relative w-full overflow-hidden py-14 sm:py-20 -my-4">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[4deg] border-y-2 border-black bg-pop py-3 sm:py-4">
        <div className="flex marquee-rev">
          <Track />
          <Track />
        </div>
      </div>
      <div className="relative mx-[-5%] -rotate-[3deg] border-y-2 border-black bg-black text-lemon py-3 sm:py-4">
        <div className="flex marquee">
          <Track />
          <Track />
        </div>
      </div>
    </div>
  );
}
