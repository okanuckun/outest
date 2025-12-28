import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';

import blogImage1 from '@/assets/work/Group_354.jpg';
import blogImage2 from '@/assets/work/head1.jpg';
import blogImage3 from '@/assets/work/Group_261.jpg';

const BlogSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "Sleeve Tattoo Ideas",
      description: "Inspiration, Styles, and Aftercare Tips",
      category: "Inspiration",
      date: "July 29, 2025",
      image: blogImage1
    },
    {
      id: 2,
      title: "Forearm Tattoos",
      description: "A Perfect Canvas for Realism",
      category: "Inspiration",
      date: "May 18, 2025",
      image: blogImage2
    },
    {
      id: 3,
      title: "Skull Tattoos",
      description: "Symbolism, Design Ideas, and Realism Style Guide",
      category: "Tattoo Styles",
      date: "May 17, 2025",
      image: blogImage3
    }
  ];

  return (
    <section className="box-border flex w-full flex-col items-start gap-[50px] relative bg-white m-0 py-[80px] px-[22.5px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <ScrollReveal>
        <div className="box-border flex items-end justify-between self-stretch relative m-0 p-0 flex-wrap gap-4">
          <h2 className="box-border text-[#323232] text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase relative m-0 p-0">
            Article
          </h2>
          <div className="box-border text-[#BEBEBE] text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase relative m-0 p-0">
            3
          </div>
        </div>
      </ScrollReveal>
      
      <StaggerChildren staggerDelay={0.15} className="box-border flex flex-col items-start self-stretch relative m-0 p-0 w-full">
        {blogPosts.map((post, index) => (
          <StaggerItem key={post.id} className="w-full">
            <motion.article 
              className="box-border flex flex-col items-start self-stretch relative m-0 p-0 cursor-pointer group border-t border-[#EAEAEA]"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="box-border flex items-center justify-between w-full py-6 relative">
                {/* Left side - Number and Title */}
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="text-[#888] text-sm font-normal uppercase tracking-wide min-w-[30px]">
                    0{index + 1}
                  </span>
                  <h3 className="text-[#323232] text-lg md:text-2xl lg:text-3xl font-medium uppercase tracking-tight">
                    {post.title}
                  </h3>
                </div>
                
                {/* Right side - Category */}
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-[#888] text-sm md:text-base font-normal uppercase tracking-wide max-md:hidden">
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
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-[#666] text-sm md:text-base font-normal max-w-md">
                          {post.description}
                        </p>
                        <span className="text-[#888] text-xs md:text-sm font-normal uppercase tracking-wide">
                          {post.date}
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
        <div className="w-full border-t border-[#EAEAEA]" />
      </StaggerChildren>
    </section>
  );
};

export default BlogSection;
