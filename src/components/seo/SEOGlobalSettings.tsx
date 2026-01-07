import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOGlobalSettings as GlobalSettingsType } from '@/hooks/useSEO';

interface SEOGlobalSettingsProps {
  settings: GlobalSettingsType | null;
  loading: boolean;
  onSave: (settings: Partial<GlobalSettingsType>) => Promise<boolean>;
}

export const SEOGlobalSettings: React.FC<SEOGlobalSettingsProps> = ({
  settings,
  loading,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<GlobalSettingsType>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (field: keyof GlobalSettingsType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Global SEO Ayarları</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>

      <Tabs defaultValue="defaults" className="space-y-6">
        <TabsList>
          <TabsTrigger value="defaults">Varsayılanlar</TabsTrigger>
          <TabsTrigger value="robots">Robots.txt</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
        </TabsList>

        {/* Defaults Tab */}
        <TabsContent value="defaults" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Site Adı</Label>
                <Input
                  value={formData.site_name || ''}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  placeholder="Site adı"
                />
              </div>

              <div className="space-y-2">
                <Label>Başlık Şablonu</Label>
                <Input
                  value={formData.title_template || ''}
                  onChange={(e) => handleChange('title_template', e.target.value)}
                  placeholder="{title} | {site_name}"
                />
                <p className="text-xs text-muted-foreground">
                  Kullanılabilir değişkenler: {'{title}'}, {'{site_name}'}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Açıklama Şablonu (isteğe bağlı)</Label>
                <Textarea
                  value={formData.description_template || ''}
                  onChange={(e) => handleChange('description_template', e.target.value)}
                  placeholder="Varsayılan açıklama şablonu"
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Varsayılan Robots</Label>
                <Select
                  value={formData.default_robots || 'index, follow'}
                  onValueChange={(v) => handleChange('default_robots', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="index, follow">index, follow</SelectItem>
                    <SelectItem value="noindex, follow">noindex, follow</SelectItem>
                    <SelectItem value="index, nofollow">index, nofollow</SelectItem>
                    <SelectItem value="noindex, nofollow">noindex, nofollow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Varsayılan Canonical</Label>
                <Select
                  value={formData.default_canonical_mode || 'auto'}
                  onValueChange={(v) => handleChange('default_canonical_mode', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Otomatik (kendisi)</SelectItem>
                    <SelectItem value="manual">Manuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Varsayılan OG Görsel URL</Label>
                <Input
                  value={formData.default_og_image || ''}
                  onChange={(e) => handleChange('default_og_image', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Robots.txt Tab */}
        <TabsContent value="robots" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>robots.txt İçeriği</Label>
              <Textarea
                value={formData.robots_txt || ''}
                onChange={(e) => handleChange('robots_txt', e.target.value)}
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {'{origin}'} değişkeni site URL'si ile değiştirilir
              </p>
            </div>

            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">⚠️ Dikkat</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• /admin ve /auth yollarını engellemek önemlidir</li>
                <li>• Ana sayfayı (/) engellemeyin</li>
                <li>• Sitemap URL'sini eklemeyi unutmayın</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Sitemap Tab */}
        <TabsContent value="sitemap" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Sitemap Aktif</Label>
                <p className="text-xs text-muted-foreground">sitemap.xml otomatik oluşturulsun</p>
              </div>
              <Switch
                checked={formData.sitemap_enabled}
                onCheckedChange={(v) => handleChange('sitemap_enabled', v)}
              />
            </div>

            <div className="space-y-2">
              <Label>Hariç Tutulacak URL Kalıpları</Label>
              <Textarea
                value={formData.sitemap_exclude_patterns?.join('\n') || ''}
                onChange={(e) => handleChange('sitemap_exclude_patterns', e.target.value.split('\n').filter(Boolean))}
                rows={4}
                placeholder="/admin&#10;/auth&#10;/api"
              />
              <p className="text-xs text-muted-foreground">
                Her satıra bir kalıp yazın. Bu kalıplarla başlayan URL'ler sitemap'e dahil edilmez.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-medium mb-2">Sitemap Önizleme</h4>
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${window.location.origin}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${window.location.origin}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ...
</urlset>`}
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
