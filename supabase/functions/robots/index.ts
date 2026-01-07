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
    const { data: globalSettings, error } = await supabase
      .from('seo_global_settings')
      .select('robots_txt, sitemap_enabled')
      .single();

    if (error) {
      console.error('Error fetching global settings:', error);
      throw error;
    }

    // Get base URL from request
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://example.com';

    // Default robots.txt content
    let robotsTxt = globalSettings?.robots_txt || `User-agent: *
Allow: /

# Block admin and auth routes
Disallow: /admin
Disallow: /admin/*
Disallow: /auth
Disallow: /auth/*

# Block API routes
Disallow: /api/*`;

    // Add sitemap reference if enabled
    if (globalSettings?.sitemap_enabled) {
      robotsTxt += `\n\n# Sitemap\nSitemap: ${baseUrl}/sitemap.xml`;
    }

    console.log('Generated robots.txt');

    return new Response(robotsTxt, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Robots.txt generation error:', error);
    
    // Return a safe default robots.txt on error
    const defaultRobots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth`;
    
    return new Response(defaultRobots, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
      },
    });
  }
});
