import React from 'react';
import DreamyVideoHero from '@/components/sections/DreamyVideoHero';
import MarqueeTape from '@/components/sections/MarqueeTape';
import DreamyEngineShowcase from '@/components/sections/DreamyEngineShowcase';
import Manifesto from '@/components/sections/Manifesto';
import ContactCTA from '@/components/sections/ContactCTA';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'MarketingAgency', 'LocalBusiness'],
    name: 'Pop Lab Studio',
    url: 'https://poplabstudio.com',
    logo: 'https://poplabstudio.com/logo-white.png',
    image: 'https://poplabstudio.com/hero-sunrise-poster.webp',
    description:
      'Pop Lab Studio is an elite creative growth studio fusing brand architecture, cultural PR, and performance media for ambitious founders and brands.',
    email: 'growth@poplabstudio.com',
    telephone: '+918837565738',
    priceRange: '₹₹₹',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:30-19:30',
    sameAs: [
      'https://www.instagram.com/poplabstudio.hq/',
      'https://www.linkedin.com/company/pop-lab-studios/',
      'https://wa.me/918837565738',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCO 364, Second Floor, Sector 34A',
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
      { '@type': 'AdministrativeArea', name: 'Worldwide' },
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

  return (
    <>
      {/* Structured Schema.org JSON-LD for AI Search & SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        id="top"
        className="relative flex flex-col items-center overflow-x-hidden w-full selection:bg-[#FF5E14] selection:text-white bg-[#050505]"
      >
        {/* Section 01: Ambient Dreamy Video Hero (#hero) */}
        <DreamyVideoHero />

        {/* Section 02: Kinetic Capabilities Marquee */}
        <MarqueeTape />

        {/* Section 03: The 3 Connected Engines Interactive Glass Stage (#engines) */}
        <DreamyEngineShowcase />

        {/* Section 04: Visual Anti-Silo Contrast Manifesto (#manifesto) */}
        <Manifesto />

        {/* Section 05: Direct Partnership Concierge CTA (#contact) */}
        <ContactCTA />
      </div>
    </>
  );
}
