import React from 'react';
import Button from '@/components/pop/Button';
import { Container } from '@/components/pop/Section';

export default function NotFound() {
  return (
    <main className="w-full pt-36 sm:pt-44 pb-24 sm:pb-32">
      <Container>
        <p className="font-display italic text-[clamp(7rem,28vw,20rem)] leading-[0.85] text-pop" aria-hidden="true">
          404
        </p>
        <h1 className="mt-6 font-display text-section max-w-[18ch]">This page wandered off.</h1>
        <p className="mt-5 max-w-[52ch] text-lg sm:text-xl leading-relaxed text-cream/70">
          The link you followed has moved, expired or never existed. Head back home or see our work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" size="lg">Go home</Button>
          <Button href="/work" variant="ghost" size="lg">See our work</Button>
        </div>
      </Container>
    </main>
  );
}
