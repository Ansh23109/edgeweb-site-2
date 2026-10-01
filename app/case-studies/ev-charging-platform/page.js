import Script from 'next/script';
import Header from '../../../components/Header';
import MobileMenu from '../../../components/MobileMenu';
import Footer from '../../../components/Footer';
import StickyCtas from '../../../components/StickyCtas';
import DiscoveryModal from '../../../components/DiscoveryModal';
import ChromeEffects from '../../../components/ChromeEffects';
import HeroVortex from '../../../components/HeroVortex';
import JsonLd from '../../../components/JsonLd';
import { readContent } from '../../../lib/content';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../../lib/site';

export const metadata = {
  title: 'EV Charging Platform Case Study | EdgeWeb',
  description:
    'How EdgeWeb designed an EV charging station platform: a driver app, an operator dashboard and an OCPP-based integration layer connecting both in real time.',
  alternates: { canonical: absoluteUrl('/case-studies/ev-charging-platform') },
  keywords:
    'EV charging app development, EV charging software case study, OCPP integration, EV charging station management software, charge point operator software, real-time IoT platform, EV charging app development company',
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'EV Charging Platform Case Study | EdgeWeb',
    description: 'A driver app, operator dashboard and OCPP-based integration layer for an EV charging network, designed by EdgeWeb.',
    url: absoluteUrl('/case-studies/ev-charging-platform'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb — EV charging platform case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/ev-charging-platform/hero-inner.html');
const mainHtml = readContent('case-studies/ev-charging-platform/main.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Is this a client project?', a: "Yes. EdgeWeb designed and built this EV charging platform for a client operating a charging network, who isn't named on this page. It's presented here as product strategy, architecture and design work." },
  { q: 'What is OCPP, and why does it matter?', a: 'OCPP (Open Charge Point Protocol) is the industry-standard protocol most EV chargers use to communicate with management software. Building the integration layer on OCPP, rather than a single manufacturer\'s proprietary system, keeps the platform able to work with chargers from more than one vendor.' },
  { q: 'Can EdgeWeb build a similar platform for a different kind of hardware network?', a: 'Yes. The underlying pattern — connecting physical hardware to a real-time app and dashboard, with billing on top — applies to more than EV charging. Talk to us about what you\'re connecting.' },
];

export default function EvChargingPlatformCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'EV Charging Platform', path: '/case-studies/ev-charging-platform' },
          ]),
          faqSchema(FAQS),
        ]}
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <ChromeEffects />
      <Header />
      <MobileMenu />

      <main id="top">
        <section className="svc-detail-hero">
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="wrap" dangerouslySetInnerHTML={{ __html: heroInnerHtml }} />
        </section>

        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="ev-charging-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
