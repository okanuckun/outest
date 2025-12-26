import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';

const blogPosts = [
  {
    id: 1,
    title: "FOREARM TATTOOS: A PERFECT CANVAS FOR REALISM",
    category: "Inspiration",
    date: "May 18, 2025",
    description: "Forearm tattoos have surged in popularity as an ideal placement for both first-timers and seasoned collectors. In this guide, we explore why the forearm is a favorite canvas, especially for realism tattoos, covering design ideas, pain factors, and tips to plan your piece.",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "SLEEVE TATTOO IDEAS FOR MEN: INSPIRATION AND STYLES",
    category: "Inspiration",
    date: "July 29, 2025",
    description: "Full sleeve tattoos represent the ultimate commitment to body art. Discover the most popular styles, from traditional Japanese to hyper-realistic portraits, and learn how to plan your sleeve journey.",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "SKULL TATTOOS: SYMBOLISM AND DESIGN IDEAS",
    category: "Tattoo Styles",
    date: "May 17, 2025",
    description: "Skull tattoos carry deep symbolism across cultures. From mortality reminders to rebellion symbols, explore the rich history and modern interpretations of skull designs in tattooing.",
    image: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=1200&auto=format&fit=crop",
  },
];

const Blog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[22.5px] py-[18px] max-sm:px-4 max-sm:py-4">
        <Link to="/" className="text-[15px] font-normal tracking-[-0.15px] uppercase text-white hover:opacity-70 transition-opacity">
          okan uckun
        </Link>
        
        <div className="hidden md:flex items-center text-[15px] font-normal tracking-[-0.15px] uppercase text-white/80">
          <span>brooklyn, ny</span>
        </div>

        <div className="hidden md:flex items-center gap-[16px] text-[15px] font-normal tracking-[-0.15px] uppercase">
          <Link to="/work" className="text-white/80 hover:text-white transition-colors">work</Link>
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">about</Link>
          <Link to="/blog" className="text-white hover:text-white transition-colors">article</Link>
        </div>

        <Link 
          to="/contact" 
          className="text-[15px] font-normal tracking-[-0.15px] uppercase text-white hover:opacity-70 transition-opacity"
        >
          Book an appointment
        </Link>
      </nav>

      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${blogPosts[currentSlide].image})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-between px-[22.5px] pt-24 pb-10 max-sm:px-4">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <h1 className="text-[80px] md:text-[120px] lg:text-[160px] font-normal leading-none text-white tracking-tight">
              ARTICLE
            </h1>
            <span className="text-[80px] md:text-[120px] lg:text-[160px] font-light text-white/30">
              {blogPosts.length}
            </span>
          </div>

          {/* Bottom Content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white mb-4 leading-tight">
                    {blogPosts[currentSlide].title}
                  </h2>
                  <div className="flex items-center gap-2 text-white/60 text-[13px] font-normal">
                    <span>{blogPosts[currentSlide].category.toUpperCase()}</span>
                    <span>•</span>
                    <span>{blogPosts[currentSlide].date.toUpperCase()}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="max-w-md">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white/70 text-[13px] font-normal leading-relaxed mb-6"
                >
                  {blogPosts[currentSlide].description}
                </motion.p>
              </AnimatePresence>
              <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-white text-[13px] font-normal hover:bg-white/20 transition-colors">
                <span className="text-lg">↳</span>
                READ MORE
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {blogPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="bg-white text-black py-20 px-[22.5px] max-sm:px-4">
        {/* Filters */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-4 mb-12 justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <select className="bg-transparent border border-black/20 px-4 py-2 text-[13px] font-normal focus:outline-none">
                <option>Newest to oldest</option>
                <option>Oldest to newest</option>
                <option>Top picks</option>
              </select>
              <select className="bg-transparent border border-black/20 px-4 py-2 text-[13px] font-normal focus:outline-none">
                <option>All categories</option>
                <option>Inspiration</option>
                <option>Tattoo Styles</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <motion.article 
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden mb-4 aspect-[4/3]">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <h3 className="text-[15px] font-normal mb-2 group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-black/50 text-[13px] font-normal">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-[22.5px] max-sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="text-[15px] font-normal uppercase mb-2">okan uckun</h3>
            <p className="text-white/60 text-[13px] font-normal">Brooklyn, NY</p>
          </div>
          <div className="flex gap-8 text-[13px] font-normal">
            <Link to="/" className="hover:text-white/60 transition-colors">Work</Link>
            <Link to="/about" className="hover:text-white/60 transition-colors">About</Link>
            <Link to="/blog" className="hover:text-white/60 transition-colors">Article</Link>
            <Link to="/contact" className="hover:text-white/60 transition-colors">Contact</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-[13px] font-normal">
          © 2025 Okan Uckun. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Blog;
