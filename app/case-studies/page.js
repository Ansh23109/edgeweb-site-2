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
  title: 'Case Studies: Golf Garage, Retail, Fintech & More | EdgeWeb',
  description:
    "Real EdgeWeb work — from Golf Garage's brand and Shopify build to retail, fintech and healthcare systems — with the outcomes that came from them.",
  alternates: { canonical: absoluteUrl('/case-studies') },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Case Studies: Golf Garage, Retail, Fintech & More',
    description:
      "Systems we've shipped for Golf Garage, retail, financial services, healthcare and more.",
    url: absoluteUrl('/case-studies'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb case studies' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('home/style.css') + '\n' + readContent('shared/page-intro.css');
const heroInnerHtml = readContent('case-studies/hero-inner.html');
const mainHtml = readContent('case-studies/main.html');
const script = readContent('services-detail/script.js');

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }])} />
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

      <Script id="case-studies-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
