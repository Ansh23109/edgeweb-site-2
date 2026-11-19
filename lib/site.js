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
export const CALENDLY_URL = 'https://calendly.com/anshworks4u/30min';

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
  { label: 'Blog', href: '/blog' },
  { label: 'Free Consultation', href: '/consultation' },
  { label: 'FAQ', href: '/faq' },
];

export const FOOTER_EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Cost Calculator', href: '/cost-calculator' },
  { label: 'Free Consultation', href: '/consultation' },
  { label: 'Delhi NCR', href: '/delhi-ncr' },
  { label: 'Areas We Serve', href: '/areas-we-serve' },
  { label: 'Glossary', href: '/glossary' },
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
    title: 'Web Development Agency: India, Europe & USA | EdgeWeb',
    description:
      "EdgeWeb is a web development agency for India, Europe (incl. France), Australia & the USA — 120+ websites and web platforms shipped since 2019.",
    schemaDescription:
      'Corporate and high-performance website design and development, custom web applications, CRM/ERP portals and dashboards.',
    keywords:
      'web development agency in India, web development agency in Europe, web development agency in France, web development agency in Australia, web development agency in the USA, web development company USA, web development agency Australia, website development company Europe, custom website development company India, corporate website development company, web development company near me, website designer near me, best website development company in India, web design company in Mumbai, web development company in Bangalore, website development company Delhi, affordable website development, ecommerce website development company, Shopify developer near me, web development company UK, website design agency USA, web design company Sydney, agence de développement web France',
  },
  {
    slug: 'app-development',
    name: 'App Development',
    serviceType: 'App Development',
    schemaName: 'Mobile & Cross-Platform App Development Services',
    title: 'App Development Agency: India, Europe & USA | EdgeWeb',
    description:
      'EdgeWeb is an app development agency for India, Europe (incl. France), Australia & the USA — iOS, Android and cross-platform apps, 120+ products shipped.',
    schemaDescription:
      'iOS, Android, cross-platform and React Native app development, covering both business/internal apps and customer-facing apps, from MVP through full product.',
    keywords:
      'app development agency in India, app development agency in Europe, app development agency in France, app development agency in Australia, app development agency in the USA, mobile app development company USA, app development agency Australia, iOS and Android app development Europe, mobile app development company India, React Native development agency, app development company near me, mobile app developers near me, best app development company in India, iOS app development company, Android app development company, app development agency UK, hire app developers India, React Native developers, agence de développement d\'applications France',
  },
  {
    slug: 'custom-software',
    name: 'Custom Software',
    serviceType: 'Custom Software Development',
    schemaName: 'Custom Enterprise Software Development Services',
    title: 'Custom Software Agency: India, Europe & USA | EdgeWeb',
    description:
      'EdgeWeb is a custom software agency for India, Europe (incl. France), Australia & the USA — 340+ workflows automated, 38% average drop in manual hours.',
    schemaDescription:
      'Enterprise applications, SaaS platforms, internal business platforms, CRM/ERP solutions, portals, dashboards, APIs, and legacy system modernization.',
    keywords:
      'custom software agency in India, custom software agency in Europe, custom software agency in France, custom software agency in Australia, custom software agency in the USA, custom software development company USA, enterprise software development Australia, bespoke software development Europe, custom software development company India, SaaS development agency, software development company near me, best software development company in India, software development outsourcing India, bespoke software development UK, enterprise software development company, ERP CRM development company, hire software developers India, agence de développement logiciel France',
  },
  {
    slug: 'ai-automation',
    name: 'AI & Automation',
    serviceType: 'AI & Automation',
    schemaName: 'AI & Business Process Automation Services',
    title: 'AI Automation Agency: India, Europe & USA | EdgeWeb',
    description:
      'AI automation agency delivering AI agents, chatbots and workflow automation for businesses in India, Europe (incl. France), Australia and the USA.',
    schemaDescription:
      'AI agents and chatbots, workflow and business process automation, CRM/lead/WhatsApp automation, and data pipelines with API integrations.',
    keywords:
      'AI automation agency in India, AI automation agency in Europe, AI automation agency in France, AI automation agency in Australia, AI automation agency in the USA, AI automation agency USA, business process automation Australia, AI chatbot development Europe, workflow automation company India, AI agent development agency, AI automation agency near me, AI automation company in India, business process automation company, AI chatbot development company, AI agents development USA, workflow automation agency, WhatsApp automation company India, AI consulting Australia, AI automation services UK, RPA company India, AI automation consulting France, agence automatisation IA France',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    serviceType: 'Digital Marketing',
    schemaName: 'SEO & Digital Marketing Services',
    title: 'Digital Marketing Agency: India, Europe & USA | EdgeWeb',
    description:
      'EdgeWeb is a digital marketing agency for India, Europe (incl. France), Australia & the USA — technical SEO and performance marketing.',
    schemaDescription:
      'SEO, technical SEO and local SEO, performance marketing and Google Ads, social media and content marketing, conversion rate optimization, lead generation and marketing automation.',
    keywords:
      'digital marketing agency in India, digital marketing agency in Europe, digital marketing agency in France, digital marketing agency in Australia, digital marketing agency in the USA, SEO agency USA, digital marketing agency Australia, SEO company Europe, performance marketing agency, technical SEO services, best SEO expert near me, SEO company near me, best digital marketing agency in India, SEO services India, local SEO services near me, Google Ads agency India, social media marketing agency, SEO expert Australia, digital marketing agency UK, SEO consultant Europe, agence de marketing digital France',
  },
  {
    slug: 'branding-ui-ux',
    name: 'Branding & UI/UX',
    serviceType: 'Branding & UI/UX',
    schemaName: 'Branding & UI/UX Design Services',
    title: 'Branding & UI/UX Agency: India, Europe & USA | EdgeWeb',
    description:
      'EdgeWeb is a branding and UI/UX agency for India, Europe (incl. France), Australia & the USA — part of 120+ digital products shipped since 2019.',
    schemaDescription:
      'Brand strategy, logo and visual identity, UI/UX and product design, design systems, and motion design.',
    keywords:
      'branding agency in India, branding agency in Europe, branding agency in France, UI UX design agency in Australia, branding agency in the USA, branding agency USA, UI UX design agency Australia, product design studio Europe, branding and UI UX agency India, brand identity design company, branding agency near me, UI UX design company near me, best UI UX design agency in India, logo design and branding company, product design agency USA, UX design agency UK, packaging design agency India, agence de branding France',
  },
  {
    slug: 'low-code-no-code',
    name: 'Low-Code / No-Code',
    serviceType: 'Low-Code/No-Code Development',
    schemaName: 'Low-Code & No-Code Development Services',
    title: 'Low-Code Agency: India, Europe & USA | EdgeWeb',
    description:
      'EdgeWeb is a low-code and no-code agency for India, Europe (incl. France), Australia & the USA — rapid MVPs and internal tools that launch in weeks.',
    schemaDescription:
      'Business applications and workflow systems, rapid MVPs, internal tools, automation platforms and CRM solutions built on low-code/no-code platforms for faster delivery.',
    keywords:
      'low-code development agency in India, low-code development agency in Europe, low-code development agency in France, no-code development agency in Australia, low-code development agency in the USA, low-code development company USA, no-code app development Australia, rapid MVP development Europe, low-code development agency India, no code development company, low code development services India, Bubble developer, FlutterFlow developer, Power Apps consultant, Airtable automation consultant, low code agency UK, no-code MVP development, agence de développement low-code France',
  },
  {
    slug: 'custom-solutions',
    name: 'Custom Solutions',
    serviceType: 'Custom Solutions',
    schemaName: 'Custom CRM, ERP & Dashboard Development Services',
    title: 'Custom Solutions Agency: India, Europe & USA | EdgeWeb',
    description:
      "EdgeWeb is a custom solutions agency for India, Europe (incl. France), Australia & the USA — custom CRM, ERP and dashboards built around real operations.",
    schemaDescription:
      'Custom dashboards, booking systems, portals, CRM/ERP systems, and data platforms built around a specific operational need.',
    keywords:
      'custom solutions agency in India, custom solutions agency in Europe, custom solutions agency in France, custom CRM agency in Australia, custom solutions agency in the USA, custom CRM development USA, ERP development company Australia, custom dashboard development Europe, custom software solutions India, bespoke CRM and ERP development, custom booking system development, customer portal development company, business management software development, industry specific software development, custom CRM development India, bespoke business software USA, agence de solutions logicielles sur mesure France',
  },
];

export function getServicePage(slug) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
