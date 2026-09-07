import Script from 'next/script';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import Footer from '../components/Footer';
import StickyCtas from '../components/StickyCtas';
import DiscoveryModal from '../components/DiscoveryModal';
import ChromeEffects from '../components/ChromeEffects';
import HeroVortex from '../components/HeroVortex';
import JsonLd from '../components/JsonLd';
import { readContent } from '../lib/content';
import { websiteSchema, faqSchema, HOME_FAQS } from '../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../lib/site';

export const metadata = {
  title: 'Custom Software & Web Development Company | EdgeWeb',
  description:
    'EdgeWeb builds custom websites, software, AI automation and growth systems for businesses in the USA, Europe, Australia & India. Talk to us about your project.',
  alternates: { canonical: absoluteUrl('/') },
  keywords:
    'web development company, web development agency, website development company, website development services, web design company, software development company, IT services company, digital agency, web development USA, web development company Europe, web development company Australia',
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Custom Software & Web Development Company | EdgeWeb',
    description:
      'EdgeWeb helps businesses across the USA, Europe and Australia with custom websites, digital systems, software and growth-focused technology solutions.',
    url: absoluteUrl('/'),
    locale: 'en_IN',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb — IT solutions and digital engineering' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdgeWeb | IT Solutions, Web & App Development, Automation',
    description:
      'Custom web and mobile applications, process automation, cloud infrastructure and digital marketing — engineered as one system, not assembled from parts.',
    images: [DEFAULT_OG_IMAGE],
    site: '@edgewebco',
  },
};

const css = readContent('home/style.css');
const heroInnerHtml = readContent('home/hero-inner.html');
const mainHtml = readContent('home/main.html');
const script = readContent('home/script.js');

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteSchema(), faqSchema(HOME_FAQS)]} />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <ChromeEffects />
      <Header />
      <MobileMenu />

      <main id="top">
        <section className="hero">
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="wrap hero-inner" dangerouslySetInnerHTML={{ __html: heroInnerHtml }} />
        </section>

        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      </main>

      <Footer showGoodfirmsBadge />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="home-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
