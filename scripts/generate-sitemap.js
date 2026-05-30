/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogArticles } from '../src/data/blogArticles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://iflexpdf.online';

const currentDate = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },

  { path: '/merge', priority: '0.9', changefreq: 'weekly' },
  { path: '/split', priority: '0.9', changefreq: 'weekly' },
  { path: '/compress', priority: '0.9', changefreq: 'weekly' },
  { path: '/image-to-pdf', priority: '0.9', changefreq: 'weekly' },
  { path: '/pdf-to-image', priority: '0.9', changefreq: 'weekly' },
  { path: '/organize', priority: '0.9', changefreq: 'weekly' },
  { path: '/pdf-to-text', priority: '0.9', changefreq: 'weekly' },
  { path: '/word-to-pdf', priority: '0.9', changefreq: 'weekly' },
  { path: '/protect', priority: '0.9', changefreq: 'weekly' },
  { path: '/unlock', priority: '0.9', changefreq: 'weekly' },
  { path: '/rotate', priority: '0.9', changefreq: 'weekly' },
  { path: '/watermark', priority: '0.9', changefreq: 'weekly' },
  { path: '/page-numbers', priority: '0.9', changefreq: 'weekly' },
  { path: '/delete-pages', priority: '0.9', changefreq: 'weekly' },

  { path: '/blog', priority: '0.8', changefreq: 'daily' },

  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/security', priority: '0.6', changefreq: 'monthly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },

  { path: '/privacy', priority: '0.4', changefreq: 'monthly' },
  { path: '/terms', priority: '0.4', changefreq: 'monthly' },
  { path: '/cookies', priority: '0.4', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.4', changefreq: 'monthly' },

  { path: '/sitemap', priority: '0.5', changefreq: 'monthly' }
];

blogArticles.forEach((article) => {
  let lastmod = currentDate;
  try {
    const parsedDate = new Date(article.date);
    if (!isNaN(parsedDate.getTime())) {
      lastmod = parsedDate.toISOString().split('T')[0];
    }
  } catch (e) {
    // 
  }

  routes.push({
    path: `/blog/${article.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod
  });
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

routes.forEach((route) => {
  const url = `${BASE_URL}${route.path}`;
  const lastmod = route.lastmod || currentDate;
  xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>\n`;
});

xml += `</urlset>\n`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');

const publicDir = path.dirname(outputPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(outputPath, xml, 'utf8');

console.log(`[SEO-SITEMAP] Perfect sitemap.xml generated with ${routes.length} URLs at: ${outputPath}`);
