import { readContent } from '../../lib/content';
import { absoluteUrl } from '../../lib/site';

export const metadata = {
  title: 'Ansh Kashyap — Founder & Director of EdgeWeb',
  description:
    'Meet Ansh Kashyap, Founder & Director of EdgeWeb. Building digital products, business systems, automation and technology solutions around real business problems.',
  alternates: { canonical: absoluteUrl('/founder-anshkashyap') },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/founder-anshkashyap'),
    title: 'Ansh Kashyap — Founder & Director of EdgeWeb',
    description: 'I build digital systems around real business problems. Founder & Director at EdgeWeb.',
    images: [{ url: absoluteUrl('/founder-anshkashyap/og-image.jpg') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ansh Kashyap — Founder & Director of EdgeWeb',
    description: 'I build digital systems around real business problems. Founder & Director at EdgeWeb.',
    images: [absoluteUrl('/founder-anshkashyap/og-image.jpg')],
  },
};

const css = readContent('founder/style.css');
const bodyHtmlRaw = readContent('founder/body.html');

export default function FounderPage() {
  const year = new Date().getFullYear();
  const bodyHtml = bodyHtmlRaw.replace('<span id="year"></span>', `<span id="year">${year}</span>`);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
