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
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="box-border w-full min-h-screen relative overflow-x-hidden bg-white m-0 p-0">
      {/* Hero Split Section */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Dark with Image (35%) */}
        <div className="relative w-full lg:w-[35%] min-h-[60vh] lg:min-h-screen bg-[#1a1a1a] overflow-hidden">
          {/* Background Image */}
          <motion.img src={aboutHero} alt="Okan Uckun - Tattoo Artist" className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale" loading="eager" fetchPriority="high" initial={{
          scale: 1.1
        }} animate={{
          scale: 1
        }} transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1]
        }} />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Top Left Info */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.6
        }} className="absolute top-6 left-6 text-white z-10">
            
          </motion.div>

          {/* Navigation Logo */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} className="absolute top-6 right-6 z-10">
            <Link to="/" className="hover:opacity-70 transition-opacity">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="2" y1="18" x2="38" y2="2" stroke="#F6F6F6" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </motion.div>
          
          {/* Bottom Left Quote */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5,
          duration: 0.6
        }} className="absolute bottom-6 left-6 text-white z-10 max-w-[280px]">
            <p className="text-[11px] font-normal tracking-[0.05em] uppercase leading-relaxed opacity-90">
              PRECISION AND<br />
              PATIENCE GUIDE<br />
              EVERY PIECE
            </p>
          </motion.div>
        </div>

        {/* Right Side - Light with Quote (65%) */}
        <div className="relative w-full lg:w-[65%] min-h-[60vh] lg:min-h-screen bg-[#f5f5f5] flex flex-col">
          {/* Top Right Info */}
          

          {/* Quote Source */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.6,
          duration: 0.6
        }} className="px-6 mt-auto">
            
          </motion.div>

          {/* Main Quote */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7,
          duration: 0.8
        }} className="px-6 pb-6 lg:pb-12">
            <div className="flex">
              <span className="text-[40px] lg:text-[60px] font-bold text-[#323232] leading-none mr-2">"</span>
              <h1 className="text-[32px] md:text-[42px] lg:text-[52px] xl:text-[62px] font-bold text-[#323232] leading-[0.95] tracking-[-0.02em] uppercase">
                THE ATTENTION TO DETAIL AND ARTISTIC VISION EXCEEDED EVERY EXPECTATION. A TRUE MASTER OF THE CRAFT.
              </h1>
            </div>
          </motion.div>

          {/* Navigation Links */}
          
        </div>
      </section>

      {/* Story Section - Pioneer */}
      <section className="bg-white py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <ScrollReveal className="lg:w-1/3">
              <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#888]">
                PIONEER
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="lg:w-2/3">
              <p className="text-[28px] md:text-[36px] lg:text-[42px] font-normal leading-[1.15] tracking-[-0.02em] text-[#323232] uppercase">
                Recognized as one of the pioneers of minimalist tattoos and geometric tattoos. Co-founded Monolith Studio with Oscar Akermo in 2024.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="bg-[#f5f5f5] py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <ScrollReveal className="lg:w-1/3">
              <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#888]">
                JOURNEY
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="lg:w-2/3">
              <p className="text-[28px] md:text-[36px] lg:text-[42px] font-normal leading-[1.15] tracking-[-0.02em] text-[#323232] uppercase">
                Architecture degree followed by a Master&apos;s in Modern Art — then full commitment to tattooing in 2009. Education remains a source of inspiration, fueling new discoveries. Based in NYC, traveling annually to California, London, and beyond for tattoo performances.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* NYC Section */}
      <section className="bg-white py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <ScrollReveal className="lg:w-1/3">
              <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#888]">
                NEW YORK CITY
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="lg:w-2/3">
              <p className="text-[28px] md:text-[36px] lg:text-[42px] font-normal leading-[1.15] tracking-[-0.02em] text-[#323232] uppercase">
                Moved from Istanbul to NYC in 2017. After six years at Bang Bang Tattoo, the focus shifted to independent projects. In 2024, co-founded Monolith Studio with Oscar Akermo — building a team and continuing the tattoo journey in New York City.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#f5f5f5] py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <ScrollReveal className="lg:w-1/3">
              <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#888]">
                PHILOSOPHY
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="lg:w-2/3">
              <p className="text-[28px] md:text-[36px] lg:text-[42px] font-normal leading-[1.15] tracking-[-0.02em] text-[#323232] uppercase">
                The human body is a living gallery. A tattoo becomes part of your story, your identity. Deeply considered yet minimally expressed designs — that is the pursuit. Technology, art, and architecture serve as constant inspiration, shaping both the work and the way of thinking.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Beyond Section */}
      <section className="bg-white py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <ScrollReveal className="lg:w-1/3">
              <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#888]">
                BEYOND TATTOO
              </span>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="lg:w-2/3">
              <p className="text-[28px] md:text-[36px] lg:text-[42px] font-normal leading-[1.15] tracking-[-0.02em] text-[#323232] uppercase">
                Exploring the creative world beyond tattoo — jewelry collections, fashion collaborations, snowboard and extreme sports partnerships, startup ventures, and serving as creative director for musicians. The artistic journey continues to evolve across disciplines.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <ScrollReveal className="w-full">
        <div className="w-full h-[70vh] lg:h-[90vh] overflow-hidden">
          <motion.img src={aboutImage1} alt="Okan Uckun tattoo work" className="w-full h-full object-cover grayscale" loading="lazy" whileHover={{
          scale: 1.02
        }} transition={{
          duration: 0.8
        }} />
        </div>
      </ScrollReveal>

      {/* Approach Section - Split Layout */}
      

      {/* Final Image Grid */}
      

      <Footer />
    </motion.div>;
};
export default About;