'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/pop/Section';

declare global {
  interface Window {
    Cal?: any;
    dataLayer?: any[];
    fbq?: any;
  }
}

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', label: 'India (+91)' },
  { code: '+1', flag: '🇺🇸', label: 'USA / Canada (+1)' },
  { code: '+44', flag: '🇬🇧', label: 'UK (+44)' },
  { code: '+971', flag: '🇦🇪', label: 'UAE (+971)' },
  { code: '+61', flag: '🇦🇺', label: 'Australia (+61)' },
  { code: '+65', flag: '🇸🇬', label: 'Singapore (+65)' },
  { code: '+49', flag: '🇩🇪', label: 'Germany (+49)' },
];

const AD_SPEND_OPTIONS = [
  'Under ₹30,000 / month',
  '₹30,000 – ₹1,50,000 / month',
  '₹1,50,000 – ₹3,00,000 / month',
  '₹3,00,000+ / month',
  'Not running paid ads yet',
];

const ROADBLOCK_OPTIONS = [
  'Leads come in but quality is poor',
  'Clicks are cheap but the page doesn\'t convert',
  'ROAS drops the moment we scale budget',
  'Creative keeps fatiguing / CTR is low',
  'We haven\'t launched paid ads yet',
];

const FAQS = [
  {
    q: 'Do you work with brands outside India?',
    a: 'Yes. Most of our clients are outside our home city. We work remotely with brands across India and abroad, with regular reporting so distance is never a bottleneck.',
  },
  {
    q: 'What is the minimum ad spend you work with?',
    a: 'We work best with brands spending ₹30,000/month or more on ads. Below that, we will advise you honestly on self-serve playbooks before taking an agency retainer.',
  },
  {
    q: 'What happens on the free teardown call?',
    a: 'A 30-minute screen-share where senior partners audit your creative hooks, ad accounts, and conversion funnels to identify where budget is leaking.',
  },
  {
    q: 'How does Pop Lab Studio integrate AI into workflow?',
    a: 'We deploy AI for fast creative research, copy angles, and competitive intelligence. Strategy and budget decisions stay with our people.',
  },
];

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyAP374g5FmRrr6_QYnNKtZiDUi60uWacUb641cS2qgIQbGLIdD92Hy9efbZx4B-maeJg/exec';

