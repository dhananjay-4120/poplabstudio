import React from 'react';
import Image from 'next/image';

/**
 * Client logo wall: a slow, seamless marquee. Add a logo by dropping the file into /public/clients/
 * and adding a line here. Only list clients who are happy to be named publicly.
 * Use white/light versions of the logos — they sit on the dark hero.
 */
export const CLIENTS: { name: string; logo: string; width: number; height: number }[] = [
  // { name: 'Brand name', logo: '/clients/brand.svg', width: 160, height: 60 },
];

export default function ClientLogos() {
  if (CLIENTS.length === 0) return null;
  const row = [...CLIENTS, ...CLIENTS, ...CLIENTS];
  return (
    <div className="mt-8">
      <h2 className="text-[15px] font-medium text-cream/70">Brands that trust us with their growth</h2>
      <ul className="sr-only">
        {CLIENTS.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <div className="logo-marquee mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-hidden="true">
        <div className="flex w-max marquee-slow">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-14 pr-14">
              {row.map((c, i) => (
                <Image key={`${k}-${i}`} src={c.logo} alt="" width={c.width} height={c.height} className="h-9 sm:h-10 w-auto object-contain opacity-80" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
