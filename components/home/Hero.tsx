import React from 'react';
import Button from '@/components/pop/Button';
import { Container } from '@/components/pop/Section';
import ThinkingBoard from './ThinkingBoard';

export default function Hero() {
  return (
    <section aria-label="Introduction" className="relative w-full overflow-hidden pt-28 sm:pt-36 pb-10 sm:pb-12">
      <Container>
        <div className="relative">
          <h1 className="font-display text-hero max-w-[11ch] sm:max-w-none">
            We make brands
            <br className="hidden sm:block" /> impossible
            <br className="hidden sm:block" /> to ignore.
          </h1>
          <div
            aria-hidden="true"
            className="pop-in relative ml-auto -mt-4 mr-1 sm:mr-0 sm:mt-0 sm:absolute sm:right-[4%] lg:right-[8%] sm:bottom-[8%] grid h-28 w-28 sm:h-40 sm:w-40 place-items-center rounded-full border-2 border-black bg-lemon text-center shadow-hard-sm"
            style={{ ['--tilt' as string]: '-12deg', animationDelay: '700ms' }}
          >
            <span className="px-3 text-[13px] sm:text-[17px] font-bold leading-tight">
              Thought through first. Loud second.
            </span>
          </div>
        </div>

        <div className="mt-8 sm:mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <p className="text-xl sm:text-[22px] leading-snug font-medium max-w-[34ch]">
              Pop Lab is a creative growth studio in Chandigarh. We build your brand, make the content, run the ads
              and get you found in AI search, as one team with one plan.
            </p>
            <p className="mt-4 text-[17px] text-black/75 max-w-[44ch]">
              Every campaign starts with a question about your customer, not a template. Pick a project to see how
              that plays out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Book a 30-minute diagnostic
              </Button>
              <Button href="/work" variant="outline" size="lg">
                See our work
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ThinkingBoard />
          </div>
        </div>
      </Container>
    </section>
  );
}
