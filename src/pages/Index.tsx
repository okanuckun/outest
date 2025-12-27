import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ArtistSection from '@/components/ArtistSection';
import FeaturedWork from '@/components/FeaturedWork';
import BlogSection from '@/components/BlogSection';
import VideoSection from '@/components/VideoSection';
import Footer from '@/components/Footer';
import heroBg from '@/assets/hero-bg.jpg';

const Index: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="box-border w-full min-h-screen relative overflow-x-hidden bg-black m-0 p-0"
    >
      {/* Hero Section with Background */}
      <div className="box-border w-full h-[100svh] relative m-0 p-0">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={heroBg}
            alt="Okan Uckun tattoo artist background"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <div className="relative z-10 flex h-full flex-col">
          <Navigation />
          <HeroSection />
        </div>
      </div>
      
      <main>
        <ArtistSection />
        <FeaturedWork />
        <BlogSection />
        <VideoSection />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
