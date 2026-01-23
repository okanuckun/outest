import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface PortfolioImage {
  id: string;
  storage_path: string;
  url: string;
  display_order: number;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Okan Uckun Tattoo Portfolio',
  description: 'Explore the tattoo portfolio of Okan Uckun featuring black and grey realism, portraits, and fine line work.',
  url: 'https://okanuckun.com/work'
};

const Work: React.FC = () => {
  const [currentPair, setCurrentPair] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [works, setWorks] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload images for smoother transitions
  const preloadImage = useCallback((url: string) => {
    const img = new Image();
    img.src = url;
  }, []);

  // Fetch portfolio images from database
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('portfolio_images')
          .select('*')
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        const imageList: PortfolioImage[] = (data || []).map(img => ({
          id: img.id,
          storage_path: img.storage_path,
          url: supabase.storage.from('portfolio').getPublicUrl(img.storage_path).data.publicUrl,
          display_order: img.display_order,
        }));

        setWorks(imageList);

        // Preload first 6 images for instant display
        imageList.slice(0, 6).forEach(img => preloadImage(img.url));
      } catch (error) {
        console.error('Error fetching portfolio images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [preloadImage]);

  // İkili çiftler halinde görseller
  const totalPairs = Math.ceil(works.length / 2);

  // Preload adjacent pairs when navigating
  useEffect(() => {
    if (works.length === 0 || totalPairs === 0) return;
    
    // Preload next pair
    const nextPair = (currentPair + 1) % totalPairs;
    const nextLeft = works[nextPair * 2];
    const nextRight = works[nextPair * 2 + 1];
    if (nextLeft) preloadImage(nextLeft.url);
    if (nextRight) preloadImage(nextRight.url);

    // Preload previous pair
    const prevPair = currentPair > 0 ? currentPair - 1 : totalPairs - 1;
    const prevLeft = works[prevPair * 2];
    const prevRight = works[prevPair * 2 + 1];
    if (prevLeft) preloadImage(prevLeft.url);
    if (prevRight) preloadImage(prevRight.url);
  }, [currentPair, works, totalPairs, preloadImage]);

  const handlePrevPair = useCallback(() => {
    if (totalPairs === 0) return;
    setCurrentPair(prev => prev > 0 ? prev - 1 : totalPairs - 1);
  }, [totalPairs]);

  const handleNextPair = useCallback(() => {
    if (totalPairs === 0) return;
    setCurrentPair(prev => prev < totalPairs - 1 ? prev + 1 : 0);
  }, [totalPairs]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          setLightboxIndex(prev => prev > 0 ? prev - 1 : works.length - 1);
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex(prev => prev < works.length - 1 ? prev + 1 : 0);
        } else if (e.key === 'Escape') {
          setLightboxOpen(false);
        }
      } else {
        if (e.key === 'ArrowLeft') {
          handlePrevPair();
        } else if (e.key === 'ArrowRight') {
          handleNextPair();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevPair, handleNextPair, lightboxOpen, works.length]);

  // Touchpad/Scroll navigation - sayfa üzerinde her yerde çalışır
  useEffect(() => {
    let accumulatedDelta = 0;
    const threshold = 60;

    const handleWheel = (e: WheelEvent) => {
      if (lightboxOpen || works.length === 0) return;
      
      e.preventDefault();
      
      // Use deltaX for horizontal scroll, fallback to deltaY
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      accumulatedDelta += delta;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      if (!isScrolling) {
        if (accumulatedDelta > threshold) {
          setIsScrolling(true);
          handleNextPair();
          accumulatedDelta = 0;
        } else if (accumulatedDelta < -threshold) {
          setIsScrolling(true);
          handlePrevPair();
          accumulatedDelta = 0;
        }
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        accumulatedDelta = 0;
      }, 150);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleNextPair, handlePrevPair, isScrolling, lightboxOpen, works.length]);

  // Touch/Swipe navigation for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Only process if there was actual movement
      if (touchEndX === 0 && touchEndY === 0) return;

      // Check if horizontal swipe is dominant
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            // Swipe right - go to previous
            if (lightboxOpen) {
              setLightboxIndex(prev => prev > 0 ? prev - 1 : works.length - 1);
            } else {
              handlePrevPair();
            }
          } else {
            // Swipe left - go to next
            if (lightboxOpen) {
              setLightboxIndex(prev => prev < works.length - 1 ? prev + 1 : 0);
            } else {
              handleNextPair();
            }
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            // Swipe down - go to previous
            if (lightboxOpen) {
              setLightboxIndex(prev => prev > 0 ? prev - 1 : works.length - 1);
            } else {
              handlePrevPair();
            }
          } else {
            // Swipe up - go to next
            if (lightboxOpen) {
              setLightboxIndex(prev => prev < works.length - 1 ? prev + 1 : 0);
            } else {
              handleNextPair();
            }
          }
        }
      }

      // Reset values
      touchStartX = 0;
      touchStartY = 0;
      touchEndX = 0;
      touchEndY = 0;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNextPair, handlePrevPair, lightboxOpen, works.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Mevcut çiftteki görseller
  const leftImageIndex = currentPair * 2;
  const rightImageIndex = currentPair * 2 + 1;
  const leftImage = works[leftImageIndex];
  const rightImage = works[rightImageIndex];

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.98
    },
    center: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.98
    }
  };

  // Loading state with skeleton
  if (loading) {
    return (
      <>
        <SEOHead
          title="Work | Okan Uckun Tattoo Portfolio NYC"
          description="Explore the tattoo portfolio of Okan Uckun featuring black and grey realism, portraits, geometric designs, and fine line work in New York City. Browse through our collection of unique custom tattoo designs created with precision and artistic excellence."
          keywords="tattoo portfolio, black and grey tattoo, realism tattoo gallery, NYC tattoo work, Okan Uckun portfolio"
          ogTitle="Tattoo Portfolio | Okan Uckun NYC"
          ogDescription="Explore Okan Uckun's tattoo portfolio featuring black & grey realism, geometric designs, and fine line work. NYC's premier tattoo artist."
          ogImage="https://outest.lovable.app/og-image.jpg"
          canonical="https://outest.lovable.app/work"
          jsonLd={jsonLd}
        />
        <div className="h-screen w-screen overflow-hidden bg-black">
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navigation />
          </div>
          <div className="h-full w-full flex">
            {/* Left skeleton */}
            <div className="w-1/2 h-full relative max-md:w-full">
              <Skeleton className="w-full h-full bg-white/5" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none" />
            </div>
            {/* Right skeleton - hidden on mobile */}
            <div className="w-1/2 h-full relative max-md:hidden">
              <Skeleton className="w-full h-full bg-white/5" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>
          {/* Counter skeleton */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
            <Skeleton className="w-12 h-4 bg-white/10" />
            <Skeleton className="w-24 h-3 bg-white/5" />
          </div>
        </div>
      </>
    );
  }

  // Empty state
  if (works.length === 0) {
    return (
      <>
        <SEOHead
          title="Work | Okan Uckun Tattoo Portfolio NYC"
          description="Explore the tattoo portfolio of Okan Uckun featuring black and grey realism, portraits, geometric designs, and fine line work in New York City. Browse through our collection of unique custom tattoo designs created with precision and artistic excellence."
          keywords="tattoo portfolio, black and grey tattoo, realism tattoo gallery, NYC tattoo work, Okan Uckun portfolio"
          ogTitle="Tattoo Portfolio | Okan Uckun NYC"
          ogDescription="Explore Okan Uckun's tattoo portfolio featuring black & grey realism, geometric designs, and fine line work. NYC's premier tattoo artist."
          ogImage="https://outest.lovable.app/og-image.jpg"
          canonical="https://outest.lovable.app/work"
          jsonLd={jsonLd}
        />
        <div className="h-screen w-screen overflow-hidden bg-black flex items-center justify-center">
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navigation />
          </div>
          <p className="text-white/50 text-lg">No works available yet</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Work | Okan Uckun Tattoo Portfolio NYC"
        description="Explore the tattoo portfolio of Okan Uckun featuring black and grey realism, portraits, geometric designs, and fine line work in New York City. Browse through our collection of unique custom tattoo designs created with precision and artistic excellence."
        keywords="tattoo portfolio, black and grey tattoo, realism tattoo gallery, NYC tattoo work, Okan Uckun portfolio"
        ogTitle="Tattoo Portfolio | Okan Uckun NYC"
        ogDescription="Explore Okan Uckun's tattoo portfolio featuring black & grey realism, geometric designs, and fine line work. NYC's premier tattoo artist."
        ogImage="https://outest.lovable.app/og-image.jpg"
        canonical="https://outest.lovable.app/work"
        jsonLd={jsonLd}
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen w-screen overflow-hidden bg-black"
        ref={containerRef}
      >
      {/* Header - Using shared Navigation component */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation />
      </div>

      {/* Two Image Gallery */}
      <div className="h-full w-full flex">
        {/* Left Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`left-${currentPair}`}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-1/2 h-full relative cursor-pointer max-md:w-full"
            onClick={() => leftImage && openLightbox(leftImageIndex)}
          >
            {leftImage && (
              <img
                src={leftImage.url}
                alt={`Tattoo work ${leftImageIndex + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            )}
            {/* Gradient overlay for header readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Right Image - Hidden on mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`right-${currentPair}`}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
            className="w-1/2 h-full relative cursor-pointer max-md:hidden"
            onClick={() => rightImage && openLightbox(rightImageIndex)}
          >
            {rightImage && (
              <img
                src={rightImage.url}
                alt={`Tattoo work ${rightImageIndex + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            )}
            {/* Gradient overlay for header readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Counter & Navigation hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
        <span className="text-white text-[14px] font-medium tracking-[-0.02em]">
          {currentPair + 1} / {totalPairs}
        </span>
        <span className="text-white/50 text-[11px] font-normal tracking-[0.3px] uppercase max-md:hidden">
          Scroll to navigate
        </span>
        <span className="text-white/50 text-[11px] font-normal tracking-[0.3px] uppercase md:hidden">
          Swipe to navigate
        </span>
      </div>

      {/* Navigation Arrows */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 max-sm:hidden">
        <motion.button
          onClick={handlePrevPair}
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        <motion.button
          onClick={handleNextPair}
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 text-white text-[14px] font-medium uppercase tracking-wide hover:opacity-70 transition-opacity z-10"
              onClick={() => setLightboxOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close ✕
            </motion.button>

            {/* ESC hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[12px] font-normal uppercase tracking-wide">
              Press ESC to close • Use arrows to navigate
            </div>

            {/* Navigation in lightbox */}
            <motion.button
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex(prev => prev > 0 ? prev - 1 : works.length - 1);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex(prev => prev < works.length - 1 ? prev + 1 : 0);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white text-[14px] font-medium tracking-[-0.02px]">
              {lightboxIndex + 1} / {works.length}
            </div>

            {/* Image with blur→sharp transition */}
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.95, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              src={works[lightboxIndex]?.url}
              alt="Fullscreen view"
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Work;
