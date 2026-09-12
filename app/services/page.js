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
import { breadcrumbSchema, faqSchema } from '../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Our Services: Web, App & Software Development | EdgeWeb',
  description:
    'Web, app & software development, AI automation and digital marketing — the same team behind 120+ delivered systems and 340+ automated workflows.',
  alternates: { canonical: absoluteUrl('/services') },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Our Services: Web, App & Software Development | EdgeWeb',
    description:
      'Web, app & software development, AI automation and digital marketing — the same team behind 120+ delivered systems and 340+ automated workflows.',
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

const FAQS = [
  { q: 'Do I need to pick one service, or can these work together?', a: "Most engagements combine two or three of these — a website that needs backend automation, or a platform that needs its own marketing engine. Pick whichever page matches your starting point and we'll scope the rest around it." },
  { q: 'How do you decide which combination we actually need?', a: "We start with the business problem, not a service menu. A short conversation on what's actually breaking usually makes it clear whether you need one service done well or several working together." },
  { q: 'Can we start with one service and add more later?', a: 'Yes — most clients start with one clear priority and add automation, marketing or a redesign once that first piece is live and proving out.' },
  { q: 'Not sure where to start?', a: 'Use "Tell Us What You\'re Building" above, or just tell us what\'s not working today on a call — we\'ll point you to the right service, not just the most expensive one.' },
];

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
          faqSchema(FAQS),
        ]}
      />
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
