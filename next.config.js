/** @type {import('next').NextConfig} */

// Section 3.1 fix: canonicalize on https://www.edgeweb.co and 301 everything
// else to it (apex domain, and any accidental http). This only takes effect
// once both edgeweb.co and www.edgeweb.co are attached to this project in
// your host (e.g. Vercel) — the redirect can't fire for a domain that isn't
// routed to this app yet.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://images.dmca.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com",
  "connect-src 'self' https://www.googleapis.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.google.com https://www.googletagmanager.com https://images.dmca.com https://www.dmca.com",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'edgeweb.co' }],
        destination: 'https://www.edgeweb.co/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: CSP },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
      {
        source: '/llms-full.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
    ];
  },
};

module.exports = nextConfig;
