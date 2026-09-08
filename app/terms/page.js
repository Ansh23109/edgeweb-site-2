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
  title: 'Terms & Conditions | EdgeWeb',
  description:
    'The terms that apply to using edgeweb.co. Actual project work is governed by the separate agreement signed with each client, not this page.',
  alternates: { canonical: absoluteUrl('/terms') },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Terms & Conditions | EdgeWeb',
    description: 'The terms that apply to using edgeweb.co.',
    url: absoluteUrl('/terms'),
  },
  twitter: { card: 'summary', site: '@edgewebco' },
};

const css = readContent('home/style.css') + '\n' + readContent('shared/page-intro.css');
const heroInnerHtml = readContent('terms/hero-inner.html');
const mainHtml = readContent('terms/main.html');
const script = readContent('services-detail/script.js');

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Terms & Conditions', path: '/terms' }])} />
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

      <Script id="terms-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
