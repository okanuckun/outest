import React from 'react';
import { motion } from 'framer-motion';
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
      value: '(+90) 555 123 45 67',
      href: 'tel:+905551234567',
    },
  ];

  const styles = ['GEOMETRIC TATTOO', 'ABSTRACT TATTOO', 'MINIMALIST TATTOO'];

  return (
    <footer className="relative bg-[#E8E4E0] text-[#1a1a1a] w-full overflow-hidden">
      {/* Styles Section */}
      <ScrollReveal>
        <div className="px-6 md:px-12 pt-32 pb-8">
          <span className="text-[11px] text-[#888] uppercase tracking-wider block mb-4">
            STYLES
          </span>
          <div className="flex justify-between items-center w-full">
            {styles.map((style) => (
              <span key={style} className="text-[11px] text-[#1a1a1a] uppercase tracking-wider">
                {style}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Horizontal Line */}
      <div className="w-full px-6 md:px-12">
        <div className="w-full h-px bg-[#1a1a1a]/20" />
      </div>

      {/* Contact Info Row */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 pt-8 pb-12">
          {/* Left - Copyright */}
          <div className="mb-8 md:mb-0">
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
          </div>
        </div>
      </ScrollReveal>

      {/* Giant Brand Text */}
      <div className="relative w-full">
        <motion.div
          className="w-full font-black leading-[0.85] tracking-[-0.02em] text-[#1a1a1a] text-center whitespace-nowrap"
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
      </div>
      
      {/* Bottom Padding */}
      <div className="h-4" />
    </footer>
  );
};

export default Footer;
