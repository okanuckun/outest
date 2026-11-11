/**
 * Gives every <img> in editor-written HTML an alt text when it has none.
 * Images inserted through the rich-text editor are saved without alt,
 * which search engines flag as "missing alt text". The fallback uses the
 * page title plus the image number, e.g. "NASA Artemis II tattoo – image 2".
 */
export function addMissingAlts(html: string, title: string): string {
  if (!html || typeof window === 'undefined' || !title) return html;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const imgs = Array.from(doc.querySelectorAll('img'));
  if (!imgs.some((img) => !img.getAttribute('alt')?.trim())) return html;
  imgs.forEach((img, i) => {
    if (!img.getAttribute('alt')?.trim()) {
      img.setAttribute('alt', `${title} – image ${i + 1}`);
    }
  });
  return doc.body.innerHTML;
}
