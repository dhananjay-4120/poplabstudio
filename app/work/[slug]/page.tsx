import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CASE_STUDIES } from '@/data/case-studies';
import PageHeader from '@/components/pop/PageHeader';
import Section, { Container } from '@/components/pop/Section';
import Button from '@/components/pop/Button';
import { formatDateLabel } from '@/components/work/format';

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
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Pop Lab Studio' }],
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

  const category = cs.categoryTag.split('·').map((t) => t.trim());

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

      <article>
        <PageHeader
          context={
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link href="/work" className="underline decoration-pop decoration-[1.5px] underline-offset-4 hover:text-pop">
                All case studies
              </Link>
              <span aria-hidden="true">/</span>
              <span>{category.join(' · ')}</span>
              <span aria-hidden="true">/</span>
              <span>{formatDateLabel(cs.dateLabel)}</span>
            </div>
          }
          title={`${cs.title} ${cs.italicAccent}`}
          lede={cs.heroLede}
        />

        <Container className="pb-16 sm:pb-20">
          <h2 className="sr-only">Results</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cs.metrics.map((m, idx) => (
              <li
                key={idx}
                className={`rounded-2xl border bg-deep p-5 sm:p-6 ${
                  m.isHero ? 'border-pop/40' : 'border-cream/10'
                }`}
              >
                <p className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none text-pop break-words">{m.value}</p>
                <p className="mt-2 text-[15px] text-cream/85 leading-snug">{m.label}</p>
                {m.sublabel && <p className="mt-1 text-[14px] text-cream/60 leading-snug">{m.sublabel}</p>}
              </li>
            ))}
          </ul>
        </Container>

        <Section tone="deep" ariaLabel="The thinking">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-display text-subsection scroll-pop">{cs.theThinking.headline}</h2>
              <div className="prose-pop mt-6 text-lg">
                {cs.theThinking.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <figure className="border-l-4 border-pop pl-6 sm:pl-8 py-2">
                <blockquote className="font-display italic text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] text-cream">
                  &ldquo;{cs.theThinking.pullQuote}&rdquo;
                </blockquote>
              </figure>
            </div>
          </div>
        </Section>

        <Section ariaLabel="What we did">
          <h2 className="font-display text-section max-w-[16ch] scroll-pop">What we did</h2>
          <ul className="mt-8 grid gap-3 max-w-[820px]">
            {cs.executionPoints.map((point, idx) => (
              <li key={idx} className="rounded-2xl border border-cream/10 bg-deep p-4 sm:p-5 text-[17px] leading-relaxed text-cream/85">
                {point}
              </li>
            ))}
          </ul>
        </Section>

        {(cs.proofTable || cs.proofImage) && (
          <Container className="pb-16 sm:pb-20">
            <h2 className="font-display text-subsection mb-6 scroll-pop">The proof</h2>

            {cs.proofTable && (
              <div className="w-full overflow-x-auto rounded-2xl border border-cream/10 bg-deep">
                <table className="w-full text-left text-[15px] border-collapse">
                  <thead>
                    <tr className="text-cream/60">
                      {cs.proofTable.headers.map((h, i) => (
                        <th key={i} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cs.proofTable.rows.map((r, i) => (
                      <tr
                        key={i}
                        className={`border-t border-cream/10 ${r.isWinner ? 'bg-pop/10 font-semibold text-cream' : 'text-cream/85'}`}
                      >
                        {r.values.map((v, j) => (
                          <td key={j} className="px-4 py-3 whitespace-nowrap">
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {cs.proofImage && (
              <figure className={cs.proofTable ? 'mt-10' : ''}>
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xl border border-cream/10 bg-deep">
                  <Image
                    src={cs.proofImage}
                    alt={cs.proofCaption || 'Verified dashboard screenshot'}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1240px) 100vw, 1240px"
                  />
                </div>
                {cs.proofCaption && (
                  <figcaption className="mt-3 text-[14px] text-cream/60">{cs.proofCaption}</figcaption>
                )}
              </figure>
            )}
          </Container>
        )}

        <Container className="pb-16 sm:pb-20">
          <h2 className="sr-only">More case studies</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/work/${cs.prevSlug}`}
              className="block rounded-2xl border border-cream/10 bg-deep p-6 transition-colors hover:border-pop/50"
            >
              <span className="text-[14px] font-medium text-cream/60">Previous case study</span>
              <span className="mt-2 block font-display text-xl leading-tight">{cs.prevTitle}</span>
            </Link>
            <Link
              href={`/work/${cs.nextSlug}`}
              className="block rounded-2xl border border-cream/10 bg-deep p-6 transition-colors hover:border-pop/50 sm:text-right"
            >
              <span className="text-[14px] font-medium text-cream/60">Next case study</span>
              <span className="mt-2 block font-display text-xl leading-tight">{cs.nextTitle}</span>
            </Link>
          </div>
        </Container>

        <Section tone="cream" ariaLabel="Book a diagnostic">
          <h2 className="font-display text-section max-w-[16ch] scroll-pop">Want this kind of read <em className="accent">on your spend?</em></h2>
          <p className="mt-5 text-lg max-w-[56ch] text-night/75">
            We open your ad accounts live on screen share, show where budget is leaking, and hand you a list of angles
            to test first.
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Book a 30-minute diagnostic
            </Button>
          </div>
        </Section>
      </article>
    </>
  );
}
