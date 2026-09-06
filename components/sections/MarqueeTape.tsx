'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  'BRAND STRATEGY',
  'CULTURAL PR',
  'CREATIVE CAMPAIGNS',
  'QUICK COMMERCE',
  'AI SEARCH & GEO',
  'PERFORMANCE MEDIA',
  'CONVERSION ENGINEERING',
];

export default function MarqueeTape() {
  return (
    <div className="w-full py-6 md:py-8 border-y border-bone-alabaster/10 bg-[#090D14]/70 overflow-hidden relative z-10 select-none">
      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 22,
          }}
          className="flex items-center gap-8 md:gap-12 whitespace-nowrap"
        >
          {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-12">
              <span className="font-grotesk text-xs sm:text-sm font-medium tracking-[0.25em] text-bone-alabaster/60 hover:text-electric-tangerine transition-colors duration-200">
                {item}
              </span>
              <span className="text-electric-tangerine text-xs opacity-70">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
