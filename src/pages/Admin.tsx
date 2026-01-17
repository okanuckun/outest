import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import RichTextEditor from '@/components/ui/rich-text-editor';
import GuestSpotsManager from '@/components/admin/GuestSpotsManager';
import PortfolioManager from '@/components/admin/PortfolioManager';
import EmailTemplatesManager from '@/components/admin/EmailTemplatesManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';
import BookingsManager from '@/components/admin/BookingsManager';
import { 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Upload,
  Camera,
  FileText,
  FolderOpen,
  AlertCircle,
  Search,
  ChevronDown,
  Globe,
  Mail,
  Settings,
  Inbox
} from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  category: string | null;
  tags: string[] | null;
  image_url: string | null;
  published: boolean | null;
  author_name: string | null;
  created_at: string;
  updated_at: string;
}

interface BlogSEO {
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  og_title: string;
  og_description: string;
  og_image: string;
  is_indexable: boolean;
  canonical_url: string;
}

interface Project {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  category: string | null;
  year: string | null;
  location: string | null;
  images: string[] | null;
  cover_image: string | null;
  instagram_url: string | null;
  published: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

const Admin: React.FC = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewBlog, setIsNewBlog] = useState(false);
  const [isNewProject, setIsNewProject] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [blogSEO, setBlogSEO] = useState<BlogSEO>({
    meta_title: '',
    meta_description: '',
    focus_keyword: '',
    og_title: '',
    og_description: '',
    og_image: '',
    is_indexable: true,
    canonical_url: '',
  });
  const [seoOpen, setSeoOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchBlogPosts();
      fetchProjects();
    }
  }, [user, isAdmin]);

  const fetchBlogPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBlogPosts(data);
    }
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setProjects(data);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('content-images')
      .upload(filePath, file);

    setUploading(false);

    if (uploadError) {
      toast({
        title: 'Upload Error',
        description: uploadError.message,
        variant: 'destructive',
      });
      return null;
    }

    const { data } = supabase.storage
      .from('content-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'blog' | 'project' | 'project-cover'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (!url) return;

    if (type === 'blog' && editingBlog) {
      setEditingBlog({ ...editingBlog, image_url: url });
    } else if (type === 'project' && editingProject) {
      const currentImages = editingProject.images || [];
      setEditingProject({ ...editingProject, images: [...currentImages, url] });
    } else if (type === 'project-cover' && editingProject) {
      setEditingProject({ ...editingProject, cover_image: url });
    }
  };

  // Load SEO data when editing a blog
  const loadBlogSEO = async (slug: string) => {
    const route = `/blog/${slug}`;
    const { data } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('route', route)
      .maybeSingle();

    if (data) {
      setBlogSEO({
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        focus_keyword: data.focus_keyword || '',
        og_title: data.og_title || '',
        og_description: data.og_description || '',
        og_image: data.og_image || '',
        is_indexable: data.is_indexable ?? true,
        canonical_url: data.canonical_url || '',
      });
    } else {
      setBlogSEO({
        meta_title: '',
        meta_description: '',
        focus_keyword: '',
        og_title: '',
        og_description: '',
        og_image: '',
        is_indexable: true,
        canonical_url: '',
      });
    }
  };

  const saveBlogSEO = async (blogSlug: string, blogTitle: string, blogDescription: string | null, blogImage: string | null) => {
    const route = `/blog/${blogSlug}`;
    
    // Check if SEO page exists
    const { data: existingPage } = await supabase
      .from('seo_pages')
      .select('id')
      .eq('route', route)
      .maybeSingle();

    const seoData = {
      route,
      template_type: 'blog_post',
      meta_title: blogSEO.meta_title || blogTitle,
      meta_description: blogSEO.meta_description || blogDescription || '',
      focus_keyword: blogSEO.focus_keyword || null,
      og_title: blogSEO.og_title || blogTitle,
      og_description: blogSEO.og_description || blogDescription || '',
      og_image: blogSEO.og_image || blogImage || null,
      is_indexable: blogSEO.is_indexable,
      canonical_url: blogSEO.canonical_url || null,
      canonical_mode: blogSEO.canonical_url ? 'manual' : 'auto',
      updated_by: user?.id,
    };

    if (existingPage) {
      await supabase
        .from('seo_pages')
        .update(seoData)
        .eq('id', existingPage.id);
    } else {
      await supabase
        .from('seo_pages')
        .insert([seoData]);
    }
  };

  const saveBlogPost = async () => {
    if (!editingBlog) return;

    const slug = editingBlog.slug || editingBlog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const postData = {
      ...editingBlog,
      slug,
    };

    if (isNewBlog) {
      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        // Save SEO data
        await saveBlogSEO(slug, editingBlog.title, editingBlog.description, editingBlog.image_url);
        toast({ title: 'Blog post created' });
        fetchBlogPosts();
      }
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', editingBlog.id);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        // Save SEO data
        await saveBlogSEO(slug, editingBlog.title, editingBlog.description, editingBlog.image_url);
        toast({ title: 'Blog post updated' });
        fetchBlogPosts();
      }
    }

    setEditingBlog(null);
    setIsNewBlog(false);
    setSeoOpen(false);
  };

  const deleteBlogPost = async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Blog post deleted' });
      fetchBlogPosts();
    }
  };

  const saveProject = async () => {
    if (!editingProject) return;

    // Auto-generate slug if not provided
    const slug = editingProject.slug || editingProject.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const projectData = {
      ...editingProject,
      slug,
    };

    if (isNewProject) {
      const { error } = await supabase
        .from('projects')
        .insert([projectData]);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Project created' });
        fetchProjects();
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Project updated' });
        fetchProjects();
      }
    }

    setEditingProject(null);
    setIsNewProject(false);
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Project deleted' });
      fetchProjects();
    }
  };

  const removeProjectImage = (index: number) => {
    if (!editingProject) return;
    const newImages = [...(editingProject.images || [])];
    newImages.splice(index, 1);
    setEditingProject({ ...editingProject, images: newImages });
  };

  if (loading) {
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
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-medium text-foreground">Admin Panel</h1>
            <Link to="/admin/seo">
              <Button variant="outline" size="sm" className="gap-2">
                <Search size={16} />
                SEO Manager
              </Button>
            </Link>
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="bookings" className="gap-2">
              <Inbox size={16} />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="blogs" className="gap-2">
              <FileText size={16} />
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderOpen size={16} />
              Projects
            </TabsTrigger>
            <TabsTrigger value="guest-spots" className="gap-2">
              <Globe size={16} />
              Guest Spots
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="gap-2">
              <Camera size={16} />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="emails" className="gap-2">
              <Mail size={16} />
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingsManager />
          </TabsContent>

          <TabsContent value="blogs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-foreground">Blog Posts</h2>
              <Button
                onClick={() => {
                  setEditingBlog({
                    id: '',
                    slug: '',
                    title: '',
                    description: '',
                    content: '',
                    category: '',
                    tags: [],
                    image_url: '',
                    published: false,
                    author_name: 'Okan Uckun',
                    created_at: '',
                    updated_at: '',
                  });
                  setIsNewBlog(true);
                }}
              >
                <Plus size={16} className="mr-2" />
                New Blog
              </Button>
            </div>

            {editingBlog && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-foreground">
                    {isNewBlog ? 'New Blog Post' : 'Edit Blog'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingBlog(null);
                      setIsNewBlog(false);
                    }}
                  >
                    <X size={16} />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={editingBlog.title}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <Input
                      value={editingBlog.slug}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, slug: e.target.value })
                      }
                      placeholder="auto-generated"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={editingBlog.category || ''}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, category: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma separated)</Label>
                    <Input
                      value={editingBlog.tags?.join(', ') || ''}
                      onChange={(e) =>
                        setEditingBlog({
                          ...editingBlog,
                          tags: e.target.value.split(',').map((t) => t.trim()),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingBlog.description || ''}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, description: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <RichTextEditor
                    content={editingBlog.content || ''}
                    onChange={(content) =>
                      setEditingBlog({ ...editingBlog, content })
                    }
                    placeholder="Write your article content here. Use H1, H2, H3 for headings..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex items-center gap-4">
                    {editingBlog.image_url && (
                      <img
                        src={editingBlog.image_url}
                        alt="Preview"
                        className="w-24 h-24 object-cover"
                      />
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'blog')}
                      />
                      <div className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-accent transition-colors">
                        <Upload size={16} />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                      </div>
                    </label>
                  </div>
                </div>

                {/* SEO Section */}
                <Collapsible open={seoOpen} onOpenChange={setSeoOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <Globe size={16} />
                        SEO Settings
                      </span>
                      <ChevronDown size={16} className={`transition-transform ${seoOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4 border border-border p-4 rounded-md">
                    {/* SERP Preview */}
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-xs text-muted-foreground mb-2">Google Preview</p>
                      <div className="space-y-1">
                        <p className="text-primary text-lg truncate">
                          {blogSEO.meta_title || editingBlog.title || 'Page Title'}
                        </p>
                        <p className="text-sm text-green-600 truncate">
                          example.com/blog/{editingBlog.slug || 'slug'}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {blogSEO.meta_description || editingBlog.description || 'Meta description will appear here...'}
                        </p>
                      </div>
                      <div className="mt-2 flex gap-2 text-xs">
                        <span className={`${(blogSEO.meta_title || editingBlog.title || '').length > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          Title: {(blogSEO.meta_title || editingBlog.title || '').length}/60
                        </span>
                        <span className={`${(blogSEO.meta_description || editingBlog.description || '').length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          Description: {(blogSEO.meta_description || editingBlog.description || '').length}/160
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Meta Title</Label>
                        <Input
                          value={blogSEO.meta_title}
                          onChange={(e) => setBlogSEO({ ...blogSEO, meta_title: e.target.value })}
                          placeholder={editingBlog.title}
                          maxLength={70}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Focus Keyword</Label>
                        <Input
                          value={blogSEO.focus_keyword}
                          onChange={(e) => setBlogSEO({ ...blogSEO, focus_keyword: e.target.value })}
                          placeholder="Target keyword"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Textarea
                        value={blogSEO.meta_description}
                        onChange={(e) => setBlogSEO({ ...blogSEO, meta_description: e.target.value })}
                        placeholder={editingBlog.description || ''}
                        rows={2}
                        maxLength={170}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>OG Title (Social Media)</Label>
                        <Input
                          value={blogSEO.og_title}
                          onChange={(e) => setBlogSEO({ ...blogSEO, og_title: e.target.value })}
                          placeholder={editingBlog.title}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>OG Image URL</Label>
                        <Input
                          value={blogSEO.og_image}
                          onChange={(e) => setBlogSEO({ ...blogSEO, og_image: e.target.value })}
                          placeholder={editingBlog.image_url || 'https://...'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>OG Description</Label>
                      <Textarea
                        value={blogSEO.og_description}
                        onChange={(e) => setBlogSEO({ ...blogSEO, og_description: e.target.value })}
                        placeholder={editingBlog.description || ''}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Canonical URL (Optional)</Label>
                      <Input
                        value={blogSEO.canonical_url}
                        onChange={(e) => setBlogSEO({ ...blogSEO, canonical_url: e.target.value })}
                        placeholder="Leave empty for auto"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch
                        checked={blogSEO.is_indexable}
                        onCheckedChange={(checked) => setBlogSEO({ ...blogSEO, is_indexable: checked })}
                      />
                      <Label>Allow search engine indexing</Label>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingBlog.published || false}
                    onCheckedChange={(checked) =>
                      setEditingBlog({ ...editingBlog, published: checked })
                    }
                  />
                  <Label>Publish</Label>
                </div>

                <Button onClick={saveBlogPost}>
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
              </motion.div>
            )}

            <div className="space-y-2">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-border"
                >
                  <div className="flex items-center gap-4">
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-16 h-16 object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-foreground">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {post.category} • {post.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingBlog(post);
                        setIsNewBlog(false);
                        if (post.slug) {
                          loadBlogSEO(post.slug);
                        }
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBlogPost(post.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}

              {blogPosts.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No blog posts yet.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-foreground">Projects</h2>
              <Button
                onClick={() => {
                  setEditingProject({
                    id: '',
                    title: '',
                    slug: '',
                    description: '',
                    category: '',
                    year: new Date().getFullYear().toString(),
                    location: '',
                    images: [],
                    cover_image: null,
                    instagram_url: null,
                    published: false,
                    display_order: projects.length,
                    created_at: '',
                    updated_at: '',
                  });
                  setIsNewProject(true);
                }}
              >
                <Plus size={16} className="mr-2" />
                New Project
              </Button>
            </div>

            {editingProject && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-foreground">
                    {isNewProject ? 'New Project' : 'Edit Project'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingProject(null);
                      setIsNewProject(false);
                    }}
                  >
                    <X size={16} />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <Input
                      value={editingProject.slug || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, slug: e.target.value })
                      }
                      placeholder="auto-generated-from-title"
                    />
                    <p className="text-xs text-muted-foreground">
                      URL: /project/{editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'slug'}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={editingProject.category || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, category: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      value={editingProject.year || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, year: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={editingProject.location || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, location: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <RichTextEditor
                    content={editingProject.description || ''}
                    onChange={(content) =>
                      setEditingProject({ ...editingProject, description: content })
                    }
                    placeholder="Write project description here. Use H1, H2, H3 for headings..."
                  />
                </div>

                {/* Cover Image Section */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Camera size={16} />
                    Kapak Fotoğrafı (Project Sayfasında Görünür)
                  </Label>
                  <div className="flex items-start gap-4">
                    {editingProject.cover_image ? (
                      <div className="relative">
                        <img
                          src={editingProject.cover_image}
                          alt="Cover"
                          className="w-48 h-32 object-cover rounded border border-border"
                        />
                        <button
                          onClick={() => setEditingProject({ ...editingProject, cover_image: null })}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'project-cover')}
                        />
                        <div className="w-48 h-32 border border-dashed border-border flex flex-col items-center justify-center hover:bg-accent transition-colors rounded gap-2">
                          <Upload size={24} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Kapak Yükle</span>
                        </div>
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Bu görsel Project sayfasındaki arka plan olarak kullanılır.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={editingProject.display_order || 0}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Images</Label>
                  <div className="flex flex-wrap gap-2">
                    {editingProject.images?.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`Project ${index + 1}`}
                          className="w-24 h-24 object-cover"
                        />
                        <button
                          onClick={() => removeProjectImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'project')}
                      />
                      <div className="w-24 h-24 border border-dashed border-border flex items-center justify-center hover:bg-accent transition-colors">
                        <Plus size={24} className="text-muted-foreground" />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={editingProject.published || false}
                    onCheckedChange={(checked) =>
                      setEditingProject({ ...editingProject, published: checked })
                    }
                  />
                  <Label>Publish</Label>
                </div>

                <Button onClick={saveProject}>
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
              </motion.div>
            )}

            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border border-border"
                >
                  <div className="flex items-center gap-4">
                    {project.images?.[0] && (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-16 h-16 object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-foreground">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {project.category} • {project.year} • {project.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingProject(project);
                        setIsNewProject(false);
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No projects yet.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="guest-spots">
            <GuestSpotsManager />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioManager />
          </TabsContent>

          <TabsContent value="emails">
            <EmailTemplatesManager />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettingsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
