"use client";

import Link from 'next/link';
import type { Report } from '@/lib/api/reports.types';

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
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

  const priceNum = report.price ? parseInt(report.price.replace(/[^0-9]/g, '')) : 0;
  const hasPrice = priceNum > 0;

  return (
    <Link href={`/reports/${report.slug}`} className="group block mb-3">
      <article
        className="relative rounded-xl px-5 py-5 transition-all duration-200 border"
        style={{
          background: 'var(--surface-raised)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'var(--accent)';
          el.style.boxShadow = 'var(--shadow-card-hover)';
          el.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'var(--border-color)';
          el.style.boxShadow = 'var(--shadow-card)';
          el.style.transform = 'translateY(0)';
        }}
      >
        {/* Top row: category chip + date + region */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
              style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
            >
              {report.category}
            </span>
            {report.reportType && (
              <span
                className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full"
                style={{ background: 'var(--surface)', color: 'var(--text-tertiary)', border: '1px solid var(--border-color)' }}
              >
                {report.reportType}
              </span>
            )}
          </div>
          {formattedDate && (
            <time className="text-xs shrink-0" style={{ color: 'var(--text-tertiary)' }}>{formattedDate}</time>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-[16px] font-bold leading-snug mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]"
          style={{ color: 'var(--text-primary)' }}
        >
          {report.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
          {report.summary}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              {report.region}
            </span>
            {report.pages > 0 && (
              <>
                <span style={{ color: 'var(--border-color)' }}>·</span>
                <span>{report.pages} pages</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {hasPrice && (
              <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {report.price}
              </span>
            )}
            <span
              className="text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0"
              style={{ color: 'var(--accent)' }}
            >
              View Report
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
