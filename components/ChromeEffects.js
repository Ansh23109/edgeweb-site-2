// Skip-link, preloader, scroll-progress bar, custom cursor and grain overlay
// shared by every full-chrome page. Behaviour is wired up by each page's own
// script (see /content/*/script.js) so it runs once per full page load.
export default function ChromeEffects() {
  return (
    <>
      <a href="#top" className="skip-link">Skip to content</a>

      <div className="preloader" id="preloader" aria-hidden="true">
        <div className="preloader-panel left">
          <span className="preloader-mark"><em>Edge</em><b>Web</b></span>
        </div>
        <div className="preloader-panel right"></div>
        <div className="preloader-count" id="preloaderCount">00</div>
      </div>

      <div className="scroll-progress" id="scrollProgress"></div>

      <div className="cursor-ring" id="cursorRing" aria-hidden="true">
        <span className="cursor-label" id="cursorLabel"></span>
      </div>
      <div className="cursor-dot" id="cursorDot" aria-hidden="true"></div>

      <div className="grain"></div>
    </>
  );
}
