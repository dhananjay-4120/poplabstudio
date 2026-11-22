import React from 'react';
import Section from '@/components/pop/Section';
import Button from '@/components/pop/Button';

export default function FinalCta() {
  return (
    <Section id="contact" tone="cream" ariaLabel="Book a diagnostic" innerClassName="text-center">
      <h2 className="font-display text-section mx-auto max-w-[17ch] scroll-pop">
        Let’s find the three things <em className="accent">holding your growth back.</em>
      </h2>
      <p className="mx-auto mt-6 max-w-[52ch] text-lg sm:text-xl text-night/75">
        Book a free 30-minute diagnostic. You talk to a senior strategist, not a sales rep.
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
  );
}
