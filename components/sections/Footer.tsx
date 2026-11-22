'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/pop/Section';

const EMAIL = 'growth@poplabstudio.com';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [nlEmail, setNlEmail] = useState('');
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSubscribed, setNlSubscribed] = useState(false);
  const [nlError, setNlError] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlError(null);
    const trimmed = nlEmail.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setNlError('Enter a valid email address.');
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
        setNlError(data?.error || 'That didn’t go through. Try again in a moment.');
        return;
      }
      setNlSubscribed(true);
      setNlEmail('');
    } catch {
      setNlError('No connection. Check your internet and try again.');
    } finally {
      setNlSubmitting(false);
    }
  };

  const linkCls = 'hover:text-white underline-offset-4 hover:underline';

  return (
    <footer id="footer" className="w-full px-0 sm:px-4 lg:px-6 pb-0 sm:pb-6 mt-8">
      <div className="bg-black text-white sm:rounded-[2rem] pt-16 sm:pt-20 pb-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-display text-section max-w-[15ch]">Got a brand worth talking about?</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-lg">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-semibold underline decoration-2 underline-offset-4 hover:text-lemon"
                  aria-live="polite"
                >
                  {copied ? 'Email copied' : EMAIL}
                </button>
                <a href="tel:+918837565738" className="font-semibold underline decoration-2 underline-offset-4 hover:text-lemon">
                  +91 88375 65738
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-lemon text-black border-2 border-white p-6 sm:p-7">
                <p className="font-display text-2xl">The Dispatch</p>
                <p className="mt-2 text-[15px] leading-relaxed">
                  Short notes on what we tested in ads, creative and AI search, and what actually worked.
                </p>
                {nlSubscribed ? (
                  <p className="mt-5 rounded-xl border-2 border-black bg-white px-4 py-3 font-semibold" role="status">
                    You’re in. The next issue lands in your inbox.
                  </p>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="mt-5 flex flex-col sm:flex-row gap-2" noValidate>
                    <label htmlFor="footer-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      required
                      value={nlEmail}
                      onChange={(e) => setNlEmail(e.target.value)}
                      placeholder="you@brand.com"
                      autoComplete="email"
                      className="h-12 w-full sm:flex-1 min-w-0 rounded-full border-2 border-black bg-white px-5 text-base placeholder:text-black/50"
                    />
                    <button
                      type="submit"
                      disabled={nlSubmitting}
                      className="h-12 rounded-full border-2 border-black bg-black px-6 font-semibold text-white disabled:opacity-60"
                    >
                      {nlSubmitting ? 'Subscribing…' : 'Subscribe'}
                    </button>
                  </form>
                )}
                {nlError && (
                  <p className="mt-3 text-sm font-semibold" role="alert">
                    {nlError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 border-t-2 border-white/20 pt-10 sm:grid-cols-2 lg:grid-cols-4 text-[15px]">
            <div>
              <Image src="/logo-white.png" alt="Pop Lab Studio" width={108} height={60} className="h-12 w-auto" />
              <p className="mt-4 text-white/75 leading-relaxed max-w-[30ch]">
                Brand, content, ads and AI search for growing brands. One team, one plan.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-3">Visit</p>
              <address className="not-italic text-white/75 leading-relaxed">
                SCO 364-365-366, Second Floor
                <br />
                Sector 34A, Chandigarh 160022
                <br />
                Mon–Sat, 9:30am–7:30pm
              </address>
            </div>
            <div>
              <p className="font-semibold mb-3">Talk</p>
              <ul className="space-y-2 text-white/75">
                <li><a href="tel:+918837565738" className={linkCls}>+91 88375 65738</a></li>
                <li><a href="https://wa.me/918837565738" target="_blank" rel="noopener noreferrer" className={linkCls}>WhatsApp</a></li>
                <li><a href="https://cal.com/poplab-studio-o0cj4m/30min" target="_blank" rel="noopener noreferrer" className={linkCls}>Book a 30-minute call</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Explore</p>
              <ul className="space-y-2 text-white/75">
                <li><Link href="/work" className={linkCls}>Work</Link></li>
                <li><Link href="/process" className={linkCls}>How we work</Link></li>
                <li><Link href="/journal" className={linkCls}>Journal</Link></li>
                <li><Link href="/tools/aeo-checker" className={linkCls}>Free AI search check</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-white/60">
            <p>© {new Date().getFullYear()} Pop Lab Creative Studio Pvt. Ltd.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li><a href="https://www.instagram.com/poplabstudio.hq/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/pop-lab-studios/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
