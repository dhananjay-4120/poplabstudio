import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy · Pop Lab Studio',
  description:
    'How Pop Lab Studio collects, uses, and safeguards your brand and personal data. Plain language, strict confidentiality.',
  openGraph: {
    title: 'Privacy Policy · Pop Lab Studio',
    description: 'How Pop Lab Studio protects your data and privacy.',
    url: 'https://poplabstudio.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="w-full relative z-10 pt-28 sm:pt-36 pb-24 px-5 sm:px-10 md:px-16 max-w-6xl mx-auto">
      {/* Folio Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-black/10 dark:border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
          LEGAL &amp; COMPLIANCE
        </span>
        <span>LAST UPDATED: JUNE 2026</span>
      </div>

      {/* Main Hero */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121824] dark:text-[#F5F2EB] tracking-tight leading-[1.05] mb-6">
          Privacy Policy
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#121824]/75 dark:text-[#F5F2EB]/75 font-light leading-relaxed">
          Pop Lab Studio (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy and is
          committed to protecting your information. We write our policies in plain language — the same
          way we explain strategy on a call.
        </p>
      </div>

      {/* Grid: Sticky Navigation on Desktop + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Desktop Sticky Index (3 cols) */}
        <nav className="hidden lg:block lg:col-span-3 sticky top-28 p-6 rounded-2xl bg-white dark:bg-[#0D1522]/70 border border-black/10 dark:border-white/10 text-xs font-mono uppercase tracking-wider space-y-3">
          <span className="text-[#FF5E14] block font-semibold pb-2 border-b border-black/5 dark:border-white/5">
            // INDEX
          </span>
          <a
            href="#info"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            01. Data We Collect
          </a>
          <a
            href="#use"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            02. How We Use It
          </a>
          <a
            href="#sharing"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            03. Processors &amp; Sharing
          </a>
          <a
            href="#cookies"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            04. Cookies &amp; Tracking
          </a>
          <a
            href="#rights"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            05. Your Legal Rights
          </a>
          <a
            href="#contact"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            06. Studio Contact
          </a>
        </nav>

        {/* Legal Body (9 cols) */}
        <div className="lg:col-span-9 space-y-12 text-[#121824]/85 dark:text-[#F5F2EB]/80 font-sans text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section id="info" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              1. Information We Collect
            </h2>
            <p className="mb-4 font-light">
              We collect only the necessary data required to evaluate your brand, perform growth teardowns,
              and maintain client operations:
            </p>
            <ul className="space-y-2.5 list-disc list-inside pl-2 mb-4 font-light text-[#121824]/75 dark:text-[#F5F2EB]/75">
              <li>
                <strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Direct Intake Details:</strong> Brand name, founder/marketing contact name, official email, WhatsApp/phone number, website, social handles, monthly ad spend tier, and growth roadblocks submitted via our intake forms.
              </li>
              <li>
                <strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Diagnostic Assets:</strong> Ad account data, creatives, funnel analytics, and benchmarks voluntarily shared during audit engagements.
              </li>
              <li>
                <strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Technical Usage Data:</strong> Anonymized telemetry such as browser type, referring URLs, screen resolution, and session interactions used strictly to optimize site speed and performance.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section id="use" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              2. How We Use Your Information
            </h2>
            <p className="mb-4 font-light">
              Your data is processed strictly for legitimate business purposes:
            </p>
            <ul className="space-y-2.5 list-disc list-inside pl-2 mb-4 font-light text-[#121824]/75 dark:text-[#F5F2EB]/75">
              <li>Synthesizing and presenting your 30-minute growth diagnostic and scaling roadmap.</li>
              <li>Direct founder communications, scheduling confirmation, and project coordination.</li>
              <li>Sending ad teardown playbooks or studio case studies if you have subscribed to our insights.</li>
              <li>Complying with statutory accounting and commercial legal requirements in India.</li>
            </ul>
            <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 font-mono text-xs text-[#FF5E14]">
              ● ZERO SALE OF DATA: We never sell, rent, monetize, or broker your personal or brand information to third parties. Ever.
            </div>
          </section>

          {/* Section 3 */}
          <section id="sharing" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              3. Data Processors &amp; Security
            </h2>
            <p className="mb-4 font-light">
              To deliver seamless services, we integrate with enterprise-grade infrastructure providers
              who operate under strict data protection agreements:
            </p>
            <ul className="space-y-2 list-disc list-inside pl-2 font-light text-[#121824]/75 dark:text-[#F5F2EB]/75">
              <li><strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Scheduling:</strong> Cal.com (encrypted calendar sync and appointment orchestration).</li>
              <li><strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Hosting &amp; CDN:</strong> Vercel &amp; Cloudflare (encrypted HTTPS transmission, edge delivery).</li>
              <li><strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Data Storage:</strong> Google Workspace &amp; Google Cloud (secure document workflows).</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="cookies" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              4. Cookies &amp; Attribution
            </h2>
            <p className="font-light leading-relaxed">
              We deploy standard first-party session cookies and privacy-first analytics to measure aggregate
              traffic and verify our own campaign attribution (Meta Pixel / Google Tag Manager). You can disable cookies
              at any time in your browser preferences without degrading core site navigation.
            </p>
          </section>

          {/* Section 5 */}
          <section id="rights" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              5. Your Rights (DPDP, GDPR &amp; CCPA)
            </h2>
            <p className="mb-4 font-light leading-relaxed">
              Regardless of your geographical jurisdiction, Pop Lab Studio affords you comprehensive rights:
            </p>
            <ul className="space-y-2.5 list-disc list-inside pl-2 font-light text-[#121824]/75 dark:text-[#F5F2EB]/75">
              <li><strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Right to Access:</strong> Request a complete record of data associated with your brand.</li>
              <li><strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Right to Erasure (&ldquo;Forget Me&rdquo;):</strong> Request immediate deletion of your contact records from our databases.</li>
              <li><strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Right to Rectification:</strong> Update inaccurate business metrics or contact details.</li>
              <li><strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Right to Withdraw Consent:</strong> Opt out of future communications with one click.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              6. Studio Privacy Contact
            </h2>
            <p className="mb-4 font-light">
              To exercise any of your privacy rights or submit questions regarding data handling, reach our compliance team directly:
            </p>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 font-mono text-xs space-y-2 text-[#121824]/80 dark:text-[#F5F2EB]/80">
              <p>
                <strong className="text-[#FF5E14]">EMAIL:</strong>{' '}
                <a href="mailto:growth@poplabstudio.com" className="hover:underline">
                  growth@poplabstudio.com
                </a>
              </p>
              <p>
                <strong className="text-[#FF5E14]">PHONE:</strong> +91 88375 65738
              </p>
              <p>
                <strong className="text-[#FF5E14]">PHYSICAL ADDRESS:</strong> Refer to our <Link href="/contact" className="text-[#FF5E14] hover:underline">Contact Page</Link> and official studio footer for registered corporate office coordinates.
              </p>
            </div>
          </section>

          {/* Return link */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#FF5E14] hover:underline"
            >
              ← Return to Studio Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#121824] dark:text-[#F5F2EB] hover:text-[#FF5E14] transition-colors"
            >
              Start a Project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
