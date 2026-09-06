import type { Metadata } from 'next';
import WorkClient from './WorkClient';

export const metadata: Metadata = {
  title: 'Selected Work & Performance Case Studies — Pop Lab Studio',
  description:
    'Real growth and paid-media performance across luxury jewellery, D2C e-commerce, travel, B2B software, and wellness. Verifiable numbers straight from the ad managers.',
  openGraph: {
    title: 'Selected Work & Performance Case Studies — Pop Lab Studio',
    description:
      'Real growth and paid-media performance across luxury, D2C, travel, B2B, and wellness. Names withheld under confidentiality; numbers as run.',
    url: 'https://poplabstudio.com/work',
    siteName: 'Pop Lab Studio',
    type: 'website',
  },
};

export default function WorkPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected Work & Case Studies — Pop Lab Studio',
    description: 'Selected paid-media and growth marketing case studies across luxury, D2C, travel, B2B and wellness.',
    url: 'https://poplabstudio.com/work',
    provider: {
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
      <WorkClient />
    </>
  );
}
