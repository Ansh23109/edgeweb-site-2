import Script from 'next/script';
import Header from '../../../components/Header';
import MobileMenu from '../../../components/MobileMenu';
import Footer from '../../../components/Footer';
import StickyCtas from '../../../components/StickyCtas';
import DiscoveryModal from '../../../components/DiscoveryModal';
import ChromeEffects from '../../../components/ChromeEffects';
import HeroVortex from '../../../components/HeroVortex';
import ParkingSimulator from '../../../components/ParkingSimulator';
import JsonLd from '../../../components/JsonLd';
import { readContent } from '../../../lib/content';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../../lib/site';

export const metadata = {
  title: 'Parking Management System Case Study | EdgeWeb',
  description:
    'How EdgeWeb built a real-time parking management platform — live occupancy detection, dynamic pricing, automated ANPR entry/exit — for a multi-location parking operator in the USA.',
  alternates: { canonical: absoluteUrl('/case-studies/parking-management-system') },
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'Parking Management System Case Study | EdgeWeb',
    description: 'Real-time occupancy, dynamic pricing and automated entry/exit for a multi-location USA parking operator.',
    url: absoluteUrl('/case-studies/parking-management-system'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb parking management system case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/parking-management-system/hero-inner.html');
const beforeWidgetHtml = readContent('case-studies/parking-management-system/before-widget.html');
const afterWidgetHtml = readContent('case-studies/parking-management-system/after-widget.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Does this replace our existing barriers and cameras?', a: "Not necessarily — most ANPR cameras and boom barriers speak standard protocols the platform can integrate with directly. We only replace hardware where it can't be integrated or is past end of life." },
  { q: 'Can pricing rules differ per lot?', a: 'Yes. Base rate, demand tiers, caps and even time-of-day rules are configured per location from the admin dashboard, not hardcoded.' },
  { q: 'What happens if a sensor or camera goes offline?', a: 'The dashboard flags it immediately, and that bay falls back to a manual-override state rather than silently reporting stale data.' },
  { q: 'How long did a project like this take?', a: 'Rolling out the platform to a first pilot lot typically takes 8–12 weeks; each additional location after that is mostly a hardware install and configuration exercise.' },
];

export default function ParkingManagementCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'Parking Management System', path: '/case-studies/parking-management-system' },
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

        <div dangerouslySetInnerHTML={{ __html: beforeWidgetHtml }} />

        <section id="pricing-engine" className="detail-block section-alt">
          <div className="wrap">
            <p className="eyebrow reveal">Try It</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>See the pricing engine live.</h2>
            <p className="body reveal" style={{ marginTop: 14, marginBottom: 32, maxWidth: '70ch' }}>
              This runs the same tiered logic as the production system. Click an open bay to reserve it, or turn on
              live traffic to watch occupancy — and the rate — move on their own.
            </p>
            <div className="reveal">
              <ParkingSimulator />
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: afterWidgetHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="parking-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
