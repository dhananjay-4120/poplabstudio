import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Italiana, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
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

// 2. Luxury Display Serif (Sculptural Titles)
const italiana = Italiana({
  subsets: ['latin'],
  variable: '--font-italiana',
  weight: '400',
  display: 'swap',
});

// 3. Crisp Technical Body Sans (Paragraphs & Narrative)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// 4. Swiss Technical & Monospaced Accents (Counters, Badges & Labels)
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
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
      className={`${cormorantGaramond.variable} ${italiana.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable} dark`}
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
      </head>
      <body
        className="bg-[#090D14] text-[#F5F2EB] selection:bg-[#FF5E14] selection:text-white min-h-screen antialiased overflow-x-hidden relative isolate"
        suppressHydrationWarning
      >
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

