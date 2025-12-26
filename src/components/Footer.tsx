import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Footer: React.FC = () => {
  const navigationLinks = [
    { name: "Home", to: "/" },
    { name: "Work", to: "/work" },
    { name: "About", to: "/about" },
    { name: "Blog", to: "/blog" }
  ];

  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "Tiktok", href: "#" },
    { name: "Facebook", href: "#" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="box-border w-full relative bg-[#1a1a1a] m-0 py-16 px-[22.5px] max-md:px-5 max-md:py-12 max-sm:px-4 max-sm:py-8">
      {/* Top Border */}
      <div className="w-full h-px bg-white/20 mb-12 max-sm:mb-8" />
      
      <div className="max-w-[1400px] mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 max-sm:mb-10">
          {/* Left - CTA */}
          <ScrollReveal className="lg:col-span-6">
            <p className="text-[#888] text-[14px] font-normal leading-[20px] tracking-[-0.02px] mb-6 max-w-[400px]">
              Based at Monolith Studio in Brooklyn. Working with clients worldwide. Have a vision? Let's talk.
            </p>
            <motion.a 
              href="mailto:hello@monolithstudio.com"
              className="inline-flex items-center gap-3 text-[#F6F6F6] text-[14px] font-medium leading-[18px] tracking-[-0.02px] uppercase hover:opacity-70 transition-opacity"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.2542 11.1268L13.0994 6.97194M17.2542 11.1268L13.0994 15.2816M17.2542 11.1268H4.5V2.8125" stroke="#F6F6F6" strokeWidth="1.5" />
              </svg>
              Book an appointment
            </motion.a>
          </ScrollReveal>
          
          {/* Middle - Navigation */}
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <h3 className="text-[#F6F6F6] text-[12px] font-medium leading-[16px] tracking-[0.5px] uppercase mb-4">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.to}
                    className="text-[#888] text-[14px] font-normal leading-[20px] tracking-[-0.02px] hover:text-[#F6F6F6] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </ScrollReveal>
          
          {/* Right - Social */}
          <ScrollReveal delay={0.2} className="lg:col-span-3">
            <h3 className="text-[#F6F6F6] text-[12px] font-medium leading-[16px] tracking-[0.5px] uppercase mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888] text-[14px] font-normal leading-[20px] tracking-[-0.02px] hover:text-[#F6F6F6] transition-colors"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </ScrollReveal>
        </div>
        
        {/* Bottom Section */}
        <div className="w-full h-px bg-white/10 mb-8" />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Logo / Name */}
          <ScrollReveal>
            <Link to="/" className="text-[#F6F6F6] text-[14px] font-normal leading-[18px] tracking-[-0.02px] uppercase hover:opacity-70 transition-opacity">
              Okan Uckun
            </Link>
          </ScrollReveal>
          
          {/* Address */}
          <ScrollReveal delay={0.1}>
            <address className="text-[#666] text-[12px] font-normal leading-[16px] tracking-[-0.02px] not-italic">
              Monolith Studio · 77 Washington Ave · Brooklyn, NY
            </address>
          </ScrollReveal>
          
          {/* Back to Top + Copyright */}
          <ScrollReveal delay={0.2} className="flex items-center gap-6">
            <span className="text-[#666] text-[12px] font-normal leading-[16px] tracking-[-0.02px]">
              © 2025
            </span>
            <motion.button 
              onClick={scrollToTop} 
              className="text-[#888] text-[12px] font-normal leading-[16px] tracking-[-0.02px] uppercase hover:text-[#F6F6F6] transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Back to top ↑
            </motion.button>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
};

export default Footer;