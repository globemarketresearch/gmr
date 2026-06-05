import Link from 'next/link';
import { Section, Container } from '@/components/ui';
import { getBlogs, isApiError } from '@/lib/api';
import type { Blog } from '@/lib/api/blogs.types';

function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getCategoryStyle(_category: string): string {
  return 'text-blue-600';
}

function StatCard({ blog, index }: { blog: Blog; index: number }) {
  const isFirst = index === 0;

  return (
    <Link
      href={`/statistic/${blog.slug}`}
      className="group bg-[var(--surface-raised)] border border-[var(--border-color)] rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold tracking-wider uppercase ${getCategoryStyle(blog.category)}`}>
          {blog.category || 'Statistics'}
        </span>
        <span className="text-xs text-[var(--text-tertiary)] font-medium">
          {formatShortDate(blog.date)}
        </span>
      </div>

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-2">
        <div
          aria-hidden="true"
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl text-lg shrink-0 mt-0.5"
          style={{
            background: 'rgba(2,132,199,0.10)',
            border: '1px solid rgba(2,132,199,0.2)',
          }}
        >
          📊
        </div>
        <h3 className="font-bold text-[var(--text-primary)] text-[1.05rem] leading-snug line-clamp-2 group-hover:text-sky-600 transition-colors duration-200">
          {blog.title}
        </h3>
      </div>

      {/* Excerpt */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4 flex-1">
        {blog.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
            style={{ background: 'rgba(2,132,199,0.7)' }}
          >
            {(blog.author || 'GM').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <span className="text-xs text-[var(--text-secondary)] font-medium truncate max-w-[100px]">
            {blog.author || 'GMR Team'}
          </span>
          {blog.readTime && (
            <span className="text-xs text-[var(--text-tertiary)]">· {blog.readTime}</span>
          )}
        </div>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isFirst
              ? 'bg-sky-500 text-white group-hover:bg-sky-600'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] group-hover:bg-[var(--border-color)]'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default async function FeaturedStatisticsSection() {
  const response = await getBlogs({
    status: 'published',
    limit: 6,
    sort_by: 'publish_date_desc',
  });

  if (isApiError(response) || response.data.length === 0) {
    return null;
  }

  const blogs = response.data;

  return (
    <Section background="default" padding="sm">
      <Container size="xl">
        <div className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(2,132,199,0.10)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)' }}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="3" /></svg>
                  Data & Insights
                </span>
              </div>
              <h2
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)]"
                style={{ letterSpacing: '-0.03em' }}
              >
                Latest Statistics
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] max-w-xl">
                Verified data and expert-reviewed insights across industries and markets
              </p>
            </div>
            <Link
              href="/statistics"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:border-sky-500 hover:text-sky-600 transition-colors duration-200 shrink-0"
            >
              View All
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog, index) => (
              <StatCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>

          {/* Mobile "View All" */}
          <div className="text-center md:hidden">
            <Link
              href="/statistics"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:border-sky-500 hover:text-sky-600 transition-colors duration-200"
            >
              View All Statistics
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
