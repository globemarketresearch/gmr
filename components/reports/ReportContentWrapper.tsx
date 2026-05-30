'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { TableOfContents } from './TableOfContents';
import { FullReportTOC } from './FullReportTOC';
import { CTAPanel } from './CTAPanel';
import { CustomizeReportCard } from './CustomizeReportCard';
import { BriefWithAI } from './BriefWithAI';
import { groupTableOfContents, SidebarTOCItem, TOCItem } from '@/lib/toc-utils';
import { useGeneratedTOC } from '@/hooks/useGeneratedTOC';

interface ReportContentWrapperProps {
  tableOfContents?: SidebarTOCItem[];  // For sidebar navigation (optional, will be auto-generated if not provided)
  fullReportTOC?: TOCItem[];           // For full report TOC modal
  hasFullContent: boolean;
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
  reportId?: number;
  children: ReactNode;
}

export const ReportContentWrapper: React.FC<ReportContentWrapperProps> = ({
  tableOfContents,
  fullReportTOC,
  hasFullContent,
  price,
  discounted_price,
  reportTitle,
  reportSlug,
  reportId,
  children,
}) => {
  const [showFullTOC, setShowFullTOC] = useState(false);
  const targetSectionRef = useRef<string | null>(null);

  // Auto-generate TOC from h2 headings if not provided
  const generatedTOC = useGeneratedTOC('article');

  // Use provided TOC or fall back to auto-generated TOC
  const activeTOC = tableOfContents || generatedTOC;

  // Transform full report TOC data into chapters
  const chapters = fullReportTOC ? groupTableOfContents(fullReportTOC) : [];

  // Handle scroll to top when full TOC is opened
  useEffect(() => {
    if (showFullTOC) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [showFullTOC]);

  // Handle navigation to section after closing full TOC
  useEffect(() => {
    if (!showFullTOC && targetSectionRef.current) {
      const targetId = targetSectionRef.current;

      // Use setTimeout to allow DOM to update after render
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }

        // Clear the ref after scrolling
        targetSectionRef.current = null;
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [showFullTOC]);

  // Callback to handle navigation from sidebar TOC when full TOC is open
  const handleNavigateToSection = (sectionId: string) => {
    targetSectionRef.current = sectionId;
    setShowFullTOC(false);
  };

  return (
    <div className={`grid grid-cols-1 gap-8 ${hasFullContent ? 'lg:grid-cols-[240px_1fr_300px] 2xl:grid-cols-[280px_1fr_360px]' : 'lg:grid-cols-[1fr_300px] 2xl:grid-cols-[1fr_380px]'}`}>
      {/* Left Sidebar - TOC Navigation */}
      {hasFullContent && (
        <aside className="hidden lg:block">
          <div className="sticky top-32 max-h-[calc(100vh-10rem)] flex flex-col overflow-hidden">
            {activeTOC && activeTOC.length > 0 && (
              <TableOfContents
                items={activeTOC}
                onShowFullTOC={() => setShowFullTOC(true)}
                showFullTOC={showFullTOC}
                onNavigateToSection={handleNavigateToSection}
              />
            )}
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main>
        {showFullTOC ? (
          <FullReportTOC
            chapters={chapters}
            onClose={() => setShowFullTOC(false)}
          />
        ) : (
          children
        )}
      </main>

      {/* Right Sidebar - CTA Panel */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto space-y-4 pr-0.5">
          <BriefWithAI reportTitle={reportTitle} reportSlug={reportSlug} />
          <CustomizeReportCard reportTitle={reportTitle} reportSlug={reportSlug} reportId={reportId} />
          <CTAPanel discounted_price={discounted_price} price={price} reportTitle={reportTitle} reportSlug={reportSlug} reportId={reportId} />
        </div>
      </aside>
    </div>
  );
};
