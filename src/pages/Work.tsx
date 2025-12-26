import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

// Work images
import work01 from '@/assets/work/work-01.jpg';
import work02 from '@/assets/work/work-02.jpg';
import work03 from '@/assets/work/work-03.jpg';
import work04 from '@/assets/work/work-04.jpg';
import work05 from '@/assets/work/work-05.jpg';
import work06 from '@/assets/work/work-06.jpg';
import work07 from '@/assets/work/work-07.jpg';
import work08 from '@/assets/work/work-08.jpg';
import work09 from '@/assets/work/work-09.jpg';

const Work: React.FC = () => {
  const [currentPair, setCurrentPair] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Kendi fotoğraflarınız
  const works = [
    { id: 1, src: work01 },
    { id: 2, src: work02 },
    { id: 3, src: work03 },
    { id: 4, src: work04 },
    { id: 5, src: work05 },
    { id: 6, src: work06 },
    { id: 7, src: work07 },
    { id: 8, src: work08 },
    { id: 9, src: work09 },
  ];

  // İkili çiftler halinde görseller
  const totalPairs = Math.ceil(works.length / 2);

  const handlePrevPair = useCallback(() => {
    setCurrentPair(prev => prev > 0 ? prev - 1 : totalPairs - 1);
  }, [totalPairs]);

  const handleNextPair = useCallback(() => {
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
      if (lightboxOpen) return;
      
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
  }, [handleNextPair, handlePrevPair, isScrolling, lightboxOpen]);

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

  return (
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
                src={leftImage.src}
                alt={`Work ${leftImageIndex + 1}`}
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
                src={rightImage.src}
                alt={`Work ${rightImageIndex + 1}`}
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
        <span className="text-white/50 text-[11px] font-normal tracking-[0.3px] uppercase">
          Scroll to navigate
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

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={works[lightboxIndex]?.src}
              alt="Fullscreen view"
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Work;
