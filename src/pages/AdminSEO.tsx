import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  ArrowLeft,
  FileText,
  Globe,
  Settings,
  ArrowRightLeft,
  AlertTriangle,
  History,
  Search
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { 
  useSEOPages, 
  useSEOGlobalSettings, 
  useSEORedirects, 
  useSEOChangeLog,
  useSEOAudit,
  SEOPage
} from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOPagesList } from '@/components/seo/SEOPagesList';
import { SEOPageEditor } from '@/components/seo/SEOPageEditor';
import { SEOGlobalSettings } from '@/components/seo/SEOGlobalSettings';
import { SEORedirects } from '@/components/seo/SEORedirects';
import { SEOAudit } from '@/components/seo/SEOAudit';
import { SEOChangeLog } from '@/components/seo/SEOChangeLog';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminSEO: React.FC = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Hooks
  const { pages, loading: pagesLoading, fetchPages, updatePage, createPage, deletePage } = useSEOPages();
  const { settings, loading: settingsLoading, updateSettings } = useSEOGlobalSettings();
  const { redirects, loading: redirectsLoading, createRedirect, updateRedirect, deleteRedirect } = useSEORedirects();
  const { logs, loading: logsLoading, fetchLogs, revertChange } = useSEOChangeLog();
  const { issues, loading: auditLoading, runAudit, resolveIssue } = useSEOAudit();

  // State
  const [editingPage, setEditingPage] = useState<SEOPage | null>(null);
  const [isNewPage, setIsNewPage] = useState(false);
  const [activeTab, setActiveTab] = useState('pages');

  // Handlers
  const handleEditPage = (page: SEOPage) => {
    setEditingPage(page);
    setIsNewPage(false);
  };

  const handleAddPage = () => {
    setEditingPage(null);
    setIsNewPage(true);
  };

  const handleSavePage = async (pageData: Partial<SEOPage>) => {
    if (isNewPage) {
      await createPage(pageData);
    } else if (editingPage) {
      await updatePage(editingPage.id, pageData, editingPage);
    }
    setEditingPage(null);
    setIsNewPage(false);
  };

  const handleDeletePage = async (id: string) => {
    if (confirm('Are you sure you want to delete this page SEO settings?')) {
      await deletePage(id);
    }
  };

  const handleBulkAction = async (action: string, pageIds: string[]) => {
    for (const id of pageIds) {
      const page = pages.find(p => p.id === id);
      if (!page) continue;

      switch (action) {
        case 'noindex':
          await updatePage(id, { is_indexable: false }, page);
          break;
        case 'index':
          await updatePage(id, { is_indexable: true }, page);
          break;
        case 'canonical-auto':
          await updatePage(id, { canonical_mode: 'auto', canonical_url: null }, page);
          break;
      }
    }
    toast({ title: 'Bulk action completed', description: `${pageIds.length} pages updated` });
  };

  const handleQuickFix = (issue: any) => {
    const page = pages.find(p => p.id === issue.page_id);
    if (page) {
      setEditingPage(page);
      setIsNewPage(false);
    }
  };

  const handleResolveIssue = async (id: string) => {
    if (user) {
      await resolveIssue(id, user.id);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-medium mb-2 text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You do not have permission to access this page.
          </p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
              <ArrowLeft size={18} className="mr-2" />
              Admin
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-medium text-foreground flex items-center gap-2">
              <Search size={20} />
              SEO Manager
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-3xl">
            <TabsTrigger value="pages" className="gap-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Pages</span>
            </TabsTrigger>
            <TabsTrigger value="global" className="gap-2">
              <Globe size={16} />
              <span className="hidden sm:inline">Global</span>
            </TabsTrigger>
            <TabsTrigger value="redirects" className="gap-2">
              <ArrowRightLeft size={16} />
              <span className="hidden sm:inline">Redirects</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="gap-2">
              <AlertTriangle size={16} />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History size={16} />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings size={16} />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-6">
            <SEOPagesList
              pages={pages}
              loading={pagesLoading}
              onEdit={handleEditPage}
              onDelete={handleDeletePage}
              onAdd={handleAddPage}
              onBulkAction={handleBulkAction}
            />
          </TabsContent>

          {/* Global Settings Tab */}
          <TabsContent value="global" className="space-y-6">
            <SEOGlobalSettings
              settings={settings}
              loading={settingsLoading}
              onSave={updateSettings}
            />
          </TabsContent>

          {/* Redirects Tab */}
          <TabsContent value="redirects" className="space-y-6">
            <SEORedirects
              redirects={redirects}
              loading={redirectsLoading}
              onCreate={createRedirect}
              onUpdate={updateRedirect}
              onDelete={deleteRedirect}
            />
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit" className="space-y-6">
            <SEOAudit
              issues={issues}
              pages={pages}
              loading={auditLoading}
              onRunAudit={runAudit}
              onResolve={handleResolveIssue}
              onQuickFix={handleQuickFix}
            />
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <SEOChangeLog
              logs={logs}
              loading={logsLoading}
              onRevert={revertChange}
              onFilter={fetchLogs}
            />
          </TabsContent>

          {/* Settings Tab (Additional Info) */}
          <TabsContent value="settings" className="space-y-6">
            <div className="border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-medium">SEO Overview</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Total Pages</h3>
                  <p className="text-3xl font-bold">{pages.length}</p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Indexed Pages</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {pages.filter(p => p.is_indexable).length}
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Noindex Pages</h3>
                  <p className="text-3xl font-bold text-red-600">
                    {pages.filter(p => !p.is_indexable).length}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Active Redirects</h3>
                  <p className="text-3xl font-bold">{redirects.filter(r => r.is_active).length}</p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Open Issues</h3>
                  <p className="text-3xl font-bold text-yellow-600">{issues.length}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium mb-4">Quick Links</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                      sitemap.xml
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
                      robots.txt
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                      Google Search Console
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener noreferrer">
                      Bing Webmaster Tools
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Page Editor Modal */}
      <AnimatePresence>
        {(editingPage || isNewPage) && (
          <SEOPageEditor
            page={editingPage}
            isNew={isNewPage}
            onSave={handleSavePage}
            onClose={() => {
              setEditingPage(null);
              setIsNewPage(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSEO;
