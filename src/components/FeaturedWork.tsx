import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface FeaturedImage {
  id: string;
  url: string;
  alt: string;
}

const FeaturedWork: React.FC = () => {
  const { data: works = [], isLoading: loading } = useQuery({
    queryKey: ['featured-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_images')
        .select('id, storage_path')
        .eq('is_featured', true)
        .eq('is_visible', true)
        .order('display_order', { ascending: true })
        .limit(6);

      if (error) throw error;

      const images: FeaturedImage[] = (data || []).map((img, index) => {
        const baseUrl = supabase.storage.from('portfolio').getPublicUrl(img.storage_path).data.publicUrl;
        const optimizedUrl = `${baseUrl}?width=600&quality=80`;
        
        return {
          id: img.id,
          url: optimizedUrl,
          alt: `Featured tattoo work ${index + 1}`,
        };
      });

      return images;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes cache
  });

  if (!loading && works.length === 0) {
    return null;
  }

  return (
    <section className="box-border w-full relative bg-background m-0 px-[23px] py-[80px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="max-w-[1875px] mx-auto flex flex-col gap-[31.5px]">
        <div className="box-border flex flex-col items-start gap-[72px] self-stretch relative m-0">
          <ScrollReveal>
            <div className="box-border flex justify-between items-end self-stretch relative m-0 p-0 flex-wrap gap-4">
              <h2 className="box-border flex flex-col items-start relative m-0 p-0">
                <span className="box-border text-foreground text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase relative m-0 p-0">
                  Curated
                </span>
              </h2>
            </div>
          </ScrollReveal>
          
          {loading ? (
            <div className="box-border grid grid-cols-6 gap-3 self-stretch relative m-0 p-0 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="aspect-[1/1.8] rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="box-border grid grid-cols-6 gap-3 self-stretch relative m-0 p-0 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {works.map((work, index) => (
              <div key={work.id} className="box-border flex flex-col items-start relative m-0 p-0">
                <Link to="/work" className="w-full h-full">
                  <article 
                    className="box-border flex flex-col justify-center items-start self-stretch aspect-[1/1.8] relative m-0 p-0 overflow-hidden cursor-pointer group"
                  >
                    <img 
                      src={work.url} 
                      alt={work.alt} 
                      className="box-border w-full h-full relative object-cover m-0 p-0 transition-transform duration-300 group-hover:scale-105" 
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </article>
                </Link>
              </div>
            ))}
            </div>
          )}
        </div>
        
        <ScrollReveal delay={0.2} className="w-full">
          <div className="w-full flex justify-end">
            <div className="lg:w-[200px] shrink-0 flex lg:justify-start justify-end">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/work" 
                  className="inline-flex items-center justify-center w-12 h-12 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <ArrowUpRight size={24} strokeWidth={1.5} />
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedWork;