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
import { breadcrumbSchema, serviceSchema, faqSchema } from '../../../lib/schema';
import { getServicePage, absoluteUrl, DEFAULT_OG_IMAGE } from '../../../lib/site';

const SLUG = 'ai-automation';
const svc = getServicePage(SLUG);

export const metadata = {
  title: svc.title,
  description: svc.description,
  alternates: { canonical: absoluteUrl(`/services/${SLUG}`) },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: svc.title,
    description: svc.description,
    url: absoluteUrl(`/services/${SLUG}`),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `EdgeWeb ${svc.name}` }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

// ai-automation carries a superset stylesheet (see content/services-detail/style.css)
const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent(`services-detail/${SLUG}/hero-inner.html`);
const mainHtml = readContent(`services-detail/${SLUG}/main.html`);
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: "Do we need our data to be 'AI-ready' before starting?", a: "No. Most engagements start by working with the data and systems you already have. Part of the first phase is identifying what's usable as-is and what needs light cleanup before automation can run on it." },
  { q: "Will AI replace our team's judgment on important decisions?", a: 'Not by default. Most systems we build are scoped to a specific, bounded task — classification, drafting, triage — with a human reviewing anything above a risk or confidence threshold you set.' },
  { q: 'How do you decide what to automate first?', a: "By volume and pain: the manual step that happens most often and causes the most delay or error usually gets automated first, since that's where the return is fastest to see." },
  { q: 'Can this integrate with the CRM/ERP we already use?', a: "In most cases, yes — through the platform's API or, where no API exists, through a lighter-weight integration approach we scope during the architecture phase." },
];

export default function AiAutomationPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: svc.name, path: `/services/${SLUG}` }]),
          serviceSchema(svc),
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

      <Script id="svc-ai-automation-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
