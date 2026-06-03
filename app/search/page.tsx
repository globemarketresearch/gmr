import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getReports, isApiError } from '@/lib/api';
import ReportCard from '@/components/reports/ReportCard';
import Pagination from '@/components/reports/Pagination';

const ITEMS_PER_PAGE = 10;

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() || '';
  return {
    title: query
      ? `Search results for "${query}" | Globe Market Research`
      : 'Search | Globe Market Research',
    description: `Browse Globe market research reports${query ? ` matching "${query}"` : ''}.`,
    robots: { index: false },
  };
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const response = await getReports({
    status: 'published',
    search: query,
    page,
    limit: ITEMS_PER_PAGE,
  });

  if (isApiError(response)) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl mb-2">⚠️</p>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Unable to load results</h2>
        <p className="text-sm text-[var(--text-secondary)]">{response.message}</p>
      </div>
    );
  }

  const currentPage = response.meta?.currentPage ?? page;
  const totalPages = response.meta?.totalPages ?? 1;
  const totalItems = response.meta?.totalItems ?? response.data.length;
  const reports = response.data;

  return (
    <>
      {/* Count badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] mb-1">
        <p className="text-xs text-[var(--text-tertiary)] font-medium uppercase tracking-wide">
          {totalItems} {totalItems === 1 ? 'result' : 'results'} found
        </p>
      </div>

      {reports.length > 0 ? (
        <>
          <div>
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-xl mt-4">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No results found</h3>
          <p className="text-sm text-[var(--text-tertiary)] mb-6">
            Try searching with different keywords or{' '}
            <Link href="/industry" className="text-[var(--accent)] hover:underline">
              browse all reports
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-36 bg-[var(--surface)] rounded mb-4 pb-3 border-b border-[var(--border-color)]" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-6 pl-5 -ml-5 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="h-3 w-28 bg-[var(--surface)] rounded" />
            <div className="h-3 w-2 bg-[var(--surface)] rounded-full" />
            <div className="h-3 w-16 bg-[var(--surface)] rounded" />
          </div>
          <div className="h-5 w-full bg-[var(--surface)] rounded mb-1.5" />
          <div className="h-5 w-3/4 bg-[var(--surface)] rounded mb-3" />
          <div className="h-3.5 w-full bg-[var(--surface)] rounded mb-1.5" />
          <div className="h-3.5 w-4/5 bg-[var(--surface)] rounded" />
        </div>
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page: pageParam } = await searchParams;
  const query = q?.trim() || '';
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  return (
    <>
      {/* ── Search Header Banner ─────────────────────────────────── */}
      <div className="bg-[var(--surface)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] mb-5">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/industry" className="hover:text-[var(--accent)] transition-colors">
              Reports
            </Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[var(--text-secondary)] font-medium">Search</span>
          </nav>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 leading-tight">
              {query ? (
                <>
                  Search results for{' '}
                  <span className="text-[var(--accent)]">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                'Search Reports'
              )}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              {query
                ? 'Showing globe market research reports matching your query.'
                : 'Enter a keyword in the search bar above to find reports.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl">
          {query ? (
            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults query={query} page={page} />
            </Suspense>
          ) : (
            <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-xl">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Start searching</h3>
              <p className="text-sm text-[var(--text-tertiary)]">
                Use the search bar in the header to find reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
