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
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Our Services: Web, App & Software Development | EdgeWeb',
  description:
    "Web development, app development, custom software, AI automation, digital marketing and UI/UX — explore EdgeWeb's full-stack service lineup.",
  alternates: { canonical: absoluteUrl('/services') },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Our Services: Web, App & Software Development | EdgeWeb',
    description:
      "Web development, app development, custom software, AI automation, digital marketing and UI/UX — explore EdgeWeb's full-stack service lineup.",
    url: absoluteUrl('/services'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb services' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE],
    site: '@edgewebco',
  },
};

const css = readContent('services-hub/style.css');
const heroInnerHtml = readContent('services-hub/hero-inner.html');
const mainHtml = readContent('services-hub/main.html');
const script = readContent('services-hub/script.js');

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <ChromeEffects />
      <Header />
      <MobileMenu />

      <main id="top">
        <section className="svc-hero">
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="wrap" dangerouslySetInnerHTML={{ __html: heroInnerHtml }} />
        </section>

        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="services-hub-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
