import { NextResponse } from 'next/server';
import { JOURNAL_ARTICLES } from '@/data/journal';

export async function GET() {
  const siteUrl = 'https://poplabstudio.com';

  const itemsXml = JOURNAL_ARTICLES.map((article) => {
    const fullTitle = `${article.title} ${article.italicAccent}`.trim();
    const url = `${siteUrl}/journal/${article.slug}`;
    const pubDate = new Date().toUTCString();

    return `
    <item>
      <title><![CDATA[${fullTitle}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <category>${article.category}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pop Lab Studio — Growth Journal &amp; Teardowns</title>
    <link>${siteUrl}/journal</link>
    <description>Honest notes on paid media, creative engineering, server-side attribution, and performance marketing.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
