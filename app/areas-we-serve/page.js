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
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL, SERVICE_PAGES } from '../../lib/site';
import {
  INDIA_STATES,
  INDIA_UTS,
  USA_STATES,
  EUROPE_COUNTRIES,
  AUSTRALIA_STATES,
  slugify,
} from '../../lib/regions';

export const metadata = {
  title: 'Areas We Serve: India, USA, Europe & Australia | EdgeWeb',
  description:
    'Web development, app development, SEO & AI automation for businesses in all 28 Indian states and 8 UTs, every US state, Europe and Australia. Remote-first.',
  alternates: { canonical: absoluteUrl('/areas-we-serve') },
  keywords:
    'web development company near me, best SEO expert near me, digital marketing agency near me, app development company near me, software development company near me, website designer near me, SEO services near me, web development company in India, best digital marketing agency in India, web development company USA, SEO agency USA, web development company UK, digital agency Europe, web development company Australia, SEO expert Australia, hire web developers India, affordable web development company, custom software development company, AI automation agency',
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Areas We Serve: India, USA, Europe & Australia | EdgeWeb',
    description:
      'A Delhi-based, remote-first web, app, SEO and automation team serving every Indian state, every US state, Europe and Australia.',
    url: absoluteUrl('/areas-we-serve'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb service areas — India, USA, Europe and Australia' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('services-detail/style.css') + `
  .areas-jump{ display:flex; gap:10px; flex-wrap:wrap; margin-top:32px; }
  .areas-jump a{ border:1px solid var(--line-strong); border-radius:100px; padding:9px 18px; font-size:13px; color:var(--ink-dim); transition:color .2s ease, border-color .2s ease; }
  .areas-jump a:hover{ color:var(--ink); border-color:var(--ink); }
  .areas-sub{ font-size:12px; letter-spacing:0.06em; text-transform:uppercase; color:var(--ink-faint); margin:44px 0 18px; }
  .area-cell p .c{ color:var(--ink-dim); }
  .area-grid{ background:none !important; gap:0 !important; border:none !important; border-top:1px solid var(--line) !important; border-left:1px solid var(--line) !important; }
  .area-grid .use-case{ border-right:1px solid var(--line); border-bottom:1px solid var(--line); }
`;
const script = readContent('services-detail/script.js');

const FAQS = [
  {
    q: 'Who is the best SEO expert near me?',
    a: "\"Near me\" results depend on where you're searching from and on Google Business Profiles, so no agency can honestly claim to be nearest to everyone. What EdgeWeb can say: we're a Delhi-based team delivering SEO, web development and app development remote-first to businesses in every state and region listed on this page, and meeting in person across Delhi NCR.",
  },
  {
    q: 'Do you provide web development and digital marketing services in my state or country?',
    a: 'Yes. EdgeWeb delivers remote-first to businesses across all 28 Indian states and 8 union territories, every US state, Europe and Australia. Work runs on scheduled calls inside your working hours, so your location does not change the process or the quality.',
  },
  {
    q: 'Do you have an office in my city?',
    a: "EdgeWeb is headquartered in Vishwas Nagar, Delhi, India. Outside Delhi NCR we work remote-first rather than through local offices, which is why our projects don't carry a location premium. For clients in Delhi, Gurgaon, Noida, Faridabad and Ghaziabad we're happy to meet in person.",
  },
  {
    q: 'Does the price change depending on where my business is?',
    a: 'Pricing follows scope — pages, features, integrations and timeline — not your location. Our guide to what custom software actually costs gives realistic ranges you can compare any quote against, including ours.',
  },
  {
    q: 'Can you work with my time zone in the USA, Europe or Australia?',
    a: 'Yes. We schedule live calls that overlap with your working hours and keep asynchronous updates flowing in between, so projects for US, European and Australian clients run as smoothly as those for clients in India.',
  },
];

const REGIONS = [
  {
    id: 'india',
    label: 'India',
    h2: 'Web development, app development & SEO in India — all 28 states and 8 union territories',
    intro:
      "EdgeWeb has been building websites, apps, custom software and running digital marketing from Delhi since 2019. Whether you're a startup in Bengaluru, a manufacturer in Gujarat or a tourism business in Goa, you get the same architecture-first process, delivered remote-first, with in-person meetings across Delhi NCR.",
    groups: [
      { title: 'States', items: INDIA_STATES },
      { title: 'Union territories', items: INDIA_UTS },
    ],
    service: 'web development company in India',
  },
  {
    id: 'usa',
    label: 'USA',
    h2: 'Web development, app development & SEO for businesses in every US state',
    intro:
      "From California technology companies to Texas energy firms and Florida hospitality groups, EdgeWeb delivers websites, custom software, AI automation and SEO to US businesses remote-first, with calls scheduled inside your working hours.",
    groups: [{ title: 'States', items: USA_STATES }],
    service: 'web development company in the USA',
  },
  {
    id: 'europe',
    label: 'Europe',
    h2: 'Web development, app development & digital marketing across Europe',
    intro:
      "EdgeWeb works with businesses across the United Kingdom and mainland Europe — from London fintechs to Berlin manufacturers and Nordic technology teams — delivering websites, custom software, automation and SEO with GDPR-aware practices.",
    groups: [{ title: 'Countries', items: EUROPE_COUNTRIES }],
    service: 'digital agency in Europe',
  },
  {
    id: 'australia',
    label: 'Australia',
    h2: 'Web development, app development & SEO across Australia',
    intro:
      "From Sydney professional services to Perth mining suppliers and Melbourne healthcare providers, EdgeWeb delivers websites, custom software, automation and SEO to Australian businesses remote-first, with calls that fit Australian time zones.",
    groups: [{ title: 'States and territories', items: AUSTRALIA_STATES }],
    service: 'web development company in Australia',
  },
];

function areaServedSchema() {
  const place = (type, [name]) => ({ '@type': type, name });
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/areas-we-serve#service`,
    serviceType: 'Web development, app development, custom software, AI automation and digital marketing',
    provider: { '@id': `${SITE_URL}/#organization` },
    url: absoluteUrl('/areas-we-serve'),
    areaServed: [
      { '@type': 'Country', name: 'India' },
      ...INDIA_STATES.map((s) => place('State', s)),
      ...INDIA_UTS.map((s) => place('AdministrativeArea', s)),
      { '@type': 'Country', name: 'United States' },
      ...USA_STATES.map((s) => place('State', s)),
      ...EUROPE_COUNTRIES.map((s) => place('Country', s)),
      { '@type': 'Country', name: 'Australia' },
      ...AUSTRALIA_STATES.map((s) => place('State', s)),
    ],
  };
}

