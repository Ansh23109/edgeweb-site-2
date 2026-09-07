import { WHATSAPP_URL, CONTACT_PHONE_E164 } from '../lib/site';

export default function StickyCtas() {
  return (
    <>
      <div className="sticky-cta-desktop" id="stickyDesktop">
        <span>Have a project in mind?</span>
        <a href="/contact" className="btn btn-primary" data-track="cta_sticky_desktop">
          Start a Conversation →
        </a>
      </div>

      <div className="sticky-bar-mobile" id="stickyMobile">
        <div className="sticky-bar-mobile-row">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" data-track="cta_sticky_whatsapp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0 0 12.01 22C17.52 22 22 17.52 22 12S17.52 2 12.01 2z" /></svg>
            WhatsApp
          </a>
          <a href={`tel:${CONTACT_PHONE_E164}`} data-track="cta_sticky_call">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" /></svg>
            Call
          </a>
          <a href="/contact" className="primary" data-track="cta_sticky_start_project">
            Start Project
          </a>
        </div>
      </div>
    </>
  );
}
