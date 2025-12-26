import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ArtistSection: React.FC = () => {
  return (
    <section className="box-border w-full relative bg-white mt-[80px] m-0 px-[23px] py-[80px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="max-w-[1875px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          <ScrollReveal direction="left" className="lg:w-[200px] shrink-0">
            <h2 className="text-[#323232] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase max-sm:text-base max-sm:leading-[18px]">
              The Artist
            </h2>
          </ScrollReveal>
          
          <div className="flex-1">
            <ScrollReveal delay={0.2}>
              <div className="mb-10">
                <h3 className="text-[#323232] text-[39.4px] font-medium leading-[45px] tracking-[-0.607px] uppercase max-md:text-[28px] max-md:leading-8 max-sm:text-xl max-sm:leading-6">
                  Stevo is known for black and grey realism, defined by smooth shading and a strong sense of flow. His tattoos are designed to age well and feel right on the body over time.
                </h3>
              </div>
            </ScrollReveal>
            
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1" />
              <div className="lg:w-[377px]">
                <ScrollReveal delay={0.3}>
                  <div className="mb-5">
                    <p className="text-[#888] text-[17.4px] font-normal leading-[19.8px] tracking-[-0.027px] max-sm:text-sm max-sm:leading-4">
                      His work often centers on portraits, symbolic imagery, and narrative elements, all approached with restraint and clarity. Every piece is built around structure first so the detail serves the story, not the other way around.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.4}>
                  <div className="mb-8">
                    <p className="text-[#888] text-[17.4px] font-normal leading-[19.8px] tracking-[-0.027px] max-sm:text-sm max-sm:leading-4">
                      Placement, proportion, and how the design moves with the body shape the composition, creating pieces that feel balanced, intentional, and timeless, crafted to complement the wearer's natural form.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.5}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="inline-flex justify-center items-center gap-[13.5px] border p-[13.5px] border-solid border-[#EAEAEA] font-medium">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3_88)">
                          <mask id="mask0_3_88" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                            <path d="M18 0H0V18H18V0Z" fill="white"/>
                          </mask>
                          <g mask="url(#mask0_3_88)">
                            <path d="M17.2542 11.1268L13.0994 6.97194M17.2542 11.1268L13.0994 15.2816M17.2542 11.1268H4.5V2.8125" stroke="#323232" strokeWidth="1.575"/>
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_3_88">
                            <rect width="18" height="18" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="text-[#323232] text-[17.6px] font-medium leading-[19.8px] tracking-[-0.027px] uppercase">
                        More about me
                      </span>
                    </Button>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
