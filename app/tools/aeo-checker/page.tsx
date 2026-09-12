import type { Metadata } from 'next';
import AeoCheckerClient from './AeoCheckerClient';

export const metadata: Metadata = {
  title: 'Free AEO & GEO Website Diagnostic Scanner — Pop Lab Studio',
  description:
    'Free AI Search and Answer Engine Optimization (AEO/GEO) checker. Discover if ChatGPT Search, Perplexity, and Google AI Overviews cite your brand or your competitors.',
  openGraph: {
    title: 'Free AEO & GEO Website Diagnostic Scanner — Pop Lab Studio',
    description:
      'Analyze your website for AI Search visibility, schema graph completeness, and LLM crawler access in 5 seconds.',
    url: 'https://poplabstudio.com/tools/aeo-checker',
    siteName: 'Pop Lab Studio',
    type: 'website',
  },
};

export default function AeoCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Pop Lab Studio AEO & GEO Checker',
    url: 'https://poplabstudio.com/tools/aeo-checker',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description:
      'Free Answer Engine Optimization and Generative Engine Optimization diagnostic tool evaluating AI crawler permissions, schema markup, and machine-readable knowledge architecture.',
    creator: {
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
      <AeoCheckerClient />
    </>
  );
}