export default function ContactClient() {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    brandName: '',
    website: '',
    countryCode: '+91',
    phone: '',
    adSpend: '',
    roadblock: '',
    message: '',
  });

  const calendarContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Cal.com embed
  const loadCalEmbed = (prefill?: { name?: string; notes?: string }) => {
    if (typeof window === 'undefined') return;

    // Load Cal script dynamically if not present
    if (!window.Cal) {
      (function (C: any, A: string, L: string) {
        const p = function (a: any, ar: any) {
          a.q.push(ar);
        };
        const d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            const cal = C.Cal;
            const ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              const script = d.createElement('script');
              script.src = A;
              d.head.appendChild(script);
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api: any = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === 'string') {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ['initNamespace', namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(window, 'https://app.cal.com/embed/embed.js', 'init');
      window.Cal('init', '30min', { origin: 'https://app.cal.com' });
    }

    if (window.Cal && window.Cal.ns && window.Cal.ns['30min']) {
      const config: Record<string, any> = {
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true',
        theme: 'dark',
      };
      if (prefill?.name) config.name = prefill.name;
      if (prefill?.notes) config.notes = prefill.notes;

      if (calendarContainerRef.current) {
        calendarContainerRef.current.innerHTML = '';
      }

      window.Cal.ns['30min']('inline', {
        elementOrSelector: '#my-cal-inline-30min',
        config: config,
        calLink: 'poplab-studio-o0cj4m/30min',
      });

      window.Cal.ns['30min']('ui', {
        theme: 'dark',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#FF5E14' },
          dark: { 'cal-brand': '#FF5E14' },
        },
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
    }
  };

  useEffect(() => {
    // Initial embed load after mount
    const timer = setTimeout(() => {
      loadCalEmbed();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('growth@poplabstudio.com').catch(() => {
          const ta = document.createElement('textarea');
          ta.value = 'growth@poplabstudio.com';
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch {}
          document.body.removeChild(ta);
        });
      }
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedPhone = formData.phone.trim();
    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setError('Please enter a valid WhatsApp or phone number (minimum 7 digits).');
      return;
    }

    setSubmitting(true);

    const fullPhone = `${formData.countryCode} ${trimmedPhone}`;
    const eventId = `lead_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;

    // Extract UTM attribution from session storage or live query params
    let utmData: Record<string, string> = {};
    try {
      if (typeof window !== 'undefined') {
        const stored = sessionStorage.getItem('poplab_utm_data');
        if (stored) utmData = JSON.parse(stored);
        const params = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach((k) => {
          const val = params.get(k);
          if (val) utmData[k] = val;
        });
      }
    } catch {}

    const utmSummary = utmData.utm_source
      ? `\nAttribution: ${utmData.utm_source} / ${utmData.utm_medium || 'direct'} (${utmData.utm_campaign || 'no-campaign'})`
      : '';
    const notes = `Website: ${formData.website}\nPhone/WhatsApp: ${fullPhone}\nMonthly Spend: ${formData.adSpend}\nRoadblock: ${formData.roadblock}\nNotes: ${formData.message}${utmSummary}`;

    const payload = {
      brandName: formData.brandName,
      website: formData.website,
      countryCode: formData.countryCode,
      phone: trimmedPhone,
      adSpend: formData.adSpend,
      roadblock: formData.roadblock,
      message: formData.message,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      eventId,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      utmSource: utmData.utm_source || '',
      utmMedium: utmData.utm_medium || '',
      utmCampaign: utmData.utm_campaign || '',
      utmTerm: utmData.utm_term || '',
      utmContent: utmData.utm_content || '',
      gclid: utmData.gclid || '',
      fbclid: utmData.fbclid || '',
      _hp: honeypot,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = resData?.details?.join(', ') || resData?.error || 'Validation failed. Please review your information.';
        setError(msg);
        setSubmitting(false);
        return;
      }
    } catch (apiErr) {
      console.warn('Contact submission failed:', apiErr);
      setError('We could not send your details. Please check your connection and try again, or message us on WhatsApp at +91 88375 65738.');
      setSubmitting(false);
      return;
    }

    // Browser event tracking (fires only after the lead reached the server; no personal data in the dataLayer)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'leadFormSubmitted',
        eventId,
        adSpend: formData.adSpend,
        utmSource: utmData.utm_source || 'direct',
        utmCampaign: utmData.utm_campaign || '',
      });
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'Connect Form',
        status: 'Intake Completed',
      }, { eventID: eventId });
    }

    setSubmitting(false);
    setSubmitted(true);

    // Prefill Cal.com and scroll
    loadCalEmbed({
      name: formData.brandName,
      notes,
    });

    setTimeout(() => {
      const bookEl = document.getElementById('book');
      if (bookEl) {
        bookEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const inputCls =
    'w-full h-12 rounded-xl border border-cream/20 bg-deep px-4 text-base text-cream placeholder:text-cream/45 focus:border-pop focus:outline-none';
  const labelCls = 'block text-[15px] font-medium text-cream/80 mb-2';
  const linkCls = 'font-semibold text-cream underline underline-offset-[6px] decoration-pop decoration-[1.5px] hover:text-pop';

  return (
    <div className="w-full">
      {/* Intro + form */}
      <section className="w-full pt-32 sm:pt-40 pb-16 sm:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Intro */}
            <div className="lg:col-span-5">
              <p className="mb-5 text-[15px] font-medium text-cream/70">Start a project</p>
              <h1 className="font-display text-[clamp(2.1rem,3.6vw,3.25rem)] leading-[1.02]">
                Tell us about your brand. <em className="accent">We&rsquo;ll come back with a plan.</em>
              </h1>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-cream/75">
                Share a few details and pick a time for a free 30-minute call. We look at your creative, your ad
                accounts and your website, and show you where budget is leaking. You keep the plan either way.
              </p>

              <ul className="mt-8 border-t border-cream/10 text-[17px]">
                <li className="border-b border-cream/10 py-4">
                  <span className="block text-[15px] font-medium text-cream/70 mb-1">WhatsApp</span>
                  <a
                    href="https://wa.me/918837565738"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCls}
                  >
                    Message us on WhatsApp
                  </a>
                </li>
                <li className="border-b border-cream/10 py-4">
                  <span className="block text-[15px] font-medium text-cream/70 mb-1">Phone</span>
                  <a href="tel:+918837565738" className={linkCls}>
                    +91 88375 65738
                  </a>
                </li>
                <li className="border-b border-cream/10 py-4">
                  <span className="block text-[15px] font-medium text-cream/70 mb-1">Email</span>
                  <span className="flex flex-wrap items-center gap-3">
                    <a href="mailto:growth@poplabstudio.com" className={linkCls}>
                      growth@poplabstudio.com
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="h-8 px-3 rounded-full border border-cream/20 text-[14px] font-semibold text-cream hover:bg-cream/10 hover:border-cream/40 transition-colors"
                    >
                      {copied ? 'Copied' : 'Copy email'}
                    </button>
                  </span>
                </li>
                <li className="border-b border-cream/10 py-4">
                  <span className="block text-[15px] font-medium text-cream/70 mb-1">Studio</span>
                  <address className="not-italic leading-relaxed">
                    SCO 364-365-366, Second Floor, Sector 34A
                    <br />
                    Chandigarh 160022, India
                  </address>
                  <p className="text-[15px] mt-1 text-cream/70">Mon–Sat, 9:30am–7:30pm IST</p>
                </li>
                <li className="border-b border-cream/10 py-4">
                  <span className="block text-[15px] font-medium text-cream/70 mb-1">Social</span>
                  <span className="flex flex-wrap gap-x-5 gap-y-1">
                    <a
                      href="https://www.instagram.com/poplabstudio.hq/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkCls}
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.linkedin.com/company/pop-lab-studios/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkCls}
                    >
                      LinkedIn
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            {/* Form card */}
            <div className="lg:col-span-7 rounded-2xl border border-cream/10 bg-deep p-6 sm:p-8">
              <h2 className="font-display text-subsection mb-2">Your details</h2>
              <p className="mb-7 text-[17px] text-cream/70">Takes about a minute. Fields marked with * are required.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="rounded-xl border border-pop/40 bg-pop/10 p-4 text-[15px] text-pop font-semibold"
                  >
                    {error}
                  </div>
                )}

                {/* Anti-spam Honeypot */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="_hp">Leave this field blank</label>
                  <input
                    id="_hp"
                    name="_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="brandName" className={labelCls}>
                    Brand or company name *
                  </label>
                  <input
                    id="brandName"
                    type="text"
                    required
                    placeholder="e.g. Acme Studio"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="website" className={labelCls}>
                      Website or Instagram *
                    </label>
                    <input
                      id="website"
                      type="text"
                      required
                      placeholder="acme.com or @acme"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelCls}>
                      WhatsApp or phone *
                    </label>
                    <div className="flex gap-2">
                      <select
                        aria-label="Country code"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="h-12 w-[6.5rem] shrink-0 rounded-xl border border-cream/20 bg-deep px-2 text-base text-cream focus:border-pop focus:outline-none"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9\s-]/g, '') })}
                        className={`${inputCls} flex-1 min-w-0`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="adSpend" className={labelCls}>
                    Current monthly ad spend *
                  </label>
                  <select
                    id="adSpend"
                    required
                    value={formData.adSpend}
                    onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                    className={inputCls}
                  >
                    <option value="" disabled>
                      Select a monthly spend range
                    </option>
                    {AD_SPEND_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="roadblock" className={labelCls}>
                    Biggest growth bottleneck *
                  </label>
                  <select
                    id="roadblock"
                    required
                    value={formData.roadblock}
                    onChange={(e) => setFormData({ ...formData, roadblock: e.target.value })}
                    className={inputCls}
                  >
                    <option value="" disabled>
                      Select your main challenge
                    </option>
                    {ROADBLOCK_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>
                    Goals or notes (optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Deadlines, current ROAS targets, channels you want to scale..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-cream/20 bg-deep px-4 py-3 text-base text-cream placeholder:text-cream/45 focus:border-pop focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-14 rounded-full bg-pop text-night hover:bg-pop-light transition-colors text-base sm:text-[17px] font-semibold shadow-glow disabled:opacity-60 disabled:pointer-events-none"
                >
                  {submitting
                    ? 'Sending...'
                    : submitted
                      ? 'Sent. Pick a time below'
                      : 'Send and pick a time'}
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking step: Cal.com embed */}
      <section id="book" className="w-full pb-16 sm:pb-24 scroll-mt-28">
        <Container>
          <h2 className="font-display text-section mb-4 scroll-pop">
            {submitted ? 'Thanks — now pick a time' : 'Pick a time that works'}
          </h2>
          <p className="max-w-[62ch] text-lg leading-relaxed text-cream/75 mb-3">
            {submitted
              ? 'We have your details. Choose a 30-minute slot on our calendar and we will see you then.'
              : 'Choose a 30-minute slot on our calendar. Time zones adjust automatically.'}
          </p>
          <p className="mb-8 text-[15px] text-cream/70">
            Prefer a separate tab?{' '}
            <a
              href="https://cal.com/poplab-studio-o0cj4m/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              Open the calendar in Cal.com
            </a>
          </p>
          <div className="w-full h-[720px] rounded-2xl border border-cream/10 bg-deep overflow-hidden p-1">
            <div ref={calendarContainerRef} id="my-cal-inline-30min" className="w-full h-full overflow-y-auto" />
          </div>
        </Container>
      </section>

      {/* What happens next */}
      <section className="w-full pb-16 sm:pb-24">
        <Container>
          <h2 className="font-display text-section mb-10 scroll-pop">What happens next</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: '1',
                t: 'We review your details',
                d: 'Once you submit, we look at your funnel, copy and targeting before we meet.',
              },
              {
                n: '2',
                t: 'The 30-minute call',
                d: 'A screen-shared session where we find the leaks and map creative angles worth testing.',
              },
              {
                n: '3',
                t: 'You get your plan',
                d: 'You leave with a clear plan you can run in-house or build with Pop Lab Studio.',
              },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-cream/10 bg-deep p-7">
                <span className="font-display text-4xl text-pop">{s.n}</span>
                <h3 className="font-display text-xl mt-3 mb-2">{s.t}</h3>
                <p className="text-[17px] leading-relaxed text-cream/75">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section className="w-full pb-20 sm:pb-28">
        <Container>
          <h2 className="font-display text-section mb-8 scroll-pop">Before you book</h2>
          <div className="border-t border-cream/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="border-b border-cream/10">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-lg font-semibold">{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xl font-light leading-none ${isOpen ? 'border-pop text-pop' : 'border-cream/25'}`}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && <p className="pb-6 pr-12 text-[17px] leading-relaxed text-cream/75 max-w-[68ch]">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
