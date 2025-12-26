import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import aboutImage1 from '@/assets/about-image-1.webp';
import aboutImage2 from '@/assets/about-image-2.webp';
import aboutImage3 from '@/assets/about-image-3.webp';
import heroBg from '@/assets/hero-bg.jpg';

const About: React.FC = () => {
  const approaches = [
    { number: '01', text: 'Texture and depth always come first' },
    { number: '02', text: 'True realism comes from restraint' },
    { number: '03', text: 'Precision and patience guide every piece' },
    { number: '04', text: 'Placement drives the entire tattoo' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="box-border w-full min-h-screen relative overflow-x-hidden bg-white m-0 p-0"
    >
      {/* Navigation - Dark text version for white background */}
      <header className="box-border flex h-[79px] flex-col items-start shrink-0 self-stretch relative z-10 m-0 p-0">
        <nav className="box-border flex flex-col items-start self-stretch relative m-0 px-[22.5px] py-[27px] border-b-[#EAEAEA] border-b border-solid max-sm:px-4 max-sm:py-5">
          <div className="box-border h-6 self-stretch relative flex items-center justify-between m-0 p-0 max-md:flex-col max-md:gap-4 max-md:h-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="box-border inline-flex max-w-[1875px] flex-col items-start relative m-0 p-0"
            >
              <a href="/" className="box-border text-[#323232] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase m-0 p-0 hover:opacity-80 transition-opacity">
                Stevo tattoo
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="box-border inline-flex items-center gap-2 relative m-0 p-0 max-sm:hidden"
            >
              <span className="box-border text-[#323232] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase m-0 p-0">
                brooklyn, ny
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.375 7.875C11.375 5.942 9.80796 4.375 7.875 4.375C5.942 4.375 4.375 5.942 4.375 7.875C4.375 9.80796 5.942 11.375 7.875 11.375C9.80796 11.375 11.375 9.80796 11.375 7.875Z" fill="#323232"/>
              </svg>
              <span className="box-border text-[#323232] text-[19.3px] font-medium leading-5 tracking-[-0.202px] uppercase m-0 p-0">
                12:19 PM
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="box-border inline-flex items-center gap-[18px] relative m-0 p-0 max-md:hidden"
            >
              <a href="/work" className="text-[#888] text-[19.8px] font-medium leading-5 tracking-[-0.202px] uppercase hover:text-[#323232] transition-colors">
                work
              </a>
              <a href="/about" className="text-[#323232] text-[19.8px] font-medium leading-5 tracking-[-0.202px] uppercase">
                About
              </a>
              <a href="/blog" className="text-[#888] text-[19.8px] font-medium leading-5 tracking-[-0.202px] uppercase hover:text-[#323232] transition-colors">
                Blog
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="box-border inline-flex flex-col items-start relative m-0 pb-[3.8px] p-0 max-md:hidden"
            >
              <a href="/contact" className="text-[#323232] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase hover:opacity-80 transition-opacity">
                Get in touch
              </a>
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
                STEVEN BUGEJA
              </h1>
            </div>
            <div className="lg:max-w-[350px] lg:pt-[60px]">
              <p className="text-[#888] text-[17.4px] font-normal leading-[19.8px] tracking-[-0.027px]">
                Steven Bugeja, professionally known as Stevo, is an internationally recognized tattoo artist specializing in black and grey realism.
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
            alt="Steven Bugeja - Stevo Tattoo"
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
            <h2 className="text-[#323232] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase">
              My story
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="flex-1">
            <p className="text-[#323232] text-[39.4px] font-medium leading-[45px] tracking-[-0.607px] uppercase max-md:text-[28px] max-md:leading-8 max-sm:text-xl max-sm:leading-6">
              FROM A SMALL ISLAND IN MALTA TO THE HEART OF NEW YORK CITY, STEVO BUILT HIS NAME THE DISCIPLINED WAY YEARS OF OBSESSIVE PRACTICE AND A RELENTLESS EYE FOR PROPORTION, LIGHT, AND RESTRAINT.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-[100px] mt-[60px] max-lg:gap-10">
          <div className="lg:w-[200px] shrink-0" />
          
          <div className="flex-1 flex flex-col lg:flex-row gap-[60px]">
            <div className="flex-1" />
            <ScrollReveal delay={0.3} className="lg:max-w-[450px]">
              <p className="text-[#888] text-[17.4px] font-normal leading-[19.8px] tracking-[-0.027px]">
                Stevo's path has always been shaped by intention. Leaving Malta to build a life in New York took the same mindset he brings to tattooing now: earn trust, keep standards uncompromising, and let the work speak. He is a match for people who seek a rare standard in forming the perfect piece, knowing that a tattoo is not a purchase but a decision they will live with daily
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
            alt="Stevo tattoo work"
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
            <h2 className="text-[#323232] text-[19.7px] font-medium leading-5 tracking-[-0.202px] uppercase">
              My aPPROACH
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="flex-1">
            <p className="text-[#323232] text-[39.4px] font-medium leading-[45px] tracking-[-0.607px] uppercase max-md:text-[28px] max-md:leading-8 max-sm:text-xl max-sm:leading-6 max-w-[800px]">
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
                    <span className="text-[#BEBEBE] text-[17.4px] font-normal leading-[19.8px] tracking-[-0.027px]">
                      ({approach.number})
                    </span>
                    <p className="text-[#323232] text-[19.7px] font-medium leading-5 tracking-[-0.202px]">
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
                alt="Stevo tattooing"
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
                alt="Stevo studio"
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
