'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Step {
  label: string;
  text: string;
}

interface CaseThinking {
  id: string;
  tab: string;
  slug: string;
  steps: [Step, Step, Step];
  result: { value: string; text: string };
}

// Real campaigns. Numbers come from data/case-studies.ts and are backed by Ads Manager screenshots.
const CASES: CaseThinking[] = [
  {
    id: 'bakery',
    tab: 'Dessert bakery',
    slug: 'bakery',
    steps: [
      { label: 'The brief', text: 'A loved bakery wanted paid ads to become a predictable third sales channel.' },
      { label: 'What we noticed', text: 'One catch-all campaign lets Meta pour budget into the cheapest, lowest-margin item.' },
      {
        label: 'Our bet',
        text: 'Five campaigns, one per product line, with budget weighted by sales and order value. Founder-shot kitchen videos over studio reels.',
      },
    ],
    result: { value: '₹24.72L', text: 'in sales at 4.10x return on ad spend' },
  },
  {
    id: 'wellness',
    tab: 'Wellness brand',
    slug: 'wellness',
    steps: [
      { label: 'The brief', text: 'A women’s wellness brand needed patient leads who actually book.' },
      {
        label: 'What we noticed',
        text: 'Rivals ran discount ads that pull in bargain hunters. These buyers want relief, not 20% off.',
      },
      {
        label: 'Our bet',
        text: 'Run four creative formats against one audience, then move 80% of the budget to the winner fast.',
      },
    ],
    result: { value: '$0.45', text: 'per lead, with nearly 3x the leads of the runner-up' },
  },
  {
    id: 'b2b',
    tab: 'B2B software',
    slug: 'linkedin',
    steps: [
      { label: 'The brief', text: 'An enterprise software company needed meetings with logistics and supply-chain leaders.' },
      { label: 'What we noticed', text: 'Senior buyers ignore templated outreach. They reply to people, not sequences.' },
      {
        label: 'Our bet',
        text: 'Outreach from the founder’s own profile, triggered by real events like ERP migrations. Automation stops the moment someone replies.',
      },
    ],
    result: { value: '97', text: 'executive meetings booked, 54.7% acceptance rate' },
  },
];

const STEP_STYLES = [
  { box: 'bg-white', tilt: '-0.7deg' },
  { box: 'bg-lemon', tilt: '0.5deg' },
  { box: 'bg-cobalt text-white', tilt: '-0.4deg' },
];

export default function ThinkingBoard() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-[15px] font-semibold" id="tb-label">How we thought it through</p>
        <div role="group" aria-labelledby="tb-label" className="flex flex-wrap gap-1.5">
          {CASES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full border-2 border-black px-3.5 py-1.5 text-[14px] font-semibold transition-colors ${
                i === active ? 'bg-black text-white' : 'bg-white hover:bg-fog'
              }`}
            >
              {item.tab}
            </button>
          ))}
        </div>
      </div>

      <div id="tb-panel" aria-live="polite" key={c.id}>
        <ol className="grid gap-3 sm:grid-cols-2">
          {c.steps.map((step, i) => (
            <li
              key={step.label}
              className={`pop-in rounded-2xl border-2 border-black p-5 shadow-hard-sm ${STEP_STYLES[i].box}`}
              style={{ animationDelay: `${120 + i * 140}ms`, ['--tilt' as string]: STEP_STYLES[i].tilt }}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border-2 text-[13px] font-bold ${
                    i === 2 ? 'border-white' : 'border-black'
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-[14px] font-semibold">{step.label}</span>
              </div>
              <p className="text-[16px] leading-snug">{step.text}</p>
            </li>
          ))}
          <li
            className="pop-in rounded-2xl border-2 border-black bg-pop p-5 shadow-hard-sm flex flex-col justify-between"
            style={{ animationDelay: '560ms', ['--tilt' as string]: '0.8deg' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-black text-[13px] font-bold" aria-hidden="true">
                4
              </span>
              <span className="text-[14px] font-semibold">What happened</span>
            </div>
            <p className="mt-3">
              <span className="font-display block text-[clamp(2.4rem,5vw,3.4rem)] leading-none">{c.result.value}</span>
              <span className="mt-1.5 block text-[15px] font-medium leading-snug">{c.result.text}</span>
            </p>
            <Link href={`/work/${c.slug}`} className="mt-3 self-start text-[14px] font-semibold underline decoration-2 underline-offset-4 hover:text-white">
              Read the case study
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
}
