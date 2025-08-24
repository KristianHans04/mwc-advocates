/**
 * SEO-optimized HTML Head component for MWC Advocates
 * Provides consistent SEO metadata across all pages
 */

import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'MWC Advocates - Premier Legal Services in Nairobi, Kenya',
  description = 'MASINDE WANYONYI & COMPANY ADVOCATES - Leading law firm in Nairobi providing comprehensive legal services including corporate law, commercial litigation, employment law, real estate, and intellectual property. Expert legal representation in Kenya.',
  keywords = 'law firm Nairobi, legal services Kenya, corporate law, commercial litigation, employment law, real estate law, intellectual property, MWC Advocates, Masinde Wanyonyi, legal representation Kenya, lawyers Nairobi, advocates Kenya',
  image = '/img/MWC_BLACK.png',
  url = 'https://mwc-advocates.co.ke',
  type = 'website'
}) => {
  const siteTitle = 'MWC Advocates';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Masinde Wanyonyi & Company Advocates" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="MWC Advocates" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#0c3110" />
      <meta name="msapplication-TileColor" content="#0c3110" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />

      {/* Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
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
        })}
      </script>

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEOHead;
