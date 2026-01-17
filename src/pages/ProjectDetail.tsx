import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageTransition from '@/components/animations/PageTransition';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, MapPin, Calendar, Tag } from 'lucide-react';

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
  instagram_url: string | null;
  published: boolean | null;
}

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      // Try to find by slug first, then by id (for backward compatibility)
      let { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      // If not found by slug, try by id
      if (error || !data) {
        const result = await supabase
          .from('projects')
          .select('*')
          .eq('id', slug)
          .single();
        
        data = result.data;
        error = result.error;
      }

      if (error || !data) {
        console.error('Error fetching project:', error);
        navigate('/project');
        return;
      }

      setProject(data);
      setLoading(false);
    };

    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="pt-32 px-8 md:px-16 lg:px-24">
            <Skeleton className="h-12 w-1/3 mb-8" />
            <Skeleton className="h-[60vh] w-full mb-8" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!project) {
    return null;
  }

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: `${project.title} - ${project.category || 'Art Project'} by Okan Uckun${project.location ? `, ${project.location}` : ''}${project.year ? ` (${project.year})` : ''}`,
    url: `https://okanuckun.com/project/${project.slug || project.id}`,
    image: project.images?.[0] || undefined,
    dateCreated: project.year || undefined,
    locationCreated: project.location ? {
      '@type': 'Place',
      name: project.location
    } : undefined,
    author: {
      '@type': 'Person',
      name: 'Okan Uckun',
      jobTitle: 'Tattoo Artist',
      url: 'https://okanuckun.com'
    },
    genre: project.category || undefined
  };

  const metaDescription = `${project.title} - ${project.category || 'Creative Work'} by Okan Uckun.${project.location ? ` Created in ${project.location}` : ''}${project.year ? ` (${project.year})` : ''} Explore this unique artistic project.`;

  return (
    <PageTransition>
      <SEOHead
        title={`${project.title} | Okan Uckun Projects`}
        description={metaDescription}
        keywords={`${project.title}, ${project.category || 'art'}, Okan Uckun, ${project.location || 'NYC'}, tattoo artist, creative work`}
        ogTitle={project.title}
        ogDescription={metaDescription}
        ogImage={project.images?.[0]}
        canonical={`/project/${project.slug || project.id}`}
        jsonLd={projectJsonLd}
      />
      <div className="min-h-screen bg-background">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>

        <main className="pt-24 pb-16">
          {/* Back Button */}
          <div className="px-8 md:px-16 lg:px-24 mb-8">
            <button
              onClick={() => navigate('/project')}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">All Projects</span>
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden mb-12">
            {(() => {
              // Build display images: cover first, then gallery
              const displayImages = project.cover_image 
                ? [project.cover_image, ...(project.images || [])]
                : (project.images || []);
              
              if (displayImages.length === 0) return null;
              
              return (
                <>
                  {displayImages.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  {/* Image Navigation */}
                  {displayImages.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                      {displayImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Project Info */}
          <div className="px-8 md:px-16 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-foreground/60">
                {project.category && (
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider">{project.category}</span>
                  </span>
                )}
                {project.year && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider">{project.year}</span>
                  </span>
                )}
                {project.location && (
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider">{project.location}</span>
                  </span>
                )}
                {project.instagram_url && (
                  <a 
                    href={project.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-foreground transition-colors group"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-sm uppercase tracking-wider group-hover:underline">Instagram</span>
                  </a>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight mb-8">
                {project.title}
              </h1>

              {/* Description */}
              {project.description && (
                <div 
                  className="prose prose-lg prose-invert max-w-none text-foreground/80 
                    [&_p]:mb-4 [&_p]:leading-relaxed
                    [&_h1]:text-3xl [&_h1]:font-light [&_h1]:mb-6 [&_h1]:mt-8
                    [&_h2]:text-2xl [&_h2]:font-light [&_h2]:mb-4 [&_h2]:mt-6
                    [&_h3]:text-xl [&_h3]:font-light [&_h3]:mb-3 [&_h3]:mt-4
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                    [&_li]:mb-2
                    [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
                    [&_strong]:font-semibold
                    [&_em]:italic
                    [&_blockquote]:border-l-2 [&_blockquote]:border-foreground/20 [&_blockquote]:pl-4 [&_blockquote]:italic"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
                />
              )}
            </motion.div>

            {/* Image Gallery */}
            {(() => {
              const galleryImages = project.images || [];
              if (galleryImages.length <= 1) return null;
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-16"
                >
                  <h2 className="text-xl font-light text-foreground/60 mb-8 uppercase tracking-wider">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="aspect-square overflow-hidden cursor-pointer"
                        whileHover={{ scale: 0.98 }}
                        onClick={() => setCurrentImageIndex(project.cover_image ? index + 1 : index)}
                      >
                        <img
                          src={image}
                          alt={`${project.title} - Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
