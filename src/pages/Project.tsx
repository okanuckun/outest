import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageTransition from '@/components/animations/PageTransition';
import SEOHead from '@/components/SEOHead';

// Import images
import heroImage1 from '@/assets/work/DSC03538.jpg';
import heroImage2 from '@/assets/work/DSC00339.jpg';
import heroImage3 from '@/assets/work/glitch1.png';
import videoThumb from '@/assets/work/Group_351.jpg';
import artImage from '@/assets/work/uuh2.jpg';
import projectImage1 from '@/assets/work/a1.jpg';
import projectImage2 from '@/assets/work/b1.jpg';
import projectImage3 from '@/assets/work/c3.jpg';
import DAGSIRT from '@/assets/work/DAGSIRT.jpg';
import IMG_1636 from '@/assets/work/IMG_1636.jpg';
import IMG_1727 from '@/assets/work/IMG_1727.jpg';
import Group_354 from '@/assets/work/Group_354.jpg';
import Group_240 from '@/assets/work/Group_240.jpg';
import d4 from '@/assets/work/d4.jpg';
import head1 from '@/assets/work/head1.jpg';

// Project data with multiple images for hover gallery
const projects = [
  {
    id: 1,
    title: 'Noise Performance',
    category: 'Live Art',
    year: '2024',
    location: 'Istanbul',
    images: [heroImage1, heroImage2, heroImage3],
  },
  {
    id: 2,
    title: 'Digital Abstractions',
    category: 'Digital Art',
    year: '2024',
    location: 'Berlin',
    images: [videoThumb, Group_354, Group_240],
  },
  {
    id: 3,
    title: 'Taschen: Dalí',
    category: 'Editorial',
    year: '2023',
    location: 'Barcelona',
    images: [artImage, d4, head1],
  },
  {
    id: 4,
    title: 'Urban Fragments',
    category: 'Photography',
    year: '2023',
    location: 'Tokyo',
    images: [projectImage1, projectImage2, projectImage3],
  },
  {
    id: 5,
    title: 'Mountain Series',
    category: 'Landscape',
    year: '2023',
    location: 'Alps',
    images: [DAGSIRT, IMG_1636, IMG_1727],
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered && project.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 1500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, project.images.length]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full h-screen cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        {project.images.map((image, imgIndex) => (
          <motion.img
            key={imgIndex}
            src={image}
            alt={`${project.title} ${imgIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: imgIndex === currentImageIndex ? 1 : 0,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: 'easeInOut' },
              scale: { duration: 8, ease: 'linear' }
            }}
          />
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-16 lg:p-24">
        {/* Category & Year */}
        <motion.div 
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-white/60 text-xs uppercase tracking-[0.2em] font-medium">
            {project.category}
          </span>
          <span className="w-8 h-px bg-white/30" />
          <span className="text-white/60 text-xs uppercase tracking-[0.2em]">
            {project.year}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.title}
        </motion.h2>

        {/* Location & Image Counter */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="text-white/50 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {project.location}
          </span>

          {/* Image Dots Indicator */}
          <div className="flex items-center gap-2">
            {project.images.map((_, imgIndex) => (
              <span
                key={imgIndex}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  imgIndex === currentImageIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Hover Hint */}
        <motion.div
          className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 text-white/60">
            <span className="text-xs uppercase tracking-wider">View Project</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Project Number */}
      <div className="absolute top-8 md:top-16 lg:top-24 left-8 md:left-16 lg:left-24">
        <span className="text-white/20 text-8xl md:text-9xl font-light">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.article>
  );
};

const Project: React.FC = () => {
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects by Okan Uckun',
    description: 'Explore the artistic projects and creative works by Okan Uckun, including live art performances, digital art, editorial work, and photography.',
    url: 'https://okanuckun.com/project',
    author: {
      '@type': 'Person',
      name: 'Okan Uckun',
      jobTitle: 'Tattoo Artist',
      url: 'https://okanuckun.com'
    }
  };

  return (
    <PageTransition>
      <SEOHead
        title="Projects | Okan Uckun - Creative Works & Art Projects"
        description="Explore the artistic projects and creative works by Okan Uckun. From live art performances to digital abstractions, editorial work, and photography collections."
        keywords="Okan Uckun projects, art projects, live art, digital art, editorial, photography, creative works, tattoo artist portfolio"
        canonical="/project"
        jsonLd={projectJsonLd}
      />
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>

        <main>
          {/* Projects - Full Screen Vertical Scroll */}
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Project;
