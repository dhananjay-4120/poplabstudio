import React from 'react';
import type { Metadata } from 'next';
import Section from '@/components/pop/Section';
import PageHeader from '@/components/pop/PageHeader';
import Button from '@/components/pop/Button';
import Card from '@/components/pop/Card';
import Tag from '@/components/pop/Tag';

export const metadata: Metadata = {
  alternates: { canonical: '/process' },
  title: 'Our Methodology & 5-Stage Sprint Process — Pop Lab Studio',
  description:
    'How Pop Lab Studio runs creative growth: channel fit before clever, friction as data, creative as the primary lever, and attribution before optimization.',
  openGraph: {
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Pop Lab Studio' }],
    title: 'Our Methodology & 5-Stage Sprint Process — Pop Lab Studio',
    description:
      'A method, not a magic trick. The operational system behind our paid media, creative production, and conversion rate engineering.',
    url: 'https://poplabstudio.com/process',
    siteName: 'Pop Lab Studio',
    type: 'website',
  },
};

const PRINCIPLES = [
  {
    num: '01',
    title: 'Channel fit before clever',
    body: 'Search catches active demand. Meta builds emotional desire. LinkedIn engages executives gatekeeping six-figure enterprise decisions. They are not interchangeable - most costly marketing failures stem from treating them as if they are. We engineer the channel that matches where your actual buyer makes decisions.',
  },
  {
    num: '02',
    title: 'Friction is strategic data',
    body: 'A high CPC is not inherently a leak to eliminate. In ultra-luxury jewellery and private wealth, high click costs serve as an upfront qualification filter, weeding out curious non-buyers. In local services, that same CPC is a fatal defect. The metric is meaningless without the buyer journey wrapped around it.',
  },
  {
    num: '03',
    title: 'Creative is the primary lever',
    body: 'Audience targeting plateaus quickly once algorithmic broad delivery activates. Creative testing does not. The final 30% of efficiency on scaling accounts consistently stems from an emotionally compelling video hook or authentic founder premise - never a marginally tweaked lookalike audience.',
  },
  {
    num: '04',
    title: 'Attribution before optimisation',
    body: 'If event telemetry is broken, the rest is theatre. We deploy server-to-server Conversions API (CAPI), Google Enhanced Conversions, and Offline Conversion Imports (OCI) before spending client capital. Clean data is the prerequisite for machine learning to optimize bids accurately.',
  },
];

const ONBOARDING_SPRINTS = [
  {
    stage: '01',
    title: 'The Diagnostic Teardown',
    timeline: 'Day 0 · 30-Minute Screen-Share',
    desc: 'A live screen-shared audit of your current ad accounts, tracking stack, and landing page funnels. We identify where budget is bleeding, calculate your marginal ROAS, and provide an actionable angle roadmap. Zero high-pressure sales slides - you walk away with immediate value whether we collaborate or not.',
  },
  {
    stage: '02',
    title: 'Deep Audit & Attribution Architecture',
    timeline: 'Week 1 · Full Foundation',
    desc: 'We configure server-side tracking (Meta CAPI + Google Enhanced Conversions via sGTM), audit search query reports, construct comprehensive negative keyword lists, and link CRM conversion milestones for closed-won telemetry.',
  },
  {
    stage: '03',
    title: 'Creative Architecture & Initial Launch',
    timeline: 'Week 2 · Live Deployment',
    desc: 'We synthesize customer review mining into high-converting video and static scripts. Campaigns are built in clean, isolated structures designed for qualified buyer actions rather than vanity reach.',
  },
  {
    stage: '04',
    title: 'Weekly Rapid Iteration & Cleansing',
    timeline: 'Ongoing Sprints',
    desc: 'Search query reports inspected weekly, underperforming hooks ruthlessly pruned, and winning angles branched into new variations. You receive a transparent weekly briefing with real business metrics, not confusing agency jargon.',
  },
  {
    stage: '05',
    title: 'Controlled Horizontal Scaling',
    timeline: 'When Unit Economics Earn It',
    desc: 'Once acquisition economics stabilize and prove profitable, we scale spend methodically - protecting marginal ROAS through creative expansion and landing page CRO rather than reckless budget spikes.',
  },
];

const AI_INTEGRATIONS = [
  {
    title: 'Creative Velocity',
    desc: 'LLMs enable us to script, format, and storyboard a dozen ad angle variations in hours rather than weeks, preventing creative fatigue from bottlenecking high-spend accounts.',
    badge: 'ACCELERATION',
  },
  {
    title: 'Customer Mining',
    desc: 'Automated clustering of thousands of verified customer reviews and competitor complaints to unearth raw, emotionally charged phrases that move high-ticket prospects.',
    badge: 'RESEARCH',
  },
  {
    title: 'Telemetry Auditing',
    desc: 'Algorithmic analysis of search query reports and bid variances across multiple accounts to flag budget leaks faster, while capital allocation calls remain 100% human.',
    badge: 'PRECISION',
  },
];

