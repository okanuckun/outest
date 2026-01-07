import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface SEOPage {
  id: string;
  route: string;
  template_type: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  focus_keyword: string | null;
  secondary_keywords: string[] | null;
  is_indexable: boolean;
  robots_meta: string;
  noarchive: boolean;
  nosnippet: boolean;
  canonical_mode: 'auto' | 'manual';
  canonical_url: string | null;
  include_in_sitemap: boolean;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  og_type: string;
  twitter_card: string;
  twitter_image: string | null;
  schema_types: string[];
  schema_data: any[];
  h1_text: string | null;
  h2_outline: string[] | null;
  word_count: number;
  seo_score: number;
  last_audited_at: string | null;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

export interface SEOGlobalSettings {
  id: string;
  site_name: string;
  title_template: string;
  description_template: string | null;
  default_og_image: string | null;
  default_robots: string;
  default_canonical_mode: 'auto' | 'manual';
  robots_txt: string;
  sitemap_enabled: boolean;
  sitemap_exclude_patterns: string[];
  created_at: string;
  updated_at: string;
}

export interface SEORedirect {
  id: string;
  source_path: string;
  target_path: string;
  redirect_type: number;
  is_active: boolean;
  hit_count: number;
  last_hit_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface SEOChangeLog {
  id: string;
  entity_type: 'page' | 'global' | 'redirect';
  entity_id: string;
  entity_route: string | null;
  field_name: string;
  old_value: string | null;
  new_value: string | null;
  changed_by: string | null;
  changed_at: string;
  is_reverted: boolean;
  reverted_at: string | null;
  reverted_by: string | null;
}

export interface SEOAuditIssue {
  id: string;
  page_id: string | null;
  route: string | null;
  issue_type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  message: string;
  details: any;
  is_resolved: boolean;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
}

export function useSEOPages() {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchPages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('seo_pages')
      .select('*')
      .order('route');

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
    } else {
      setPages((data as unknown as SEOPage[]) || []);
    }
    setLoading(false);
  }, [toast]);

  const updatePage = useCallback(async (id: string, updates: Partial<SEOPage>, oldPage: SEOPage) => {
    const { error } = await supabase
      .from('seo_pages')
      .update({ ...updates, updated_by: user?.id })
      .eq('id', id);

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
      return false;
    }

    // Log changes
    const changedFields = Object.keys(updates) as (keyof SEOPage)[];
    for (const field of changedFields) {
      if (JSON.stringify(oldPage[field]) !== JSON.stringify(updates[field])) {
        await supabase.from('seo_change_log').insert({
          entity_type: 'page',
          entity_id: id,
          entity_route: oldPage.route,
          field_name: field,
          old_value: JSON.stringify(oldPage[field]),
          new_value: JSON.stringify(updates[field]),
          changed_by: user?.id,
        });
      }
    }

    toast({ title: 'Başarılı', description: 'SEO ayarları güncellendi' });
    fetchPages();
    return true;
  }, [user, toast, fetchPages]);

  const createPage = useCallback(async (page: Partial<SEOPage>) => {
    if (!page.route) return null;
    const { data, error } = await supabase
      .from('seo_pages')
      .insert([{ route: page.route, ...page, updated_by: user?.id }])
      .select()
      .single();

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
      return null;
    }

    toast({ title: 'Başarılı', description: 'Sayfa eklendi' });
    fetchPages();
    return data;
  }, [user, toast, fetchPages]);

  const deletePage = useCallback(async (id: string) => {
    const { error } = await supabase.from('seo_pages').delete().eq('id', id);

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
      return false;
    }

    toast({ title: 'Başarılı', description: 'Sayfa silindi' });
    fetchPages();
    return true;
  }, [toast, fetchPages]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return { pages, loading, fetchPages, updatePage, createPage, deletePage };
}

export function useSEOGlobalSettings() {
  const [settings, setSettings] = useState<SEOGlobalSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('seo_global_settings')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
    } else {
      setSettings(data as unknown as SEOGlobalSettings);
    }
    setLoading(false);
  }, [toast]);

  const updateSettings = useCallback(async (updates: Partial<SEOGlobalSettings>) => {
    if (!settings) return false;

    const { error } = await supabase
      .from('seo_global_settings')
      .update(updates)
      .eq('id', settings.id);

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
      return false;
    }

    // Log changes
    const changedFields = Object.keys(updates) as (keyof SEOGlobalSettings)[];
    for (const field of changedFields) {
      if (JSON.stringify(settings[field]) !== JSON.stringify(updates[field])) {
        await supabase.from('seo_change_log').insert({
          entity_type: 'global',
          entity_id: settings.id,
          entity_route: null,
          field_name: field,
          old_value: JSON.stringify(settings[field]),
          new_value: JSON.stringify(updates[field]),
          changed_by: user?.id,
        });
      }
    }

    toast({ title: 'Başarılı', description: 'Global ayarlar güncellendi' });
    fetchSettings();
    return true;
  }, [settings, user, toast, fetchSettings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, fetchSettings, updateSettings };
}

