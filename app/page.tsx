import React from 'react';
import BespokeHero from '@/components/sections/BespokeHero';
import MarqueeTape from '@/components/sections/MarqueeTape';
import Manifesto from '@/components/sections/Manifesto';
import EngineArchitecture from '@/components/sections/EngineArchitecture';
import NarrativeServices from '@/components/sections/NarrativeServices';
import Philosophy from '@/components/sections/Philosophy';
import ContactCTA from '@/components/sections/ContactCTA';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'MarketingAgency', 'LocalBusiness'],
    name: 'Pop Lab Studio',
    url: 'https://poplabstudio.com',
    logo: 'https://poplabstudio.com/logo-studio-dark.png',
    image: 'https://poplabstudio.com/hero-sunrise-poster.webp',
    description:
      'Pop Lab Studio is an elite creative growth and performance marketing studio serving ambitious founders and D2C brands across Chandigarh, Delhi NCR, North India, and globally.',
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
              'Full-funnel Meta and Google Ads management, Conversions API (CAPI) architecture, and horizontal ROAS scaling.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Answer Engine Optimization (AEO/GEO) & SEO',
            description:
              'Qiaomu technical SEO, structured schema data, llms.txt integration, and citation engineering for ChatGPT Search, Perplexity, and Google AI Overviews.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Luxury Web Engineering & CRO',
            description:
              'High-speed Next.js 15 web development, Framer Motion interactions, frictionless mobile conversion funnels, and 99+ PageSpeed performance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Strategy & Creative Production',
            description:
              'Positioning archetypes, 3x3 high-converting creative testing frameworks, and cultural PR storytelling.',
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
        className="relative flex flex-col items-center overflow-x-hidden w-full selection:bg-[#FF5E14] selection:text-white"
      >
        {/* Section 01: Hero Section (#hero) */}
        <BespokeHero />

        {/* Section 02: Kinetic Marquee Tape */}
        <MarqueeTape />

        {/* Section 03: Narrative Services Arc (#services) */}
        <NarrativeServices />

        {/* Section 04: Visual Anti-Silo Manifesto (#manifesto) */}
        <Manifesto />

        {/* Section 05: The 3 Connected Engines (#engines & #capabilities) */}
        <div id="engines" className="w-full">
          <EngineArchitecture />
        </div>

        {/* Section 06: Studio Standards & Philosophy (#philosophy) */}
        <Philosophy />

        {/* Section 07: Direct-Response Partnership CTA (#contact) */}
        <ContactCTA />
      </div>
    </>
  );
}
