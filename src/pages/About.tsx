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

      {/* Story Section */}
      <section className="bg-white py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <ScrollReveal className="lg:w-1/3">
              <span className="text-[11px] font-normal tracking-[0.1em] uppercase text-[#888]">
                ABOUT
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

      {/* Biography Section */}
      <section className="bg-[#f5f5f5] py-20 lg:py-32 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <ScrollReveal>
            <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#323232]">
              Okan Uckun is recognized as one of the pioneers of minimalist tattoos and geometric tattoos. In 2024, he co-founded Monolith Studio with Oscar Akermo and continues to run his unique art project, INM Studio. After completing his education in architecture and earning a master&apos;s degree in modern art, he fully dedicated himself to tattooing in 2009. To date, he has performed tattoo art in over 50 countries. In 2017, Okan moved from Istanbul to New York City, where he currently lives and continues his career in the USA, particularly in NYC.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#323232]">
              Okan Uckun&apos;s artistic endeavors are deeply influenced by minimalism, geometric forms, and architecture. His journey began in Istanbul, Turkey, and now continues in New York City. For approximately six years, he honed his craft at Bang Bang Tattoo before pursuing his own independent projects. Renowned for setting a new artistic standard with his meticulously crafted minimalist line work and geometric designs, Okan has earned widespread acclaim for his unique creations on an international scale.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#323232]">
              Describing the human body as a walking gallery, Okan thrives on creating art that travels the world and becomes an integral part of life. Beyond his tattoo work, Okan Uckun has contributed to various brands and projects, including jewelry collections, fashion labels, and snowboard designs, and has served as a creative director for many prominent music artists. Through these collaborations, he seamlessly integrates his minimalist style, showcasing the transformative power of his artistic vision.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#323232] font-medium">
              Okan continues to be an inspiring figure, making a lasting impact with his art and innovative approach.
            </p>
          </ScrollReveal>
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