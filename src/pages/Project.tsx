import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Placeholder images for slider
const sliderImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop',
];

// Project items
const latestWork = [
  {
    id: 1,
    title: 'Diego',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'Darkness',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
  },
];

const Project: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Custom Navigation for light theme */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F5]">
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-sm font-medium text-black">hanssen</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/work" className="text-sm text-gray-600 hover:text-black transition-colors">Work</Link>
              <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">About</Link>
              <Link to="/blog" className="text-sm text-gray-600 hover:text-black transition-colors">Blog</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact</Link>
            </div>
          </div>
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-lg">✦</span>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
          {/* Left Side - Image Slider */}
          <div className="lg:w-[55%] relative bg-[#E8E4E0] overflow-hidden">
            <div className="relative h-[60vh] lg:h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={sliderImages[currentSlide]}
                  alt="Slider image"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {/* Slider Navigation */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                
                {/* Dots */}
                <div className="flex gap-2">
                  {sliderImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-black' : 'bg-black/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </div>

              {/* Selected Work Label */}
              <div className="absolute bottom-8 right-8 text-sm text-black/60">
                Selected Work
              </div>
            </div>
          </div>

          {/* Right Side - Profile & Latest Work */}
          <div className="lg:w-[45%] p-8 lg:p-12 flex flex-col">
            {/* Profile Section */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              <div className="flex-1">
                {/* Avatar & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-medium text-black">Ema Hanssen</h1>
                    <p className="text-sm text-gray-500">Photographer</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  I'm Ema, a photographer based in Prague. I capture authentic moments and tell stories through my images, blending creativity and emotion in each shot.
                </p>

                {/* Contact Button */}
                <button className="w-full bg-black text-white py-3 px-6 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-between">
                  <span>Contact Me</span>
                  <span>→</span>
                </button>
              </div>

              {/* Social Links */}
              <div className="lg:w-40 space-y-3">
                {[
                  { name: 'Instagram', icon: '📷' },
                  { name: 'Pinterest', icon: '📌' },
                  { name: 'Behance', icon: '🎨' },
                  { name: 'Twitter', icon: '🐦' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="flex items-center justify-between py-2 px-3 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-400 transition-colors"
                  >
                    <span>{social.name}</span>
                    <span>{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Latest Work Section */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-black">Latest Work</span>
                  <ChevronLeft className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                </div>
                <Link to="/work" className="text-sm text-gray-500 hover:text-black transition-colors">
                  View All
                </Link>
              </div>

              {/* Work Grid */}
              <div className="grid grid-cols-2 gap-4">
                {latestWork.map((work) => (
                  <motion.div
                    key={work.id}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white text-sm font-medium drop-shadow-lg">
                        {work.title}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Project;
