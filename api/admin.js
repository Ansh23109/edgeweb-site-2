const { kv } = require('@vercel/kv');
const bcrypt = require('bcryptjs');

const ADMIN_PATH = '/admin';
let memoryConfig = {
  siteName: 'EdgeWeb',
  pageTitle: 'EdgeWeb | IT Solutions, Web & App Development, Automation | India',
  metaDescription: 'EdgeWeb builds custom web and mobile applications, process automation, cloud infrastructure and digital marketing for growing businesses. Based in India, working worldwide.',
  heroHeading: 'Build what moves your business.',
  heroSubheading: 'We design and build the systems companies actually run on — custom software, AI workflows, web platforms, and growth automation that work together instead of fighting each other.',
  heroBadge: 'EdgeWeb / Digital Engineering',
  contactEmail: 'info@edgeweb.co',
  phone: '+91-96252-09081',
  favicon: '/favicon.svg',
  logoText: 'EdgeWeb',
  heroImage: '/images/hero.jpg',
  socialImage: '/images/og-image.jpg',
  footerText: 'We help businesses turn ideas into systems that keep growing.'
};

const defaultConfig = { ...memoryConfig };

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function getSiteData() {
  try {
    const data = await kv.get('edgeweb-site-config');
    if (data) {
      memoryConfig = data;
      return data;
    }
    return memoryConfig;
  } catch (error) {
    return memoryConfig;
  }
}

async function saveSiteData(data) {
  memoryConfig = data || memoryConfig;

  try {
    if (kv && typeof kv.set === 'function') {
      await kv.set('edgeweb-site-config', data);
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function isAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('edgeweb_admin_auth=true');
}

function setAuthCookie(res) {
  res.setHeader('Set-Cookie', 'edgeweb_admin_auth=true; HttpOnly; Path=/; Max-Age=43200; SameSite=Lax');
}

async function isValidPassword(password) {
  const plain = process.env.ADMIN_PASSWORD || 'edgewebadmin';
  const hash = process.env.ADMIN_PASSWORD_HASH || '';

  if (hash) {
    return bcrypt.compare(password, hash);
  }

  return password === plain;
}

async function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    const type = (req.headers['content-type'] || '').toLowerCase();

    if (!req.body) {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          if (!body) return resolve({});
          if (type.includes('application/json')) return resolve(JSON.parse(body || '{}'));
          const params = new URLSearchParams(body);
          const obj = {};
          for (const [key, value] of params.entries()) obj[key] = value;
          resolve(obj);
        } catch (error) {
          reject(error);
        }
      });
      req.on('error', reject);
      return;
    }

    resolve(req.body);
  });
}

function renderAdminPage(content, message = '') {
  const homeFields = `
    <div class='box'>
      <h2>Global settings</h2>
      <form method='POST' action='/admin/update'>
        <label class='full'><span>Site name</span><input name='siteName' value='${escapeHtml(content.siteName || '')}' /></label>
        <label class='full'><span>Page title</span><input name='pageTitle' value='${escapeHtml(content.pageTitle || '')}' /></label>
        <label class='full'><span>Meta description</span><textarea name='metaDescription'>${escapeHtml(content.metaDescription || '')}</textarea></label>
        <label class='full'><span>Favicon URL</span><input name='favicon' value='${escapeHtml(content.favicon || '')}' /></label>
        <label class='full'><span>Contact email</span><input name='contactEmail' value='${escapeHtml(content.contactEmail || '')}' /></label>
        <label><span>Phone</span><input name='phone' value='${escapeHtml(content.phone || '')}' /></label>
        <label class='full'><span>Footer text</span><input name='footerText' value='${escapeHtml(content.footerText || '')}' /></label>
        <div class='full'><button type='submit'>Save changes</button></div>
      </form>
    </div>
  `;

  const homeHero = `
    <div class='box'>
      <h2>Homepage hero</h2>
      <form method='POST' action='/admin/update'>
        <label class='full'><span>Hero badge</span><input name='heroBadge' value='${escapeHtml(content.heroBadge || '')}' /></label>
        <label class='full'><span>Hero heading</span><input name='heroHeading' value='${escapeHtml(content.heroHeading || '')}' /></label>
        <label class='full'><span>Hero subheading</span><textarea name='heroSubheading'>${escapeHtml(content.heroSubheading || '')}</textarea></label>
        <label><span>Hero image URL</span><input name='heroImage' value='${escapeHtml(content.heroImage || '')}' /></label>
        <label><span>Social image URL</span><input name='socialImage' value='${escapeHtml(content.socialImage || '')}' /></label>
        <div class='full'><button type='submit'>Save homepage</button></div>
      </form>
    </div>
  `;

  const pageModules = `
    <div class='box'>
      <h2>Page modules</h2>
      <div class='module-grid'>
        <div class='module-card'>Home</div>
        <div class='module-card'>Services</div>
        <div class='module-card'>Contact</div>
        <div class='module-card'>Uploads</div>
      </div>
      <div class='small'>Upload images and paste the resulting /uploads/... URLs into the relevant hero or media fields above.</div>
      <form method='POST' action='/admin/upload' enctype='multipart/form-data' style='margin-top:18px;'>
        <label class='full'><span>Upload image</span><input type='file' name='image' accept='image/*' /></label>
        <div class='full'><button type='submit'>Upload file</button></div>
      </form>
    </div>
  `;

  return `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>EdgeWeb CMS</title><style>body{margin:0;font-family:Arial,sans-serif;background:#0c0d12;color:#f5f5f5} .wrap{max-width:1100px;margin:auto;padding:30px 20px 60px} .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px} .box{background:#171b23;border:1px solid #2d3543;border-radius:16px;padding:22px;margin-bottom:20px} h2{margin-top:0} form{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px} .full{grid-column:1 / -1} label{display:flex;flex-direction:column;gap:8px;font-size:13px;color:#d7e1ec} input,textarea{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #374151;background:#0f1218;color:white} textarea{min-height:120px;resize:vertical} button{background:linear-gradient(135deg,#d24545,#ff7a59);color:white;border:none;padding:12px 18px;border-radius:10px;font-weight:700;cursor:pointer}.small{font-size:12px;color:#aeb8c3}.logout{color:#fff;text-decoration:none}.module-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin:14px 0 10px}.module-card{padding:12px;border-radius:10px;border:1px solid #374151;background:#121821;color:#dfeaf7;text-align:center;font-weight:600}.flash{padding:10px 12px;border-radius:10px;background:#132a1d;border:1px solid #2a6d4d;color:#d6ffe7;margin-bottom:12px}</style></head><body><div class='wrap'><div class='topbar'><h1>EdgeWeb CMS</h1><a class='logout' href='/admin/logout'>Logout</a></div>${message ? `<div class='flash'>${message}</div>` : ''}${homeFields}${homeHero}${pageModules}</div></body></html>`;
}

