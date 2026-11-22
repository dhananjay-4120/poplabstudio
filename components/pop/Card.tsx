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
  return <As className={`rounded-2xl border-2 border-black bg-white shadow-hard ${className}`}>{children}</As>;
}
