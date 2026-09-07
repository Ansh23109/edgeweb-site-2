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
import { breadcrumbSchema } from '../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Contact EdgeWeb | Start Your Project',
  description:
    "Tell us what you're building. EdgeWeb replies with real guidance — no sales script — on timeline, scope and next steps.",
  alternates: { canonical: absoluteUrl('/contact') },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Contact EdgeWeb | Start Your Project',
    description: 'Tell EdgeWeb about your project. We reply with real next steps, not a sales pitch.',
    url: absoluteUrl('/contact'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb contact — start a project inquiry' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('contact/style.css');
const heroInnerHtml = readContent('contact/hero-inner.html');
const script = readContent('contact/script.js');

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <ChromeEffects />
      <Header />
      <MobileMenu />

      <main id="top">
        <section className="contact-split">
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="contact-hero-content" dangerouslySetInnerHTML={{ __html: heroInnerHtml }} />
        </section>
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="contact-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
