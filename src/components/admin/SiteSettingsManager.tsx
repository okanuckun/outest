import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Settings, Save, ExternalLink } from 'lucide-react';

interface SiteSettings {
  id: string;
  meta_pixel_id: string | null;
  google_analytics_id: string | null;
  tiktok_pixel_id: string | null;
}

const SiteSettingsManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    meta_pixel_id: '',
    google_analytics_id: '',
    tiktok_pixel_id: '',
  });

  const { data: settings, isLoading } = useQuery({
    queryKey: ['site-settings-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'global')
        .single();
      
      if (error) throw error;
      return data as SiteSettings;
    },
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        meta_pixel_id: settings.meta_pixel_id || '',
        google_analytics_id: settings.google_analytics_id || '',
        tiktok_pixel_id: settings.tiktok_pixel_id || '',
      });
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<SiteSettings>) => {
      const { error } = await supabase
        .from('site_settings')
        .update(data)
        .eq('id', 'global');
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings-admin'] });
      toast.success('Settings saved successfully');
    },
    onError: (error) => {
      toast.error('Failed to save settings: ' + error.message);
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      meta_pixel_id: formData.meta_pixel_id || null,
      google_analytics_id: formData.google_analytics_id || null,
      tiktok_pixel_id: formData.tiktok_pixel_id || null,
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">Site Settings</h2>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Tracking & Analytics</CardTitle>
          <CardDescription>
            Configure tracking pixels to retarget your website visitors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Meta Pixel */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Meta (Facebook) Pixel ID
            </label>
            <Input
              value={formData.meta_pixel_id}
              onChange={(e) => setFormData({ ...formData, meta_pixel_id: e.target.value })}
              placeholder="e.g., 123456789012345"
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Find your Pixel ID in 
              <a 
                href="https://business.facebook.com/events_manager" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Meta Events Manager <ExternalLink size={10} />
              </a>
            </p>
          </div>

          {/* Google Analytics */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Google Analytics 4 ID
            </label>
            <Input
              value={formData.google_analytics_id}
              onChange={(e) => setFormData({ ...formData, google_analytics_id: e.target.value })}
              placeholder="e.g., G-XXXXXXXXXX"
            />
            <p className="text-xs text-muted-foreground">
              Optional - for website traffic analytics
            </p>
          </div>

          {/* TikTok Pixel */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              TikTok Pixel ID
            </label>
            <Input
              value={formData.tiktok_pixel_id}
              onChange={(e) => setFormData({ ...formData, tiktok_pixel_id: e.target.value })}
              placeholder="e.g., CXXXXXXXXXXXXXXXXX"
            />
            <p className="text-xs text-muted-foreground">
              Optional - for TikTok ad retargeting
            </p>
          </div>

          <Button onClick={handleSave} disabled={updateMutation.isPending}>
            <Save size={16} className="mr-2" />
            {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManager;
