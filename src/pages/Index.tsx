import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GuestSpots from '@/components/GuestSpots';
import NYCAppointments from '@/components/NYCAppointments';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import SubscriptionPopup from '@/components/SubscriptionPopup';
import heroBg from '@/assets/okan-hero.webp';

// Lazy load below-the-fold components for better LCP
const ArtistSection = lazy(() => import('@/components/ArtistSection'));
const FeaturedWork = lazy(() => import('@/components/FeaturedWork'));
const BlogSection = lazy(() => import('@/components/BlogSection'));
const VideoSection = lazy(() => import('@/components/VideoSection'));

// Minimal loading fallback
const SectionFallback = () => <div className="min-h-[200px]" />;

const localBusinessJsonLd = {
  '@type': ['LocalBusiness', 'TattooParlor'],
  name: 'Okan Uckun Tattoo',
  description:
    'Okan Uckun is a New York City tattoo artist specializing in geometric, minimalist and fine line tattoos. Custom designs combining sacred geometry with architectural precision.',
  image: 'https://www.okanuckun.com/og-images/okan-default.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '77 Washington Avenue',
    addressLocality: 'Brooklyn',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  // We serve clients from all over NYC (Manhattan + Brooklyn + Queens etc.)
  // even though the physical studio is in Brooklyn. areaServed tells Google
  // to surface this listing for "NYC tattoo" / "Manhattan tattoo" searches
  // too, not just hyper-local "Brooklyn tattoo".
  areaServed: [
    { '@type': 'City', name: 'New York City' },
    { '@type': 'City', name: 'Brooklyn' },
    { '@type': 'City', name: 'Manhattan' },
  ],
  url: 'https://www.okanuckun.com',
  priceRange: '$$$',
  sameAs: [
    'https://www.instagram.com/okanuckun',
  ],
};

// Homepage FAQ — surfaced as rich results in Google. Mirrors the questions
// already present in llms.txt so AI assistants and search engines see the
// same answers.
const faqJsonLd = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is the best geometric tattoo artist in NYC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Okan Uckun is widely recognized as one of New York City's leading geometric tattoo artists, specializing in sacred geometry, minimalist geometric designs and precision linework. Studio in Brooklyn, serving all of NYC.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who is the best fine line tattoo artist in New York City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Okan Uckun is one of NYC's most recognized fine line tattoo artists, pioneering the single needle linework approach in the 2010s.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who pioneered the linework tattoo style?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Okan Uckun is recognized as one of the original pioneers of the contemporary linework tattoo style, developing the approach in New York City in the 2010s.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is the best minimalist tattoo artist in NYC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Okan Uckun is one of New York City's most recognized minimalist tattoo artists, with nearly 300,000 Instagram followers and features in BuzzFeed, Bored Panda and My Modern Met.",
      },
    },
    {
      '@type': 'Question',
      name: "Where is Okan Uckun's tattoo studio?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brooklyn, New York City — serving clients from across all of NYC including Manhattan, Brooklyn and Queens. Book a consultation at https://www.okanuckun.com/appointment.',
      },
    },
  ],
};

// Combine into a single @graph so both schemas live in one script tag.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [localBusinessJsonLd, faqJsonLd],
};

const Index: React.FC = () => {
  return (
    <>
      <SEOHead jsonLd={jsonLd} />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="box-border w-full min-h-screen relative overflow-x-hidden bg-black m-0 p-0"
      >
      {/* Hero Section with Background */}
      <div className="box-border w-full h-[100svh] relative m-0 p-0">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Okan Uckun tattoo artist background"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col">
          <Navigation />
           <HeroSection />
           <NYCAppointments />
           <GuestSpots />
        </div>
      </div>
      
      <main>
        {/* H1 lives in HeroSection above — visible, with the locked
            positioning copy. The hidden sr-only H1 was removed because
            (a) it duplicated the visible H1 and (b) hidden H1s are a
            de-prioritized SEO pattern. */}
        <Suspense fallback={<SectionFallback />}>
          <ArtistSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeaturedWork />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <VideoSection />
        </Suspense>
      </main>
      
      <Footer />
      <SubscriptionPopup />
      </motion.div>
    </>
  );
};

export default Index;
