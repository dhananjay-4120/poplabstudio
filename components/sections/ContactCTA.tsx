'use client';

import React from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import { InkSealStamp } from '@/components/ui/VisualSoul';

/**
 * ContactCTA Section: High-converting direct-response closing section for Pop Lab Studio.
 * Anchors urgency, scarcity, and risk reversal with direct founder access.
 */
export default function ContactCTA() {
  const mailtoLink =
    'mailto:growth@poplabstudio.com?subject=Pop%20Lab%20Studio%20%E2%80%94%20Partnership%20Inquiry&body=Hello%20Pop%20Lab%20Team%2C%0A%0AWe%20are%20interested%20in%20partnering%20to%20scale%20our%20brand.%0A%0ACompany%3A%0ACurrent%20Stage%3A%0ATarget%20Objectives%3A%0A%0ABest%2C';

  return (
    <section
      id="contact"
      className="w-full scroll-mt-28 sm:scroll-mt-36 py-28 md:py-36 px-6 relative z-10 max-w-5xl mx-auto text-center border-t border-black/10 dark:border-[#F5F2EB]/10"
    >
      <div className="relative p-10 sm:p-14 md:p-20 rounded-3xl bg-white dark:bg-[#0D1522]/85 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl overflow-hidden">
        {/* Warm Ember Radial Glow Behind Dark Glass (The signature orange hint) */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,94,20,0.24)_0%,rgba(255,94,20,0.06)_50%,transparent_75%)] pointer-events-none blur-3xl" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[260px] bg-[radial-gradient(ellipse,rgba(255,94,20,0.20)_0%,rgba(255,94,20,0.04)_50%,transparent_75%)] pointer-events-none blur-3xl" />

        {/* Ink Seal & Kicker Tag */}
        <div className="flex flex-col items-center justify-center gap-3 mb-6">
          <InkSealStamp text="POP LAB" subtext="PARTNER" size={48} />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF5E14] block font-semibold">
            — Partnership Inquiries
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#121824] dark:text-[#F5F2EB] tracking-tight mb-6 max-w-3xl mx-auto leading-[1.08]">
          Ready to make your brand <br className="hidden sm:inline" />
          <span className="italic text-[#FF5E14] dark:text-[#FF5E14]">impossible to ignore?</span>
        </h2>

        {/* Scarcity & Qualification Subheading */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#121824]/75 dark:text-[#F5F2EB]/75 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          We take on a strictly limited roster of ambitious brands each quarter to guarantee dedicated
          senior partner execution. Zero junior hand-offs.
        </p>

        {/* Primary Magnetic CTA Button */}
        <div className="flex justify-center mb-12">
          <MagneticButton
            href="/contact"
            variant="primary"
            className="shadow-[0_0_35px_rgba(255,94,20,0.4)] px-9 py-4 text-xs font-semibold hover:scale-[1.02] active:scale-[0.98]"
            ariaLabel="Book a 30-minute growth diagnostic with Pop Lab Studio"
          >
            <span>Book Your 30-Min Diagnostic</span>
            <span className="text-sm">→</span>
          </MagneticButton>
        </div>

        {/* Risk Reversals & Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-mono uppercase tracking-[0.18em] text-[#121824]/60 dark:text-[#F5F2EB]/50 border-t border-black/10 dark:border-white/10 pt-8 max-w-xl mx-auto">
          <span>— Senior Partner Screen-Share</span>
          <span className="text-black/20 dark:text-white/20 select-none">•</span>
          <span>48-Hour Response Time</span>
          <span className="text-black/20 dark:text-white/20 select-none">•</span>
          <span>Actionable Leak Map You Keep —</span>
        </div>

        {/* Studio Direct Contact */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-[#121824]/60 dark:text-[#F5F2EB]/50">
          <span>
            Email:{' '}
            <a
              href="mailto:growth@poplabstudio.com"
              className="text-[#121824] dark:text-[#F5F2EB] hover:text-[#FF5E14] dark:hover:text-[#FF5E14] underline underline-offset-4 transition-colors font-medium"
            >
              growth@poplabstudio.com
            </a>
          </span>
          <span className="hidden sm:inline text-black/20 dark:text-white/20">•</span>
          <span>
            Call / WhatsApp:{' '}
            <a
              href="tel:+918837565738"
              className="text-[#121824] dark:text-[#F5F2EB] hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors font-medium"
            >
              +91 88375 65738
            </a>{' '}
            (
            <a
              href="https://wa.me/918837565738"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline"
            >
              WhatsApp ↗
            </a>
            )
          </span>
          <span className="hidden sm:inline text-black/20 dark:text-white/20">•</span>
          <span>
            <a
              href="/contact#book"
              className="text-[#FF5E14] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Book 30-Min Diagnostic</span> ↗
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
