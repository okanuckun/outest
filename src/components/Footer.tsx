import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';
const Footer: React.FC = () => {
  const navigationLinks = [{
    name: "Home",
    to: "/"
  }, {
    name: "About",
    to: "/about"
  }, {
    name: "Work",
    to: "/work"
  }, {
    name: "Article",
    to: "/blog"
  }];
  const styles = [{
    name: "Abstract Tattoo",
    to: "/work?style=abstract"
  }, {
    name: "Minimalist Tattoo",
    to: "/work?style=minimalist"
  }, {
    name: "Geometric Tattoo",
    to: "/work?style=geometric"
  }];
  return <footer className="relative bg-[#f5f5f5] text-[#1a1a1a] w-full overflow-hidden">
      {/* Top Section - Links Row */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 pt-20 pb-8">
          {/* Left - Address */}
          <div className="flex flex-col gap-2">
            <address className="text-[#1a1a1a] text-[15px] uppercase tracking-wide not-italic font-medium">
              77 Washington Ave<br />
              Brooklyn, NY 11205
            </address>
          </div>

          {/* Center - Navigation */}
          <div className="flex justify-start md:justify-center">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {navigationLinks.map(link => <motion.div key={link.name} whileHover={{
              x: 4
            }} transition={{
              duration: 0.2
            }}>
                  <Link to={link.to}>
                    <span className="text-[#555] text-[13px] uppercase tracking-wide hover:text-[#1a1a1a] transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>)}
            </div>
          </div>

          {/* Right - Styles */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-[#888] text-[11px] uppercase tracking-wider mb-2">Styles</span>
            <div className="flex flex-col items-start md:items-end gap-1">
              {styles.map(style => <motion.div key={style.name} whileHover={{
              x: -4
            }} transition={{
              duration: 0.2
            }}>
                  <Link to={style.to}>
                    <span className="text-[#555] text-[13px] uppercase tracking-wide hover:text-[#1a1a1a] transition-colors">
                      {style.name}
                    </span>
                  </Link>
                </motion.div>)}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Middle Section - Contact Info */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-[#1a1a1a]/10">
          <motion.a href="mailto:INFO@MONOLITH.COM" className="text-[clamp(32px,8vw,80px)] font-light tracking-[-0.02em] hover:opacity-50 transition-opacity" whileHover={{
          scale: 1.02
        }}>
            INFO@MONOLITH.COM
          </motion.a>
        </div>
      </ScrollReveal>

      {/* Bottom Section - Copyright & Large Text */}
      <ScrollReveal delay={0.2}>
        <div className="border-t border-[#1a1a1a]/10 px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <span className="text-[#888] text-[11px] uppercase tracking-wider">
              © 2025 All Rights Reserved
            </span>
            <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#888] text-[11px] uppercase tracking-wider hover:text-[#1a1a1a] transition-colors" whileHover={{
            y: -2
          }}>
              Instagram ↗
            </motion.a>
          </div>
        </div>
      </ScrollReveal>

      {/* Giant Brand Text */}
      <div className="relative overflow-hidden w-full">
        <motion.div className="w-full text-center font-bold leading-[0.85] tracking-[-0.04em] text-[#1a1a1a]" style={{
        fontSize: 'clamp(60px, 18vw, 280px)'
      }} initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: "easeOut"
      }} viewport={{
        once: true
      }}>
          MONOLITH
        </motion.div>
      </div>

      {/* Bottom Padding */}
      <div className="h-6" />
    </footer>;
};
export default Footer;