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
    '@type': 'ProfessionalService',
    name: 'Pop Lab Studio',
    url: 'https://poplabstudio.com',
    description:
      'Pop Lab Studio is a high-craft creative growth studio. We make brands impossible to ignore through integrated brand strategy, cultural attention, and conversion engineering.',
    email: 'growth@poplabstudio.com',
    telephone: '+918837565738',
    sameAs: [
      'https://www.instagram.com/poplabstudio.hq/',
      'https://www.linkedin.com/company/pop-lab-studios/',
      'https://wa.me/918837565738',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pop Lab Capabilities',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Engine',
            description:
              'Brand strategy, positioning archetypes, visual design systems, and high-converting creative assets.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Attention Engine',
            description:
              'High-velocity cultural PR, creator whitelisting, and Answer Engine Optimization (GEO/AEO).',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Growth Engine',
            description:
              'Full-funnel paid media (Meta and Google), quick commerce acceleration (Blinkit / Zepto), and frictionless checkout CRO.',
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
