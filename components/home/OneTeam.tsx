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
    <Section id="approach" tone="ink" ariaLabel="Why one team">
      <h2 className="font-display text-section max-w-[16ch] scroll-pop">Marketing breaks in the gaps between agencies.</h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-white/40 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-white/80">The usual setup</h3>
          <ul className="mt-5 space-y-4">
            {USUAL.map((t) => (
              <li key={t} className="flex gap-3 text-[17px] text-white/70">
                <span aria-hidden="true" className="font-bold">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-white bg-white text-black p-6 sm:p-8" style={{ boxShadow: '6px 6px 0 0 #FF5E14' }}>
          <h3 className="text-xl font-semibold">Working with Pop Lab</h3>
          <ul className="mt-5 space-y-4">
            {OURS.map((t) => (
              <li key={t} className="flex gap-3 text-[17px]">
                <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pop text-[13px] font-bold border-2 border-black">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
