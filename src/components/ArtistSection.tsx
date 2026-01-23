import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ArtistSection: React.FC = () => {
  return (
    <section className="box-border w-full relative bg-white m-0 px-[23px] py-[80px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="max-w-[1875px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left side - Main text aligned with "saying" */}
          <div className="flex-1">
            <ScrollReveal delay={0.2}>
              <div className="mb-10">
                <h2 className="text-[#323232] text-[28px] font-medium leading-[34px] tracking-[-0.4px] uppercase max-md:text-[22px] max-md:leading-7 max-sm:text-lg max-sm:leading-5">
                  OKAN UCKUN IS RECOGNIZED AS ONE OF THE PIONEERS OF MINIMALIST TATTOOS AND GEOMETRIC TATTOOS. IN 2024, HE CO-FOUNDED MONOLITH STUDIO WITH OSCAR AKERMO AND CONTINUES TO RUN HIS UNIQUE ART PROJECT, INM STUDIO.
                </h2>
                <p className="text-[#666] text-[16px] font-normal leading-[24px] mt-6 max-w-[800px] max-md:text-[14px] max-md:leading-[20px]">
                  As a professional tattoo artist based in New York City with over 15 years of experience, Okan specializes in creating unique, custom designs that tell each client's personal story. His distinctive style blends architectural precision with artistic expression, resulting in tattoos that are both visually striking and deeply meaningful. Whether you're looking for black and grey realism, geometric patterns, or minimalist line work, Okan brings unparalleled expertise to every piece.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="flex-col lg:flex-row gap-10 flex items-start justify-center">
              <div className="flex-1" />
              <div className="lg:w-[377px]">
                <ScrollReveal delay={0.3}>
                  <div className="mb-5">
                    <p className="text-[#888] text-[14px] font-normal leading-[18px] tracking-[-0.02px] max-sm:text-xs max-sm:leading-4">
                      ​After completing his education in architecture and earning a master's degree in modern art, he fully dedicated himself to tattooing in 2009.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.4}>
                  <div>
                    <p className="text-[#888] text-[14px] font-normal leading-[18px] tracking-[-0.02px] max-sm:text-xs max-sm:leading-4">
                      ​To date, he has performed tattoo art in over 50 countries. In 2017, Okan moved from Istanbul to New York City, where he currently lives and continues his career in the USA, particularly in NYC.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
          
          {/* Right side - About label and Arrow */}
          <div className="lg:w-[200px] shrink-0 order-last flex flex-col justify-between">
            <h2 className="text-[#323232] text-[15px] font-medium leading-5 tracking-[-0.202px] uppercase max-sm:text-sm max-sm:leading-[16px] lg:text-left text-right hidden lg:block">
              ​about
            </h2>
            
            {/* Arrow link to About page */}
            <motion.div 
              className="mt-auto lg:mt-0 flex justify-end lg:justify-start"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center w-12 h-12 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
