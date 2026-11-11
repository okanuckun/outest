import React from 'react';
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
import { addMissingAlts } from '@/lib/addMissingAlts';
import DOMPurify from 'dompurify';
import { GuideSection, GuideLead, GuideTOC, BottomBar, inlineLink } from '@/components/style-guide/GuideLayout';
import GuideFigure from '@/components/style-guide/GuideFigure';
import { personNode, studioNode, imageObject, PERSON_ID } from '@/components/style-guide/guideSchema';
import { splitArticle, wordCount, BLOG_COVERS, articlePhotoRows, ARTICLE_STYLE_LINK } from '@/components/style-guide/blogArticle';
import { photos, photoUrl } from '@/data/portfolio';

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
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
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

  // Optimized local cover when available (originals are 0.7–1.1 MB)
  const cover = BLOG_COVERS[post.slug];
  const coverSrc = cover?.src || post.image_url || undefined;
  const coverAbs = coverSrc ? (coverSrc.startsWith('http') ? coverSrc : `https://okanuckun.com${coverSrc}`) : undefined;

  // Split HTML content into sections for the heading-left / text-right layout
  const cleanHtml = isHtmlContent(post.content) ? addMissingAlts(sanitizeHtml(post.content), post.title) : '';
  const { intro, sections } = splitArticle(cleanHtml);
  const photoRows = articlePhotoRows(post.slug, post.category);
  const inlinePhotos = photoRows.flat();
  const styleLink = ARTICLE_STYLE_LINK[post.slug] || { to: '/work', label: 'Portfolio' };
  const words = wordCount(cleanHtml);
  // Place up to one photo row per gap between sections, spread evenly.
  const rowAfter = new Map<number, number>();
  {
    const gaps = sections.length - 1;
    const k = Math.min(photoRows.length, gaps);
    for (let j = 0; j < k; j++) rowAfter.set(Math.round(((j + 1) * sections.length) / (k + 1)) - 1, j);
  }
  const postUrl = `https://okanuckun.com/blog/${post.slug}`;

  // JSON-LD: BlogPosting tied to the same Person / studio entities used
  // across the site, plus breadcrumb and the photos shown in the article.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      personNode,
      studioNode,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://okanuckun.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://okanuckun.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        headline: post.title,
        description: post.description,
        url: postUrl,
        mainEntityOfPage: postUrl,
        datePublished: post.created_at,
        dateModified: post.updated_at,
        inLanguage: 'en',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        articleSection: post.category,
        keywords: tags.join(', '),
        wordCount: words,
        image: [
          ...(coverAbs ? [{ '@type': 'ImageObject', contentUrl: coverAbs, caption: post.title, ...(cover ? { width: cover.w, height: cover.h } : {}) }] : []),
          ...inlinePhotos.map(imageObject),
        ],
      },
    ],
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
        title={post.title.length > 48 ? post.title : `${post.title} | Okan Uckun`}
        description={post.description || ''}
        keywords={tags.join(', ')}
        ogTitle={post.title}
        ogDescription={post.description || ''}
        ogImage={coverAbs}
        ogType="article"
        canonical={`/blog/${post.slug}`}
        jsonLd={jsonLd}
      />

      <article className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a]" itemScope itemType="https://schema.org/BlogPosting">
        {/* Hidden structured data */}
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="datePublished" content={dateISO} />
        <meta itemProp="author" content={authorName} />
        
        {/* Navigation — gets a solid background once past the hero */}
        <div className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${pastHero ? 'bg-[#f5f5f5]' : ''}`}>
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
            {coverSrc ? (
              <img
                src={coverSrc}
                alt={post.title}
                {...(cover ? { width: cover.w, height: cover.h } : {})}
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

        {/* Author strip */}
        <ScrollReveal>
          <div className="px-5 md:px-7 pt-8 pb-6 flex items-center justify-between gap-6 border-b border-[#1a1a1a]/15">
            <Link to="/about" className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-[#1a1a1a] text-[#f5f5f5] flex items-center justify-center text-[15px] font-medium">
                {authorName.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-medium group-hover:opacity-60 transition-opacity" itemProp="author">{authorName}</p>
                <p className="text-[11px] text-[#777] uppercase tracking-wider">Tattoo artist · Brooklyn, NYC</p>
              </div>
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#777] hover:text-[#1a1a1a] transition-colors"
              aria-label="Share article"
            >
              <Share2 size={15} strokeWidth={1.5} />
              Share
            </button>
          </div>
        </ScrollReveal>

        <div className="pt-16 md:pt-24" itemProp="articleBody">
          {post.description && (
            <GuideLead>
              <p>{post.description}</p>
            </GuideLead>
          )}

          {sections.length > 1 && <GuideTOC items={sections.map((s) => ({ id: s.id, label: s.title }))} />}

          {cleanHtml ? (
            <>
              {intro && (
                <GuideSection>
                  <div className="blog-html" dangerouslySetInnerHTML={{ __html: intro }} />
                </GuideSection>
              )}
              {sections.map((sec, i) => (
                <React.Fragment key={sec.id}>
                  <GuideSection id={sec.id} title={sec.title}>
                    <div className="blog-html" dangerouslySetInnerHTML={{ __html: sec.html }} />
                  </GuideSection>
                  {/* photo rows spread evenly through the article */}
                  {rowAfter.has(i) && photoRows[rowAfter.get(i)!]?.length ? (
                    <GuideFigure items={photoRows[rowAfter.get(i)!]} />
                  ) : null}
                </React.Fragment>
              ))}
            </>
          ) : (
            <GuideSection>
              {contentBlocks.map((block, index) =>
                block.type === 'heading' ? (
                  <h2 key={index} className="pt-8 text-[26px] font-medium tracking-[-0.03em]">{block.text}</h2>
                ) : block.type === 'quote' ? (
                  <blockquote key={index} className="border-l-2 border-[#1a1a1a] pl-5 my-6 text-[20px] leading-snug">
                    “{block.text}”{block.author && <cite className="block mt-2 text-[12px] not-italic text-[#777]">— {block.author}</cite>}
                  </blockquote>
                ) : (
                  <p key={index}>{block.text}</p>
                )
              )}
            </GuideSection>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <GuideSection>
              <ul className="flex flex-wrap gap-2 !mt-0" aria-label="Tags">
                {tags.map((tag) => (
                  <li key={tag} className="border border-[#1a1a1a]/25 px-3 py-1 text-[11px] uppercase tracking-wider">
                    {tag}
                  </li>
                ))}
              </ul>
            </GuideSection>
          )}

          {/* About the author — experience signals for search engines and AI assistants */}
          <GuideSection id="about-the-author" title="About the author">
            <p>
              <strong>Okan Uckun</strong> is a geometric, minimalist and fine line tattoo artist based in Brooklyn, New York City. He studied architecture and modern art, has tattooed since 2009 and co-founded Monolith Studio in 2024.
            </p>
            <p>
              See more in <Link to={styleLink.to} className={inlineLink}>{styleLink.label}</Link>, the full <Link to="/work" className={inlineLink}>portfolio</Link>, or <Link to="/booking" className={inlineLink}>request an appointment</Link>.
            </p>
          </GuideSection>
        </div>

        {/* Related articles — edge to edge, like the style pages */}
        {relatedPosts.length > 0 && (
          <section className="mt-28" aria-label="Related articles">
            <p className="px-5 md:px-7 mb-4 text-[11px] text-[#777] uppercase tracking-wider">Related articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {relatedPosts.map((rp) => {
                const rc = BLOG_COVERS[rp.slug]?.src || rp.image_url;
                return (
                  <Link key={rp.id} to={`/blog/${rp.slug}`} className="group relative block overflow-hidden bg-[#0d0d0d]">
                    {rc ? (
                      <img src={rc} alt={rp.title} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]" />
                    ) : (
                      <div className="w-full aspect-[4/3]" />
                    )}
                    <div className="absolute inset-x-5 bottom-5 text-[#f1f1f1]">
                      <p className="text-[11px] uppercase tracking-wider mb-2 opacity-80">
                        {rp.category || 'Article'} • {calculateReadTime(rp.content)} min read
                      </p>
                      <h3 className="text-[22px] md:text-[28px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[560px]">{rp.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Explore styles */}
        <section className="mt-2" aria-label="Styles">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { to: '/geometric-tattoos', label: 'Geometric', n: 42 },
              { to: '/fine-line-tattoos', label: 'Fine line', n: 55 },
              { to: '/line-work-tattoos', label: 'Linework', n: 27 },
              { to: '/minimalist-tattoos', label: 'Minimalist', n: 105 },
            ].map((st) => {
              const ph = photos(st.n)[0];
              return (
                <Link key={st.to} to={st.to} className="group relative block overflow-hidden bg-[#0d0d0d]">
                  <img src={photoUrl(ph)} alt={ph.alt} width={ph.w} height={ph.h} loading="lazy" decoding="async" className="w-full aspect-square object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 bottom-4 text-[#f1f1f1] text-[18px] md:text-[22px] font-medium tracking-[-0.03em]">{st.label} tattoos</span>
                </Link>
              );
            })}
          </div>
        </section>

        <Footer />
        {/* room for the fixed bottom bar so the footer's last row stays visible */}
        <div className="h-[56px] md:h-[64px] bg-[#111]" aria-hidden />
        <BottomBar label={`Okan Uckun — ${post.category || 'Journal'}`} />
      </article>
    </>
  );
};

export default BlogPost;
