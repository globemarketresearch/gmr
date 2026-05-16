'use client';

import Link from 'next/link';
import categories from '@/data/categories.json';

export interface FilterState {
  industries: string[];
  regions: string[];
  reportTypes: string[];
  priceRanges: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
  categoryCounts?: Record<string, number>;
  activeCategorySlug?: string;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  totalCount,
  categoryCounts = {},
  activeCategorySlug,
}: FilterSidebarProps) {
  const totalAllReports = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-5">
      {/* Browse by Industry */}
      <div className="bg-[var(--surface-raised)] border border-[var(--border-color)] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--surface)]">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
            Browse by Industry
          </h2>
        </div>
        <nav className="py-1.5">
          <Link
            href="/industry"
            className={`flex items-center px-4 py-2 text-sm transition-colors ${
              !activeCategorySlug
                ? 'text-[var(--accent)] bg-[var(--accent-muted)] font-semibold'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>All Industries</span>
          </Link>
          {categories.map((category) => {
            const isActive = category.slug === activeCategorySlug;
            const count = categoryCounts[category.name] || 0;
            return (
              <Link
                key={category.id}
                href={`/industry/${category.slug}`}
                className={`flex items-center px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'text-[var(--accent)] bg-[var(--accent-muted)] font-semibold border-l-[3px] border-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] border-l-[3px] border-transparent'
                }`}
              >
                <span>{category.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Custom Research CTA */}
      <div className="bg-[var(--featured-bg)] rounded-xl p-5 text-white">
        <h3 className="font-bold text-sm mb-1.5">Need Custom Research?</h3>
        <p className="text-white/60 text-xs leading-relaxed mb-4">
          Our analysts can create tailored reports for your specific needs and market segment.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 bg-[var(--accent)] text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
        >
          Request a Custom Report
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
