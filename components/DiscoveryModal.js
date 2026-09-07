import { WHATSAPP_URL } from '../lib/site';

export default function DiscoveryModal() {
  return (
    <div
      className="discovery-overlay"
      id="discoveryOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="discoveryTitle"
    >
      <div className="discovery-modal">
        <button className="discovery-close" id="discoveryClose" aria-label="Close">
          &times;
        </button>
        <div className="discovery-progress" id="discoveryProgress">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <h2
          id="discoveryTitle"
          style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
        >
          Project discovery form
        </h2>

        <form id="discoveryForm" noValidate>
          <div className="discovery-step active" data-step="1">
            <p className="discovery-eyebrow">Step 1 of 6</p>
            <p className="discovery-q">What are you looking to build?</p>
            <div className="discovery-options" data-field="buildType">
              {['Website', 'Mobile App', 'Software', 'AI Solution', 'Automation', 'Marketing', 'Branding', 'Something else'].map((opt) => (
                <button type="button" className="discovery-opt" key={opt}>{opt}</button>
              ))}
            </div>
            <p className="discovery-error" data-error-for="buildType">Pick one to continue.</p>
          </div>

          <div className="discovery-step" data-step="2">
            <p className="discovery-eyebrow">Step 2 of 6</p>
            <p className="discovery-q">What&apos;s the main goal?</p>
            <div className="discovery-options" data-field="goal">
              {['Generate leads', 'Increase sales', 'Automate operations', 'Launch a new product', 'Improve existing system', 'Improve brand presence', 'Reduce manual work', 'Other'].map((opt) => (
                <button type="button" className="discovery-opt" key={opt}>{opt}</button>
              ))}
            </div>
            <p className="discovery-error" data-error-for="goal">Pick one to continue.</p>
          </div>

          <div className="discovery-step" data-step="3">
            <p className="discovery-eyebrow">Step 3 of 6</p>
            <p className="discovery-q">Tell us about the project.</p>
            <div className="discovery-field">
              <textarea className="discovery-textarea" name="details" placeholder="What are you trying to do, and what's not working today?"></textarea>
            </div>
            <p className="discovery-error" data-error-for="details">A few sentences helps us reply with something useful.</p>
          </div>

          <div className="discovery-step" data-step="4">
            <p className="discovery-eyebrow">Step 4 of 6</p>
            <p className="discovery-q">Budget</p>
            <div className="discovery-options" data-field="budget">
              {['Under ₹50K', '₹50K–₹1L', '₹1L–₹3L', '₹3L–₹5L', '₹5L–₹10L', '₹10L+', 'Not sure yet'].map((opt) => (
                <button type="button" className="discovery-opt" key={opt}>{opt}</button>
              ))}
            </div>
            <p className="discovery-error" data-error-for="budget">Pick one to continue.</p>
          </div>

          <div className="discovery-step" data-step="5">
            <p className="discovery-eyebrow">Step 5 of 6</p>
            <p className="discovery-q">Timeline</p>
            <div className="discovery-options" data-field="timeline">
              {['ASAP', '1–2 months', '3–6 months', '6+ months', 'Flexible'].map((opt) => (
                <button type="button" className="discovery-opt" key={opt}>{opt}</button>
              ))}
            </div>
            <p className="discovery-error" data-error-for="timeline">Pick one to continue.</p>
          </div>

          <div className="discovery-step" data-step="6">
            <p className="discovery-eyebrow">Step 6 of 6</p>
            <p className="discovery-q">Contact details</p>
            <div className="discovery-field">
              <label htmlFor="dName">Name *</label>
              <input className="discovery-input" type="text" id="dName" name="name" required />
            </div>
            <div className="discovery-field">
              <label htmlFor="dCompany">Company</label>
              <input className="discovery-input" type="text" id="dCompany" name="company" />
            </div>
            <div className="discovery-field">
              <label htmlFor="dEmail">Work Email *</label>
              <input className="discovery-input" type="email" id="dEmail" name="email" required />
            </div>
            <div className="discovery-field">
              <label htmlFor="dPhone">Phone / WhatsApp</label>
              <input className="discovery-input" type="tel" id="dPhone" name="phone" />
            </div>
            <p className="discovery-error" data-error-for="contact">Please fill in your name and a valid work email.</p>
            <input type="hidden" name="utm_source" id="dUtmSource" />
            <input type="hidden" name="utm_medium" id="dUtmMedium" />
            <input type="hidden" name="utm_campaign" id="dUtmCampaign" />
            <input type="hidden" name="landing_page" id="dLandingPage" />
            <input type="hidden" name="referrer" id="dReferrer" />
          </div>

          <div className="discovery-step" data-step="success">
            <div className="discovery-success">
              <p className="eyebrow" style={{ justifyContent: 'center' }}>Request received</p>
              <h2 className="display-md">Thanks — we&apos;ve got it.</h2>
              <p className="body" style={{ maxWidth: '44ch', margin: '18px auto 0' }}>
                We&apos;ve received your requirement. We&apos;ll get back to you shortly with the next steps. If it&apos;s urgent, WhatsApp us directly.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
                <a href={WHATSAPP_URL} className="btn btn-ghost" target="_blank" rel="noopener">
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="discovery-nav" id="discoveryNav">
            <button type="button" className="discovery-back" id="discoveryBack">&larr; Back</button>
            <button type="button" className="btn btn-primary magnetic" id="discoveryNext" data-track="discovery_step_next">Continue &rarr;</button>
          </div>
        </form>
      </div>
    </div>
  );
}
