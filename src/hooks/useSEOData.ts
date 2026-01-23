import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SEOPageData {
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  og_type: string | null;
  twitter_card: string | null;
  twitter_image: string | null;
  canonical_url: string | null;
  robots_meta: string | null;
  schema_data: unknown;
  is_indexable: boolean | null;
}

export interface SEOGlobalData {
  site_name: string;
  title_template: string | null;
  default_og_image: string | null;
  default_robots: string | null;
}

const defaultGlobal: SEOGlobalData = {
  site_name: 'Okan Uckun',
  title_template: '{title} | {site_name}',
  default_og_image: '/og-image.jpg',
  default_robots: 'index, follow',
};

export function useSEOData(route: string) {
  const [pageData, setPageData] = useState<SEOPageData | null>(null);
  const [globalData, setGlobalData] = useState<SEOGlobalData>(defaultGlobal);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSEOData() {
      try {
        // Fetch page-specific SEO data and global settings in parallel
        const [pageResult, globalResult] = await Promise.all([
          supabase
            .from('seo_pages')
            .select('meta_title, meta_description, meta_keywords, og_title, og_description, og_image, og_type, twitter_card, twitter_image, canonical_url, robots_meta, schema_data, is_indexable')
            .eq('route', route)
            .maybeSingle(),
          supabase
            .from('seo_global_settings')
            .select('site_name, title_template, default_og_image, default_robots')
            .limit(1)
            .maybeSingle(),
        ]);

        if (pageResult.data) {
          setPageData(pageResult.data);
        }

        if (globalResult.data) {
          setGlobalData({
            site_name: globalResult.data.site_name || defaultGlobal.site_name,
            title_template: globalResult.data.title_template || defaultGlobal.title_template,
            default_og_image: globalResult.data.default_og_image || defaultGlobal.default_og_image,
            default_robots: globalResult.data.default_robots || defaultGlobal.default_robots,
          });
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSEOData();
  }, [route]);

  return { pageData, globalData, loading };
}
