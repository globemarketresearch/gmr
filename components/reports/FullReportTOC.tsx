'use client';

import { Card, CardContent } from '@/components/ui';
import { TOCItem } from '@/lib/toc-utils';
import { cn } from '@/lib/utils';

interface FullReportTOCProps {
  items: TOCItem[];
  onClose: () => void;
}

const isChapter = (item: TOCItem) => !item.number || !item.number.includes('.');

const getDepth = (item: TOCItem) =>
  item.number ? item.number.split('.').length - 1 : 0;

export const FullReportTOC: React.FC<FullReportTOCProps> = ({ items, onClose }) => {
  return (
    <div>
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6 pb-4">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">
          Table of Contents
        </h2>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card)] border border-[var(--border)] rounded-md hover:bg-[var(--muted)] transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Report
        </button>
      </div>

      {/* TOC Chapters */}
      <Card>
        <CardContent className="p-0">
          {items.map((item) => {
            if (isChapter(item)) {
              return (
                <div key={item.id}>
                  <div className="p-6 bg-[var(--muted)]">
                    <div className="font-semibold text-lg text-[#2541b2]">
                      {item.number && (
                        <span className="font-mono mr-3">Chapter {item.number}.</span>
                      )}
                      {item.title}
                    </div>
                  </div>
                </div>
              );
            }

            const depth = getDepth(item) - 1;
            return (
              <div key={item.id}>
                <div
                  className={cn(
                    'py-2.5 border-l-2 border-transparent text-black',
                    depth === 0 && 'pl-12 text-base font-medium',
                    depth === 1 && 'pl-16 text-sm',
                    depth === 2 && 'pl-20 text-sm',
                    depth >= 3 && 'pl-24 text-xs'
                  )}
                >
                  <span className="text-black font-mono mr-3">{item.number}</span>
                  {item.title}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
