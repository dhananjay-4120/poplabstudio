import React from 'react';
import Section from '@/components/pop/Section';
import Button from '@/components/pop/Button';

const STEPS = [
  { title: 'Diagnostic', text: 'A 30-minute look at your ads, site and content. You leave with the three fixes we’d make first.' },
  { title: 'Audit and tracking', text: 'We check every account and make sure sales and leads are measured properly.' },
  { title: 'Creative and launch', text: 'New angles, new content and a clean campaign structure go live.' },
  { title: 'Weekly testing', text: 'We cut what doesn’t work and build on what does. You get a plain-English update every week.' },
  { title: 'Scale', text: 'Budget moves to proven winners, one careful step at a time.' },
];

export default function ProcessStrip() {
  return (
    <Section id="process" ariaLabel="How a project runs">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
        <h2 className="font-display text-section max-w-[13ch] scroll-pop">
          How a project <em className="accent">runs.</em>
        </h2>
        <Button href="/process" variant="link">
          The full process
        </Button>
      </div>
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <li key={s.title} className="border-t border-cream/15 pt-6">
            <span className="font-display text-5xl leading-none text-pop" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold leading-tight">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-cream/70">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
