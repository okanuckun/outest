
-- SEO Global Settings (site-wide defaults)
CREATE TABLE public.seo_global_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text NOT NULL DEFAULT 'Okan Ağaoğlu',
  title_template text DEFAULT '{title} | {site_name}',
  description_template text,
  default_og_image text,
  default_robots text DEFAULT 'index, follow',
  default_canonical_mode text DEFAULT 'auto' CHECK (default_canonical_mode IN ('auto', 'manual')),
  robots_txt text DEFAULT 'User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth

Sitemap: {origin}/sitemap.xml',
  sitemap_enabled boolean DEFAULT true,
  sitemap_exclude_patterns text[] DEFAULT ARRAY['/admin', '/auth'],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- SEO Pages (per-page SEO settings)
CREATE TABLE public.seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route text NOT NULL UNIQUE,
  template_type text DEFAULT 'page' CHECK (template_type IN ('home', 'blog_post', 'blog_list', 'project', 'work', 'about', 'booking', 'page', 'other')),
  
  -- Meta
  meta_title text,
  meta_description text,
  meta_keywords text,
  focus_keyword text,
  secondary_keywords text[],
  
  -- Indexing & Robots
  is_indexable boolean DEFAULT true,
  robots_meta text DEFAULT 'index, follow',
  noarchive boolean DEFAULT false,
  nosnippet boolean DEFAULT false,
  canonical_mode text DEFAULT 'auto' CHECK (canonical_mode IN ('auto', 'manual')),
  canonical_url text,
  include_in_sitemap boolean DEFAULT true,
  
  -- Open Graph
  og_title text,
  og_description text,
  og_image text,
  og_type text DEFAULT 'website',
  twitter_card text DEFAULT 'summary_large_image',
  twitter_image text,
  
  -- Schema (JSON-LD)
  schema_types text[] DEFAULT ARRAY[]::text[],
  schema_data jsonb DEFAULT '[]'::jsonb,
  
  -- Computed/Cached
  h1_text text,
  h2_outline text[],
  word_count integer DEFAULT 0,
  seo_score integer DEFAULT 0,
  last_audited_at timestamptz,
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- SEO Redirects
CREATE TABLE public.seo_redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path text NOT NULL UNIQUE,
  target_path text NOT NULL,
  redirect_type integer DEFAULT 301 CHECK (redirect_type IN (301, 302, 307, 308)),
  is_active boolean DEFAULT true,
  hit_count integer DEFAULT 0,
  last_hit_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- SEO Change Log (version history)
CREATE TABLE public.seo_change_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type IN ('page', 'global', 'redirect')),
  entity_id uuid NOT NULL,
  entity_route text,
  field_name text NOT NULL,
  old_value text,
  new_value text,
  changed_by uuid REFERENCES auth.users(id),
  changed_at timestamptz NOT NULL DEFAULT now(),
  is_reverted boolean DEFAULT false,
  reverted_at timestamptz,
  reverted_by uuid REFERENCES auth.users(id)
);

-- SEO Audit Issues
CREATE TABLE public.seo_audit_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES public.seo_pages(id) ON DELETE CASCADE,
  route text,
  issue_type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  category text NOT NULL,
  message text NOT NULL,
  details jsonb,
  is_resolved boolean DEFAULT false,
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- SEO Image Audit Cache
CREATE TABLE public.seo_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES public.seo_pages(id) ON DELETE CASCADE,
  src text NOT NULL,
  alt_text text,
  width integer,
  height integer,
  file_size integer,
  format text,
  has_alt boolean DEFAULT false,
  is_oversized boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_change_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_audit_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Admin only for all SEO tables
CREATE POLICY "Admins can manage global settings" ON public.seo_global_settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage pages" ON public.seo_pages
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read published pages SEO" ON public.seo_pages
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage redirects" ON public.seo_redirects
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read active redirects" ON public.seo_redirects
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage change log" ON public.seo_change_log
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage audit issues" ON public.seo_audit_issues
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage images" ON public.seo_images
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_seo_global_settings_updated_at
  BEFORE UPDATE ON public.seo_global_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_pages_updated_at
  BEFORE UPDATE ON public.seo_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_redirects_updated_at
  BEFORE UPDATE ON public.seo_redirects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_images_updated_at
  BEFORE UPDATE ON public.seo_images
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default global settings
INSERT INTO public.seo_global_settings (site_name, title_template) 
VALUES ('Okan Ağaoğlu', '{title} | Okan Ağaoğlu');

-- Insert initial pages based on existing routes
INSERT INTO public.seo_pages (route, template_type, meta_title, meta_description) VALUES
  ('/', 'home', 'Okan Ağaoğlu - Profesyonel Fotoğrafçı', 'Profesyonel fotoğrafçılık hizmetleri. Portre, düğün, etkinlik ve ürün fotoğrafçılığı.'),
  ('/about', 'about', 'Hakkımda', 'Okan Ağaoğlu hakkında bilgi edinin.'),
  ('/work', 'work', 'Çalışmalarım', 'Fotoğraf portföyüm ve projelerim.'),
  ('/blog', 'blog_list', 'Blog', 'Fotoğrafçılık üzerine yazılar ve ipuçları.'),
  ('/booking', 'booking', 'Randevu Al', 'Fotoğraf çekimi için randevu alın.');

-- Create indexes for performance
CREATE INDEX idx_seo_pages_route ON public.seo_pages(route);
CREATE INDEX idx_seo_pages_template ON public.seo_pages(template_type);
CREATE INDEX idx_seo_redirects_source ON public.seo_redirects(source_path);
CREATE INDEX idx_seo_change_log_entity ON public.seo_change_log(entity_type, entity_id);
CREATE INDEX idx_seo_audit_issues_page ON public.seo_audit_issues(page_id);
CREATE INDEX idx_seo_audit_issues_severity ON public.seo_audit_issues(severity);
