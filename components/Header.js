import { NAV_LINKS } from '../lib/site';

export default function Header() {
  return (
    <header id="siteHeader">
      <div className="wrap">
        <nav>
          <a href="/" className="logo">
            <em>Edge</em>
            <b>Web</b>
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-cta">
            <a
              href="/contact"
              className="btn btn-ghost magnetic"
              data-track="cta_nav_start_project"
            >
              Start a Project
            </a>
            <button
              className="nav-burger"
              id="navBurger"
              aria-label="Open menu"
              aria-expanded="false"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
