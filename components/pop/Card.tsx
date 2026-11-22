import React from 'react';

export default function Card({
  children,
  className = '',
  as: As = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  return <As className={`rounded-2xl border border-cream/10 bg-deep ${className}`}>{children}</As>;
}
