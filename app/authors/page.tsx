import { getAllAuthors, isApiError } from '@/lib/api';
import { Breadcrumb, Grid } from '@/components/ui';
import AuthorCard from '@/components/authors/AuthorCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Authors | Globe Market Research',
  description:
    "Meet the analysts and researchers behind Globe Market Research's reports and insights.",
  alternates: { canonical: '/authors' },
};

export const revalidate = 600;

export default async function AuthorsPage() {
  const response = await getAllAuthors();
  const authors = isApiError(response) ? [] : response.data;

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Authors' }];

  return (
    <div className="bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Our Authors</h1>
        <p className="text-[var(--muted-foreground)] mb-8">
          Meet the analysts and researchers behind our reports and insights.
        </p>

        {authors.length > 0 ? (
          <Grid cols={2} gap="lg">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </Grid>
        ) : (
          <p className="text-[var(--muted-foreground)]">No authors found.</p>
        )}
      </div>
    </div>
  );
}
