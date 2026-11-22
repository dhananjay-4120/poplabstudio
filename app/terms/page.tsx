import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/pop/PageHeader';
import { Container } from '@/components/pop/Section';

export const metadata: Metadata = {
  alternates: { canonical: '/terms' },
  title: 'Terms of Service · Pop Lab Studio',
  description:
    'Master Terms of Service governing strategic consulting, creative production, cultural PR, and performance media management engagements with Pop Lab Studio.',
  openGraph: {
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Pop Lab Studio' }],
    title: 'Terms of Service · Pop Lab Studio',
    description: 'Terms governing client engagements and services with Pop Lab Studio.',
    url: 'https://poplabstudio.com/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        context="Legal · Last revised: June 2026"
        title="Terms of Service"
        lede={
          <>
            These Terms of Service govern all strategic consulting, brand identity development, creative film production,
          cultural PR, and performance media management agreements between Pop Lab Studio and its clients.
          </>
        }
      />
      <Container className="pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">
          <nav aria-label="Table of contents" className="lg:sticky lg:top-28 rounded-2xl border-2 border-black bg-white p-4 shadow-hard-sm">
            <p className="px-3 pb-2 font-bold">On this page</p>
            <ul className="space-y-1 text-[15px]">
                <li><a href="#scope" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Scope &amp; SOWs</a></li>
                <li><a href="#ip" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Intellectual Property</a></li>
                <li><a href="#fees" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Retainers &amp; Ad Spend</a></li>
                <li><a href="#confidentiality" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Confidentiality</a></li>
                <li><a href="#warranties" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Performance Warranties</a></li>
                <li><a href="#jurisdiction" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Governing Law</a></li>
            </ul>
          </nav>

          <div className="prose-pop text-base sm:text-[17px] leading-relaxed">
<section id="scope" className="scroll-mt-28">
            <h2>
              1. Scope of Engagement &amp; Statements of Work
            </h2>
            <p>
              Pop Lab Studio executes client deliverables pursuant to individual Statements of Work (&ldquo;SOW&rdquo;)
              or Retainer Agreements. Each SOW outlines specific channel management, content deliverables, campaign milestones,
              and reporting cadences.
            </p>
          </section>

<section id="ip" className="scroll-mt-28">
            <h2>
              2. Intellectual Property Rights
            </h2>
            <p>
              Upon full settlement of professional fees:
            </p>
            <ul>
              <li>
                <strong>Client Ownership:</strong> Final approved brand identities, campaign films, packaging artwork, and ad collateral belong exclusively to the client.
              </li>
              <li>
                <strong>Studio Methodologies:</strong> Proprietary models, media allocation formulas, code libraries, and internal frameworks remain the intellectual property of Pop Lab Studio.
              </li>
              <li>
                <strong>Portfolio Rights:</strong> Pop Lab Studio reserves the standard commercial right to showcase non-confidential work in its case studies and portfolio.
              </li>
            </ul>
          </section>

<section id="fees" className="scroll-mt-28">
            <h2>
              3. Retainers, Invoicing &amp; Media Spend
            </h2>
            <p>
              Professional retainers are billed monthly in advance. Ad media spend (Meta, Google, Blinkit, TikTok) is
              billed directly by the ad platforms to the client&apos;s registered payment method. Pop Lab Studio does not
              commingle media spend capital with agency operational accounts.
            </p>
          </section>

<section id="confidentiality" className="scroll-mt-28">
            <h2>
              4. Confidentiality &amp; Data Security
            </h2>
            <p>
              Both parties agree to treat all business plans, financial projections, customer rosters, and pre-release
              campaign materials as strictly confidential. Confidentiality obligations endure indefinitely beyond the
              conclusion of any engagement.
            </p>
          </section>

<section id="warranties" className="scroll-mt-28">
            <h2>
              5. Performance &amp; Commercial Realism
            </h2>
            <p>
              Pop Lab Studio exercises elite craftsmanship and industry-tested methodologies. However, market demand,
              platform algorithm fluctuations, and macroeconomic shifts are outside agency control; we do not guarantee
              speculative commercial returns or vanity follower counts.
            </p>
          </section>

<section id="jurisdiction" className="scroll-mt-28">
            <h2>
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising
              under this agreement shall be subject to the exclusive jurisdiction of the competent courts of the registered jurisdiction in India.
            </p>
            <div className="rounded-2xl border-2 border-black bg-fog p-6 shadow-hard-sm space-y-1">
              <p className="font-semibold">Registered office</p>
              <p>Pop Lab Studio</p>
              <p>Refer to official Studio Footer &amp; <Link href="/contact">Contact Page</Link> for physical address.</p>
              <p>Email: growth@poplabstudio.com</p>
            </div>
          </section>

            <div className="mt-12 pt-8 border-t-2 border-black flex flex-wrap items-center justify-between gap-4 font-semibold">
              <Link href="/">Return to Studio Home</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
