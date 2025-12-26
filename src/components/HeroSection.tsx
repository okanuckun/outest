import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="box-border flex flex-col justify-end items-start w-full flex-1 relative z-[5] m-0 p-0">
      {/* Description Text - Top Right Fixed */}
      <div className="absolute top-0 right-[22.5px] max-md:right-5 max-sm:right-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="box-border w-[280px] max-w-[280px] pt-[17px] max-md:w-[240px] max-sm:w-[180px]"
        >
          <div className="text-right">
            <p className="text-[#F6F6F6] text-[13px] font-medium leading-[18px] tracking-[-0.02px] mb-2 max-sm:text-[11px] max-sm:leading-[15px]">
              Okan Uckun
            </p>
            <p className="text-[#BEBEBE] text-[12px] font-normal leading-[17px] tracking-[-0.02px] max-sm:text-[10px] max-sm:leading-[14px]">
              New York City–based minimalist tattoo artist<br />
              Pioneer of abstract & geometric tattooing<br />
              Co-founder of Monolith Studio
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Main Headline - Bottom */}
      <div className="w-full pb-4 px-[22.5px] max-md:px-5 max-sm:px-4">
        {/* Border Line */}
        <div className="w-full h-px bg-white/45 mb-3" />
        
        {/* Headline */}
        <div>
          <h1 className="overflow-hidden">
            <motion.span 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="block text-[#F6F6F6] text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase"
            >
              Saying more with less.
            </motion.span>
          </h1>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-end mt-4"
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
