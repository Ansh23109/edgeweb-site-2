import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  LINKEDIN_URL,
  absoluteUrl,
  SERVICE_PAGES,
  BUSINESS_ADDRESS,
  DELHI_NCR_CITIES,
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
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'India' },
    ],
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_ADDRESS,
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

// Local-relevance schema for the /delhi-ncr page specifically — same
// underlying entity as organizationSchema() (shares its @id via
// parentOrganization) but with city-level areaServed for local-pack /
// "near me" relevance, which would be too narrow to put on every page.
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/delhi-ncr#localbusiness`,
    name: `${SITE_NAME} — Delhi NCR`,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    url: absoluteUrl('/delhi-ncr'),
    image: `${SITE_URL}/logo-edgeweb.png`,
    telephone: CONTACT_PHONE_E164,
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_ADDRESS,
    },
    areaServed: DELHI_NCR_CITIES.map((name) => ({ '@type': 'City', name })),
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

// Person schema for standalone founder/team bio pages (e.g. /founder-*).
// These pages don't share the main site's JsonLd/breadcrumb chrome — each
// call site supplies its own real facts (no fabricated employment history).
export function personSchema({ name, jobTitle, url, sameAs = [], description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    description,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

// BlogPosting schema for /blog/[slug] articles. Authored by the EdgeWeb
// team collectively (Organization as author), not attributed to a
// specific person unless a post is actually bylined.
export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
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

// Section 7.4b — the dedicated /faq page carries a longer, more specific
// list than the homepage's condensed HOME_FAQS. Kept as its own array
// (rather than extending HOME_FAQS) so the homepage's FAQPage schema stays
// an exact match for its own shorter on-page list.
export const FAQ_PAGE_FAQS = [
  ...HOME_FAQS,
  {
    q: 'How much does a project with EdgeWeb cost?',
    a: "It depends on scope — a marketing website costs far less than a multi-module platform with integrations, and we won't know which one you need until we understand the problem. We scope in phases and give a fixed quote per phase before that phase starts, so there's no open-ended billing.",
  },
  {
    q: 'What technologies does EdgeWeb build with?',
    a: 'We choose the stack for the problem rather than a fixed toolkit. Common choices include React and Next.js for web, React Native or native iOS/Android for mobile, Node.js and Python for backend services, PostgreSQL or MongoDB for data, and AWS, GCP or Azure for infrastructure.',
  },
  {
    q: 'Who owns the code and intellectual property once the project ships?',
    a: 'You do. Once a project is paid for in full, all source code, designs and infrastructure configuration belong to you outright — there is no vendor lock-in or ongoing licence fee to keep using what we build.',
  },
  {
    q: 'How do you communicate with clients during a project?',
    a: 'A weekly call plus a shared project channel — Slack, WhatsApp or email, whichever you prefer — for day-to-day updates. You always know what has shipped, what is in progress and what is next.',
  },
  {
    q: 'Do you sign NDAs and handle confidential business data?',
    a: 'Yes. We routinely sign NDAs before scoping calls that involve sensitive data or internal systems, and some of our case studies remain confidential at the client\'s request rather than published in full detail.',
  },
  {
    q: 'Can you work with clients across different time zones?',
    a: 'Yes — most of our clients are outside India, across the USA, UK, Europe and Australia. We schedule live calls that overlap with your working hours and keep async updates flowing in between.',
  },
  {
    q: 'What if we already have an in-house development team?',
    a: 'We can plug in alongside an existing team — building a specific module, unblocking a stalled project, or handling the parts your team does not have the bandwidth or specialist skill for.',
  },
  {
    q: 'Do you only build new systems, or can you fix or extend an existing one?',
    a: 'Both. A large share of our work is untangling or extending systems that already exist — legacy platforms, a half-finished build from another vendor, or tools that no longer scale.',
  },
  {
    q: 'What happens if we need changes after launch?',
    a: 'Minor fixes are covered under the post-launch support window. Larger changes are scoped and quoted the same way the original build was — clearly, before any work starts.',
  },
  {
    q: 'Is there a minimum project size you take on?',
    a: "We're set up for meaningful builds, typically starting around a few weeks of committed work. If what you need is smaller than that, we'll tell you honestly rather than stretching it into a bigger engagement.",
  },
  {
    q: 'How is EdgeWeb different from hiring a freelancer or a larger agency?',
    a: 'A freelancer usually covers one skill; a larger agency often rotates a shared bench across many accounts. EdgeWeb keeps one senior team on the architecture through delivery, so a decision made in week one is still understood in week twelve.',
  },
];
