import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, Share2, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import DOMPurify from 'dompurify';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  category: string | null;
  tags: string[] | null;
  image_url: string | null;
  author_name: string | null;
  created_at: string;
  updated_at: string;
}

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'quote';
  text: string;
  author?: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // Fetch the main post
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        if (postError) throw postError;
        setPost(postData);

        // Fetch related posts (same category or just recent posts)
        if (postData) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('published', true)
            .neq('id', postData.id)
            .order('created_at', { ascending: false })
            .limit(2);

          if (!relatedError && relatedData) {
            setRelatedPosts(relatedData);
          }
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Check if content is HTML
  const isHtmlContent = (content: string | null): boolean => {
    if (!content) return false;
    // Check if it starts with HTML tags or contains common HTML patterns
    return content.trim().startsWith('<') || /<[a-z][\s\S]*>/i.test(content);
  };

  // Parse content - supports both JSON blocks and plain text
  const parseContent = (content: string | null): ContentBlock[] => {
    if (!content) return [];
    
    // If it's HTML, don't parse as blocks - we'll render it directly
    if (isHtmlContent(content)) {
      return [];
    }
    
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed as ContentBlock[];
      }
    } catch {
      // If not JSON, treat as plain paragraphs
      return content.split('\n\n').filter(Boolean).map(text => ({
        type: 'paragraph' as const,
        text: text.trim()
      }));
    }
    
    return [];
  };

  // Sanitize HTML content
  const sanitizeHtml = (content: string | null): string => {
    if (!content) return '';
    return DOMPurify.sanitize(content, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
    });
  };

  // Estimate read time
  const calculateReadTime = (content: string | null): number => {
    if (!content) return 1;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation variant="dark" />
        </div>
        
        {/* Hero Skeleton */}
        <div className="relative h-[70vh] min-h-[500px] bg-muted">
          <div className="absolute inset-0 flex flex-col justify-end px-[22.5px] pb-16 max-sm:px-4">
            <div className="max-w-4xl">
              <Skeleton className="h-4 w-48 mb-6" />
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-12 w-full max-w-2xl mb-2" />
              <Skeleton className="h-12 w-3/4 max-w-xl" />
            </div>
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="px-[22.5px] max-sm:px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-8 w-1/2 mt-8" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const contentBlocks = parseContent(post.content);
  const readTime = calculateReadTime(post.content);
  const formattedDate = format(new Date(post.created_at), 'MMMM d, yyyy');
  const dateISO = format(new Date(post.created_at), 'yyyy-MM-dd');
  const authorName = post.author_name || 'Okan Uckun';
  const tags = post.tags || [];

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image_url,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: 'Tattoo Artist'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Okan Uckun Tattoo',
      url: 'https://www.okanuckun.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.okanuckun.com/og-image.jpg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.okanuckun.com/blog/${post.slug}`
    },
    articleSection: post.category,
    keywords: tags.join(', '),
    wordCount: contentBlocks.reduce((acc, block) => {
      if (block.type === 'paragraph' || block.type === 'quote') {
        return acc + (block.text?.split(' ').length || 0);
      }
      return acc;
    }, 0)
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description || '',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Okan Uckun`}
        description={post.description || ''}
        keywords={tags.join(', ')}
        ogTitle={post.title}
        ogDescription={post.description || ''}
        ogImage={post.image_url || undefined}
        ogType="article"
        canonical={`/blog/${post.slug}`}
        jsonLd={jsonLd}
      />

      <article className="min-h-screen bg-background text-foreground" itemScope itemType="https://schema.org/BlogPosting">
        {/* Hidden structured data */}
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="datePublished" content={dateISO} />
        <meta itemProp="author" content={authorName} />
        
        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation variant="dark" />
        </div>

        {/* Hero Section */}
        <header className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
                itemProp="image"
              />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-[22.5px] pb-16 max-sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl"
            >
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/60 text-[12px] tracking-wide mb-6">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight size={14} />
                <span className="text-white/80">{post.category || 'Article'}</span>
              </nav>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {post.category && (
                  <span className="bg-white text-black px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
                    {post.category}
                  </span>
                )}
                <div className="flex items-center gap-4 text-white/70 text-[12px]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <time dateTime={dateISO} itemProp="datePublished">{formattedDate}</time>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {readTime} min read
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight tracking-tight"
                itemProp="name"
              >
                {post.title}
              </h1>
            </motion.div>
          </div>
        </header>

        {/* Article Content */}
        <div className="px-[22.5px] max-sm:px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            {/* Author & Share */}
            <ScrollReveal>
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">{authorName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-[14px]" itemProp="author">{authorName}</p>
                    <p className="text-muted-foreground text-[12px]">Tattoo Artist</p>
                  </div>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Share article"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </ScrollReveal>

            {/* Content - HTML or Blocks */}
            <div className="prose prose-lg max-w-none" itemProp="articleBody">
              {isHtmlContent(post.content) ? (
                <ScrollReveal>
                  <div 
                    className="blog-content text-[16px] md:text-[17px] leading-relaxed text-foreground/90"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                  />
                </ScrollReveal>
              ) : (
                contentBlocks.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return (
                      <ScrollReveal key={index} delay={index * 0.05}>
                        <p className="text-[16px] md:text-[17px] leading-relaxed text-foreground/90 mb-6">
                          {block.text}
                        </p>
                      </ScrollReveal>
                    );
                  }
                  if (block.type === 'heading') {
                    return (
                      <ScrollReveal key={index} delay={index * 0.05}>
                        <h2 className="text-2xl md:text-3xl font-medium mt-12 mb-6 tracking-tight">
                          {block.text}
                        </h2>
                      </ScrollReveal>
                    );
                  }
                  if (block.type === 'quote') {
                    return (
                      <ScrollReveal key={index} delay={index * 0.05}>
                        <blockquote className="border-l-2 border-foreground pl-6 my-10">
                          <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-3">
                            "{block.text}"
                          </p>
                          {block.author && (
                            <cite className="text-[13px] text-muted-foreground not-italic">
                              — {block.author}
                            </cite>
                          )}
                        </blockquote>
                      </ScrollReveal>
                    );
                  }
                  return null;
                })
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <ScrollReveal>
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag size={16} className="text-muted-foreground" />
                    {tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-muted text-[12px] font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="px-[22.5px] max-sm:px-4 py-16 bg-muted/30" aria-label="Related articles">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-medium mb-12 tracking-tight">
                  Related Articles
                </h2>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <ScrollReveal key={relatedPost.id} delay={index * 0.1}>
                    <Link 
                      to={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <motion.article
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-6"
                      >
                        <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden flex-shrink-0">
                          {relatedPost.image_url ? (
                            <motion.img
                              src={relatedPost.image_url}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">
                            {relatedPost.category || 'Article'} • {calculateReadTime(relatedPost.content)} min
                          </span>
                          <h3 className="text-lg md:text-xl font-medium leading-snug group-hover:opacity-70 transition-opacity">
                            {relatedPost.title}
                          </h3>
                        </div>
                      </motion.article>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Blog CTA */}
        <section className="px-[22.5px] max-sm:px-4 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal>
              <Link 
                to="/blog"
                className="inline-flex items-center gap-3 text-[14px] font-medium tracking-wide hover:gap-4 transition-all group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to All Articles
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </article>
    </>
  );
};

export default BlogPost;
