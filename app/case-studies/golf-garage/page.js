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
  title: 'Golf Garage Case Study: Brand & Shopify | EdgeWeb',
  description:
    'How EdgeWeb built the brand identity, packaging and Shopify storefront for Golf Garage, India’s pre-owned golf equipment marketplace founded by Rahul Bajaj.',
  alternates: { canonical: absoluteUrl('/case-studies/golf-garage') },
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'Golf Garage Case Study: Brand & Shopify | EdgeWeb',
    description: 'Logo, colour system, typography, packaging and a full Shopify build — the brand EdgeWeb built for Golf Garage, live at golfgarage.in.',
    url: absoluteUrl('/case-studies/golf-garage'),
    images: [{ url: '/images/golf-garage/website-hero.jpg', width: 1200, height: 630, alt: 'Golf Garage brand identity and Shopify storefront by EdgeWeb' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/golf-garage/hero-inner.html');
const mainHtml = readContent('case-studies/golf-garage/main.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Who is Golf Garage?', a: "Golf Garage is India's marketplace for pre-owned golf equipment, founded by Rahul Bajaj, an Asian Games silver medalist. It's live at golfgarage.in." },
  { q: 'What did EdgeWeb build for Golf Garage?', a: 'The full brand identity (logo, colour system, typography and guidelines), physical packaging for shipped orders, and the Shopify storefront the brand launched with.' },
  { q: 'Why design the brand and the website together?', a: "So the packaging a customer unboxes and the site they bought from feel like the same brand, not two separate vendors' work stitched together." },
  { q: 'Does EdgeWeb build on Shopify for other clients too?', a: 'Yes — Shopify is one of several stacks we build e-commerce storefronts on, chosen when it fits the client’s catalog and operational needs.' },
];

export default function GolfGarageCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'Golf Garage', path: '/case-studies/golf-garage' },
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

      <Script id="golf-garage-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
