import { PortfolioPhoto, photoAbsUrl } from '@/data/portfolio';
import type { FAQItem } from './GuideLayout';

/**
 * Structured data for a style guide page, as one @graph:
 * Person (Okan) + TattooParlor (Monolith Studio) + Article + Service +
 * BreadcrumbList + FAQPage. Person/studio use stable @ids so every page
 * describes the same entities — this is what search engines and AI
 * assistants use to connect "Okan Uckun" with the styles and the studio.
 */

export const PERSON_ID = 'https://okanuckun.com/#okan-uckun';
export const STUDIO_ID = 'https://okanuckun.com/#monolith-studio';

export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Okan Uckun',
  jobTitle: 'Tattoo Artist',
  url: 'https://okanuckun.com',
  image: 'https://okanuckun.com/og-images/okan-default.jpg',
  description:
    'Brooklyn-based tattoo artist specializing in geometric, minimalist, fine line and linework tattoos. Trained as an architect, tattooing since 2009.',
  knowsAbout: ['Geometric tattoos', 'Minimalist tattoos', 'Fine line tattoos', 'Linework tattoos', 'Sacred geometry', 'Architecture'],
  worksFor: { '@id': STUDIO_ID },
  sameAs: ['https://www.instagram.com/okanuckun', 'https://www.tiktok.com/@okanuckun'],
};

export const studioNode = {
  '@type': 'TattooParlor',
  '@id': STUDIO_ID,
  name: 'Monolith Studio',
  url: 'https://monolithstudio.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '77 Washington Avenue',
    addressLocality: 'Brooklyn',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
};

export const imageObject = (p: PortfolioPhoto) => ({
  '@type': 'ImageObject',
  contentUrl: photoAbsUrl(p),
  caption: p.alt,
  width: p.w,
  height: p.h,
  creator: { '@id': PERSON_ID },
  creditText: 'Okan Uckun',
  copyrightNotice: '© Okan Uckun',
});

interface GuideSchemaInput {
  url: string;
  name: string; // breadcrumb name
  headline: string;
  description: string;
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  datePublished: string;
  dateModified: string;
  gallery: PortfolioPhoto[];
  faqs: FAQItem[];
}

export const buildGuideJsonLd = (i: GuideSchemaInput) => ({
  '@context': 'https://schema.org',
  '@graph': [
    personNode,
    studioNode,
    {
      '@type': 'Article',
      '@id': `${i.url}#article`,
      headline: i.headline,
      description: i.description,
      url: i.url,
      mainEntityOfPage: i.url,
      datePublished: i.datePublished,
      dateModified: i.dateModified,
      inLanguage: 'en',
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      about: { '@id': `${i.url}#service` },
      image: i.gallery.map(imageObject),
    },
    {
      '@type': 'Service',
      '@id': `${i.url}#service`,
      name: i.serviceName,
      serviceType: i.serviceType,
      description: i.serviceDescription,
      provider: { '@id': PERSON_ID },
      areaServed: [
        { '@type': 'City', name: 'New York City' },
        { '@type': 'City', name: 'Brooklyn' },
      ],
      url: i.url,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://okanuckun.com/' },
        { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://okanuckun.com/work' },
        { '@type': 'ListItem', position: 3, name: i.name, item: i.url },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: i.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
});
