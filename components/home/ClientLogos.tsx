import React from 'react';
import Image from 'next/image';

/**
 * Client logo wall. Add a logo by dropping the file into /public/clients/ and adding a line here.
 * Use logos only for clients who are happy to be named publicly.
 */
export const CLIENTS: { name: string; logo: string; width: number; height: number }[] = [
  // { name: 'Brand name', logo: '/clients/brand.svg', width: 160, height: 60 },
];

export default function ClientLogos() {
  if (CLIENTS.length === 0) return null;
  return (
    <div className="mt-10 sm:mt-14">
      <h2 className="text-[15px] font-semibold">Brands that trust us with their growth</h2>
      <ul className="mt-4 grid grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {CLIENTS.map((c) => (
          <li
            key={c.name}
            className="grid h-20 sm:h-24 place-items-center rounded-2xl border-2 border-black bg-white px-3 sm:px-5 shadow-hard-sm"
          >
            <Image
              src={c.logo}
              alt={c.name}
              width={c.width}
              height={c.height}
              className="max-h-10 sm:max-h-12 w-auto object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
