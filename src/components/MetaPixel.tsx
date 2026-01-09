import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// Track custom events
export const trackMetaEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
    console.log('Meta Pixel event:', eventName, params);
  }
};

const MetaPixel = () => {
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('meta_pixel_id')
        .eq('id', 'global')
        .single();
      
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  useEffect(() => {
    const pixelId = settings?.meta_pixel_id;
    
    if (!pixelId) return;

    // Check if pixel is already initialized
    if (window.fbq) return;

    // Meta Pixel Base Code
    (function(f: any, b: Document, e: string, v: string, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e) as HTMLScriptElement;
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    console.log('Meta Pixel initialized:', pixelId);
  }, [settings?.meta_pixel_id]);

  // Add noscript fallback
  const pixelId = settings?.meta_pixel_id;
  
  if (!pixelId) return null;

  return (
    <noscript>
      <img 
        height="1" 
        width="1" 
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
};

export default MetaPixel;
