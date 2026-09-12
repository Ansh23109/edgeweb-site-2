import Script from 'next/script';
import Header from '../../../components/Header';
import MobileMenu from '../../../components/MobileMenu';
import Footer from '../../../components/Footer';
import StickyCtas from '../../../components/StickyCtas';
import DiscoveryModal from '../../../components/DiscoveryModal';
import ChromeEffects from '../../../components/ChromeEffects';
import HeroVortex from '../../../components/HeroVortex';
import InventorySimulator from '../../../components/InventorySimulator';
import JsonLd from '../../../components/JsonLd';
import { readContent } from '../../../lib/content';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../../lib/site';

export const metadata = {
  title: 'Retail Inventory Platform Case Study | EdgeWeb',
  description:
    '6 hours of daily reconciliation removed, 0 overselling since launch — how EdgeWeb built a real-time inventory ledger for a USA-based retailer.',
  alternates: { canonical: absoluteUrl('/case-studies/retail-inventory-platform') },
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'Retail Inventory Platform Case Study | EdgeWeb',
    description: '6 hours of daily reconciliation removed, 0 overselling since launch — a real-time inventory ledger for a USA-based retailer.',
    url: absoluteUrl('/case-studies/retail-inventory-platform'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb retail inventory platform case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/retail-inventory-platform/hero-inner.html');
const beforeWidgetHtml = readContent('case-studies/retail-inventory-platform/before-widget.html');
const afterWidgetHtml = readContent('case-studies/retail-inventory-platform/after-widget.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Does this replace our existing POS system?', a: 'Not usually — the ledger typically integrates with the POS and e-commerce platform you already run, rather than replacing either.' },
  { q: 'How does it handle a miscount or theft?', a: 'A stock delta well outside the expected range for that SKU and location gets flagged for review instead of silently updating the ledger.' },
  { q: 'Can this scale beyond three warehouses?', a: "Yes — the ledger and transfer-suggestion logic aren't specific to a fixed number of locations." },
  { q: 'How long did a project like this take?', a: 'A first working version across all locations typically takes 8–12 weeks.' },
];

export default function RetailInventoryCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'Retail Inventory Platform', path: '/case-studies/retail-inventory-platform' },
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

        <section id="inventory-ledger" className="detail-block section-alt">
          <div className="wrap">
            <p className="eyebrow reveal">Try It</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>See the live inventory ledger.</h2>
            <p className="body reveal" style={{ marginTop: 14, marginBottom: 32, maxWidth: '70ch' }}>
              Click &quot;Sell 1&quot; under any warehouse to simulate a sale. Watch the network total update instantly,
              and a transfer suggestion appear the moment a location drops below its reorder threshold.
            </p>
            <div className="reveal">
              <InventorySimulator />
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: afterWidgetHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="retail-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
