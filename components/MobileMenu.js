import { NAV_LINKS } from '../lib/site';

export default function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobileMenu">
      <ul>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="mm-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="/contact"
        className="btn btn-primary mm-link"
        data-track="cta_mobile_start_project"
      >
        Start a Project
      </a>
    </div>
  );
}
