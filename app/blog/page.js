import Script from 'next/script';
import Header from '../../components/Header';
import MobileMenu from '../../components/MobileMenu';
import Footer from '../../components/Footer';
import StickyCtas from '../../components/StickyCtas';
import DiscoveryModal from '../../components/DiscoveryModal';
import ChromeEffects from '../../components/ChromeEffects';
import HeroVortex from '../../components/HeroVortex';
import JsonLd from '../../components/JsonLd';
import { readContent } from '../../lib/content';
import { breadcrumbSchema } from '../../lib/schema';
import { BLOG_POSTS } from '../../lib/blog';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Blog | Software, Web Development & Agency Advice | EdgeWeb',
  description:
    'Cost breakdowns, how to choose an agency, and the signs your business has outgrown spreadsheets — straight answers from the EdgeWeb team.',
  alternates: { canonical: absoluteUrl('/blog') },
  keywords:
    'software development blog, custom software cost guide, how to choose a software agency, business automation blog',
  openGraph: {
    type: 'website',
    siteName: 'EdgeWeb',
    title: 'Blog | Software, Web Development & Agency Advice | EdgeWeb',
    description: 'Cost breakdowns, agency-selection advice and practical guides from the EdgeWeb team.',
    url: absoluteUrl('/blog'),
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'EdgeWeb Blog' }],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
};

const css = readContent('home/style.css') + '\n' + readContent('shared/page-intro.css') + '\n' + readContent('blog/style.css');
const heroInnerHtml = readContent('blog/hero-inner.html');
const finalCtaHtml = readContent('blog/final-cta.html');
const script = readContent('services-detail/script.js');

const posts = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <ChromeEffects />
      <Header />
      <MobileMenu />

      <main id="top">
        <section className="page-intro">
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="wrap" dangerouslySetInnerHTML={{ __html: heroInnerHtml }} />
        </section>

        <section className="section-alt" style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="post-grid">
              {posts.map((post) => (
                <a key={post.slug} href={`/blog/${post.slug}`} className="post-card reveal" data-cursor="Read" data-track={`cta_blog_index_${post.slug}`}>
                  <span className="cat">{post.category}</span>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="meta">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} · {post.readTime}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: finalCtaHtml }} />
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id="blog-index-script" strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
