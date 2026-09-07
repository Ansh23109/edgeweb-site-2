import Script from 'next/script';
import Header from '../../components/Header';
import MobileMenu from '../../components/MobileMenu';
import Footer from '../../components/Footer';
import StickyCtas from '../../components/StickyCtas';
import DiscoveryModal from '../../components/DiscoveryModal';
import ChromeEffects from '../../components/ChromeEffects';
import JsonLd from '../../components/JsonLd';
import { readContent } from '../../lib/content';
import { breadcrumbSchema } from '../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Case Studies | Retail, Fintech & Healthcare Systems | EdgeWeb',
  description:
    'Real EdgeWeb projects in retail inventory platforms, fintech onboarding automation and healthcare scheduling infrastructure — with the outcomes that came from them.',
  alternates: { canonical: absoluteUrl('/case-studies') },
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Case Studies | Retail, Fintech & Healthcare Systems',
    description:
      "Systems we've shipped for businesses in retail, financial services and healthcare.",
    url: absoluteUrl('/case-studies'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb case studies' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('home/style.css') + '\n' + readContent('shared/page-intro.css');
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

      <main id="top" dangerouslySetInnerHTML={{ __html: mainHtml }} />

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="case-studies-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
