import React from 'react';

const WORDS = ['Brand', 'Content', 'Meta ads', 'Google ads', 'Reels', 'Marketplaces', 'AI search', 'Growth'];

function Track() {
  return (
    <div className="flex">
      {[...WORDS, ...WORDS].map((w, i) => (
        <span key={i} className="flex items-center gap-10 pr-10 font-display italic text-[clamp(1.8rem,3.6vw,3rem)] leading-none whitespace-nowrap text-cream/85">
          {w}
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-pop" />
        </span>
      ))}
    </div>
  );
}

/** Slow hairline ticker of services. Decorative. */
export default function MarqueeBand() {
  return (
    <div aria-hidden="true" className="w-full overflow-hidden border-y border-cream/10 py-6 sm:py-8">
      <div className="flex w-max marquee">
        <Track />
        <Track />
      </div>
    </div>
  );
}
