'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InkSealStamp } from '@/components/ui/VisualSoul';

interface PrincipleItem {
  number: string;
  tag: string;
  title: string;
  description: string;
  highlight: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    number: '01',
    tag: 'STAGE 01 // HIGH CRAFT',
    title: 'Taste as an Enterprise Moat',
    description:
      'Every pixel, serif, and spring interaction reflects world-class taste. In an internet saturated with derivative AI templates, meticulous craft commands premium pricing and deep institutional trust.',
    highlight: 'No generic templates. No decorative filler. Pure intentionality.',
  },
  {
    number: '02',
    tag: 'STAGE 02 // SPRINT CADENCE',
    title: 'Sprints Over Bureaucracy',
    description:
      'We ship in days, iterate relentlessly, and cut agency bloat. No bloated account management tiers or 80-page slide decks. Direct founder-to-founder access guarantees unmatched execution speed.',
    highlight: '48-hour sprint cadences with singular revenue focus.',
  },
  {
    number: '03',
    tag: 'STAGE 03 // VALUE COMPOUNDING',
    title: 'Equity Beyond the Click',
    description:
      'Short-term revenue surges engineered to build permanent enterprise value. Acquisition media spend must not evaporate upon click-through—it must cement category authority and defensible customer retention.',
    highlight: 'Performance monetization that deepens brand prestige.',
  },
];

/**
 * Philosophy Section: The operational and aesthetic standards of Pop Lab Studio.
 * Swiss minimalism, fine typography, hand-drawn process scribbles, and mobile micro-motion.
 */
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="w-full py-24 sm:py-32 md:py-36 px-6 relative z-10 max-w-6xl mx-auto border-t border-black/10 dark:border-white/10"
    >
      {/* Kicker Accent */}
      <div className="flex items-center gap-3 mb-6">
        <InkSealStamp text="POP LAB" subtext="STANDARDS" size={42} />
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF5E14] font-semibold">
          — Studio Standards
        </span>
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#121824] dark:text-[#F5F2EB] tracking-tight max-w-2xl leading-[1.12] mb-3">
            Architectural Rigor. <br />
            <span className="italic text-[#FF5E14]">Zero Compromises.</span>
          </h2>
        </div>

        <p className="font-sans text-sm sm:text-base text-[#121824]/70 dark:text-[#F5F2EB]/60 max-w-xs font-light leading-relaxed">
          The disciplined principles that govern every brand narrative, ad account, and growth sprint we engineer.
        </p>
      </div>

      {/* 3 Principles Grid with Hand-Drawn Scribble Flow Connectors */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRINCIPLES.map((principle, index) => (
            <React.Fragment key={principle.number}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                  delay: index * 0.12,
                }}
                className="touch-motion-card flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522]/90 border border-black/10 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-lg hover:border-[#FF5E14]/40 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Subtle mobile ambient specular glint */}
                <div className="ambient-card-glint absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#FF5E14]/40 to-transparent pointer-events-none" />

                <div>
                  {/* Monospaced Standard Code & Process Marker */}
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/5 dark:border-white/5">
                    <span className="font-mono text-xs text-[#FF5E14] uppercase tracking-[0.2em] font-medium">
                      {principle.tag}
                    </span>
                    <span className="font-mono text-2xl font-light text-black/20 dark:text-white/20 select-none">
                      {principle.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 tracking-tight">
                    {principle.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm text-[#121824]/75 dark:text-[#F5F2EB]/70 font-light leading-relaxed mb-6">
                    {principle.description}
                  </p>
                </div>

                {/* Fine line highlight note */}
                <div className="pt-5 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <p className="font-mono text-xs text-[#121824]/60 dark:text-[#F5F2EB]/50 tracking-wider">
                    <span className="text-[#FF5E14] mr-2">&bull;</span>
                    {principle.highlight}
                  </p>
                </div>
              </motion.div>

            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

