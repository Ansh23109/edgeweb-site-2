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
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Case Studies: Golf Garage, Retail, Fintech & More | EdgeWeb',
  description:
    "Real EdgeWeb work — from Golf Garage's brand and Shopify build to retail, fintech and healthcare systems — with the outcomes that came from them.",
  alternates: { canonical: absoluteUrl('/case-studies') },
  keywords:
    'software agency case studies USA, web development case studies Australia, custom software case studies Europe, IT agency portfolio India, EdgeWeb client work',
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

const FAQS = [
  { q: 'Are these real clients, or composite examples?', a: "Every client case study on this page is a real EdgeWeb engagement. The exception is ScrapGrid, which is a SaaS product EdgeWeb designed itself and is labelled as such. A small number of client details are described in general terms at the client's request — never invented." },
  { q: "Why don't some case studies name the client?", a: "A few engagements are confidential by contract — most commonly in fintech, healthcare and institutional work, where the client's own policy restricts what can be published publicly. We still describe the real problem and the real outcome, without the name." },
  { q: 'Do you have a case study from my industry?', a: "The work here spans retail, financial services, healthcare, consumer brands, nonprofits and physical infrastructure. If your industry isn't represented yet, the same architecture-first approach applies regardless." },
  { q: 'Can I talk to a past client as a reference?', a: "For engagements where the client has agreed to be a reference, yes — ask us on a call and we'll make the introduction where it's possible." },
];

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }]),
          faqSchema(FAQS),
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

      <Script id="case-studies-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
