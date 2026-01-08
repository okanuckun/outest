import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageTransition from '@/components/animations/PageTransition';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

// Import work images for project cards
import work01 from '@/assets/work/work-01.webp';
import work02 from '@/assets/work/work-02.webp';
import work03 from '@/assets/work/work-03.webp';
import DAGSIRT from '@/assets/work/DAGSIRT.jpg';
import DSC00339 from '@/assets/work/DSC00339.jpg';
import DSC03538 from '@/assets/work/DSC03538.jpg';
import Group_240 from '@/assets/work/Group_240.jpg';
import Group_261 from '@/assets/work/Group_261.jpg';
import Group_315 from '@/assets/work/Group_315.jpg';
import a1 from '@/assets/work/a1.jpg';
import b1 from '@/assets/work/b1.jpg';
import c3 from '@/assets/work/c3.jpg';
import head1 from '@/assets/work/head1.jpg';
import dec2 from '@/assets/work/dec2.jpg';
import d4 from '@/assets/work/d4.jpg';

// Image mapping for projects
const projectImages: Record<string, string[]> = {
  '2723cad7-e152-4c07-a772-e9ba31907d4d': [work01, work02, work03],
  '8b7ebcd8-f647-4087-82ef-771ecedf17f1': [DAGSIRT, DSC00339, DSC03538],
  '5f92bde4-e990-46d7-adde-826a9ba6e05b': [Group_240, Group_261, Group_315],
  'e61469d6-3b2e-4122-a145-d498da1c0cd5': [a1, b1, c3],
  '0675b4c1-e6b1-46b1-9a29-d681099f4e3f': [head1, dec2, d4],
};

interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  year: string | null;
  location: string | null;
  images: string[] | null;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Use mapped images or fallback to database images
  const images = projectImages[project.id] || project.images || [];

  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3500);
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
  }, [isHovered, images.length]);

  if (images.length === 0) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full h-screen cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((image, imgIndex) => (
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
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 lg:p-24">
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
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {project.title}
        </motion.h2>

        {/* Description */}
        {project.description && (
          <motion.p
            className="text-white/70 text-base md:text-lg max-w-2xl mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {project.description}
          </motion.p>
        )}

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
            {images.map((_, imgIndex) => (
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
      <div className="absolute top-24 md:top-20 lg:top-24 left-8 md:left-16 lg:left-24 z-0 pointer-events-none">
        <span className="text-white/10 text-8xl md:text-9xl font-light">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.article>
  );
};

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

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

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="h-screen flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </PageTransition>
    );
  }

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
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="h-screen flex items-center justify-center">
              <p className="text-foreground/60 text-lg">No projects available</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ProjectPage;
