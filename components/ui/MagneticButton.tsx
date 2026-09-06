'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  strength?: number;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

/**
 * MagneticButton: Interactive button adhering to Pop Lab Studio luxury anti-slop standards.
 * Features Emil Kowalski spring physics (stiffness: 300, damping: 30) for physical realism.
 */
export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  variant = 'primary',
  strength = 0.35,
  type = 'button',
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const rect = ref.current.getBoundingClientRect();
      const middleX = clientX - (rect.left + rect.width / 2);
      const middleY = clientY - (rect.top + rect.height / 2);
      setPosition({
        x: middleX * strength,
        y: middleY * strength,
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const variantStyles = {
    primary:
      'bg-[#FF5E14] text-white hover:bg-[#E04F0E] shadow-[0_0_35px_rgba(255,94,20,0.35)] border border-[#FF5E14]/50',
    secondary:
      'bg-black/[0.04] dark:bg-white/[0.05] text-[#121824] dark:text-[#F5F2EB] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/10 dark:border-white/15 backdrop-blur-md',
    ghost:
      'bg-transparent text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#121824] dark:hover:text-white border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/25',
  };

  const baseStyles =
    'inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs font-grotesk uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-tangerine focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D14]';

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  // Emil Kowalski spring configuration
  const springConfig = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={springConfig}
      className="inline-block"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    const isAnchor = href.startsWith('#');
    if (isAnchor) {
      return (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={combinedStyles}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
        className={combinedStyles}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={combinedStyles}
    >
      {content}
    </button>
  );
}
