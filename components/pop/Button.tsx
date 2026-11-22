import Link from 'next/link';
import React from 'react';

type Variant = 'primary' | 'ink' | 'outline' | 'lemon' | 'paper';
type Size = 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-pop text-black border-black',
  ink: 'bg-black text-white border-black',
  outline: 'bg-white text-black border-black',
  lemon: 'bg-lemon text-black border-black',
  paper: 'bg-white text-black border-black',
};

const SIZES: Record<Size, string> = {
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base sm:text-[17px]',
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
}

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
  type = 'button',
  disabled,
  external,
  ariaLabel,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full border-2 font-semibold shadow-hard-sm pop-press select-none whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  if (href) {
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          aria-label={ariaLabel}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