export function useSEORedirects() {
  const [redirects, setRedirects] = useState<SEORedirect[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchRedirects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('seo_redirects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
    } else {
      setRedirects((data as unknown as SEORedirect[]) || []);
    }
    setLoading(false);
  }, [toast]);

  const createRedirect = useCallback(async (redirect: Partial<SEORedirect>) => {
    if (!redirect.source_path || !redirect.target_path) return false;
    const { error } = await supabase
      .from('seo_redirects')
      .insert([{ source_path: redirect.source_path, target_path: redirect.target_path, ...redirect, created_by: user?.id }]);

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
      return false;
    }

    toast({ title: 'Başarılı', description: 'Yönlendirme eklendi' });
    fetchRedirects();
    return true;
  }, [user, toast, fetchRedirects]);

  const updateRedirect = useCallback(async (id: string, updates: Partial<SEORedirect>) => {
    const { error } = await supabase
      .from('seo_redirects')
      .update(updates)
      .eq('id', id);

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
      return false;
    }

    toast({ title: 'Başarılı', description: 'Yönlendirme güncellendi' });
    fetchRedirects();
    return true;
  }, [toast, fetchRedirects]);

  const deleteRedirect = useCallback(async (id: string) => {
    const { error } = await supabase.from('seo_redirects').delete().eq('id', id);

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
      return false;
    }

    toast({ title: 'Başarılı', description: 'Yönlendirme silindi' });
    fetchRedirects();
    return true;
  }, [toast, fetchRedirects]);

  useEffect(() => {
    fetchRedirects();
  }, [fetchRedirects]);

  return { redirects, loading, fetchRedirects, createRedirect, updateRedirect, deleteRedirect };
}

export function useSEOChangeLog() {
  const [logs, setLogs] = useState<SEOChangeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchLogs = useCallback(async (filters?: { entityType?: string; entityId?: string }) => {
    setLoading(true);
    let query = supabase
      .from('seo_change_log')
      .select('*')
      .order('changed_at', { ascending: false })
      .limit(100);

    if (filters?.entityType) {
      query = query.eq('entity_type', filters.entityType);
    }
    if (filters?.entityId) {
      query = query.eq('entity_id', filters.entityId);
    }

    const { data, error } = await query;

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
    } else {
      setLogs((data as unknown as SEOChangeLog[]) || []);
    }
    setLoading(false);
  }, [toast]);

  const revertChange = useCallback(async (log: SEOChangeLog) => {
    // Revert the change
    if (log.entity_type === 'page') {
      const { error } = await supabase
        .from('seo_pages')
        .update({ [log.field_name]: JSON.parse(log.old_value || 'null') })
        .eq('id', log.entity_id);

      if (error) {
        toast({ title: 'Hata', description: error.message, variant: 'destructive' });
        return false;
      }
    } else if (log.entity_type === 'global') {
      const { error } = await supabase
        .from('seo_global_settings')
        .update({ [log.field_name]: JSON.parse(log.old_value || 'null') })
        .eq('id', log.entity_id);

      if (error) {
        toast({ title: 'Hata', description: error.message, variant: 'destructive' });
        return false;
      }
    }

    // Mark as reverted
    await supabase
      .from('seo_change_log')
      .update({ is_reverted: true, reverted_at: new Date().toISOString(), reverted_by: user?.id })
      .eq('id', log.id);

    toast({ title: 'Başarılı', description: 'Değişiklik geri alındı' });
    fetchLogs();
    return true;
  }, [user, toast, fetchLogs]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, fetchLogs, revertChange };
}

