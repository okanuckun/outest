import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Footer: React.FC = () => {
  const navigationLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Work", to: "/work" },
    { name: "Article", to: "/blog" }
  ];

  const socialLinks = [
    { name: "Tiktok", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" }
  ];

  const footerLinks = [
    { name: "Terms of use", to: "/terms" },
    { name: "Aftercare", to: "/aftercare" },
    { name: "Preparation", to: "/preparation" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="box-border flex w-full flex-col items-start gap-[80px] relative bg-[#1a1a1a] m-0 pt-[60px] pb-[22.5px] px-[22.5px] max-md:gap-10 max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      <div className="box-border self-stretch relative m-0 p-0">
        <div className="flex flex-col lg:flex-row gap-10">
          <ScrollReveal className="lg:max-w-[800px]">
            <p className="text-[#888] text-[28px] font-normal leading-[34px] tracking-[-0.4px] mb-8 max-md:text-xl max-md:leading-6 max-sm:text-base max-sm:leading-5">
              Now based at Monolith Studio in Brooklyn, Okan works with clients from across the world. Have a vision in mind? Reach out to start the conversation.
            </p>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="inline-flex justify-center items-center gap-[12px] border p-[12px] border-solid border-[#444] bg-transparent hover:bg-white/10 font-medium">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.2542 11.1268L13.0994 6.97194M17.2542 11.1268L13.0994 15.2816M17.2542 11.1268H4.5V2.8125" stroke="#F6F6F6" strokeWidth="1.5"/>
                </svg>
                <span className="text-[#F6F6F6] text-[14px] font-medium leading-[18px] tracking-[-0.02px] uppercase">
                  GET IN TOUCH
                </span>
              </Button>
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="flex flex-row lg:flex-col gap-10 lg:gap-[13.5px] flex-wrap">
            <nav>
              <h3 className="text-[#F6F6F6] text-[14px] font-medium leading-[18px] tracking-[-0.02px] mb-3">
                Discover
              </h3>
              <div className="flex flex-col gap-[8px]">
                {navigationLinks.map((link) => (
                  <motion.div 
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={link.to}>
                      <span className="text-[#888] text-[16px] font-normal leading-[18px] tracking-[-0.15px] uppercase max-sm:text-sm max-sm:leading-4 hover:text-[#F6F6F6] transition-colors">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
            
            <div>
              <h3 className="text-[#F6F6F6] text-[14px] font-medium leading-[18px] tracking-[-0.02px] mb-3">
                Social
              </h3>
              <div className="flex flex-col gap-[8px]">
                {socialLinks.map((link) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[#888] text-[16px] font-normal leading-[18px] tracking-[-0.15px] uppercase max-sm:text-sm max-sm:leading-4 hover:text-[#F6F6F6] transition-colors">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="lg:ml-auto">
            <motion.button 
              onClick={scrollToTop} 
              className="hover:opacity-80 transition-opacity"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <span className="text-[#F6F6F6] text-[14px] font-medium leading-[18px] tracking-[-0.15px] uppercase">
                Back to top ↑
              </span>
            </motion.button>
          </ScrollReveal>
        </div>
      </div>
      
      <ScrollReveal delay={0.2} className="box-border self-stretch relative m-0 p-0">
        <div className="w-full h-px bg-white/20 mb-8" />
        
        <div className="flex flex-col gap-4 mb-10">
          <motion.a 
            href="mailto:hello@monolithstudio.com" 
            className="hover:opacity-80 transition-opacity"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[#F6F6F6] text-[clamp(24px,5vw,60px)] font-medium leading-[1.1] tracking-[-0.03em] uppercase">
              HELLO@MONOLITHSTUDIO.COM
            </span>
          </motion.a>
          
          <address className="text-[#888] text-[clamp(20px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.03em] uppercase not-italic">
            MONOLITH STUDIO · 77 WASHINGTON AVE · BROOKLYN, NY
          </address>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <span className="text-[#666] text-[13px] font-normal leading-[16px] tracking-[-0.15px] uppercase">
            Okan Uckun © 2025
          </span>
          
          <div className="flex gap-[16px] flex-wrap">
            {footerLinks.map((link) => (
              <motion.div 
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={link.to}>
                  <span className="text-[#666] text-[13px] font-normal leading-[16px] tracking-[-0.15px] uppercase hover:text-[#F6F6F6] transition-colors">
                    {link.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;