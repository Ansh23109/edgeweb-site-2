import Script from 'next/script';
import Header from '../../components/Header';
import MobileMenu from '../../components/MobileMenu';
import Footer from '../../components/Footer';
import StickyCtas from '../../components/StickyCtas';
import DiscoveryModal from '../../components/DiscoveryModal';
import ChromeEffects from '../../components/ChromeEffects';
import HeroVortex from '../../components/HeroVortex';
import JsonLd from '../../components/JsonLd';
import { readContent } from '../../lib/content';
import { breadcrumbSchema } from '../../lib/schema';
import { absoluteUrl } from '../../lib/site';

export const metadata = {
  title: 'Privacy Policy | EdgeWeb',
  description:
    'What EdgeWeb collects when you use this site or submit an enquiry, why we collect it, who we share it with, and how to ask us to change or delete it.',
  alternates: { canonical: absoluteUrl('/privacy') },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Privacy Policy | EdgeWeb',
    description: 'What EdgeWeb collects, why, and how to ask us to change or delete it.',
    url: absoluteUrl('/privacy'),
  },
  twitter: { card: 'summary', site: '@edgewebco' },
};

const css = readContent('home/style.css') + '\n' + readContent('shared/page-intro.css');
const heroInnerHtml = readContent('privacy/hero-inner.html');
const mainHtml = readContent('privacy/main.html');
const script = readContent('services-detail/script.js');

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])} />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <ChromeEffects />
      <Header />
      <MobileMenu />

      <main id="top">
        <section className="page-intro">
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="wrap" dangerouslySetInnerHTML={{ __html: heroInnerHtml }} />
        </section>

        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="privacy-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
