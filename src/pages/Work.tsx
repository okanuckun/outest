import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Work: React.FC = () => {
  const [currentPair, setCurrentPair] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 50 görsel - kendi görsellerinizle değiştirin
  const works = [
    { id: 1, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&h=1500&fit=crop" },
    { id: 2, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=1200&h=1500&fit=crop" },
    { id: 3, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&h=1500&fit=crop" },
    { id: 4, src: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=1200&h=1500&fit=crop" },
    { id: 5, src: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=1200&h=1500&fit=crop" },
    { id: 6, src: "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=1200&h=1500&fit=crop" },
    { id: 7, src: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=1200&h=1500&fit=crop" },
    { id: 8, src: "https://images.unsplash.com/photo-1604941729725-15ef8f77f3b4?w=1200&h=1500&fit=crop" },
    { id: 9, src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=1200&h=1500&fit=crop" },
    { id: 10, src: "https://images.unsplash.com/photo-1594164803180-55a93b929ff5?w=1200&h=1500&fit=crop" },
    { id: 11, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&h=1500&fit=crop" },
    { id: 12, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=1200&h=1500&fit=crop" },
    { id: 13, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&h=1500&fit=crop" },
    { id: 14, src: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=1200&h=1500&fit=crop" },
    { id: 15, src: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=1200&h=1500&fit=crop" },
    { id: 16, src: "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=1200&h=1500&fit=crop" },
    { id: 17, src: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=1200&h=1500&fit=crop" },
    { id: 18, src: "https://images.unsplash.com/photo-1604941729725-15ef8f77f3b4?w=1200&h=1500&fit=crop" },
    { id: 19, src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=1200&h=1500&fit=crop" },
    { id: 20, src: "https://images.unsplash.com/photo-1594164803180-55a93b929ff5?w=1200&h=1500&fit=crop" },
    { id: 21, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&h=1500&fit=crop" },
    { id: 22, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=1200&h=1500&fit=crop" },
    { id: 23, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&h=1500&fit=crop" },
    { id: 24, src: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=1200&h=1500&fit=crop" },
    { id: 25, src: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=1200&h=1500&fit=crop" },
    { id: 26, src: "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=1200&h=1500&fit=crop" },
    { id: 27, src: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=1200&h=1500&fit=crop" },
    { id: 28, src: "https://images.unsplash.com/photo-1604941729725-15ef8f77f3b4?w=1200&h=1500&fit=crop" },
    { id: 29, src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=1200&h=1500&fit=crop" },
    { id: 30, src: "https://images.unsplash.com/photo-1594164803180-55a93b929ff5?w=1200&h=1500&fit=crop" },
    { id: 31, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&h=1500&fit=crop" },
    { id: 32, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=1200&h=1500&fit=crop" },
    { id: 33, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&h=1500&fit=crop" },
    { id: 34, src: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=1200&h=1500&fit=crop" },
    { id: 35, src: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=1200&h=1500&fit=crop" },
    { id: 36, src: "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=1200&h=1500&fit=crop" },
    { id: 37, src: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=1200&h=1500&fit=crop" },
    { id: 38, src: "https://images.unsplash.com/photo-1604941729725-15ef8f77f3b4?w=1200&h=1500&fit=crop" },
    { id: 39, src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=1200&h=1500&fit=crop" },
    { id: 40, src: "https://images.unsplash.com/photo-1594164803180-55a93b929ff5?w=1200&h=1500&fit=crop" },
    { id: 41, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&h=1500&fit=crop" },
    { id: 42, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=1200&h=1500&fit=crop" },
    { id: 43, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&h=1500&fit=crop" },
    { id: 44, src: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=1200&h=1500&fit=crop" },
    { id: 45, src: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=1200&h=1500&fit=crop" },
    { id: 46, src: "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=1200&h=1500&fit=crop" },
    { id: 47, src: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=1200&h=1500&fit=crop" },
    { id: 48, src: "https://images.unsplash.com/photo-1604941729725-15ef8f77f3b4?w=1200&h=1500&fit=crop" },
    { id: 49, src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=1200&h=1500&fit=crop" },
    { id: 50, src: "https://images.unsplash.com/photo-1594164803180-55a93b929ff5?w=1200&h=1500&fit=crop" },
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
      {/* Header - Overlay */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="flex items-center justify-between h-[60px] px-6 max-sm:px-4">
          <Link to="/" className="text-white text-[14px] font-medium leading-5 tracking-[-0.02em] uppercase hover:opacity-70 transition-opacity">
            okan uckun
          </Link>
          
          <span className="text-white/60 text-[13px] font-normal leading-5 tracking-[-0.02em] uppercase max-sm:hidden">
            brooklyn, ny
          </span>
          
          <div className="flex items-center gap-6 max-md:hidden">
            <Link to="/work" className="text-white text-[14px] font-medium leading-5 tracking-[-0.02em] uppercase">
              work
            </Link>
            <Link to="/about" className="text-white/60 text-[14px] font-normal leading-5 tracking-[-0.02em] uppercase hover:text-white transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-white/60 text-[14px] font-normal leading-5 tracking-[-0.02em] uppercase hover:text-white transition-colors">
              Blog
            </Link>
          </div>
          
          <Link 
            to="/contact"
            className="text-white text-[14px] font-medium leading-5 tracking-[-0.02em] uppercase hover:opacity-70 transition-opacity max-md:hidden"
          >
            Get in touch
          </Link>
        </nav>
      </header>

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
