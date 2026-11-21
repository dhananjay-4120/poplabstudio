import type { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Connect & Start a Project · Pop Lab Studio | Book a Free Ad Teardown',
  description:
    'Book a 30-minute growth diagnostic of your paid ad accounts, creative hooks, and conversion funnels. Based in Chandigarh, partnering with ambitious brands globally.',
  openGraph: {
    images: [{ url: '/opengraph-image.jpg', width: 1024, height: 576, alt: 'Pop Lab Studio' }],
    title: 'Connect · Pop Lab Studio | Book a Free Ad Teardown',
    description:
      'Book a 30-minute diagnostic of your paid ad accounts and creative hooks. Custom scaling roadmap with senior partners.',
    url: 'https://poplabstudio.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
