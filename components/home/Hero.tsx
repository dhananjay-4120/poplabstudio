import React from 'react';
import Button from '@/components/pop/Button';
import { Container } from '@/components/pop/Section';
import SpinBadge from './SpinBadge';
import KineticWord from './KineticWord';
import FloatField from './FloatField';
import ClientLogos from './ClientLogos';

const ENDINGS = ['ignore.', 'forget.', 'skip.', 'miss.'];

export default function Hero() {
  return (
    <section aria-label="Introduction" className="w-full px-0 sm:px-4 lg:px-6 pt-[84px] sm:pt-[96px]">
      <div className="hero-block relative overflow-hidden bg-lemon sm:rounded-[2rem] sm:border-2 sm:border-black pt-10 sm:pt-16 pb-12 sm:pb-16">
        <FloatField />
        <Container className="relative">
          <div className="relative">
            <h1 className="font-display text-[clamp(2.7rem,7.6vw,7.4rem)] leading-[0.92] relative z-10">
              <span className="sr-only">We make brands impossible to ignore.</span>
              <span aria-hidden="true" className="block">
                <span className="line-mask"><span className="line-rise" style={{ animationDelay: '0ms' }}>We make brands</span></span>
                <span className="line-mask"><span className="line-rise" style={{ animationDelay: '110ms' }}>impossible</span></span>
                <span className="line-mask">
                  <span className="line-rise" style={{ animationDelay: '220ms' }}>
                    to <KineticWord words={ENDINGS} />
                  </span>
                </span>
              </span>
            </h1>

            <SpinBadge className="pop-in mt-8 mx-auto w-[240px] sm:w-[270px] lg:absolute lg:mt-0 lg:right-0 lg:top-[30%] lg:w-[310px] z-10" />

            <div className="relative z-10 mt-8 sm:mt-10 lg:max-w-[56%]">
              <p className="max-w-[40ch] text-xl sm:text-[23px] leading-snug font-medium">
                Brand, content, paid ads and AI search for brands that want to grow. One team, one plan, built
                around why your customer buys.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="ink" size="lg">
                  Book a 30-minute diagnostic
                </Button>
                <Button href="/work" variant="paper" size="lg">
                  See our work
                </Button>
              </div>
            </div>
          </div>

          <ClientLogos />
        </Container>
      </div>
    </section>
  );
}
