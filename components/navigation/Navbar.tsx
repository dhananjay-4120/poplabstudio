'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'How we work', href: '/process' },
  { label: 'Journal', href: '/journal' },
  { label: 'Free AI search check', href: '/tools/aeo-checker' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    } else if (wasOpen.current) {
      toggleRef.current?.focus();
    }
    wasOpen.current = open;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={`mx-auto max-w-[1240px] flex items-center justify-between gap-4 rounded-full border pl-5 pr-2 h-[60px] transition-colors duration-300 ${
          scrolled || open ? 'border-cream/15 bg-night/85 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <Link href="/" aria-label="Pop Lab Studio home" className="shrink-0">
          <Image src="/logo-white.png" alt="Pop Lab Studio" width={86} height={48} priority className="h-9 w-auto" />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                  isActive(link.href) ? 'text-pop' : 'text-cream/80 hover:text-cream'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-full bg-pop px-5 text-[15px] font-semibold text-night transition-colors hover:bg-pop-light"
          >
            Start a project
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-cream/25"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-cream transition-transform duration-200 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-cream transition-transform duration-200 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="lg:hidden mx-auto mt-3 max-w-[1240px] rounded-[1.75rem] border border-cream/15 bg-deep p-3"
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`block rounded-2xl px-4 py-4 font-display text-3xl ${isActive(link.href) ? 'text-pop' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="block rounded-2xl px-4 py-4 font-display text-3xl">
              Contact
            </Link>
          </li>
        </ul>
        <div className="mt-2 grid grid-cols-2 gap-2 p-1">
          <a
            href="https://wa.me/918837565738"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-pop py-3 text-center font-semibold text-night"
          >
            WhatsApp
          </a>
          <a href="tel:+918837565738" className="rounded-full border border-cream/25 py-3 text-center font-semibold">
            Call us
          </a>
        </div>
      </div>
    </header>
  );
}
