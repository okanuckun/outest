import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Footer: React.FC = () => {
  const contactInfo = [
    {
      label: 'BUSINESS INQUIRIES',
      value: 'hello@monolithstudio.com',
      href: 'mailto:hello@monolithstudio.com',
    },
    {
      label: 'GENERAL',
      value: 'okanuckun@gmail.com',
      href: 'mailto:okanuckun@gmail.com',
    },
    {
      label: 'CALL US',
      value: '+1 (616) 777-7073',
      href: 'tel:+16167777073',
    },
  ];

  const contactInfo = [
    {
      label: 'GENERAL',
      value: 'okanuckun@gmail.com',
      href: 'mailto:okanuckun@gmail.com',
    },
    {
      label: 'CALL US',
      value: '+1 (616) 777-7073',
      href: 'tel:+16167777073',
    },
  ];

  const exploreLinks = [
    { label: 'WORK', link: '/work' },
    { label: 'PROJECTS', link: '/project' },
    { label: 'BLOG', link: '/blog' },
    { label: 'ABOUT', link: '/about' },
    { label: 'SHOP', link: '/shop' },
    { label: 'BOOK APPOINTMENT', link: '/booking' },
  ];

  return (
    <footer className="relative bg-[#f5f5f5] text-[#1a1a1a] w-full overflow-hidden">
      {/* Styles Section */}
      <ScrollReveal>
        <div className="px-6 md:px-12 pt-32 pb-8">
          <span className="text-[11px] text-[#888] uppercase tracking-wider block mb-4">
            STYLES
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-between items-center w-full">
            {styles.map((style) => (
              style.link ? (
                <Link key={style.label} to={style.link} className="text-[11px] text-[#1a1a1a] uppercase tracking-wider hover:text-[#555] transition-colors">
                  {style.label}
                </Link>
              ) : (
                <span key={style.label} className="text-[11px] text-[#1a1a1a] uppercase tracking-wider">
                  {style.label}
                </span>
              )
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Horizontal Line */}
      <div className="w-full px-6 md:px-12">
        <div className="w-full h-px bg-[#1a1a1a]/20" />
      </div>

      {/* Explore Section — site-wide footer navigation. Ensures every
          page has direct outgoing links to every major route. */}
      <ScrollReveal>
        <div className="px-6 md:px-12 pt-8 pb-8">
          <span className="text-[11px] text-[#888] uppercase tracking-wider block mb-4">
            EXPLORE
          </span>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 md:justify-between items-center w-full">
            {exploreLinks.map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className="text-[11px] text-[#1a1a1a] uppercase tracking-wider hover:text-[#555] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollReveal>

      {/* Horizontal Line */}
      <div className="w-full px-6 md:px-12">
        <div className="w-full h-px bg-[#1a1a1a]/20" />
      </div>

      {/* Contact Info Row */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 pt-8 pb-12">
          {/* Left - Instagram & Address */}
          <div className="mb-8 md:mb-0">
            {/* Social Links */}
            <div className="flex gap-4 mb-3">
              <a 
                href="https://www.instagram.com/okanuckun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-[#888] hover:text-[#1a1a1a] transition-colors uppercase tracking-wider"
              >
                Instagram
              </a>
              <a 
                href="https://www.tiktok.com/@okanuckun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-[#888] hover:text-[#1a1a1a] transition-colors uppercase tracking-wider"
              >
                TikTok
              </a>
              <a 
                href="https://www.youtube.com/@monolithstudionyc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-[#888] hover:text-[#1a1a1a] transition-colors uppercase tracking-wider"
              >
                YouTube
              </a>
            </div>
            {/* Address */}
            <motion.a
              href="https://www.google.com/maps/search/77+Washington+Avenue+Brooklyn+NYC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#1a1a1a] leading-relaxed hover:opacity-60 transition-opacity block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              77 Washington Avenue<br />
              Brooklyn<br />
              NYC
            </motion.a>
          </div>

          {/* Right - Contact Info */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex flex-col gap-2">
                <span className="text-[11px] text-[#888] uppercase tracking-wider">
                  {info.label}
                </span>
                <motion.a
                  href={info.href}
                  className="text-sm text-[#1a1a1a] hover:opacity-60 transition-opacity"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {info.value}
                </motion.a>
              </div>
            ))}
            {/* Aftercare */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] text-[#888] uppercase tracking-wider">
                AFTERCARE
              </span>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/aftercare"
                  className="text-sm text-[#1a1a1a] hover:opacity-60 transition-opacity"
                >
                  Read Guide
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Giant Brand Text - Links to Homepage */}
      <div className="relative w-full">
        <Link to="/" aria-label="Go to homepage">
          <motion.div
            className="w-full font-black leading-[0.85] tracking-[-0.02em] text-[#1a1a1a] text-center whitespace-nowrap hover:opacity-80 transition-opacity cursor-pointer"
            style={{
              fontSize: 'min(18vw, 280px)',
            }}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            viewport={{
              once: true,
            }}
          >
            MONOLITH
          </motion.div>
        </Link>
      </div>
      
      {/* Copyright */}
      <div className="px-6 md:px-12 py-6 text-center">
        <span className="text-[11px] text-[#888] uppercase tracking-wider">
          © {new Date().getFullYear()} Monolith Studio. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
