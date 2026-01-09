import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

// Default blog image - will be replaced with webp
const defaultBlogImage = '';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  created_at: string;
}

const BlogSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, slug, title, description, category, image_url, created_at')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

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

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="box-border flex w-full flex-col items-start gap-[50px] relative bg-background m-0 py-[80px] px-[22.5px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
        <Skeleton className="h-16 w-48" />
        <div className="w-full space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <section className="box-border flex w-full flex-col items-start gap-[50px] relative bg-background m-0 py-[80px] px-[22.5px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <ScrollReveal>
        <div className="box-border flex items-end justify-between self-stretch relative m-0 p-0 flex-wrap gap-4">
          <h2 className="box-border text-foreground text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase relative m-0 p-0">
            Article
          </h2>
          <div className="box-border text-muted-foreground text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase relative m-0 p-0">
            {blogPosts.length}
          </div>
        </div>
      </ScrollReveal>
      
      <StaggerChildren staggerDelay={0.15} className="box-border flex flex-col items-start self-stretch relative m-0 p-0 w-full">
        {blogPosts.map((post, index) => (
          <StaggerItem key={post.id} className="w-full">
            <motion.article 
              className="box-border flex flex-col items-start self-stretch relative m-0 p-0 cursor-pointer group border-t border-border"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handlePostClick(post.slug)}
            >
              <div className="box-border flex items-center justify-between w-full py-6 relative">
                {/* Left side - Number and Title */}
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="text-muted-foreground text-sm font-normal uppercase tracking-wide min-w-[30px]">
                    0{index + 1}
                  </span>
                  <h3 className="text-foreground text-lg md:text-2xl lg:text-3xl font-medium uppercase tracking-tight">
                    {post.title}
                  </h3>
                </div>
                
                {/* Right side - Category */}
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-muted-foreground text-sm md:text-base font-normal uppercase tracking-wide max-md:hidden">
                    {post.category}
                  </span>
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: hoveredId === post.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" className="text-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
              </div>
              
              {/* Expandable content on hover */}
              <AnimatePresence>
                {hoveredId === post.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden w-full"
                  >
                    <div className="flex items-start gap-6 pb-6 pt-2">
                      <div className="w-[200px] h-[150px] md:w-[280px] md:h-[200px] overflow-hidden flex-shrink-0">
                        <motion.img
                          src={post.image_url || defaultBlogImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-muted-foreground text-sm md:text-base font-normal max-w-md">
                          {post.description || ''}
                        </p>
                        <span className="text-muted-foreground text-xs md:text-sm font-normal uppercase tracking-wide">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          </StaggerItem>
        ))}
        {/* Bottom border for last item */}
        <div className="w-full border-t border-border" />
      </StaggerChildren>
    </section>
  );
};

export default BlogSection;
