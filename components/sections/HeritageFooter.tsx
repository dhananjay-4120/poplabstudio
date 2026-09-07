'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HeritageFooter() {
  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideoId, setActiveVideoId] = useState<1 | 2>(1);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [nlEmail, setNlEmail] = useState('');
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSubscribed, setNlSubscribed] = useState(false);
  const [nlError, setNlError] = useState<string | null>(null);
  const isFadingRef = useRef(false);

  const handleNlSubmit = async (e: React.FormEvent) => {
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
        body: JSON.stringify({ email: trimmed, source: 'heritage-footer' }),
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

  // Sync automatically with global ThemeToggle on document.documentElement
  useEffect(() => {
    setMounted(true);
    const updateTheme = () => {
      const isLight = document.documentElement.classList.contains('light');
      setIsDark(!isLight);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Dual-buffer continuous crossfade loop (both videos pinned to absolute inset-0)
  useEffect(() => {
    if (!mounted) return;
    let animationFrameId: number;

    const checkCrossfade = () => {
      const activeVideo = activeVideoId === 1 ? v1Ref.current : v2Ref.current;
      const idleVideo = activeVideoId === 1 ? v2Ref.current : v1Ref.current;

      if (activeVideo && idleVideo) {
        // At 8.6s (outgoing cranes approaching far left edge), trigger 1.4s crossfade
        if (activeVideo.currentTime >= 8.6 && !isFadingRef.current) {
          isFadingRef.current = true;

          idleVideo.currentTime = 0;
          idleVideo.play().catch(() => {});

          setActiveVideoId((prev) => (prev === 1 ? 2 : 1));

          setTimeout(() => {
            activeVideo.pause();
            isFadingRef.current = false;
          }, 1400);
        }
      }
      animationFrameId = requestAnimationFrame(checkCrossfade);
    };

    animationFrameId = requestAnimationFrame(checkCrossfade);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, activeVideoId]);

  return (
    <footer
      id="heritage-footer"
      suppressHydrationWarning
      className={`site-footer relative isolate flex flex-col min-h-screen min-h-[100svh] overflow-hidden break-words transition-colors duration-500 ${
        isDark ? 'bg-[#070B10] text-[#F5F2EB]' : 'bg-[#EAE3DE] text-[#175A67]'
      }`}
      style={{
        padding:
          'clamp(2.25rem, 4.5vh, 4rem) max(clamp(1.25rem, 4vw, 4.5rem), env(safe-area-inset-right)) max(clamp(1.5rem, 3vh, 2.75rem), env(safe-area-inset-bottom)) max(clamp(1.25rem, 4vw, 4.5rem), env(safe-area-inset-left))',
      }}
    >
      {/* Background Media Container (Seamless Full-Bleed Background across Mobile & Desktop) */}
      <div
        suppressHydrationWarning
        className="footer-media absolute inset-0 -z-20 pointer-events-none overflow-hidden"
      >
        {mounted ? (
          <>
            {/* Video 1: Always absolute inset-0 */}
            <video
              ref={v1Ref}
              id="bg-video-1"
              suppressHydrationWarning
              className={`footer-bg absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none transition-opacity duration-[1400ms] ease-in-out ${
                activeVideoId === 1 ? 'opacity-100' : 'opacity-0'
              } ${isDark ? 'invert-[0.96] contrast-[1.2] brightness-[0.85]' : 'filter-none'}`}
              autoPlay
              muted
              playsInline
              preload="auto"
              poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4"
                type="video/mp4"
              />
            </video>

            {/* Video 2: Always absolute inset-0 (Overlaps Video 1 exactly) */}
            <video
              ref={v2Ref}
              id="bg-video-2"
              suppressHydrationWarning
              className={`footer-bg absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none transition-opacity duration-[1400ms] ease-in-out ${
                activeVideoId === 2 ? 'opacity-100' : 'opacity-0'
              } ${isDark ? 'invert-[0.96] contrast-[1.2] brightness-[0.85]' : 'filter-none'}`}
              muted
              playsInline
              preload="auto"
              poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4"
                type="video/mp4"
              />
            </video>
          </>
        ) : (
          <img
            src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png"
            alt="Heritage Grove Landscape"
            suppressHydrationWarning
            className={`footer-bg absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none ${
              isDark ? 'invert-[0.96] contrast-[1.2] brightness-[0.85]' : 'filter-none'
            }`}
          />
        )}

        {/* Ambient Sunset Glow for Pop Lab Dark Mode Only */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none z-[-1]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 60%, rgba(255, 94, 20, 0.18) 0%, rgba(7, 11, 16, 0.6) 70%, #070B10 100%)',
            }}
          />
        )}

        {/* Soft seam for mobile/tablet blending into background */}
        <div
          className={`hidden max-[1100px]:block absolute inset-x-0 top-0 h-[clamp(40px,12vw,90px)] pointer-events-none z-10 ${
            isDark
              ? 'bg-gradient-to-b from-[#070B10] via-[#070B10]/70 to-transparent'
              : 'bg-gradient-to-b from-[#EAE3DE] via-[#EAE3DE]/65 to-transparent'
          }`}
        />
      </div>

      <div className="footer-inner relative w-full max-w-[1440px] mx-auto flex-1 flex flex-col z-10">
        <div className="footer-grid grid items-start gap-[clamp(1.5rem,3vw,3.25rem)] grid-cols-[minmax(240px,1.45fr)_repeat(3,minmax(130px,0.85fr))_minmax(260px,1.25fr)] max-[1100px]:grid-cols-3 max-[720px]:grid-cols-2 max-[359px]:grid-cols-1">
          {/* BRAND */}
          <div className="brand max-[1100px]:col-span-full">
            <Link
              href="/"
              className={`brand-lockup inline-flex items-center gap-[clamp(0.65rem,1vw,1rem)] ${
                isDark ? 'text-[#F5F2EB]' : 'text-[#175A67]'
              }`}
            >
              <svg
                className={`brand-mark w-[clamp(52px,4.4vw,74px)] h-auto shrink-0 ${
                  isDark ? 'stroke-[#FF5E14]' : 'stroke-current'
                }`}
                viewBox="0 0 96 120"
                fill="none"
                strokeWidth="2"
                aria-hidden="true"
              >
                <ellipse cx="48" cy="60" rx="45" ry="57" />
                <path d="M48 88V46" strokeLinecap="round" />
                <path d="M48 58c-8-2-14-8-16-16 9 0 15 5 16 16Zm0 0c8-2 14-8 16-16-9 0-15 5-16 16Z" />
                <path d="M48 74c-9-2-15-8-17-17 10 0 16 6 17 17Zm0 0c9-2 15-8 17-17-10 0-16 6-17 17Z" />
                <path d="M48 46c-6-3-9-9-8-16 6 3 9 9 8 16Zm0 0c6-3 9-9 8-16-6 3-9 9-8 16Z" />
                <path d="M30 44c-5 1-9-1-12-5 5-2 9-1 12 5Zm36 0c5 1 9-1 12-5-5-2-9-1-12 5Z" />
              </svg>
              <span className="brand-name font-serif font-medium text-[clamp(1.85rem,2.5vw,2.9rem)] leading-none tracking-tight">
                Heritage Grove
              </span>
            </Link>
            <p
              className={`brand-blurb mt-[clamp(1.15rem,2.4vh,1.9rem)] max-w-[24ch] max-[1100px]:max-w-[42ch] max-[720px]:max-w-[34ch] leading-[1.62] text-[clamp(0.9rem,0.55vw+0.75rem,1.02rem)] ${
                isDark ? 'text-[#F5F2EB]/80' : 'text-[#175A67]/90'
              }`}
            >
              Crafting digital experiences that connect, delight, and leave a lasting imprint
            </p>
            <ul className="contact-list list-none mt-[clamp(1.15rem,2.4vh,1.9rem)] flex flex-col gap-[clamp(0.6rem,1.2vh,0.95rem)] text-[clamp(0.9rem,0.55vw+0.75rem,1.02rem)]">
              <li className="flex items-center gap-[0.85rem]">
                <svg
                  className={`w-[19px] h-[19px] shrink-0 ${isDark ? 'fill-[#FF5E14]' : 'fill-current'}`}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:growth@poplabstudio.com" className="hover:underline underline-offset-[3px] transition-all">
                  growth@poplabstudio.com
                </a>
              </li>
              <li className="flex items-center gap-[0.85rem]">
                <svg
                  className={`w-[19px] h-[19px] shrink-0 ${isDark ? 'fill-[#FF5E14]' : 'fill-current'}`}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:+918837565738" className="hover:underline underline-offset-[3px] transition-all">
                  +91 88375 65738
                </a>
              </li>
              <li className="flex items-center gap-[0.85rem]">
                <svg
                  className={`w-[19px] h-[19px] shrink-0 ${isDark ? 'fill-[#FF5E14]' : 'fill-current'}`}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>India</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 1: WORK */}
          <nav className="col" aria-label="Work and Case Studies">
            <h3
              className={`col-title mb-[clamp(1.15rem,2.4vh,1.85rem)] text-[clamp(0.95rem,0.5vw+0.8rem,1.12rem)] font-semibold tracking-[0.055em] uppercase ${
                isDark ? 'text-[#FF5E14]' : 'text-[#175A67]'
              }`}
            >
              Case Studies
            </h3>
            <ul className="link-list flex flex-col gap-[clamp(0.62rem,1.35vh,1.05rem)] text-[clamp(0.9rem,0.55vw+0.75rem,1.02rem)]">
              {[
                { name: 'All Case Studies', href: '/work' },
                { name: 'Artisanal Bakery', href: '/work/bakery' },
                { name: 'Diamond Atelier', href: '/work/jewellery' },
                { name: 'Architectural Studio', href: '/work/interiors' },
                { name: 'Clean-Label Nutrition', href: '/work/d2c' },
                { name: 'Fintech B2B SaaS', href: '/work/linkedin' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="inline-block hover:opacity-100 opacity-85 hover:translate-x-[2px] transition-all">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* COLUMN 2: METHODOLOGY */}
          <nav className="col" aria-label="Methodology">
            <h3
              className={`col-title mb-[clamp(1.15rem,2.4vh,1.85rem)] text-[clamp(0.95rem,0.5vw+0.8rem,1.12rem)] font-semibold tracking-[0.055em] uppercase ${
                isDark ? 'text-[#FF5E14]' : 'text-[#175A67]'
              }`}
            >
              Methodology
            </h3>
            <ul className="link-list flex flex-col gap-[clamp(0.62rem,1.35vh,1.05rem)] text-[clamp(0.9rem,0.55vw+0.75rem,1.02rem)]">
              {[
                { name: '5-Stage Sprints', href: '/process' },
                { name: 'Growth Journal', href: '/journal' },
                { name: 'Attribution & CAPI', href: '/process#attribution' },
                { name: 'Creative Testing', href: '/journal/post-creative-testing' },
                { name: 'Live Ad Teardown', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="inline-block hover:opacity-100 opacity-85 hover:translate-x-[2px] transition-all">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* COLUMN 3: STUDIO & LEGAL */}
          <nav className="col" aria-label="Studio and Governance">
            <h3
              className={`col-title mb-[clamp(1.15rem,2.4vh,1.85rem)] text-[clamp(0.95rem,0.5vw+0.8rem,1.12rem)] font-semibold tracking-[0.055em] uppercase ${
                isDark ? 'text-[#FF5E14]' : 'text-[#175A67]'
              }`}
            >
              Studio
            </h3>
            <ul className="link-list flex flex-col gap-[clamp(0.62rem,1.35vh,1.05rem)] text-[clamp(0.9rem,0.55vw+0.75rem,1.02rem)]">
              {[
                { name: 'Start a Project', href: '/contact' },
                { name: 'Book via Cal.com', href: 'https://cal.com/poplab-studio-o0cj4m/30min', external: true },
                { name: 'WhatsApp Direct', href: 'https://wa.me/918837565738', external: true },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
              ].map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block hover:opacity-100 opacity-85 hover:translate-x-[2px] transition-all"
                    >
                      {item.name} ↗
                    </a>
                  ) : (
                    <Link href={item.href} className="inline-block hover:opacity-100 opacity-85 hover:translate-x-[2px] transition-all">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* COLUMN 4: THE LETTER */}
          <div className="newsletter max-[1100px]:col-span-full">
            <h3
              className={`col-title mb-[clamp(1.15rem,2.4vh,1.85rem)] text-[clamp(0.95rem,0.5vw+0.8rem,1.12rem)] font-semibold tracking-[0.055em] uppercase ${
                isDark ? 'text-[#FF5E14]' : 'text-[#175A67]'
              }`}
            >
              The Dispatch
            </h3>
            <p
              className={`mb-[clamp(1rem,2.2vh,1.6rem)] max-w-[32ch] max-[440px]:max-w-none leading-[1.62] text-[clamp(0.9rem,0.55vw+0.75rem,1.02rem)] ${
                isDark ? 'text-[#F5F2EB]/80' : 'text-[#175A67]/90'
              }`}
            >
              Weekly breakdowns of high-converting ads, telemetry, and conversion rate engineering.
            </p>
            <form
              className={`subscribe flex w-full max-w-[380px] max-[440px]:max-w-none border transition-colors ${
                isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#175A67] bg-white/60'
              }`}
              onSubmit={handleNlSubmit}
            >
              <label htmlFor="nl-email-next" className="sr-only">
                Email address
              </label>
              <input
                id="nl-email-next"
                type="email"
                name="email"
                placeholder="Leave your email"
                autoComplete="email"
                required
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                disabled={nlSubmitting}
                className={`flex-1 min-w-0 border-0 outline-none bg-transparent px-[1.05rem] py-[0.95rem] text-[clamp(0.9rem,0.55vw+0.75rem,1.02rem)] ${
                  isDark
                    ? 'text-[#F5F2EB] placeholder:text-[#94A3B8]/90 focus-visible:ring-[#FF5E14]/30'
                    : 'text-[#175A67] placeholder:text-[#2A707C]/95 focus-visible:ring-[#175A67]/25 font-medium'
                }`}
              />
              <button
                type="submit"
                disabled={nlSubmitting}
                aria-label="Subscribe"
                className={`w-[clamp(56px,4vw,66px)] border-0 grid place-items-center transition-colors cursor-pointer disabled:opacity-60 ${
                  isDark ? 'bg-[#FF5E14] text-white hover:bg-[#E04F0E]' : 'bg-[#175A67] text-[#EAE3DE] hover:bg-[#0F454F]'
                }`}
              >
                {nlSubmitting ? (
                  <span className="text-xs font-mono animate-pulse">...</span>
                ) : (
                  <svg
                    className="w-[22px] h-[22px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                )}
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
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom mt-auto pt-[clamp(2.5rem,6vh,4.5rem)] flex items-center justify-between gap-5 flex-wrap max-[720px]:flex-col max-[720px]:items-start">
          <div className="socials flex items-center gap-[clamp(0.9rem,1.5vw,1.5rem)]">
            <a
              href="https://wa.me/918837565738"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:opacity-100 opacity-80 hover:-translate-y-0.5 transition-all text-[#25D366]"
            >
              <svg className="w-[26px] h-[26px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.02 2.61c.13.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/poplabstudio.hq/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-100 opacity-80 hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-[26px] h-[26px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/pop-lab-studios/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-100 opacity-80 hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-[26px] h-[26px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5v-8.37H5.07v8.37h2.79z" />
              </svg>
            </a>
          </div>

          <nav className="legal flex items-center gap-[clamp(1.15rem,2.6vw,3rem)] flex-wrap text-[clamp(0.9rem,0.55vw+0.75rem,1.02rem)] opacity-80">
            <Link href="#" className="hover:underline underline-offset-[3px]">
              Privacy Notice
            </Link>
            <Link href="#" className="hover:underline underline-offset-[3px]">
              Terms &amp; Policies
            </Link>
            <Link href="#" className="hover:underline underline-offset-[3px]">
              Cookie Notice
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
