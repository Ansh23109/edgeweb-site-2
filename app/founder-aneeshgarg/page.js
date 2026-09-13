import HeroVortex from '../../components/HeroVortex';
import { readContent } from '../../lib/content';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../../lib/site';

export const metadata = {
  title: 'Aneesh Garg — Co-Founder, Marketing & Technology at EdgeWeb',
  description:
    'Meet Aneesh Garg, Co-Founder (Marketing & Technology) at EdgeWeb. 5+ years connecting growth strategy and marketing systems with the technology that runs them.',
  alternates: { canonical: absoluteUrl('/founder-aneeshgarg') },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/founder-aneeshgarg'),
    title: 'Aneesh Garg — Co-Founder, Marketing & Technology at EdgeWeb',
    description: 'I connect marketing with the technology behind it. Co-Founder, Marketing & Technology at EdgeWeb.',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Aneesh Garg, Co-Founder at EdgeWeb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aneesh Garg — Co-Founder, Marketing & Technology at EdgeWeb',
    description: 'I connect marketing with the technology behind it. Co-Founder, Marketing & Technology at EdgeWeb.',
    images: [DEFAULT_OG_IMAGE],
  },
};

const css = readContent('founder/style.css');
const headerHtml = readContent('founder/before-hero.html');
const heroInnerHtml = readContent('founder-aneeshgarg/hero-inner.html');
const mainRestHtml = readContent('founder-aneeshgarg/main-rest.html');
const footerHtmlRaw = readContent('founder-aneeshgarg/footer.html');

export default function FounderAneeshPage() {
  const year = new Date().getFullYear();
  const footerHtml = footerHtmlRaw.replace('<span id="year"></span>', `<span id="year">${year}</span>`);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: headerHtml }} />

      <main>
        <section className="hero">
          <HeroVortex />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="wrap hero-grid" dangerouslySetInnerHTML={{ __html: heroInnerHtml }} />
        </section>

        <div dangerouslySetInnerHTML={{ __html: mainRestHtml }} />
      </main>

      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}
