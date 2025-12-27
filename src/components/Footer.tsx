import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const navigationLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Work", to: "/work" },
    { name: "Article", to: "/blog" }
  ];

  const footerLinks = [
    { name: "Terms of use", to: "/terms" },
    { name: "Aftercare", to: "/aftercare" },
    { name: "Preparation", to: "/preparation" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="box-border flex w-full flex-col relative bg-[#1a1a1a] m-0 pt-[60px] pb-[22.5px] px-[22.5px] max-md:px-5 max-md:py-10 max-sm:px-4 max-sm:py-6">
      {/* Main Content */}
      <ScrollReveal className="mb-16">
        <address className="text-[#F6F6F6] text-[clamp(32px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.03em] uppercase not-italic mb-12">
          MONOLITH STUDIO<br />
          77 WASHINGTON AVE<br />
          BROOKLYN, NY
        </address>
        
        {/* Subscribe Section */}
        <div className="max-w-md">
          <h3 className="text-[#888] text-[14px] font-medium leading-[18px] tracking-[-0.02px] uppercase mb-4">
            Stay Updated
          </h3>
          <form onSubmit={handleSubscribe} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent border border-[#444] px-4 py-3 text-[#F6F6F6] text-sm placeholder:text-[#666] focus:outline-none focus:border-[#888] transition-colors"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-[#444] px-6 py-3 text-[#F6F6F6] text-sm font-medium uppercase hover:bg-white/10 transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </ScrollReveal>
      
      <div className="w-full h-px bg-white/20 mb-8" />
      
      {/* Bottom Section */}
      <ScrollReveal delay={0.2}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Left: Copyright & Links */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
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
          
          {/* Center: Navigation */}
          <div className="flex gap-6 flex-wrap">
            {navigationLinks.map((link) => (
              <motion.div 
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link to={link.to}>
                  <span className="text-[#888] text-[13px] font-normal leading-[16px] tracking-[-0.15px] uppercase hover:text-[#F6F6F6] transition-colors">
                    {link.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Right: Social & Back to Top */}
          <div className="flex items-center gap-6">
            <motion.a 
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-[#888] text-[13px] font-normal leading-[16px] tracking-[-0.15px] uppercase hover:text-[#F6F6F6] transition-colors"
            >
              Instagram
            </motion.a>
            
            <motion.button 
              onClick={scrollToTop} 
              className="hover:opacity-80 transition-opacity"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <span className="text-[#F6F6F6] text-[13px] font-medium leading-[16px] tracking-[-0.15px] uppercase">
                Back to top ↑
              </span>
            </motion.button>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;