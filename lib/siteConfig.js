import fs from 'fs';
import path from 'path';

// Editable-via-/admin site copy. This is a legacy convenience carried over
// from the original CMS — the actual page content is now server-rendered
// directly (see /app/page.js etc.), so nothing on the live pages reads this
// at request time any more. It's kept only so the /admin screen still works
// for anyone used to it.
export const DEFAULT_SITE_CONFIG = {
  siteName: 'EdgeWeb',
  pageTitle: 'Custom Software & Web Development Company | EdgeWeb',
  metaDescription:
    'EdgeWeb builds custom websites, software, AI automation and growth systems for businesses in the USA, Europe, Australia & India.',
  heroHeading: 'Web development\ncompany for\nUSA, Europe & Australia.',
  heroSubheading:
    'EdgeWeb is a web development agency and website development company building high-converting websites, web design systems, custom software, AI automation and digital experiences for businesses across the USA, Europe and Australia.',
  heroBadge: 'Web Development Company / IT Services',
  contactEmail: 'info@edgeweb.co',
  phone: '+91 92667 26490',
  footerText:
    'A technology, automation and growth partner — building the systems businesses run on, from India, for anywhere.',
};

const LOCAL_PATH = path.join(process.cwd(), 'data', 'site-config.json');

// Note: this intentionally has no @vercel/kv fallback. That package throws
// at import time when KV_REST_API_URL/TOKEN aren't set (which they aren't
// on this project — no KV store is provisioned), and since dynamic imports
// of a static string get inlined by the bundler, that throw happens before
// any try/catch here can see it. If you provision Vercel KV later and want
// /admin edits to persist across serverless invocations, reintroduce it
// behind an explicit `if (process.env.KV_REST_API_URL)` check instead of a
// bare try/catch around the import.
function readLocalFile() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf8'));
  } catch (error) {
    return null;
  }
}

function writeLocalFile(data) {
  try {
    fs.mkdirSync(path.dirname(LOCAL_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    // Read-only filesystem (e.g. a serverless function in production) —
    // same limitation the original CMS had outside of `vercel dev`/local.
    return false;
  }
}

export async function getSiteConfig() {
  return readLocalFile() || DEFAULT_SITE_CONFIG;
}

export async function saveSiteConfig(partial) {
  const current = await getSiteConfig();
  const next = { ...current, ...partial };
  writeLocalFile(next);
  return next;
}
