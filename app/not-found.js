export const metadata = {
  title: 'Page Not Found',
  description:
    "The page you're looking for doesn't exist. Return to the EdgeWeb homepage to find what you need.",
  robots: { index: false, follow: true },
};

const css = `
  :root{
    --bg:#0B0A0C; --ink:#F5F1EC; --ink-dim:#A79E9A; --ink-faint:#6E6663;
    --accent-bright:#B23A57; --line:rgba(245,241,236,0.11); --line-strong:rgba(245,241,236,0.22);
    --f-display:'Fraunces',serif; --f-body:'Manrope',sans-serif;
  }
  .nf-wrap{
    margin:0; min-height:100svh; background:var(--bg); color:var(--ink); font-family:var(--f-body);
    display:flex; align-items:center; justify-content:center; padding:24px; text-align:center;
  }
  .nf-wrap a{ color:inherit; }
  .nf-code{ font-family:var(--f-display); font-style:italic; font-weight:400; font-size:clamp(64px,14vw,140px); line-height:1; color:var(--ink-dim); }
  .nf-wrap h1{ font-family:var(--f-display); font-weight:400; font-size:clamp(26px,3.4vw,38px); margin:18px 0 14px; }
  .nf-wrap p{ color:var(--ink-dim); max-width:46ch; margin:0 auto 34px; line-height:1.6; }
  .nf-btn{
    display:inline-flex; align-items:center; gap:10px; background:var(--ink); color:var(--bg);
    font-weight:600; font-size:14.5px; padding:15px 28px; border-radius:100px; text-decoration:none;
    transition:background .3s ease;
  }
  .nf-btn:hover{ background:var(--accent-bright); color:var(--ink); }
  .nf-links{ margin-top:30px; display:flex; gap:22px; justify-content:center; flex-wrap:wrap; }
  .nf-links a{ font-size:13.5px; color:var(--ink-faint); text-decoration:none; border-bottom:1px solid transparent; }
  .nf-links a:hover{ color:var(--ink); border-color:var(--line-strong); }
`;

export default function NotFound() {
  return (
    <div className="nf-wrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div>
        <div className="nf-code">404</div>
        <h1>This page doesn&apos;t exist.</h1>
        <p>The page you&apos;re looking for may have moved or the link may be out of date. Here&apos;s how to find what you need instead.</p>
        <a href="/" className="nf-btn">Back to homepage</a>
        <div className="nf-links">
          <a href="/services">Services</a>
          <a href="/case-studies">Our Work</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
