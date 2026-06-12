import Link from 'next/link';
import { getBlogs, isApiError } from '@/lib/api';
import type { Blog } from '@/lib/api/blogs.types';

interface RelatedStatisticsSectionProps {
  categorySlug: string;
  categoryName: string;
  currentSlug: string;
}

function RelatedStatisticCard({ blog }: { blog: Blog }) {
  let formattedDate = '';
  try {
    if (blog.date) {
      const d = new Date(blog.date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
    }
  } catch {
    formattedDate = '';
  }

  return (
    <Link href={`/statistic/${blog.slug}`} className="group block h-full">
      <article
        className="relative h-full flex flex-col rounded-xl border transition-all duration-200"
        style={{
          background: 'var(--surface-raised)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          className="h-[3px] w-full rounded-t-xl transition-all duration-300"
          style={{ background: 'var(--border-color)' }}
        />

        <div className="flex flex-col flex-1 px-5 py-4 gap-3">
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full leading-none"
              style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
            >
              {blog.category}
            </span>
            {formattedDate && (
              <time className="text-[11px] shrink-0" style={{ color: 'var(--text-tertiary)' }}>
                {formattedDate}
              </time>
            )}
          </div>

          <h3
            className="text-[15px] font-bold leading-snug transition-colors duration-200 line-clamp-3"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="group-hover:text-[var(--accent)] transition-colors duration-200">
              {blog.title}
            </span>
          </h3>

          {blog.excerpt && (
            <p
              className="text-[13px] leading-relaxed line-clamp-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              {blog.excerpt}
            </p>
          )}

          <div className="flex-1" />

          <div
            className="flex items-center justify-between gap-2 pt-3 mt-auto"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
              {blog.author && (
                <span className="truncate max-w-[120px]">{blog.author}</span>
              )}
              {blog.readTime && (
                <>
                  <span style={{ color: 'var(--border-color)' }}>·</span>
                  <span>{blog.readTime}</span>
                </>
              )}
            </div>

            <span
              className="flex items-center gap-1 text-[11px] font-semibold translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              style={{ color: 'var(--accent)' }}
            >
              View
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default async function RelatedStatisticsSection({
  categorySlug,
  categoryName,
  currentSlug,
}: RelatedStatisticsSectionProps) {
  const response = await getBlogs({
    category: categorySlug,
    status: 'published',
    limit: 9,
  });

  let related: Blog[] = [];

  if (!isApiError(response)) {
    related = response.data.filter((b) => b.slug !== currentSlug).slice(0, 4);
  }

  if (related.length === 0) {
    const fallback = await getBlogs({ status: 'published', limit: 10 });
    if (!isApiError(fallback)) {
      related = fallback.data.filter((b) => b.slug !== currentSlug).slice(0, 4);
    }
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-14 mb-8" aria-labelledby="related-statistics-heading">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-6 rounded-full shrink-0"
            style={{ background: 'var(--accent)' }}
          />
          <div>
            <h2
              id="related-statistics-heading"
              className="text-xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
            >
              Related Statistics
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              More in {categoryName}
            </p>
          </div>
        </div>

        <Link
          href="/statistics"
          className="flex items-center gap-1.5 text-xs font-semibold shrink-0 transition-colors duration-150"
          style={{ color: 'var(--accent)' }}
        >
          View all
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((blog) => (
          <RelatedStatisticCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
}
