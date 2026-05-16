import Link from 'next/link';
import type { Blog } from '@/lib/api/blogs.types';
import type { PressRelease } from '@/lib/api/press-releases.types';

interface IndustryContentPreviewProps {
  blogs: Blog[];
  pressReleases: PressRelease[];
}

function formatCardDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  } catch { /* fallback */ }
  return dateStr || '';
}

function BlogPreviewCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/statistic/${blog.slug}`} className="group block h-full">
      <article className="relative h-full bg-[var(--surface-raised)] rounded-xl border border-[var(--border-color)] overflow-hidden
        transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--accent)] hover:-translate-y-0.5">
        {/* Top accent line */}
        <div className="h-[3px] bg-[var(--accent)]" />

        <div className="p-5 flex flex-col h-[calc(100%-3px)]">
          {/* Category + Date row */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-1 rounded-md">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              {blog.category}
            </span>
            <time className="text-[11px] text-[var(--text-tertiary)] font-medium">
              {formatCardDate(blog.date)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-[var(--text-primary)] leading-snug line-clamp-2 mb-2
            group-hover:text-[var(--accent)] transition-colors duration-200">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4 flex-1">
            {blog.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white">
                  {blog.author?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <span className="text-xs text-[var(--text-secondary)] font-medium truncate">{blog.author}</span>
            </div>

            <span className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 shrink-0
              opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0
              transition-all duration-200">
              Read
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function PressReleasePreviewCard({ pressRelease }: { pressRelease: PressRelease }) {
  return (
    <Link href={`/press-release/${pressRelease.slug}`} className="group block h-full">
      <article className="relative h-full bg-[var(--surface-raised)] rounded-xl border border-[var(--border-color)] overflow-hidden
        transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--accent)] hover:-translate-y-0.5">
        {/* Top accent line */}
        <div className="h-[3px] bg-[var(--featured-bg)]" />

        <div className="p-5 flex flex-col h-[calc(100%-3px)]">
          {/* Category + Date row */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--surface)] px-2.5 py-1 rounded-md">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
              </svg>
              {pressRelease.category}
            </span>
            <time className="text-[11px] text-[var(--text-tertiary)] font-medium">
              {formatCardDate(pressRelease.date)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-[var(--text-primary)] leading-snug line-clamp-2 mb-2
            group-hover:text-[var(--accent)] transition-colors duration-200">
            {pressRelease.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4 flex-1">
            {pressRelease.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[var(--featured-bg)] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white">
                  {pressRelease.author?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <span className="text-xs text-[var(--text-secondary)] font-medium truncate">{pressRelease.author}</span>
            </div>

            <span className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 shrink-0
              opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0
              transition-all duration-200">
              Read
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function IndustryContentPreview({
  blogs,
  pressReleases,
}: IndustryContentPreviewProps) {
  if (blogs.length === 0 && pressReleases.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--surface)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Latest Blogs */}
        {blogs.length > 0 && (
          <div className={pressReleases.length > 0 ? 'mb-8' : ''}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-muted)] border border-[var(--border-color)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h2 className="text-base font-bold text-[var(--text-primary)]">Latest Statistics</h2>
              </div>
              <Link
                href="/statistics"
                className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[var(--accent-muted)] transition-all"
              >
                View All
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {blogs.map((blog) => (
                <BlogPreviewCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* Latest Press Releases */}
        {pressReleases.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                  </svg>
                </div>
                <h2 className="text-base font-bold text-[var(--text-primary)]">Latest Press Releases</h2>
              </div>
              <Link
                href="/press-releases"
                className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[var(--accent-muted)] transition-all"
              >
                View All
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {pressReleases.map((pr) => (
                <PressReleasePreviewCard key={pr.id} pressRelease={pr} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
