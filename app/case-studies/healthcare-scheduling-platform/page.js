import Script from 'next/script';
import Header from '../../../components/Header';
import MobileMenu from '../../../components/MobileMenu';
import Footer from '../../../components/Footer';
import StickyCtas from '../../../components/StickyCtas';
import DiscoveryModal from '../../../components/DiscoveryModal';
import ChromeEffects from '../../../components/ChromeEffects';
import HeroVortex from '../../../components/HeroVortex';
import BookingRaceSimulator from '../../../components/BookingRaceSimulator';
import JsonLd from '../../../components/JsonLd';
import { readContent } from '../../../lib/content';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../../lib/site';

export const metadata = {
  title: 'Healthcare Scheduling Platform Case Study | EdgeWeb',
  description:
    '99.9% uptime, 0 double-bookings since launch — how EdgeWeb rebuilt a clinic network scheduling system for a USA-based healthcare provider.',
  alternates: { canonical: absoluteUrl('/case-studies/healthcare-scheduling-platform') },
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'Healthcare Scheduling Platform Case Study | EdgeWeb',
    description: '99.9% uptime, 0 double-bookings since launch — a clinic network scheduling system for a USA-based healthcare provider.',
    url: absoluteUrl('/case-studies/healthcare-scheduling-platform'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb healthcare scheduling platform case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/healthcare-scheduling-platform/hero-inner.html');
const beforeWidgetHtml = readContent('case-studies/healthcare-scheduling-platform/before-widget.html');
const afterWidgetHtml = readContent('case-studies/healthcare-scheduling-platform/after-widget.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'How exactly does the system prevent double-booking?', a: "Booking a slot has to acquire a lock on that exact appointment before it's confirmed. A second request while the lock is held is rejected outright." },
  { q: 'Does this integrate with our existing EHR?', a: 'Typically yes — the scheduling layer is usually built to sync with the EHR system already in place.' },
  { q: 'What happens during a genuine traffic spike?', a: 'Infrastructure scales out automatically ahead of known peak periods, and monitoring alerts the team if load moves outside the expected pattern.' },
  { q: 'How long did a project like this take?', a: 'Migrating a network of this size typically runs 10–14 weeks, phased clinic by clinic.' },
];

export default function HealthcareSchedulingCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'Healthcare Scheduling Platform', path: '/case-studies/healthcare-scheduling-platform' },
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

        <section id="booking-race" className="detail-block section-alt">
          <div className="wrap">
            <p className="eyebrow reveal">Try It</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>Watch the slot-locking logic run.</h2>
            <p className="body reveal" style={{ marginTop: 14, marginBottom: 32, maxWidth: '70ch' }}>
              Book an open slot yourself, or fire three simultaneous booking attempts at the same slot and watch
              only one actually win it — exactly what stops two patients from holding the same appointment.
            </p>
            <div className="reveal">
              <BookingRaceSimulator />
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: afterWidgetHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="healthcare-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
