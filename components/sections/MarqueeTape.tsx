'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  'BRAND ARCHITECTURE',
  'CINEMATIC FILM',
  'CULTURAL PR & CREATORS',
  'AI SEARCH CITATIONS (GEO/AEO)',
  'PERFORMANCE MEDIA',
  'QUICK COMMERCE SCALE',
  'HIGH-VELOCITY CRO',
];

export default function MarqueeTape() {
  return (
    <div className="w-full py-5 sm:py-6 border-y border-white/[0.08] bg-[#050505]/80 backdrop-blur-xl overflow-hidden relative z-10 select-none">
      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 24,
          }}
          className="flex items-center gap-8 md:gap-14 whitespace-nowrap"
        >
          {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-14">
              <span className="font-sans text-xs sm:text-xs font-semibold uppercase tracking-[0.22em] text-white/55 hover:text-[#FF5E14] transition-colors duration-200">
                {item}
              </span>
              <span className="text-[#FF5E14] text-xs opacity-75">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
