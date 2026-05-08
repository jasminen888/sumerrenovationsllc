import type { MetadataRoute } from 'next';

const BASE_URL = 'https://sumerrenovations.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Googlebot — full access, no crawl-delay (Google manages its own rate)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      // Bingbot — full access
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/'],
      },
      // All other crawlers — block API routes and internal Next.js paths
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
