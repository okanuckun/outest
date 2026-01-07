import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Save, 
  Eye,
  Globe,
  Search,
  FileText,
  Image as ImageIcon,
  Code,
  Link2,
  Heading,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SEOPage, calculateSEOScore } from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';

interface SEOPageEditorProps {
  page: SEOPage | null;
  isNew: boolean;
  onSave: (page: Partial<SEOPage>) => void;
  onClose: () => void;
}

const templateTypes = [
  { value: 'home', label: 'Ana Sayfa' },
  { value: 'blog_post', label: 'Blog Yazısı' },
  { value: 'blog_list', label: 'Blog Listesi' },
  { value: 'project', label: 'Proje' },
  { value: 'work', label: 'Çalışmalar' },
  { value: 'about', label: 'Hakkında' },
  { value: 'booking', label: 'Randevu' },
  { value: 'page', label: 'Sayfa' },
  { value: 'other', label: 'Diğer' },
];

const schemaTypes = [
  { value: 'WebSite', label: 'WebSite' },
  { value: 'Organization', label: 'Organization' },
  { value: 'BreadcrumbList', label: 'BreadcrumbList' },
  { value: 'Article', label: 'Article' },
  { value: 'BlogPosting', label: 'BlogPosting' },
  { value: 'Person', label: 'Person' },
  { value: 'LocalBusiness', label: 'LocalBusiness' },
  { value: 'FAQPage', label: 'FAQPage' },
  { value: 'ImageGallery', label: 'ImageGallery' },
];

