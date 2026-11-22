import React from 'react';
import { Container } from './Section';

interface PageHeaderProps {
  context?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

/** Inner-page hero: small context line, big serif headline, lede, actions. Left aligned. */
export default function PageHeader({ context, title, lede, actions, className = '' }: PageHeaderProps) {
  return (
    <header className={`w-full pt-36 sm:pt-44 pb-12 sm:pb-16 ${className}`}>
      <Container>
        {context && <div className="mb-6 text-[15px] font-medium text-cream/70">{context}</div>}
        <h1 className="font-display text-[clamp(2.75rem,6.6vw,6.25rem)] leading-[0.98] max-w-[18ch] title-in">{title}</h1>
        {lede && <div className="mt-7 max-w-[60ch] text-lg sm:text-xl leading-relaxed text-cream/75">{lede}</div>}
        {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
      </Container>
    </header>
  );
}
