'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Blog } from '@/lib/api/blogs.types';
import StatisticsListCard from './StatisticsListCard';
import Pagination from '@/components/reports/Pagination';
import { getBlogs, isApiError } from '@/lib/api';

const ITEMS_PER_PAGE = 8;

interface StatisticsListingClientProps {
  blogs: Blog[];
  totalItems: number;
  totalPages: number;
}

export default function StatisticsListingClient({
  blogs: initialBlogs,
  totalItems: initialTotalItems,
  totalPages: initialTotalPages,
}: StatisticsListingClientProps) {
  const storageKey = 'statistics_page';
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [, setTotalItems] = useState(initialTotalItems);
  const [isLoading, setIsLoading] = useState(false);

  // Restore page from sessionStorage and fetch on mount if not page 1
  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    const savedPage = saved ? Math.max(1, parseInt(saved, 10) || 1) : 1;
    if (savedPage !== 1) {
      setCurrentPage(savedPage);
      fetchPage(savedPage);
    }
  }, [storageKey]);

  async function fetchPage(page: number) {
    setIsLoading(true);
    const response = await getBlogs({ status: 'published', page, limit: ITEMS_PER_PAGE, sort_by: 'publish_date_desc' });
    if (!isApiError(response)) {
      setBlogs(response.data);
      if (response.meta) {
        setTotalPages(response.meta.totalPages);
        setTotalItems(response.meta.totalItems);
      }
    }
    setIsLoading(false);
  }

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem(storageKey, String(page));
    await fetchPage(page);
    document.getElementById('statistics-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Hero Banner ───────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden border-b border-[var(--border-color)]"
        style={{ background: 'var(--featured-bg)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(2,132,199,0.18) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0284c7, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Statistics</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              aria-hidden="true"
              className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl text-3xl shrink-0 mt-0.5"
              style={{
                background: 'rgba(2,132,199,0.15)',
                border: '1px solid rgba(2,132,199,0.3)',
              }}
            >
              📊
            </div>
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                style={{ background: 'rgba(2,132,199,0.2)', color: '#7dd3fc', border: '1px solid rgba(2,132,199,0.3)' }}
              >
                <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="3"/></svg>
                Data & Analysis
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3" style={{ color: '#fff', letterSpacing: '-0.03em' }}>
                Statistics & Insights
              </h1>
              <p className="text-sm sm:text-[15px] leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Expert perspectives on healthcare market trends, emerging technologies, and industry transformations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div
          className="h-px w-full"
          style={{ background: 'var(--border-color)' }}
        />
      </div>

      {/* ── Statistics List ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main id="statistics-list">

          {isLoading ? (
            <div className="space-y-4 mt-4">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <div key={i} className="h-32 bg-[var(--surface)] animate-pulse rounded-xl" />
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div>
                {blogs.map((blog) => (
                  <StatisticsListCard key={blog.id} blog={blog} />
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          ) : (
            <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-xl mt-4">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No articles found</h3>
              <p className="text-sm text-[var(--text-tertiary)]">Check back later for new content</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
