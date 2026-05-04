'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui';
import { TOCChapter } from '@/lib/toc-utils';
import { TOCChapterItem } from './TOCChapterItem';

interface FullReportTOCProps {
  chapters: TOCChapter[];
  onClose: () => void;
}

export const FullReportTOC: React.FC<FullReportTOCProps> = ({
  chapters,
  onClose,
}) => {
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);

  const toggleChapter = (chapterId: string) => {
    setOpenChapterId(openChapterId === chapterId ? null : chapterId);
  };

  return (
    <div>
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">
          Table of Contents
        </h2>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card)] border border-[var(--border)] rounded-md hover:bg-[var(--muted)] transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Report
        </button>
      </div>

      {/* TOC Chapters */}
      <Card>
        <CardContent className="p-0">
          {chapters.map((chapter) => (
            <TOCChapterItem
              key={chapter.id}
              chapter={chapter}
              isOpen={openChapterId === chapter.id}
              onToggle={() => toggleChapter(chapter.id)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
