import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  LINKEDIN_URL,
  absoluteUrl,
  SERVICE_PAGES,
} from './site';

// Section 7.1 — Organization / ProfessionalService (site-wide).
// ProfessionalService (not LocalBusiness) because EdgeWeb serves global
// remote clients rather than physical-visit customers.
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_LEGAL_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo-edgeweb.png`,
    image: `${SITE_URL}/logo-edgeweb.png`,
    description:
      'EdgeWeb is a full-stack technology solutions company building custom websites, software, AI automation and digital growth systems for businesses in the USA, Europe, Australia and India.',
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_E164,
    foundingDate: '2019',
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'India' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [LINKEDIN_URL],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'EdgeWeb Services',
      itemListElement: SERVICE_PAGES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name },
      })),
    },
  };
}

// Section 7.2 — WebSite (homepage only).
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

// Section 7.3 — Service schema, one per service page.
export function serviceSchema(servicePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: servicePage.serviceType,
    name: servicePage.schemaName,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['United States', 'United Kingdom', 'Australia', 'India'],
    description: servicePage.schemaDescription,
    url: absoluteUrl(`/services/${servicePage.slug}`),
  };
}

// Section 7.4 — FAQPage (homepage), mirrors the on-page FAQ exactly.
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// Section 7.5 — BreadcrumbList. `trail` is an array of { name, path }.
export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const HOME_FAQS = [
  {
    q: 'What does EdgeWeb actually build?',
    a: "Custom web and mobile applications, process automation, applied AI, cloud infrastructure and the data layer connecting them — plus the digital marketing to bring the right traffic once it's live.",
  },
  {
    q: 'How does a project usually start?',
    a: 'Projects begin with discussions about actual business problems rather than feature lists, followed by architecture planning before coding begins.',
  },
  {
    q: 'Do you work with early-stage businesses, or only established ones?',
    a: 'EdgeWeb serves both early-stage teams needing a single product built well and established businesses requiring system integration or replacement.',
  },
  {
    q: "What's the typical engagement length?",
    a: 'Most builds run 6–16 weeks depending on scope. We scope in phases so you see a working system early, rather than waiting for one large release.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes, most clients maintain support or iteration arrangements post-launch to test architecture decisions against real usage.',
  },
  {
    q: 'Where is EdgeWeb based, and do you work with clients outside India?',
    a: 'EdgeWeb operates from India but serves both local and international clients through remote-first delivery.',
  },
];
