import React from 'react';

export type Tone = 'paper' | 'lemon' | 'cobalt' | 'ink' | 'pop' | 'fog' | 'blush';

const TONES: Record<Tone, string> = {
  paper: 'bg-white text-black',
  fog: 'bg-fog text-black',
  lemon: 'bg-lemon text-black',
  blush: 'bg-blush text-black',
  pop: 'bg-pop text-black',
  cobalt: 'bg-cobalt text-white',
  ink: 'bg-black text-white',
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  /** Coloured tones render as an inset rounded block on desktop */
  inset?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`w-full max-w-[1240px] mx-auto px-5 sm:px-8 ${className}`}>{children}</div>;
}

export default function Section({
  id,
  tone = 'paper',
  inset,
  className = '',
  innerClassName = '',
  children,
  ariaLabel,
}: SectionProps) {
  const isBlock = inset ?? tone !== 'paper';
  if (isBlock) {
    return (
      <section id={id} aria-label={ariaLabel} className={`w-full px-0 sm:px-4 lg:px-6 ${className}`}>
        <div className={`${TONES[tone]} sm:rounded-[2rem] sm:border-2 sm:border-black py-16 sm:py-20 lg:py-24`}>
          <Container className={innerClassName}>{children}</Container>
        </div>
      </section>
    );
  }
  return (
    <section id={id} aria-label={ariaLabel} className={`w-full ${TONES[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}
