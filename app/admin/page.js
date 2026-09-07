import { cookies } from 'next/headers';
import { getSiteConfig } from '../../lib/siteConfig';

export const metadata = { robots: { index: false, follow: false } };

const style = `
  body{ margin:0; }
  .admin-wrap{ font-family:Arial,sans-serif; background:#0c0d12; color:#f5f5f5; min-height:100vh; }
  .inner{ max-width:1100px; margin:auto; padding:30px 20px 60px; }
  .topbar{ display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
  .box{ background:#171b23; border:1px solid #2d3543; border-radius:16px; padding:22px; margin-bottom:20px; }
  h2{ margin-top:0; }
  form.grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
  .full{ grid-column:1 / -1; }
  label{ display:flex; flex-direction:column; gap:8px; font-size:13px; color:#d7e1ec; }
  input, textarea{ width:100%; padding:10px 12px; border-radius:10px; border:1px solid #374151; background:#0f1218; color:white; font-family:inherit; }
  textarea{ min-height:120px; resize:vertical; }
  button{ background:linear-gradient(135deg,#d24545,#ff7a59); color:white; border:none; padding:12px 18px; border-radius:10px; font-weight:700; cursor:pointer; }
  .flash{ padding:10px 12px; border-radius:10px; background:#132a1d; border:1px solid #2a6d4d; color:#d6ffe7; margin-bottom:12px; }
  .error{ color:#ffb0b0; }
  .login-card{ width:min(420px,90vw); margin:80px auto; background:#171b23; border:1px solid #2f3744; border-radius:16px; padding:28px; }
  .login-card h1{ margin-top:0; font-size:28px; }
  .login-card .small{ margin-top:10px; color:#b9c4d1; font-size:13px; }
  a.logout{ color:#fff; text-decoration:none; }
`;

export default async function AdminPage({ searchParams }) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const isAuthed = cookieStore.get('edgeweb_admin_auth')?.value === 'true';

  if (!isAuthed) {
    return (
      <div className="admin-wrap">
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <div className="login-card">
          <h1>EdgeWeb Admin</h1>
          <form method="POST" action="/api/admin/login">
            <input type="password" name="password" placeholder="Admin password" required />
            <div style={{ marginTop: 16 }}>
              <button type="submit">Login</button>
            </div>
          </form>
          {resolvedSearchParams?.error && <p className="error">Invalid password.</p>}
          <div className="small">
            Editable copy here is a legacy convenience — live pages are server-rendered directly and don&apos;t read this config.
          </div>
        </div>
      </div>
    );
  }

  const content = await getSiteConfig();

  return (
    <div className="admin-wrap">
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div className="inner">
        <div className="topbar">
          <h1>EdgeWeb CMS</h1>
          <form method="POST" action="/api/admin/logout">
            <button type="submit" className="logout" style={{ background: 'none', padding: 0 }}>Logout</button>
          </form>
        </div>

        {resolvedSearchParams?.message && <div className="flash">{resolvedSearchParams.message}</div>}

        <div className="box">
          <h2>Site content</h2>
          <form className="grid" method="POST" action="/api/admin/save">
            <label className="full"><span>Site name</span><input name="siteName" defaultValue={content.siteName || ''} /></label>
            <label className="full"><span>Page title</span><input name="pageTitle" defaultValue={content.pageTitle || ''} /></label>
            <label className="full"><span>Meta description</span><textarea name="metaDescription" defaultValue={content.metaDescription || ''} /></label>
            <label className="full"><span>Hero badge</span><input name="heroBadge" defaultValue={content.heroBadge || ''} /></label>
            <label className="full"><span>Hero heading</span><input name="heroHeading" defaultValue={content.heroHeading || ''} /></label>
            <label className="full"><span>Hero subheading</span><textarea name="heroSubheading" defaultValue={content.heroSubheading || ''} /></label>
            <label><span>Contact email</span><input name="contactEmail" defaultValue={content.contactEmail || ''} /></label>
            <label><span>Phone</span><input name="phone" defaultValue={content.phone || ''} /></label>
            <label className="full"><span>Footer text</span><input name="footerText" defaultValue={content.footerText || ''} /></label>
            <div className="full"><button type="submit">Save changes</button></div>
          </form>
        </div>

        <p style={{ color: '#8b95a3', fontSize: 13 }}>
          Note: this screen edits a config record for reference/handoff purposes. The live pages under
          {' '}<code>/app</code> are server-rendered from fixed content so search engines always see final copy —
          wire a field back into a page manually if you want it live-editable again.
        </p>
      </div>
    </div>
  );
}
