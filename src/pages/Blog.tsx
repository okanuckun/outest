import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

import blogImage1 from '@/assets/work/Group_354.jpg';
import blogImage2 from '@/assets/work/head1.jpg';
import blogImage3 from '@/assets/work/Group_261.jpg';

const blogPosts = [
  {
    id: 1,
    title: "FOREARM TATTOOS: A PERFECT CANVAS FOR REALISM",
    category: "Inspiration",
    date: "May 18, 2025",
    description: "Forearm tattoos have surged in popularity as an ideal placement for both first-timers and seasoned collectors. In this guide, we explore why the forearm is a favorite canvas, especially for realism tattoos, covering design ideas, pain factors, and tips to plan your piece.",
    image: blogImage1,
  },
  {
    id: 2,
    title: "SLEEVE TATTOO IDEAS FOR MEN: INSPIRATION AND STYLES",
    category: "Inspiration",
    date: "July 29, 2025",
    description: "Full sleeve tattoos represent the ultimate commitment to body art. Discover the most popular styles, from traditional Japanese to hyper-realistic portraits, and learn how to plan your sleeve journey.",
    image: blogImage2,
  },
  {
    id: 3,
    title: "SKULL TATTOOS: SYMBOLISM AND DESIGN IDEAS",
    category: "Tattoo Styles",
    date: "May 17, 2025",
    description: "Skull tattoos carry deep symbolism across cultures. From mortality reminders to rebellion symbols, explore the rich history and modern interpretations of skull designs in tattooing.",
    image: blogImage3,
  },
];

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation />
      </div>

      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images - Crossfade */}
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={false}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
            style={{ zIndex: currentSlide === index ? 1 : 0 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-[22.5px] pb-16 max-sm:px-4">
          {/* Featured Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 max-w-3xl"
            >
              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-background text-foreground px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
                  {blogPosts[currentSlide].category}
                </span>
                <span className="text-primary-foreground/60 text-[12px] tracking-wide">
                  {blogPosts[currentSlide].date.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-normal text-white mb-6 leading-tight tracking-tight">
                {blogPosts[currentSlide].title}
              </h2>

              {/* Description */}
              <p className="text-white/70 text-[14px] font-normal leading-relaxed mb-8 max-w-2xl">
                {blogPosts[currentSlide].description}
              </p>

              {/* Read More Button */}
              <button className="group flex items-center gap-3 text-white text-[13px] font-medium tracking-wide hover:gap-4 transition-all">
                READ ARTICLE
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-16 right-[22.5px] z-20 flex gap-3 max-sm:right-4">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-12' : 'bg-white/30 w-6 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="bg-background text-foreground py-20 px-[22.5px] max-sm:px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-normal leading-none tracking-tight mb-12">
            All Articles
          </h2>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-between items-center border-t border-b border-foreground/20 py-4 mb-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-6 md:gap-10">
              {['ALL', 'TATTOOS', 'EDUCATION', 'CULTURE'].map((tab, index) => (
                <button
                  key={tab}
                  className="flex items-center gap-2 text-[13px] font-normal tracking-wide hover:opacity-70 transition-opacity"
                >
                  <span className={`w-4 h-4 rounded-full border border-foreground flex items-center justify-center ${index === 0 ? 'bg-foreground' : ''}`}>
                    {index === 0 && <span className="w-2 h-2 rounded-full bg-foreground" />}
                  </span>
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-[13px] font-normal mt-4 md:mt-0">
              <span className="text-muted-foreground">SORT BY:</span>
              <button className="flex items-center gap-1 font-medium">
                LATEST
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-0.5">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Results Count */}
        <ScrollReveal delay={0.15}>
          <p className="text-[12px] font-normal text-muted-foreground tracking-wide mb-8">
            SHOWING <span className="text-foreground font-medium">{blogPosts.length}</span> OF <span className="text-foreground font-medium">{blogPosts.length}</span> RESULTS
          </p>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <motion.article 
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden mb-4 aspect-[4/5]">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                {/* Meta Info */}
                <div className="flex items-center justify-between text-[11px] font-normal tracking-wide text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <span className="uppercase">{post.category}</span>
                    <span>•</span>
                    <span className="uppercase">{post.date}</span>
                  </div>
                  <span>5 MIN READ</span>
                </div>
                {/* Title */}
                <h3 className="text-[16px] md:text-[18px] font-normal leading-snug group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
