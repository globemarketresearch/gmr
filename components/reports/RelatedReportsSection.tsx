import Link from 'next/link';
import { getReports, isApiError } from '@/lib/api';
import type { Report } from '@/lib/api/reports.types';

interface RelatedReportsSectionProps {
  categorySlug: string;
  categoryName: string;
  currentReportSlug: string;
}

function RelatedReportCard({ report }: { report: Report }) {
  let formattedDate = '';
  try {
    if (report.date) {
      const d = new Date(report.date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
    }
  } catch {
    formattedDate = report.year || '';
  }
  if (!formattedDate) formattedDate = report.year || '';

  return (
    <Link href={`/reports/${report.slug}`} className="group block h-full">
      <article
        className="relative h-full flex flex-col rounded-xl border transition-all duration-200"
        style={{
          background: 'var(--surface-raised)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Accent bar */}
        <div
          className="h-[3px] w-full rounded-t-xl transition-all duration-300"
          style={{ background: 'var(--border-color)' }}
        />

        <div className="flex flex-col flex-1 px-5 py-4 gap-3">
          {/* Top meta row */}
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full leading-none"
              style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
            >
              {report.category}
            </span>
            {formattedDate && (
              <time
                className="text-[11px] shrink-0"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {formattedDate}
              </time>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-[15px] font-bold leading-snug transition-colors duration-200 line-clamp-3"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="group-hover:text-[var(--accent)] transition-colors duration-200">
              {report.title}
            </span>
          </h3>

          {/* Excerpt */}
          {report.summary && (
            <p
              className="text-[13px] leading-relaxed line-clamp-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              {report.summary}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div
            className="flex items-center justify-between gap-2 pt-3 mt-auto"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
              {report.region && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                  <span className="truncate max-w-[80px]">{report.region}</span>
                </span>
              )}
              {report.pages > 0 && (
                <>
                  <span style={{ color: 'var(--border-color)' }}>·</span>
                  <span>{report.pages}p</span>
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

export default async function RelatedReportsSection({
  categorySlug,
  categoryName,
  currentReportSlug,
}: RelatedReportsSectionProps) {
  // Fetch reports in the same category first
  const response = await getReports({
    category: categorySlug,
    status: 'published',
    limit: 9,
  });

  let related: Report[] = [];

  if (!isApiError(response)) {
    related = response.data.filter((r) => r.slug !== currentReportSlug).slice(0, 4);
  }

  // Fall back to recent reports across all categories if category yields nothing
  if (related.length === 0) {
    const fallback = await getReports({ status: 'published', limit: 10 });
    if (!isApiError(fallback)) {
      related = fallback.data.filter((r) => r.slug !== currentReportSlug).slice(0, 4);
    }
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-14 mb-8" aria-labelledby="related-reports-heading">
      {/* Section header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Decorative mark */}
          <div
            className="w-1 h-6 rounded-full shrink-0"
            style={{ background: 'var(--accent)' }}
          />
          <div>
            <h2
              id="related-reports-heading"
              className="text-xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
            >
              Related Reports
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              More in {categoryName}
            </p>
          </div>
        </div>

        <Link
          href={`/industry/${categorySlug}`}
          className="flex items-center gap-1.5 text-xs font-semibold shrink-0 transition-colors duration-150"
          style={{ color: 'var(--accent)' }}
        >
          View all
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((report) => (
          <RelatedReportCard key={report.slug} report={report} />
        ))}
      </div>
    </section>
  );
}
