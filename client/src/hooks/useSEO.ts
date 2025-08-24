/**
 * Custom hook for SEO meta tags management
 * Provides dynamic SEO optimization without external dependencies
 */

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export const useSEO = ({
  title = 'MWC Advocates - Premier Legal Services in Nairobi, Kenya',
  description = 'MASINDE WANYONYI & COMPANY ADVOCATES - Leading law firm in Nairobi providing comprehensive legal services including corporate law, commercial litigation, employment law, real estate, and intellectual property. Expert legal representation in Kenya.',
  keywords = 'law firm Nairobi, legal services Kenya, corporate law, commercial litigation, employment law, real estate law, intellectual property, MWC Advocates, Masinde Wanyonyi, legal representation Kenya, lawyers Nairobi, advocates Kenya',
  image = '/img/MWC_BLACK.png',
  url = window.location.href,
  type = 'website'
}: SEOProps = {}) => {
  useEffect(() => {
    const siteTitle = 'MWC Advocates';
    const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Masinde Wanyonyi & Company Advocates');
    updateMetaTag('robots', 'index, follow');

    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'MWC Advocates', true);
    updateMetaTag('og:locale', 'en_KE', true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);

    // Geo tags
    updateMetaTag('geo.region', 'KE');
    updateMetaTag('geo.placename', 'Nairobi');
    updateMetaTag('geo.position', '-1.286389;36.817223');
    updateMetaTag('ICBM', '-1.286389, 36.817223');

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Masinde Wanyonyi & Company Advocates",
      "alternateName": "MWC Advocates",
      "description": description,
      "url": url,
      "logo": image,
      "image": image,
      "telephone": "+254702073800",
      "email": "masindewanyonyi.co@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "P.O. Box 46723-00100",
        "addressLocality": "Nairobi",
        "addressCountry": "Kenya"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -1.286389,
        "longitude": 36.817223
      },
      "openingHours": [
        "Mo-Fr 08:00-18:00",
        "Sa 09:00-13:00"
      ],
      "serviceArea": {
        "@type": "Country",
        "name": "Kenya"
      },
      "areaServed": "Kenya",
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150"
      }
    };

    // Update or create structured data script
    let scriptTag = document.getElementById('structured-data') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script') as HTMLScriptElement;
      scriptTag.id = 'structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type]);
};

export default useSEO;
