-- Add Meta Pixel ID to global settings or create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  meta_pixel_id TEXT,
  google_analytics_id TEXT,
  tiktok_pixel_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read (needed for frontend to load pixel)
CREATE POLICY "Site settings are readable by everyone" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default row
INSERT INTO public.site_settings (id) VALUES ('global') ON CONFLICT (id) DO NOTHING;