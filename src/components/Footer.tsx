import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Footer: React.FC = () => {
  const navigationLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Work", to: "/work" },
    { name: "Article", to: "/blog" }
  ];

  const styles = [
    { name: "Abstract Tattoo", to: "/work?style=abstract" },
    { name: "Minimalist Tattoo", to: "/work?style=minimalist" },
    { name: "Geometric Tattoo", to: "/work?style=geometric" }
  ];

  return (
    <footer className="relative bg-[#0a0a0a] text-white w-full overflow-hidden">
      {/* Top Section - Contact Info */}
      <ScrollReveal>
        <div className="flex flex-col items-center justify-center pt-20 pb-16 px-6">
          <motion.a 
            href="tel:+12125551234"
            className="text-[clamp(32px,8vw,80px)] font-light tracking-[-0.02em] hover:opacity-70 transition-opacity"
            whileHover={{ scale: 1.02 }}
          >
            +1 212 555-1234
          </motion.a>
          <motion.a 
            href="mailto:INFO@MONOLITH.COM"
            className="text-[clamp(32px,8vw,80px)] font-light tracking-[-0.02em] hover:opacity-70 transition-opacity"
            whileHover={{ scale: 1.02 }}
          >
            INFO@MONOLITH.COM
          </motion.a>
        </div>
      </ScrollReveal>

      {/* Middle Section - Links Row */}
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 py-8 border-t border-white/10">
          {/* Left - Navigation */}
          <div className="flex flex-col gap-2">
            <span className="text-[#666] text-[11px] uppercase tracking-wider mb-2">Navigation</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navigationLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={link.to}>
                    <span className="text-[#999] text-[13px] uppercase tracking-wide hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center - Address */}
          <div className="flex flex-col items-start md:items-center gap-2">
            <span className="text-[#666] text-[11px] uppercase tracking-wider mb-2">Address</span>
            <address className="text-[#999] text-[13px] uppercase tracking-wide not-italic text-left md:text-center">
              77 Washington Ave<br />
              Brooklyn, NY 11205
            </address>
          </div>

          {/* Right - Styles */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-[#666] text-[11px] uppercase tracking-wider mb-2">Styles</span>
            <div className="flex flex-col items-start md:items-end gap-1">
              {styles.map((style) => (
                <motion.div 
                  key={style.name}
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={style.to}>
                    <span className="text-[#999] text-[13px] uppercase tracking-wide hover:text-white transition-colors">
                      {style.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Bottom Section - Copyright & Large Text */}
      <ScrollReveal delay={0.2}>
        <div className="border-t border-white/10 px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <span className="text-[#666] text-[11px] uppercase tracking-wider">
              © 2025 All Rights Reserved
            </span>
            <motion.a 
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] text-[11px] uppercase tracking-wider hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              Instagram ↗
            </motion.a>
          </div>
        </div>
      </ScrollReveal>

      {/* Giant Brand Text */}
      <div className="relative overflow-hidden">
        <motion.div 
          className="text-[clamp(80px,25vw,300px)] font-bold leading-[0.85] tracking-[-0.04em] text-white/95 whitespace-nowrap px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          MONOLITH
        </motion.div>
      </div>

      {/* Bottom Padding */}
      <div className="h-8" />
    </footer>
  );
};

export default Footer;
