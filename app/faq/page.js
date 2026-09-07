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
import { breadcrumbSchema, faqSchema, HOME_FAQS } from '../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'FAQ | Questions Before You Start a Project | EdgeWeb',
  description:
    'Answers to what EdgeWeb builds, how a project starts, typical engagement length, post-launch support, and who we work with.',
  alternates: { canonical: absoluteUrl('/faq') },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'FAQ | Questions Before You Start a Project',
    description: 'Questions we get before a project starts, answered directly.',
    url: absoluteUrl('/faq'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb FAQ' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('home/style.css') + '\n' + readContent('shared/page-intro.css');
const heroInnerHtml = readContent('faq/hero-inner.html');
const mainHtml = readContent('faq/main.html');
const script = readContent('services-detail/script.js');

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]),
          faqSchema(HOME_FAQS),
        ]}
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <ChromeEffects />
      <Header />
      <MobileMenu />

      <main id="top">
        <section className="page-intro">
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="wrap" dangerouslySetInnerHTML={{ __html: heroInnerHtml }} />
        </section>

        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="faq-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
