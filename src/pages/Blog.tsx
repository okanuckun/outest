import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

// Default blog image - will be replaced with webp
const defaultBlogImage = '';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Okan Uckun Tattoo Blog',
  description: 'Articles about tattoo art, styles, symbolism, and inspiration from NYC tattoo artist Okan Uckun.',
  url: 'https://okanuckun.com/blog',
  author: {
    '@type': 'Person',
    name: 'Okan Uckun'
  }
};

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchParams] = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const articleRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from database
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, slug, title, category, description, image_url, created_at')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle post navigation from homepage
  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId && blogPosts.length > 0) {
      setTimeout(() => {
        const targetArticle = articleRefs.current[postId];
        if (targetArticle) {
          targetArticle.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [searchParams, blogPosts]);

  useEffect(() => {
    if (blogPosts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [blogPosts.length]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <SEOHead
          title="Blog | Okan Uckun Tattoo Articles & Inspiration"
          description="Read articles about tattoo art, styles, symbolism, and inspiration from NYC tattoo artist Okan Uckun. Expert tips on placement, designs, aftercare, and tattoo culture."
          keywords="tattoo blog, tattoo articles, tattoo inspiration"
          ogTitle="Tattoo Blog | Okan Uckun NYC"
          ogDescription="Articles about tattoo art, styles, and inspiration from NYC tattoo artist Okan Uckun. Tips on placement, designs, and tattoo culture."
          ogImage="https://outest.lovable.app/og-image.jpg"
          canonical="https://outest.lovable.app/blog"
          jsonLd={jsonLd}
        />
        <div className="min-h-screen bg-background text-foreground">
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navigation />
          </div>
          <div className="h-screen flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <>
        <SEOHead
          title="Blog | Okan Uckun Tattoo Articles & Inspiration"
          description="Read articles about tattoo art, styles, symbolism, and inspiration from NYC tattoo artist Okan Uckun. Expert tips on placement, designs, aftercare, and tattoo culture."
          keywords="tattoo blog, tattoo articles, tattoo inspiration"
          ogTitle="Tattoo Blog | Okan Uckun NYC"
          ogDescription="Articles about tattoo art, styles, and inspiration from NYC tattoo artist Okan Uckun. Tips on placement, designs, and tattoo culture."
          ogImage="https://outest.lovable.app/og-image.jpg"
          canonical="https://outest.lovable.app/blog"
          jsonLd={jsonLd}
        />
        <div className="min-h-screen bg-background text-foreground">
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navigation />
          </div>
          <div className="h-screen flex items-center justify-center">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Blog | Okan Uckun Tattoo Articles & Inspiration"
        description="Read articles about tattoo art, styles, symbolism, and inspiration from NYC tattoo artist Okan Uckun. Expert tips on placement, designs, aftercare, and tattoo culture."
        keywords="tattoo blog, tattoo articles, tattoo inspiration, tattoo styles, forearm tattoo, sleeve tattoo, skull tattoo"
        ogTitle="Tattoo Blog | Okan Uckun NYC"
        ogDescription="Articles about tattoo art, styles, and inspiration from NYC tattoo artist Okan Uckun. Tips on placement, designs, and tattoo culture."
        ogImage="https://outest.lovable.app/og-image.jpg"
        canonical="https://outest.lovable.app/blog"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation />
      </div>

      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images - Crossfade */}
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={false}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
            style={{ zIndex: currentSlide === index ? 1 : 0 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image_url || defaultBlogImage})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-[22.5px] pb-16 max-sm:px-4">
          {/* Featured Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-5 md:p-8 max-w-2xl"
            >
              {/* Category & Date */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-background text-foreground px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase">
                  {blogPosts[currentSlide]?.category || 'Article'}
                </span>
                <span className="text-primary-foreground/60 text-[10px] tracking-wide">
                  {formatDate(blogPosts[currentSlide]?.created_at).toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-white mb-4 leading-tight tracking-tight">
                {blogPosts[currentSlide].title}
              </h2>

              {/* Description */}
              <p className="text-white/70 text-[13px] font-normal leading-relaxed mb-5 max-w-xl">
                {blogPosts[currentSlide]?.description || ''}
              </p>

              {/* Read More Button */}
              <Link 
                to={`/blog/${blogPosts[currentSlide]?.slug}`}
                className="group flex items-center gap-2 text-white text-[12px] font-medium tracking-wide hover:gap-3 transition-all"
              >
                READ ARTICLE
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-16 right-[22.5px] z-20 flex gap-3 max-sm:right-4">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-12' : 'bg-white/30 w-6 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="bg-background text-foreground py-20 px-[22.5px] max-sm:px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-normal leading-none tracking-tight mb-12">
            All Articles
          </h2>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-between items-center border-t border-b border-foreground/20 py-4 mb-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-6 md:gap-10">
              {['ALL', 'TATTOOS', 'EDUCATION', 'CULTURE'].map((tab, index) => (
                <button
                  key={tab}
                  className="flex items-center gap-2 text-[13px] font-normal tracking-wide hover:opacity-70 transition-opacity"
                >
                  <span className={`w-4 h-4 rounded-full border border-foreground flex items-center justify-center ${index === 0 ? 'bg-foreground' : ''}`}>
                    {index === 0 && <span className="w-2 h-2 rounded-full bg-foreground" />}
                  </span>
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-[13px] font-normal mt-4 md:mt-0">
              <span className="text-muted-foreground">SORT BY:</span>
              <button className="flex items-center gap-1 font-medium">
                LATEST
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-0.5">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Results Count */}
        <ScrollReveal delay={0.15}>
          <p className="text-[12px] font-normal text-muted-foreground tracking-wide mb-8">
            SHOWING <span className="text-foreground font-medium">{blogPosts.length}</span> OF <span className="text-foreground font-medium">{blogPosts.length}</span> RESULTS
          </p>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <Link to={`/blog/${post.slug}`}>
                <motion.article 
                  ref={(el) => { articleRefs.current[post.id] = el; }}
                  className="group cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden mb-4 aspect-[4/5]">
                    <motion.img
                      src={post.image_url || defaultBlogImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-[11px] font-normal tracking-wide text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <span className="uppercase">{post.category || 'Article'}</span>
                      <span>•</span>
                      <span className="uppercase">{formatDate(post.created_at)}</span>
                    </div>
                    <span>5 MIN READ</span>
                  </div>
                  {/* Title */}
                  <h3 className="text-[16px] md:text-[18px] font-normal leading-snug group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </div>
    </>
  );
};

export default Blog;
