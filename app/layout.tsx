import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import SmoothScroll from '@/components/ui/SmoothScroll';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import ThemeToggle from '@/components/ui/ThemeToggle';
import './globals.css';

// 1. Editorial Display Serif (Headlines & Dramatic Accents)
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// 2. Crisp Technical Body Sans (Paragraphs & Narrative)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// 3. True Tabular Swiss Monospace (Counters, Telemetry, Coordinates & Badges)
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pop Lab Studio — Creative Growth Studio',
  description: 'We make brands impossible to ignore. Story First. Growth Always. Full-stack creative, cultural attention, and conversion engineering.',
  metadataBase: new URL('https://poplabstudio.com'),
  openGraph: {
    title: 'Pop Lab Studio — Creative Growth Studio',
    description: 'We make brands impossible to ignore. Story First. Growth Always.',
    url: 'https://poplabstudio.com',
    siteName: 'Pop Lab Studio',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5F0' },
    { media: '(prefers-color-scheme: dark)', color: '#090D14' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} ${spaceMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="poplab-theme-detector"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('poplab-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored !== null ? (stored === 'dark') : prefersDark;
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.classList.add('light');
                    root.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          id="poplab-chunk-recovery"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var retried = false;
                function checkAndRecover(err) {
                  if (retried) return;
                  var msg = '';
                  if (err && err.message) msg = err.message;
                  else if (err && err.reason && err.reason.message) msg = err.reason.message;
                  else if (typeof err === 'string') msg = err;

                  var isChunk = msg.indexOf('ChunkLoadError') !== -1 ||
                                msg.indexOf('Loading chunk') !== -1 ||
                                msg.indexOf('dynamically imported module') !== -1;

                  if (isChunk) {
                    var key = 'poplab_chunk_retry_ts';
                    var now = Date.now();
                    var last = sessionStorage.getItem(key);
                    if (!last || (now - parseInt(last, 10)) > 12000) {
                      retried = true;
                      sessionStorage.setItem(key, now.toString());
                      window.location.reload();
                    }
                  }
                }

                window.addEventListener('error', function(e) {
                  if (e.target && e.target.tagName === 'SCRIPT' && e.target.src && e.target.src.indexOf('/_next/static/') !== -1) {
                    var key = 'poplab_chunk_retry_ts';
                    var now = Date.now();
                    var last = sessionStorage.getItem(key);
                    if (!last || (now - parseInt(last, 10)) > 12000) {
                      sessionStorage.setItem(key, now.toString());
                      window.location.reload();
                    }
                  } else {
                    checkAndRecover(e.error || e);
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  checkAndRecover(e.reason);
                });
              })();
            `,
          }}
        />
        {/* Google Tag Manager (GTM-5FMR7TWS) */}
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5FMR7TWS');`,
          }}
        />

        {/* Global UTM & Lead Attribution Listener */}
        <script
          id="poplab-utm-tracker"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var params = new URLSearchParams(window.location.search);
                  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
                  var hasUtm = false;
                  var captured = {};

                  for (var i = 0; i < utmKeys.length; i++) {
                    var val = params.get(utmKeys[i]);
                    if (val) {
                      captured[utmKeys[i]] = val;
                      hasUtm = true;
                    }
                  }

                  if (hasUtm) {
                    captured['landing_page'] = window.location.pathname;
                    captured['captured_at'] = new Date().toISOString();
                    sessionStorage.setItem('poplab_utm_data', JSON.stringify(captured));
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        <link
          rel="preload"
          as="image"
          href="/hero-sunrise-poster.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body
        className="bg-[#090D14] text-[#F5F2EB] selection:bg-[#FF5E14] selection:text-white min-h-screen antialiased overflow-x-hidden relative isolate"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5FMR7TWS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <SmoothScroll>
          <AtmosphericBackground />
          <Navbar />
          <div className="min-h-screen flex flex-col justify-between w-full">
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
          <ThemeToggle />
        </SmoothScroll>
      </body>
    </html>
  );
}

