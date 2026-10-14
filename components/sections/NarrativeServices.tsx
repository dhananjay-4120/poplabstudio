'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Chapter {
  number: string;
  act: string;
  code: string;
  title: string;
  quote: string;
  narrative: string;
  deliverables: string[];
  deliverableCategory: string;
  accent: string;
}

const CHAPTERS: Chapter[] = [
  {
    number: '01',
    act: 'ACT I · THE FOUNDATION',
    code: 'DOSSIER // STRAT-01',
    title: 'Brand Strategy & Provocative Positioning',
    quote: 'Before you buy an ad, you need a reason to exist.',
    narrative:
      'In a market flooded with algorithmic sameness, safe branding is commercial suicide. We excavate the singular cultural friction your brand solves. We do not write bland mission statements; we define the uncompromising point of view that makes your competitors look generic and your pricing feel unassailable.',
    deliverables: [
      'Category Creation & Narrative Framing',
      'Archetype & Brand Tone Architecture',
      'Unfair Market Advantage Blueprint',
      'Direct-Response Value Proposition Mapping',
    ],
    deliverableCategory: 'Strategic Assets',
    accent: '#FF5E14',
  },
  {
    number: '02',
    act: 'ACT II · THE CRAFT',
    code: 'DOSSIER // CREATIVE-02',
    title: 'Cinematic Creative & Design Systems',
    quote: 'Nobody falls in love with a funnel. They fall in love with worlds.',
    narrative:
      'Attention cannot be bought with stock templates or sterile AI copy. We build complete aesthetic worlds: editorial brand films, tactile unboxing packaging, custom typographic systems, and high-velocity ad creatives. When someone encounters your brand, they instantly feel the weight of uncompromising craftsmanship.',
    deliverables: [
      'High-Production Cinematic Film & Spots',
      'Tactile Packaging & Sensory Unboxing',
      'Modular Design Systems & Digital Identity',
      'High-Converting Ad Creative Engine',
    ],
    deliverableCategory: 'Creative Output',
    accent: '#0E4D7A',
  },
  {
    number: '03',
    act: 'ACT III · THE SPARK',
    code: 'DOSSIER // PR-03',
    title: 'Cultural PR & Tastemaker Infiltration',
    quote: 'If nobody is talking about you at dinner, your ads are doing twice the work.',
    narrative:
      'The highest leverage in commerce is earned cultural relevance. We engineer high-profile media moments, national press features, and VIP tastemaker seeding. We get your brand worn, cited, and debated in culture without looking like another desperate sponsored post.',
    deliverables: [
      'Front-Page National Editorial Placements',
      'VIP, Founder & Celebrity Seeding',
      'Cultural Drops & Moment-Driven PR',
      'Answer Engine Optimization (GEO/AEO Citation)',
    ],
    deliverableCategory: 'Cultural Footprint',
    accent: '#FF5E14',
  },
  {
    number: '04',
    act: 'ACT IV · THE COMPOUND',
    code: 'DOSSIER // SCALE-04',
    title: 'Paid Media, Creators & Commerce Velocity',
    quote: 'Attention without conversion is vanity. Conversion without story is a race to the bottom.',
    narrative:
      'Once desire is ignited, we deploy capital with mathematical precision. Full-funnel media buying across Meta and Google, creator whitelisting, frictionless Shopify checkouts, and hyper-local Quick Commerce (Blinkit / Zepto) scaling. Every dollar spent compounds your brand equity while feeding immediate bottom-line cashflow.',
    deliverables: [
      'Full-Funnel Paid Acquisition (Meta & Google)',
      'Creator Whitelisting & Dark-Post Scaling',
      'Shopify Checkout & Funnel Friction CRO',
      'Quick Commerce Distribution (Blinkit / Zepto)',
    ],
    deliverableCategory: 'Revenue Infrastructure',
    accent: '#0E4D7A',
  },
];

