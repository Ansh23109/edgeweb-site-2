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
  title: 'Chaaya Furniture Case Study: SEO & Ads | EdgeWeb',
  description:
    'How EdgeWeb runs SEO, paid ads management and conversion improvements for Chaaya Furniture, an ongoing engagement growing site visitors and conversions.',
  alternates: { canonical: absoluteUrl('/case-studies/chaaya-furniture') },
  keywords:
    'SEO case study, furniture SEO case study, ads management case study, conversion rate optimization case study, digital marketing case study, furniture website marketing',
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'Chaaya Furniture Case Study: SEO & Ads | EdgeWeb',
    description: 'An ongoing SEO, ads management and conversion engagement improving site visitors and conversions for Chaaya Furniture.',
    url: absoluteUrl('/case-studies/chaaya-furniture'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb — Chaaya Furniture case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/chaaya-furniture/hero-inner.html');
const mainHtml = readContent('case-studies/chaaya-furniture/main.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Is this engagement still running?', a: 'Yes. Chaaya Furniture is an active client, and the SEO, ads management and conversion work is ongoing rather than a finished project.' },
  { q: "Why doesn't this case study list specific numbers?", a: "Because the results are still moving. We'd rather describe the direction honestly than print figures that are out of date by the time you read them. Ask us on a call what we track and how we report it." },
  { q: 'What did EdgeWeb actually do for Chaaya Furniture?', a: 'Search engine optimisation, paid ads management and conversion improvements on the website, run together so each supports the others.' },
  { q: 'Can EdgeWeb do the same for my business?', a: 'If you sell products or services online and want more of the right visitors and a better share of them converting, yes. Start with our Digital Marketing service or a free 1:1 call.' },
];

export default function ChaayaFurnitureCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'Chaaya Furniture', path: '/case-studies/chaaya-furniture' },
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

      <Script id="chaaya-furniture-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
