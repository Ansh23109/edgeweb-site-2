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

const SLUG = 'custom-software';
const svc = getServicePage(SLUG);

export const metadata = {
  title: svc.title,
  description: svc.description,
  alternates: { canonical: absoluteUrl(`/services/${SLUG}`) },
  keywords: svc.keywords,
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

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent(`services-detail/${SLUG}/hero-inner.html`);
const mainHtml = readContent(`services-detail/${SLUG}/main.html`);
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'How long does a typical software project take?', a: 'Most projects run 6 to 16 weeks depending on scope. We scope in phases so you see a working result early, rather than waiting for one large release.' },
  { q: 'Do you work with early-stage businesses, or only established ones?', a: 'Both. Early-stage teams usually need one thing built well; established businesses usually need existing systems connected or replaced. The approach works the same either way.' },
  { q: 'What do you need from us to get started?', a: "A working session on what's actually breaking or missing today, plus access to any existing systems or brand material relevant to the project." },
  { q: 'Do you offer support after launch?', a: 'Yes, most clients stay on a support or iteration arrangement after launch, since real usage is where decisions actually get tested.' },
];

export default function CustomSoftwarePage() {
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

      <Script id="svc-custom-software-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
