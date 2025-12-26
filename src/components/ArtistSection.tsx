import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Link } from 'react-router-dom';

const ArtistSection: React.FC = () => {
  return (
    <section className="box-border w-full relative bg-white m-0 p-0">
      {/* Top border */}
      <div className="w-full h-px bg-[#323232]" />
      
      {/* Main grid container */}
      <div className="flex min-h-[70vh]">
        {/* Left content area */}
        <div className="flex-1 flex flex-col">
          {/* Header row with title */}
          <div className="flex border-b border-[#323232]">
            <div className="px-6 py-4 border-r border-[#323232]">
              <ScrollReveal direction="left">
                <h2 className="text-[#323232] text-[13px] font-medium tracking-[0.5px] uppercase flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#323232]" />
                  ABOUT
                </h2>
              </ScrollReveal>
            </div>
            <div className="flex-1" />
          </div>
          
          {/* Content area */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Main text section */}
            <div className="flex-1 p-6 lg:p-10 flex flex-col justify-center border-r border-[#EAEAEA] max-lg:border-r-0 max-lg:border-b">
              <ScrollReveal delay={0.2}>
                <p className="text-[#323232] text-[22px] lg:text-[28px] font-normal leading-[1.3] tracking-[-0.4px] max-w-[600px]">
                  Okan Uckun is recognized as one of the pioneers of minimalist tattoos and geometric tattoos.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <p className="text-[#888] text-[14px] lg:text-[15px] font-normal leading-[1.6] tracking-[-0.02px] mt-8 max-w-[500px]">
                  In 2024, he co-founded Monolith Studio with Oscar Akermo and continues to run his unique art project, INM Studio.
                </p>
              </ScrollReveal>
            </div>
            
            {/* Secondary info section */}
            <div className="lg:w-[380px] p-6 lg:p-10 flex flex-col justify-between">
              <div>
                <ScrollReveal delay={0.4}>
                  <div className="mb-6">
                    <span className="text-[#323232] text-[11px] font-medium uppercase tracking-[1px] block mb-3">Background</span>
                    <p className="text-[#888] text-[14px] font-normal leading-[1.6] tracking-[-0.02px]">
                      After completing his education in architecture and earning a master's degree in modern art, he fully dedicated himself to tattooing in 2009.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.5}>
                  <div className="mb-8">
                    <span className="text-[#323232] text-[11px] font-medium uppercase tracking-[1px] block mb-3">Experience</span>
                    <p className="text-[#888] text-[14px] font-normal leading-[1.6] tracking-[-0.02px]">
                      To date, he has performed tattoo art in over 50 countries. In 2017, Okan moved from Istanbul to New York City, where he currently lives and continues his career.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
              
              <ScrollReveal delay={0.6}>
                <Link to="/about">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full inline-flex justify-center items-center gap-3 border p-4 border-solid border-[#323232] font-medium hover:bg-[#323232] hover:text-white transition-all duration-300">
                      <span className="text-[13px] font-medium tracking-[0.5px] uppercase">
                        More about me
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  </motion.div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
        
        {/* Right decorative grid lines */}
        <div className="hidden lg:flex w-[200px] border-l border-[#323232]">
          <div className="flex-1 border-r border-[#EAEAEA]" />
          <div className="flex-1 border-r border-[#EAEAEA]" />
          <div className="w-[60px] flex">
            <div className="flex-1 border-r border-[#323232]" />
            <div className="flex-1 border-r border-[#323232]" />
            <div className="flex-1 border-r border-[#323232]" />
            <div className="flex-1" />
          </div>
        </div>
      </div>
      
      {/* Bottom section with large typography */}
      <div className="border-t border-[#323232]">
        <div className="px-6 py-3 border-b border-[#EAEAEA]">
          <span className="text-[#888] text-[11px] font-normal tracking-[0.3px]">
            15+ years of experience
          </span>
        </div>
        
        {/* Large typographic element */}
        <div className="overflow-hidden py-8 lg:py-12">
          <ScrollReveal>
            <motion.div 
              className="flex items-center gap-4 lg:gap-8"
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 lg:gap-8 shrink-0">
                  <span className="w-16 h-16 lg:w-24 lg:h-24 bg-[#323232] shrink-0" />
                  <span className="text-[#323232] text-[60px] lg:text-[120px] font-bold tracking-[-0.04em] uppercase whitespace-nowrap" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    TATTOO
                  </span>
                  <span className="text-[#323232] text-[60px] lg:text-[120px] font-bold tracking-[-0.04em] uppercase whitespace-nowrap" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    ARTIST
                  </span>
                </div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
