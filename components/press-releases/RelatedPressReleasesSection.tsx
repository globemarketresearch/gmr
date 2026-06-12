import Link from 'next/link';
import { getPressReleases, isApiError } from '@/lib/api';
import type { PressRelease } from '@/lib/api/press-releases.types';

interface RelatedPressReleasesSectionProps {
  categorySlug: string;
  categoryName: string;
  currentSlug: string;
}

function RelatedPressReleaseCard({ pressRelease }: { pressRelease: PressRelease }) {
  let formattedDate = '';
  try {
    if (pressRelease.date) {
      const d = new Date(pressRelease.date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
    }
  } catch {
    formattedDate = '';
  }

  return (
    <Link href={`/press-release/${pressRelease.slug}`} className="group block h-full">
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
              {pressRelease.category}
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
              {pressRelease.title}
            </span>
          </h3>

          {pressRelease.excerpt && (
            <p
              className="text-[13px] leading-relaxed line-clamp-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              {pressRelease.excerpt}
            </p>
          )}

          <div className="flex-1" />

          <div
            className="flex items-center justify-between gap-2 pt-3 mt-auto"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
              {pressRelease.author && (
                <span className="truncate max-w-[120px]">{pressRelease.author}</span>
              )}
              {pressRelease.readTime && (
                <>
                  <span style={{ color: 'var(--border-color)' }}>·</span>
                  <span>{pressRelease.readTime}</span>
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

export default async function RelatedPressReleasesSection({
  categorySlug,
  categoryName,
  currentSlug,
}: RelatedPressReleasesSectionProps) {
  const response = await getPressReleases({
    category: categorySlug,
    status: 'published',
    limit: 9,
  });

  let related: PressRelease[] = [];

  if (!isApiError(response)) {
    related = response.data.filter((pr) => pr.slug !== currentSlug).slice(0, 4);
  }

  if (related.length === 0) {
    const fallback = await getPressReleases({ status: 'published', limit: 10 });
    if (!isApiError(fallback)) {
      related = fallback.data.filter((pr) => pr.slug !== currentSlug).slice(0, 4);
    }
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-14 mb-8" aria-labelledby="related-press-releases-heading">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-6 rounded-full shrink-0"
            style={{ background: 'var(--accent)' }}
          />
          <div>
            <h2
              id="related-press-releases-heading"
              className="text-xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
            >
              Related Press Releases
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              More in {categoryName}
            </p>
          </div>
        </div>

        <Link
          href="/press-releases"
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
        {related.map((pr) => (
          <RelatedPressReleaseCard key={pr.slug} pressRelease={pr} />
        ))}
      </div>
    </section>
  );
}
