import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { JOURNAL_ARTICLES } from '@/data/journal';
import PageHeader from '@/components/pop/PageHeader';
import Section, { Container } from '@/components/pop/Section';
import Button from '@/components/pop/Button';
import Tag from '@/components/pop/Tag';

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
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Pop Lab Studio' }],
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

  const related = [
    { slug: article.prevSlug, title: article.prevTitle, label: 'Previous article' },
    { slug: article.nextSlug, title: article.nextTitle, label: 'Next article' },
  ];

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

      <article>
        <PageHeader
          context={
            <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link href="/journal" className="underline decoration-pop decoration-[1.5px] underline-offset-4 hover:text-pop">
                Journal
              </Link>
              <span aria-hidden="true">/</span>
              <span>{article.category}</span>
              <span aria-hidden="true">/</span>
              <span>
                {article.publishDate} · {article.readTime}
              </span>
            </span>
          }
          title={<>{article.title} <em className="accent">{article.italicAccent}</em></>}
          lede={article.excerpt}
        />

        <Container className="pb-16 sm:pb-20">
          <div className="max-w-[68ch]">
            <div className="mb-10 rounded-2xl border border-cream/10 bg-deep p-5 sm:p-6">
              <p className="text-[15px] font-medium text-cream/70">The short version</p>
              <p className="mt-2 text-lg sm:text-xl font-semibold leading-snug text-cream">{article.heroTakeaway}</p>
            </div>

            <div className="prose-pop text-[17px] sm:text-lg leading-[1.55]">
              {article.sections.map((sec, idx) => (
                <section key={idx}>
                  {sec.heading && <h2>{sec.heading}</h2>}
                  {sec.subheading && (
                    <h3 className="font-display text-xl sm:text-2xl mt-8 mb-3">{sec.subheading}</h3>
                  )}

                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {sec.callout && (
                    <div className="my-6 rounded-2xl border border-cream/10 bg-deep p-5">
                      <p className="font-bold text-cream">{sec.callout.title}</p>
                      <p className="mt-1">{sec.callout.text}</p>
                    </div>
                  )}

                  {sec.listItems && (
                    <ul>
                      {sec.listItems.map((item, lIdx) => (
                        <li key={lIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <blockquote className="my-12 border-l-2 border-pop pl-6 sm:pl-8">
                <p className="font-display italic text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.15] !text-cream !mb-0">
                  &ldquo;{article.pullQuote}&rdquo;
                </p>
              </blockquote>
            </div>

            {article.comparisonTable && (
              <div className="my-10">
                <h2 className="font-display text-xl sm:text-2xl mb-4 text-cream">Side by side</h2>
                <div className="overflow-x-auto rounded-2xl border border-cream/10 bg-deep">
                  <table className="w-full text-left text-[15px] border-collapse">
                    <thead>
                      <tr className="border-b border-cream/10 text-cream/60">
                        {article.comparisonTable.headers.map((h, i) => (
                          <th key={i} scope="col" className="px-4 py-3 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream/10">
                      {article.comparisonTable.rows.map((r, i) => (
                        <tr key={i}>
                          <th scope="row" className="px-4 py-3 font-semibold text-cream">
                            {r.metric}
                          </th>
                          <td className="px-4 py-3 text-cream/75">{r.approachA}</td>
                          <td className="px-4 py-3 font-semibold text-cream bg-pop/10">{r.approachB}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Container>

        <section aria-label="More from the journal" className="w-full pb-16 sm:pb-20">
          <Container>
            <h2 className="font-display text-subsection mb-6 scroll-pop">Keep reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.label}
                  href={`/journal/${r.slug}`}
                  className="block rounded-2xl border border-cream/10 bg-deep p-6 transition-colors hover:border-cream/25"
                >
                  <Tag>{r.label}</Tag>
                  <span className="mt-4 block font-display text-[1.35rem] leading-[1.1]">{r.title}</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <Section tone="cream" ariaLabel="Book a diagnostic" innerClassName="text-center">
          <h2 className="font-display text-section mx-auto max-w-[16ch] scroll-pop">
            Want this kind of look <em className="accent">at your spend?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg sm:text-xl text-night/75">
            We open your ad accounts with you, show where budget is leaking, and give you a list of things to test first.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/contact" size="lg">
              Book a 30-minute diagnostic
            </Button>
          </div>
        </Section>
      </article>
    </>
  );
}
