import { photos, photosByStyle, PortfolioPhoto } from '@/data/portfolio';

/**
 * Helpers for blog posts rendered in the editorial layout.
 * Blog content comes from Supabase as HTML; we split it at every <h2> so
 * each section can be shown heading-left / text-right, and add rows of
 * portfolio photos between sections.
 */

export interface ArticleSection {
  id: string;
  title: string;
  html: string;
}

export const slugifyHeading = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

/** Split sanitized HTML into an intro (before the first h2) and h2 sections. */
export const splitArticle = (html: string): { intro: string; sections: ArticleSection[] } => {
  if (typeof window === 'undefined' || !html) return { intro: html || '', sections: [] };
  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, 'text/html');
  const root = doc.getElementById('root');
  if (!root) return { intro: html, sections: [] };

  let intro = '';
  const sections: ArticleSection[] = [];
  const used = new Set<string>();
  Array.from(root.childNodes).forEach((node) => {
    // drop empty paragraphs left by the editor
    if (node.nodeType === 1 && (node as Element).tagName === 'P' && !(node as Element).textContent?.trim()) return;
    if (node.nodeType === 3 && !node.textContent?.trim()) return;
    if (node.nodeType === 1 && (node as Element).tagName === 'H2') {
      const title = (node as Element).textContent?.trim() || '';
      let id = slugifyHeading(title) || `section-${sections.length + 1}`;
      while (used.has(id)) id += '-2';
      used.add(id);
      sections.push({ id, title, html: '' });
      return;
    }
    const chunk = node.nodeType === 1 ? (node as Element).outerHTML : node.textContent || '';
    if (sections.length) sections[sections.length - 1].html += chunk;
    else intro += chunk;
  });
  return { intro, sections };
};

export const wordCount = (html: string) =>
  html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

/**
 * Optimized local covers (WebP, max 2000px, q78) — the originals in
 * storage are 0.7–1.1 MB. Falls back to the post's own image_url.
 */
export const BLOG_COVERS: Record<string, { src: string; w: number; h: number }> = {
  Minimalismsilinceandthetattoo: { src: '/images/blog/minimalism-silence-tattoo-okan-uckun-cover.webp', w: 2000, h: 2000 },
  'minimalist-tattoo-ideas': { src: '/images/blog/minimalist-tattoo-ideas-okan-uckun-cover.webp', w: 1556, h: 1920 },
  'single-needle-tattoo': { src: '/images/blog/single-needle-tattoo-okan-uckun-cover.webp', w: 1515, h: 1920 },
};

/** Photo rows shown between sections, chosen to match each article. */
const ARTICLE_PHOTOS: Record<string, number[][]> = {
  'minimalist-tattoo-ideas': [[69, 72, 101], [23, 44], [15, 105, 33], [61, 107]],
  'single-needle-tattoo': [[100, 55, 28], [86, 66], [99, 52, 67], [10]],
  Minimalismsilinceandthetattoo: [[47], [89, 69], [23, 26, 44], [78, 92]],
};

const FALLBACK_STYLE: Record<string, 'minimalist' | 'fine line' | 'geometric' | 'linework'> = {
  'Tattoo Styles': 'fine line',
  'Tattoo Ideas': 'minimalist',
  Inspiration: 'minimalist',
};

export const articlePhotoRows = (slug: string, category: string | null): PortfolioPhoto[][] => {
  const rows = ARTICLE_PHOTOS[slug];
  if (rows) return rows.map((r) => photos(...r));
  const pool = photosByStyle(FALLBACK_STYLE[category || ''] || 'minimalist');
  return [pool.slice(0, 3), pool.slice(3, 5), pool.slice(5, 8), pool.slice(8, 10)];
};

/** Which style page an article links to in its "explore" block. */
export const ARTICLE_STYLE_LINK: Record<string, { to: string; label: string }> = {
  'minimalist-tattoo-ideas': { to: '/minimalist-tattoos', label: 'Minimalist tattoos' },
  'single-needle-tattoo': { to: '/fine-line-tattoos', label: 'Fine line tattoos' },
  Minimalismsilinceandthetattoo: { to: '/minimalist-tattoos', label: 'Minimalist tattoos' },
};
