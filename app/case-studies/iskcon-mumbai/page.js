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
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../../lib/site';

export const metadata = {
  title: 'ISKCON Mumbai Bureau Case Study — Web Platform & Learning Video Portal | EdgeWeb',
  description:
    'How EdgeWeb built a website and a MERN learning-video management portal for the Bureau of ISKCON Mumbai, delivered under NDA for its trustees.',
  alternates: { canonical: absoluteUrl('/case-studies/iskcon-mumbai') },
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'ISKCON Mumbai Bureau Case Study — Web Platform & Learning Video Portal | EdgeWeb',
    description: 'A website and a MERN learning-video management portal EdgeWeb built for the Bureau of ISKCON Mumbai, under NDA for its trustees.',
    url: absoluteUrl('/case-studies/iskcon-mumbai'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb — ISKCON Mumbai Bureau case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/iskcon-mumbai/hero-inner.html');
const mainHtml = readContent('case-studies/iskcon-mumbai/main.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: "Why isn't there a live link or screenshots for this project?", a: "This was built under NDA for the Bureau of ISKCON Mumbai. EdgeWeb has permission to name the client and describe the work at a high level, but the interface and specifics remain internal to the Bureau." },
  { q: 'Who is this platform for?', a: "An internal system built for the Bureau's trustees, not a public-facing product." },
  { q: 'What does the learning video portal actually manage?', a: "It centralizes the Bureau's training video content in one place — uploaded, organized and retrievable — instead of files and links spread across drives and message threads." },
  { q: "What's the tech stack?", a: 'A full MERN stack: MongoDB for data, Express and Node.js for the API layer, and React for the interface.' },
];

export default function IskconMumbaiCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'ISKCON Mumbai Bureau', path: '/case-studies/iskcon-mumbai' },
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

        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="iskcon-mumbai-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
