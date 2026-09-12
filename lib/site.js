// Central site constants — single source of truth for the domain, contact
// details and nav structure used across metadata, JSON-LD and shared chrome.

export const SITE_URL = 'https://www.edgeweb.co';
export const SITE_NAME = 'EdgeWeb';
export const SITE_LEGAL_NAME = 'EdgeWeb Infotech LLP';
export const CONTACT_EMAIL = 'info@edgeweb.co';
export const CONTACT_PHONE_DISPLAY = '+91 92667 26490';
export const CONTACT_PHONE_E164 = '+919266726490';
export const WHATSAPP_URL =
  'https://wa.me/919266726490?text=Hi%20EdgeWeb%2C%20I%27m%20interested%20in%20discussing%20a%20project.';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/edgeweb/';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image-edgeweb-home.jpg`;

// Real office address (Delhi NCR) — used for NAP consistency across the
// footer, contact page and structured data. Only the fields actually known
// are filled in; no street/building number is fabricated.
export const BUSINESS_ADDRESS = {
  streetAddress: 'Vishwas Nagar',
  addressLocality: 'Delhi',
  addressRegion: 'DL',
  postalCode: '110032',
  addressCountry: 'IN',
};
export const BUSINESS_ADDRESS_DISPLAY = 'Vishwas Nagar, Delhi 110032, India';

export const DELHI_NCR_CITIES = ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'];

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

// Primary site nav — used by the Header and MobileMenu everywhere.
// About / Case Studies / FAQ point at their own indexable pages
// (see SEO audit §3.3) rather than homepage anchors.
export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'FAQ', href: '/faq' },
];

export const FOOTER_EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Delhi NCR', href: '/delhi-ncr' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_SERVICE_LINKS = [
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'App Development', href: '/services/app-development' },
  { label: 'Custom Software', href: '/services/custom-software' },
  { label: 'AI & Automation', href: '/services/ai-automation' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Branding & UI/UX', href: '/services/branding-ui-ux' },
  { label: 'Low-Code / No-Code', href: '/services/low-code-no-code' },
  { label: 'Custom Solutions', href: '/services/custom-solutions' },
];

export const SERVICE_PAGES = [
  {
    slug: 'web-development',
    name: 'Web Development',
    serviceType: 'Web Development',
    schemaName: 'Custom Web Development Services',
    title: 'Custom Website Development Company | EdgeWeb',
    description:
      "EdgeWeb has built 120+ websites and web platforms — including the system that cut one retailer's daily stock reconciliation from 6 hours to zero.",
    schemaDescription:
      'Corporate and high-performance website design and development, custom web applications, CRM/ERP portals and dashboards.',
  },
  {
    slug: 'app-development',
    name: 'App Development',
    serviceType: 'App Development',
    schemaName: 'Mobile & Cross-Platform App Development Services',
    title: 'Mobile App Development Company | iOS, Android & React Native',
    description:
      'iOS, Android and cross-platform apps from the team behind 120+ delivered digital products for businesses in the USA, Europe, Australia & India.',
    schemaDescription:
      'iOS, Android, cross-platform and React Native app development, covering both business/internal apps and customer-facing apps, from MVP through full product.',
  },
  {
    slug: 'custom-software',
    name: 'Custom Software',
    serviceType: 'Custom Software Development',
    schemaName: 'Custom Enterprise Software Development Services',
    title: 'Custom Software Development Company | EdgeWeb',
    description:
      'Enterprise software and legacy modernization — part of the 340+ workflows EdgeWeb has automated and the 38% average drop in manual hours that followed.',
    schemaDescription:
      'Enterprise applications, SaaS platforms, internal business platforms, CRM/ERP solutions, portals, dashboards, APIs, and legacy system modernization.',
  },
  {
    slug: 'ai-automation',
    name: 'AI & Automation',
    serviceType: 'AI & Automation',
    schemaName: 'AI & Business Process Automation Services',
    title: 'AI & Business Automation Agency | EdgeWeb',
    description:
      'AI agents, chatbots and workflow automation — EdgeWeb has automated 340+ workflows in production, cutting manual hours by 38% on average.',
    schemaDescription:
      'AI agents and chatbots, workflow and business process automation, CRM/lead/WhatsApp automation, and data pipelines with API integrations.',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    serviceType: 'Digital Marketing',
    schemaName: 'SEO & Digital Marketing Services',
    title: 'SEO & Digital Marketing Agency | EdgeWeb',
    description:
      'Technical SEO, local SEO and performance marketing from the team that also builds the systems your marketing sends traffic to.',
    schemaDescription:
      'SEO, technical SEO and local SEO, performance marketing and Google Ads, social media and content marketing, conversion rate optimization, lead generation and marketing automation.',
  },
  {
    slug: 'branding-ui-ux',
    name: 'Branding & UI/UX',
    serviceType: 'Branding & UI/UX',
    schemaName: 'Branding & UI/UX Design Services',
    title: 'Branding & UI/UX Design Agency | EdgeWeb',
    description:
      'Brand strategy, identity and product design — part of the 120+ digital products and platforms EdgeWeb has shipped since 2019.',
    schemaDescription:
      'Brand strategy, logo and visual identity, UI/UX and product design, design systems, and motion design.',
  },
  {
    slug: 'low-code-no-code',
    name: 'Low-Code / No-Code',
    serviceType: 'Low-Code/No-Code Development',
    schemaName: 'Low-Code & No-Code Development Services',
    title: 'Low-Code & No-Code Development Agency | EdgeWeb',
    description:
      'Rapid MVPs and internal tools on low-code platforms — launch in weeks, from the team behind 340+ automated production workflows.',
    schemaDescription:
      'Business applications and workflow systems, rapid MVPs, internal tools, automation platforms and CRM solutions built on low-code/no-code platforms for faster delivery.',
  },
  {
    slug: 'custom-solutions',
    name: 'Custom Solutions',
    serviceType: 'Custom Solutions',
    schemaName: 'Custom CRM, ERP & Dashboard Development Services',
    title: 'Custom CRM, ERP & Dashboard Development | EdgeWeb',
    description:
      "Custom CRM, ERP and dashboards for operations nobody else has solved off-the-shelf — part of 120+ systems EdgeWeb has delivered.",
    schemaDescription:
      'Custom dashboards, booking systems, portals, CRM/ERP systems, and data platforms built around a specific operational need.',
  },
];

export function getServicePage(slug) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
