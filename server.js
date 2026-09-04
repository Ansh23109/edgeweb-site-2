const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PATH = '/admin';
const DATA_PATH = path.join(__dirname, 'data');
const SITE_PATH = path.join(__dirname, 'site-data.json');
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'edgewebadmin';

fs.mkdirSync(DATA_PATH, { recursive: true });

const defaultConfig = {
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

if (!fs.existsSync(SITE_PATH)) {
  fs.writeFileSync(SITE_PATH, JSON.stringify(defaultConfig, null, 2));
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DATA_PATH);
    },
    filename: (req, file, cb) => {
      const safe = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '-');
      cb(null, `${Date.now()}-${safe}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(DATA_PATH));
app.use(express.static(__dirname));

app.use(session({
  secret: process.env.SESSION_SECRET || 'edgeweb-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 12 }
}));

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.isAdmin) return next();
  return res.redirect(`${ADMIN_PATH}/login`);
}

function readSiteData() {
  try {
    return JSON.parse(fs.readFileSync(SITE_PATH, 'utf8'));
  } catch (error) {
    return { ...defaultConfig };
  }
}

function writeSiteData(data) {
  fs.writeFileSync(SITE_PATH, JSON.stringify(data, null, 2));
}

function getPublicContent() {
  const data = readSiteData();
  return {
    siteName: data.siteName || defaultConfig.siteName,
    pageTitle: data.pageTitle || defaultConfig.pageTitle,
    metaDescription: data.metaDescription || defaultConfig.metaDescription,
    heroHeading: data.heroHeading || defaultConfig.heroHeading,
    heroSubheading: data.heroSubheading || defaultConfig.heroSubheading,
    heroBadge: data.heroBadge || defaultConfig.heroBadge,
    contactEmail: data.contactEmail || defaultConfig.contactEmail,
    phone: data.phone || defaultConfig.phone,
    favicon: data.favicon || defaultConfig.favicon,
    logoText: data.logoText || defaultConfig.logoText,
    heroImage: data.heroImage || defaultConfig.heroImage,
    socialImage: data.socialImage || defaultConfig.socialImage,
    footerText: data.footerText || defaultConfig.footerText
  };
}

app.get('/api/site', (req, res) => {
  res.json(getPublicContent());
});

app.get(`${ADMIN_PATH}/login`, (req, res) => {
  if (req.session && req.session.isAdmin) return res.redirect(ADMIN_PATH);
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EdgeWeb Admin Login</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0; font-family: Arial, sans-serif; background: #0d0d12; color: #f5f5f5;
            display: grid; place-items: center; min-height: 100vh;
          }
          .card {
            width: min(420px, 90vw); background: #171b23; border: 1px solid #2f3744; border-radius: 16px; padding: 28px;
            box-shadow: 0 12px 35px rgba(0,0,0,.25);
          }
          h1 { margin-top: 0; font-size: 28px; }
          form { display: flex; flex-direction: column; gap: 16px; }
          input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid #374151; background: #0f1218; color: white; }
          button { border: none; background: linear-gradient(135deg, #d24545, #ff7a59); color: white; font-weight: 700; border-radius: 10px; padding: 12px; cursor: pointer; }
          .small { margin-top: 10px; color: #b9c4d1; font-size: 13px; }
          .error { color: #ffb0b0; min-height: 18px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>EdgeWeb Admin</h1>
          <form method="POST" action="${ADMIN_PATH}/login">
            <input type="password" name="password" placeholder="Admin password" required />
            <button type="submit">Login</button>
          </form>
          <div class="small">Default password: edgewebadmin</div>
          <div class="error">${req.query.error ? 'Invalid password.' : ''}</div>
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

app.post(`${ADMIN_PATH}/login`, async (req, res) => {
  const password = req.body.password || '';
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  const match = await bcrypt.compare(password, passwordHash);
  if (!match) return res.redirect(`${ADMIN_PATH}/login?error=1`);
  req.session.isAdmin = true;
  res.redirect(ADMIN_PATH);
});

app.get(`${ADMIN_PATH}`, ensureAuthenticated, (req, res) => {
  const content = readSiteData();
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EdgeWeb CMS</title>
        <style>
          body { margin: 0; font-family: Arial, sans-serif; background: #0c0d12; color: #f5f5f5; }
          .wrap { max-width: 1100px; margin: auto; padding: 30px 20px 60px; }
          .topbar { display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px; }
          .box { background: #171b23; border:1px solid #2d3543; border-radius: 16px; padding: 22px; margin-bottom: 20px; }
          h2 { margin-top: 0; }
          form { display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
          .full { grid-column: 1 / -1; }
          label { display:flex; flex-direction:column; gap:8px; font-size: 13px; color: #d7e1ec; }
          input, textarea { width:100%; padding: 10px 12px; border-radius: 10px; border:1px solid #374151; background:#0f1218; color:white; }
          textarea { min-height: 120px; resize: vertical; }
          button { background: linear-gradient(135deg, #d24545, #ff7a59); color: white; border:none; padding: 12px 18px; border-radius: 10px; font-weight:700; cursor:pointer; }
          .small { font-size: 12px; color: #aeb8c3; }
          .logout { color:#fff; text-decoration:none; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="topbar">
            <h1>EdgeWeb CMS</h1>
            <a href="${ADMIN_PATH}/logout" class="logout">Logout</a>
          </div>

          <div class="box">
            <h2>Site content</h2>
            <form action="${ADMIN_PATH}/save" method="POST">
              <label class="full"><span>Site name</span><input name="siteName" value="${escapeHtml(content.siteName || '')}" /></label>
              <label class="full"><span>Page title</span><input name="pageTitle" value="${escapeHtml(content.pageTitle || '')}" /></label>
              <label class="full"><span>Meta description</span><textarea name="metaDescription">${escapeHtml(content.metaDescription || '')}</textarea></label>
              <label class="full"><span>Hero badge</span><input name="heroBadge" value="${escapeHtml(content.heroBadge || '')}" /></label>
              <label class="full"><span>Hero heading</span><input name="heroHeading" value="${escapeHtml(content.heroHeading || '')}" /></label>
              <label class="full"><span>Hero subheading</span><textarea name="heroSubheading">${escapeHtml(content.heroSubheading || '')}</textarea></label>
              <label><span>Contact email</span><input name="contactEmail" value="${escapeHtml(content.contactEmail || '')}" /></label>
              <label><span>Phone</span><input name="phone" value="${escapeHtml(content.phone || '')}" /></label>
              <label><span>Logo text</span><input name="logoText" value="${escapeHtml(content.logoText || '')}" /></label>
              <label><span>Favicon URL</span><input name="favicon" value="${escapeHtml(content.favicon || '')}" /></label>
              <label><span>Hero image URL</span><input name="heroImage" value="${escapeHtml(content.heroImage || '')}" /></label>
              <label><span>Social image URL</span><input name="socialImage" value="${escapeHtml(content.socialImage || '')}" /></label>
              <label class="full"><span>Footer text</span><input name="footerText" value="${escapeHtml(content.footerText || '')}" /></label>
              <div class="full"><button type="submit">Save changes</button></div>
            </form>
          </div>

          <div class="box">
            <h2>Upload assets</h2>
            <form action="${ADMIN_PATH}/upload" method="POST" enctype="multipart/form-data">
              <label class="full"><span>Upload image</span><input type="file" name="image" accept="image/*" /></label>
              <div class="full"><button type="submit">Upload file</button></div>
            </form>
            <div class="small">Uploaded files appear in /uploads and can be referenced by URL.</div>
          </div>
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

app.post(`${ADMIN_PATH}/save`, ensureAuthenticated, (req, res) => {
  const current = readSiteData();
  const next = { ...current, ...req.body };
  writeSiteData(next);
  res.redirect(ADMIN_PATH);
});

app.post(`${ADMIN_PATH}/upload`, ensureAuthenticated, upload.single('image'), (req, res) => {
  if (!req.file) return res.redirect(`${ADMIN_PATH}?error=upload`);
  const publicUrl = `/uploads/${req.file.filename}`;
  res.redirect(`${ADMIN_PATH}?uploaded=${encodeURIComponent(publicUrl)}`);
});

app.get(`${ADMIN_PATH}/logout`, (req, res) => {
  req.session.destroy(() => {
    res.redirect(`${ADMIN_PATH}/login`);
  });
});

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

app.get('/admin/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`EdgeWeb admin running at http://localhost:${PORT}${ADMIN_PATH}`);
  console.log(`Default admin password: ${DEFAULT_PASSWORD}`);
});
