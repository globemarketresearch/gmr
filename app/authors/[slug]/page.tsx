import { notFound } from 'next/navigation';
import { getAuthorBySlug, getAllAuthors, getReportsByAuthorId, isApiError } from '@/lib/api';
import { slugify } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui';
import AuthorProfile from '@/components/authors/AuthorProfile';
import AuthorReportsListing from '@/components/authors/AuthorReportsListing';
import type { Metadata } from 'next';

export const revalidate = 600;

export async function generateStaticParams() {
  const response = await getAllAuthors();
  if (isApiError(response)) return [];
  return response.data.map((author) => ({ slug: slugify(author.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getAuthorBySlug(slug);

    if (isApiError(response)) return { title: 'Author Not Found' };

    const author = response.data;

    return {
      title: `Articles by ${author.name}`,
      description: `Browse market articles, insights, and research content published by ${author.name}.`,
      keywords: ['market articles', 'research blogs', 'market insights', 'industry content'],
      openGraph: {
        title: `Articles by ${author.name}`,
        description: `Browse market articles, insights, and research content published by ${author.name}.`,
        images: author.imageUrl ? [{ url: author.imageUrl }] : [],
      },
    };
  } catch {
    return { title: 'Author Not Found' };
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const authorResponse = await getAuthorBySlug(slug);

  if (isApiError(authorResponse)) notFound();

  const author = authorResponse.data;

  const reportsResponse = await getReportsByAuthorId(author.id, {
    status: 'published',
    limit: 1000,
  });

  const reports = isApiError(reportsResponse) ? [] : reportsResponse.data;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Authors', href: '/authors' },
    { label: author.name },
  ];

  return (
    <div className="bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <AuthorProfile author={author} totalReports={reports.length} />
        <AuthorReportsListing reports={reports} authorName={author.name} />
      </div>
    </div>
  );
}
