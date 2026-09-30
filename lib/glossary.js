// Glossary data for /glossary. Grouped by category; each term has a plain,
// accurate definition and an optional internal link into a service or blog
// post where that term is covered in more depth. slugify() from lib/regions
// isn't reused here on purpose — glossary slugs are hand-picked so they stay
// stable even if a term's wording changes later.

export const GLOSSARY = [
  {
    category: 'Software & Development',
    terms: [
      {
        slug: 'mvp',
        term: 'MVP (Minimum Viable Product)',
        def: 'The smallest version of a product that is complete enough to test with real users — built to validate an idea before investing in every feature.',
        link: { href: '/blog/how-much-does-custom-software-cost', label: 'See MVP cost ranges' },
      },
      {
        slug: 'api',
        term: 'API (Application Programming Interface)',
        def: 'A defined way for two pieces of software to exchange data — for example, a website calling a payment processor or a mapping service.',
      },
      {
        slug: 'saas',
        term: 'SaaS (Software as a Service)',
        def: 'Software delivered over the internet on a subscription, rather than installed and run on a business’s own servers — the model behind most modern business tools.',
        link: { href: '/case-studies/scrapgrid', label: 'See a SaaS product case study' },
      },
      {
        slug: 'multi-tenant-architecture',
        term: 'Multi-Tenant Architecture',
        def: 'One application that serves many separate customers (tenants) from a shared codebase, with each tenant’s data kept isolated at the API and database level.',
        link: { href: '/case-studies/scrapgrid', label: 'See a multi-tenant SaaS design' },
      },
      {
        slug: 'full-stack-development',
        term: 'Full-Stack Development',
        def: 'Building both the parts of an application a user sees (frontend) and the parts that run behind the scenes (backend, database, infrastructure) as one connected system.',
        link: { href: '/services/custom-software', label: 'See our Custom Software service' },
      },
      {
        slug: 'tech-stack',
        term: 'Tech Stack',
        def: 'The specific set of languages, frameworks, databases and infrastructure used to build a piece of software — chosen for the problem, not fixed in advance.',
      },
      {
        slug: 'legacy-system',
        term: 'Legacy System',
        def: 'An existing platform or tool, often old or built by another vendor, that a business still depends on even though it no longer scales or is hard to change.',
      },
      {
        slug: 'scalability',
        term: 'Scalability',
        def: 'How well a system keeps working as usage grows — more users, more data, more transactions — without needing to be rebuilt.',
      },
      {
        slug: 'cloud-hosting',
        term: 'Cloud Hosting',
        def: 'Running an application on infrastructure provided by a company such as AWS, Google Cloud or Azure, instead of on physical servers a business owns itself.',
      },
      {
        slug: 'frontend-backend',
        term: 'Frontend / Backend',
        def: 'The frontend is what a user sees and interacts with in their browser or app. The backend is the server, database and logic that powers it behind the scenes.',
      },
    ],
  },
  {
    category: 'Web Development',
    terms: [
      {
        slug: 'cms',
        term: 'CMS (Content Management System)',
        def: 'Software that lets a non-technical team update a website’s content — text, images, pages — without editing code directly.',
      },
      {
        slug: 'headless-cms',
        term: 'Headless CMS',
        def: 'A content management system that stores and manages content separately from how it’s displayed, so the same content can feed a website, an app and other channels at once.',
      },
      {
        slug: 'responsive-design',
        term: 'Responsive Design',
        def: 'A website built to work correctly at any screen size, from a phone to a desktop monitor, using one flexible layout rather than separate versions.',
      },
      {
        slug: 'page-speed',
        term: 'Page Speed',
        def: 'How quickly a webpage loads and becomes usable — a factor in both search rankings and whether visitors stay or leave.',
        link: { href: '/blog/technical-seo-checklist-2026', label: 'See our technical SEO checklist' },
      },
      {
        slug: 'ssl-https',
        term: 'SSL / HTTPS',
        def: 'The encryption that secures data between a visitor’s browser and a website. Sites without it show as "not secure" and rank worse in search.',
      },
      {
        slug: 'cdn',
        term: 'CDN (Content Delivery Network)',
        def: 'A network of servers in different locations that serve a website’s files from whichever is closest to the visitor, making pages load faster worldwide.',
      },
      {
        slug: 'native-app',
        term: 'Native App',
        def: 'A mobile app built specifically for one platform (Swift for iOS, Kotlin for Android), with direct access to everything that device offers.',
        link: { href: '/blog/native-vs-cross-platform-app-development', label: 'See native vs. cross-platform' },
      },
      {
        slug: 'cross-platform-app',
        term: 'Cross-Platform App',
        def: 'A mobile app built from one codebase that runs on both iOS and Android, using a framework such as React Native or Flutter.',
        link: { href: '/blog/native-vs-cross-platform-app-development', label: 'See native vs. cross-platform' },
      },
      {
        slug: 'pwa',
        term: 'PWA (Progressive Web App)',
        def: 'A website built to behave like an app — installable, works offline, sends notifications — without going through an app store.',
      },
    ],
  },
  {
    category: 'SEO & Marketing',
    terms: [
      {
        slug: 'technical-seo',
        term: 'Technical SEO',
        def: 'The behind-the-scenes work that lets search engines find, read and trust a site’s pages — crawlability, structured data, site speed — as opposed to the content itself.',
        link: { href: '/blog/technical-seo-checklist-2026', label: 'Read the full checklist' },
      },
      {
        slug: 'on-page-seo',
        term: 'On-Page SEO',
        def: 'Optimizing the visible and coded elements of a specific page — titles, headings, content, internal links — so it matches what people are searching for.',
      },
      {
        slug: 'backlink',
        term: 'Backlink',
        def: 'A link from another website pointing to yours. Search engines treat backlinks from relevant, trustworthy sites as a signal of credibility.',
      },
      {
        slug: 'core-web-vitals',
        term: 'Core Web Vitals',
        def: 'Google’s three metrics for real-world page experience: how fast the main content loads (LCP), how responsive the page feels (INP) and how much it shifts while loading (CLS).',
        link: { href: '/blog/technical-seo-checklist-2026', label: 'See the target numbers' },
      },
      {
        slug: 'schema-markup',
        term: 'Schema Markup (Structured Data)',
        def: 'Code added to a page that explicitly tells search engines what the content means — a review, an FAQ, a product — enabling richer search result displays.',
        link: { href: '/blog/technical-seo-checklist-2026', label: 'See which schema types matter' },
      },
      {
        slug: 'crawl-budget',
        term: 'Crawl Budget',
        def: 'The limited number of pages a search engine is willing to crawl on a given site in a given period, especially relevant for newer or lower-authority domains.',
      },
      {
        slug: 'indexing',
        term: 'Indexing',
        def: 'The process of a search engine storing a crawled page in its database so it can actually appear in search results. A page can be crawled without being indexed.',
      },
      {
        slug: 'serp',
        term: 'SERP (Search Engine Results Page)',
        def: 'The page of results a search engine shows after a query — what "ranking" actually refers to a position on.',
      },
      {
        slug: 'meta-description',
        term: 'Meta Description',
        def: 'The short summary shown under a page’s title in search results. It doesn’t directly affect ranking, but it strongly affects whether people click.',
      },
      {
        slug: 'cro',
        term: 'CRO (Conversion Rate Optimization)',
        def: 'Improving a website so a higher share of its visitors take the action you want — a purchase, a signup, a call — without needing more traffic to do it.',
        link: { href: '/services/digital-marketing', label: 'See our Digital Marketing service' },
      },
      {
        slug: 'ppc',
        term: 'PPC (Pay-Per-Click)',
        def: 'Paid advertising, such as Google Ads, where you pay each time someone clicks your ad rather than for the ad simply being shown.',
      },
      {
        slug: 'local-seo',
        term: 'Local SEO',
        def: 'Optimizing a business’s online presence to appear in location-based searches, such as "near me" queries and Google’s local map results.',
        link: { href: '/areas-we-serve', label: 'See the regions we serve' },
      },
    ],
  },
  {
    category: 'AI & Automation',
    terms: [
      {
        slug: 'ai-agent',
        term: 'AI Agent',
        def: 'A system that uses AI to carry out a task with some autonomy — reading a document, answering a query, routing a request — rather than just responding once to a prompt.',
        link: { href: '/services/ai-automation', label: 'See our AI & Automation service' },
      },
      {
        slug: 'chatbot',
        term: 'Chatbot',
        def: 'A program that holds a conversation with a user, ranging from simple scripted flows to AI-driven systems that understand open-ended questions.',
      },
      {
        slug: 'rpa',
        term: 'RPA (Robotic Process Automation)',
        def: 'Software that mimics repetitive, rule-based human actions on a computer — clicking, copying, entering data — without understanding context the way AI does.',
      },
      {
        slug: 'workflow-automation',
        term: 'Workflow Automation',
        def: 'Replacing a manual, repeated business process with software that runs it automatically, from a simple trigger-and-action rule to a full AI-assisted pipeline.',
        link: { href: '/blog/ai-automation-for-small-business', label: 'See where to start' },
      },
      {
        slug: 'llm',
        term: 'LLM (Large Language Model)',
        def: 'The type of AI model trained on large amounts of text that powers modern chatbots and AI agents, able to understand and generate natural language.',
      },
    ],
  },
  {
    category: 'Business & Engagement',
    terms: [
      {
        slug: 'low-code-no-code',
        term: 'Low-Code / No-Code',
        def: 'Building software using visual tools and pre-built components instead of writing code from scratch — faster for simple, standard workflows; limited for complex or custom ones.',
        link: { href: '/blog/low-code-vs-custom-software', label: 'See when each one fits' },
      },
      {
        slug: 'fixed-price-vs-time-and-materials',
        term: 'Fixed-Price vs. Time & Materials',
        def: 'Two ways to price a project: a fixed price commits to one total upfront; time and materials bills for actual hours worked, usually with a not-to-exceed ceiling.',
        link: { href: '/blog/how-much-does-custom-software-cost', label: 'See how this affects cost' },
      },
      {
        slug: 'scope-creep',
        term: 'Scope Creep',
        def: 'Small, uncontrolled additions to a project’s requirements after work has started, which individually seem minor but together blow past the original timeline and budget.',
      },
      {
        slug: 'nda',
        term: 'NDA (Non-Disclosure Agreement)',
        def: 'A legal agreement that keeps confidential information shared during a project private — common before scoping calls that involve sensitive business data.',
      },
      {
        slug: 'sla',
        term: 'SLA (Service Level Agreement)',
        def: 'A formal commitment on response times, uptime or support standards a business can expect from a vendor after launch.',
      },
    ],
  },
];

export function allGlossaryTerms() {
  return GLOSSARY.flatMap((g) => g.terms);
}
