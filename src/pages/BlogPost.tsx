import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Calendar, Tag, Share2, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/animations/ScrollReveal';

import blogImage1 from '@/assets/work/Group_354.jpg';
import blogImage2 from '@/assets/work/head1.jpg';
import blogImage3 from '@/assets/work/Group_261.jpg';

// Blog post data - in production, this would come from a CMS or database
const blogPostsData = [
  {
    id: 1,
    slug: 'forearm-tattoos-perfect-canvas-for-realism',
    title: 'Forearm Tattoos: A Perfect Canvas for Realism',
    metaTitle: 'Forearm Tattoos: A Perfect Canvas for Realism | Okan Uckun',
    metaDescription: 'Discover why forearm tattoos are ideal for realism art. Expert tips on design ideas, pain levels, healing, and planning your forearm tattoo piece.',
    category: 'Inspiration',
    date: '2025-05-18',
    dateFormatted: 'May 18, 2025',
    author: 'Okan Uckun',
    authorRole: 'Tattoo Artist',
    readTime: 8,
    image: blogImage1,
    excerpt: 'Forearm tattoos have surged in popularity as an ideal placement for both first-timers and seasoned collectors.',
    content: [
      {
        type: 'paragraph',
        text: 'Forearm tattoos have surged in popularity as an ideal placement for both first-timers and seasoned collectors. The forearm offers a unique combination of visibility, relatively low pain levels, and a flat canvas that makes it perfect for intricate realism work.'
      },
      {
        type: 'heading',
        text: 'Why Choose the Forearm for Your Tattoo?'
      },
      {
        type: 'paragraph',
        text: 'The forearm is one of the most versatile areas for tattooing. Its elongated shape accommodates both horizontal and vertical designs, while the skin\'s texture and thickness make it ideal for detailed work. Whether you prefer inner forearm pieces that you can admire daily or outer forearm designs that make a bold statement, this placement offers endless possibilities.'
      },
      {
        type: 'heading',
        text: 'Realism on the Forearm: What Makes It Special'
      },
      {
        type: 'paragraph',
        text: 'Realism tattoos require a skilled artist and the right canvas. The forearm\'s relatively flat surface allows for consistent needle depth, which is crucial for the subtle gradations and fine details that define photorealistic work. The skin here also tends to hold ink well, preserving the nuanced shading that brings realistic portraits and nature scenes to life.'
      },
      {
        type: 'quote',
        text: 'The forearm is where art meets visibility. It\'s the gallery you carry with you everywhere.',
        author: 'Okan Uckun'
      },
      {
        type: 'heading',
        text: 'Pain Levels and Healing'
      },
      {
        type: 'paragraph',
        text: 'Compared to areas like the ribs, spine, or feet, the forearm is considered moderately low on the pain scale. The outer forearm tends to be less sensitive than the inner forearm, which has thinner skin and more nerve endings. Most clients describe the sensation as manageable, especially for those who have experienced other tattoo placements.'
      },
      {
        type: 'paragraph',
        text: 'Healing typically takes 2-3 weeks for the surface and up to 3-4 months for complete settling. The forearm\'s accessibility makes aftercare easier, as you can easily clean and moisturize the area without assistance.'
      },
      {
        type: 'heading',
        text: 'Design Considerations'
      },
      {
        type: 'paragraph',
        text: 'When planning a forearm piece, consider how the design flows with your arm\'s natural contours. Vertical designs work well along the length of the forearm, while wrap-around pieces can create stunning 360-degree art. For realism work, think about lighting, placement relative to your muscle structure, and how the tattoo will look in various arm positions.'
      }
    ],
    tags: ['Forearm Tattoos', 'Realism', 'Tattoo Placement', 'First Tattoo'],
    relatedPosts: [2, 3]
  },
  {
    id: 2,
    slug: 'sleeve-tattoo-ideas-inspiration-styles',
    title: 'Sleeve Tattoo Ideas for Men: Inspiration and Styles',
    metaTitle: 'Sleeve Tattoo Ideas for Men: Inspiration & Styles | Okan Uckun',
    metaDescription: 'Explore the best sleeve tattoo ideas for men. From Japanese traditional to hyper-realistic portraits, discover styles and tips for your sleeve journey.',
    category: 'Inspiration',
    date: '2025-07-29',
    dateFormatted: 'July 29, 2025',
    author: 'Okan Uckun',
    authorRole: 'Tattoo Artist',
    readTime: 10,
    image: blogImage2,
    excerpt: 'Full sleeve tattoos represent the ultimate commitment to body art. Discover the most popular styles and how to plan your sleeve journey.',
    content: [
      {
        type: 'paragraph',
        text: 'Full sleeve tattoos represent the ultimate commitment to body art. They transform your arm into a continuous canvas of expression, telling stories that span from shoulder to wrist. Whether you\'re planning your first major piece or adding to an existing collection, understanding sleeve tattoo styles and planning is essential.'
      },
      {
        type: 'heading',
        text: 'Popular Sleeve Styles'
      },
      {
        type: 'paragraph',
        text: 'The world of sleeve tattoos offers incredible diversity. Japanese traditional sleeves feature bold lines, vibrant colors, and iconic imagery like koi fish, dragons, and cherry blossoms. Black and grey realism creates stunning portraits and scenes with photographic precision. Geometric and dotwork sleeves offer modern, abstract aesthetics that play with patterns and negative space.'
      },
      {
        type: 'heading',
        text: 'Planning Your Sleeve Journey'
      },
      {
        type: 'paragraph',
        text: 'A full sleeve typically requires multiple sessions spanning months or even years. Start with a clear vision and find an artist whose style aligns with your aesthetic. Consider how individual pieces will flow together—a cohesive sleeve often shares a common theme, color palette, or artistic style throughout.'
      },
      {
        type: 'quote',
        text: 'A sleeve is not just a collection of tattoos—it\'s a unified statement that tells your story across every inch of skin.',
        author: 'Okan Uckun'
      },
      {
        type: 'heading',
        text: 'The Investment'
      },
      {
        type: 'paragraph',
        text: 'Quality sleeve work is a significant investment of both time and money. Depending on complexity and the artist\'s rate, a full sleeve can range from several thousand to tens of thousands of dollars. This is permanent art on your body—prioritize quality and artist expertise over cost savings.'
      }
    ],
    tags: ['Sleeve Tattoos', 'Japanese Traditional', 'Tattoo Planning', 'Men\'s Tattoos'],
    relatedPosts: [1, 3]
  },
  {
    id: 3,
    slug: 'skull-tattoos-symbolism-design-ideas',
    title: 'Skull Tattoos: Symbolism and Design Ideas',
    metaTitle: 'Skull Tattoos: Symbolism & Design Ideas Guide | Okan Uckun',
    metaDescription: 'Explore the deep symbolism of skull tattoos across cultures. From mortality reminders to rebellion symbols, discover design ideas and realism techniques.',
    category: 'Tattoo Styles',
    date: '2025-05-17',
    dateFormatted: 'May 17, 2025',
    author: 'Okan Uckun',
    authorRole: 'Tattoo Artist',
    readTime: 7,
    image: blogImage3,
    excerpt: 'Skull tattoos carry deep symbolism across cultures. Explore the rich history and modern interpretations of skull designs in tattooing.',
    content: [
      {
        type: 'paragraph',
        text: 'Skull tattoos have been a staple of tattoo culture for centuries, carrying profound meanings that vary across cultures and individuals. Far from being merely macabre, these designs often represent life, death, transformation, and the eternal cycle that connects them all.'
      },
      {
        type: 'heading',
        text: 'The Symbolism of Skulls'
      },
      {
        type: 'paragraph',
        text: 'In many cultures, skulls serve as memento mori—reminders of mortality that encourage us to live fully. Mexican Día de los Muertos celebrations use sugar skulls to honor deceased loved ones with joy rather than sorrow. In Buddhism, skulls represent the impermanence of life and the importance of spiritual practice.'
      },
      {
        type: 'heading',
        text: 'Modern Interpretations'
      },
      {
        type: 'paragraph',
        text: 'Today\'s skull tattoos range from traditional bold designs to hyper-realistic portraits. They can represent rebellion, strength, protection, or simply an appreciation for the aesthetic. Combined with other elements like flowers, snakes, or geometric patterns, skulls become part of larger narratives unique to each wearer.'
      },
      {
        type: 'quote',
        text: 'Every skull tells a story of life lived. In death imagery, we often find the most powerful celebrations of existence.',
        author: 'Okan Uckun'
      },
      {
        type: 'heading',
        text: 'Realism Skull Techniques'
      },
      {
        type: 'paragraph',
        text: 'Creating a realistic skull tattoo requires mastery of light and shadow. The skull\'s complex geometry—its hollows, ridges, and curves—demands precise shading techniques. A skilled artist captures not just the bone structure but the personality and emotion that even a skull can convey.'
      }
    ],
    tags: ['Skull Tattoos', 'Symbolism', 'Realism', 'Cultural Meaning'],
    relatedPosts: [1, 2]
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = blogPostsData.find(p => p.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = post.relatedPosts.map(id => blogPostsData.find(p => p.id === id)).filter(Boolean);

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole
    },
    publisher: {
      '@type': 'Organization',
      name: 'Okan Uckun Tattoo',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://okanuckun.com/blog/${post.slug}`
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.content.reduce((acc, block) => {
      if (block.type === 'paragraph' || block.type === 'quote') {
        return acc + (block.text?.split(' ').length || 0);
      }
      return acc;
    }, 0)
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={`https://okanuckun.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={`https://okanuckun.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.image} />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <article className="min-h-screen bg-background text-foreground" itemScope itemType="https://schema.org/BlogPosting">
        {/* Hidden structured data */}
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="author" content={post.author} />
        
        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation variant="dark" />
        </div>

        {/* Hero Section */}
        <header className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              itemProp="image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-[22.5px] pb-16 max-sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl"
            >
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/60 text-[12px] tracking-wide mb-6">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                <ChevronRight size={14} />
                <span className="text-white/80">{post.category}</span>
              </nav>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-white text-black px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-white/70 text-[12px]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <time dateTime={post.date} itemProp="datePublished">{post.dateFormatted}</time>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime} min read
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight tracking-tight"
                itemProp="name"
              >
                {post.title}
              </h1>
            </motion.div>
          </div>
        </header>

        {/* Article Content */}
        <div className="px-[22.5px] max-sm:px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            {/* Author & Share */}
            <ScrollReveal>
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg font-medium">{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-[14px]" itemProp="author">{post.author}</p>
                    <p className="text-muted-foreground text-[12px]">{post.authorRole}</p>
                  </div>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Share article"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </ScrollReveal>

            {/* Content Blocks */}
            <div className="prose prose-lg max-w-none" itemProp="articleBody">
              {post.content.map((block, index) => {
                if (block.type === 'paragraph') {
                  return (
                    <ScrollReveal key={index} delay={index * 0.05}>
                      <p className="text-[16px] md:text-[17px] leading-relaxed text-foreground/90 mb-6">
                        {block.text}
                      </p>
                    </ScrollReveal>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <ScrollReveal key={index} delay={index * 0.05}>
                      <h2 className="text-2xl md:text-3xl font-medium mt-12 mb-6 tracking-tight">
                        {block.text}
                      </h2>
                    </ScrollReveal>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <ScrollReveal key={index} delay={index * 0.05}>
                      <blockquote className="border-l-2 border-foreground pl-6 my-10">
                        <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-3">
                          "{block.text}"
                        </p>
                        {block.author && (
                          <cite className="text-[13px] text-muted-foreground not-italic">
                            — {block.author}
                          </cite>
                        )}
                      </blockquote>
                    </ScrollReveal>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <ScrollReveal>
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={16} className="text-muted-foreground" />
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-muted text-[12px] font-medium tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="px-[22.5px] max-sm:px-4 py-16 bg-muted/30" aria-label="Related articles">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-medium mb-12 tracking-tight">
                  Related Articles
                </h2>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost, index) => relatedPost && (
                  <ScrollReveal key={relatedPost.id} delay={index * 0.1}>
                    <Link 
                      to={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <motion.article
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-6"
                      >
                        <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden flex-shrink-0">
                          <motion.img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">
                            {relatedPost.category} • {relatedPost.readTime} min
                          </span>
                          <h3 className="text-lg md:text-xl font-medium leading-snug group-hover:opacity-70 transition-opacity">
                            {relatedPost.title}
                          </h3>
                        </div>
                      </motion.article>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Blog CTA */}
        <section className="px-[22.5px] max-sm:px-4 py-16">
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal>
              <Link 
                to="/blog"
                className="inline-flex items-center gap-3 text-[14px] font-medium tracking-wide hover:gap-4 transition-all group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to All Articles
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </article>
    </>
  );
};

export default BlogPost;