export const SEOPageEditor: React.FC<SEOPageEditorProps> = ({
  page,
  isNew,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<SEOPage>>({
    route: '',
    template_type: 'page',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    focus_keyword: '',
    secondary_keywords: [],
    is_indexable: true,
    robots_meta: 'index, follow',
    noarchive: false,
    nosnippet: false,
    canonical_mode: 'auto',
    canonical_url: '',
    include_in_sitemap: true,
    og_title: '',
    og_description: '',
    og_image: '',
    og_type: 'website',
    twitter_card: 'summary_large_image',
    twitter_image: '',
    schema_types: [],
    schema_data: [],
    h1_text: '',
    h2_outline: [],
  });

  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('meta');

  useEffect(() => {
    if (page) {
      setFormData(page);
    }
  }, [page]);

  const handleChange = (field: keyof SEOPage, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'og_image' | 'twitter_image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `seo/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('content-images')
      .upload(fileName, file);

    setUploading(false);

    if (uploadError) return;

    const { data } = supabase.storage.from('content-images').getPublicUrl(fileName);
    handleChange(field, data.publicUrl);
  };

  const handleSave = () => {
    onSave(formData);
  };

  const score = calculateSEOScore(formData as SEOPage);
  const titleLength = formData.meta_title?.length || 0;
  const descLength = formData.meta_description?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-background border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium">
              {isNew ? 'Yeni Sayfa SEO' : `SEO: ${formData.route}`}
            </h2>
            <Badge className={score >= 80 ? 'bg-green-100 text-green-700' : score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}>
              Skor: {score}%
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Kaydet
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(90vh-80px)]">
          <div className="border-b border-border px-4">
            <TabsList className="h-12">
              <TabsTrigger value="meta" className="gap-2">
                <Search className="w-4 h-4" />
                Meta / SERP
              </TabsTrigger>
              <TabsTrigger value="indexing" className="gap-2">
                <Globe className="w-4 h-4" />
                İndeksleme
              </TabsTrigger>
              <TabsTrigger value="social" className="gap-2">
                <ImageIcon className="w-4 h-4" />
                OG / Sosyal
              </TabsTrigger>
              <TabsTrigger value="schema" className="gap-2">
                <Code className="w-4 h-4" />
                Schema
              </TabsTrigger>
              <TabsTrigger value="headings" className="gap-2">
                <Heading className="w-4 h-4" />
                Başlıklar
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="overflow-y-auto h-[calc(100%-48px)] p-6">
            {/* Meta / SERP Tab */}
            <TabsContent value="meta" className="space-y-6 m-0">
              {isNew && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>URL / Route</Label>
                    <Input
                      value={formData.route}
                      onChange={(e) => handleChange('route', e.target.value)}
                      placeholder="/sayfa-adi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Şablon Tipi</Label>
                    <Select
                      value={formData.template_type}
                      onValueChange={(v) => handleChange('template_type', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templateTypes.map(t => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Meta Başlık</Label>
                  <span className={`text-xs ${titleLength > 60 ? 'text-red-500' : titleLength < 30 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {titleLength}/60 karakter
                  </span>
                </div>
                <Input
                  value={formData.meta_title || ''}
                  onChange={(e) => handleChange('meta_title', e.target.value)}
                  placeholder="Sayfa başlığı"
                />
                {titleLength > 60 && (
                  <p className="text-xs text-red-500">Başlık çok uzun, Google tarafından kesilebilir</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Meta Açıklama</Label>
                  <span className={`text-xs ${descLength > 160 ? 'text-red-500' : descLength < 70 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {descLength}/160 karakter
                  </span>
                </div>
                <Textarea
                  value={formData.meta_description || ''}
                  onChange={(e) => handleChange('meta_description', e.target.value)}
                  placeholder="Sayfa açıklaması"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Odak Anahtar Kelime</Label>
                  <Input
                    value={formData.focus_keyword || ''}
                    onChange={(e) => handleChange('focus_keyword', e.target.value)}
                    placeholder="Ana anahtar kelime"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meta Keywords (isteğe bağlı)</Label>
                  <Input
                    value={formData.meta_keywords || ''}
                    onChange={(e) => handleChange('meta_keywords', e.target.value)}
                    placeholder="kelime1, kelime2, kelime3"
                  />
                </div>
              </div>

              {/* Google SERP Preview */}
              <div className="space-y-2">
                <Label>Google SERP Önizleme</Label>
                <div className="border border-border rounded-lg p-4 bg-white">
                  <div className="text-blue-700 text-lg hover:underline cursor-pointer truncate">
                    {formData.meta_title || 'Sayfa Başlığı'}
                  </div>
                  <div className="text-green-700 text-sm truncate">
                    {window.location.origin}{formData.route || '/'}
                  </div>
                  <div className="text-gray-600 text-sm line-clamp-2">
                    {formData.meta_description || 'Meta açıklama buraya gelecek...'}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Indexing Tab */}
            <TabsContent value="indexing" className="space-y-6 m-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Index</Label>
                      <p className="text-xs text-muted-foreground">Arama motorlarında görünsün</p>
                    </div>
                    <Switch
                      checked={formData.is_indexable}
                      onCheckedChange={(v) => handleChange('is_indexable', v)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Noarchive</Label>
                      <p className="text-xs text-muted-foreground">Önbelleğe alınmasın</p>
                    </div>
                    <Switch
                      checked={formData.noarchive}
                      onCheckedChange={(v) => handleChange('noarchive', v)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Nosnippet</Label>
                      <p className="text-xs text-muted-foreground">Snippet gösterilmesin</p>
                    </div>
                    <Switch
                      checked={formData.nosnippet}
                      onCheckedChange={(v) => handleChange('nosnippet', v)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sitemap'e Dahil</Label>
                      <p className="text-xs text-muted-foreground">sitemap.xml'de göster</p>
                    </div>
                    <Switch
                      checked={formData.include_in_sitemap}
                      onCheckedChange={(v) => handleChange('include_in_sitemap', v)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Robots Meta</Label>
                    <Select
                      value={formData.robots_meta}
                      onValueChange={(v) => handleChange('robots_meta', v)}
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
                    <Label>Canonical</Label>
                    <Select
                      value={formData.canonical_mode}
                      onValueChange={(v) => handleChange('canonical_mode', v as 'auto' | 'manual')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Otomatik (kendisi)</SelectItem>
                        <SelectItem value="manual">Manuel URL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.canonical_mode === 'manual' && (
                    <div className="space-y-2">
                      <Label>Canonical URL</Label>
                      <Input
                        value={formData.canonical_url || ''}
                        onChange={(e) => handleChange('canonical_url', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Indexability Diagnostics */}
              <div className="border border-border rounded-lg p-4 space-y-2">
                <h4 className="font-medium">İndekslenebilirlik Durumu</h4>
                <ul className="space-y-1 text-sm">
                  {!formData.is_indexable && (
                    <li className="text-red-600">⚠️ Sayfa noindex olarak işaretli</li>
                  )}
                  {formData.canonical_mode === 'manual' && formData.canonical_url && (
                    <li className="text-yellow-600">⚠️ Canonical başka bir URL'e yönleniyor</li>
                  )}
                  {formData.is_indexable && formData.canonical_mode === 'auto' && (
                    <li className="text-green-600">✓ Sayfa indekslenebilir durumda</li>
                  )}
                </ul>
              </div>
            </TabsContent>

            {/* Social Tab */}
            <TabsContent value="social" className="space-y-6 m-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Open Graph</h4>
                  
                  <div className="space-y-2">
                    <Label>OG Başlık</Label>
                    <Input
                      value={formData.og_title || ''}
                      onChange={(e) => handleChange('og_title', e.target.value)}
                      placeholder={formData.meta_title || 'OG başlığı'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>OG Açıklama</Label>
                    <Textarea
                      value={formData.og_description || ''}
                      onChange={(e) => handleChange('og_description', e.target.value)}
                      placeholder={formData.meta_description || 'OG açıklaması'}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>OG Görsel</Label>
                    <div className="flex items-center gap-2">
                      {formData.og_image && (
                        <img src={formData.og_image} alt="OG" className="w-20 h-12 object-cover rounded" />
                      )}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'og_image')}
                        />
                        <div className="flex items-center gap-2 px-3 py-2 border border-border rounded hover:bg-accent">
                          <Upload className="w-4 h-4" />
                          {uploading ? 'Yükleniyor...' : 'Yükle'}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Twitter Card</h4>
                  
                  <div className="space-y-2">
                    <Label>Card Tipi</Label>
                    <Select
                      value={formData.twitter_card}
                      onValueChange={(v) => handleChange('twitter_card', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Twitter Görsel</Label>
                    <div className="flex items-center gap-2">
                      {formData.twitter_image && (
                        <img src={formData.twitter_image} alt="Twitter" className="w-20 h-12 object-cover rounded" />
                      )}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'twitter_image')}
                        />
                        <div className="flex items-center gap-2 px-3 py-2 border border-border rounded hover:bg-accent">
                          <Upload className="w-4 h-4" />
                          {uploading ? 'Yükleniyor...' : 'Yükle'}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facebook Preview */}
              <div className="space-y-2">
                <Label>Facebook Önizleme</Label>
                <div className="border border-gray-300 rounded-lg overflow-hidden max-w-md bg-white">
                  {formData.og_image ? (
                    <img src={formData.og_image} alt="OG Preview" className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                      Görsel yok
                    </div>
                  )}
                  <div className="p-3">
                    <div className="text-xs text-gray-500 uppercase">
                      {window.location.host}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {formData.og_title || formData.meta_title || 'Başlık'}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {formData.og_description || formData.meta_description || 'Açıklama'}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Schema Tab */}
            <TabsContent value="schema" className="space-y-6 m-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Schema Tipleri</Label>
                  <div className="flex flex-wrap gap-2">
                    {schemaTypes.map(st => (
                      <Badge
                        key={st.value}
                        variant={formData.schema_types?.includes(st.value) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          const current = formData.schema_types || [];
                          if (current.includes(st.value)) {
                            handleChange('schema_types', current.filter(t => t !== st.value));
                          } else {
                            handleChange('schema_types', [...current, st.value]);
                          }
                        }}
                      >
                        {st.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Schema JSON-LD (Gelişmiş)</Label>
                  <Textarea
                    value={JSON.stringify(formData.schema_data || [], null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        handleChange('schema_data', parsed);
                      } catch {
                        // Invalid JSON, ignore
                      }
                    }}
                    rows={10}
                    className="font-mono text-sm"
                    placeholder='[{"@type": "WebSite", ...}]'
                  />
                  <p className="text-xs text-muted-foreground">
                    Geçerli JSON-LD formatında olmalıdır
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Headings Tab */}
            <TabsContent value="headings" className="space-y-6 m-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>H1 Başlığı</Label>
                  <Input
                    value={formData.h1_text || ''}
                    onChange={(e) => handleChange('h1_text', e.target.value)}
                    placeholder="Sayfanın ana başlığı"
                  />
                  {!formData.h1_text && (
                    <p className="text-xs text-red-500">⚠️ H1 başlığı eksik</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>H2/H3 Yapısı</Label>
                  <Textarea
                    value={formData.h2_outline?.join('\n') || ''}
                    onChange={(e) => handleChange('h2_outline', e.target.value.split('\n').filter(Boolean))}
                    rows={6}
                    placeholder="Her satıra bir başlık"
                  />
                  <p className="text-xs text-muted-foreground">
                    Sayfa yapısını belgelemek için H2 ve H3 başlıklarını girin
                  </p>
                </div>

                {/* Content Structure Warnings */}
                <div className="border border-border rounded-lg p-4 space-y-2">
                  <h4 className="font-medium">Yapı Analizi</h4>
                  <ul className="space-y-1 text-sm">
                    {!formData.h1_text ? (
                      <li className="text-red-600">❌ H1 başlığı eksik</li>
                    ) : (
                      <li className="text-green-600">✓ H1 başlığı mevcut</li>
                    )}
                    {(!formData.h2_outline || formData.h2_outline.length === 0) ? (
                      <li className="text-yellow-600">⚠️ H2 başlıkları eksik</li>
                    ) : (
                      <li className="text-green-600">✓ {formData.h2_outline.length} H2/H3 başlığı mevcut</li>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};
