import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getReports, getBlogsByCategory, getPressReleasesByCategory, isApiError } from '@/lib/api';
import { ReportsListingClient } from '@/components/reports';
import IndustryHero from '@/components/reports/IndustryHero';
import IndustryContentPreview from '@/components/industry/IndustryContentPreview';
import categories from '@/data/categories.json';

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, never>>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} Market Research Reports`,
    description: (category as { description?: string }).description ?? `${category.name} market research reports and industry analysis.`,
    keywords: [
      `${category.name} market research`,
      `${category.name} reports`,
      `${category.name} industry analysis`,
    ],
    alternates: {
      canonical: `/industry/${category.slug}`,
    },
  };
}

export const revalidate = 300;
export const fetchCache = 'default-cache';

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = categories.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  const response = await getReports({
    status: 'published',
    category,
    page: 1,
    limit: 8,
    sort_by: 'publish_date_desc',
  });

  const reports = isApiError(response) ? [] : response.data;
  const totalItems = isApiError(response) ? 0 : (response.meta?.totalItems ?? response.data.length);

  return (
    <>
      <IndustryHero activeCategory={categoryData} />
      <Suspense fallback={null}>
        <ContentPreviewSection categorySlug={category} />
      </Suspense>
      <ReportsListingClient
        reports={reports}
        activeCategorySlug={category}
        totalItems={totalItems}
        totalPages={isApiError(response) ? 1 : (response.meta?.totalPages ?? 1)}
      />
    </>
  );
}

async function ContentPreviewSection({ categorySlug }: { categorySlug: string }) {
  const [blogsResponse, pressReleasesResponse] = await Promise.all([
    getBlogsByCategory(categorySlug, { page: 1, limit: 2 }),
    getPressReleasesByCategory(categorySlug, { page: 1, limit: 2 }),
  ]);

  const blogs = isApiError(blogsResponse) ? [] : blogsResponse.data;
  const pressReleases = isApiError(pressReleasesResponse) ? [] : pressReleasesResponse.data;

  return <IndustryContentPreview blogs={blogs} pressReleases={pressReleases} />;
}
