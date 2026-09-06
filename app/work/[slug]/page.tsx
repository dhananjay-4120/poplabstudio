import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CASE_STUDIES } from '@/data/case-studies';
import {
  InkSealStamp,
  HandDrawnArrow,
  HandDrawnHighlight,
  SignalFiltrationDiagram,
  AttributionSignalDiagram,
  LuxuryShowroomFlowDiagram,
  TwoChannelFlywheelDiagram,
  CreativeTestingMatrixDiagram,
  EnterprisePipelineDiagram,
  ArchitecturalFunnelDiagram,
} from '@/components/ui/VisualSoul';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);

  if (!cs) {
    return {
      title: 'Case Study Not Found — Pop Lab Studio',
    };
  }

  return {
    title: `${cs.title} ${cs.italicAccent} — Growth Case Study | Pop Lab Studio`,
    description: cs.heroLede,
    openGraph: {
      title: `${cs.title} ${cs.italicAccent} — Pop Lab Studio`,
      description: cs.heroLede,
      url: `https://poplabstudio.com/work/${cs.slug}`,
      siteName: 'Pop Lab Studio',
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);

  if (!cs) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${cs.title} ${cs.italicAccent} — Growth Case Study`,
    description: cs.heroLede,
    publisher: {
      '@type': 'Organization',
      name: 'Pop Lab Studio',
      url: 'https://poplabstudio.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://poplabstudio.com/work/${cs.slug}`,
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
        name: 'Work',
        item: 'https://poplabstudio.com/work',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${cs.title} ${cs.italicAccent}`,
        item: `https://poplabstudio.com/work/${cs.slug}`,
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

      <article className="w-full relative z-10 pt-28 sm:pt-36 pb-24 px-5 sm:px-10 md:px-16 max-w-5xl mx-auto overflow-x-hidden">
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-black/10 dark:border-white/10 font-mono text-xs uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
          <Link
            href="/work"
            className="hover:text-[#FF5E14] transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>All Case Studies</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <span>{cs.index}</span>
            <span className="text-black/30 dark:text-white/30">•</span>
            <span>{cs.dateLabel}</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#FF5E14]/10 text-[#FF5E14] border border-[#FF5E14]/30">
              {cs.categoryTag}
            </span>
            <span className="font-mono text-xs text-[#121824]/60 dark:text-[#F5F2EB]/50">
              {cs.clientType}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121824] dark:text-[#F5F2EB] tracking-tight leading-[1.08] mb-6">
            {cs.title} <HandDrawnHighlight strokeColor="#FF5E14"><em>{cs.italicAccent}</em></HandDrawnHighlight>
          </h1>

          <p className="font-sans text-base sm:text-xl text-[#121824]/80 dark:text-[#F5F2EB]/75 font-light leading-relaxed max-w-3xl">
            {cs.heroLede}
          </p>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/10 dark:bg-white/10 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 mb-16 shadow-sm">
          {cs.metrics.map((m, idx) => (
            <div key={idx} className="p-5 sm:p-6 bg-white dark:bg-[#0D1522]">
              <div
                className={`font-serif text-2xl sm:text-3xl mb-1 ${
                  m.isHero ? 'text-[#FF5E14]' : 'text-[#121824] dark:text-[#F5F2EB]'
                }`}
              >
                {m.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#121824]/60 dark:text-[#F5F2EB]/50 leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two-Column Deep Dive: The Thinking vs The Execution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 pb-16 border-b border-black/10 dark:border-white/10">
          {/* Left Column: Strategic Diagnosis (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14]">
                THE STRATEGIC THINKING
              </h2>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] leading-snug">
              {cs.theThinking.headline}
            </h3>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#121824]/80 dark:text-[#F5F2EB]/75 font-light leading-relaxed">
              {cs.theThinking.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Sculptural Editorial Pull Quote */}
            <div className="p-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border-l-4 border-[#FF5E14] relative my-6">
              <p className="font-serif text-lg sm:text-xl italic text-[#121824] dark:text-[#F5F2EB] leading-snug">
                &ldquo;{cs.theThinking.pullQuote}&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#121824]/50 dark:text-[#F5F2EB]/40">
                  POPLAB STUDIO ARCHITECTURE NOTE
                </span>
                <InkSealStamp text="POP LAB" subtext="NOTE" size={38} />
              </div>
            </div>
          </div>

          {/* Right Column: Execution Protocol (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0E4D7A] dark:bg-[#38BDF8]" />
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#0E4D7A] dark:text-[#38BDF8]">
                EXECUTION BLUEPRINT
              </h2>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] leading-snug">
              What actually went into the accounts
            </h3>

            <ul className="space-y-4 pt-2">
              {cs.executionPoints.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 pb-4 border-b border-black/5 dark:border-white/5 font-sans text-sm sm:text-base text-[#121824]/80 dark:text-[#F5F2EB]/75 font-light leading-relaxed"
                >
                  <span className="text-[#FF5E14] font-mono text-lg font-bold leading-none mt-0.5">
                    +
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex items-center gap-3">
              <HandDrawnArrow direction="right" color="#FF5E14" />
              <span className="font-mono text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60">
                Zero vanity reach. Clean attribution on every single rupee.
              </span>
            </div>
          </div>
        </div>

        {/* Optional Data Table */}
        {cs.proofTable && (
          <div className="my-16">
            <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
              <span>TABULAR TELEMETRY</span>
              <span>VERIFIED METRICS</span>
            </div>
            <div className="w-full overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0D1522]">
              <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                    {cs.proofTable.headers.map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-3.5 text-[#121824]/70 dark:text-[#F5F2EB]/60 uppercase tracking-wider font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {cs.proofTable.rows.map((r, i) => (
                    <tr
                      key={i}
                      className={
                        r.isWinner
                          ? 'bg-[#FF5E14]/10 text-[#FF5E14] font-semibold'
                          : 'text-[#121824]/80 dark:text-[#F5F2EB]/75'
                      }
                    >
                      {r.values.map((v, j) => (
                        <td key={j} className="px-4 py-3.5 whitespace-nowrap">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Verified Proof Screenshot (When Available) */}
        {cs.proofImage && (
          <div className="my-16">
            <figure className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-[#0D1522] shadow-md">
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
                <Image
                  src={cs.proofImage}
                  alt={cs.proofCaption || 'Verified dashboard screenshot'}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 960px"
                />
              </div>
              {cs.proofCaption && (
                <figcaption className="p-4 sm:px-6 font-mono text-[11px] text-[#121824]/60 dark:text-[#F5F2EB]/50 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#0D1522] flex items-center justify-between">
                  <span>{cs.proofCaption}</span>
                  <span className="text-[#FF5E14]">VERIFIED TELEMETRY ✓</span>
                </figcaption>
              )}
            </figure>
          </div>
        )}

        {/* Bespoke Architectural Blueprint & Flow Diagram */}
        <div className="my-16">
          {cs.slug === 'jewellery' && <LuxuryShowroomFlowDiagram />}
          {cs.slug === 'travel-europe' && <TwoChannelFlywheelDiagram />}
          {cs.slug === 'interiors' && <ArchitecturalFunnelDiagram />}
          {cs.slug === 'wellness' && <CreativeTestingMatrixDiagram />}
          {cs.slug === 'holiday' && <TwoChannelFlywheelDiagram />}
          {cs.slug === 'linkedin' && <EnterprisePipelineDiagram />}
          {cs.slug === 'bakery' && <SignalFiltrationDiagram />}
          {cs.slug === 'd2c' && <AttributionSignalDiagram />}
          {!['jewellery', 'travel-europe', 'interiors', 'wellness', 'holiday', 'linkedin', 'bakery', 'd2c'].includes(cs.slug) && (
            <AttributionSignalDiagram />
          )}
        </div>

        {/* Pagination Cross-Links */}
        <div className="pt-10 pb-16 border-t border-b border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/work/${cs.prevSlug}`}
            className="group flex items-center gap-3 font-mono text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60 hover:text-[#FF5E14]"
          >
            <span>←</span>
            <span>
              Previous: <span className="underline group-hover:text-[#FF5E14]">{cs.prevTitle}</span>
            </span>
          </Link>

          <Link
            href={`/work/${cs.nextSlug}`}
            className="group flex items-center gap-3 font-mono text-xs text-[#121824]/70 dark:text-[#F5F2EB]/60 hover:text-[#FF5E14]"
          >
            <span>
              Next: <span className="underline group-hover:text-[#FF5E14]">{cs.nextTitle}</span>
            </span>
            <span>→</span>
          </Link>
        </div>

        {/* Conversion Teardown Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#090D14] text-[#121824] dark:text-[#F5F2EB] border border-black/10 dark:border-white/10 text-center relative overflow-hidden shadow-xl dark:shadow-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(255,94,20,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E14] block mb-3">
              YOUR NUMBERS NEXT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121824] dark:text-white mb-4 leading-tight">
              Want this kind of read on <em>your spend?</em>
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
