'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'Journal', href: '/journal' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none transition-all duration-300">
        <nav
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-500 rounded-full px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between backdrop-blur-2xl bg-white/85 dark:bg-[#090D14]/80 border border-black/10 dark:border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden ${
            scrolled ? 'bg-white/95 dark:bg-[#090D14]/92 border-black/15 dark:border-white/[0.15] shadow-2xl scale-[0.99]' : ''
          }`}
        >
          {/* Top Specular Glint Line */}
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent pointer-events-none" />

          {/* Brand Identity / Official Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none rounded-md py-1"
          >
            <Image
              src="/logo-white.png"
              alt="Pop Lab Studio"
              width={198}
              height={110}
              priority
              className="hidden dark:block h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <Image
              src="/logo-dark.png"
              alt="Pop Lab Studio"
              width={198}
              height={110}
              priority
              className="block dark:hidden h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links with Magnetic Fluid Hover Pill */}
          <div
            onMouseLeave={() => setHoveredIdx(null)}
            className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04]"
          >
            {NAV_LINKS.map((link, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="relative px-3.5 py-1.5 text-xs font-grotesk uppercase tracking-[0.16em] text-[#121824]/75 dark:text-[#F5F2EB]/75 hover:text-[#121824] dark:hover:text-[#F5F2EB] transition-colors duration-200 z-10 focus:outline-none"
                >
                  {isHovered && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/5 dark:border-white/10 -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-5 py-2 rounded-full text-xs font-grotesk uppercase tracking-[0.18em] font-medium text-white bg-[#FF5E14] hover:bg-[#E04F0E] transition-all duration-200 shadow-[0_0_24px_rgba(255,94,20,0.35)] hover:shadow-[0_0_32px_rgba(255,94,20,0.55)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
            >
              <span>Start a Project</span>
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          {/* Mobile Right Bar: Direct CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full text-xs font-grotesk uppercase tracking-wider font-medium text-white bg-[#FF5E14] shadow-[0_0_18px_rgba(255,94,20,0.35)] active:scale-95 focus-visible:ring-2 focus-visible:ring-[#FF5E14] focus:outline-none"
            >
              Start →
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex flex-col justify-center items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] text-[#121824] dark:text-[#F5F2EB] p-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 active:scale-90 transition-all"
            >
              <span
                className={`w-5 h-[2px] bg-[#121824] dark:bg-[#F5F2EB] transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-[#121824] dark:bg-[#F5F2EB] transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#F7F5F0]/98 dark:bg-[#090D14]/98 backdrop-blur-3xl px-6 pt-28 pb-10 flex flex-col justify-between md:hidden"
          >
            {/* Top Coordinates Header */}
            <div className="border-b border-black/10 dark:border-white/10 pb-4 flex items-center justify-between font-mono text-[11px] text-[#121824]/60 dark:text-[#F5F2EB]/50 uppercase tracking-widest relative z-10">
              <span>POP LAB STUDIO</span>
              <span className="text-[#FF5E14] font-mono text-[10px] tracking-wider">
                CREATIVE GROWTH STUDIO
              </span>
            </div>

            {/* Dedicated Warm Amber Aura in Drawer */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[420px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,94,20,0.22)_0%,rgba(255,94,20,0.05)_50%,transparent_75%)] pointer-events-none blur-3xl -z-10" />

            {/* Navigation Links with Editorial Display Typography */}
            <div className="flex flex-col gap-5 my-auto py-6">
              {NAV_LINKS.map((link, idx) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline justify-between font-serif text-3xl text-[#121824] dark:text-[#F5F2EB] hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors border-b border-black/5 dark:border-white/5 pb-3"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#121824]/40 dark:text-[#F5F2EB]/40 group-hover:text-[#FF5E14]">
                    0{idx + 1} →
                  </span>
                </Link>
              ))}
            </div>

            {/* Bottom Contact & Real Studio Address */}
            <div className="space-y-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-full bg-[#FF5E14] text-white font-grotesk text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,94,20,0.4)]"
              >
                <span>Start a Project</span>
                <span>→</span>
              </Link>
              <div className="flex flex-col gap-1.5 text-[11px] font-mono text-[#121824]/60 dark:text-[#F5F2EB]/50 pt-3 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center justify-between">
                  <span>STUDIO &amp; WORLDWIDE</span>
                  <a href="mailto:growth@poplabstudio.com" className="text-[#FF5E14] hover:underline">
                    growth@poplabstudio.com
                  </a>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#121824]/50 dark:text-[#F5F2EB]/40 pt-1">
                  <a href="tel:+918837565738" className="hover:text-[#FF5E14] transition-colors">
                    +91 88375 65738
                  </a>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/918837565738"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline"
                    >
                      WhatsApp ↗
                    </a>
                    <a
                      href="https://www.instagram.com/poplabstudio.hq/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FF5E14] transition-colors"
                    >
                      IG ↗
                    </a>
                    <a
                      href="https://www.linkedin.com/company/pop-lab-studios/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#FF5E14] transition-colors"
                    >
                      IN ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
