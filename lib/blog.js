// Central blog post registry — single source of truth for /blog and
// /blog/[slug], mirroring the SERVICE_PAGES pattern in lib/site.js.
// Adding a new post means: add an entry here, add
// content/blog/<slug>/main.html, done — no new route file needed since
// /blog/[slug]/page.js is a dynamic route generated from this array.

export const BLOG_POSTS = [
  {
    slug: 'how-much-does-custom-software-cost',
    metaTitle: 'Custom Software Development Cost in 2026',
    title: 'How Much Does Custom Software Development Cost in 2026?',
    excerpt:
      "The honest answer is \"it depends\" — but here's what it actually depends on, and the real ranges most projects fall into.",
    description:
      'A breakdown of what actually drives custom software cost — project complexity, integrations, team composition — with realistic price ranges for 2026.',
    category: 'Planning & Budget',
    date: '2026-09-15',
    readTime: '7 min read',
    keywords:
      'how much does custom software cost, custom software development cost 2026, software development pricing, MVP development cost',
  },
  {
    slug: 'signs-your-business-needs-custom-software',
    metaTitle: '7 Signs You\'ve Outgrown Spreadsheets',
    title: "7 Signs Your Business Has Outgrown Spreadsheets",
    excerpt:
      "Spreadsheets are free until the hours spent reconciling them aren't. Here's how to tell you've hit that point.",
    description:
      'Seven concrete signs a business has outgrown spreadsheets and manual processes — and what usually replaces them.',
    category: 'Operations',
    date: '2026-09-15',
    readTime: '6 min read',
    keywords:
      'signs your business needs custom software, outgrown spreadsheets, manual process automation, when to build software',
  },
  {
    slug: 'how-to-choose-a-software-development-agency',
    metaTitle: 'How to Choose a Software Development Agency',
    title: 'How to Choose a Software Development Agency: 8 Questions to Ask Before You Hire',
    excerpt:
      'Most agencies sound the same in a pitch. These are the questions that actually tell them apart.',
    description:
      'Eight concrete questions to ask any software development agency before signing a contract — what the good and bad answers actually sound like.',
    category: "Hiring & Vendors",
    date: '2026-09-15',
    readTime: '8 min read',
    keywords:
      'how to choose a software development agency, questions to ask software agency, hire software developers, vendor evaluation checklist',
  },
  {
    slug: 'in-house-vs-outsourced-software-development',
    metaTitle: 'In-House vs. Outsourced Development',
    title: 'In-House vs. Outsourced Software Development: Which Is Right for You?',
    excerpt:
      "Neither option is universally better — the right call depends on what you're building and for how long you'll need to keep building it.",
    description:
      'A practical comparison of in-house and outsourced software development — cost, speed, control and risk — and a framework for deciding which fits you.',
    category: 'Hiring & Vendors',
    date: '2026-09-17',
    readTime: '7 min read',
    keywords:
      'in-house vs outsourced software development, should I outsource software development, hire in-house developers vs agency, software development staffing',
  },
  {
    slug: 'website-redesign-signs-and-cost',
    metaTitle: 'When to Redesign Your Website (and Cost)',
    title: "Website Redesign: How to Know It's Time (and What It Actually Costs)",
    excerpt:
      "A website that still technically works isn't the same as one that's still working for you. Here's how to tell the difference, and what a redesign really costs.",
    description:
      'The real signs a website needs a redesign versus a tune-up, plus realistic cost ranges and what actually drives the number up or down.',
    category: 'Web Development',
    date: '2026-09-18',
    readTime: '6 min read',
    keywords:
      'when to redesign a website, website redesign cost, signs you need a new website, website redesign checklist',
  },
  {
    slug: 'technical-seo-checklist-2026',
    metaTitle: 'Technical SEO Checklist for 2026',
    title: 'Technical SEO Checklist for 2026: What Actually Moves Rankings',
    excerpt:
      "Most technical SEO advice is either outdated or a vendor selling audits. Here's the checklist we actually run against every site we build.",
    description:
      'A practical technical SEO checklist covering the fundamentals that still matter in 2026 — crawlability, structured data, Core Web Vitals and content structure.',
    category: 'SEO & Marketing',
    date: '2026-09-18',
    readTime: '7 min read',
    keywords:
      'technical SEO checklist, SEO checklist 2026, technical SEO for small business, how to improve website SEO',
  },
  {
    slug: 'native-vs-cross-platform-app-development',
    metaTitle: 'Native vs. Cross-Platform App Development',
    title: 'Native vs. Cross-Platform App Development: How to Choose in 2026',
    excerpt:
      "The tools have converged enough that the old \"native is always better\" answer no longer holds. Here's how to decide for your specific app.",
    description:
      'A practical comparison of native and cross-platform mobile app development — performance, cost, timeline and maintenance — and when each one makes sense.',
    category: 'App Development',
    date: '2026-09-20',
    readTime: '6 min read',
    keywords:
      'native vs cross-platform app development, React Native vs native, should I build a native app, mobile app development approach',
  },
  {
    slug: 'low-code-vs-custom-software',
    metaTitle: 'Low-Code vs. Custom Software',
    title: 'Low-Code vs. Custom Software: When Each One Is the Right Call',
    excerpt:
      "Low-code isn't a shortcut and custom isn't always overkill. Here's how to tell which one your project actually needs.",
    description:
      'When low-code and no-code platforms are the smart choice, when custom software is worth the investment, and the hybrid approach many businesses end up with.',
    category: 'Planning & Budget',
    date: '2026-09-20',
    readTime: '6 min read',
    keywords:
      'low-code vs custom software, no-code vs custom development, when to use low-code, low-code limitations',
  },
  {
    slug: 'what-a-brand-identity-includes',
    metaTitle: 'What a Brand Identity Actually Includes',
    title: 'What a Brand Identity Actually Includes (and What It Should Cost)',
    excerpt:
      "A logo is one piece of a brand identity, not the whole thing. Here's what a complete identity covers and why each part earns its place.",
    description:
      'What a full brand identity includes beyond a logo — strategy, visual system, guidelines and applications — and how scope drives cost.',
    category: 'Branding & Design',
    date: '2026-09-20',
    readTime: '6 min read',
    keywords:
      'what does brand identity include, brand identity design cost, logo vs brand identity, brand guidelines, branding for small business',
  },
  {
    slug: 'custom-booking-system-or-customer-portal',
    metaTitle: 'Custom Booking Systems & Customer Portals',
    title: 'Custom Booking Systems and Customer Portals: When Off-the-Shelf Tools Stop Fitting',
    excerpt:
      "Scheduling apps and portal templates work until your process has a rule they can't express. Here's how to recognise that point.",
    description:
      'When an off-the-shelf booking tool or portal is enough, the signs you need a custom one, and what a custom booking system or customer portal involves.',
    category: 'Custom Solutions',
    date: '2026-09-21',
    readTime: '6 min read',
    keywords:
      'custom booking system, custom customer portal, off-the-shelf vs custom software, custom scheduling software, client portal development',
  },
  {
    slug: 'ai-automation-for-small-business',
    metaTitle: 'AI Automation for Small Businesses',
    title: 'AI Automation for Small Businesses: Where to Actually Start',
    excerpt:
      "Not every process is worth automating with AI, and starting with the wrong one is how automation projects stall. Here's how to pick the right first one.",
    description:
      'A practical starting point for small and mid-sized businesses considering AI automation — which processes are worth automating first, and which are not.',
    category: 'AI & Automation',
    date: '2026-09-17',
    readTime: '6 min read',
    keywords:
      'AI automation for small business, business process automation, where to start with AI automation, AI agents for small business',
  },
  {
    slug: 'software-development-trends-2026',
    metaTitle: 'Software Development Trends for 2026',
    title: 'Software Development Trends for 2026: What’s Actually Worth Your Budget',
    excerpt:
      "Every agency publishes a trends list this time of year. Most of it is noise. Here's what's actually worth spending on, and what to skip.",
    description:
      'The software trends actually worth budgeting for in 2026 — agentic AI, security by design and cloud-native builds — and which ones are mostly noise.',
    category: 'Planning & Budget',
    date: '2026-11-10',
    readTime: '7 min read',
    keywords:
      'software development trends 2026, technology trends for business 2026, what to invest in software development, enterprise software trends',
  },
  {
    slug: 'what-is-security-by-design',
    metaTitle: 'What Security by Design Actually Means',
    title: 'What "Security by Design" Actually Means (and Why Retrofitting It Costs More)',
    excerpt:
      "Security bolted on at the end is a patch job. Here's what building it in from the start actually looks like, and why it's cheaper in the long run.",
    description:
      'What security by design actually means for a custom software project, why retrofitting security later costs more, and what it looks like in practice.',
    category: 'Custom Solutions',
    date: '2026-11-10',
    readTime: '6 min read',
    keywords:
      'security by design, secure software development, what is security by design, secure by design principles, application security best practices',
  },
  {
    slug: 'ai-agents-vs-chatbots',
    metaTitle: 'AI Agents vs. Chatbots: The Real Difference',
    title: 'AI Agents vs. Chatbots: What’s Actually Different',
    excerpt:
      "The two terms get used interchangeably in every sales pitch. They're not the same thing, and the difference decides what you should actually ask for.",
    description:
      'AI agents and chatbots get used interchangeably, but they are not the same thing. Here is the real difference, and how to tell which one you need.',
    category: 'AI & Automation',
    date: '2026-11-10',
    readTime: '6 min read',
    keywords:
      'AI agent vs chatbot, what is an AI agent, difference between chatbot and AI agent, agentic AI explained, AI agents for business',
  },
  {
    slug: 'ai-automation-for-operational-efficiency',
    metaTitle: 'AI Automation for Operational Efficiency',
    title: 'AI Automation for Operational Efficiency: A Practical Guide',
    excerpt:
      "\"Operational efficiency\" is the goal everyone states and almost nobody measures. Here's how to scope an AI automation project so you can actually tell if it worked.",
    description:
      'What agentic AI automation for operational efficiency actually looks like in a real business, how to scope it, and how to know if it is working.',
    category: 'AI & Automation',
    date: '2026-11-10',
    readTime: '7 min read',
    keywords:
      'AI automation for operational efficiency, agentic AI workflows, AI automation consulting, enterprise AI automation, operational efficiency AI',
  },
  {
    slug: 'hiring-remote-engineering-team-india',
    metaTitle: 'Hiring a Remote Engineering Team in India',
    title: 'Hiring a Remote Engineering Team in India: What to Actually Check',
    excerpt:
      "The pitch is always the same — lower cost, strong talent pool. The real question is what to check before you commit, not whether the pitch is true.",
    description:
      'What to actually check before hiring a remote engineering team in India: overlap hours, vetting, data security, communication and ownership of the code.',
    category: 'Hiring & Vendors',
    date: '2026-11-10',
    readTime: '7 min read',
    keywords:
      'hire remote engineering team India, remote development team India, hire software developers India, outsource development to India, India dedicated development team',
  },
];

export function getBlogPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
