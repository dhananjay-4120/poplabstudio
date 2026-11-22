import React from 'react';
import Section from '@/components/pop/Section';

const USUAL = [
  'Four agencies, four plans, nobody owns the result',
  'Brand films that look great and sell nothing',
  'Ads running on generic templates',
  'Reports full of reach and impressions',
];

const OURS = [
  'One team owns brand, content, ads and search',
  'Creative made to lower the cost of every sale',
  'Every ad starts with a reason a customer will care',
  'A weekly update in sales, leads and cost per result',
];

export default function OneTeam() {
  return (
    <Section id="approach" tone="deep" ariaLabel="Why one team">
      <h2 className="font-display text-section max-w-[18ch] scroll-pop">
        Marketing breaks in the <em className="accent">gaps between agencies.</em>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h3 className="text-[15px] font-semibold text-cream/60">The usual setup</h3>
          <ul className="mt-5 divide-y divide-cream/10 border-y border-cream/10">
            {USUAL.map((t) => (
              <li key={t} className="py-4 text-lg text-cream/55 line-through decoration-cream/30">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-pop">Working with Pop Lab</h3>
          <ul className="mt-5 divide-y divide-cream/10 border-y border-cream/10">
            {OURS.map((t) => (
              <li key={t} className="flex gap-4 py-4 text-lg text-cream">
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-pop" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
