'use client';

import { ReactNode } from 'react';
import { TableOfContents } from '@/components/reports/TableOfContents';
import { useGeneratedTOC } from '@/hooks/useGeneratedTOC';

interface ArticleContentWrapperProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export function ArticleContentWrapper({ children, sidebar }: ArticleContentWrapperProps) {
  const tocItems = useGeneratedTOC('article');

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr_280px]">
      {/* Left Sidebar - TOC (desktop only) */}
      <aside className="hidden lg:block">
        {tocItems.length > 0 && (
          <div
            className="sticky flex flex-col overflow-hidden"
            style={{
              top: '1.5rem',
              maxHeight: 'calc(100vh - 2rem)',
            }}
          >
            <TableOfContents items={tocItems} label="Contents" />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div>{children}</div>

      {/* Right Sidebar */}
      <div>{sidebar}</div>
    </div>
  );
}