function AreaCard({ entry }) {
  const [name, cities, industries] = entry;
  return (
    <div className="use-case area-cell" id={slugify(name)}>
      <h4>{name}</h4>
      <p>
        <span className="c">{cities}</span> — websites, apps, SEO and automation for {industries} businesses.
      </p>
    </div>
  );
}

export default function AreasWeServePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Areas We Serve', path: '/areas-we-serve' }]),
          areaServedSchema(),
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
              <a href="/">Home</a><span>/</span><span>Areas We Serve</span>
            </div>
            <p className="eyebrow">EdgeWeb / Areas We Serve</p>
            <h1 className="display-xl" style={{ marginTop: 26 }}>
              A web &amp; digital<br />agency for businesses<br /><i>everywhere you are.</i>
            </h1>
            <p className="body-lg" style={{ marginTop: 26, maxWidth: '70ch' }}>
              Looking for a web development company, app developer or SEO expert near you? EdgeWeb is a Delhi-based, remote-first team serving businesses across every Indian state and union territory, every US state, Europe and Australia — the same process and the same senior team wherever you are.
            </p>
            <div className="areas-jump">
              {REGIONS.map((r) => (
                <a key={r.id} href={`#${r.id}`}>{r.label}</a>
              ))}
              <a href="#faq">FAQ</a>
            </div>
            <div className="hero-actions" style={{ marginTop: 36 }}>
              <a href="/consultation" className="btn btn-primary magnetic" data-cursor="Open" data-track="cta_areas_hero_consultation">
                Book a free 1:1 call
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <a href="/contact" className="btn btn-ghost magnetic" data-cursor="Open" data-track="cta_areas_hero_contact">Start a conversation</a>
            </div>
          </div>
        </section>

        <section className="detail-block">
          <div className="wrap">
            <p className="eyebrow reveal">How This Works</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>Local expertise, without the local-office markup.</h2>
            <div className="problem-solution reveal" style={{ marginTop: 32 }}>
              <div className="ps-cell">
                <h3>Remote-first, everywhere</h3>
                <p className="body">EdgeWeb is headquartered in Vishwas Nagar, Delhi. Everywhere else, we work through scheduled calls, shared project channels and weekly demos — so the process is identical whether you're in Kochi, Chicago, Manchester or Melbourne.</p>
              </div>
              <div className="ps-cell">
                <h3>In person across Delhi NCR</h3>
                <p className="body">For businesses in Delhi, Gurgaon, Noida, Faridabad and Ghaziabad we're happy to meet face to face — see our <a href="/delhi-ncr">Delhi NCR page</a>. For everyone else, we don't pretend to have a local office we don't have.</p>
              </div>
            </div>
          </div>
        </section>

        {REGIONS.map((region, i) => (
          <section key={region.id} id={region.id} className={`detail-block${i % 2 === 0 ? ' section-alt' : ''}`}>
            <div className="wrap">
              <p className="eyebrow reveal">{region.label}</p>
              <h2 className="reveal" style={{ marginTop: 14, maxWidth: '34ch' }}>{region.h2}</h2>
              <p className="body reveal" style={{ marginTop: 18, maxWidth: '68ch' }}>{region.intro}</p>
              {region.groups.map((g) => (
                <div key={g.title}>
                  <p className="areas-sub reveal">{g.title} ({g.items.length})</p>
                  <div className="use-case-grid area-grid reveal">
                    {g.items.map((entry) => (
                      <AreaCard key={entry[0]} entry={entry} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="detail-block">
          <div className="wrap">
            <p className="eyebrow reveal">What We Deliver in Every Region</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>Eight services, one team.</h2>
            <div className="capability-list reveal" style={{ marginTop: 36 }}>
              {SERVICE_PAGES.map((s) => (
                <div className="cap-cell" key={s.slug}>
                  <h4><a href={`/services/${s.slug}`}>{s.name}</a></h4>
                  <p>{s.schemaDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="detail-block section-alt">
          <div className="wrap">
            <p className="eyebrow reveal">FAQ</p>
            <h2 className="reveal" style={{ marginTop: 14 }}>Questions we get from businesses looking for an agency.</h2>
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
            <h2 className="display-xl reveal">Wherever you are,<br /><i>let's talk.</i></h2>
            <div className="final-cta-row reveal">
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="/contact" className="btn btn-primary magnetic" data-cursor="Open" data-track="cta_areas_final">
                  Start a conversation
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a href="https://wa.me/919266726490?text=Hi%20EdgeWeb%2C%20I%27m%20looking%20for%20a%20web%20development%20%2F%20SEO%20agency." className="btn btn-ghost magnetic" target="_blank" rel="noopener" data-track="cta_whatsapp_areas">Prefer WhatsApp? Chat with EdgeWeb →</a>
                <a href="/consultation" className="btn btn-ghost magnetic" data-cursor="Open" data-track="cta_consultation_areas">Not sure yet? Book a free 1:1 call →</a>
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

      <Script id="areas-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
