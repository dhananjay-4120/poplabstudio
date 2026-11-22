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
                className={`rounded-full border px-4 py-2 text-[15px] font-medium whitespace-nowrap transition-colors ${
                  isSelected ? 'border-cream bg-cream text-night' : 'border-cream/20 text-cream hover:bg-cream/10'
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
                  className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-deep p-7 sm:p-9 transition-colors hover:border-pop/50"
                >
                  <p className="text-[14px] font-medium text-cream/60">{cs.categoryTag.split('·')[0].trim()}</p>
                  <p className="mt-6 font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-none text-pop break-words">
                    {hero.value}
                  </p>
                  <p className="mt-2 text-[16px] text-cream/80">{hero.label}</p>
                  <h2 className="mt-8 text-xl font-semibold leading-snug">
                    {cs.title} {cs.italicAccent}
                  </h2>
                  <p className="mt-2 text-[16px] text-cream/70 leading-relaxed">{cs.heroLede}</p>
                  <span className="mt-auto pt-6 text-[15px] font-semibold text-cream underline decoration-pop decoration-[1.5px] underline-offset-[6px] group-hover:text-pop">
                    Read the case study
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="cream" ariaLabel="Book a diagnostic">
        <h2 className="font-display text-section max-w-[16ch] scroll-pop">Want this kind of read <em className="accent">on your spend?</em></h2>
        <p className="mt-5 text-lg max-w-[56ch] text-night/75">
          Book a 30-minute growth diagnostic. We open your ad accounts live on screen share, show where budget is
          leaking, and map the opportunities worth testing first.
        </p>
        <div className="mt-8">
          <Button href="/contact" size="lg">
            Book a 30-minute diagnostic
          </Button>
        </div>
      </Section>
    </>
  );
}
