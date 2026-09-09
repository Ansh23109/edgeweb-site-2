import { SITE_URL, SERVICE_PAGES } from '../lib/site';

// Section 3.1 + 3.3 fix: every URL here is canonical on https://www.edgeweb.co
// (no non-www duplicates), and the old #about / #work / #faq homepage
// fragments are gone — replaced by real, indexable /about, /case-studies and
// /faq pages.
export default function sitemap() {
  const now = new Date();

  const staticEntries = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/case-studies', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/case-studies/parking-management-system', changeFrequency: 'yearly', priority: 0.6 },
    { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
    { path: '/founder-anshkashyap', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceEntries = SERVICE_PAGES.map((s) => ({
    path: `/services/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...serviceEntries].map((entry) => ({
    url: `${SITE_URL}${entry.path === '/' ? '' : entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
