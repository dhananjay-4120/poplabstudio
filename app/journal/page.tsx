import React from 'react';
import type { Metadata } from 'next';
import JournalClient from './JournalClient';

export const metadata: Metadata = {
  title: 'The Growth Journal & Teardowns — Pop Lab Studio',
  description:
    'Honest notes on paid media, creative engineering, server-side attribution, and the unglamorous marketing work that shows up in the P&L.',
  openGraph: {
    title: 'The Growth Journal & Teardowns — Pop Lab Studio',
    description:
      'Teardowns, frameworks, and notes from live accounts. No thought-leadership fluff - just what we tell partners on calls.',
    url: 'https://poplabstudio.com/journal',
    siteName: 'Pop Lab Studio',
    type: 'website',
  },
};

export default function JournalPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Pop Lab Studio Growth Journal',
    description: 'Honest notes on paid media, creative engineering, and server-side attribution.',
    url: 'https://poplabstudio.com/journal',
    publisher: {
      '@type': 'Organization',
      name: 'Pop Lab Studio',
      url: 'https://poplabstudio.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalClient />
    </>
  );
}
