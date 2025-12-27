import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import aboutImage1 from '@/assets/about-image-1.webp';
import aboutImage2 from '@/assets/about-image-2.webp';
import aboutImage3 from '@/assets/about-image-3.webp';
import heroBg from '@/assets/hero-bg.jpg';

const About: React.FC = () => {
  const approaches = [{
    number: '01',
    text: 'Texture and depth always come first'
  }, {
    number: '02',
    text: 'True realism comes from restraint'
  }, {
    number: '03',
    text: 'Precision and patience guide every piece'
  }, {
    number: '04',
    text: 'Placement drives the entire tattoo'
  }];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
      className="box-border w-full min-h-screen relative overflow-x-hidden bg-white m-0 p-0"
    >
      {/* Navigation - Dark text version for white background */}
      <header className="box-border flex h-[60px] flex-col items-start shrink-0 self-stretch relative z-10 m-0 p-0">
        <nav className="box-border flex flex-col items-start self-stretch relative m-0 px-[22.5px] py-[18px] border-b-[#EAEAEA] border-b border-solid max-sm:px-4 max-sm:py-4">
          <div className="box-border h-5 self-stretch relative flex items-center justify-between m-0 p-0 max-md:flex-col max-md:gap-3 max-md:h-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }} 
              className="box-border inline-flex items-center relative m-0 p-0"
            >
              <Link to="/" className="hover:opacity-70 transition-opacity">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="2" y1="18" x2="38" y2="2" stroke="#323232" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.5 }} 
              className="box-border inline-flex items-center relative m-0 p-0 max-sm:hidden"
            >
              <span className="box-border text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase m-0 p-0">
                brooklyn, ny
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4, duration: 0.5 }} 
              className="box-border inline-flex items-center gap-[16px] relative m-0 p-0 max-md:hidden"
            >
              <Link to="/work" className="text-[#888] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase hover:text-[#323232] transition-colors">
                work
              </Link>
              <Link to="/about" className="text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase">
                About
              </Link>
              <Link to="/blog" className="text-[#888] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase hover:text-[#323232] transition-colors">
                Blog
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5, duration: 0.5 }} 
              className="box-border inline-flex flex-col items-start relative m-0 p-0 max-md:hidden"
            >
              <Link to="/contact" className="text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase hover:opacity-70 transition-opacity">
                Book an appointment
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="box-border w-full px-[22.5px] pt-[80px] pb-0 max-md:px-5 max-sm:px-4 max-sm:pt-10">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
            <div className="flex flex-col">
              <span className="text-[#BEBEBE] text-[120px] font-medium leading-[110px] tracking-[-4px] uppercase max-md:text-[60px] max-md:leading-[55px] max-sm:text-[40px] max-sm:leading-[36px]">
                ABOUT
              </span>
              <h1 className="text-[#323232] text-[120px] font-medium leading-[110px] tracking-[-4px] uppercase max-md:text-[60px] max-md:leading-[55px] max-sm:text-[40px] max-sm:leading-[36px]">
                OKAN UCKUN
              </h1>
            </div>
            <div className="lg:max-w-[350px] lg:pt-[60px]">
              <p className="text-[#888] text-[15px] font-normal leading-[18px] tracking-[-0.02px]">
                Okan Uckun is an internationally recognized tattoo artist specializing in minimalist, abstract, and geometric tattooing.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Hero Image */}
      <ScrollReveal delay={0.2} className="w-full mt-[40px]">
        <div className="w-full h-[800px] overflow-hidden max-md:h-[500px] max-sm:h-[350px]">
          <motion.img 
            src={heroBg} 
            alt="Okan Uckun - Tattoo Artist" 
            className="w-full h-full object-cover object-top" 
            initial={{ scale: 1.05 }} 
            whileInView={{ scale: 1 }} 
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }} 
            viewport={{ once: true }} 
          />
        </div>
      </ScrollReveal>

      {/* My Story Section */}
      <section className="box-border w-full px-[22.5px] py-[120px] max-md:px-5 max-md:py-[80px] max-sm:px-4 max-sm:py-[60px]">
        <div className="flex flex-col lg:flex-row gap-[100px] max-lg:gap-10">
          <ScrollReveal className="lg:w-[200px] shrink-0">
            <h2 className="text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase">
              My story
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="flex-1">
            <p className="text-[#323232] text-[36px] font-normal leading-[42px] tracking-[-0.5px] uppercase max-md:text-[26px] max-md:leading-8 max-sm:text-lg max-sm:leading-6">
              From the vibrant streets of Istanbul to the heart of New York City, Okan built his name through years of obsessive practice and a relentless eye for proportion, light, and restraint.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-[100px] mt-[60px] max-lg:gap-10">
          <div className="lg:w-[200px] shrink-0" />
          
          <div className="flex-1 flex flex-col lg:flex-row gap-[60px]">
            <div className="flex-1" />
            <ScrollReveal delay={0.3} className="lg:max-w-[450px]">
              <p className="text-[#888] text-[15px] font-normal leading-[18px] tracking-[-0.02px]">
                Okan's path has always been shaped by intention. Moving to New York took the same mindset he brings to tattooing now: earn trust, keep standards uncompromising, and let the work speak. He is a match for people who seek a rare standard in forming the perfect piece, knowing that a tattoo is not a purchase but a decision they will live with daily.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* First Large Image */}
      <ScrollReveal className="w-full">
        <div className="w-full h-[900px] overflow-hidden max-md:h-[600px] max-sm:h-[400px]">
          <motion.img 
            src={aboutImage1} 
            alt="Okan Uckun tattoo work" 
            className="w-full h-full object-cover" 
            whileHover={{ scale: 1.02 }} 
            transition={{ duration: 0.5 }} 
          />
        </div>
      </ScrollReveal>

      {/* My Approach Section */}
      <section className="box-border w-full px-[22.5px] py-[120px] max-md:px-5 max-md:py-[80px] max-sm:px-4 max-sm:py-[60px]">
        <div className="flex flex-col lg:flex-row gap-[100px] max-lg:gap-10">
          <ScrollReveal className="lg:w-[200px] shrink-0">
            <h2 className="text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase">
              My approach
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="flex-1">
            <p className="text-[#323232] text-[36px] font-normal leading-[42px] tracking-[-0.5px] uppercase max-md:text-[26px] max-md:leading-8 max-sm:text-lg max-sm:leading-6 max-w-[800px]">
              Every piece begins with a personal approach, blending technical mastery with artistic vision to create custom work that tells your story and stands the test of time.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-[100px] mt-[80px] max-lg:gap-10">
          <div className="lg:w-[200px] shrink-0" />
          
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[40px]">
              {approaches.map((approach, index) => (
                <ScrollReveal key={approach.number} delay={0.1 * index}>
                  <div className="flex flex-col gap-3">
                    <span className="text-[#BEBEBE] text-[14px] font-normal leading-[18px] tracking-[-0.02px]">
                      ({approach.number})
                    </span>
                    <p className="text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px]">
                      {approach.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two Images Grid */}
      <div className="w-full px-[22.5px] max-md:px-5 max-sm:px-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <ScrollReveal className="flex-1">
            <div className="h-[700px] overflow-hidden max-md:h-[450px] max-sm:h-[300px]">
              <motion.img 
                src={aboutImage2} 
                alt="Okan Uckun tattooing" 
                className="w-full h-full object-cover" 
                whileHover={{ scale: 1.02 }} 
                transition={{ duration: 0.5 }} 
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="flex-1">
            <div className="h-[700px] overflow-hidden max-md:h-[450px] max-sm:h-[300px]">
              <motion.img 
                src={aboutImage3} 
                alt="Okan Uckun studio" 
                className="w-full h-full object-cover" 
                whileHover={{ scale: 1.02 }} 
                transition={{ duration: 0.5 }} 
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Spacer before footer */}
      <div className="h-[120px] max-md:h-[80px] max-sm:h-[60px]" />

      <Footer />
    </motion.div>
  );
};

export default About;
