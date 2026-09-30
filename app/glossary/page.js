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
import { breadcrumbSchema, faqSchema, glossarySchema } from '../../lib/schema';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';
import { GLOSSARY, allGlossaryTerms } from '../../lib/glossary';

export const metadata = {
  title: 'Glossary: Software, Web & SEO Terms Explained | EdgeWeb',
  description:
    'Plain-English definitions of 40+ software, web development, SEO, AI and business terms — from MVP and API to Core Web Vitals and multi-tenant architecture.',
  alternates: { canonical: absoluteUrl('/glossary') },
  keywords:
    'software development glossary, web development terms explained, SEO glossary, what is MVP, what is API, what is technical SEO, what is low-code, software terms for business owners, tech glossary',
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Glossary: Software, Web & SEO Terms Explained | EdgeWeb',
    description: 'Plain-English definitions of the software, web, SEO, AI and business terms that come up before and during a project.',
    url: absoluteUrl('/glossary'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb glossary' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css') + `
  .gloss-jump{ display:flex; gap:10px; flex-wrap:wrap; margin-top:32px; }
  .gloss-jump a{ border:1px solid var(--line-strong); border-radius:100px; padding:9px 18px; font-size:13px; color:var(--ink-dim); transition:color .2s ease, border-color .2s ease; }
  .gloss-jump a:hover{ color:var(--ink); border-color:var(--ink); }
  .gloss-list{ margin-top:36px; border-top:1px solid var(--line); }
  .gloss-item{ padding:26px 0; border-bottom:1px solid var(--line); scroll-margin-top:110px; }
  .gloss-item dt{ font-family:var(--f-body); font-weight:700; font-size:17px; color:var(--ink); }
  .gloss-item dd{ margin:10px 0 0; font-size:15px; line-height:1.7; color:var(--ink-dim); max-width:68ch; }
  .gloss-item dd a{ color:var(--ink); text-decoration:underline; text-decoration-color:var(--line-strong); }
  .gloss-item dd a:hover{ text-decoration-color:var(--accent-bright); }
`;
const script = readContent('services-detail/script.js');

const FAQS = [
  { q: 'Who is this glossary for?', a: "Business owners and founders who want a plain-English answer to a term that came up in a proposal, a call or an article — not a computer science reference." },
  { q: 'Is this list complete?', a: "No single glossary is exhaustive. This covers the terms that come up most often in the kind of software, web and marketing projects EdgeWeb builds. If a term you're looking for isn't here, ask us directly." },
  { q: "Can I request a term to be added?", a: "Yes — message us the term and we'll add a plain definition if it's relevant to software, web development, SEO, AI automation or working with an agency." },
];

export default function GlossaryPage() {
  const terms = allGlossaryTerms();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary' }]),
          glossarySchema(terms),
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
          <div className="wrap">
            <div className="breadcrumb">
              <a href="/">Home</a><span>/</span><span>Glossary</span>
            </div>
            <p className="eyebrow">EdgeWeb / Glossary</p>
            <h1 className="display-xl" style={{ marginTop: 26 }}>
              Software &amp; web terms,<br />explained <i>plainly.</i>
            </h1>
            <p className="body-lg" style={{ marginTop: 26, maxWidth: '70ch' }}>
              {terms.length}+ terms that come up before and during a software, web or marketing project — from MVP and API to Core Web Vitals and multi-tenant architecture — defined without jargon, with links to where we cover each one in more depth.
            </p>
            <div className="gloss-jump">
              {GLOSSARY.map((g) => (
                <a key={g.category} href={`#${g.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{g.category}</a>
              ))}
              <a href="#faq">FAQ</a>
            </div>
          </div>
        </section>

        {GLOSSARY.map((group, i) => (
          <section
            key={group.category}
            id={group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            className={`detail-block${i % 2 === 0 ? ' section-alt' : ''}`}
          >
            <div className="wrap">
              <p className="eyebrow reveal">{group.category}</p>
              <dl className="gloss-list reveal">
                {group.terms.map((t) => (
                  <div className="gloss-item" id={t.slug} key={t.slug}>
                    <dt>{t.term}</dt>
                    <dd>
                      {t.def}
                      {t.link && (
                        <>
                          {' '}
                          <a href={t.link.href}>{t.link.label} →</a>
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ))}

        <section id="faq" className={`detail-block${GLOSSARY.length % 2 === 0 ? ' section-alt' : ''}`}>
          <div className="wrap">
            <p className="eyebrow reveal">FAQ</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>Questions about this glossary.</h2>
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
            <h2 className="display-xl reveal">Term not here?<br /><i>Just ask.</i></h2>
            <div className="final-cta-row reveal">
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="/contact" className="btn btn-primary magnetic" data-cursor="Open" data-track="cta_glossary_final">
                  Start a conversation
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a href="https://wa.me/919266726490?text=Hi%20EdgeWeb%2C%20I%20have%20a%20question%20about%20a%20term." className="btn btn-ghost magnetic" target="_blank" rel="noopener" data-track="cta_whatsapp_glossary">Prefer WhatsApp? Chat with EdgeWeb →</a>
                <a href="/consultation" className="btn btn-ghost magnetic" data-cursor="Open" data-track="cta_consultation_glossary">Not sure yet? Book a free 1:1 call →</a>
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

      <Script id="glossary-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
