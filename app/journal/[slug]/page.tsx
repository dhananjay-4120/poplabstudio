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
      images: [{ url: '/opengraph-image.jpg', width: 1024, height: 576, alt: 'Pop Lab Studio' }],
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
              <Link href="/journal" className="underline decoration-2 underline-offset-4 hover:text-cobalt">
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
          title={`${article.title} ${article.italicAccent}`}
          lede={article.excerpt}
        />

        <Container className="pb-16 sm:pb-20">
          <div className="max-w-[68ch]">
            <div className="mb-10 rounded-2xl border-2 border-black bg-lemon p-5 sm:p-6 shadow-hard-sm">
              <p className="text-[15px] font-semibold">The short version</p>
              <p className="mt-2 text-lg sm:text-xl font-semibold leading-snug">{article.heroTakeaway}</p>
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
                    <div className="my-6 rounded-2xl border-2 border-black bg-fog p-5 shadow-hard-sm">
                      <p className="font-bold">{sec.callout.title}</p>
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

              <blockquote className="my-10 rounded-2xl border-2 border-black bg-lemon p-6 sm:p-8">
                <p className="font-display text-[clamp(1.4rem,3vw,2rem)] leading-[1.1]">
                  &ldquo;{article.pullQuote}&rdquo;
                </p>
              </blockquote>
            </div>

            {article.comparisonTable && (
              <div className="my-10">
                <h2 className="font-display text-xl sm:text-2xl mb-4">Side by side</h2>
                <div className="overflow-x-auto rounded-2xl border-2 border-black bg-white">
                  <table className="w-full text-left text-[15px] border-collapse">
                    <thead>
                      <tr className="border-b-2 border-black bg-fog">
                        {article.comparisonTable.headers.map((h, i) => (
                          <th key={i} scope="col" className="px-4 py-3 font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black">
                      {article.comparisonTable.rows.map((r, i) => (
                        <tr key={i}>
                          <th scope="row" className="px-4 py-3 font-bold">
                            {r.metric}
                          </th>
                          <td className="px-4 py-3">{r.approachA}</td>
                          <td className="px-4 py-3 font-semibold">{r.approachB}</td>
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
            <h2 className="font-display text-subsection mb-6">Keep reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.label}
                  href={`/journal/${r.slug}`}
                  className="block rounded-2xl border-2 border-black bg-white p-6 shadow-hard-sm pop-press"
                >
                  <Tag>{r.label}</Tag>
                  <span className="mt-4 block font-display text-[1.35rem] leading-[1.1]">{r.title}</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <Section tone="pop" ariaLabel="Book a diagnostic" innerClassName="text-center">
          <h2 className="font-display text-section mx-auto max-w-[16ch]">Want this kind of look at your spend?</h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg sm:text-xl">
            We open your ad accounts with you, show where budget is leaking, and give you a list of things to test first.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/contact" variant="ink" size="lg">
              Book a 30-minute diagnostic
            </Button>
          </div>
        </Section>
      </article>
    </>
  );
}
