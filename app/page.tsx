import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import SelectedWork from '@/components/home/SelectedWork';
import OneTeam from '@/components/home/OneTeam';
import ProcessStrip from '@/components/home/ProcessStrip';
import Faq, { FAQS } from '@/components/home/Faq';
import FinalCta from '@/components/home/FinalCta';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'MarketingAgency', 'LocalBusiness'],
    name: 'Pop Lab Studio',
    url: 'https://poplabstudio.com',
    logo: 'https://poplabstudio.com/logo-dark.png',
    image: 'https://poplabstudio.com/opengraph-image.jpg',
    description:
      'Pop Lab Studio is a creative growth studio. One team for brand, content, Meta and Google ads, marketplace growth and AI search visibility.',
    email: 'growth@poplabstudio.com',
    telephone: '+918837565738',
    priceRange: '₹₹₹',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:30-19:30',
    sameAs: [
      'https://www.instagram.com/poplabstudio.hq/',
      'https://www.linkedin.com/company/pop-lab-studios/',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCO 364-365-366, Second Floor, Sector 34A',
      addressLocality: 'Chandigarh',
      addressRegion: 'CH',
      postalCode: '160022',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.7226,
      longitude: 76.7684,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Chandigarh' },
      { '@type': 'AdministrativeArea', name: 'Mohali' },
      { '@type': 'AdministrativeArea', name: 'Panchkula' },
      { '@type': 'AdministrativeArea', name: 'Punjab' },
      { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pop Lab Studio Capabilities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Performance Media & Meta Ads',
            description:
              'Full-funnel Meta and Google Ads management, Conversions API architecture, and horizontal scale.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Answer Engine Optimization (AEO/GEO) & Cultural PR',
            description:
              'Tier-1 press features, creator whitelisting, and LLM answer engine citations (GEO/AEO).',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Architecture & Cinematic Film',
            description:
              'Provocative positioning, tactile identity systems, and cinematic film assets.',
          },
        },
      ],
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div id="top" className="flex flex-col gap-0 sm:gap-6 w-full">
        <Hero />
        <Services />
        <OneTeam />
        <SelectedWork />
        <ProcessStrip />
        <Faq />
        <FinalCta />
      </div>
    </>
  );
}
