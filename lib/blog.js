// Central blog post registry — single source of truth for /blog and
// /blog/[slug], mirroring the SERVICE_PAGES pattern in lib/site.js.
// Adding a new post means: add an entry here, add
// content/blog/<slug>/main.html, done — no new route file needed since
// /blog/[slug]/page.js is a dynamic route generated from this array.

export const BLOG_POSTS = [
  {
    slug: 'how-much-does-custom-software-cost',
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
    title: 'In-House vs. Outsourced Software Development: Which Is Right for You?',
    excerpt:
      "Neither option is universally better — the right call depends on what you're building and for how long you'll need to keep building it.",
    description:
      'A practical comparison of in-house and outsourced software development — cost, speed, control and risk — with a framework for deciding which fits your situation.',
    category: 'Hiring & Vendors',
    date: '2026-09-17',
    readTime: '7 min read',
    keywords:
      'in-house vs outsourced software development, should I outsource software development, hire in-house developers vs agency, software development staffing',
  },
  {
    slug: 'website-redesign-signs-and-cost',
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
    slug: 'ai-automation-for-small-business',
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
];

export function getBlogPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
