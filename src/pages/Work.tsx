import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Work: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 50-60 görsel için örnek data - kendi görsellerinizle değiştirin
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

  const handlePrev = useCallback(() => {
    setSelectedIndex(prev => prev > 0 ? prev - 1 : works.length - 1);
  }, [works.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex(prev => prev < works.length - 1 ? prev + 1 : 0);
  }, [works.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touchpad/Scroll navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;
    const threshold = 80;

    const handleWheel = (e: WheelEvent) => {
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
          handleNext();
          accumulatedDelta = 0;
        } else if (accumulatedDelta < -threshold) {
          setIsScrolling(true);
          handlePrev();
          accumulatedDelta = 0;
        }
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        accumulatedDelta = 0;
      }, 150);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleNext, handlePrev, isScrolling]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.95
    }),
    center: {
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.95
    })
  };

  // Sayfa numarası formatı: 01, 02, ... 50
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f5f5f5]"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f5]">
        <nav className="flex items-center justify-between h-[60px] px-6 max-sm:px-4">
          <Link to="/" className="text-[#323232] text-[14px] font-medium leading-5 tracking-[-0.02em] uppercase hover:opacity-70 transition-opacity">
            okan uckun
          </Link>
          
          <span className="text-[#888] text-[13px] font-normal leading-5 tracking-[-0.02em] uppercase max-sm:hidden">
            brooklyn, ny • {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
          
          <div className="flex items-center gap-6 max-md:hidden">
            <Link to="/work" className="text-[#323232] text-[14px] font-medium leading-5 tracking-[-0.02em] uppercase">
              work
            </Link>
            <Link to="/about" className="text-[#888] text-[14px] font-normal leading-5 tracking-[-0.02em] uppercase hover:text-[#323232] transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-[#888] text-[14px] font-normal leading-5 tracking-[-0.02em] uppercase hover:text-[#323232] transition-colors">
              Blog
            </Link>
          </div>
          
          <Link 
            to="/contact"
            className="text-[#323232] text-[14px] font-medium leading-5 tracking-[-0.02em] uppercase hover:opacity-70 transition-opacity max-md:hidden"
          >
            Get in touch
          </Link>
        </nav>
      </header>

      {/* Main Gallery - Two Column Layout */}
      <section 
        ref={containerRef}
        className="h-screen pt-[60px] flex"
      >
        {/* Left Side - Info & Thumbnails */}
        <div className="w-1/2 flex flex-col max-md:w-full">
          {/* WORK Title & Counter */}
          <div className="px-6 pt-8 max-sm:px-4">
            <div className="flex items-start gap-4 mb-6">
              <h1 className="text-[#323232] text-[80px] max-lg:text-[60px] max-sm:text-[48px] font-bold leading-[0.85] tracking-[-0.04em] uppercase">
                Work
              </h1>
              <span className="text-[#BEBEBE] text-[48px] max-lg:text-[36px] max-sm:text-[28px] font-light leading-[1] tracking-[-0.02em] mt-2">
                {formatNumber(selectedIndex + 1)}
              </span>
            </div>
            <p className="text-[#888] text-[13px] font-normal leading-[18px] tracking-[-0.01em] max-w-[320px] mb-8">
              Now based in Brooklyn, NY, working out of creative studios alongside some of the most respected artists in the industry.
            </p>
          </div>

          {/* Scrollable Thumbnails */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 max-sm:px-4">
            <div className="grid grid-cols-1 gap-3 max-w-[120px]">
              {works.map((work, index) => (
                <motion.button
                  key={work.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-full aspect-[4/5] overflow-hidden relative border-2 transition-all ${
                    selectedIndex === index 
                      ? 'border-[#323232]' 
                      : 'border-transparent hover:border-[#BEBEBE]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={work.src}
                    alt={`Work ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Large Image */}
        <div 
          className="w-1/2 relative flex items-center justify-center overflow-hidden max-md:fixed max-md:inset-0 max-md:w-full max-md:pt-[60px] max-md:z-30"
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full w-full flex items-center justify-center cursor-pointer"
            >
              <img
                src={works[selectedIndex]?.src}
                alt={`Work ${selectedIndex + 1}`}
                className="h-full w-full object-cover pointer-events-none select-none"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation hint - visible on desktop */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none max-md:hidden">
            <span className="text-[11px] font-normal tracking-[0.3px] uppercase text-white/70 bg-black/30 px-4 py-2 backdrop-blur-sm">
              Scroll to navigate • Click to enlarge
            </span>
          </div>

          {/* Mobile navigation arrows */}
          <div className="hidden max-md:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-4 z-10">
            <motion.button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <span className="text-white text-[14px] font-medium bg-black/30 px-3 py-1.5 backdrop-blur-sm">
              {selectedIndex + 1} / {works.length}
            </span>
            <motion.button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
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
              Press ESC to close
            </div>

            {/* Navigation in lightbox */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
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
              {selectedIndex + 1} / {works.length}
            </div>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={works[selectedIndex]?.src}
              alt="Fullscreen view"
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Below Fold Content */}
      <section className="py-20 px-6 max-sm:px-4 bg-white">
        <div className="max-w-[800px]">
          <h2 className="text-[#323232] text-[28px] font-medium leading-[1.2] tracking-[-0.03em] uppercase mb-4 max-sm:text-xl">
            Ready to collaborate?
          </h2>
          <p className="text-[#888] text-[14px] font-normal leading-[20px] mb-6">
            Let's create something meaningful together. Every piece is a unique collaboration.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-3 text-[#323232] text-[14px] font-medium uppercase tracking-[-0.02px] border border-[#EAEAEA] px-5 py-3 hover:bg-[#323232] hover:text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.2542 11.1268L13.0994 6.97194M17.2542 11.1268L13.0994 15.2816M17.2542 11.1268H4.5V2.8125" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Book an appointment
          </motion.a>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Work;
