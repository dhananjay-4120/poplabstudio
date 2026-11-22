import React from 'react';
import { Container } from './Section';

interface PageHeaderProps {
  context?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

/** Inner-page hero: small context line, big display headline, lede, actions. Left aligned. */
export default function PageHeader({ context, title, lede, actions, className = '' }: PageHeaderProps) {
  return (
    <header className={`w-full pt-32 sm:pt-40 pb-12 sm:pb-16 ${className}`}>
      <Container>
        {context && <div className="mb-5 text-[15px] font-semibold">{context}</div>}
        <h1 className="font-display text-section sm:text-[clamp(2.75rem,6.5vw,6rem)] max-w-[18ch] title-in">{title}</h1>
        {lede && <div className="mt-6 max-w-[62ch] text-lg sm:text-xl leading-relaxed">{lede}</div>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </Container>
    </header>
  );
}
