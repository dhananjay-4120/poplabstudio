'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CASE_STUDIES } from '@/data/case-studies';
import PageHeader from '@/components/pop/PageHeader';
import Section from '@/components/pop/Section';
import Button from '@/components/pop/Button';

type FilterKey = 'all' | 'meta' | 'google' | 'b2b' | 'd2c';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All cases (8)' },
  { key: 'meta', label: 'Meta performance' },
  { key: 'google', label: 'Google Search' },
  { key: 'd2c', label: 'Shopify / D2C' },
  { key: 'b2b', label: 'B2B enterprise' },
];

export default function WorkClient() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredCases =
    activeFilter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.filterCategory === activeFilter);

  return (
    <>
      <PageHeader
        context="Selected work"
        title="Campaigns, and the thinking behind them."
        lede="Real campaigns across luxury, D2C, travel, B2B and wellness. Every number comes from the client's own dashboards and campaign records. Client names are kept private; the thinking isn't."
      />

      <Section ariaLabel="Case studies" className="!pt-0">
        <div role="group" aria-label="Filter case studies" className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => {
            const isSelected = activeFilter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveFilter(f.key)}
                className={`rounded-full border-2 border-black px-4 py-2 text-[15px] font-semibold whitespace-nowrap transition-colors ${
                  isSelected ? 'bg-black text-white' : 'bg-white text-black hover:bg-lemon'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <ul className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {filteredCases.map((cs) => {
            const hero = cs.metrics.find((m) => m.isHero) ?? cs.metrics[0];
            return (
              <li key={cs.slug}>
                <Link
                  href={`/work/${cs.slug}`}
                  className="group block h-full rounded-2xl border-2 border-black bg-white p-6 sm:p-7 shadow-hard pop-press"
                >
                  <p className="text-[14px] font-semibold text-black/70">{cs.categoryTag.split('·')[0].trim()}</p>
                  <p className="mt-4 font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none break-words">
                    {hero.value}
                  </p>
                  <p className="mt-1 text-[16px] font-medium">{hero.label}</p>
                  <h2 className="mt-6 text-xl font-semibold leading-snug">
                    {cs.title} {cs.italicAccent}
                  </h2>
                  <p className="mt-2 text-[16px] text-black/75 leading-relaxed">{cs.heroLede}</p>
                  <span className="mt-5 inline-block text-[15px] font-semibold underline decoration-2 underline-offset-4 group-hover:text-cobalt">
                    Read the case study
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="pop" ariaLabel="Book a diagnostic">
        <h2 className="font-display text-section max-w-[16ch]">Want this kind of read on your spend?</h2>
        <p className="mt-5 text-lg max-w-[56ch]">
          Book a 30-minute growth diagnostic. We open your ad accounts live on screen share, show where budget is
          leaking, and map the opportunities worth testing first.
        </p>
        <div className="mt-8">
          <Button href="/contact" variant="ink" size="lg">
            Book a 30-minute diagnostic
          </Button>
        </div>
      </Section>
    </>
  );
}
