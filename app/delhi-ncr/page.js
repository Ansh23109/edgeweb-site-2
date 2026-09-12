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
import { breadcrumbSchema, faqSchema, localBusinessSchema } from '../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Web Development & Digital Marketing Agency Delhi NCR | EdgeWeb',
  description:
    'EdgeWeb — 120+ systems delivered since 2019 — is a web development & digital marketing agency in Delhi, serving Delhi, Gurgaon, Noida & Faridabad.',
  alternates: { canonical: absoluteUrl('/delhi-ncr') },
  keywords:
    'web development company Delhi NCR, best digital marketing agency Delhi, web development agency Delhi, software development company Gurgaon, app development company Noida, IT company Delhi NCR',
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Web Development & Digital Marketing Agency Delhi NCR | EdgeWeb',
    description: '120+ systems delivered since 2019 — a Delhi NCR web development and digital marketing agency serving Delhi, Gurgaon, Noida, Faridabad & Ghaziabad.',
    url: absoluteUrl('/delhi-ncr'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb — Delhi NCR web development & digital marketing agency' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('delhi-ncr/hero-inner.html');
const mainHtml = readContent('delhi-ncr/main.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Do you have a physical office in Delhi NCR?', a: "Yes — EdgeWeb is based in Vishwas Nagar, Delhi 110032. We're happy to meet in person for Delhi NCR clients, alongside remote-first delivery for everyone else." },
  { q: 'Do you work with early-stage startups in Gurgaon or Noida?', a: 'Yes. Early-stage teams usually need one product built well; we scope in phases so you see something working early.' },
  { q: 'Can we meet in person before starting a project?', a: 'Absolutely — for Delhi NCR businesses, an in-person discovery conversation is often the fastest way to get the scope right.' },
  { q: 'Do you only work with Delhi NCR businesses?', a: 'No — Delhi NCR is home base, but the same team delivers for clients across India and internationally.' },
];

export default function DelhiNcrPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Delhi NCR', path: '/delhi-ncr' }]),
          localBusinessSchema(),
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

      <Script id="delhi-ncr-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
