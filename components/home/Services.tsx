import React from 'react';
import Section from '@/components/pop/Section';

const SERVICES = [
  {
    id: 'brand',
    name: 'Brand and content',
    line: 'Make people want to look.',
    items: ['Positioning and identity', 'Packaging and visual language', 'Monthly social content: Reels, carousels, statics', 'Brand films and product shoots'],
  },
  {
    id: 'attention',
    name: 'Attention',
    line: 'Get talked about, and get found.',
    items: ['PR and press features', 'Creator partnerships', 'AI search visibility (ChatGPT, Gemini, Perplexity)', 'SEO and content that earns links'],
  },
  {
    id: 'growth',
    name: 'Growth',
    line: 'Turn attention into sales.',
    items: ['Meta and Google ads', 'Amazon, Flipkart, Blinkit and Swiggy Instamart onboarding', 'Landing pages and conversion fixes', 'Website care and hosting'],
  },
];

export default function Services() {
  return (
    <Section id="services" ariaLabel="What we do">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end mb-12 sm:mb-16">
        <h2 className="font-display text-section lg:col-span-7 scroll-pop">
          Three jobs. <em className="accent">One team.</em>
        </h2>
        <p className="lg:col-span-5 text-lg text-cream/75 max-w-[44ch]">
          Most brands hire a design studio, a social agency and an ads freelancer, then spend their week keeping
          them in sync. We do all three, so the brand, the content and the ads pull in the same direction.
        </p>
      </div>
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <li key={s.id} className="group bg-night p-7 sm:p-9 transition-colors hover:bg-deep">
            <span className="font-display text-xl text-pop" aria-hidden="true">
              0{i + 1}
            </span>
            <h3 className="mt-6 font-display text-subsection">{s.name}</h3>
            <p className="mt-2 text-lg text-cream/80">{s.line}</p>
            <ul className="mt-7 space-y-3 border-t border-cream/10 pt-6 text-[16px] text-cream/75">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
