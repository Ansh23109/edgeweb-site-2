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
  title: 'Unlock Travels Case Study: Travel Website | EdgeWeb',
  description:
    'How EdgeWeb built unlocktravels.com — a visa search tool, five service pages, destination guides for 90+ countries and a dual enquiry-and-consultation funnel.',
  alternates: { canonical: absoluteUrl('/case-studies/unlock-travels') },
  keywords:
    'travel website development case study, visa website design, travel agency website development, travel booking website case study, website development company India',
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'Unlock Travels Case Study: Travel Website | EdgeWeb',
    description: 'A visa search tool, five service pages and a dual enquiry-and-consultation funnel, built for Unlock Travels at unlocktravels.com.',
    url: absoluteUrl('/case-studies/unlock-travels'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb — Unlock Travels case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/unlock-travels/hero-inner.html');
const mainHtml = readContent('case-studies/unlock-travels/main.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Is unlocktravels.com a real, live client site?', a: 'Yes. Unlock Travels is a real EdgeWeb client, and the website is live today at unlocktravels.com.' },
  { q: 'What did EdgeWeb build for Unlock Travels?', a: 'The website: a visa search tool, five service pages (visa & passport, flights, hotels, cabs, insurance), destination guides, a four-step process walkthrough, an FAQ, and an enquiry-and-consultation conversion flow.' },
  { q: 'Can EdgeWeb build a similar website for my travel or services business?', a: 'Yes — see our Web Development service, or book a free 1:1 call to talk through what you need.' },
];

export default function UnlockTravelsCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'Unlock Travels', path: '/case-studies/unlock-travels' },
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

      <Script id="unlock-travels-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
