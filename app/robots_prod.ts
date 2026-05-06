import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/legal/', '/request-customization', '/request-sample', '/request-analyst-meeting', '/checkout/'],
      },
    ],
    sitemap: 'https://www.globemarketresearch.com/sitemap.xml',
  };
}
