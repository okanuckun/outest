import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noindex?: boolean;
  jsonLd?: object;
}

const SEOHead = ({
  title = 'Okan Uckun | Tattoo Artist NYC',
  description = 'Okan Uckun is a renowned tattoo artist based in New York City, specializing in black and grey realism, portraits, and fine line work.',
  keywords = 'tattoo artist NYC, black and grey tattoo, realism tattoo, portrait tattoo, fine line tattoo, New York tattoo',
  ogTitle,
  ogDescription,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
  jsonLd,
}: SEOHeadProps) => {
  const location = useLocation();
  const siteUrl = 'https://www.okanuckun.com';
  
  // Auto-generate canonical from current route if not provided
  const currentPath = location.pathname;
  const fullCanonical = canonical 
    ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`)
    : `${siteUrl}${currentPath}`;
  
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Okan Uckun Tattoo" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
