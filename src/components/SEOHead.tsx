import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useSEOData } from '@/hooks/useSEOData';

interface SEOHeadProps {
  // Override props - these will take precedence over database values
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
  title: propTitle,
  description: propDescription,
  keywords: propKeywords,
  ogTitle: propOgTitle,
  ogDescription: propOgDescription,
  ogImage: propOgImage,
  ogType: propOgType,
  canonical: propCanonical,
  noindex: propNoindex,
  jsonLd: propJsonLd,
}: SEOHeadProps) => {
  const location = useLocation();
  const siteUrl = 'https://okanuckun.com';
  const currentPath = location.pathname;
  
  // Fetch SEO data from database
  const { pageData, globalData, loading } = useSEOData(currentPath);

  // Fallback defaults — locked positioning (matches index.html + llms.txt)
  const defaultTitle = 'Okan Uckun · Geometric & Minimalist Tattoos NYC';
  const defaultDescription = 'Geometric, minimalist and fine line tattoos by Okan Uckun. Sacred geometry, architectural precision, custom designs by appointment. Brooklyn studio, all of NYC.';
  const defaultKeywords = 'geometric tattoo NYC, minimalist tattoo NYC, fine line tattoo NYC, sacred geometry tattoo, linework tattoo, Okan Uckun, tattoo artist Brooklyn, tattoo artist Manhattan';

  // Priority: Props > Database > Defaults
  const rawTitle = propTitle || pageData?.meta_title || defaultTitle;
  const description = propDescription || pageData?.meta_description || defaultDescription;
  const keywords = propKeywords || pageData?.meta_keywords || defaultKeywords;
  
  // Apply title template from global settings
  const title = globalData.title_template && !propTitle && pageData?.meta_title
    ? globalData.title_template
        .replace('{title}', pageData.meta_title)
        .replace('{site_name}', globalData.site_name)
    : rawTitle;

  const ogTitle = propOgTitle || pageData?.og_title || rawTitle;
  const ogDescription = propOgDescription || pageData?.og_description || description;
  const ogImage = propOgImage || pageData?.og_image || globalData.default_og_image || '/og-image.jpg';
  const ogType = propOgType || (pageData?.og_type as 'website' | 'article') || 'website';
  
  const twitterCard = pageData?.twitter_card || 'summary_large_image';
  const twitterImage = pageData?.twitter_image || ogImage;
  
  // Canonical URL: Props > Database > Auto-generate
  const canonical = propCanonical || pageData?.canonical_url;
  const fullCanonical = canonical 
    ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`)
    : `${siteUrl}${currentPath}`;
  
  // Noindex: Props > Database > Default (false)
  const noindex = propNoindex !== undefined 
    ? propNoindex 
    : (pageData?.is_indexable === false);
  
  const robots = noindex ? 'noindex, nofollow' : (pageData?.robots_meta || globalData.default_robots || 'index, follow');
  
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Schema/JSON-LD: Props > Database
  const schemaData = propJsonLd || pageData?.schema_data;

  // Loading fallback — emits the page-specific meta + canonical even
  // before Supabase finishes its useSEOData fetch. This matters for
  // Lovable's prerender, which snapshots the React tree as soon as it
  // resolves: if `loading` is still true at that moment, the fallback
  // is what ends up in the static HTML the crawler sees. The previous
  // fallback only had <title> + <meta description>, which meant
  // EVERY prerendered page shipped without <link rel="canonical">,
  // <og:url>, <og:title> etc — Ahrefs flagged the resulting pages as
  // "Duplicate without canonical" (8 URLs).
  //
  // We use props-or-defaults here (no pageData), so the fallback is
  // honest about what we know at this point and still emits the
  // primitives crawlers need.
  if (loading) {
    const fbTitle = propTitle || defaultTitle;
    const fbDescription = propDescription || defaultDescription;
    const fbCanonical = propCanonical
      ? (propCanonical.startsWith('http') ? propCanonical : `${siteUrl}${propCanonical}`)
      : `${siteUrl}${currentPath}`;
    const fbOgTitle = propOgTitle || fbTitle;
    const fbOgDescription = propOgDescription || fbDescription;
    const fbOgImage = propOgImage
      ? (propOgImage.startsWith('http') ? propOgImage : `${siteUrl}${propOgImage}`)
      : `${siteUrl}/og-images/okan-default.jpg`;
    const fbOgType = propOgType || 'website';
    const fbRobots = propNoindex ? 'noindex, nofollow' : 'index, follow';
    return (
      <Helmet>
        <title>{fbTitle}</title>
        <meta name="description" content={fbDescription} />
        <meta name="robots" content={fbRobots} />
        <link rel="canonical" href={fbCanonical} />
        <meta property="og:type" content={fbOgType} />
        <meta property="og:title" content={fbOgTitle} />
        <meta property="og:description" content={fbOgDescription} />
        <meta property="og:image" content={fbOgImage} />
        <meta property="og:url" content={fbCanonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fbOgTitle} />
        <meta name="twitter:description" content={fbOgDescription} />
        <meta name="twitter:image" content={fbOgImage} />
        {propJsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(propJsonLd)}
          </script>
        )}
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={globalData.site_name} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={twitterImage.startsWith('http') ? twitterImage : `${siteUrl}${twitterImage}`} />
      
      {/* JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
