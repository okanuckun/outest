import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Footer from '@/components/Footer';

const Work: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'geometric', label: 'Geometric' },
    { id: 'minimalist', label: 'Minimalist' },
    { id: 'abstract', label: 'Abstract' },
    { id: 'blackwork', label: 'Blackwork' }
  ];

  const works = [
    { id: 1, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&h=1000&fit=crop", category: 'geometric' },
    { id: 2, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=800&h=1000&fit=crop", category: 'minimalist' },
    { id: 3, src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&h=1000&fit=crop", category: 'blackwork' },
    { id: 4, src: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&h=1000&fit=crop", category: 'abstract' },
    { id: 5, src: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=800&h=1000&fit=crop", category: 'geometric' },
    { id: 6, src: "https://images.unsplash.com/photo-1475823678248-624fc6f85785?w=800&h=1000&fit=crop", category: 'minimalist' },
    { id: 7, src: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&h=1000&fit=crop", category: 'blackwork' },
    { id: 8, src: "https://images.unsplash.com/photo-1604941729725-15ef8f77f3b4?w=800&h=1000&fit=crop", category: 'abstract' },
    { id: 9, src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=800&h=1000&fit=crop", category: 'geometric' },
    { id: 10, src: "https://images.unsplash.com/photo-1594164803180-55a93b929ff5?w=800&h=1000&fit=crop", category: 'minimalist' },
    { id: 11, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=900&h=1100&fit=crop", category: 'blackwork' },
    { id: 12, src: "https://images.unsplash.com/photo-1590246814883-57764ecdadef?w=900&h=1100&fit=crop", category: 'abstract' },
  ];

  const filteredWorks = activeFilter === 'all' 
    ? works 
    : works.filter(work => work.category === activeFilter);

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

      {/* Hero Section */}
      <section className="pt-[120px] pb-12 px-[22.5px] max-sm:px-4 max-sm:pt-[100px]">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <h1 className="text-[#323232] text-[clamp(36px,7vw,90px)] font-medium leading-[1] tracking-[-0.037em] uppercase">
              Portfolio
            </h1>
            <span className="text-[#BEBEBE] text-[clamp(24px,5vw,60px)] font-medium leading-[1] tracking-[-0.037em] uppercase">
              {filteredWorks.length}
            </span>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <p className="text-[#888] text-[14px] font-normal leading-[20px] tracking-[-0.02px] max-w-[500px] mb-10">
            A curated collection of minimalist and geometric tattoo work. Each piece represents a unique collaboration between artist and client.
          </p>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center gap-6 pb-6 border-b border-[#EAEAEA] overflow-x-auto">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`text-[13px] font-medium leading-[16px] tracking-[-0.02px] uppercase whitespace-nowrap transition-colors ${
                  activeFilter === cat.id 
                    ? 'text-[#323232]' 
                    : 'text-[#BEBEBE] hover:text-[#888]'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Gallery Grid */}
      <section className="px-[22.5px] pb-20 max-sm:px-4">
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-sm:gap-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(work.id)}
              >
                <motion.img
                  src={work.src}
                  alt={`Tattoo work ${work.id}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white text-[14px] font-medium uppercase tracking-wide hover:opacity-70 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close ✕
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={works.find(w => w.id === selectedImage)?.src}
              alt="Selected work"
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 px-[22.5px] max-sm:px-4 border-t border-[#EAEAEA]">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-[#323232] text-[28px] font-medium leading-[1.2] tracking-[-0.03em] uppercase mb-2 max-sm:text-xl">
                Ready to collaborate?
              </h2>
              <p className="text-[#888] text-[14px] font-normal leading-[20px]">
                Let's create something meaningful together.
              </p>
            </div>
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
        </ScrollReveal>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Work;