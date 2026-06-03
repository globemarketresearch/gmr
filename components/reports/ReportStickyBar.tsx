'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ReportStickyBarProps {
  reportTitle: string;
  reportSlug: string;
  reportId?: number;
  publishedDate?: string;
  pages?: number;
  formats?: string[];
}

// Colored SVG icons for each document format
function FormatIcon({ type }: { type: string }) {
  const key = type.trim().toUpperCase();

  if (key === 'PDF') {
    return (
      <span title="PDF" className="inline-flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0"
        style={{ background: '#FEE2E2' }}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <rect x="4" y="2" width="12" height="16" rx="1.5" fill="#DC2626" />
          <rect x="8" y="14" width="8" height="6" rx="1.5" fill="#B91C1C" />
          <path d="M10 2v5h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="5.5" y="13" fontSize="4.5" fill="#fff" fontWeight="700" fontFamily="Arial,sans-serif">PDF</text>
        </svg>
      </span>
    );
  }

  if (key === 'EXCEL' || key === 'XLS' || key === 'XLSX') {
    return (
      <span title="Excel" className="inline-flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0"
        style={{ background: '#DCFCE7' }}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <rect x="4" y="2" width="12" height="16" rx="1.5" fill="#16A34A" />
          <rect x="8" y="14" width="8" height="6" rx="1.5" fill="#15803D" />
          <path d="M10 2v5h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="5" y="13" fontSize="4.2" fill="#fff" fontWeight="700" fontFamily="Arial,sans-serif">XLS</text>
        </svg>
      </span>
    );
  }

  if (key === 'WORD' || key === 'DOC' || key === 'DOCX') {
    return (
      <span title="Word" className="inline-flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0"
        style={{ background: '#DBEAFE' }}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <rect x="4" y="2" width="12" height="16" rx="1.5" fill="#2563EB" />
          <rect x="8" y="14" width="8" height="6" rx="1.5" fill="#1D4ED8" />
          <path d="M10 2v5h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="5" y="13" fontSize="4.2" fill="#fff" fontWeight="700" fontFamily="Arial,sans-serif">DOC</text>
        </svg>
      </span>
    );
  }

  if (key === 'PPT' || key === 'PPTX' || key === 'POWERPOINT') {
    return (
      <span title="PowerPoint" className="inline-flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0"
        style={{ background: '#FFEDD5' }}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <rect x="4" y="2" width="12" height="16" rx="1.5" fill="#EA580C" />
          <rect x="8" y="14" width="8" height="6" rx="1.5" fill="#C2410C" />
          <path d="M10 2v5h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="5.5" y="13" fontSize="4.2" fill="#fff" fontWeight="700" fontFamily="Arial,sans-serif">PPT</text>
        </svg>
      </span>
    );
  }

  // Generic fallback
  return (
    <span title={type} className="inline-flex items-center justify-center px-1.5 h-5 rounded text-[10px] font-bold flex-shrink-0"
      style={{ background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' }}>
      {type.slice(0, 4).toUpperCase()}
    </span>
  );
}

// Default formats shown when backend provides none
const DEFAULT_FORMATS = ['PDF', 'Excel'];

export function ReportStickyBar({
  reportTitle,
  reportSlug,
  reportId,
  publishedDate,
  pages,
  formats,
}: ReportStickyBarProps) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Keep --sticky-bar-height in sync with actual rendered height (handles responsive breakpoints)
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const update = () => {
      if (visible) {
        document.documentElement.style.setProperty('--sticky-bar-height', `${el.offsetHeight}px`);
      }
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, [visible]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = !entry.isIntersecting;
        setVisible(isVisible);
        if (!isVisible) {
          document.documentElement.style.setProperty('--sticky-bar-height', '0px');
        }
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty('--sticky-bar-height', '0px');
    };
  }, []);

  const buyHref = reportId ? `/checkout/${reportId}` : `/checkout/${reportSlug}`;
  const sampleHref = `/request-sample?report=${reportSlug}`;
  const activeFormats = formats && formats.length > 0 ? formats : DEFAULT_FORMATS;

  return (
    <>
      {/* Sentinel — placed right after the hero; bar appears when this leaves viewport */}
      <div ref={sentinelRef} aria-hidden="true" />

      <div
        ref={barRef}
        className={`fixed left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{ top: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
        aria-hidden={!visible}
      >
        <div className="max-w-[1400px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] md:h-[96px] flex items-center gap-4">

          {/* Logo — same size as primary header */}
          <Link href="/" className="flex-shrink-0 hidden sm:block">
            <Image
              src="/assets/images/logo.jpg"
              alt="Globe Market Research"
              width={360}
              height={106}
              className="h-[58px] w-auto max-w-[216px] object-contain md:h-[77px] md:max-w-[264px]"
            />
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-10 md:h-12 w-px bg-gray-200 flex-shrink-0" />

          {/* Title + metadata row */}
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-gray-900 truncate leading-snug">
              {reportTitle}
            </p>
            <div className="hidden sm:flex items-center gap-2 mt-1 flex-wrap">
              {publishedDate && (
                <span className="text-xs text-gray-500">Published: {publishedDate}</span>
              )}
              {pages && (
                <>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-xs text-gray-500">{pages}+ Pages</span>
                </>
              )}
              {activeFormats.length > 0 && (
                <>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-xs text-gray-500 mr-0.5">Formats:</span>
                  <div className="flex items-center gap-1">
                    {activeFormats.map((fmt) => (
                      <FormatIcon key={fmt} type={fmt} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href={sampleHref} className="hidden sm:block">
              <button
                className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:px-4 text-sm font-semibold rounded-lg text-white transition-all duration-200 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #1DAEBF 0%, #2CC8D8 100%)',
                  boxShadow: '0 0 0 1px rgba(44,200,216,0.3), 0 2px 8px rgba(44,200,216,0.25)',
                }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Request Sample
              </button>
            </Link>

            <Link href={buyHref}>
              <button
                className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:px-4 text-sm font-semibold rounded-lg text-white transition-all duration-200 whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                  boxShadow: '0 0 0 1px rgba(249,115,22,0.3), 0 2px 8px rgba(249,115,22,0.25)',
                }}
              >
                <svg className="w-4 h-4 flex-shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
