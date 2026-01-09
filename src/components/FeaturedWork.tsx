import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface FeaturedImage {
  id: string;
  url: string;
  alt: string;
}

const FeaturedWork: React.FC = () => {
  const [works, setWorks] = useState<FeaturedImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedImages = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_images')
          .select('id, storage_path')
          .eq('is_featured', true)
          .eq('is_visible', true)
          .order('display_order', { ascending: true })
          .limit(6);

        if (error) throw error;

        const images: FeaturedImage[] = (data || []).map((img, index) => ({
          id: img.id,
          url: supabase.storage.from('portfolio').getPublicUrl(img.storage_path).data.publicUrl,
          alt: `Featured tattoo work ${index + 1}`,
        }));

        setWorks(images);
      } catch (error) {
        console.error('Error fetching featured images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedImages();
  }, []);

  // Don't render the section if no featured images
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
            <StaggerChildren staggerDelay={0.1} className="box-border grid grid-cols-6 gap-3 self-stretch relative m-0 p-0 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
              {works.map((work) => (
                <StaggerItem key={work.id} className="box-border flex flex-col items-start relative m-0 p-0">
                  <Link to="/work" className="w-full h-full">
                    <motion.article 
                      whileHover={{ scale: 1.02 }} 
                      transition={{ duration: 0.3 }} 
                      className="box-border flex flex-col justify-center items-start self-stretch aspect-[1/1.8] relative m-0 p-0 overflow-hidden cursor-pointer"
                    >
                      <motion.img 
                        src={work.url} 
                        alt={work.alt} 
                        className="box-border w-full h-full relative object-cover m-0 p-0" 
                        loading="lazy"
                        decoding="async"
                        whileHover={{ scale: 1.1 }} 
                        transition={{ duration: 0.5 }} 
                      />
                    </motion.article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}
        </div>
        
        <ScrollReveal delay={0.4} className="w-full">
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