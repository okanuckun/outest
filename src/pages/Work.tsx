import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Work: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [dragDirection, setDragDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'tattoo', label: 'Tattoo Design' },
    { id: 'collaboration', label: 'Collaboration' }
  ];

  const works = [
    { id: 1, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&h=1500&fit=crop", category: 'tattoo' },
    { id: 2, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=1200&h=1500&fit=crop", category: 'tattoo' },
    { id: 3, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&h=1500&fit=crop", category: 'tattoo' },
    { id: 4, src: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=1200&h=1500&fit=crop", category: 'collaboration' },
    { id: 5, src: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=1200&h=1500&fit=crop", category: 'tattoo' },
    { id: 6, src: "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=1200&h=1500&fit=crop", category: 'collaboration' },
    { id: 7, src: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=1200&h=1500&fit=crop", category: 'tattoo' },
    { id: 8, src: "https://images.unsplash.com/photo-1604941729725-15ef8f77f3b4?w=1200&h=1500&fit=crop", category: 'collaboration' },
    { id: 9, src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=1200&h=1500&fit=crop", category: 'tattoo' },
    { id: 10, src: "https://images.unsplash.com/photo-1594164803180-55a93b929ff5?w=1200&h=1500&fit=crop", category: 'collaboration' },
    { id: 11, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&h=1500&fit=crop", category: 'tattoo' },
    { id: 12, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=1200&h=1500&fit=crop", category: 'collaboration' },
  ];

  const filteredWorks = activeFilter === 'all' 
    ? works 
    : works.filter(work => work.category === activeFilter);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handlePrev = useCallback(() => {
    setDragDirection(1);
    setSelectedIndex(prev => prev > 0 ? prev - 1 : filteredWorks.length - 1);
  }, [filteredWorks.length]);

  const handleNext = useCallback(() => {
    setDragDirection(-1);
    setSelectedIndex(prev => prev < filteredWorks.length - 1 ? prev + 1 : 0);
  }, [filteredWorks.length]);

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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      // Swiped right - go to previous
      handlePrev();
    } else if (info.offset.x < -threshold) {
      // Swiped left - go to next
      handleNext();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#EAEAEA]">
        <nav className="flex items-center justify-between h-[60px] px-[22.5px] max-sm:px-4">
          <Link to="/" className="text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase hover:opacity-70 transition-opacity">
            okan uckun
          </Link>
          
          <span className="text-[#888] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase max-sm:hidden">
            brooklyn, ny
          </span>
          
          <div className="flex items-center gap-4 max-md:hidden">
            <Link to="/work" className="text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase">
              work
            </Link>
            <Link to="/about" className="text-[#888] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase hover:text-[#323232] transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-[#888] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase hover:text-[#323232] transition-colors">
              Blog
            </Link>
          </div>
          
          <Link 
            to="/contact"
            className="text-[#323232] text-[15px] font-normal leading-5 tracking-[-0.15px] uppercase hover:opacity-70 transition-opacity max-md:hidden"
          >
            Book an appointment
          </Link>
        </nav>
      </header>

      {/* Main Gallery - Full Viewport */}
      <section className="h-screen pt-[60px] flex">
        {/* Left Side - Info & Thumbnails */}
        <div className="w-[280px] max-lg:w-[200px] max-md:hidden flex flex-col border-r border-[#EAEAEA]">
          {/* Title & Count */}
          <div className="p-6 border-b border-[#EAEAEA]">
            <div className="flex items-end justify-between mb-4">
              <h1 className="text-[#323232] text-[32px] font-medium leading-[1] tracking-[-0.03em] uppercase">
                Work
              </h1>
              <span className="text-[#BEBEBE] text-[24px] font-medium leading-[1] tracking-[-0.03em]">
                {filteredWorks.length}
              </span>
            </div>
            <p className="text-[#888] text-[12px] font-normal leading-[16px] tracking-[-0.02px]">
              Tattoo designs and creative collaborations from Brooklyn, NY.
            </p>
          </div>

          {/* Category Filters */}
          <div className="p-4 border-b border-[#EAEAEA]">
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => {
                    setActiveFilter(cat.id);
                    setSelectedIndex(0);
                  }}
                  className={`text-[12px] font-medium tracking-[-0.02px] uppercase px-3 py-2 border text-left transition-colors ${
                    activeFilter === cat.id 
                      ? 'bg-[#323232] text-white border-[#323232]' 
                      : 'bg-transparent text-[#888] border-[#EAEAEA] hover:border-[#888]'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Scrollable Thumbnails */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredWorks.map((work, index) => (
              <motion.button
                key={work.id}
                onClick={() => handleThumbnailClick(index)}
                className={`w-full aspect-[4/5] overflow-hidden relative ${
                  selectedIndex === index ? 'ring-2 ring-[#323232]' : ''
                }`}
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={work.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {selectedIndex === index && (
                  <div className="absolute inset-0 bg-black/10" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side - Large Image with Drag */}
        <div className="flex-1 relative bg-[#f5f5f5] flex items-center justify-center overflow-hidden">
          {/* Drag hint */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="text-[11px] font-normal tracking-[0.3px] uppercase text-[#888] bg-white/80 px-3 py-1.5 backdrop-blur-sm">
              Drag to navigate
            </span>
          </div>

          <AnimatePresence mode="wait" custom={dragDirection}>
            <motion.div
              key={selectedIndex}
              custom={dragDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={filteredWorks[selectedIndex]?.src}
                alt={`Work ${selectedIndex + 1}`}
                className="h-full w-full object-contain pointer-events-none select-none"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Fullscreen hint */}
          <div className="absolute bottom-6 left-6 z-10">
            <motion.button
              onClick={() => setLightboxOpen(true)}
              className="text-[11px] font-normal tracking-[0.3px] uppercase text-[#888] bg-white/80 px-3 py-1.5 backdrop-blur-sm hover:bg-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Click for fullscreen
            </motion.button>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-10">
            <motion.button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white border border-[#EAEAEA] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <span className="text-[#323232] text-[13px] font-medium tracking-[-0.02px] min-w-[50px] text-center">
              {selectedIndex + 1} / {filteredWorks.length}
            </span>
            <motion.button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white border border-[#EAEAEA] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-6 left-6 z-10">
            <span className="text-[11px] font-medium tracking-[0.5px] uppercase px-3 py-1.5 bg-white/90 border border-[#EAEAEA] text-[#888]">
              {filteredWorks[selectedIndex]?.category === 'tattoo' ? 'Tattoo Design' : 'Collaboration'}
            </span>
          </div>
        </div>

        {/* Mobile: Bottom Thumbnails */}
        <div className="hidden max-md:flex fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAEAEA] p-3 gap-2 overflow-x-auto z-40">
          {filteredWorks.map((work, index) => (
            <motion.button
              key={work.id}
              onClick={() => handleThumbnailClick(index)}
              className={`w-16 h-20 flex-shrink-0 overflow-hidden ${
                selectedIndex === index ? 'ring-2 ring-[#323232]' : ''
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={work.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
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
              {selectedIndex + 1} / {filteredWorks.length}
            </div>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filteredWorks[selectedIndex]?.src}
              alt="Fullscreen view"
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Below Fold Content */}
      <section className="py-20 px-[22.5px] max-sm:px-4 border-t border-[#EAEAEA]">
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