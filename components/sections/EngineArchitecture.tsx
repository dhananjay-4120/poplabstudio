'use client';

import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';

const ENGINES = [
  {
    number: '01',
    code: 'ENGINE 01 // BRAND',
    title: 'Brand Engine',
    subtitle: 'Identity · Film · Strategy',
    description:
      'We build provocative positioning, visual identity systems, and cinematic film assets that command premium pricing and eliminate price resistance.',
    tags: ['Brand Archetypes', 'Cinematic Film', 'Packaging Identity', 'Tactile Systems'],
    spotlight: 'rgba(255, 94, 20, 0.20)',
  },
  {
    number: '02',
    code: 'ENGINE 02 // ATTENTION',
    title: 'Attention Engine',
    subtitle: 'Cultural PR · Creators · GEO',
    description:
      'Turn brand narrative into front-page cultural gravity. We orchestrate Tier-1 press features, creator whitelisting waves, and AI search (GEO/AEO) answer citations.',
    tags: ['National PR & Press', 'Creator Whitelisting', 'AI Search (GEO/AEO)', 'Cultural Drops'],
    spotlight: 'rgba(14, 77, 122, 0.25)',
  },
  {
    number: '03',
    code: 'ENGINE 03 // GROWTH',
    title: 'Growth Engine',
    subtitle: 'Performance · Quick Commerce · CRO',
    description:
      'Convert attention into profitable revenue across Meta, Google Ads, Quick Commerce (Blinkit / Zepto), and frictionless 1-click Shopify checkouts.',
    tags: ['Paid Acquisition', 'Quick Commerce Scale', 'Funnel CRO', 'LTV Flywheel'],
    spotlight: 'rgba(255, 94, 20, 0.20)',
  },
];

export default function EngineArchitecture() {
  return (
    <section
      id="engines"
      className="w-full scroll-mt-28 sm:scroll-mt-36 py-24 sm:py-32 md:py-40 px-5 sm:px-10 md:px-16 lg:px-20 relative z-10 max-w-6xl mx-auto border-t border-[#F5F2EB]/10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F5F2EB]/15 bg-[#18150F]/70 backdrop-blur-md mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#FF5E14]">
              THE THREE CONNECTED ENGINES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EB] tracking-tight leading-[1.08]">
            One connected <span className="italic text-[#FF5E14]">system.</span>
          </h2>
        </div>

        <p className="font-sans text-sm sm:text-base text-[#F5F2EB]/70 max-w-md font-light leading-relaxed">
          Each engine multiplies the next: brand authority lowers customer acquisition cost, cultural PR ignites organic search volume, and high-converting checkout infrastructure maximizes cash contribution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ENGINES.map((engine) => (
          <SpotlightCard
            key={engine.number}
            spotlightColor={engine.spotlight}
            className="engine-card p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 border-white/[0.08] bg-[#0C121D]/80"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                <span className="font-mono text-[11px] text-[#FF5E14] uppercase tracking-[0.2em] font-medium">
                  {engine.code}
                </span>
                <span className="font-mono text-2xl font-light text-[#F5F2EB]/20 group-hover:text-[#F5F2EB]/50 transition-colors">
                  {engine.number}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] mb-1.5">
                {engine.title}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#F5F2EB]/50 mb-5">
                {engine.subtitle}
              </p>

              <p className="font-sans text-sm text-[#F5F2EB]/80 font-light leading-relaxed mb-6">
                {engine.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.06]">
                {engine.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-[#F5F2EB]/80 border border-white/[0.05]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
