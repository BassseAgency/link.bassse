export interface SEOConfig {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
  locale?: string;
}

export const updateMetaTags = (config: SEOConfig) => {
  // Actualizar título
  document.title = config.title;

  // Actualizar meta description
  updateMetaTag('name', 'description', config.description);

  // Actualizar Open Graph tags
  updateMetaTag('property', 'og:title', config.title);
  updateMetaTag('property', 'og:description', config.description);
  updateMetaTag('property', 'og:image', config.image);
  updateMetaTag('property', 'og:url', config.url);
  
  if (config.type) {
    updateMetaTag('property', 'og:type', config.type);
  }
  
  if (config.locale) {
    updateMetaTag('property', 'og:locale', config.locale);
  }

  // Actualizar Twitter Cards
  updateMetaTag('name', 'twitter:title', config.title);
  updateMetaTag('name', 'twitter:description', config.description);
  updateMetaTag('name', 'twitter:image', config.image);
};

const updateMetaTag = (attribute: string, name: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

export const generateStructuredData = (artistData: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": artistData.name,
    "jobTitle": "DJ",
    "genre": ["Techno", "Hard Groove"],
    "url": window.location.origin,
    "image": artistData.heroImageUrl,
    "sameAs": artistData.socialLinks.map((link: any) => link.url),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "León",
      "addressCountry": "ES"
    },
    "memberOf": {
      "@type": "Organization",
      "name": "La Mata Fest"
    }
  };
}; 