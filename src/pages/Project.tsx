import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageTransition from '@/components/animations/PageTransition';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

interface Project {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  category: string | null;
  year: string | null;
  location: string | null;
  images: string[] | null;
  cover_image: string | null;
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
  
  // Use cover_image first, then fall back to images array
  const coverImage = project.cover_image;
  const galleryImages = project.images || [];
  // Display images: cover first, then gallery images
  const allImages = coverImage ? [coverImage, ...galleryImages] : galleryImages;

  useEffect(() => {
    if (isHovered && allImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
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
  }, [isHovered, allImages.length]);

  if (allImages.length === 0) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full h-screen cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/project/${project.slug || project.id}`)}
    >
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        {allImages.map((image, imgIndex) => (
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
            className="text-white/70 text-base md:text-lg max-w-2xl mb-6 leading-relaxed line-clamp-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            dangerouslySetInnerHTML={{ 
              __html: project.description
                .replace(/<[^>]*>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 200) + (project.description.length > 200 ? '...' : '')
            }}
          />
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
            {allImages.map((_, imgIndex) => (
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
    url: 'https://www.okanuckun.com/project',
    author: {
      '@type': 'Person',
      name: 'Okan Uckun',
      jobTitle: 'Tattoo Artist',
      url: 'https://www.okanuckun.com'
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
      <SEOHead jsonLd={projectJsonLd} />
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>

        <main>
          {/* SEO H1 - Visually hidden for crawlers */}
          <h1 className="sr-only">Projects by Okan Uckun - Creative Works & Art Portfolio</h1>
          
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
