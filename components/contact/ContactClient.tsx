'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  InkSealStamp,
  HandDrawnArrow,
  HandDrawnHighlight,
} from '@/components/ui/VisualSoul';

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
    a: 'Yes. We are based in Chandigarh and run remotely with high-growth brands across regions, using asynchronous reporting so distance is never a bottleneck.',
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
    a: 'We deploy AI for high-velocity creative research, copy angles, and competitive intelligence. Strategic thesis and capital deployment decisions remain 100% human operator judgment.',
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
    const notes = `Website: ${formData.website}\nPhone/WhatsApp: ${fullPhone}\nMonthly Spend: ${formData.adSpend}\nRoadblock: ${formData.roadblock}\nNotes: ${formData.message}`;
    const eventId = `lead_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;

    // Browser event tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'leadFormSubmitted',
        eventId,
        name: formData.brandName,
        phone: fullPhone,
      });
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'Connect Form',
        status: 'Intake Completed',
      }, { eventID: eventId });
    }

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
      console.warn('Local API contact submission warning:', apiErr);
    }

    try {
      if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      console.warn('Form lead push notice:', err);
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

  return (
    <div className="w-full relative z-10 pt-28 sm:pt-36 pb-20 px-5 sm:px-10 md:px-16 max-w-6xl mx-auto">
      {/* Top Folio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-black/10 dark:border-white/10 font-mono text-xs uppercase tracking-[0.2em] text-[#121824]/60 dark:text-[#F5F2EB]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
          START A PROJECT
        </span>
        <span>CHANDIGARH · GLOBAL CLIENTS</span>
      </div>

      {/* Main Editorial Hero */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <InkSealStamp text="POP LAB" subtext="INTAKE" size={48} />
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5E14]">
            SENIOR PARTNER DIAGNOSTIC
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121824] dark:text-[#F5F2EB] tracking-tight leading-[1.05] mb-6">
          Let&apos;s map your <br />
          <HandDrawnHighlight strokeColor="#FF5E14"><em>growth roadmap.</em></HandDrawnHighlight>
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#121824]/75 dark:text-[#F5F2EB]/75 font-light leading-relaxed">
          Book a 30-minute diagnostic of your brand creative, ad accounts, and conversion architecture.
          We provide a custom roadmap identifying where budget leaks and where leverage lives.
        </p>

      </div>

      {/* Grid: Left Intake Form + Right Studio Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
        {/* Left Form Card (7 cols) */}
        <div className="lg:col-span-7 p-7 sm:p-10 rounded-3xl bg-white dark:bg-[#0D1522]/90 border border-black/10 dark:border-white/10 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10 dark:border-white/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5E14] font-semibold">
              STEP 1 // INTAKE DIAGNOSTIC
            </span>
            <span className="font-mono text-xs text-[#121824]/50 dark:text-[#F5F2EB]/40">
              EST. 60 SECONDS
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Notification Banner */}
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2"
              >
                <span className="text-sm font-bold">⚠</span>
                <span>{error}</span>
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

            {/* Brand Name */}
            <div>
              <label
                htmlFor="brandName"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#121824]/80 dark:text-[#F5F2EB]/70 mb-2"
              >
                Brand / Company Name <span className="text-[#FF5E14]">*</span>
              </label>
              <input
                id="brandName"
                type="text"
                required
                placeholder="e.g. Acme Studio"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/15 dark:border-white/15 text-[#121824] dark:text-[#F5F2EB] placeholder:text-stone-500 dark:placeholder:text-stone-400 text-sm focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] transition-all"
              />
            </div>

            {/* Website & Phone in 2 cols on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#121824]/80 dark:text-[#F5F2EB]/70 mb-2"
                >
                  Website / Instagram <span className="text-[#FF5E14]">*</span>
                </label>
                <input
                  id="website"
                  type="text"
                  required
                  placeholder="acme.com or @acme"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/15 dark:border-white/15 text-[#121824] dark:text-[#F5F2EB] placeholder:text-stone-500 dark:placeholder:text-stone-400 text-sm focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] transition-all"
                />
              </div>

              {/* Phone with Country Code */}
              <div>
                <label
                  htmlFor="phone"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#121824]/80 dark:text-[#F5F2EB]/70 mb-2"
                >
                  WhatsApp / Phone <span className="text-[#FF5E14]">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="w-24 px-2 py-3 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/15 dark:border-white/15 text-[#121824] dark:text-[#F5F2EB] text-xs focus:outline-none focus:border-[#FF5E14]"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-white dark:bg-[#0D1522] text-[#121824] dark:text-[#F5F2EB]">
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
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/15 dark:border-white/15 text-[#121824] dark:text-[#F5F2EB] placeholder:text-stone-500 dark:placeholder:text-stone-400 text-sm focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Monthly Ad Spend */}
            <div>
              <label
                htmlFor="adSpend"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#121824]/80 dark:text-[#F5F2EB]/70 mb-2"
              >
                Current Monthly Ad Spend <span className="text-[#FF5E14]">*</span>
              </label>
              <select
                id="adSpend"
                required
                value={formData.adSpend}
                onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/15 dark:border-white/15 text-[#121824] dark:text-[#F5F2EB] text-sm focus:outline-none focus:border-[#FF5E14] transition-all"
              >
                <option value="" disabled className="bg-white dark:bg-[#0D1522] text-stone-500 dark:text-stone-400">
                  Select a monthly spend range
                </option>
                {AD_SPEND_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-white dark:bg-[#0D1522] text-[#121824] dark:text-[#F5F2EB]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Biggest Roadblock */}
            <div>
              <label
                htmlFor="roadblock"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#121824]/80 dark:text-[#F5F2EB]/70 mb-2"
              >
                Biggest Growth Bottleneck <span className="text-[#FF5E14]">*</span>
              </label>
              <select
                id="roadblock"
                required
                value={formData.roadblock}
                onChange={(e) => setFormData({ ...formData, roadblock: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-[#121A2A] border border-black/15 dark:border-white/15 text-[#121824] dark:text-[#F5F2EB] text-sm focus:outline-none focus:border-[#FF5E14] transition-all"
              >
                <option value="" disabled className="bg-white dark:bg-[#0D1522] text-stone-500 dark:text-stone-400">
                  Select primary challenge
                </option>
                {ROADBLOCK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-white dark:bg-[#0D1522] text-[#121824] dark:text-[#F5F2EB]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message / Additional Info */}
            <div>
              <label
                htmlFor="message"
                className="block font-mono text-[11px] uppercase tracking-wider text-[#121824]/80 dark:text-[#F5F2EB]/70 mb-2"
              >
                Additional Goals or Notes (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                placeholder="Deadlines, current ROAS targets, specific channels to scale..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/15 dark:border-white/15 text-[#121824] dark:text-[#F5F2EB] placeholder:text-stone-500 dark:placeholder:text-stone-400 text-sm focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] transition-all resize-none"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full min-h-[50px] py-4 rounded-full font-grotesk text-xs uppercase tracking-[0.2em] font-semibold text-white bg-[#FF5E14] hover:bg-[#E04F0E] transition-all shadow-[0_0_30px_rgba(255,94,20,0.35)] active:scale-[0.98] disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Saving Intake...</span>
              ) : submitted ? (
                <span>Saved ✓ — Proceed to Step 2 Below ↓</span>
              ) : (
                <>
                  <span>Save &amp; Select Calendar Slot</span>
                  <span className="text-base font-sans">→</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Info Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#090D14] text-[#121824] dark:text-[#F5F2EB] border border-black/10 dark:border-white/15 shadow-xl relative overflow-hidden">
            {/* Ambient orange backlight */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(255,94,20,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#121824] dark:text-white">
                Reach the studio directly
              </h3>
              <InkSealStamp text="POP LAB" subtext="STUDIO" size={42} />
            </div>

            <div className="space-y-6 text-sm">

              {/* Email */}
              <div className="pb-4 border-b border-black/10 dark:border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E14] block mb-1">
                  OFFICIAL INBOX
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href="mailto:growth@poplabstudio.com"
                    className="font-mono text-sm text-[#121824] dark:text-white hover:text-[#FF5E14] transition-colors"
                  >
                    growth@poplabstudio.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-black/5 dark:bg-white/10 hover:bg-[#FF5E14] text-[#121824] dark:text-white hover:text-white transition-colors"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="mt-1">
                  <a
                    href="mailto:poplabstudio.business@gmail.com"
                    className="font-mono text-xs text-[#121824]/60 dark:text-white/60 hover:text-[#FF5E14] transition-colors"
                  >
                    poplabstudio.business@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="pb-4 border-b border-black/10 dark:border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E14] block mb-1">
                  DIRECT PHONE &amp; WHATSAPP
                </span>
                <div className="flex flex-col gap-1.5 font-mono text-sm">
                  <a
                    href="tel:+918837565738"
                    className="text-[#121824] dark:text-white hover:text-[#FF5E14] transition-colors flex items-center gap-2"
                  >
                    <span>+91 88375 65738</span>
                  </a>
                  <a
                    href="https://wa.me/918837565738"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#25D366] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Chat on WhatsApp</span> ↗
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pb-4 border-b border-black/10 dark:border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E14] block mb-1">
                  SOCIAL &amp; CONNECT
                </span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <a
                    href="https://instagram.com/poplabstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#121824]/80 dark:text-white/80 hover:text-[#FF5E14] transition-colors"
                  >
                    Instagram ↗
                  </a>
                  <a
                    href="https://linkedin.com/company/poplabstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#121824]/80 dark:text-white/80 hover:text-[#FF5E14] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>

              {/* Physical Address */}
              <div className="pb-4 border-b border-black/10 dark:border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E14] block mb-1">
                  PHYSICAL HEADQUARTERS
                </span>
                <p className="font-sans text-sm text-[#121824]/80 dark:text-white/80 leading-relaxed">
                  Pop Lab Studio
                  <br />
                  SCO 364, Second Floor, Sector 34A
                  <br />
                  Chandigarh 160022, India
                </p>
              </div>

              {/* Hours */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E14] block mb-1">
                  OPERATIONAL HOURS
                </span>
                <p className="font-mono text-xs text-[#121824]/75 dark:text-white/75">
                  Mon – Sat · 10:00 – 19:00 IST
                </p>
              </div>
            </div>

            {/* Value Guarantees */}
            <ul className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 space-y-2.5 text-xs text-[#121824]/80 dark:text-white/80 font-mono">
              <li className="flex items-center gap-2">
                <span className="text-[#FF5E14]">✦</span> By application only (limited client slots)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#FF5E14]">✦</span> 30 minutes screen-shared with senior partners
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#FF5E14]">✦</span> You keep the full diagnostic roadmap either way
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* STEP 2: Cal.com Calendar Scheduler Embed */}
      <section id="book" className="mb-24 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#18150F]/70 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF5E14] font-semibold">
              STEP 2 // LIVE SCHEDULER
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#121824] dark:text-[#F5F2EB] tracking-tight mb-3">
            Pick a time that works.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#121824]/70 dark:text-[#F5F2EB]/70 font-light mb-4">
            Select a 30-minute slot on our partners&apos; calendar. Cal.com synchronizes time zones automatically.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#121824]/60 dark:text-[#F5F2EB]/50">
            <span>Configured with poplabstudio.business@gmail.com</span>
            <span>•</span>
            <a
              href="https://cal.com/poplab-studio-o0cj4m/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF5E14] hover:underline"
            >
              Open in Cal.com ↗
            </a>
          </div>
        </div>

        {/* Embedded Calendar Container */}
        <div className="w-full rounded-3xl overflow-hidden border border-black/10 dark:border-white/15 bg-[#101010] shadow-2xl h-[720px] p-1">
          <div
            ref={calendarContainerRef}
            id="my-cal-inline-30min"
            className="w-full h-full overflow-y-auto"
          />
        </div>
      </section>

      {/* STEP 3: "What Happens Next" 3-Step Timeline */}
      <section className="mb-24">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF5E14] block mb-2 font-semibold">
              // TRANSPARENT PROCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#121824] dark:text-[#F5F2EB] tracking-tight">
              Three steps. Zero surprises.
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#121824]/60 dark:text-[#F5F2EB]/50">
            RAPID ONBOARDING CADENCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#0D1522]/80 border border-black/10 dark:border-white/10 flex flex-col justify-between group hover:border-[#FF5E14]/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-[#FF5E14]">01</span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF5E14]/10 text-[#FF5E14]">
                  PRE-CALL
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#121824] dark:text-[#F5F2EB] mb-2">
                Pre-call diagnostic
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#121824]/70 dark:text-[#F5F2EB]/70 font-light leading-relaxed">
                Once you submit your brand details, we inspect your funnel speed, copy relevance, and targeting prior to meeting.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between font-mono text-[10px] text-[#121824]/50 dark:text-[#F5F2EB]/40">
              <span>INITIAL AUDIT</span>
              <span className="text-[#FF5E14] font-bold text-sm hidden md:inline">→</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#0D1522]/80 border-2 border-[#FF5E14]/30 flex flex-col justify-between group shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-[#FF5E14]">02</span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF5E14] text-white">
                  LIVE SESSION
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#121824] dark:text-[#F5F2EB] mb-2">
                The 30-min teardown
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#121824]/70 dark:text-[#F5F2EB]/70 font-light leading-relaxed">
                A high-impact, screen-shared strategy session. We pinpoint leaks and map high-converting creative angles.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between font-mono text-[10px] text-[#FF5E14]">
              <span>SCREEN-SHARE TEARDOWN</span>
              <span className="text-[#FF5E14] font-bold text-sm hidden md:inline">→</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#0D1522]/80 border border-black/10 dark:border-white/10 flex flex-col justify-between group hover:border-[#FF5E14]/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-[#0E4D7A] dark:text-[#38BDF8]">03</span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0E4D7A]/10 dark:bg-[#38BDF8]/10 text-[#0E4D7A] dark:text-[#38BDF8]">
                  DELIVERABLE
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#121824] dark:text-[#F5F2EB] mb-2">
                Your scaling roadmap
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#121824]/70 dark:text-[#F5F2EB]/70 font-light leading-relaxed">
                You walk away with an actionable blueprint you can execute in-house or partner with Pop Lab Studio to build.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between font-mono text-[10px] text-[#121824]/50 dark:text-[#F5F2EB]/40">
              <span>OWNED BLUEPRINT</span>
              <span className="text-[#FF5E14] font-bold">✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mb-12">
        <div className="mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF5E14] block mb-2 font-semibold">
            // FREQUENTLY ASKED
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#121824] dark:text-[#F5F2EB] tracking-tight">
            Before you book.
          </h2>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.q} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#121824] dark:text-[#F5F2EB] group-hover:text-[#FF5E14] transition-colors">
                    {faq.q}
                  </span>
                  <span className="w-8 h-8 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center font-mono text-sm text-[#121824]/60 dark:text-[#F5F2EB]/60 group-hover:border-[#FF5E14] group-hover:text-[#FF5E14] transition-all">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 font-sans text-sm sm:text-base text-[#121824]/70 dark:text-[#F5F2EB]/70 font-light leading-relaxed pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
