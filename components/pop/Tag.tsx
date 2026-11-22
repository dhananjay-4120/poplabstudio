import React from 'react';

export default function Tag({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-current px-3 py-1 text-[13px] font-semibold leading-none ${className}`}
    >
      {children}
    </span>
  );
}