export default function ProcessPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'The Pop Lab Growth Sprint Methodology',
    description: 'A 5-stage sprint methodology for scaling paid media, brand strategy, and conversion rate engineering.',
    step: ONBOARDING_SPRINTS.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  const sentence = (t: string) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();

  const DELIVERABLES = [
    ['Phase 1: Diagnostic', 'Live screen-share account leak breakdown', 'Ad spend leakage map and angle backlog'],
    ['Phase 2: Tracking', 'Server-side CAPI + GTM setup and negative lists', 'Verified GTM container, owned by you'],
    ['Phase 3: Creative', 'Four simultaneous format batches and launch', 'High-res video master files and static ad sets'],
    ['Phase 4: Optimisation', 'Weekly pruning, search term hygiene, hook updates', 'Weekly performance report in plain business numbers'],
    ['Phase 5: Controlled scale', 'Methodical spend scaling and multi-channel expansion', 'Scaling playbook and validated winners list'],
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        context="How we work"
        title="No secret sauce. A process we run every week."
        lede="We don’t have mysterious agency secrets. We have a disciplined process, run the same way every sprint, long after week one. Here is exactly how we run client accounts."
      />

      <Section ariaLabel="Our principles" className="!pt-4 sm:!pt-4">
        <h2 className="font-display text-section max-w-[16ch] mb-10 sm:mb-12 scroll-pop">
          Four principles we <em className="accent">don’t bend.</em>
        </h2>
        <ul className="grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <Card key={p.title} as="li" className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{p.title}</h3>
              <p className="mt-3 text-base sm:text-[17px] leading-relaxed text-cream/70">{p.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section ariaLabel="The five-stage sprint" className="!pt-0 sm:!pt-0">
        <div className="mb-10 sm:mb-12 max-w-[60ch]">
          <h2 className="font-display text-section max-w-[16ch] scroll-pop">
            From first teardown to scale, in <em className="accent">five stages.</em>
          </h2>
          <p className="mt-5 text-lg text-cream/70">Each stage builds on the one before it.</p>
        </div>
        <ol className="border-b border-cream/10">
          {ONBOARDING_SPRINTS.map((item, idx) => (
            <li
              key={item.stage}
              className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[6.5rem_1fr] border-t border-cream/10"
            >
              <span className="font-display text-6xl sm:text-7xl leading-none text-pop pt-8 sm:pt-10" aria-hidden="true">
                {idx + 1}
              </span>
              <div className="border-l border-cream/15 py-8 sm:py-10 pl-5 sm:pl-10">
                <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{item.title}</h3>
                <p className="mt-2">
                  <Tag>{item.timeline.replace(/\s*·\s*/g, ', ')}</Tag>
                </p>
                <p className="mt-4 text-base sm:text-[17px] leading-relaxed text-cream/70 max-w-[62ch]">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="deep" ariaLabel="Where AI fits">
        <h2 className="font-display text-section max-w-[18ch] mb-10 sm:mb-12 scroll-pop">
          AI for speed. Senior people for <em className="accent">everything that matters.</em>
        </h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {AI_INTEGRATIONS.map((ai) => (
            <li key={ai.title} className="rounded-2xl border border-cream/10 bg-night p-6 sm:p-8">
              <Tag>{sentence(ai.badge)}</Tag>
              <h3 className="mt-5 text-xl sm:text-2xl font-semibold leading-tight">{ai.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-cream/70">{ai.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section ariaLabel="What you receive">
        <h2 className="font-display text-section max-w-[16ch] mb-8 sm:mb-10 scroll-pop">
          What you get at <em className="accent">each stage.</em>
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-cream/10 bg-deep">
          <table className="w-full min-w-[640px] text-left text-[15px] border-collapse">
            <thead>
              <tr className="border-b border-cream/10 text-cream/60">
                <th scope="col" className="px-5 py-4 font-semibold">Stage</th>
                <th scope="col" className="px-5 py-4 font-semibold">What we do</th>
                <th scope="col" className="px-5 py-4 font-semibold">What you keep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream/10">
              {DELIVERABLES.map(([phase, out, keep]) => (
                <tr key={phase}>
                  <th scope="row" className="px-5 py-4 font-semibold align-top text-cream">{phase}</th>
                  <td className="px-5 py-4 align-top text-cream/80">{out}</td>
                  <td className="px-5 py-4 align-top text-cream/80">{keep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="cream" ariaLabel="Book a diagnostic" innerClassName="text-center">
        <h2 className="font-display text-section mx-auto max-w-[16ch] scroll-pop">
          See the process run on <em className="accent">your numbers.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-lg sm:text-xl text-night/75">
          We take on a limited number of partner accounts each quarter. Book the 30-minute diagnostic and we’ll audit your accounts live on screen share.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/contact" size="lg">
            Book a 30-minute diagnostic
          </Button>
          <Button
            href="https://wa.me/918837565738"
            variant="ghost"
            size="lg"
            className="!border-night/25 !text-night hover:!bg-night/5"
          >
            Message us on WhatsApp
          </Button>
        </div>
      </Section>
    </>
  );
}
