'use client';

import React, { useEffect, useState } from 'react';

/** Cycles the last words of the headline with a flip. Screen readers get the static sentence from the h1. */
export default function KineticWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="kinetic-slot" aria-hidden="true">
      <span key={i} className={`kinetic-word ${i % 2 === 0 ? 'kw-ink' : 'kw-pop'}`}>
        {words[i]}
      </span>
    </span>
  );
}
