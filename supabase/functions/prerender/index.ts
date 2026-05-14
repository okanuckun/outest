const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CRAWLER_PATTERNS = [
  'googlebot', 'bingbot', 'duckduckbot', 'slurp',
  'gptbot', 'claudebot', 'perplexitybot', 'anthropic-ai',
  'ccbot', 'meta-externalagent', 'applebot',
  // Social preview crawlers
  'facebookexternalhit', 'facebot', 'twitterbot', 'linkedinbot',
  'slackbot', 'slack-imgproxy', 'discordbot', 'whatsapp',
  'telegrambot', 'pinterestbot', 'redditbot', 'embedly',
  'skypeuripreview', 'iframely', 'vkshare',
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_PATTERNS.some(pattern => ua.includes(pattern));
}

interface PageData {
  title: string;
  description: string;
  h1: string;
  body: string;
  ogImage?: string;
  jsonLd?: object;
}

const PAGES: Record<string, PageData> = {
  '/': {
    title: 'Okan Uckun | Fine Line & Geometric Tattoo Artist NYC',
    description: 'World-renowned fine line, geometric and minimalist tattoo artist in New York City. Specializing in linework, single needle and geometric tattoos in Manhattan.',
    h1: 'Okan Uckun — Tattoo Artist NYC',
    body: 'Okan Uckun is one of New York City\'s most recognized tattoo artists, specializing in fine line, geometric, linework and minimalist tattooing. With nearly 300,000 Instagram followers and features in BuzzFeed, Bored Panda and My Modern Met, his Manhattan studio offers custom tattoo appointments for collectors worldwide.',
    ogImage: 'https://www.okanuckun.com/og-image.jpg',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Okan Uckun Tattoo",
      "description": "Professional tattoo artist specializing in black and grey realism, portraits, and fine line work in New York City.",
      "image": "https://www.okanuckun.com/og-image.jpg",
      "address": { "@type": "PostalAddress", "streetAddress": "77 Washington Avenue", "addressLocality": "Brooklyn", "addressRegion": "NY", "addressCountry": "US" },
      "url": "https://www.okanuckun.com",
      "priceRange": "$$$"
    },
  },
  '/geometric-tattoos': {
    title: 'Geometric Tattoos NYC | Okan Uckun — Sacred Geometry & Minimalist Tattoo Artist',
    description: 'Geometric tattoo artist in NYC. Sacred geometry, minimalist geometric designs and precise linework by Okan Uckun in Manhattan.',
    h1: 'Geometric Tattoos in NYC',
    body: 'Okan Uckun is one of New York City\'s leading geometric tattoo artists. Specializing in sacred geometry, minimalist geometric designs, geometric mandala tattoos and precision linework. Studio in Manhattan. Nearly 300,000 Instagram followers. Featured in BuzzFeed and Bored Panda. Precision. Symmetry. Meaning. Geometric tattoo art lives at the intersection of mathematics and personal expression. From sacred geometry compositions to minimalist linework, each geometric design is built from scratch for the individual, using the body\'s natural contours as the canvas. A geometric tattoo uses shapes — circles, triangles, hexagons, sacred patterns, grids and lines — as the primary visual language. Unlike traditional tattoos that rely on illustration or shading, geometric tattoos draw their power from mathematical precision. Sacred geometry refers to the philosophical and spiritual patterns believed to underlie the structure of the universe. The Flower of Life, Metatron\'s Cube, the Fibonacci spiral, the Platonic solids — these archetypal forms have carried meaning across cultures for thousands of years. Minimalism and geometry share the same philosophy: remove everything unnecessary, and what remains becomes more powerful. Geometric mandala tattoos approach the mandala through mathematical structure: concentric circles, radial symmetry, precise petal counts. Fine line geometric tattoos combine precision of geometric forms with delicacy of single-needle linework. A full or half sleeve built around geometric principles is one of the most ambitious and rewarding tattooing projects. Circles represent completeness and infinity. Triangles symbolize balance between opposing forces. Hexagons represent efficiency and interconnectedness. The Fibonacci spiral represents growth and the underlying order of nature. Sacred geometry symbols like the Flower of Life, Metatron\'s Cube and the Sri Yantra encode deep cosmological meaning. Every geometric tattoo begins with an analysis of the individual: body structure, proportions, the natural lines and curves of the placement area. Custom geometric tattoos by appointment only in Manhattan, New York City.',
    ogImage: 'https://www.okanuckun.com/og-geometric.jpg',
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service", "name": "Geometric Tattoo NYC",
          "description": "Custom geometric tattoo designs including sacred geometry, minimalist patterns, mandala-inspired work and precise linework by Okan Uckun in New York City.",
          "provider": { "@type": "Person", "name": "Okan Uckun", "jobTitle": "Tattoo Artist", "url": "https://www.okanuckun.com" },
          "areaServed": { "@type": "City", "name": "New York City" },
          "url": "https://www.okanuckun.com/geometric-tattoos", "serviceType": "Tattoo Art"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is a geometric tattoo?", "acceptedAnswer": { "@type": "Answer", "text": "A geometric tattoo uses precise shapes — circles, triangles, hexagons, lines and sacred geometry patterns — to create designs that balance mathematical perfection with personal meaning." } },
            { "@type": "Question", "name": "How long do geometric tattoos last?", "acceptedAnswer": { "@type": "Answer", "text": "Geometric tattoos done with precise linework can maintain their sharpness for 10+ years with proper aftercare." } },
            { "@type": "Question", "name": "How much does a geometric tattoo cost in NYC?", "acceptedAnswer": { "@type": "Answer", "text": "Custom geometric tattoo pricing in NYC varies based on size, complexity and artist experience. Okan Uckun works on a custom quote basis." } }
          ]
        }
      ]
    },
  },
  '/fine-line-tattoos': {
    title: 'Fine Line Tattoos NYC | Okan Uckun — Fine Line Tattoo Artist Manhattan',
    description: 'Fine line tattoo artist in NYC. Single needle precision, custom fine line designs by Okan Uckun in Manhattan.',
    h1: 'Fine Line Tattoos in NYC',
    body: 'Okan Uckun is one of New York City\'s most recognized fine line tattoo artists, pioneering the single needle linework approach in the 2010s. Studio in Manhattan. Nearly 300,000 Instagram followers. Featured in BuzzFeed, Bored Panda and My Modern Met. A fine line tattoo is not simply a smaller tattoo. It is a completely different relationship between needle, ink and skin — one that demands a higher degree of precision, a deeper understanding of how skin behaves, and an artistic sensibility that can communicate complexity through restraint. Fine line tattooing uses one of the smallest needle configurations available — typically a single round liner (1RL) or triple round liner (3RL). Single needle tattoos require an artist who understands exactly how deep to place the ink. Fine line portrait work is built on architectural precision. Botanical elements translate exceptionally well into fine line. Geometric fine line tattoos combine razor-thin consistency with architectural quality. Minimalist fine line tattoos communicate through what is not there as much as through what is. Fine line tattoos done by an experienced artist can maintain their clarity for 10+ years with proper care. Custom fine line tattoos by appointment only in Manhattan, New York City.',
    ogImage: 'https://www.okanuckun.com/og-fineline.jpg',
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service", "name": "Fine Line Tattoo NYC",
          "description": "Custom fine line tattoo designs using single needle precision technique by Okan Uckun in New York City.",
          "provider": { "@type": "Person", "name": "Okan Uckun", "jobTitle": "Tattoo Artist", "url": "https://www.okanuckun.com" },
          "areaServed": { "@type": "City", "name": "New York City" },
          "url": "https://www.okanuckun.com/fine-line-tattoos", "serviceType": "Tattoo Art"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is a fine line tattoo?", "acceptedAnswer": { "@type": "Answer", "text": "A fine line tattoo uses extremely thin needles — typically a single needle (1RL) or triple needle (3RL) — to create delicate, precise designs with minimal ink spread." } },
            { "@type": "Question", "name": "How long do fine line tattoos last?", "acceptedAnswer": { "@type": "Answer", "text": "Fine line tattoos done by an experienced artist can maintain their clarity for 10+ years with proper care." } },
            { "@type": "Question", "name": "Do fine line tattoos hurt more?", "acceptedAnswer": { "@type": "Answer", "text": "Fine line tattoos are generally considered less painful than traditional tattoos." } }
          ]
        }
      ]
    },
  },
  '/line-work-tattoos': {
    title: 'Linework Tattoos NYC | Okan Uckun — Line Work Tattoo Artist Manhattan',
    description: 'Linework tattoo artist in NYC. Precise single line and continuous line work tattoo designs by Okan Uckun in Manhattan.',
    h1: 'Linework Tattoos in NYC',
    body: 'Okan Uckun is recognized as one of the original pioneers of the contemporary linework tattoo style, developing the approach in New York City in the 2010s. Studio in Manhattan. Nearly 300,000 Instagram followers. A line is the most fundamental unit of visual communication. Linework tattooing takes this foundation seriously. Every design is built from lines alone: their weight, their spacing, their tension and their relationship to the negative space around them. A linework tattoo is a design constructed entirely from lines, without shading or fill. Single line tattoos take the linework principle to its most concentrated form. Continuous line tattoos allow the composition to double back, cross over and layer. Geometric linework achieves visual clarity that other techniques struggle to match. Architectural linework translates the precise use of line weight from architectural drawing into tattooing. Abstract linework builds compositions from pure geometric relationships. Linework tattoos are among the most durable tattoo styles when executed correctly. Custom linework tattoos by appointment only in Manhattan.',
    ogImage: 'https://www.okanuckun.com/og-linework.jpg',
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service", "name": "Linework Tattoo NYC",
          "description": "Precision linework and single line tattoos by Okan Uckun in New York City.",
          "provider": { "@type": "Person", "name": "Okan Uckun", "jobTitle": "Tattoo Artist", "url": "https://www.okanuckun.com" },
          "areaServed": { "@type": "City", "name": "New York City" },
          "url": "https://www.okanuckun.com/line-work-tattoos", "serviceType": "Tattoo Art"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is a linework tattoo?", "acceptedAnswer": { "@type": "Answer", "text": "A linework tattoo is built exclusively from lines — no shading, no fill, no color gradients." } },
            { "@type": "Question", "name": "Do linework tattoos age well?", "acceptedAnswer": { "@type": "Answer", "text": "Linework tattoos are among the most durable tattoo styles when executed correctly." } }
          ]
        }
      ]
    },
  },
  '/minimalist-tattoos': {
    title: 'Minimalist Tattoos NYC | Okan Uckun — Minimalist Tattoo Artist Manhattan',
    description: 'Minimalist tattoo artist in NYC. Custom small minimalist tattoos and designs by Okan Uckun in Manhattan.',
    h1: 'Minimalist Tattoos in NYC',
    body: 'Okan Uckun is one of New York City\'s most recognized minimalist tattoo artists. Post-minimalist approach combining architectural precision with personal expression. Manhattan studio. Nearly 300,000 Instagram followers. Featured in BuzzFeed, Bored Panda and My Modern Met. Minimalism is not about being small. It is about being essential. A minimalist tattoo is one in which every element present is present for a reason. The minimalist tattoo draws its philosophy from minimalism as an art movement. Small minimalist tattoos are the most requested category. Minimalist symbol tattoos render symbols with the precision of fine art. Geometry is naturally minimalist. Minimalist fine line tattoos achieve a quality no other approach can match. Minimalist portrait work asks: what is the irreducible minimum of lines that still captures a recognizable face? Post-minimalism retains economy and precision while allowing for warmth and personal meaning. Custom minimalist tattoos by appointment only in Manhattan.',
    ogImage: 'https://www.okanuckun.com/og-minimalist.jpg',
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service", "name": "Minimalist Tattoo NYC",
          "description": "Custom minimalist tattoo designs by Okan Uckun in New York City.",
          "provider": { "@type": "Person", "name": "Okan Uckun", "jobTitle": "Tattoo Artist", "url": "https://www.okanuckun.com" },
          "areaServed": { "@type": "City", "name": "New York City" },
          "url": "https://www.okanuckun.com/minimalist-tattoos", "serviceType": "Tattoo Art"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is a minimalist tattoo?", "acceptedAnswer": { "@type": "Answer", "text": "A minimalist tattoo uses the fewest possible visual elements to communicate an idea, emotion or symbol." } },
            { "@type": "Question", "name": "Do minimalist tattoos age well?", "acceptedAnswer": { "@type": "Answer", "text": "Minimalist tattoos age well when executed correctly. Simple, clean designs hold their visual clarity better than complex shaded work over time." } }
          ]
        }
      ]
    },
  },
  '/appointment': {
    title: 'Book a Tattoo Appointment | Okan Uckun NYC',
    description: 'Book your fine line or geometric tattoo appointment with Okan Uckun in New York City.',
    h1: 'Book a Tattoo Appointment',
    body: 'Book a custom tattoo appointment with Okan Uckun in Manhattan, New York City. Specializing in fine line, geometric, linework and minimalist tattoo styles. Limited availability. Contact us to schedule your session.',
    ogImage: 'https://www.okanuckun.com/og-image.jpg',
  },
  '/booking': {
    title: 'Book a Tattoo Appointment | Okan Uckun NYC',
    description: 'Book your fine line or geometric tattoo appointment with Okan Uckun in New York City.',
    h1: 'Book a Tattoo Appointment',
    body: 'Book a custom tattoo appointment with Okan Uckun in Manhattan, New York City. Specializing in fine line, geometric, linework and minimalist tattoo styles. Limited availability.',
    ogImage: 'https://www.okanuckun.com/og-image.jpg',
  },
  '/about': {
    title: 'About Okan Uckun | Tattoo Artist NYC',
    description: 'Learn about Okan Uckun, a Brooklyn-based tattoo artist known for minimalist, geometric and fine line work, with 300,000+ followers and global press features.',
    h1: 'About Okan Uckun',
    body: 'Okan Uckun is a Brooklyn-based tattoo artist specializing in minimalist, geometric and fine line tattoos. With nearly 300,000 Instagram followers and features in BuzzFeed, Bored Panda and My Modern Met, Okan works out of his Manhattan studio with collectors from around the world.',
    ogImage: 'https://www.okanuckun.com/og-image.jpg',
  },
  '/work': {
    title: 'Tattoo Portfolio | Okan Uckun NYC',
    description: 'Browse the tattoo portfolio of Okan Uckun: minimalist, geometric and fine line work created in Brooklyn NYC and on guest spots around the world.',
    h1: 'Tattoo Portfolio',
    body: 'Selected tattoo work by Okan Uckun — minimalist, geometric, linework and fine line tattoos created in Manhattan, New York City and on guest spots worldwide.',
    ogImage: 'https://www.okanuckun.com/og-image.jpg',
  },
  '/aftercare': {
    title: 'Tattoo Aftercare Guide | Okan Uckun',
    description: "Step-by-step tattoo aftercare instructions from Okan Uckun: cleaning, healing, do's and don'ts to keep your new tattoo looking sharp.",
    h1: 'Tattoo Aftercare Guide',
    body: 'A clear, step-by-step aftercare guide for new tattoos: how to clean, when to moisturize, what to avoid, and how to keep fine line and minimalist tattoos looking sharp as they heal.',
    ogImage: 'https://www.okanuckun.com/og-image.jpg',
  },
  '/shop': {
    title: 'Shop | Okan Uckun',
    description: 'Shop prints and pieces from Okan Uckun — minimalist art and merchandise from the Brooklyn studio.',
    h1: 'Shop',
    body: 'Prints and curated pieces from Okan Uckun. Minimalist artwork and studio merchandise shipped from Brooklyn, NYC.',
    ogImage: 'https://www.okanuckun.com/og-image.jpg',
  },
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildFullHtml(route: string, page: PageData): string {
  const siteUrl = 'https://www.okanuckun.com';
  const canonical = `${siteUrl}${route === '/' ? '' : route}`;
  const ogImage = page.ogImage || `${siteUrl}/og-image.jpg`;
  
  const jsonLdScript = page.jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`
    : '';

  // Build internal links section
  const navLinks = `
    <nav>
      <ul>
        <li><a href="${siteUrl}/">Home</a></li>
        <li><a href="${siteUrl}/geometric-tattoos">Geometric Tattoos NYC</a></li>
        <li><a href="${siteUrl}/fine-line-tattoos">Fine Line Tattoos NYC</a></li>
        <li><a href="${siteUrl}/line-work-tattoos">Linework Tattoos NYC</a></li>
        <li><a href="${siteUrl}/minimalist-tattoos">Minimalist Tattoos NYC</a></li>
        <li><a href="${siteUrl}/booking">Book Appointment</a></li>
        <li><a href="${siteUrl}/work">Portfolio</a></li>
        <li><a href="${siteUrl}/about">About</a></li>
        <li><a href="${siteUrl}/blog">Blog</a></li>
        <li><a href="${siteUrl}/aftercare">Aftercare</a></li>
      </ul>
    </nav>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta property="og:site_name" content="Okan Uckun">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${escapeHtml(ogImage)}">
  ${jsonLdScript}
</head>
<body>
  <header>
    ${navLinks}
  </header>
  <main>
    <h1>${escapeHtml(page.h1)}</h1>
    <p>${escapeHtml(page.body)}</p>
    <a href="${siteUrl}/booking">Book a Tattoo Appointment</a>
  </main>
  <footer>
    <p>&copy; Okan Uckun. Tattoo Artist NYC. <a href="${siteUrl}">www.okanuckun.com</a></p>
    ${navLinks}
  </footer>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const route = url.searchParams.get('route') || '/';
    const userAgent = req.headers.get('user-agent') || '';
    const forcePrerender = url.searchParams.get('prerender') === 'true';

    console.log(`Prerender request — route: ${route}, UA: ${userAgent.substring(0, 80)}, crawler: ${isCrawler(userAgent) || forcePrerender}`);

    // Only serve pre-rendered HTML to crawlers (or when forced)
    if (!isCrawler(userAgent) && !forcePrerender) {
      return new Response(JSON.stringify({ prerender: false, message: 'Not a crawler' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const page = PAGES[route];
    if (!page) {
      // Return a basic 404 for unknown routes
      return new Response(`<!DOCTYPE html><html><head><title>Not Found | Okan Uckun</title></head><body><h1>Page Not Found</h1><p><a href="https://www.okanuckun.com">Return to homepage</a></p></body></html>`, {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const html = buildFullHtml(route, page);

    return new Response(html, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Prerendered': 'true',
      },
    });
  } catch (error: unknown) {
    console.error('Prerender error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
