import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="box-border flex flex-col justify-end items-start w-full flex-1 relative z-[5] m-0 p-0">
      {/* Description Text - Top Right Fixed */}
      <div className="absolute top-0 right-[22.5px] max-md:right-5 max-sm:right-4" />
      
      {/* Main Headline - Bottom */}
      <div className="w-full pb-4 px-[22.5px] max-md:px-5 max-sm:px-4">
        {/* Border Line */}
        <div className="w-full h-px bg-white/45 mb-3" />
        
        {/* Headline — primary H1 of the homepage.
            Combines a small SEO-friendly positioning line ("Geometric &
            Minimalist Tattoo Artist — NYC") with the visual brand
            statement underneath. Google reads both as one H1. */}
        <div className="flex items-end justify-between">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="overflow-hidden m-0"
          >
            <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#F6F6F6]/70 mb-2 leading-none font-medium">
              Geometric &amp; Minimalist Tattoo Artist — NYC
            </span>
            <span className="block text-[#F6F6F6] text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase">
              Saying more with less.
            </span>
          </motion.h1>
          
          {/* Animated Arrow Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="pb-2 max-sm:pb-1"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <ArrowDown size={28} strokeWidth={1.5} className="text-[#BEBEBE] max-sm:w-5 max-sm:h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
