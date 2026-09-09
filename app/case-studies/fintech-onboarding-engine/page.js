import Script from 'next/script';
import Header from '../../../components/Header';
import MobileMenu from '../../../components/MobileMenu';
import Footer from '../../../components/Footer';
import StickyCtas from '../../../components/StickyCtas';
import DiscoveryModal from '../../../components/DiscoveryModal';
import ChromeEffects from '../../../components/ChromeEffects';
import HeroVortex from '../../../components/HeroVortex';
import OnboardingPipelineSimulator from '../../../components/OnboardingPipelineSimulator';
import JsonLd from '../../../components/JsonLd';
import { readContent } from '../../../lib/content';
import { breadcrumbSchema, faqSchema } from '../../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../../lib/site';

export const metadata = {
  title: 'Fintech Onboarding Engine Case Study | EdgeWeb',
  description:
    'How EdgeWeb built a document AI pipeline that reads, validates and scores customer onboarding submissions automatically for a USA-based financial services company — with a live decision-logic demo.',
  alternates: { canonical: absoluteUrl('/case-studies/fintech-onboarding-engine') },
  openGraph: {
    type: 'article',
    siteName: 'EdgeWeb',
    title: 'Fintech Onboarding Engine Case Study | EdgeWeb',
    description: 'A document AI onboarding pipeline for a USA-based financial services company.',
    url: absoluteUrl('/case-studies/fintech-onboarding-engine'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb fintech onboarding engine case study' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css');
const heroInnerHtml = readContent('case-studies/fintech-onboarding-engine/hero-inner.html');
const beforeWidgetHtml = readContent('case-studies/fintech-onboarding-engine/before-widget.html');
const afterWidgetHtml = readContent('case-studies/fintech-onboarding-engine/after-widget.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Does this loosen compliance to move faster?', a: 'No — every check a reviewer used to run manually still runs, just automatically. Anything uncertain still reaches a human.' },
  { q: 'What happens to the submissions that get flagged?', a: "They land in a reviewer's queue with the specific failed check already highlighted." },
  { q: 'Can the validation rules be changed later?', a: 'Yes — rules and confidence thresholds are configured, not hardcoded.' },
  { q: 'How long did a project like this take?', a: 'An initial pipeline covering the core document types typically takes 10–14 weeks.' },
];

export default function FintechOnboardingCaseStudy() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Case Studies', path: '/case-studies' },
            { name: 'Fintech Onboarding Engine', path: '/case-studies/fintech-onboarding-engine' },
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

        <div dangerouslySetInnerHTML={{ __html: beforeWidgetHtml }} />

        <section id="onboarding-pipeline" className="detail-block section-alt">
          <div className="wrap">
            <p className="eyebrow reveal">Try It</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>Run the onboarding pipeline.</h2>
            <p className="body reveal" style={{ marginTop: 14, marginBottom: 32, maxWidth: '70ch' }}>
              This runs the same validation and routing logic as the production system. Submit a clean document to
              see the auto-approve path, or a mismatched one to see exactly what gets flagged and why.
            </p>
            <div className="reveal">
              <OnboardingPipelineSimulator />
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: afterWidgetHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="fintech-case-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
