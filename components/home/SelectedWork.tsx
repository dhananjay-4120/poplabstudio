import React from 'react';
import Link from 'next/link';
import Section from '@/components/pop/Section';
import Button from '@/components/pop/Button';
import { CASE_STUDIES } from '@/data/case-studies';

const PICKS = ['d2c', 'travel-europe', 'interiors', 'holiday'];

export default function SelectedWork() {
  const items = PICKS.map((slug) => CASE_STUDIES.find((c) => c.slug === slug)).filter(Boolean) as typeof CASE_STUDIES;

  return (
    <Section id="work" ariaLabel="Selected work">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
        <h2 className="font-display text-section max-w-[14ch] scroll-pop">
          Results we can <em className="accent">show you.</em>
        </h2>
        <p className="text-lg text-cream/75 max-w-[40ch]">
          Every number comes from the client’s own dashboards and campaign records. Names stay private; the
          thinking doesn’t.
        </p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {items.map((cs) => {
          const hero = cs.metrics.find((m) => m.isHero) ?? cs.metrics[0];
          return (
            <li key={cs.slug}>
              <Link
                href={`/work/${cs.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-deep p-7 sm:p-9 transition-colors hover:border-pop/50"
              >
                <p className="text-[14px] font-medium text-cream/60">{cs.categoryTag.split('·')[0].trim()}</p>
                <p className="mt-6 font-display text-[clamp(3rem,5.5vw,4.5rem)] leading-none text-pop">{hero.value}</p>
                <p className="mt-2 text-[16px] text-cream/80">{hero.label}</p>
                <h3 className="mt-8 text-xl font-semibold leading-snug">
                  {cs.title} {cs.italicAccent}
                </h3>
                <p className="mt-2 text-[16px] text-cream/70 leading-relaxed">{cs.heroLede}</p>
                <span className="mt-auto pt-6 text-[15px] font-semibold text-cream underline decoration-pop decoration-[1.5px] underline-offset-[6px] group-hover:text-pop">
                  Read the case study
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-12">
        <Button href="/work" variant="ghost">
          See all {CASE_STUDIES.length} case studies
        </Button>
      </div>
    </Section>
  );
}
