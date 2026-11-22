'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { JOURNAL_ARTICLES, JournalArticle } from '@/data/journal';
import {
  InkSealStamp,
  HandDrawnArrow,
  HandDrawnHighlight,
} from '@/components/ui/VisualSoul';

export default function JournalClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const featured = JOURNAL_ARTICLES.find((a) => a.isFeatured) || JOURNAL_ARTICLES[0];

  const categories = [
    'All',
    'Framework',
    'Paid Media',
    'AI & Growth',
    'Tracking',
    'Creative',
    'Strategy',
    'Scaling',
  ];

  const filteredArticles =
    selectedCategory === 'All'
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.category === selectedCategory);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'journal-page' }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || 'Subscription failed. Please check your email.');
        setSubmitting(false);
        return;
      }

      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full relative z-10 pt-28 sm:pt-36 pb-24 px-5 sm:px-10 md:px-16 max-w-6xl mx-auto overflow-x-hidden">
      {/* Top Folio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-black/10 dark:border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
          THE GROWTH JOURNAL · NOTES FROM THE ACCOUNTS
        </span>
        <span>DISPATCHES &amp; TEARDOWNS</span>
      </div>

      {/* Hero Narrative */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <InkSealStamp text="POP LAB" subtext="DISPATCH" size={48} />
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5E14]">
            ZERO FLUFF · REAL ACCOUNT EVIDENCE
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121824] dark:text-[#F5F2EB] tracking-tight leading-[1.05] mb-6">
          Honest notes on <br />
          <HandDrawnHighlight strokeColor="#FF5E14"><em>growth.</em></HandDrawnHighlight>
        </h1>

        <p className="font-sans text-base sm:text-xl text-[#121824]/80 dark:text-[#F5F2EB]/75 font-light leading-relaxed max-w-2xl">
          Teardowns, mathematical frameworks, and the unglamorous technical optimizations that actually manifest in the P&amp;L. No generic thought-leadership marketing fluff - only what we discuss on partner screen-shares.
        </p>

      </div>

      {/* Featured Headline Teardown */}
      <section className="mb-20">
        <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
          <span className="flex items-center gap-2">
            <span className="text-[#FF5E14]">✦</span> FEATURED TEARDOWN
          </span>
          <span>{featured.readTime}</span>
        </div>

        <Link
          href={`/journal/${featured.slug}`}
          className="group block p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 hover:border-[#FF5E14]/50 transition-all duration-300 shadow-sm hover:shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/20 uppercase tracking-wider font-semibold">
                  {featured.category}
                </span>
                <span className="text-[#121824]/60 dark:text-[#F5F2EB]/50">
                  Published {featured.publishDate}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#121824] dark:text-[#F5F2EB] group-hover:text-[#FF5E14] transition-colors leading-tight">
                {featured.title} <em>{featured.italicAccent}</em>
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#121824]/75 dark:text-[#F5F2EB]/70 font-light leading-relaxed max-w-xl">
                {featured.excerpt}
              </p>

              <div className="pt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF5E14] group-hover:translate-x-1.5 transition-transform">
                <span>Read Full 7-Min Teardown</span>
                <span>→</span>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/5 dark:border-white/5 space-y-4">
              <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block">
                CORE TAKEAWAY
              </span>
              <p className="font-serif text-lg text-[#121824] dark:text-[#F5F2EB] italic leading-snug">
                &ldquo;{featured.heroTakeaway}&rdquo;
              </p>
              <div className="pt-3 border-t border-black/5 dark:border-white/5 font-mono text-[11px] text-[#121824]/60 dark:text-[#F5F2EB]/50">
                Senior Partner Notes // Pop Lab Studio
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Category Filtering Chips */}
      <section className="mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#FF5E14] text-white shadow-[0_0_20px_rgba(255,94,20,0.35)]'
                    : 'bg-black/[0.04] dark:bg-white/[0.04] text-[#121824]/70 dark:text-[#F5F2EB]/60 hover:text-[#121824] dark:hover:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/5 dark:border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of All Teardowns */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((art) => (
            <Link
              key={art.slug}
              href={`/journal/${art.slug}`}
              className="group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 hover:border-[#FF5E14]/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <span className="text-[#FF5E14] font-semibold">{art.category}</span>
                  <span className="text-[#121824]/50 dark:text-[#F5F2EB]/40">{art.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#121824] dark:text-[#F5F2EB] group-hover:text-[#FF5E14] transition-colors leading-snug mb-3">
                  {art.title} <em>{art.italicAccent}</em>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#121824]/75 dark:text-[#F5F2EB]/70 font-light leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between font-mono text-xs text-[#FF5E14]">
                <span className="uppercase tracking-wider">Read Article</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Weekly Teardown Subscription Capsule */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#090D14] text-[#121824] dark:text-[#F5F2EB] border border-black/10 dark:border-white/10 text-center relative overflow-hidden shadow-xl dark:shadow-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(255,94,20,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] block mb-3 font-semibold">
            DIRECT TO INBOX
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#121824] dark:text-white mb-4">
            Weekly teardowns, <em>straight to your desk.</em>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#121824]/75 dark:text-white/75 font-light leading-relaxed mb-8">
            One weekly breakdown of high-converting ads, auction telemetry, and conversion rate tests. No marketing fluff. Free forever.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your executive email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className="flex-1 px-5 py-3.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/20 dark:border-white/15 text-[#121824] dark:text-white placeholder-[#121824]/75 dark:placeholder-white/60 text-xs font-mono focus:outline-none focus:border-[#FF5E14] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-7 py-3.5 rounded-full bg-[#FF5E14] hover:bg-[#E04F0E] text-white font-grotesk text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-[0_0_24px_rgba(255,94,20,0.4)] whitespace-nowrap disabled:opacity-60"
            >
              {submitting ? 'Subscribing...' : subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </form>

          {error && (
            <p className="mt-3 font-mono text-xs text-red-500" role="alert">
              ⚠ {error}
            </p>
          )}

          {subscribed && (
            <p className="mt-3 font-mono text-xs text-[#25D366]" role="status">
              ✓ You are subscribed. Welcome to the inner circle.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
