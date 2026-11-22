import React from 'react';
import Section from '@/components/pop/Section';

export const FAQS = [
  {
    q: 'Who do you work with?',
    a: 'Founders and marketing teams at D2C brands, service businesses and B2B companies, in India and internationally. Most clients want brand, content and ads handled by one team instead of three.',
  },
  {
    q: 'Who pays for the ads?',
    a: 'You pay Meta and Google directly from your own ad accounts. Our fee covers strategy, creative and management, so you always see exactly where your ad money goes.',
  },
  {
    q: 'Who owns the creative?',
    a: 'You do. Once an invoice is paid, the final designs, videos and copy we made for you are yours.',
  },
  {
    q: 'What happens in the 30-minute diagnostic?',
    a: 'We look at your current ads, website and content together, then tell you the three changes we’d make first. It’s free, and you can use the advice whether or not you hire us.',
  },
  {
    q: 'Where are your clients based?',
    a: 'All over the world. We work with clients over calls, WhatsApp and shared dashboards, so where you’re based doesn’t matter.',
  },
];

export default function Faq() {
  return (
    <Section id="faq" ariaLabel="Questions">
      <div className="grid gap-10 lg:grid-cols-12">
        <h2 className="font-display text-section lg:col-span-5 scroll-pop">
          Questions we get <em className="accent">a lot.</em>
        </h2>
        <div className="lg:col-span-7 border-t border-cream/10">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-cream/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/25 text-xl font-light leading-none transition-transform group-open:rotate-45 group-open:border-pop group-open:text-pop"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 -mt-1 text-[17px] leading-relaxed text-cream/75 max-w-[60ch]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
