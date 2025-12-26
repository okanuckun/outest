import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="box-border flex flex-col justify-end items-start w-full h-[calc(100vh-80px)] relative z-[5] m-0 p-0">
      {/* Description Text - Top Right Fixed */}
      <div className="absolute top-0 right-[22.5px] max-md:right-5 max-sm:right-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="box-border w-[320px] max-w-[320px] pt-[17px] max-md:w-[280px] max-sm:w-[200px]"
        >
          <p className="text-[#BEBEBE] text-[15px] font-normal leading-[20px] tracking-[-0.027px] text-right max-sm:text-xs max-sm:leading-[16px]">
            Your body becomes the canvas. Each piece is crafted to flow with form, designed with intention, and built to endure. Art that ages with you, telling your story through time.
          </p>
        </motion.div>
      </div>
      
      {/* Main Headline - Bottom */}
      <div className="w-full pb-4 px-[22.5px] max-md:px-5 max-sm:px-4">
        {/* Border Line */}
        <div className="w-full h-px bg-white/45 mb-3" />
        
        {/* Headlines Container */}
        <div className="flex flex-col">
          <div className="pl-[475px] max-md:pl-0">
            <h1 className="overflow-hidden">
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="block text-[#F6F6F6] text-[clamp(32px,6vw,80px)] font-medium leading-[1] tracking-[-0.037em] uppercase"
              >
                timeless art
              </motion.span>
            </h1>
          </div>
          
          <div>
            <h1 className="overflow-hidden">
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="block text-[#F6F6F6] text-[clamp(32px,6vw,80px)] font-medium leading-[1] tracking-[-0.037em] uppercase"
              >
                Lasting impact
              </motion.span>
            </h1>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-end mt-3"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-[#BEBEBE] text-base font-normal tracking-[-0.01em] uppercase max-md:text-sm max-sm:text-xs"
          >
            Scroll to explore
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
