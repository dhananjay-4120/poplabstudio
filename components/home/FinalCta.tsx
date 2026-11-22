import React from 'react';
import Section from '@/components/pop/Section';
import Button from '@/components/pop/Button';

export default function FinalCta() {
  return (
    <Section id="contact" tone="pop" ariaLabel="Book a diagnostic" innerClassName="text-center">
      <h2 className="font-display text-section mx-auto max-w-[16ch]">Let’s find the three things holding your growth back.</h2>
      <p className="mx-auto mt-6 max-w-[52ch] text-lg sm:text-xl">
        Book a free 30-minute diagnostic. You talk to a senior strategist, not a sales rep.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/contact" variant="ink" size="lg">
          Book a 30-minute diagnostic
        </Button>
        <Button href="https://wa.me/918837565738" variant="paper" size="lg">
          Message us on WhatsApp
        </Button>
      </div>
    </Section>
  );
}
