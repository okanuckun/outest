import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import aboutImage1 from '@/assets/about-image-1.webp';
import aboutImage2 from '@/assets/about-image-2.webp';
import aboutImage3 from '@/assets/about-image-3.webp';
import aboutHero from '@/assets/about-hero.jpg';

const About: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="box-border w-full min-h-screen relative overflow-x-hidden bg-white m-0 p-0"
    >
      {/* Hero Split Section */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Dark with Image (35%) */}
        <div className="relative w-full lg:w-[35%] min-h-[60vh] lg:min-h-screen bg-[#1a1a1a] overflow-hidden">
          {/* Background Image */}
          <motion.img 
            src={aboutHero} 
            alt="Okan Uckun - Tattoo Artist"
            className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale" 
            initial={{ scale: 1.1 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }} 
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Top Left Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute top-6 left-6 text-white z-10"
          >
            <div className="text-[11px] font-normal tracking-[0.1em] uppercase leading-relaxed">
              <div className="flex gap-8 mb-1">
                <span className="opacity-60">ARTIST:</span>
                <span>OKAN UCKUN</span>
              </div>
              <div className="flex gap-8 mb-1">
                <span className="opacity-60">LOCATION:</span>
                <span>BROOKLYN, NY</span>
              </div>
              <div className="flex gap-8 mb-1">
                <span className="opacity-60">SPECIALTY:</span>
                <span>REALISM / FINE LINE</span>
              </div>
              <div className="flex gap-8">
                <span className="opacity-60">EXPERIENCE:</span>
                <span>10+ YEARS</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-6 right-6 z-10"
          >
            <Link to="/" className="hover:opacity-70 transition-opacity">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="2" y1="18" x2="38" y2="2" stroke="#F6F6F6" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
          </motion.div>
          
          {/* Bottom Left Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-6 left-6 text-white z-10 max-w-[280px]"
          >
            <p className="text-[11px] font-normal tracking-[0.05em] uppercase leading-relaxed opacity-90">
              PRECISION AND<br/>
              PATIENCE GUIDE<br/>
              EVERY PIECE
            </p>
          </motion.div>
        </div>

        {/* Right Side - Light with Quote (65%) */}
        <div className="relative w-full lg:w-[65%] min-h-[60vh] lg:min-h-screen bg-[#f5f5f5] flex flex-col">
          {/* Top Right Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-between items-start p-6"
          >
            <div className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#323232]">
              <div>ABOUT</div>
              <div className="opacity-60">PAGE</div>
            </div>
            <div className="text-[11px] font-normal tracking-[0.1em] uppercase text-right text-[#323232]">
              <div>STUDIO:</div>
              <div>PRIVATE</div>
              <div className="opacity-60">APPOINTMENT ONLY</div>
            </div>
          </motion.div>

          {/* Quote Source */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6, duration: 0.6 }}
            className="px-6 mt-auto"
          >
            <p className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#323232] mb-4">
              CLIENT TESTIMONIAL<br/>
              <span className="opacity-60">BROOKLYN, 2024</span>
            </p>
          </motion.div>

          {/* Main Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7, duration: 0.8 }}
            className="px-6 pb-6 lg:pb-12"
          >
            <div className="flex">
              <span className="text-[40px] lg:text-[60px] font-bold text-[#323232] leading-none mr-2">"</span>
              <h1 className="text-[32px] md:text-[42px] lg:text-[52px] xl:text-[62px] font-bold text-[#323232] leading-[0.95] tracking-[-0.02em] uppercase">
                THE ATTENTION TO DETAIL AND ARTISTIC VISION EXCEEDED EVERY EXPECTATION. A TRUE MASTER OF THE CRAFT.
              </h1>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-6 right-6 flex gap-4 text-[11px] font-normal tracking-[0.1em] uppercase text-[#323232]"
          >
            <Link to="/work" className="opacity-60 hover:opacity-100 transition-opacity">Work</Link>
            <Link to="/about" className="opacity-100">About</Link>
            <Link to="/blog" className="opacity-60 hover:opacity-100 transition-opacity">Blog</Link>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <ScrollReveal className="lg:w-1/3">
              <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#888]">
                (01) MY STORY
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="lg:w-2/3">
              <p className="text-[28px] md:text-[36px] lg:text-[42px] font-normal leading-[1.15] tracking-[-0.02em] text-[#323232] uppercase">
                From the vibrant streets of Istanbul to the heart of New York City, I built my name through years of obsessive practice and a relentless eye for proportion, light, and restraint.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <ScrollReveal className="w-full">
        <div className="w-full h-[70vh] lg:h-[90vh] overflow-hidden">
          <motion.img 
            src={aboutImage1} 
            alt="Okan Uckun tattoo work" 
            className="w-full h-full object-cover grayscale" 
            whileHover={{ scale: 1.02 }} 
            transition={{ duration: 0.8 }} 
          />
        </div>
      </ScrollReveal>

      {/* Approach Section - Split Layout */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left - Image */}
        <ScrollReveal className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen">
          <div className="h-full">
            <motion.img 
              src={aboutImage2} 
              alt="Okan Uckun tattooing" 
              className="w-full h-full object-cover grayscale" 
              whileHover={{ scale: 1.02 }} 
              transition={{ duration: 0.8 }} 
            />
          </div>
        </ScrollReveal>

        {/* Right - Content */}
        <div className="w-full lg:w-1/2 bg-[#f5f5f5] flex flex-col justify-center p-8 lg:p-16">
          <ScrollReveal>
            <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#888] mb-8 block">
              (02) MY APPROACH
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-[24px] md:text-[28px] lg:text-[32px] font-normal leading-[1.2] tracking-[-0.02em] text-[#323232] uppercase mb-12">
              Every piece begins with understanding your story. I blend technical mastery with artistic vision to create custom work that stands the test of time.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              { number: '01', text: 'Texture and depth always come first' },
              { number: '02', text: 'True realism comes from restraint' },
              { number: '03', text: 'Precision and patience guide every piece' },
              { number: '04', text: 'Placement drives the entire tattoo' },
            ].map((item, index) => (
              <ScrollReveal key={item.number} delay={0.3 + index * 0.1}>
                <div className="flex items-start gap-4 border-t border-[#e0e0e0] pt-4">
                  <span className="text-[11px] font-normal tracking-[0.1em] text-[#888]">
                    ({item.number})
                  </span>
                  <p className="text-[14px] font-normal tracking-[-0.01em] text-[#323232]">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final Image Grid */}
      <section className="bg-white p-6 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-4">
          <ScrollReveal className="lg:w-2/3">
            <div className="h-[50vh] lg:h-[80vh] overflow-hidden">
              <motion.img 
                src={aboutImage3} 
                alt="Okan Uckun studio" 
                className="w-full h-full object-cover grayscale" 
                whileHover={{ scale: 1.02 }} 
                transition={{ duration: 0.8 }} 
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="lg:w-1/3 flex flex-col justify-end">
            <div className="bg-[#1a1a1a] p-8 lg:p-12 h-full flex flex-col justify-end">
              <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-white/60 mb-4">
                BOOK NOW
              </span>
              <p className="text-[18px] lg:text-[22px] font-normal leading-[1.3] text-white uppercase mb-8">
                Ready to create something meaningful together?
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 text-[11px] font-normal tracking-[0.1em] uppercase text-white border border-white/30 px-6 py-3 hover:bg-white hover:text-[#1a1a1a] transition-all w-fit"
              >
                <span>↳</span>
                GET IN TOUCH
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default About;
