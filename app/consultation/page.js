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
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from '../../lib/site';

export const metadata = {
  title: 'Free 1:1 Consultation | EdgeWeb',
  description:
    'A free 30-minute call with the EdgeWeb team to understand your project and point you toward the right direction — no sales pitch, no obligation.',
  alternates: { canonical: absoluteUrl('/consultation') },
  keywords:
    'free software consultation USA, free technology consulting call Australia, free web development consultation Europe, free discovery call India, book a call with a software agency, free 1:1 mentorship call',
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Free 1:1 Consultation | EdgeWeb',
    description: 'Book a free 30-minute call with the EdgeWeb team — real direction on your project, not a sales script.',
    url: absoluteUrl('/consultation'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb — Free 1:1 Consultation' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('consultation/hero-inner.html');
const mainHtml = readContent('consultation/main.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Is this actually free?', a: "Yes — no cost, no catch. If it turns into paid work later, that's a separate conversation you start, not something this call leads into by default." },
  { q: "What if I don't end up hiring EdgeWeb?", a: "That's a completely normal outcome. The point of the call is direction, not a guaranteed sale." },
  { q: 'Do I need to have a fully scoped project already?', a: 'No — "I think we need something but I\'m not sure what" is a perfectly good reason to book.' },
  { q: 'Who will I actually be talking to?', a: 'A member of the EdgeWeb team directly — not a sales rep reading from a script.' },
  { q: "What if 30 minutes isn't enough?", a: "Say so on the call — if it's worth continuing, we'll set up the next conversation." },
];

export default function ConsultationPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Free Consultation', path: '/consultation' }]),
          faqSchema(FAQS),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Free Technology Consultation',
            name: 'Free 1:1 Consultation',
            provider: { '@id': `${SITE_URL}/#organization` },
            areaServed: ['United States', 'United Kingdom', 'Australia', 'India'],
            description:
              'A free 30-minute 1:1 call with the EdgeWeb team to understand a business problem and give direction on the right approach — not a sales pitch.',
            url: absoluteUrl('/consultation'),
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: absoluteUrl('/consultation'),
            },
          },
        ]}
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <style dangerouslySetInnerHTML={{ __html: '.calendly-wrap{ border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; background:var(--bg-raised, #fff); }' }} />

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

      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

      <Script id="consultation-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
