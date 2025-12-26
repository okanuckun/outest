import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ArtistSection from '@/components/ArtistSection';
import FeaturedWork from '@/components/FeaturedWork';
import BlogSection from '@/components/BlogSection';
import VideoSection from '@/components/VideoSection';
import PartnersTestimonials from '@/components/PartnersTestimonials';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="box-border w-full min-h-screen relative overflow-x-hidden bg-black m-0 p-0">
      {/* Hero Section with Background */}
      <div className="box-border w-full h-[1120px] relative m-0 p-0 max-md:h-[750px] max-sm:h-[520px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1920&h=1200&fit=crop"
            alt="Stevo tattoo artist background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10">
          <Navigation />
          <HeroSection />
        </div>
      </div>
      
      <main>
        <ArtistSection />
        <FeaturedWork />
        <BlogSection />
        <VideoSection />
        <PartnersTestimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
