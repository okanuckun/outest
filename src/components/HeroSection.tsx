import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="box-border flex flex-col justify-end items-start w-full h-[calc(100vh-80px)] relative z-[5] m-0 p-0">
      {/* Description Text - Top Left */}
      <div className="absolute top-0 left-0 right-0 flex items-start gap-[22.5px] px-[22.5px] max-md:px-5 max-sm:px-4">
        <div className="box-border w-[452px] h-32 relative m-0 p-0 border-r-[rgba(255,255,255,0.45)] border-r border-solid max-md:w-[200px] max-sm:hidden" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="box-border flex w-[510px] max-w-[510px] flex-col items-start relative m-0 pt-[17px] max-md:w-full max-md:max-w-full"
        >
          <p className="box-border self-stretch text-[#BEBEBE] text-[17.4px] font-normal leading-[21.6px] tracking-[-0.027px] relative m-0 p-0 max-sm:text-sm max-sm:leading-[18px]">
            Your body becomes the canvas. Each piece is crafted to flow with form, designed with intention, and built to endure. Art that ages with you, telling your story through time.
          </p>
        </motion.div>
      </div>
      
      {/* Main Headline - Bottom */}
      <div className="w-full pb-8 px-[22.5px] max-md:px-5 max-sm:px-4">
        {/* Border Line */}
        <div className="w-full h-px bg-white/45 mb-6" />
        
        {/* Headlines Container */}
        <div className="flex flex-col gap-0">
          <div className="pl-[475px] max-md:pl-0">
            <h1 className="overflow-hidden">
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="block text-[#F6F6F6] text-[clamp(40px,8vw,100px)] font-medium leading-[0.87] tracking-[-0.037em] uppercase"
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
                className="block text-[#F6F6F6] text-[clamp(40px,8vw,100px)] font-medium leading-[0.87] tracking-[-0.037em] uppercase"
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
          className="flex justify-end mt-6"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-[#BEBEBE] text-lg font-normal tracking-[-0.01em] uppercase max-md:text-base max-sm:text-sm"
          >
            Scroll to explore
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
