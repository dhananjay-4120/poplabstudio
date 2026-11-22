import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/pop/PageHeader';
import { Container } from '@/components/pop/Section';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy · Pop Lab Studio',
  description:
    'How Pop Lab Studio collects, uses, and safeguards your brand and personal data. Plain language, strict confidentiality.',
  openGraph: {
    images: [{ url: '/opengraph-image.jpg', width: 1024, height: 576, alt: 'Pop Lab Studio' }],
    title: 'Privacy Policy · Pop Lab Studio',
    description: 'How Pop Lab Studio protects your data and privacy.',
    url: 'https://poplabstudio.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        context="Legal · Last updated: June 2026"
        title="Privacy Policy"
        lede={
          <>
            Pop Lab Studio (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy and is
          committed to protecting your information. We write our policies in plain language — the same
          way we explain strategy on a call.
          </>
        }
      />
      <Container className="pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">
          <nav aria-label="Table of contents" className="lg:sticky lg:top-28 rounded-2xl border-2 border-black bg-white p-4 shadow-hard-sm">
            <p className="px-3 pb-2 font-bold">On this page</p>
            <ul className="space-y-1 text-[15px]">
                <li><a href="#info" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Data We Collect</a></li>
                <li><a href="#use" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">How We Use It</a></li>
                <li><a href="#sharing" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Processors &amp; Sharing</a></li>
                <li><a href="#cookies" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Cookies &amp; Tracking</a></li>
                <li><a href="#rights" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Your Legal Rights</a></li>
                <li><a href="#contact" className="block rounded-lg px-3 py-2 font-medium hover:bg-lemon">Studio Contact</a></li>
            </ul>
          </nav>

          <div className="prose-pop text-base sm:text-[17px] leading-relaxed">
<section id="info" className="scroll-mt-28">
            <h2>
              1. Information We Collect
            </h2>
            <p>
              We collect only the necessary data required to evaluate your brand, perform growth teardowns,
              and maintain client operations:
            </p>
            <ul>
              <li>
                <strong>Direct Intake Details:</strong> Brand name, founder/marketing contact name, official email, WhatsApp/phone number, website, social handles, monthly ad spend tier, and growth roadblocks submitted via our intake forms.
              </li>
              <li>
                <strong>Diagnostic Assets:</strong> Ad account data, creatives, funnel analytics, and benchmarks voluntarily shared during audit engagements.
              </li>
              <li>
                <strong>Technical Usage Data:</strong> Anonymized telemetry such as browser type, referring URLs, screen resolution, and session interactions used strictly to optimize site speed and performance.
              </li>
            </ul>
          </section>

<section id="use" className="scroll-mt-28">
            <h2>
              2. How We Use Your Information
            </h2>
            <p>
              Your data is processed strictly for legitimate business purposes:
            </p>
            <ul>
              <li>Synthesizing and presenting your 30-minute growth diagnostic and scaling roadmap.</li>
              <li>Direct founder communications, scheduling confirmation, and project coordination.</li>
              <li>Sending ad teardown playbooks or studio case studies if you have subscribed to our insights.</li>
              <li>Complying with statutory accounting and commercial legal requirements in India.</li>
            </ul>
            <div className="rounded-xl border-2 border-black bg-lemon p-4 font-semibold">
              Zero sale of data: We never sell, rent, monetize, or broker your personal or brand information to third parties. Ever.
            </div>
          </section>

<section id="sharing" className="scroll-mt-28">
            <h2>
              3. Data Processors &amp; Security
            </h2>
            <p>
              To deliver seamless services, we integrate with enterprise-grade infrastructure providers
              who operate under strict data protection agreements:
            </p>
            <ul>
              <li><strong>Scheduling:</strong> Cal.com (encrypted calendar sync and appointment orchestration).</li>
              <li><strong>Hosting &amp; CDN:</strong> Vercel &amp; Cloudflare (encrypted HTTPS transmission, edge delivery).</li>
              <li><strong>Data Storage:</strong> Google Workspace &amp; Google Cloud (secure document workflows).</li>
            </ul>
          </section>

<section id="cookies" className="scroll-mt-28">
            <h2>
              4. Cookies &amp; Attribution
            </h2>
            <p>
              We deploy standard first-party session cookies and privacy-first analytics to measure aggregate
              traffic and verify our own campaign attribution (Meta Pixel / Google Tag Manager). You can disable cookies
              at any time in your browser preferences without degrading core site navigation.
            </p>
          </section>

<section id="rights" className="scroll-mt-28">
            <h2>
              5. Your Rights (DPDP, GDPR &amp; CCPA)
            </h2>
            <p>
              Regardless of your geographical jurisdiction, Pop Lab Studio affords you comprehensive rights:
            </p>
            <ul>
              <li><strong>Right to Access:</strong> Request a complete record of data associated with your brand.</li>
              <li><strong>Right to Erasure (&ldquo;Forget Me&rdquo;):</strong> Request immediate deletion of your contact records from our databases.</li>
              <li><strong>Right to Rectification:</strong> Update inaccurate business metrics or contact details.</li>
              <li><strong>Right to Withdraw Consent:</strong> Opt out of future communications with one click.</li>
            </ul>
          </section>

<section id="contact" className="scroll-mt-28">
            <h2>
              6. Studio Privacy Contact
            </h2>
            <p>
              To exercise any of your privacy rights or submit questions regarding data handling, reach our compliance team directly:
            </p>
            <div className="rounded-2xl border-2 border-black bg-fog p-6 shadow-hard-sm space-y-1">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:growth@poplabstudio.com">
                  growth@poplabstudio.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong> +91 88375 65738
              </p>
              <p>
                <strong>Address:</strong> Refer to our <Link href="/contact">Contact Page</Link> and official studio footer for registered corporate office coordinates.
              </p>
            </div>
          </section>

            <div className="mt-12 pt-8 border-t-2 border-black flex flex-wrap items-center justify-between gap-4 font-semibold">
              <Link href="/">Return to Studio Home</Link>
              <Link href="/contact">Start a Project</Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
