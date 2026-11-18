import Script from 'next/script';
import Header from '../../components/Header';
import MobileMenu from '../../components/MobileMenu';
import Footer from '../../components/Footer';
import StickyCtas from '../../components/StickyCtas';
import DiscoveryModal from '../../components/DiscoveryModal';
import ChromeEffects from '../../components/ChromeEffects';
import HeroVortex from '../../components/HeroVortex';
import JsonLd from '../../components/JsonLd';
import CostCalculator from '../../components/CostCalculator';
import { readContent } from '../../lib/content';
import { breadcrumbSchema, faqSchema } from '../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Free Software Cost Calculator | EdgeWeb',
  description:
    'A free, instant custom software and website cost estimate. No email required — built from the same real ranges published in our cost guide.',
  alternates: { canonical: absoluteUrl('/cost-calculator') },
  keywords:
    'software development cost calculator, website cost calculator, app development cost estimate, custom software price estimator, free project cost calculator',
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Free Software Cost Calculator | EdgeWeb',
    description: 'A free, instant estimate for your software, app or website project — no email required.',
    url: absoluteUrl('/cost-calculator'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb free software cost calculator' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css') + `
  .calc-wrap{ max-width:720px; }
  .calc-result{ margin-top:12px; padding:36px; border:1px solid var(--line-strong); border-radius:var(--radius, 8px); background:var(--bg-raised); }
  .calc-range{ font-family:var(--f-display); font-style:italic; font-size:clamp(34px,5vw,52px); color:var(--accent-bright); margin:0; line-height:1.1; }
  .calc-timeline{ font-size:14px; color:var(--ink-faint); margin:8px 0 0; }
`;
const heroInnerHtml = readContent('cost-calculator/hero-inner.html');
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Is this calculator accurate?', a: "It gives a realistic starting range based on the same figures published in our cost guide. The real number depends on specifics a calculator can't see — exact scope, your existing systems, the specific integrations. Use it to sanity-check any quote, including ours, not as a binding estimate." },
  { q: "Why isn't there an exact price?", a: 'Because an honest price needs a real conversation about what you\'re building. A number given before that conversation is either a guess or padded for risk — see our guide on red flags in a quote for more on this.' },
  { q: 'Does using this calculator send my information anywhere?', a: 'No. It runs entirely in your browser. Nothing is submitted or stored unless you choose to book a call afterward.' },
  { q: 'What affects the price the most?', a: 'Scope — how many distinct things the project needs to do — usually matters more than any single factor in this calculator. See our full cost guide for the complete breakdown.' },
];

export default function CostCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Cost Calculator', path: '/cost-calculator' }]),
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

        <section className="detail-block">
          <div className="wrap">
            <CostCalculator />
          </div>
        </section>

        <section className="detail-block section-alt">
          <div className="wrap">
            <p className="eyebrow reveal">FAQ</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>Questions about this calculator.</h2>
            <div className="faq-list reveal" style={{ marginTop: 28 }}>
              {FAQS.map((f, i) => (
                <details className="faq-item" key={f.q} open={i === 0}>
                  <summary>{f.q}<span className="faq-icon"></span></summary>
                  <p className="body">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-alt final-cta">
          <div className="wrap">
            <p className="eyebrow reveal" style={{ marginBottom: 30 }}>Start a Conversation</p>
            <h2 className="display-xl reveal">Want the<br /><i>real number?</i></h2>
            <div className="final-cta-row reveal">
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="/contact" className="btn btn-primary magnetic" data-cursor="Open" data-track="cta_calculator_final">
                  Start a conversation
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a href="https://wa.me/919266726490?text=Hi%20EdgeWeb%2C%20I%27d%20like%20an%20actual%20quote%20for%20my%20project." className="btn btn-ghost magnetic" target="_blank" rel="noopener" data-track="cta_whatsapp_calculator">Prefer WhatsApp? Chat with EdgeWeb →</a>
                <a href="/consultation" className="btn btn-ghost magnetic" data-cursor="Open" data-track="cta_consultation_calculator">Not sure yet? Book a free 1:1 call →</a>
              </div>
              <div className="final-contact">
                <a href="mailto:info@edgeweb.co">info@edgeweb.co</a>
                <a href="tel:+919266726490">+91 92667 26490</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="cost-calculator-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
