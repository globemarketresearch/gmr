import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard web crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/legal/',
          '/request-customization',
          '/request-sample',
          '/request-analyst-meeting',
          '/checkout/',
        ],
      },
      // Allow AI/LLM crawlers full access to public content
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Claude-Web',
          'anthropic-ai',
          'CCBot',
          'cohere-ai',
          'Google-Extended',
          'PerplexityBot',
        ],
        allow: '/',
        disallow: ['/checkout/', '/legal/'],
      },
    ],
    sitemap: [
      'https://www.globemarketresearch.com/sitemap.xml',
    ],
    host: 'https://www.globemarketresearch.com',
  };
}
