import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import MobileMenu from '../../../components/MobileMenu';
import Footer from '../../../components/Footer';
import StickyCtas from '../../../components/StickyCtas';
import DiscoveryModal from '../../../components/DiscoveryModal';
import ChromeEffects from '../../../components/ChromeEffects';
import HeroVortex from '../../../components/HeroVortex';
import JsonLd from '../../../components/JsonLd';
import { readContent } from '../../../lib/content';
import { breadcrumbSchema, articleSchema } from '../../../lib/schema';
import { BLOG_POSTS, getBlogPost } from '../../../lib/blog';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../../lib/site';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | EdgeWeb Blog`,
    description: post.description,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    keywords: post.keywords,
    openGraph: {
      type: 'article',
      siteName: 'EdgeWeb',
      title: `${post.title} | EdgeWeb Blog`,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: 'summary_large_image', images: [DEFAULT_OG_IMAGE], site: '@edgewebco' },
  };
}

const css = readContent('services-detail/style.css') + '\n' + readContent('blog/style.css');
const script = readContent('services-detail/script.js');

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const bodyHtml = readContent(`blog/${post.slug}/main.html`);
  const dateDisplay = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema(post),
        ]}
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <ChromeEffects />
      <Header />
      <MobileMenu />

      <main id="top">
        <section className="svc-detail-hero" style={{ paddingBottom: 60 }}>
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="wrap">
            <div className="breadcrumb">
              <a href="/">Home</a><span>/</span><a href="/blog">Blog</a><span>/</span><span>{post.category}</span>
            </div>
            <div className="post-meta" style={{ marginTop: 20 }}>
              <span className="cat">{post.category}</span>
              <span>{dateDisplay}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="display-xl" style={{ marginTop: 22, maxWidth: '18ch' }}>{post.title}</h1>
            <p className="body-lg" style={{ marginTop: 24, maxWidth: '60ch' }}>{post.excerpt}</p>
          </div>
        </section>

        <section className="detail-block">
          <div className="wrap">
            <div className="article-body reveal" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          </div>
        </section>

        <section id="contact" className="section-alt final-cta">
          <div className="wrap">
            <p className="eyebrow reveal" style={{ marginBottom: 30 }}>Still Have Questions?</p>
            <h2 className="display-xl reveal">Ask us<br /><i>directly.</i></h2>
            <div className="final-cta-row reveal">
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="/consultation" className="btn btn-primary magnetic" data-cursor="Open" data-track={`cta_blog_post_${post.slug}_consultation`}>
                  Book a free 1:1 call
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a href="/blog" className="btn btn-ghost magnetic" data-cursor="View">More from the blog</a>
              </div>
              <div className="final-contact">
                <a href="mailto:info@edgeweb.co">info@edgeweb.co</a>
                <a href="tel:+919266726490">+91 92667 26490</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCtas />
      <DiscoveryModal />

      <Script id={`blog-${post.slug}-script`} strategy="afterInteractive">
        {script}
      </Script>
    </>
  );
}
