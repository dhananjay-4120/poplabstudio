import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { JOURNAL_ARTICLES } from '@/data/journal';
import {
  InkSealStamp,
  HandDrawnArrow,
  HandDrawnHighlight,
  SignalFiltrationDiagram,
  AttributionSignalDiagram,
} from '@/components/ui/VisualSoul';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found — Pop Lab Studio',
    };
  }

  return {
    title: `${article.title} ${article.italicAccent} — Growth Journal | Pop Lab Studio`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} ${article.italicAccent} — Pop Lab Studio`,
      description: article.excerpt,
      url: `https://poplabstudio.com/journal/${article.slug}`,
      siteName: 'Pop Lab Studio',
      type: 'article',
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: `${article.title} ${article.italicAccent}`,
    description: article.excerpt,
    datePublished: '2026-06-01',
    author: {
      '@type': 'Organization',
      name: 'Pop Lab Studio Senior Partners',
      url: 'https://poplabstudio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pop Lab Studio',
      url: 'https://poplabstudio.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://poplabstudio.com/journal/${article.slug}`,
    },
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://poplabstudio.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Journal',
        item: 'https://poplabstudio.com/journal',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${article.title} ${article.italicAccent}`,
        item: `https://poplabstudio.com/journal/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <article className="w-full relative z-10 pt-28 sm:pt-36 pb-24 px-5 sm:px-10 md:px-16 max-w-4xl mx-auto overflow-x-hidden">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-black/10 dark:border-white/10 font-mono text-xs uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
          <Link
            href="/journal"
            className="hover:text-[#FF5E14] transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Journal</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>{article.category}</span>
            <span className="text-black/30 dark:text-white/30">•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="mb-12">
          <div className="flex items-center gap-3 font-mono text-xs text-[#121824]/60 dark:text-[#F5F2EB]/50 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/30 font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span>Published {article.publishDate}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#121824] dark:text-[#F5F2EB] tracking-tight leading-[1.08] mb-6">
            {article.title} <HandDrawnHighlight strokeColor="#FF5E14"><em>{article.italicAccent}</em></HandDrawnHighlight>
          </h1>

          <p className="font-sans text-base sm:text-xl text-[#121824]/80 dark:text-[#F5F2EB]/75 font-light leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Hero Takeaway Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border-l-4 border-[#FF5E14] mb-14 relative shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest font-semibold">
              EXECUTIVE SUMMARY
            </span>
            <InkSealStamp text="POP LAB" subtext="VERIFIED" size={38} />
          </div>
          <p className="font-serif text-lg sm:text-xl italic text-[#121824] dark:text-[#F5F2EB] leading-snug">
            &ldquo;{article.heroTakeaway}&rdquo;
          </p>
        </div>

        {/* Main Long-Form Prose */}
        <div className="space-y-10 text-[#121824]/85 dark:text-[#F5F2EB]/80 font-sans text-base sm:text-lg font-light leading-relaxed pb-16">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              {sec.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] font-normal pt-4">
                  {sec.heading}
                </h2>
              )}
              {sec.subheading && (
                <h3 className="font-serif text-xl sm:text-2xl text-[#121824] dark:text-[#F5F2EB] font-normal">
                  {sec.subheading}
                </h3>
              )}

              {sec.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}

              {sec.callout && (
                <div className="my-6 p-6 rounded-2xl bg-[#FF5E14]/10 border border-[#FF5E14]/30 space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5E14] block">
                    {sec.callout.title}
                  </span>
                  <p className="font-sans text-sm text-[#121824]/90 dark:text-[#F5F2EB]/90 leading-relaxed">
                    {sec.callout.text}
                  </p>
                </div>
              )}

              {sec.listItems && (
                <ul className="space-y-3 pt-2">
                  {sec.listItems.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-3">
                      <span className="text-[#FF5E14] font-mono text-base font-bold mt-0.5">•</span>
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Editorial Pull Quote */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 text-center my-10 shadow-sm">
            <p className="font-serif text-xl sm:text-2xl italic text-[#121824] dark:text-[#F5F2EB] leading-snug max-w-xl mx-auto">
              &ldquo;{article.pullQuote}&rdquo;
            </p>
          </div>

          {/* Optional Comparison Table */}
          {article.comparisonTable && (
            <div className="my-10">
              <div className="mb-3 font-mono text-xs uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
                HEAD-TO-HEAD AUDIT METRICS
              </div>
              <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0D1522]">
                <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                      {article.comparisonTable.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3.5 text-[#121824]/70 dark:text-[#F5F2EB]/60 uppercase font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {article.comparisonTable.rows.map((r, i) => (
                      <tr key={i} className="text-[#121824]/80 dark:text-[#F5F2EB]/75">
                        <td className="px-4 py-3.5 font-semibold text-[#FF5E14]">{r.metric}</td>
                        <td className="px-4 py-3.5">{r.approachA}</td>
                        <td className="px-4 py-3.5 font-medium">{r.approachB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Supplementary Vector Diagram for Visual Soul */}
          <div className="my-10">
            {article.category === 'Tracking' ? (
              <AttributionSignalDiagram />
            ) : (
              <SignalFiltrationDiagram />
            )}
          </div>
        </div>

        {/* Author / Credential Capsule */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16 shadow-sm">
          <div>
            <span className="font-mono text-[10px] text-[#FF5E14] uppercase tracking-widest block mb-1">
              CURATED BY SENIOR PARTNERS
            </span>
            <div className="font-serif text-xl text-[#121824] dark:text-[#F5F2EB]">
              Pop Lab Studio Research &amp; Performance Desk
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#121824]/60 dark:text-[#F5F2EB]/50 mt-1 max-w-md">
              Field observations and account telemetry gathered from live client campaigns.
            </p>
          </div>
          <InkSealStamp text="POP LAB" subtext="PARTNER" size={52} />
        </div>

        {/* Pagination Navigation */}
        <div className="pt-8 pb-16 border-t border-b border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/journal/${article.prevSlug}`}
            className="group flex items-center gap-3 font-mono text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60 hover:text-[#FF5E14]"
          >
            <span>←</span>
            <span>
              Previous: <span className="underline group-hover:text-[#FF5E14]">{article.prevTitle}</span>
            </span>
          </Link>

          <Link
            href={`/journal/${article.nextSlug}`}
            className="group flex items-center gap-3 font-mono text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60 hover:text-[#FF5E14]"
          >
            <span>
              Next: <span className="underline group-hover:text-[#FF5E14]">{article.nextTitle}</span>
            </span>
            <span>→</span>
          </Link>
        </div>

        {/* Teardown Diagnostic CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#090D14] text-[#121824] dark:text-[#F5F2EB] border border-black/10 dark:border-white/10 text-center relative overflow-hidden shadow-xl dark:shadow-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(255,94,20,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] block mb-3 font-semibold">
              YOUR AD ACCOUNT NEXT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121824] dark:text-white mb-4 leading-tight">
              Want this diagnostic eye on <em>your spend?</em>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#121824]/75 dark:text-white/75 font-light leading-relaxed mb-8">
              We&apos;ll open your ad accounts live on screen share, pinpoint where budget is leaking, and hand you a roadmap of angles to test first.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF5E14] hover:bg-[#E04F0E] text-white font-grotesk text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-[0_0_30px_rgba(255,94,20,0.4)] hover:scale-105"
            >
              <span>Book a Teardown</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