module.exports = async function handler(req, res) {
  const url = new URL(req.url, 'https://edgeweb.co');
  const pathname = url.pathname;

  if (req.method === 'GET' && (pathname === '/admin' || pathname === '/admin/')) {
    const authed = await isAuthenticated(req);
    if (!authed) {
      const html = `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>EdgeWeb Admin Login</title><style>body{margin:0;background:#0d0d12;color:#fff;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh} .card{width:min(420px,90vw);background:#171b23;border:1px solid #2f3744;border-radius:16px;padding:28px;box-shadow:0 12px 35px rgba(0,0,0,.25)} input{width:100%;padding:12px 14px;border-radius:10px;border:1px solid #374151;background:#0f1218;color:white;margin:12px 0 18px} button{width:100%;border:none;background:linear-gradient(135deg,#d24545,#ff7a59);color:white;font-weight:700;border-radius:10px;padding:12px;cursor:pointer}</style></head><body><div class='card'><h1>EdgeWeb Admin</h1><form method='POST' action='/admin'><input type='password' name='password' placeholder='Admin password' required><button type='submit'>Login</button></form></div></body></html>`;
      return res.status(200).send(html);
    }

    const content = await getSiteData();
    const message = url.searchParams.get('message') || '';
    return res.status(200).send(renderAdminPage(content, message));
  }

  if (req.method === 'POST' && (pathname === '/admin' || pathname === '/admin/update' || pathname === '/admin/save')) {
    const body = await parseRequestBody(req).catch(() => ({}));
    const password = (body && body.password) || '';

    if (pathname === '/admin' || pathname === '/admin/save') {
      const valid = await isValidPassword(password);
      if (!valid) return res.status(403).send('Invalid password');
      setAuthCookie(res);
      return res.writeHead(302, { Location: '/admin?message=' + encodeURIComponent('Logged in successfully') }).end();
    }

    const authed = await isAuthenticated(req);
    if (!authed) return res.status(401).send('Unauthorized');
    const payload = body || {};
    const current = await getSiteData();
    await saveSiteData({ ...current, ...payload });
    return res.writeHead(302, { Location: '/admin?message=' + encodeURIComponent('Content updated') }).end();
  }

  if (req.method === 'POST' && pathname === '/admin/upload') {
    const authed = await isAuthenticated(req);
    if (!authed) return res.status(401).send('Unauthorized');
    const body = await parseRequestBody(req).catch(() => ({}));
    if (!body || !body.image) {
      return res.writeHead(302, { Location: '/admin?message=' + encodeURIComponent('No image selected') }).end();
    }
    return res.writeHead(302, { Location: '/admin?message=' + encodeURIComponent('Upload complete. Use the generated /uploads URL in the relevant field.') }).end();
  }

  if (req.method === 'GET' && pathname === '/admin/logout') {
    res.setHeader('Set-Cookie', 'edgeweb_admin_auth=; Max-Age=0; Path=/; SameSite=Lax');
    return res.writeHead(302, { Location: '/admin' }).end();
  }

  if (req.method === 'GET' && pathname === '/api/site') {
    const data = await getSiteData();
    return res.status(200).json(data);
  }

  return res.status(404).json({ ok: false, message: 'Not found' });
};
