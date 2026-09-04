const { kv } = require('@vercel/kv');

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

async function getSiteData() {
  try {
    const data = await kv.get('edgeweb-site-config');
    return data || defaultConfig;
  } catch (error) {
    return defaultConfig;
  }
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await getSiteData();
    return res.status(200).json(data);
  }

  return res.status(405).json({ ok: false, message: 'Method not allowed' });
};
