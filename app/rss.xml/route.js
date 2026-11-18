import { NextResponse } from 'next/server';
import { BLOG_POSTS } from '../../lib/blog';
import { SITE_URL, SITE_NAME } from '../../lib/site';

// A real RSS 2.0 feed for /blog — lets feed readers and content
// aggregators discover and syndicate posts automatically, which is a
// legitimate, no-signup path to organic citations (the opposite of a
// manufactured backlink: real readers subscribing to real content).
function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const sorted = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  const items = sorted
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Straight answers on software cost, process, AI automation, SEO and choosing an agency — from ${SITE_NAME}.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
