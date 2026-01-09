import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GuestSpots from '@/components/GuestSpots';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import heroBg from '@/assets/okan-hero.webp';
import heroBgMobile from '@/assets/okan-hero-mobile.webp';

// Lazy load below-the-fold components
const ArtistSection = lazy(() => import('@/components/ArtistSection'));
const FeaturedWork = lazy(() => import('@/components/FeaturedWork'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const VideoSection = lazy(() => import('@/components/VideoSection'));

// Minimal loading fallback
const SectionFallback = () => <div className="min-h-[200px]" />;

// Wrapper that only renders children when visible
const LazySection: React.FC<{ children: React.ReactNode; minHeight?: string }> = ({ 
  children, 
  minHeight = '200px' 
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ 
    rootMargin: '200px',
    triggerOnce: true 
  });

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Okan Uckun Tattoo',
  description: 'Professional tattoo artist specializing in black and grey realism, portraits, and fine line work in New York City.',
  image: '/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US'
  },
  url: 'https://okanuckun.com',
  priceRange: '$$$'
};

const Index: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Okan Uckun | Tattoo Artist NYC - Black & Grey Realism"
        description="Okan Uckun is a renowned tattoo artist based in New York City, specializing in black and grey realism, portraits, and fine line work. Book your session today."
        keywords="tattoo artist NYC, black and grey tattoo, realism tattoo, portrait tattoo, fine line tattoo, New York tattoo artist, Okan Uckun"
        canonical="/"
        jsonLd={jsonLd}
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="box-border w-full min-h-screen relative overflow-x-hidden bg-black m-0 p-0"
      >
      {/* Hero Section with Background */}
      <div className="box-border w-full h-[100svh] relative m-0 p-0">
        {/* Background Image - Responsive with picture element */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet={heroBgMobile} type="image/webp" />
            <source media="(min-width: 769px)" srcSet={heroBg} type="image/webp" />
            <img
              src={heroBg}
              alt="Okan Uckun tattoo artist background"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col">
          <Navigation />
          <HeroSection />
          <GuestSpots />
        </div>
      </div>
      
      <main>
        {/* ArtistSection - load when scrolling near */}
        <LazySection minHeight="300px">
          <Suspense fallback={<SectionFallback />}>
            <ArtistSection />
          </Suspense>
        </LazySection>

        {/* FeaturedWork - load when scrolling near */}
        <LazySection minHeight="400px">
          <Suspense fallback={<SectionFallback />}>
            <FeaturedWork />
          </Suspense>
        </LazySection>

        {/* BlogSection - load when scrolling near */}
        <LazySection minHeight="300px">
          <Suspense fallback={<SectionFallback />}>
            <BlogSection />
          </Suspense>
        </LazySection>

        {/* VideoSection - load when scrolling near */}
        <LazySection minHeight="400px">
          <Suspense fallback={<SectionFallback />}>
            <VideoSection />
          </Suspense>
        </LazySection>
      </main>
      
      <Footer />
      </motion.div>
    </>
  );
};

export default Index;
