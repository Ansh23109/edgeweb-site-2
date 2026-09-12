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
  title: 'About EdgeWeb | Full-Stack Technology Partner',
  description:
    'EdgeWeb is a full-stack technology solutions company founded in 2019, building custom software, web platforms and automation for businesses in the USA, Europe, Australia and India.',
  alternates: { canonical: absoluteUrl('/about') },
  keywords:
    'technology partner USA, software company Australia, IT solutions company Europe, technology company India, full-stack development agency',
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'About EdgeWeb | Full-Stack Technology Partner',
    description:
      'How EdgeWeb works: a six-stage process from business problem to running system, and the numbers behind it.',
    url: absoluteUrl('/about'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'About EdgeWeb' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('home/style.css') + '\n' + readContent('shared/page-intro.css');
const heroInnerHtml = readContent('about/hero-inner.html');
const mainHtml = readContent('about/main.html');
const script = readContent('services-detail/script.js');

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
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

      <Script id="about-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
