import HeroVortex from '../../components/HeroVortex';
import { readContent } from '../../lib/content';
import { absoluteUrl } from '../../lib/site';

export const metadata = {
  title: 'Ansh Kashyap — Founder & CEO of EdgeWeb',
  description:
    'Meet Ansh Kashyap, Founder & CEO of EdgeWeb. Building digital products, business systems, automation and technology solutions around real business problems.',
  alternates: { canonical: absoluteUrl('/founder-anshkashyap') },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/founder-anshkashyap'),
    title: 'Ansh Kashyap — Founder & CEO of EdgeWeb',
    description: 'I build digital systems around real business problems. Founder & CEO at EdgeWeb.',
    images: [{ url: absoluteUrl('/founder-anshkashyap/og-image.jpg') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ansh Kashyap — Founder & CEO of EdgeWeb',
    description: 'I build digital systems around real business problems. Founder & CEO at EdgeWeb.',
    images: [absoluteUrl('/founder-anshkashyap/og-image.jpg')],
  },
};

const css = readContent('founder/style.css');
const headerHtml = readContent('founder/before-hero.html');
const heroInnerHtml = readContent('founder/hero-inner.html');
const mainRestHtml = readContent('founder/main-rest.html');
const footerHtmlRaw = readContent('founder/footer.html');

export default function FounderPage() {
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
