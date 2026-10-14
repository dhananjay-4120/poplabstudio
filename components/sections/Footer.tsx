'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Pop Lab Studio Decluttered Master Footer
 *
 * Designed with:
 * - Soaring cranes video background with deep frosted glass veil for WCAG AAA readability.
 * - Theme-specific pristine logos (logo-white.png for dark mode, logo-dark.png for light mode).
 * - Focused, clean information architecture: Company statement, Address, Contact details,
 *   The Dispatch newsletter, Social channels, and Legal links.
 * - Zero clutter: Removed repetitive case study / methodology index lists per user directive.
 */
export default function Footer() {
  const v1Ref = useRef<HTMLVideoElement>(null);
  const isDark = true;
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Newsletter state
  const [nlEmail, setNlEmail] = useState('');
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSubscribed, setNlSubscribed] = useState(false);
  const [nlError, setNlError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const footerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Lazy-load footer background video only when scrolled within 400px of footer
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  const handleCopyEmail = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('growth@poplabstudio.com').catch(() => {
          const ta = document.createElement('textarea');
          ta.value = 'growth@poplabstudio.com';
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch {}
          document.body.removeChild(ta);
        });
      }
    } catch {}
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlError(null);
    const trimmed = nlEmail.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setNlError('Please enter a valid email address.');
      return;
    }
    setNlSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'main-footer' }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setNlError(data?.error || 'Subscription failed. Please try again.');
        setNlSubmitting(false);
        return;
      }
      setNlSubscribed(true);
      setNlEmail('');
      setTimeout(() => setNlSubscribed(false), 5000);
    } catch {
      setNlError('Network error. Please try again.');
    } finally {
      setNlSubmitting(false);
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      suppressHydrationWarning
      className={`site-footer relative isolate flex flex-col overflow-hidden border-t border-black/10 dark:border-white/10 transition-colors duration-500 ${
        isDark ? 'bg-[#070B10] text-[#F5F2EB]' : 'bg-[#F7F5F0] text-[#121824]'
      }`}
      style={{
        padding:
          'clamp(3.5rem, 7vh, 6rem) max(clamp(1.5rem, 5vw, 5rem), env(safe-area-inset-right)) max(clamp(2rem, 4vh, 3.5rem), env(safe-area-inset-bottom)) max(clamp(1.5rem, 5vw, 5rem), env(safe-area-inset-left))',
      }}
    >
      {/* Background Media Container with Looping Flying Cranes Video */}
      <div
        suppressHydrationWarning
        className="footer-media absolute inset-0 -z-20 pointer-events-none overflow-hidden"
      >
        {isInView ? (
          <video
            ref={v1Ref}
            id="footer-bg-video"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/footer-poster.webp"
            className={`absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none transition-opacity duration-1000 ${
              isDark ? 'invert-[0.96] contrast-[1.2] brightness-[0.7] opacity-60' : 'filter-none opacity-50'
            }`}
          >
            <source src="/footer-cranes.webm" type="video/webm" />
            <source src="/footer-cranes.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/footer-poster.webp"
            alt="Song Dynasty Landscape with Cranes"
            suppressHydrationWarning
            className={`absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none ${
              isDark ? 'invert-[0.96] contrast-[1.2] brightness-[0.7] opacity-60' : 'filter-none opacity-50'
            }`}
          />
        )}

        {/* Ambient Warm Radial Glow in Dark Mode */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none z-[-1]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 80%, rgba(255, 94, 20, 0.12) 0%, rgba(7, 11, 16, 0.8) 65%, #070B10 100%)',
            }}
          />
        )}

        {/* High-Readability Frosted Glass Veil: Eliminates visual noise under text */}
        <div
          className={`absolute inset-0 pointer-events-none z-0 backdrop-blur-[6px] transition-colors duration-500 ${
            isDark
              ? 'bg-gradient-to-b from-[#070B10]/95 via-[#070B10]/85 to-[#070B10]/95'
              : 'bg-gradient-to-b from-[#F7F5F0]/95 via-[#F7F5F0]/88 to-[#F7F5F0]/95'
          }`}
        />

        {/* Subtle top edge transition */}
        <div
          className={`absolute inset-x-0 top-0 h-16 pointer-events-none z-10 ${
            isDark
              ? 'bg-gradient-to-b from-[#070B10] to-transparent'
              : 'bg-gradient-to-b from-[#F7F5F0] to-transparent'
          }`}
        />
      </div>

      {/* Main Decluttered Content Container */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex flex-col z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: BRAND, ABOUT, ADDRESS, CONTACTS (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Theme-Specific Pure Logos (Zero Coloring Filters) */}
            <Link href="/" className="inline-block group focus:outline-none mb-6">
              <Image
                src="/logo-white.png"
                alt="Pop Lab Studio"
                width={198}
                height={110}
                className="hidden dark:block h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <Image
                src="/logo-dark.png"
                alt="Pop Lab Studio"
                width={198}
                height={110}
                className="block dark:hidden h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Concise Studio About Statement */}
            <p
              className={`max-w-xl leading-[1.68] text-base sm:text-lg font-light mb-8 ${
                isDark ? 'text-[#F5F2EB]/85' : 'text-[#121824]/90'
              }`}
            >
              Story First. Performance Always. We unite brand identity, cultural attention, and server-side paid media to build compounding category equity.
            </p>

            {/* Clean Studio Address (Label Removed per Directive) */}
            <div className="mb-8 font-mono text-xs leading-relaxed">
              <p className={isDark ? 'text-[#F5F2EB]/75' : 'text-[#121824]/80'}>
                SCO 364, Second Floor, Sector 34A<br />
                Chandigarh 160022, India
              </p>
            </div>

            {/* Direct Contact Methods */}
            <ul className="list-none flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-xs font-mono">
              <li className="flex items-center gap-2">
                <span className="text-[#FF5E14] font-semibold">EMAIL &bull;</span>
                <a
                  href="mailto:growth@poplabstudio.com"
                  className={`hover:underline underline-offset-[3px] font-medium transition-colors ${
                    isDark ? 'text-[#F5F2EB]' : 'text-[#121824]'
                  }`}
                >
                  growth@poplabstudio.com
                </a>
                <button
                  type="button"
                  aria-label="Copy email address"
                  onClick={handleCopyEmail}
                  className={`ml-1 px-2 py-0.5 rounded text-[10px] transition-all ${
                    isDark
                      ? 'bg-white/10 hover:bg-[#FF5E14] hover:text-white text-[#F5F2EB]'
                      : 'bg-black/10 hover:bg-[#FF5E14] hover:text-white text-[#121824]'
                  }`}
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </li>

              <li className="flex items-center gap-2">
                <span className="text-[#25D366] font-semibold">WHATSAPP &bull;</span>
                <a
                  href="https://wa.me/918837565738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline underline-offset-[3px] font-medium transition-colors ${
                    isDark ? 'text-[#F5F2EB]' : 'text-[#121824]'
                  }`}
                >
                  +91 88375 65738 ↗
                </a>
              </li>

              <li className="flex items-center gap-2">
                <span className="text-[#FF5E14] font-semibold">CALENDAR &bull;</span>
                <a
                  href="https://cal.com/poplab-studio-o0cj4m/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline underline-offset-[3px] font-medium transition-colors ${
                    isDark ? 'text-[#F5F2EB]' : 'text-[#121824]'
                  }`}
                >
                  Book 30-Min Diagnostic ↗
                </a>
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN: THE DISPATCH NEWSLETTER (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl backdrop-blur-md border shadow-sm transition-colors ${
            isDark
              ? 'bg-[#0D1522]/80 border-white/10'
              : 'bg-white/80 border-black/10'
          }">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-[#FF5E14]">
                  The Dispatch
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF5E14]/80 px-2 py-0.5 rounded-full bg-[#FF5E14]/10">
                  Weekly Briefing
                </span>
              </div>

              <p
                className={`mb-6 text-sm font-light leading-relaxed ${
                  isDark ? 'text-[#F5F2EB]/80' : 'text-[#121824]/85'
                }`}
              >
                Weekly teardowns of real high-converting ad creative, server-side attribution telemetry, and unit economics.
              </p>

              <form
                className={`flex w-full rounded-xl border p-1 transition-all shadow-sm ${
                  isDark
                    ? 'border-white/15 bg-white/[0.04] focus-within:border-[#FF5E14]'
                    : 'border-black/15 bg-white focus-within:border-[#FF5E14]'
                }`}
                onSubmit={handleNewsletterSubmit}
              >
                <label htmlFor="footer-nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-nl-email"
                  type="email"
                  name="email"
                  placeholder="founder@yourbrand.com"
                  autoComplete="email"
                  required
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  disabled={nlSubmitting}
                  className={`flex-1 min-w-0 border-0 outline-none bg-transparent px-3 py-2 text-xs font-sans ${
                    isDark
                      ? 'text-[#F5F2EB] placeholder:text-stone-400'
                      : 'text-[#121824] placeholder:text-stone-500 font-medium'
                  }`}
                />
                <button
                  type="submit"
                  disabled={nlSubmitting}
                  aria-label="Subscribe to The Dispatch"
                  className="px-4 py-2 rounded-lg bg-[#FF5E14] text-white hover:bg-[#E04F0E] text-xs font-mono font-medium transition-all disabled:opacity-60 shrink-0 shadow-sm"
                >
                  {nlSubmitting ? '...' : 'Join ↗'}
                </button>
              </form>

              {nlSubscribed && (
                <p className="mt-2.5 font-mono text-xs text-[#25D366]" role="status">
                  ✓ Subscribed to Pop Lab notes. Welcome.
                </p>
              )}
              {nlError && (
                <p className="mt-2.5 font-mono text-xs text-red-500" role="alert">
                  ⚠ {nlError}
                </p>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex items-center justify-between font-mono text-[10px]">
              <span className="text-[#FF5E14] uppercase tracking-wider">
                EST. 2024 &bull; POP LAB
              </span>
              <span className={isDark ? 'text-[#F5F2EB]/50' : 'text-[#121824]/50'}>
                14-Day Sprint Deployments
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM BAR: SOCIALS & LEGAL LINKS */}
        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-6 flex-wrap">
          {/* Social Channels */}
          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/918837565738"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="text-[#25D366] hover:scale-110 transition-transform p-1"
              title="WhatsApp: +91 88375 65738"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.02 2.61c.13.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/poplabstudio.hq/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="text-[#E1306C] hover:scale-110 transition-transform p-1"
              title="Instagram: @poplabstudio.hq"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/pop-lab-studios/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Company Page"
              className="text-[#0A66C2] hover:scale-110 transition-transform p-1"
              title="LinkedIn: pop-lab-studios"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5v-8.37H5.07v8.37h2.79z" />
              </svg>
            </a>
          </div>

          {/* Legal Links & Copyright */}
          <div className="flex items-center gap-5 flex-wrap font-mono text-xs">
            <span className={isDark ? 'text-[#F5F2EB]/60' : 'text-[#121824]/60'}>
              &copy; {new Date().getFullYear()} Pop Lab Studio. All rights reserved.
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/tools/aeo-checker"
                className={`hover:underline underline-offset-[3px] transition-colors font-medium ${
                  isDark ? 'text-[#FF5E14]' : 'text-[#FF5E14]'
                }`}
              >
                AEO Scanner (Free)
              </Link>
              <span className="opacity-40">&bull;</span>
              <Link
                href="/privacy"
                className={`hover:underline underline-offset-[3px] transition-colors ${
                  isDark ? 'text-[#F5F2EB]/75 hover:text-[#FF5E14]' : 'text-[#121824]/75 hover:text-[#FF5E14]'
                }`}
              >
                Privacy Policy
              </Link>
              <span className="opacity-40">&bull;</span>
              <Link
                href="/terms"
                className={`hover:underline underline-offset-[3px] transition-colors ${
                  isDark ? 'text-[#F5F2EB]/75 hover:text-[#FF5E14]' : 'text-[#121824]/75 hover:text-[#FF5E14]'
                }`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
