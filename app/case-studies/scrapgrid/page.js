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
  title: 'ScrapGrid SaaS Case Study | EdgeWeb',
  description:
    'How EdgeWeb designed ScrapGrid, a multi-tenant cloud ERP with a field mobile app and AI verification for scrap and recycling vendors.',
  alternates: { canonical: absoluteUrl('/case-studies/scrapgrid') },
  keywords:
    'SaaS product design case study, multi-tenant SaaS architecture, cloud ERP for scrap vendors, recycling software, scrap yard management software, SaaS development company, AI verification, SaaS pricing model',
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'ScrapGrid SaaS Case Study | EdgeWeb',
    description: 'A multi-tenant cloud ERP with a field mobile app and AI verification engine for scrap and recycling vendors, designed by EdgeWeb.',
    url: absoluteUrl('/case-studies/scrapgrid'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb — ScrapGrid SaaS case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/scrapgrid/hero-inner.html');
const mainHtml = readContent('case-studies/scrapgrid/main.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Is ScrapGrid a client project?', a: 'No. ScrapGrid is a SaaS product and solution designed by EdgeWeb, presented here as product strategy, architecture and design work.' },
  { q: 'What does the AI Verification Engine do?', a: 'It checks material photos and field entries against each other and flags mismatches for review, to reduce errors and fraud.' },
  { q: 'Can EdgeWeb design a similar SaaS product for my industry?', a: 'Yes. We start from how your industry actually operates, then design the architecture, interface and pricing model together.' },
];

export default function ScrapGridCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'ScrapGrid', path: '/case-studies/scrapgrid' },
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

      <Script id="scrapgrid-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
