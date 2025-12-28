import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, MapPin, Heart, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageTransition from '@/components/animations/PageTransition';

// Import images
import heroImage1 from '@/assets/work/DSC03538.jpg';
import heroImage2 from '@/assets/work/DSC00339.jpg';
import heroImage3 from '@/assets/work/glitch1.png';
import videoThumb from '@/assets/work/Group_351.jpg';
import artImage from '@/assets/work/uuh2.jpg';
import avatar1 from '@/assets/work/head1.jpg';
import avatar2 from '@/assets/work/dec2.jpg';
import projectImage1 from '@/assets/work/a1.jpg';
import projectImage2 from '@/assets/work/b1.jpg';
import projectImage3 from '@/assets/work/c3.jpg';

// Hero slider images
const heroImages = [heroImage1, heroImage2, heroImage3];

// Project cards data
const projectCards = [
  {
    id: 1,
    category: 'Current',
    title: 'Performance as a noise',
    image: videoThumb,
    hasVideo: true,
  },
  {
    id: 2,
    category: 'Art',
    title: 'Taschen: Dalí',
    subtitle: 'The paintings and bio.',
    image: artImage,
    accent: true,
  },
];

const latestPosts = [
  {
    id: 1,
    title: 'Flying allegedly comments on Gaslamp Killer',
    date: '12 Oct',
    avatar: avatar1,
  },
  {
    id: 2,
    title: "Tracing King Krule's devotio to the colour blue",
    date: '12 Oct',
    avatar: avatar2,
  },
];

const Project: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>

        <main>
          {/* Hero Section */}
          <section className="relative h-[70vh] overflow-hidden">
            {/* Background Image */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img
                src={heroImages[currentSlide]}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </motion.div>

            {/* Hero Content */}
            <div className="relative h-full flex">
              {/* Left Content */}
              <div className="flex-1 flex flex-col justify-end p-8 md:p-16">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-6xl md:text-8xl font-light text-white tracking-tight mb-8"
                >
                  Noise
                </motion.h1>

                {/* Slider Dots */}
                <div className="flex items-center gap-3">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-white w-6' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Info Cards */}
              <div className="hidden lg:flex flex-col justify-end gap-4 p-8 w-80">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                  <p className="text-xs text-white/60 mb-1">Voice</p>
                  <p className="text-sm text-white">Looking for my heart and kill for the headlight</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60 mb-1">FKS</p>
                    <p className="text-sm text-white">I understand my time is only for concentration.</p>
                  </div>
                  <div className="flex gap-2">
                    <Heart className="w-4 h-4 text-white/60" />
                    <MapPin className="w-4 h-4 text-white/60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </section>

          {/* Projects Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[50vh]">
            {/* Current Card - White */}
            <div className="bg-[#F5F5F5] p-8 flex flex-col justify-between min-h-[300px]">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Current</p>
                <h3 className="text-xl text-gray-900 font-medium leading-tight">
                  Performance<br />as a noise
                </h3>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Video Card */}
            <motion.div 
              className="relative min-h-[300px] overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={videoThumb}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#E85A3C] flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </button>
            </motion.div>

            {/* Art Card - Orange */}
            <div className="bg-[#E85A3C] p-8 flex flex-col min-h-[300px] relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-xs text-white/70 uppercase tracking-wider mb-4">Art</p>
                <h3 className="text-xl text-white font-medium mb-2">Taschen: Dalí</h3>
                <p className="text-sm text-white/70">The paintings and bio.</p>
              </div>
              {/* Background Image */}
              <div className="absolute bottom-0 right-0 w-full h-2/3">
                <img
                  src={artImage}
                  alt="Art"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E85A3C] via-transparent to-[#E85A3C]" />
              </div>
              <div className="absolute bottom-4 left-4 text-xs text-white/50">MIK*</div>
            </div>

            {/* Latest Card - Dark */}
            <div className="bg-[#1A1A1A] p-8 flex flex-col min-h-[300px]">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-6">Latest</p>
              <div className="space-y-6 flex-1">
                {latestPosts.map((post) => (
                  <motion.div 
                    key={post.id} 
                    className="flex gap-4 cursor-pointer group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={post.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-white group-hover:text-white/80 transition-colors leading-tight mb-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-white/40">{post.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Heart className="w-4 h-4 text-[#E85A3C]" />
                <MessageCircle className="w-4 h-4 text-white/40" />
                <span className="text-xs text-white/40 ml-auto">121</span>
              </div>
            </div>
          </section>

          {/* Additional Projects */}
          <section className="py-20 px-8 md:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-foreground">More Projects</h2>
                <Link to="/work" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[projectImage1, projectImage2, projectImage3].map((image, index) => (
                  <motion.article
                    key={index}
                    className="group cursor-pointer"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4">
                      <img
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg text-foreground mb-1">Project Title {index + 1}</h3>
                    <p className="text-sm text-foreground/50">Category</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Project;
