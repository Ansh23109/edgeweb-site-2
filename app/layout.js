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
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  keywords:
    'web development company near me, best SEO expert near me, digital marketing agency near me, app development company near me, software development company in India, web development company USA, digital agency Europe, web development company Australia, custom software development, AI automation agency, website design company, SEO services',
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

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K8KRF8CB');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K8KRF8CB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
