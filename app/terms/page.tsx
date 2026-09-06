import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service · Pop Lab Studio',
  description:
    'Master Terms of Service governing strategic consulting, creative production, cultural PR, and performance media management engagements with Pop Lab Studio.',
  openGraph: {
    title: 'Terms of Service · Pop Lab Studio',
    description: 'Terms governing client engagements and services with Pop Lab Studio.',
    url: 'https://poplabstudio.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="w-full relative z-10 pt-28 sm:pt-36 pb-24 px-5 sm:px-10 md:px-16 max-w-6xl mx-auto">
      {/* Folio Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-black/10 dark:border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
          LEGAL &amp; COMMERCIAL TERMS
        </span>
        <span>LAST REVISED: JUNE 2026</span>
      </div>

      {/* Main Hero */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121824] dark:text-[#F5F2EB] tracking-tight leading-[1.05] mb-6">
          Terms of Service
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#121824]/75 dark:text-[#F5F2EB]/75 font-light leading-relaxed">
          These Terms of Service govern all strategic consulting, brand identity development, creative film production,
          cultural PR, and performance media management agreements between Pop Lab Studio and its clients.
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
            href="#scope"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            01. Scope &amp; SOWs
          </a>
          <a
            href="#ip"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            02. Intellectual Property
          </a>
          <a
            href="#fees"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            03. Retainers &amp; Ad Spend
          </a>
          <a
            href="#confidentiality"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            04. Confidentiality
          </a>
          <a
            href="#warranties"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            05. Performance Warranties
          </a>
          <a
            href="#jurisdiction"
            className="block text-[#121824]/70 dark:text-[#F5F2EB]/70 hover:text-[#FF5E14] dark:hover:text-[#FF5E14] transition-colors"
          >
            06. Governing Law
          </a>
        </nav>

        {/* Legal Body (9 cols) */}
        <div className="lg:col-span-9 space-y-12 text-[#121824]/85 dark:text-[#F5F2EB]/80 font-sans text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section id="scope" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              1. Scope of Engagement &amp; Statements of Work
            </h2>
            <p className="mb-4 font-light">
              Pop Lab Studio executes client deliverables pursuant to individual Statements of Work (&ldquo;SOW&rdquo;)
              or Retainer Agreements. Each SOW outlines specific channel management, content deliverables, campaign milestones,
              and reporting cadences.
            </p>
          </section>

          {/* Section 2 */}
          <section id="ip" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              2. Intellectual Property Rights
            </h2>
            <p className="mb-4 font-light">
              Upon full settlement of professional fees:
            </p>
            <ul className="space-y-2.5 list-disc list-inside pl-2 mb-4 font-light text-[#121824]/75 dark:text-[#F5F2EB]/75">
              <li>
                <strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Client Ownership:</strong> Final approved brand identities, campaign films, packaging artwork, and ad collateral belong exclusively to the client.
              </li>
              <li>
                <strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Studio Methodologies:</strong> Proprietary models, media allocation formulas, code libraries, and internal frameworks remain the intellectual property of Pop Lab Studio.
              </li>
              <li>
                <strong className="text-[#121824] dark:text-[#F5F2EB] font-medium">Portfolio Rights:</strong> Pop Lab Studio reserves the standard commercial right to showcase non-confidential work in its case studies and portfolio.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="fees" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              3. Retainers, Invoicing &amp; Media Spend
            </h2>
            <p className="mb-4 font-light">
              Professional retainers are billed monthly in advance. Ad media spend (Meta, Google, Blinkit, TikTok) is
              billed directly by the ad platforms to the client&apos;s registered payment method. Pop Lab Studio does not
              commingle media spend capital with agency operational accounts.
            </p>
          </section>

          {/* Section 4 */}
          <section id="confidentiality" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              4. Confidentiality &amp; Data Security
            </h2>
            <p className="font-light leading-relaxed">
              Both parties agree to treat all business plans, financial projections, customer rosters, and pre-release
              campaign materials as strictly confidential. Confidentiality obligations endure indefinitely beyond the
              conclusion of any engagement.
            </p>
          </section>

          {/* Section 5 */}
          <section id="warranties" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              5. Performance &amp; Commercial Realism
            </h2>
            <p className="font-light leading-relaxed">
              Pop Lab Studio exercises elite craftsmanship and industry-tested methodologies. However, market demand,
              platform algorithm fluctuations, and macroeconomic shifts are outside agency control; we do not guarantee
              speculative commercial returns or vanity follower counts.
            </p>
          </section>

          {/* Section 6 */}
          <section id="jurisdiction" className="scroll-mt-28">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-[#F5F2EB] mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p className="mb-4 font-light">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising
              under this agreement shall be subject to the exclusive jurisdiction of the competent courts of the registered jurisdiction in India.
            </p>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D1522] border border-black/10 dark:border-white/10 font-mono text-xs space-y-1 text-[#121824]/80 dark:text-[#F5F2EB]/80">
              <p className="text-[#FF5E14] font-semibold">// REGISTERED OFFICE</p>
              <p>Pop Lab Studio</p>
              <p>Refer to official Studio Footer &amp; <Link href="/contact" className="text-[#FF5E14] hover:underline">Contact Page</Link> for physical address.</p>
              <p>Email: growth@poplabstudio.com</p>
            </div>
          </section>

          {/* Return links */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#FF5E14] hover:underline"
            >
              ← Return to Studio Home
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#121824] dark:text-[#F5F2EB] hover:text-[#FF5E14] transition-colors"
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
