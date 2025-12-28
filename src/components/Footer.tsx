import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Footer: React.FC = () => {
  const contactInfo = [
    {
      label: 'BUSINESS INQUIRIES',
      value: 'newbiz@monolith.studio',
      href: 'mailto:newbiz@monolith.studio',
    },
    {
      label: 'GENERAL',
      value: 'hello@monolith.studio',
      href: 'mailto:hello@monolith.studio',
    },
    {
      label: 'CALL US',
      value: '(+90) 555 123 45 67',
      href: 'tel:+905551234567',
    },
  ];

  return (
    <footer className="relative bg-[#E8E4E0] text-[#1a1a1a] w-full overflow-hidden">
      {/* Top Section - Info Row */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 pt-32 pb-12">
          {/* Left - Copyright */}
          <div className="mb-8 md:mb-0">
            <p className="text-sm text-[#1a1a1a] leading-relaxed">
              All Rights<br />
              Reserved<br />
              © 2024
            </p>
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
