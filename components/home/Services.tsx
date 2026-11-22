import React from 'react';
import Section from '@/components/pop/Section';

const SERVICES = [
  {
    id: 'brand',
    name: 'Brand and content',
    line: 'Make people want to look.',
    color: 'bg-pop',
    items: ['Positioning and identity', 'Packaging and visual language', 'Monthly social content: Reels, carousels, statics', 'Brand films and product shoots'],
  },
  {
    id: 'attention',
    name: 'Attention',
    line: 'Get talked about, and get found.',
    color: 'bg-cobalt text-white',
    items: ['PR and press features', 'Creator partnerships', 'AI search visibility (ChatGPT, Gemini, Perplexity)', 'SEO and content that earns links'],
  },
  {
    id: 'growth',
    name: 'Growth',
    line: 'Turn attention into sales.',
    color: 'bg-lemon',
    items: [
      'Meta and Google ads',
      'Amazon, Flipkart, Blinkit and Swiggy Instamart onboarding',
      'Landing pages and conversion fixes',
      'Website care and hosting',
    ],
  },
];

export default function Services() {
  return (
    <Section id="services" ariaLabel="What we do">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end mb-10 sm:mb-14">
        <h2 className="font-display text-section lg:col-span-7 scroll-pop">Three jobs, one team.</h2>
        <p className="lg:col-span-5 text-lg text-black/80 max-w-[44ch]">
          Most brands hire a design studio, a social agency and an ads freelancer, and spend their week keeping them in
          sync. We do all three, so the brand, the content and the ads pull in the same direction.
        </p>
      </div>
      <ul className="grid gap-5 md:grid-cols-3">
        {SERVICES.map((s) => (
          <li key={s.id} className={`scroll-tilt wiggle rounded-2xl border-2 border-black p-6 sm:p-7 shadow-hard flex flex-col ${s.color}`}>
            <h3 className="font-display text-subsection">{s.name}</h3>
            <p className="mt-2 text-lg font-medium">{s.line}</p>
            <ul className="mt-6 space-y-2.5 border-t-2 border-current pt-5 text-[16px]">
              {s.items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-current" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
