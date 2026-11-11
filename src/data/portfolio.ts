// Generated 2026-11-11 from the site portfolio (107 unique photos).
// Style tags and alt texts were assigned by visually reviewing each photo.
// Images live in /public/images/tattoos as WebP (long side 1400px, hero
// versions 2000px, quality 78) with SEO file names.
// Used by the style guide pages and blog posts.

export type TattooStyle = 'geometric' | 'linework' | 'fine line' | 'minimalist';

export interface PortfolioPhoto {
  /** portfolio reference number (display_order in portfolio_images) */
  n: number;
  file: string;
  styles: TattooStyle[];
  placement: string;
  alt: string;
  w: number;
  h: number;
  /** larger 2000px version for hero use */
  hero?: { file: string; w: number; h: number };
}

const BASE = '/images/tattoos/';
const SITE = 'https://okanuckun.com';

/** Relative URL for <img src>. */
export const photoUrl = (p: PortfolioPhoto) => BASE + p.file;
/** Absolute URL for schema / Open Graph. */
export const photoAbsUrl = (p: PortfolioPhoto) => SITE + BASE + p.file;
/** Hero version (falls back to the regular file). */
export const heroOf = (p: PortfolioPhoto) =>
  p.hero ? { src: BASE + p.hero.file, abs: SITE + BASE + p.hero.file, w: p.hero.w, h: p.hero.h } : { src: BASE + p.file, abs: SITE + BASE + p.file, w: p.w, h: p.h };

