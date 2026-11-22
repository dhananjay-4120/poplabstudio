import React from 'react';

export default function Tag({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-cream/20 px-3 py-1 text-[13px] font-medium leading-none text-cream/80 ${className}`}>
      {children}
    </span>
  );
}
