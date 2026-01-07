import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const route = url.searchParams.get('route') || '/';
    const baseUrl = url.searchParams.get('baseUrl') || 'https://example.com';
    const format = url.searchParams.get('format') || 'html'; // html or json

    console.log(`Fetching OG meta for route: ${route}`);

    // Get page SEO settings
    const { data: page, error: pageError } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('route', route)
      .single();

    // Get global settings for fallbacks
    const { data: globalSettings } = await supabase
      .from('seo_global_settings')
      .select('*')
      .single();

    if (pageError && pageError.code !== 'PGRST116') {
      console.error('Error fetching page:', pageError);
    }

    // Build meta data with fallbacks
    const siteName = globalSettings?.site_name || 'Website';
    const titleTemplate = globalSettings?.title_template || '{title}';
    const descriptionTemplate = globalSettings?.description_template || '{description}';

    const rawTitle = page?.og_title || page?.meta_title || 'Untitled';
    const rawDescription = page?.og_description || page?.meta_description || '';
    
    const title = titleTemplate.replace('{title}', rawTitle).replace('{siteName}', siteName);
    const description = descriptionTemplate.replace('{description}', rawDescription).replace('{siteName}', siteName);
    
    const ogImage = page?.og_image || globalSettings?.default_og_image || '';
    const ogType = page?.og_type || 'website';
    const twitterCard = page?.twitter_card || 'summary_large_image';
    const twitterImage = page?.twitter_image || ogImage;
    const canonicalUrl = page?.canonical_url || `${baseUrl}${route}`;
    const robots = page?.robots_meta || globalSettings?.default_robots || 'index, follow';

    // Schema JSON-LD
    let schemaScript = '';
    if (page?.schema_data) {
      try {
        const schemaData = typeof page.schema_data === 'string' 
          ? JSON.parse(page.schema_data) 
          : page.schema_data;
        schemaScript = `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`;
      } catch (e) {
        console.error('Error parsing schema data:', e);
      }
    }

    const metaData = {
      title,
      description,
      ogTitle: rawTitle,
      ogDescription: rawDescription,
      ogImage,
      ogType,
      ogUrl: canonicalUrl,
      twitterCard,
      twitterImage,
      siteName,
      robots,
      canonical: canonicalUrl,
      schemaData: page?.schema_data || null,
    };

    if (format === 'json') {
      return new Response(JSON.stringify(metaData), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }

    // Generate HTML meta tags
    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${escapeHtml(title)}</title>
  <meta name="title" content="${escapeHtml(title)}">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="${escapeHtml(robots)}">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${escapeHtml(ogType)}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:title" content="${escapeHtml(rawTitle)}">
  <meta property="og:description" content="${escapeHtml(rawDescription)}">
  <meta property="og:site_name" content="${escapeHtml(siteName)}">
  ${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}">` : ''}
  
  <!-- Twitter -->
  <meta property="twitter:card" content="${escapeHtml(twitterCard)}">
  <meta property="twitter:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="twitter:title" content="${escapeHtml(rawTitle)}">
  <meta property="twitter:description" content="${escapeHtml(rawDescription)}">
  ${twitterImage ? `<meta property="twitter:image" content="${escapeHtml(twitterImage)}">` : ''}
  
  ${schemaScript}
</head>
<body>
  <!-- OG Meta Preview for route: ${escapeHtml(route)} -->
</body>
</html>`;

    console.log(`Generated OG meta for route: ${route}`);

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error: unknown) {
    console.error('OG Meta generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
