// Build-time sitemap generator.
//
// Queries Supabase for published blog posts + projects and writes a fresh
// public/sitemap.xml that includes both static routes and dynamic ones.
//
// Run via `npm run build:sitemap` (wired into the build script).
//
// Env vars consumed (same names the app uses at runtime):
//   VITE_SUPABASE_URL                 — Supabase project URL
//   VITE_SUPABASE_PUBLISHABLE_KEY     — anon key (RLS-respecting reads)
//
// Falls back to the values found in .env if they're not in process.env so
// `npm run build` Just Works locally and in CI.

import { createClient } from '@supabase/supabase-js';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'public', 'sitemap.xml');
const SITE = 'https://okanuckun.com';

// Static routes — kept here so the sitemap is the single source of truth.
// `priority` and `changefreq` reflect how often we expect each page to
// change; they're hints to crawlers, not hard rules.
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/work', priority: '0.9', changefreq: 'weekly' },
  { path: '/project', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/aftercare', priority: '0.7', changefreq: 'monthly' },
  { path: '/booking', priority: '0.8', changefreq: 'weekly' },
  { path: '/fine-line-tattoos', priority: '0.9', changefreq: 'monthly' },
  { path: '/geometric-tattoos', priority: '0.9', changefreq: 'monthly' },
  { path: '/line-work-tattoos', priority: '0.9', changefreq: 'monthly' },
  { path: '/minimalist-tattoos', priority: '0.9', changefreq: 'monthly' },
  { path: '/shop', priority: '0.7', changefreq: 'weekly' },
];

// Routes that exist in App.tsx but should NOT appear in the sitemap:
//   /appointment      → <Navigate> redirect to /booking (canonical is /booking)
//   /article          → renders the Blog component as an alias (canonical is /blog)
//   /line-work-tattos → <Navigate> redirect (typo alias for /line-work-tattoos)
//   /auth /admin /eeg → blocked in robots.txt + SEOHead noindex

async function loadEnv() {
  // Allow either process.env (CI / shell) or the .env file (local dev).
  if (process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    return {
      url: process.env.VITE_SUPABASE_URL,
      key: process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    };
  }
  try {
    const envText = await readFile(resolve(ROOT, '.env'), 'utf8');
    const get = (k) => {
      const m = envText.match(new RegExp(`^${k}\\s*=\\s*"?([^"\\n]+)"?`, 'm'));
      return m ? m[1] : '';
    };
    return {
      url: get('VITE_SUPABASE_URL'),
      key: get('VITE_SUPABASE_PUBLISHABLE_KEY'),
    };
  } catch {
    return { url: '', key: '' };
  }
}

const escapeXml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const urlEntry = ({ loc, lastmod, priority, changefreq }) => {
  const parts = [`    <loc>${escapeXml(loc)}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${lastmod.slice(0, 10)}</lastmod>`);
  if (priority) parts.push(`    <priority>${priority}</priority>`);
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
  return `  <url>\n${parts.join('\n')}\n  </url>`;
};

async function main() {
  const { url, key } = await loadEnv();
  if (!url || !key) {
    console.warn(
      '[build-sitemap] Supabase env not found. Writing static-only sitemap. ' +
        'Set VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY for dynamic entries.',
    );
  }

  let blogPosts = [];
  let projects = [];

  if (url && key) {
    const supabase = createClient(url, key);

    const blogRes = await supabase
      .from('blog_posts')
      .select('slug, created_at, updated_at')
      .eq('published', true);
    if (blogRes.error) {
      console.warn('[build-sitemap] blog_posts query failed:', blogRes.error.message);
    } else {
      blogPosts = blogRes.data ?? [];
    }

    const projRes = await supabase
      .from('projects')
      .select('slug, id, created_at, updated_at')
      .eq('published', true);
    if (projRes.error) {
      console.warn('[build-sitemap] projects query failed:', projRes.error.message);
    } else {
      projects = projRes.data ?? [];
    }
  }

  const entries = [];

  for (const r of STATIC_ROUTES) {
    entries.push(
      urlEntry({
        loc: `${SITE}${r.path}`,
        priority: r.priority,
        changefreq: r.changefreq,
      }),
    );
  }

  for (const post of blogPosts) {
    if (!post.slug) continue;
    entries.push(
      urlEntry({
        loc: `${SITE}/blog/${post.slug}`,
        lastmod: post.updated_at || post.created_at,
        priority: '0.7',
        changefreq: 'monthly',
      }),
    );
  }

  for (const proj of projects) {
    const slug = proj.slug || proj.id;
    if (!slug) continue;
    entries.push(
      urlEntry({
        loc: `${SITE}/project/${slug}`,
        lastmod: proj.updated_at || proj.created_at,
        priority: '0.7',
        changefreq: 'monthly',
      }),
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
    '\n',
  )}\n</urlset>\n`;

  await writeFile(OUT, xml, 'utf8');
  console.log(
    `[build-sitemap] wrote ${OUT} — ${STATIC_ROUTES.length} static + ${blogPosts.length} blog + ${projects.length} project routes`,
  );
}

main().catch((err) => {
  console.error('[build-sitemap] failed:', err);
  process.exit(1);
});
