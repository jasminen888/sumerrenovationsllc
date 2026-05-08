import type { MetadataRoute } from 'next';
import { blogPosts } from './blog/data';

const BASE_URL = 'https://sumerrenovations.com';

// Static page last-modified dates (update when page content changes)
const STATIC_DATES = {
  home:    new Date('2026-05-07'),
  blog:    new Date(blogPosts[0]?.date ?? '2025-05-12'),
  privacy: new Date('2025-01-01'),
  terms:   new Date('2025-01-01'),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    // Homepage — highest priority
    {
      url: BASE_URL,
      lastModified: STATIC_DATES.home,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Blog index — updated whenever new posts are published
    {
      url: `${BASE_URL}/blog`,
      lastModified: STATIC_DATES.blog,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Individual blog posts — sorted newest first from data.ts
    ...blogEntries,
    // Legal pages — rarely change
    {
      url: `${BASE_URL}/privacy`,
      lastModified: STATIC_DATES.privacy,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: STATIC_DATES.terms,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}
