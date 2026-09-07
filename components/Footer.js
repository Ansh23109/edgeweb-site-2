import {
  FOOTER_EXPLORE_LINKS,
  FOOTER_SERVICE_LINKS,
  LINKEDIN_URL,
  WHATSAPP_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
} from '../lib/site';

export default function Footer({ showGoodfirmsBadge = false }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap mega-footer">
        <div className="mega-footer-top">
          <div className="mega-col mega-col-brand">
            <a href="/" className="logo">
              <em>Edge</em>
              <b>Web</b>
            </a>
            <p>
              A technology, automation and growth partner — building the systems
              businesses run on, from India, for anywhere.
            </p>
            {showGoodfirmsBadge && (
              <div className="footer-goodfirms" aria-label="GoodFirms verified company badge">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 42" aria-label="Goodfirms" role="img">
                  <defs>
                    <linearGradient id="footerGoodfirmsGold" x1="0" x2="1">
                      <stop offset="0%" stopColor="#f2d38a" />
                      <stop offset="25%" stopColor="#d8b96b" />
                      <stop offset="55%" stopColor="#c59d42" />
                      <stop offset="100%" stopColor="#f2d38a" />
                    </linearGradient>
                    <linearGradient id="footerGoodfirmsEdge" x1="0" x2="1">
                      <stop offset="0%" stopColor="#f5e6b7" />
                      <stop offset="100%" stopColor="#b6852d" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 2.5c-10.5 0-18 7.5-18 18 0 9.1 6.1 16.7 14.8 18.4l.6.1c.8.1 1.4-.5 1.4-1.3V21.2c0-.8-.7-1.4-1.4-1.4h-2.3v-3.8c0-.8.7-1.4 1.4-1.4h2.8c.8 0 1.5-.7 1.5-1.5 0-.8-.7-1.5-1.5-1.5h-3.4C8.8 11.6 4 15.9 4 21.7c0 8.2 6.8 14.8 15.2 14.8 8.7 0 15.8-7 15.8-15.8 0-5.4-2.8-10.1-7.1-13.1-.7-.5-1.7-.2-2.1.5L19 11.7c-.2.4-.2.9 0 1.3l.5.8c.3.5 1 .7 1.6.4l1.3-.7c.7-.4 1.6-.2 2 .4l.7 1.1c.5.8.2 1.8-.6 2.3l-1.5.9c-.8.5-1.2 1.5-1 2.4l.4 1.8c.2.9 1.1 1.4 2 1.2l1.6-.4c1.1-.3 2.2 0 2.9.7l1.3 1.3c.4.4.9.6 1.4.6h1.4c.8 0 1.4-.6 1.4-1.4V21.2c0-9.4-7.5-17-17-17z"
                    fill="url(#footerGoodfirmsGold)"
                    stroke="url(#footerGoodfirmsEdge)"
                    strokeWidth="1.3"
                  />
                  <path d="M22.6 12.6l2.3 4.5 5 .7-3.6 3.4 1 4.9-4.7-2.4-4.7 2.4 1-4.9-3.6-3.4 5-.7 2.3-4.5z" fill="#fff" />
                  <text x="62" y="28" fontSize="23" fontWeight="700" fill="#f6f7f9" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="-0.8">
                    Goodfirms
                  </text>
                </svg>
              </div>
            )}
            <div className="social-row">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener" aria-label="EdgeWeb on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email EdgeWeb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18v12H3z" /><path d="m3 7 9 6 9-6" /></svg>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" aria-label="WhatsApp EdgeWeb">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0 0 12.01 22C17.52 22 22 17.52 22 12S17.52 2 12.01 2zm5.4 14.15c-.23.64-1.32 1.22-1.82 1.28-.47.06-1.02.09-1.65-.1-.38-.12-.87-.28-1.5-.55-2.63-1.14-4.35-3.8-4.48-3.98-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.19.23-.26.5-.32.67-.32.17 0 .34 0 .48.01.16.01.36-.06.57.43.23.55.77 1.9.84 2.03.07.14.11.3.02.48-.09.18-.14.29-.27.44-.14.16-.29.35-.41.47-.14.14-.28.29-.12.56.16.28.71 1.16 1.52 1.88 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.25.09 1.58.75 1.85.88.28.14.46.2.53.32.07.12.07.68-.16 1.32z" /></svg>
              </a>
            </div>
          </div>

          <div className="mega-col">
            <h4>Explore</h4>
            <ul>
              {FOOTER_EXPLORE_LINKS.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="mega-col">
            <h4>Services</h4>
            <ul>
              {FOOTER_SERVICE_LINKS.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="mega-col mega-col-cta">
            <p className="mega-cta-title">
              Have an idea?
              <br />
              Let&apos;s build it.
            </p>
            <a href="/contact" className="btn btn-primary magnetic" data-track="cta_footer_start_project">
              Start a Project →
            </a>
            <ul style={{ marginTop: 20 }}>
              <li><a href={`tel:${CONTACT_PHONE_E164}`}>{CONTACT_PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            </ul>
          </div>
        </div>

        <div className="mega-footer-bottom">
          <p className="body">© {year} EdgeWeb. Engineered in India.</p>
          <ul className="footer-links">
            <li><a href="/">Privacy</a></li>
            <li><a href="/">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
