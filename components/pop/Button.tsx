import Link from 'next/link';
import React from 'react';

type Variant = 'primary' | 'light' | 'ghost' | 'link';
type Size = 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-pop text-night hover:bg-pop-light shadow-glow',
  light: 'bg-cream text-night hover:bg-white',
  ghost: 'border border-cream/25 text-cream hover:bg-cream/10 hover:border-cream/40',
  link: 'text-cream underline decoration-pop decoration-[1.5px] underline-offset-[6px] hover:text-pop !px-0 !h-auto',
};

const SIZES: Record<Size, string> = {
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
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
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 select-none whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
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
