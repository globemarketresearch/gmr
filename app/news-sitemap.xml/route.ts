import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/api/blogs';
import { getPressReleases } from '@/lib/api/press-releases';
import { getIndustryNewsList } from '@/lib/api/industry-news';

const BASE_URL = 'https://www.globemarketresearch.com';
const PUBLICATION_NAME = 'Globe Market Research';
const PUBLICATION_LANGUAGE = 'en';

export async function GET() {
  try {
    const [blogsRes, prRes, industryNewsRes] = await Promise.all([
      getBlogs({ status: 'published', limit: 1000 }),
      getPressReleases({ status: 'published', limit: 1000 }),
      getIndustryNewsList({ status: 'published', limit: 1000 }),
    ]);

    const blogEntries =
      blogsRes.success && blogsRes.data
        ? blogsRes.data.map((blog) => ({
            url: `${BASE_URL}/statistic/${blog.slug}`,
            title: blog.title,
            publishDate: blog.publishDate || blog.updatedAt || blog.date,
          }))
        : [];

    const prEntries =
      prRes.success && prRes.data
        ? prRes.data.map((pr) => ({
            url: `${BASE_URL}/press-release/${pr.slug}`,
            title: pr.title,
            publishDate: pr.publishDate || pr.updatedAt || pr.date,
          }))
        : [];

    const industryNewsEntries =
      industryNewsRes.success && industryNewsRes.data
        ? industryNewsRes.data.map((item) => ({
            url: `${BASE_URL}/industry-news/${item.slug}`,
            title: item.title,
            publishDate: item.publishDate || item.updatedAt || item.date,
          }))
        : [];

    const allEntries = [...blogEntries, ...prEntries, ...industryNewsEntries];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <news:news>
      <news:publication>
        <news:name>${PUBLICATION_NAME}</news:name>
        <news:language>${PUBLICATION_LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${new Date(entry.publishDate || Date.now()).toISOString()}</news:publication_date>
      <news:title><![CDATA[${entry.title}]]></news:title>
    </news:news>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