export default function NarrativeServices() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="services"
      className="relative w-full scroll-mt-28 sm:scroll-mt-36 py-24 sm:py-32 md:py-40 px-5 sm:px-10 md:px-16 lg:px-20 z-10 border-t border-[#F5F2EB]/10 overflow-hidden"
    >
      {/* Background Architectural Accent */}
      <div
        className="absolute top-0 right-10 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 94, 20, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F5F2EB]/15 bg-[#18150F]/70 backdrop-blur-md mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#FF5E14]">
              THE NARRATIVE OF GROWTH
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F5F2EB] tracking-tight leading-[1.06] max-w-3xl">
            How a brand becomes <br className="hidden sm:inline" />
            <span className="italic text-[#FF5E14]">unignorable.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#F5F2EB]/70 max-w-xl mt-4 font-light leading-relaxed">
            Most agencies sell isolated tactics that burn margin on vanity impressions. We orchestrate an
            integrated four-act growth engine—turning understated products into category leaders with lower
            blended CAC and compounding revenue.
          </p>
        </div>

        {/* Desktop Chapter Navigation Strip */}
        <div className="hidden lg:grid grid-cols-4 gap-3 p-1.5 rounded-2xl bg-[#0D1522]/80 border border-[#F5F2EB]/10 mb-12 backdrop-blur-xl">
          {CHAPTERS.map((chap, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={chap.number}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`relative text-left p-4 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-[#182338]/90 text-[#F5F2EB] shadow-lg border border-[#FF5E14]/30'
                    : 'text-[#F5F2EB]/60 hover:text-[#F5F2EB] hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E14]">
                    {chap.act}
                  </span>
                  <span
                    className={`font-mono text-xs ${
                      isActive ? 'text-[#F5F2EB]' : 'text-[#F5F2EB]/30'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <div className="font-sans text-sm tracking-tight text-[#F5F2EB] line-clamp-1 font-medium group-hover:text-white transition-colors">
                  {chap.title.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Desktop Active Chapter Dossier Card */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#10192A]/90 to-[#0A101C]/95 border border-[#F5F2EB]/15 shadow-2xl overflow-hidden"
            >
              {/* Top Meta Dossier Bar */}
              <div className="flex items-center justify-between border-b border-[#F5F2EB]/10 pb-6 mb-8">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF5E14] font-medium">
                    {CHAPTERS[activeTab].code}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#F5F2EB]/30" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F5F2EB]/50">
                    {CHAPTERS[activeTab].act}
                  </span>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#F5F2EB]/40">
                  POP LAB STUDIO // SYSTEM VER 3.2
                </span>
              </div>

              <div className="grid grid-cols-12 gap-10 items-start">
                {/* Left Narrative Column (7 cols) */}
                <div className="col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F2EB] tracking-tight mb-4">
                      {CHAPTERS[activeTab].title}
                    </h3>
                    <p className="font-serif text-lg sm:text-xl text-[#FF5E14] italic font-light mb-6 border-l-2 border-[#FF5E14]/60 pl-4 py-0.5">
                      &ldquo;{CHAPTERS[activeTab].quote}&rdquo;
                    </p>
                    <p className="font-sans text-base text-[#F5F2EB]/80 font-light leading-relaxed mb-8">
                      {CHAPTERS[activeTab].narrative}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/10 dark:border-[#F5F2EB]/10">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#FF5E14] hover:text-[#E04F0E] dark:hover:text-white transition-colors"
                    >
                      <span>Deploy this chapter for your brand</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>

                {/* Right Deliverables Column (5 cols) */}
                <div className="col-span-5 p-7 rounded-2xl bg-white dark:bg-[#090D14]/70 border border-black/10 dark:border-[#F5F2EB]/10 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10 dark:border-[#F5F2EB]/10">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#121824]/70 dark:text-[#F5F2EB]/60">
                      {CHAPTERS[activeTab].deliverableCategory}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
                  </div>

                  <ul className="space-y-4">
                    {CHAPTERS[activeTab].deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 group">
                        <span className="font-mono text-xs text-[#FF5E14] select-none mt-0.5">
                          0{dIdx + 1}
                        </span>
                        <span className="font-sans text-sm text-[#121824]/90 dark:text-[#F5F2EB]/90 group-hover:text-[#FF5E14] dark:group-hover:text-white transition-colors leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-black/5 dark:border-[#F5F2EB]/5 flex items-center justify-between text-[11px] font-mono text-[#121824]/50 dark:text-[#F5F2EB]/40">
                    <span className="tracking-wider">CHAPTER 0{activeTab + 1} OF 04</span>
                    <span className="text-[#FF5E14]/80 uppercase tracking-widest font-medium">POP LAB STUDIO</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile & Tablet Narrative Card Flow (With Hand-Drawn Scribble Connectors & Touch Physics) */}
        <div className="block lg:hidden space-y-4">
          {CHAPTERS.map((chap, idx) => (
            <React.Fragment key={chap.number}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-25px' }}
                transition={{ type: 'spring', stiffness: 260, damping: 24, delay: idx * 0.08 }}
                className="touch-motion-card p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#10192A]/90 to-[#0A101C]/95 border border-[#F5F2EB]/15 shadow-xl relative overflow-hidden group"
              >
                {/* Subtle ambient specular glint */}
                <div className="ambient-card-glint absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#FF5E14]/30 to-transparent pointer-events-none" />

                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-[#F5F2EB]/10 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E14] font-medium">
                    {chap.act}
                  </span>
                  <span className="font-mono text-xs text-[#F5F2EB]/40">
                    {chap.number} / 04
                  </span>
                </div>

                {/* Title & Quote */}
                <h3 className="font-serif text-2xl text-[#F5F2EB] mb-2 leading-tight">
                  {chap.title}
                </h3>
                <p className="font-serif text-sm text-[#FF5E14] italic font-light mb-4 border-l-2 border-[#FF5E14]/60 pl-3 py-0.5">
                  &ldquo;{chap.quote}&rdquo;
                </p>

                {/* Narrative Story */}
                <p className="font-sans text-sm text-[#F5F2EB]/80 font-light leading-relaxed mb-6">
                  {chap.narrative}
                </p>

                {/* Deliverables List */}
                <div className="p-4 rounded-xl bg-[#090D14]/80 border border-[#F5F2EB]/10">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#F5F2EB]/50 mb-3">
                    {chap.deliverableCategory}
                  </div>
                  <ul className="space-y-2.5">
                    {chap.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs text-[#F5F2EB]/90">
                        <span className="text-[#FF5E14] font-mono">0{dIdx + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
