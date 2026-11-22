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
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10 sm:mb-14">
        <h2 className="font-display text-section max-w-[14ch] scroll-pop">Results we can show you.</h2>
        <p className="text-lg max-w-[40ch]">
          Every number below comes from the client’s own dashboards and campaign records. Client names are private; the thinking
          isn’t.
        </p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {items.map((cs) => {
          const hero = cs.metrics.find((m) => m.isHero) ?? cs.metrics[0];
          return (
            <li key={cs.slug} className="scroll-tilt">
              <Link
                href={`/work/${cs.slug}`}
                className="group block h-full rounded-2xl border-2 border-black bg-white p-6 sm:p-7 shadow-hard pop-press"
              >
                <p className="text-[14px] font-semibold text-black/70">{cs.categoryTag.split('·')[0].trim()}</p>
                <p className="mt-4 font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none">{hero.value}</p>
                <p className="mt-1 text-[16px] font-medium">{hero.label}</p>
                <h3 className="mt-6 text-xl font-semibold leading-snug">
                  {cs.title} {cs.italicAccent}
                </h3>
                <p className="mt-2 text-[16px] text-black/75 leading-relaxed">{cs.heroLede}</p>
                <span className="mt-5 inline-block text-[15px] font-semibold underline decoration-2 underline-offset-4 group-hover:text-cobalt">
                  Read the case study
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-10">
        <Button href="/work" variant="ink">
          See all {CASE_STUDIES.length} case studies
        </Button>
      </div>
    </Section>
  );
}
