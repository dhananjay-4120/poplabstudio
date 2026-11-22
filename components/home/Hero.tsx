import React from 'react';
import Button from '@/components/pop/Button';
import { Container } from '@/components/pop/Section';
import Starburst from './Starburst';
import ClientLogos from './ClientLogos';

// What we run day to day. Shown as stickers around the headline (desktop) or a row (mobile).
const CHANNELS = [
  { label: 'Meta ads', cls: 'bg-white', tilt: '-6deg' },
  { label: 'Google ads', cls: 'bg-cobalt text-white', tilt: '5deg' },
  { label: 'Reels', cls: 'bg-blush', tilt: '8deg' },
  { label: 'Amazon & Flipkart', cls: 'bg-white', tilt: '-4deg' },
  { label: 'Blinkit & Instamart', cls: 'bg-black text-white', tilt: '3deg' },
  { label: 'AI search', cls: 'bg-white', tilt: '-7deg' },
];

export default function Hero() {
  return (
    <section aria-label="Introduction" className="w-full px-0 sm:px-4 lg:px-6 pt-[84px] sm:pt-[96px]">
      <div className="relative overflow-hidden bg-lemon sm:rounded-[2rem] sm:border-2 sm:border-black pt-10 sm:pt-16 pb-12 sm:pb-16">
        <Container>
          <div className="relative">
            <h1 className="font-display text-[clamp(2.9rem,8vw,7.6rem)] leading-[0.9] relative z-10">
              <span className="block">We make brands</span>
              <span className="block">impossible</span>
              <span className="block">to ignore.</span>
            </h1>

            <Starburst
              className="pop-in mt-8 mx-auto h-[250px] w-[250px] sm:h-[280px] sm:w-[280px] lg:absolute lg:mt-0 lg:right-0 lg:top-[30%] lg:h-[330px] lg:w-[330px]"
            >
              <p className="px-6 -rotate-[8deg]">
                <span className="block text-[14px] sm:text-[15px] font-semibold">We’ve managed</span>
                <span className="font-display block whitespace-nowrap text-[2.4rem] sm:text-[2.7rem] lg:text-[3.1rem] leading-none my-1">
                  ₹10 Cr+
                </span>
                <span className="block text-[14px] sm:text-[15px] font-semibold leading-tight">in ad spend</span>
              </p>
            </Starburst>

            <div className="mt-8 sm:mt-10 lg:max-w-[58%]">
              <p className="max-w-[40ch] text-xl sm:text-[23px] leading-snug font-medium">
                Brand, content, ads and AI search for growing brands. One team, one plan, built around why your
                customer buys.
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

          <ul aria-label="Channels we run" className="mt-10 flex flex-wrap gap-2.5">
            {CHANNELS.map((c, i) => (
              <li
                key={c.label}
                className={`pop-in rounded-full border-2 border-black px-4 py-2 text-[15px] font-semibold shadow-hard-sm ${c.cls}`}
                style={{ ['--tilt' as string]: c.tilt, animationDelay: `${250 + i * 90}ms` }}
              >
                {c.label}
              </li>
            ))}
          </ul>

          <ClientLogos />
        </Container>
      </div>
    </section>
  );
}