export function useSEOAudit() {
  const [issues, setIssues] = useState<SEOAuditIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchIssues = useCallback(async () => {
    const { data, error } = await supabase
      .from('seo_audit_issues')
      .select('*')
      .eq('is_resolved', false)
      .order('severity')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
    } else {
      setIssues((data as unknown as SEOAuditIssue[]) || []);
    }
  }, [toast]);

  const runAudit = useCallback(async (pages: SEOPage[]) => {
    setLoading(true);
    
    // Clear old issues
    await supabase.from('seo_audit_issues').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const newIssues: Partial<SEOAuditIssue>[] = [];

    for (const page of pages) {
      // Check for missing meta title
      if (!page.meta_title) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'missing_title',
          severity: 'critical',
          category: 'metadata',
          message: 'Meta başlık eksik',
          details: { field: 'meta_title' },
        });
      } else if (page.meta_title.length < 30) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'short_title',
          severity: 'medium',
          category: 'metadata',
          message: 'Meta başlık çok kısa (30 karakterden az)',
          details: { length: page.meta_title.length },
        });
      } else if (page.meta_title.length > 60) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'long_title',
          severity: 'medium',
          category: 'metadata',
          message: 'Meta başlık çok uzun (60 karakterden fazla)',
          details: { length: page.meta_title.length },
        });
      }

      // Check for missing meta description
      if (!page.meta_description) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'missing_description',
          severity: 'high',
          category: 'metadata',
          message: 'Meta açıklama eksik',
          details: { field: 'meta_description' },
        });
      } else if (page.meta_description.length < 70) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'short_description',
          severity: 'low',
          category: 'metadata',
          message: 'Meta açıklama çok kısa (70 karakterden az)',
          details: { length: page.meta_description.length },
        });
      } else if (page.meta_description.length > 160) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'long_description',
          severity: 'low',
          category: 'metadata',
          message: 'Meta açıklama çok uzun (160 karakterden fazla)',
          details: { length: page.meta_description.length },
        });
      }

      // Check for missing OG image
      if (!page.og_image) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'missing_og_image',
          severity: 'medium',
          category: 'social',
          message: 'OG görseli eksik',
          details: { field: 'og_image' },
        });
      }

      // Check for missing H1
      if (!page.h1_text) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'missing_h1',
          severity: 'high',
          category: 'headings',
          message: 'H1 başlığı eksik',
          details: { field: 'h1_text' },
        });
      }

      // Check for noindex on important pages
      if (!page.is_indexable && ['home', 'about', 'work', 'blog_list'].includes(page.template_type)) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'important_noindex',
          severity: 'critical',
          category: 'indexability',
          message: 'Önemli sayfa noindex olarak işaretlenmiş',
          details: { template_type: page.template_type },
        });
      }

      // Check for missing schema
      if (page.schema_types.length === 0) {
        newIssues.push({
          page_id: page.id,
          route: page.route,
          issue_type: 'missing_schema',
          severity: 'low',
          category: 'schema',
          message: 'Structured data (schema) eksik',
          details: {},
        });
      }
    }

    // Check for duplicate titles
    const titles = pages.filter(p => p.meta_title).map(p => ({ route: p.route, title: p.meta_title }));
    const titleCounts: Record<string, string[]> = {};
    titles.forEach(t => {
      if (t.title) {
        if (!titleCounts[t.title]) titleCounts[t.title] = [];
        titleCounts[t.title].push(t.route);
      }
    });
    Object.entries(titleCounts).forEach(([title, routes]) => {
      if (routes.length > 1) {
        routes.forEach(route => {
          const page = pages.find(p => p.route === route);
          if (page) {
            newIssues.push({
              page_id: page.id,
              route: page.route,
              issue_type: 'duplicate_title',
              severity: 'high',
              category: 'metadata',
              message: 'Tekrarlanan meta başlık',
              details: { duplicates: routes.filter(r => r !== route) },
            });
          }
        });
      }
    });

    // Insert new issues
    if (newIssues.length > 0) {
      const validIssues = newIssues.filter(i => i.issue_type && i.severity && i.category && i.message) as { issue_type: string; severity: string; category: string; message: string; page_id?: string; route?: string; details?: any }[];
      if (validIssues.length > 0) {
        await supabase.from('seo_audit_issues').insert(validIssues);
      }
    }

    toast({ 
      title: 'Denetim Tamamlandı', 
      description: `${newIssues.length} sorun bulundu` 
    });

    await fetchIssues();
    setLoading(false);
  }, [toast, fetchIssues]);

  const resolveIssue = useCallback(async (id: string, userId: string) => {
    const { error } = await supabase
      .from('seo_audit_issues')
      .update({ is_resolved: true, resolved_at: new Date().toISOString(), resolved_by: userId })
      .eq('id', id);

    if (error) {
      toast({ title: 'Hata', description: error.message, variant: 'destructive' });
      return false;
    }

    fetchIssues();
    return true;
  }, [toast, fetchIssues]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return { issues, loading, fetchIssues, runAudit, resolveIssue };
}

// Calculate SEO score for a page
export function calculateSEOScore(page: SEOPage): number {
  let score = 0;
  const maxScore = 100;

  // Meta title (20 points)
  if (page.meta_title) {
    score += 10;
    if (page.meta_title.length >= 30 && page.meta_title.length <= 60) score += 10;
  }

  // Meta description (20 points)
  if (page.meta_description) {
    score += 10;
    if (page.meta_description.length >= 70 && page.meta_description.length <= 160) score += 10;
  }

  // OG settings (15 points)
  if (page.og_title) score += 5;
  if (page.og_description) score += 5;
  if (page.og_image) score += 5;

  // Schema (15 points)
  if (page.schema_types.length > 0) score += 15;

  // Indexability (10 points)
  if (page.is_indexable) score += 10;

  // Canonical (10 points)
  if (page.canonical_mode === 'auto' || page.canonical_url) score += 10;

  // H1 (10 points)
  if (page.h1_text) score += 10;

  return Math.round((score / maxScore) * 100);
}
