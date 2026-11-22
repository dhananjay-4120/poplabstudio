'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { JOURNAL_ARTICLES } from '@/data/journal';
import PageHeader from '@/components/pop/PageHeader';
import Tag from '@/components/pop/Tag';

export default function JournalClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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


  return (
    <>
      <PageHeader
        context="Journal"
        title="Notes from inside the ad accounts."
        lede="Teardowns and lessons from real campaigns: what we tested, what worked, and what showed up in the numbers. Plain notes, the same ones we share with clients on calls."
      />

      {/* Featured article */}
      <section aria-label="Featured article" className="w-full pb-12 sm:pb-16">
        <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8">
          <Link
            href={`/journal/${featured.slug}`}
            className="group block rounded-[2rem] border border-cream/10 bg-deep p-6 sm:p-10 transition-colors hover:border-cream/25"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 text-[15px] font-medium text-cream/70">
                  <Tag>{featured.category}</Tag>
                  <span>
                    {featured.publishDate} · {featured.readTime}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,3.5rem)] leading-[1.02]">
                  {featured.title} <em className="accent">{featured.italicAccent}</em>
                </h2>
                <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-cream/75">{featured.excerpt}</p>
                <span className="mt-6 inline-block font-semibold text-cream underline decoration-pop decoration-[1.5px] underline-offset-[6px] group-hover:text-pop">
                  Read the article
                </span>
              </div>
              <div className="lg:col-span-4 rounded-2xl border border-cream/10 bg-navy p-5 sm:p-6">
                <p className="text-[15px] font-medium text-cream/70">The short version</p>
                <p className="mt-2 text-lg font-semibold leading-snug text-cream">{featured.heroTakeaway}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Filters + list */}
      <section aria-label="All articles" className="w-full pb-16 sm:pb-20">
        <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full border px-4 h-10 text-[15px] font-semibold whitespace-nowrap transition-colors ${
                    isSelected ? 'border-cream bg-cream text-night' : 'border-cream/20 text-cream hover:bg-cream/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <Link
                key={art.slug}
                href={`/journal/${art.slug}`}
                className="group flex flex-col rounded-2xl border border-cream/10 bg-deep p-6 transition-colors hover:border-cream/25"
              >
                <div className="flex flex-wrap items-center gap-3 text-[14px] font-medium text-cream/70">
                  <Tag>{art.category}</Tag>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="mt-4 font-display text-[1.45rem] leading-[1.05]">
                  {art.title} {art.italicAccent}
                </h3>
                <p className="mt-3 leading-relaxed text-cream/70">{art.excerpt}</p>
                <span className="mt-auto pt-5 font-semibold text-cream underline decoration-pop decoration-[1.5px] underline-offset-[6px] group-hover:text-pop">
                  Read the article
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
