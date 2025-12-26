import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';

// Work images
import work01 from '@/assets/work/work-01.jpg';
import work02 from '@/assets/work/work-02.jpg';
import work03 from '@/assets/work/work-03.jpg';

const FeaturedWork: React.FC = () => {
  const works = [
    { src: work01, alt: "Geometric tattoo design" },
    { src: work02, alt: "Minimalist line tattoo" },
    { src: work03, alt: "Abstract spine tattoo" }
  ];

  return (
    <section className="box-border flex w-full flex-col items-start gap-[31.5px] relative bg-white m-0 px-[22.5px] py-[80px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="box-border flex flex-col items-start gap-[72px] self-stretch relative m-0">
        <ScrollReveal>
          <div className="box-border flex justify-between items-end self-stretch relative m-0 p-0 flex-wrap gap-4">
            <h2 className="box-border flex flex-col items-start relative m-0 p-0">
              <span className="box-border text-[#323232] text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase relative m-0 p-0">
                Featured Work
              </span>
            </h2>
            <div className="box-border flex flex-col items-start relative m-0 p-0">
              
            </div>
          </div>
        </ScrollReveal>
        
        <StaggerChildren staggerDelay={0.15} className="box-border flex justify-center items-start gap-4 self-stretch relative m-0 p-0 max-md:flex-col max-md:gap-5">
          {works.map((work, index) => (
            <StaggerItem key={index} className="box-border flex flex-col items-start flex-[1_0_0] self-stretch relative m-0 p-0">
              <Link to="/work" className="w-full h-full">
                <motion.article 
                  whileHover={{ scale: 1.02 }} 
                  transition={{ duration: 0.3 }} 
                  className="box-border flex flex-col justify-center items-start self-stretch aspect-[614.33/767.91] relative m-0 p-0 overflow-hidden cursor-pointer"
                >
                  <motion.img 
                    src={work.src} 
                    alt={work.alt} 
                    className="box-border w-full h-full relative object-cover m-0 p-0" 
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
        <div className="box-border flex flex-col items-start self-stretch relative m-0 p-0">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/work">
              <Button variant="outline" className="box-border flex justify-center items-center gap-[13.5px] border relative m-0 p-[13.5px] border-solid border-[#EAEAEA] font-medium">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_3_118)">
                    <mask id="mask0_3_118" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                      <path d="M18 0H0V18H18V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_3_118)">
                      <path d="M17.2542 11.1268L13.0994 6.97194M17.2542 11.1268L13.0994 15.2816M17.2542 11.1268H4.5V2.8125" stroke="#323232" strokeWidth="1.575" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_3_118">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="box-border text-[#323232] text-[17.6px] font-medium leading-[19.8px] tracking-[-0.027px] uppercase">
                  See more work
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FeaturedWork;
