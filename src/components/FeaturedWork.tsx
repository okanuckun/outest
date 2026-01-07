import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';

// Work images
import glitch1 from '@/assets/work/glitch1.png';
import DSC03538 from '@/assets/work/DSC03538.jpg';
import DSC00339 from '@/assets/work/DSC00339.jpg';
import Group_354 from '@/assets/work/Group_354.jpg';
import head1 from '@/assets/work/head1.jpg';
import Group_261 from '@/assets/work/Group_261.jpg';

const FeaturedWork: React.FC = () => {
  const works = [
    { src: glitch1, alt: "Abstract geometric tattoo" },
    { src: DSC03538, alt: "Minimalist neck tattoo" },
    { src: DSC00339, alt: "Geometric circle tattoo" },
    { src: Group_354, alt: "Fine line tattoo" },
    { src: head1, alt: "Portrait tattoo" },
    { src: Group_261, alt: "Blackwork tattoo" }
  ];

  return (
    <section className="box-border flex w-full flex-col items-start gap-[31.5px] relative bg-background m-0 px-[22.5px] py-[80px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="box-border flex flex-col items-start gap-[72px] self-stretch relative m-0">
        <ScrollReveal>
          <div className="box-border flex justify-between items-end self-stretch relative m-0 p-0 flex-wrap gap-4">
            <h2 className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-foreground text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase relative m-0 p-0">
                Curated
              </span>
            </h2>
            <div className="box-border flex flex-col items-start relative m-0 p-0">
              
            </div>
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
                    whileHover={{ scale: 1.1 }} 
                    transition={{ duration: 0.5 }} 
                  />
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
      
      <ScrollReveal delay={0.4}>
        <div className="box-border flex items-center gap-4 self-stretch relative m-0 p-0">
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
          <span className="text-foreground text-[17.6px] font-medium leading-[19.8px] tracking-[-0.027px] uppercase">
            See more work
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FeaturedWork;
