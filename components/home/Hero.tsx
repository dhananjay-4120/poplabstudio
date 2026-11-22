import React from 'react';
import Button from '@/components/pop/Button';
import { Container } from '@/components/pop/Section';
import SunSea from './SunSea';
import ClientLogos from './ClientLogos';

export default function Hero() {
  return (
    <section aria-label="Introduction" className="relative w-full overflow-hidden bg-night">
      <SunSea className="absolute inset-0 top-[34%] sm:top-0 lg:left-[28%]" />
      {/* readability fade: solid night behind the text, opening up toward the scene */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.92)_0%,rgba(7,11,20,0.7)_40%,rgba(7,11,20,0)_70%)] lg:bg-[linear-gradient(90deg,#070B14_0%,#070B14_30%,rgba(7,11,20,0.75)_45%,rgba(7,11,20,0)_65%)]"
      />

      <Container className="relative z-10 flex min-h-[100svh] flex-col pt-32 sm:pt-40 pb-10">
        <div className="max-w-[760px]">
          <h1 className="font-display text-hero">
            <span className="line-mask"><span className="line-rise">We make brands</span></span>
            <span className="line-mask"><span className="line-rise" style={{ animationDelay: '120ms' }}>impossible to</span></span>
            <span className="line-mask">
              <span className="line-rise" style={{ animationDelay: '240ms' }}>
                <em className="accent">ignore.</em>
              </span>
            </span>
          </h1>
          <p className="fade-up mt-7 max-w-[44ch] text-lg sm:text-xl leading-relaxed text-cream/80" style={{ animationDelay: '500ms' }}>
            Brand, content, paid ads and AI search for brands that want to grow. One senior team, one plan, built
            around why your customer buys.
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: '650ms' }}>
            <Button href="/contact" size="lg">
              Book a 30-minute diagnostic
            </Button>
            <Button href="/work" variant="ghost" size="lg">
              See our work
            </Button>
          </div>
        </div>

        <div className="mt-auto pt-16">
          <div className="fade-up flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-cream/15 pt-6" style={{ animationDelay: '800ms' }}>
            <p className="flex items-baseline gap-4">
              <span className="font-display text-[3.5rem] sm:text-[4.5rem] leading-none text-cream [font-variant-numeric:lining-nums]">
                $1M+
              </span>
              <span className="max-w-[16ch] text-[15px] leading-snug text-cream/75">in ad spend managed for our clients</span>
            </p>
          </div>
          <ClientLogos />
        </div>
      </Container>
    </section>
  );
}
