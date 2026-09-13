import HeroVortex from '../../components/HeroVortex';
import JsonLd from '../../components/JsonLd';
import { readContent } from '../../lib/content';
import { personSchema } from '../../lib/schema';
import { absoluteUrl } from '../../lib/site';

export const metadata = {
  title: 'Ansh Kashyap — Founder & CEO of EdgeWeb',
  description:
    'Meet Ansh Kashyap, Founder & CEO of EdgeWeb. Building digital products, business systems, automation and technology solutions around real business problems.',
  alternates: { canonical: absoluteUrl('/founder-anshkashyap') },
  keywords: 'Ansh Kashyap, Ansh Kashyap EdgeWeb, EdgeWeb founder, EdgeWeb CEO, software company founder India',
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
      <JsonLd
        data={personSchema({
          name: 'Ansh Kashyap',
          jobTitle: 'Founder & CEO',
          url: absoluteUrl('/founder-anshkashyap'),
          sameAs: ['https://www.linkedin.com/in/ansh-a919a621a/'],
          description: 'Founder & CEO of EdgeWeb, building digital products, business systems and automation around real business problems.',
        })}
      />
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
