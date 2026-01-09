import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Save, Eye, Code } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  description: string | null;
  updated_at: string;
}

const EmailTemplatesManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const { data: templates, isLoading } = useQuery({
    queryKey: ['email-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as EmailTemplate[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (template: Partial<EmailTemplate> & { id: string }) => {
      const { error } = await supabase
        .from('email_templates')
        .update({
          subject: template.subject,
          body: template.body,
        })
        .eq('id', template.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      toast.success('Email template updated successfully');
      setEditingTemplate(null);
    },
    onError: (error) => {
      toast.error('Failed to update template: ' + error.message);
    },
  });

  const handleSave = () => {
    if (editingTemplate) {
      updateMutation.mutate(editingTemplate);
    }
  };

  // Preview with sample data
  const getPreviewHtml = (body: string) => {
    const sampleData: Record<string, string> = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      location: 'NYC - Monolith Studio',
      tattooPlacement: 'Forearm',
      tattooSize: 'Medium (4-6 inches)',
      preferredDate: 'March 2026',
    };

    let result = body;
    for (const [key, value] of Object.entries(sampleData)) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return result;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading templates...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">Email Templates</h2>
      </div>

      {templates?.map((template) => (
        <Card key={template.id} className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{template.name}</span>
              {editingTemplate?.id !== template.id && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingTemplate(template)}
                >
                  Edit
                </Button>
              )}
            </CardTitle>
            {template.description && (
              <CardDescription>{template.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {editingTemplate?.id === template.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject Line</label>
                  <Input
                    value={editingTemplate.subject}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                    placeholder="Email subject..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Email Body (HTML)</label>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewMode(false)}
                        className={!previewMode ? 'bg-muted' : ''}
                      >
                        <Code size={14} className="mr-1" />
                        Code
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewMode(true)}
                        className={previewMode ? 'bg-muted' : ''}
                      >
                        <Eye size={14} className="mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  {previewMode ? (
                    <div 
                      className="border rounded-md p-4 bg-white min-h-[300px] prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: getPreviewHtml(editingTemplate.body) }}
                    />
                  ) : (
                    <Textarea
                      value={editingTemplate.body}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                      className="min-h-[300px] font-mono text-sm"
                      placeholder="Email HTML content..."
                    />
                  )}
                </div>

                <div className="bg-muted/50 rounded-md p-3 text-sm">
                  <p className="font-medium mb-1">Available Variables:</p>
                  <code className="text-xs">
                    {'{{firstName}}'} {'{{lastName}}'} {'{{email}}'} {'{{location}}'} {'{{tattooPlacement}}'} {'{{tattooSize}}'} {'{{preferredDate}}'}
                  </code>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={updateMutation.isPending}>
                    <Save size={16} className="mr-2" />
                    {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingTemplate(null);
                      setPreviewMode(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Subject: </span>
                  <span className="text-sm">{template.subject}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(template.updated_at).toLocaleDateString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {(!templates || templates.length === 0) && (
        <p className="text-center text-muted-foreground py-8">No email templates found.</p>
      )}
    </div>
  );
};

export default EmailTemplatesManager;
