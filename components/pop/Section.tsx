import React from 'react';

export type Tone = 'night' | 'deep' | 'navy' | 'cream' | 'pop';

const TONES: Record<Tone, string> = {
  night: 'bg-night text-cream',
  deep: 'bg-deep text-cream border border-cream/10',
  navy: 'bg-navy text-cream',
  cream: 'bg-cream text-night',
  pop: 'bg-pop text-night',
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`w-full max-w-[1240px] mx-auto px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** `night` renders as plain page; other tones render as an inset rounded block. */
export default function Section({ id, tone = 'night', className = '', innerClassName = '', children, ariaLabel }: SectionProps) {
  if (tone !== 'night') {
    return (
      <section id={id} aria-label={ariaLabel} className={`w-full px-0 sm:px-4 lg:px-6 ${className}`}>
        <div className={`${TONES[tone]} sm:rounded-[2rem] py-16 sm:py-20 lg:py-24`}>
          <Container className={innerClassName}>{children}</Container>
        </div>
      </section>
    );
  }
  return (
    <section id={id} aria-label={ariaLabel} className={`w-full py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}
