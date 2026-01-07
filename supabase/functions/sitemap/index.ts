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

    // Get global settings
    const { data: globalSettings } = await supabase
      .from('seo_global_settings')
      .select('*')
      .single();

    if (!globalSettings?.sitemap_enabled) {
      return new Response('Sitemap is disabled', { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });
    }

    // Get all indexable pages
    const { data: pages, error } = await supabase
      .from('seo_pages')
      .select('route, updated_at, include_in_sitemap, is_indexable')
      .eq('include_in_sitemap', true)
      .eq('is_indexable', true);

    if (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }

    // Filter out excluded patterns
    const excludePatterns = globalSettings?.sitemap_exclude_patterns || [];
    const filteredPages = (pages || []).filter(page => {
      return !excludePatterns.some((pattern: string) => {
        const regex = new RegExp(pattern.replace('*', '.*'));
        return regex.test(page.route);
      });
    });

    // Get base URL from request
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://example.com';

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${filteredPages.map(page => `  <url>
    <loc>${baseUrl}${page.route}</loc>
    <lastmod>${new Date(page.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    console.log(`Generated sitemap with ${filteredPages.length} URLs`);

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: unknown) {
    console.error('Sitemap generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