export const PORTFOLIO: PortfolioPhoto[] = [
  {
    "n": 0,
    "file": "geometric-forearm-tattoo-okan-uckun-000.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Process shot: Okan tattooing a geometric linework forearm piece under a ring light by Okan Uckun",
    "w": 1050,
    "h": 1400
  },
  {
    "n": 1,
    "file": "geometric-forearm-tattoo-okan-uckun-001.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Geometric forearm tattoo, circle with vertical lines and dots by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 2,
    "file": "linework-forearm-tattoo-okan-uckun-002.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Horizontal bar and line band on the forearm, horizon motif by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 3,
    "file": "geometric-inner-arm-tattoo-okan-uckun-003.webp",
    "styles": [
      "geometric",
      "fine line"
    ],
    "placement": "inner arm",
    "alt": "Geometric mountain tattoo with a long horizon line on the inner arm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 4,
    "file": "minimalist-forearm-tattoo-okan-uckun-004.webp",
    "styles": [
      "minimalist",
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Constructivist forearm tattoo, open square, black square and long lines by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 5,
    "file": "linework-forearms-tattoo-okan-uckun-005.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "both forearms",
    "alt": "Matching parallel line tattoos on both forearms by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 6,
    "file": "geometric-chest-tattoo-okan-uckun-006.webp",
    "styles": [
      "geometric"
    ],
    "placement": "chest",
    "alt": "Sacred geometry chest tattoo, overlapping circles and triangle by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 7,
    "file": "geometric-chest-tattoo-okan-uckun-007.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "chest/shoulder",
    "alt": "Geometric chest tattoo, arc, circle and long lines below the collarbone by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 8,
    "file": "geometric-chest-tattoo-okan-uckun-008.webp",
    "styles": [
      "geometric"
    ],
    "placement": "chest",
    "alt": "Geometric chest tattoo, triangle inside broken circles by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 9,
    "file": "linework-back-and-arm-tattoo-okan-uckun-009.webp",
    "styles": [
      "linework",
      "fine line"
    ],
    "placement": "back and arm",
    "alt": "Single continuous line running from the shoulder blade down the arm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 10,
    "file": "fine-line-forearm-tattoo-okan-uckun-010.webp",
    "styles": [
      "fine line",
      "linework"
    ],
    "placement": "forearm",
    "alt": "Fine line wave wrapping around the forearm by Okan Uckun",
    "w": 1050,
    "h": 1400
  },
  {
    "n": 11,
    "file": "geometric-forearm-tattoo-okan-uckun-011.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Geometric number composition with architectural lines on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 12,
    "file": "geometric-ribs-tattoo-okan-uckun-012.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "ribs",
    "alt": "Geometric rib tattoo, circle crossed by long diagonal lines by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 13,
    "file": "geometric-chest-tattoo-okan-uckun-013.webp",
    "styles": [
      "geometric"
    ],
    "placement": "chest/shoulder",
    "alt": "Sacred geometry triangle and circles on the chest and shoulder by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 14,
    "file": "geometric-forearm-tattoo-okan-uckun-014.webp",
    "styles": [
      "geometric",
      "fine line"
    ],
    "placement": "forearm",
    "alt": "Architectural geometric forearm tattoo with circles and fine detail by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 15,
    "file": "minimalist-neck-tattoo-okan-uckun-015.webp",
    "styles": [
      "minimalist",
      "geometric"
    ],
    "placement": "neck",
    "alt": "Minimalist vertical circles and dots on the side of the neck by Okan Uckun",
    "w": 933,
    "h": 1400
  },
  {
    "n": 16,
    "file": "geometric-forearm-tattoo-okan-uckun-016.webp",
    "styles": [
      "geometric",
      "linework"
    ],
    "placement": "forearm",
    "alt": "Black block with a circle over wave lines, sun over water, forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 17,
    "file": "geometric-forearm-tattoo-okan-uckun-017.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Geometric forearm tattoo, circles crossed by black and thin lines by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 18,
    "file": "linework-thigh-tattoo-okan-uckun-018.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "thigh",
    "alt": "Black horizontal bars in a gradient on the thigh by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 19,
    "file": "geometric-forearm-tattoo-okan-uckun-019.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Geometric forearm tattoo, circle, squares and long lines by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 20,
    "file": "linework-forearm-tattoo-okan-uckun-020.webp",
    "styles": [
      "linework"
    ],
    "placement": "forearm",
    "alt": "Op-art wave line tattoo on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 21,
    "file": "linework-forearm-tattoo-okan-uckun-021.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm/arm",
    "alt": "Broken lines and black bars along the arm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 22,
    "file": "geometric-upper-arm-tattoo-okan-uckun-022.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "upper arm",
    "alt": "Black circle with a ring and crossing line on the upper arm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 23,
    "file": "minimalist-collarbone-tattoo-okan-uckun-023.webp",
    "styles": [
      "minimalist",
      "linework"
    ],
    "placement": "collarbone",
    "alt": "Minimalist broken line along the collarbone by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 24,
    "file": "linework-torso-tattoo-okan-uckun-024.webp",
    "styles": [
      "linework",
      "fine line"
    ],
    "placement": "torso",
    "alt": "Long vertical line with a circle and script on the torso by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 25,
    "file": "geometric-forearm-tattoo-okan-uckun-025.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Square sun with wave lines on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 26,
    "file": "minimalist-shoulder-tattoo-okan-uckun-026.webp",
    "styles": [
      "minimalist",
      "linework"
    ],
    "placement": "shoulder",
    "alt": "Minimalist small line set on the shoulder by Okan Uckun",
    "w": 1120,
    "h": 1400
  },
  {
    "n": 27,
    "file": "linework-forearm-tattoo-okan-uckun-027.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Two long parallel lines on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 28,
    "file": "fine-line-spine-tattoo-okan-uckun-028.webp",
    "styles": [
      "fine line",
      "linework"
    ],
    "placement": "spine",
    "alt": "Fine line waveform tattoo along the spine by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 29,
    "file": "geometric-forearm-tattoo-okan-uckun-029.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Geometric forearm tattoo, circles, dots and grid lines by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 30,
    "file": "geometric-forearm-tattoo-okan-uckun-030.webp",
    "styles": [
      "geometric",
      "linework"
    ],
    "placement": "forearm",
    "alt": "Row of black triangles along the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 31,
    "file": "linework-forearm-tattoo-okan-uckun-031.webp",
    "styles": [
      "linework"
    ],
    "placement": "forearm",
    "alt": "Line band with a small mountain profile on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 32,
    "file": "linework-forearm-tattoo-okan-uckun-032.webp",
    "styles": [
      "linework",
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Architectural line composition on the forearm by Okan Uckun",
    "w": 1082,
    "h": 1400
  },
  {
    "n": 33,
    "file": "minimalist-side-tattoo-okan-uckun-033.webp",
    "styles": [
      "minimalist"
    ],
    "placement": "side/breast",
    "alt": "Minimalist black flower shape with a thin circle on the side by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 34,
    "file": "linework-arm-tattoo-okan-uckun-034.webp",
    "styles": [
      "linework"
    ],
    "placement": "arm",
    "alt": "Process shot: long line tattoo along the arm by Okan Uckun",
    "w": 933,
    "h": 1400
  },
  {
    "n": 35,
    "file": "fine-line-forearm-tattoo-okan-uckun-035.webp",
    "styles": [
      "fine line",
      "linework"
    ],
    "placement": "forearm",
    "alt": "Coordinates, script and crossing lines on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 36,
    "file": "geometric-forearm-tattoo-okan-uckun-036.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Black circle with wave stripes on the forearm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 37,
    "file": "linework-forearm-tattoo-okan-uckun-037.webp",
    "styles": [
      "linework"
    ],
    "placement": "forearm",
    "alt": "Stacked horizontal lines on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 38,
    "file": "geometric-forearm-tattoo-okan-uckun-038.webp",
    "styles": [
      "geometric",
      "fine line"
    ],
    "placement": "forearm",
    "alt": "Triangle with stars and dotwork on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 39,
    "file": "fine-line-upper-arm-tattoo-okan-uckun-039.webp",
    "styles": [
      "fine line"
    ],
    "placement": "upper arm",
    "alt": "Fine line wave on the upper arm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 40,
    "file": "linework-ribs-tattoo-okan-uckun-040.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "ribs",
    "alt": "Minimalist line set on the ribs by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 41,
    "file": "geometric-upper-arm-tattoo-okan-uckun-041.webp",
    "styles": [
      "geometric"
    ],
    "placement": "upper arm",
    "alt": "Black circle with geometric lines on the upper arm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 42,
    "file": "geometric-chest-tattoo-okan-uckun-042.webp",
    "styles": [
      "geometric"
    ],
    "placement": "chest",
    "alt": "Geometric compass circle on the chest by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 43,
    "file": "fine-line-forearm-tattoo-okan-uckun-043.webp",
    "styles": [
      "fine line"
    ],
    "placement": "forearm",
    "alt": "Fine line Creation of Adam hands with geometric elements on the forearm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 44,
    "file": "minimalist-forearm-tattoo-okan-uckun-044.webp",
    "styles": [
      "minimalist",
      "linework"
    ],
    "placement": "forearm",
    "alt": "Half sun with rays on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 45,
    "file": "geometric-forearm-tattoo-okan-uckun-045.webp",
    "styles": [
      "geometric",
      "linework"
    ],
    "placement": "forearm",
    "alt": "Abstract geometric shard lines on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 46,
    "file": "fine-line-upper-arm-tattoo-okan-uckun-046.webp",
    "styles": [
      "fine line"
    ],
    "placement": "upper arm/elbow",
    "alt": "Fine line looping lines on the upper arm by Okan Uckun",
    "w": 1050,
    "h": 1400
  },
  {
    "n": 47,
    "file": "linework-arm-tattoo-okan-uckun-047.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "arm",
    "alt": "Single long line down the arm by Okan Uckun",
    "w": 1050,
    "h": 1400
  },
  {
    "n": 48,
    "file": "geometric-upper-arm-tattoo-okan-uckun-048.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "upper arm",
    "alt": "Black circle with rings and a long line on the upper arm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 49,
    "file": "linework-back-tattoo-okan-uckun-049.webp",
    "styles": [
      "linework",
      "geometric"
    ],
    "placement": "back/shoulder",
    "alt": "Abstract mountain linework across the shoulder blade by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 50,
    "file": "geometric-upper-back-tattoo-okan-uckun-050.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "upper back",
    "alt": "Circle on a line with dots across the upper back by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 51,
    "file": "linework-forearm-tattoo-okan-uckun-051.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Thin bands of lines on the forearm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 52,
    "file": "fine-line-ribs-tattoo-okan-uckun-052.webp",
    "styles": [
      "fine line",
      "minimalist"
    ],
    "placement": "ribs",
    "alt": "Fine line circle and diagonal line on the ribs by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 53,
    "file": "linework-arm-tattoo-okan-uckun-053.webp",
    "styles": [
      "linework"
    ],
    "placement": "arm",
    "alt": "Continuous line with a black half circle following the arm by Okan Uckun",
    "w": 933,
    "h": 1400
  },
  {
    "n": 54,
    "file": "geometric-chest-tattoo-okan-uckun-054.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "chest",
    "alt": "Broken circle crossed by lines on the chest by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 55,
    "file": "fine-line-forearm-tattoo-okan-uckun-055.webp",
    "styles": [
      "fine line"
    ],
    "placement": "forearm",
    "alt": "Fine line heartbeat waveform with a circle on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 56,
    "file": "geometric-forearm-tattoo-okan-uckun-056.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Black and outline triangle shards on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 57,
    "file": "linework-forearm-tattoo-okan-uckun-057.webp",
    "styles": [
      "linework"
    ],
    "placement": "forearm",
    "alt": "Armband lines on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 58,
    "file": "linework-forearm-tattoo-okan-uckun-058.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Vertical zigzag line on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 59,
    "file": "linework-forearm-tattoo-okan-uckun-059.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Parallel lines and a short bar on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 60,
    "file": "fine-line-upper-arm-tattoo-okan-uckun-060.webp",
    "styles": [
      "fine line"
    ],
    "placement": "upper arm",
    "alt": "Fine line wave lines with a dot on the upper arm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 61,
    "file": "linework-forearm-tattoo-okan-uckun-061.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Thin horizontal lines on the forearm by Okan Uckun",
    "w": 1050,
    "h": 1400
  },
  {
    "n": 62,
    "file": "linework-chest-tattoo-okan-uckun-062.webp",
    "styles": [
      "linework"
    ],
    "placement": "chest/shoulder",
    "alt": "Process shot: lines across the chest and shoulder by Okan Uckun",
    "w": 1050,
    "h": 1400
  },
  {
    "n": 63,
    "file": "geometric-upper-arm-tattoo-okan-uckun-063.webp",
    "styles": [
      "geometric"
    ],
    "placement": "upper arm",
    "alt": "Black circle with orbit rings and a line on the upper arm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 64,
    "file": "fine-line-upper-arm-tattoo-okan-uckun-064.webp",
    "styles": [
      "fine line"
    ],
    "placement": "upper arm",
    "alt": "Abstract fine line composition on the upper arm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 65,
    "file": "fine-line-chest-tattoo-okan-uckun-065.webp",
    "styles": [
      "fine line"
    ],
    "placement": "chest/shoulder",
    "alt": "Fine line waves flowing over the chest and shoulder by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 66,
    "file": "fine-line-forearm-tattoo-okan-uckun-066.webp",
    "styles": [
      "fine line",
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Fine line constellation with stars on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 67,
    "file": "fine-line-collarbone-tattoo-okan-uckun-067.webp",
    "styles": [
      "fine line"
    ],
    "placement": "collarbone",
    "alt": "Fine line wave on the collarbone by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 68,
    "file": "geometric-shoulder-blade-tattoo-okan-uckun-068.webp",
    "styles": [
      "geometric",
      "fine line"
    ],
    "placement": "shoulder blade",
    "alt": "Circles and a long line on the shoulder blade by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 69,
    "file": "minimalist-ribs-tattoo-okan-uckun-069.webp",
    "styles": [
      "minimalist",
      "geometric"
    ],
    "placement": "ribs",
    "alt": "Minimalist double ring on the ribs by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 70,
    "file": "linework-arm-tattoo-okan-uckun-070.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "arm",
    "alt": "Long line with short bars on the arm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 71,
    "file": "linework-arms-and-back-tattoo-okan-uckun-071.webp",
    "styles": [
      "linework"
    ],
    "placement": "arms and back",
    "alt": "One continuous line across both arms and the upper back by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 72,
    "file": "minimalist-forearms-tattoo-okan-uckun-072.webp",
    "styles": [
      "minimalist",
      "geometric"
    ],
    "placement": "both forearms",
    "alt": "Matching black and outline triangles on both forearms by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 73,
    "file": "geometric-forearms-tattoo-okan-uckun-073.webp",
    "styles": [
      "geometric"
    ],
    "placement": "both forearms",
    "alt": "Matching symmetric geometric bar compositions on both forearms by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 74,
    "file": "geometric-back-of-arm-tattoo-okan-uckun-074.webp",
    "styles": [
      "geometric",
      "fine line"
    ],
    "placement": "back of arm",
    "alt": "World map with compass and geometric lines on the back of the arm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 75,
    "file": "geometric-forearm-tattoo-okan-uckun-075.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Lines crossing a small circle on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 76,
    "file": "geometric-ribs-tattoo-okan-uckun-076.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "ribs",
    "alt": "Circle with a long vertical line on the ribs by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 77,
    "file": "geometric-upper-arm-tattoo-okan-uckun-077.webp",
    "styles": [
      "geometric"
    ],
    "placement": "upper arm",
    "alt": "Square of lines with a white circle above a black circle on the upper arm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 78,
    "file": "linework-forearms-tattoo-okan-uckun-078.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "both forearms",
    "alt": "Two long single lines on both forearms by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 80,
    "file": "geometric-forearm-tattoo-okan-uckun-080.webp",
    "styles": [
      "geometric",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Triangle and circle on a horizon line on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 81,
    "file": "geometric-forearm-tattoo-okan-uckun-081.webp",
    "styles": [
      "geometric",
      "linework"
    ],
    "placement": "forearm",
    "alt": "Circuit chip tattoo with geometric lines on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 82,
    "file": "geometric-forearm-tattoo-okan-uckun-082.webp",
    "styles": [
      "geometric",
      "fine line"
    ],
    "placement": "forearm",
    "alt": "Fine line mountains above geometric triangles on the forearm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 83,
    "file": "linework-arm-tattoo-okan-uckun-083.webp",
    "styles": [
      "linework"
    ],
    "placement": "arm/neck",
    "alt": "Long single line down the arm with a line on the neck by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 84,
    "file": "fine-line-sternum-tattoo-okan-uckun-084.webp",
    "styles": [
      "fine line",
      "minimalist"
    ],
    "placement": "sternum",
    "alt": "Small fine line rose with a moon on the sternum by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 85,
    "file": "linework-forearm-tattoo-okan-uckun-085.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Band of horizontal lines on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 86,
    "file": "fine-line-forearm-tattoo-okan-uckun-086.webp",
    "styles": [
      "fine line",
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Circles and a waveform on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 87,
    "file": "linework-forearm-tattoo-okan-uckun-087.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Offset horizontal lines on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 88,
    "file": "geometric-upper-arm-tattoo-okan-uckun-088.webp",
    "styles": [
      "geometric"
    ],
    "placement": "upper arm",
    "alt": "Black triangle crossed by lines on the upper arm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 89,
    "file": "minimalist-upper-back-tattoo-okan-uckun-089.webp",
    "styles": [
      "minimalist",
      "geometric"
    ],
    "placement": "upper back",
    "alt": "Minimalist circles and dots on the upper back by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 90,
    "file": "fine-line-shoulder-tattoo-okan-uckun-090.webp",
    "styles": [
      "fine line"
    ],
    "placement": "shoulder/chest",
    "alt": "Fine line wing-like waves on the shoulder by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 91,
    "file": "linework-forearm-tattoo-okan-uckun-091.webp",
    "styles": [
      "linework",
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Rectangle and broken lines on the forearm by Okan Uckun",
    "w": 1118,
    "h": 1400
  },
  {
    "n": 92,
    "file": "linework-arm-tattoo-okan-uckun-092.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "arm",
    "alt": "Single long line down the arm by Okan Uckun",
    "w": 1118,
    "h": 1400
  },
  {
    "n": 93,
    "file": "linework-hand-tattoo-okan-uckun-093.webp",
    "styles": [
      "linework"
    ],
    "placement": "hand/forearm",
    "alt": "Abstract scratch-like lines on the hand and forearm by Okan Uckun",
    "w": 1118,
    "h": 1400
  },
  {
    "n": 94,
    "file": "geometric-thigh-tattoo-okan-uckun-094.webp",
    "styles": [
      "geometric"
    ],
    "placement": "thigh",
    "alt": "Constructivist circles and lines on the thigh by Okan Uckun",
    "w": 1118,
    "h": 1400
  },
  {
    "n": 95,
    "file": "linework-arm-tattoo-okan-uckun-095.webp",
    "styles": [
      "linework"
    ],
    "placement": "arm",
    "alt": "Broken bands of lines along the arm by Okan Uckun",
    "w": 1118,
    "h": 1400
  },
  {
    "n": 96,
    "file": "linework-arm-tattoo-okan-uckun-096.webp",
    "styles": [
      "linework"
    ],
    "placement": "arm",
    "alt": "Broken lines wrapping the arm by Okan Uckun",
    "w": 1118,
    "h": 1400
  },
  {
    "n": 97,
    "file": "geometric-forearm-tattoo-okan-uckun-097.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Black half circle with circles and lines on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 98,
    "file": "linework-forearm-tattoo-okan-uckun-098.webp",
    "styles": [
      "linework",
      "fine line"
    ],
    "placement": "forearm",
    "alt": "Wavy armband line on the forearm by Okan Uckun",
    "w": 1135,
    "h": 1400
  },
  {
    "n": 99,
    "file": "fine-line-behind-the-ear-tattoo-okan-uckun-099.webp",
    "styles": [
      "fine line",
      "geometric"
    ],
    "placement": "behind the ear",
    "alt": "Fine line geometric petal pattern behind the ear by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 100,
    "file": "fine-line-upper-arm-tattoo-okan-uckun-100.webp",
    "styles": [
      "fine line"
    ],
    "placement": "upper arm",
    "alt": "Fine line sound wave tattoo on the upper arm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 101,
    "file": "minimalist-upper-arm-tattoo-okan-uckun-101.webp",
    "styles": [
      "minimalist",
      "geometric"
    ],
    "placement": "upper arm",
    "alt": "Minimalist double circle tattoo on the upper arm by Okan Uckun",
    "w": 1400,
    "h": 1400
  },
  {
    "n": 102,
    "file": "geometric-shoulder-tattoo-okan-uckun-102.webp",
    "styles": [
      "geometric"
    ],
    "placement": "shoulder/upper arm",
    "alt": "Large orbital geometric composition on the shoulder and upper arm by Okan Uckun",
    "w": 1135,
    "h": 1400,
    "hero": {
      "file": "geometric-shoulder-tattoo-okan-uckun-102-hero.webp",
      "w": 1622,
      "h": 2000
    }
  },
  {
    "n": 103,
    "file": "linework-arm-tattoo-okan-uckun-103.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "arm/shoulder",
    "alt": "Single line with a dot following the arm and shoulder by Okan Uckun",
    "w": 1118,
    "h": 1400
  },
  {
    "n": 104,
    "file": "geometric-forearm-tattoo-okan-uckun-104.webp",
    "styles": [
      "geometric",
      "linework"
    ],
    "placement": "forearm",
    "alt": "Geometric linework forearm tattoo, layered triangle shards by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 105,
    "file": "minimalist-forearm-tattoo-okan-uckun-105.webp",
    "styles": [
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Minimalist barcode-like black bars on the forearm by Okan Uckun",
    "w": 1105,
    "h": 1400
  },
  {
    "n": 106,
    "file": "geometric-forearm-tattoo-okan-uckun-106.webp",
    "styles": [
      "geometric"
    ],
    "placement": "forearm",
    "alt": "Geometric forearm tattoo, circles, half circles and vertical lines by Okan Uckun",
    "w": 1118,
    "h": 1400
  },
  {
    "n": 107,
    "file": "linework-forearm-tattoo-okan-uckun-107.webp",
    "styles": [
      "linework",
      "minimalist"
    ],
    "placement": "forearm",
    "alt": "Three thin armband lines on the forearm by Okan Uckun",
    "w": 1400,
    "h": 1400
  }
];

const byNumber = new Map(PORTFOLIO.map((p) => [p.n, p]));

/** Look up photos by their reference numbers, in the given order. */
export const photos = (...ns: number[]): PortfolioPhoto[] =>
  ns.map((n) => byNumber.get(n)).filter((p): p is PortfolioPhoto => !!p);

export const photosByStyle = (style: TattooStyle): PortfolioPhoto[] =>
  PORTFOLIO.filter((p) => p.styles.includes(style));
