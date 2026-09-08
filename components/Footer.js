import Script from 'next/script';
import {
  FOOTER_EXPLORE_LINKS,
  FOOTER_SERVICE_LINKS,
  LINKEDIN_URL,
  WHATSAPP_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
} from '../lib/site';

const DMCA_BADGE_ID = '2ec30c9c-ae6d-4303-a0ea-77fd66d28f07';

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
                <img src="/images/goodfirms-badge.png" alt="GoodFirms" />
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
          <a
            href={`//www.dmca.com/Protection/Status.aspx?ID=${DMCA_BADGE_ID}`}
            title="DMCA.com Protection Status"
            className="dmca-badge"
            target="_blank"
            rel="noopener"
          >
            <img
              src={`https://images.dmca.com/Badges/dmca-badge-w250-5x1-06.png?ID=${DMCA_BADGE_ID}`}
              alt="DMCA.com Protection Status"
              width={150}
              height={30}
              style={{ display: 'block' }}
            />
          </a>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
          </ul>
        </div>
      </div>

      <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" strategy="lazyOnload" />
    </footer>
  );
}
