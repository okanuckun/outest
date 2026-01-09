import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';

// Work images - WebP versions will be added
// Placeholder until images are uploaded
const works = [
  { src: "", alt: "Abstract geometric tattoo", name: "glitch1" },
  { src: "", alt: "Minimalist neck tattoo", name: "DSC03538" },
  { src: "", alt: "Geometric circle tattoo", name: "DSC00339" },
  { src: "", alt: "Fine line tattoo", name: "Group_354" },
  { src: "", alt: "Portrait tattoo", name: "head1" },
  { src: "", alt: "Blackwork tattoo", name: "Group_261" }
];

const FeaturedWork: React.FC = () => {

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
          
          <StaggerChildren staggerDelay={0.1} className="box-border grid grid-cols-6 gap-3 self-stretch relative m-0 p-0 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {works.map((work, index) => (
              <StaggerItem key={index} className="box-border flex flex-col items-start relative m-0 p-0">
                <Link to="/work" className="w-full h-full">
                  <motion.article 
                    whileHover={{ scale: 1.02 }} 
                    transition={{ duration: 0.3 }} 
                    className="box-border flex flex-col justify-center items-start self-stretch aspect-[1/1.8] relative m-0 p-0 overflow-hidden cursor-pointer"
                  >
                    <motion.img 
                      src={work.src} 
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
