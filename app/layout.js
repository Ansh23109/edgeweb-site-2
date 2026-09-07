import Script from 'next/script';
import JsonLd from '../components/JsonLd';
import { organizationSchema } from '../lib/schema';
import { SITE_URL, SITE_NAME } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // Every route below sets its own complete, Section-6-recommended title —
  // no template suffix here, since appending one would double up on titles
  // that already end in "| EdgeWeb". This default only covers a route that
  // forgets to set its own (e.g. /admin).
  title: `${SITE_NAME} | Custom Software & Web Development Company`,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0B0A0C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500;1,9..144,600&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={organizationSchema()} />
      </head>
      <body>
        {children}

        {/* Google tag (gtag.js) — site-wide */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N6ENRE99LH"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N6ENRE99LH');
          `}
        </Script>
      </body>
    </html>
  );
}
