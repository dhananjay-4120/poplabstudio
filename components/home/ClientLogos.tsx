import React from 'react';
import Image from 'next/image';

/**
 * Client logo wall: a slow, seamless marquee. Add a logo by dropping the file into /public/clients/
 * and adding a line here. Only list clients who are happy to be named publicly.
 */
export const CLIENTS: { name: string; logo: string; width: number; height: number }[] = [
  // { name: 'Brand name', logo: '/clients/brand.svg', width: 160, height: 60 },
];

export default function ClientLogos() {
  if (CLIENTS.length === 0) return null;
  const row = [...CLIENTS, ...CLIENTS, ...CLIENTS];
  return (
    <div className="relative z-10 mt-12 sm:mt-16">
      <h2 className="text-[15px] font-semibold">Brands that trust us with their growth</h2>
      <ul className="sr-only">
        {CLIENTS.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <div className="logo-marquee mt-4 overflow-hidden" aria-hidden="true">
        <div className="flex w-max marquee-slow">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-3 pr-3">
              {row.map((c, i) => (
                <div
                  key={`${k}-${i}`}
                  className="grid h-20 sm:h-24 w-40 sm:w-48 place-items-center rounded-2xl border-2 border-black bg-white px-5 shadow-hard-sm"
                >
                  <Image src={c.logo} alt="" width={c.width} height={c.height} className="max-h-10 sm:max-h-12 w-auto object-contain" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
