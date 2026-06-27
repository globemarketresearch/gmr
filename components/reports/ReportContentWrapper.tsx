'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { TableOfContents } from './TableOfContents';
import { FullReportTOC } from './FullReportTOC';
import { CTAPanel } from './CTAPanel';
import { CustomizeReportCard } from './CustomizeReportCard';
import { BriefWithAI } from './BriefWithAI';
import { PricingTable } from './PricingTable';
import { ReportStickyBar } from './ReportStickyBar';
import { SidebarTOCItem, TOCItem } from '@/lib/toc-utils';
import { useGeneratedTOC } from '@/hooks/useGeneratedTOC';

interface ReportContentWrapperProps {
  tableOfContents?: SidebarTOCItem[];
  fullReportTOC?: TOCItem[];
  hasFullContent: boolean;
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
  reportId?: number;
  publishedDate?: string;
  pages?: number;
  formats?: string[];
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
  publishedDate,
  pages,
  formats,
  children,
}) => {
  const [showFullTOC, setShowFullTOC] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const targetSectionRef = useRef<string | null>(null);

  // Auto-generate TOC from h2 headings if not provided
  const generatedTOC = useGeneratedTOC('article');

  // Use provided TOC or fall back to auto-generated TOC
  const activeTOC = tableOfContents || generatedTOC;

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
    <>
    <ReportStickyBar
      reportTitle={reportTitle ?? ''}
      reportSlug={reportSlug ?? ''}
      reportId={reportId}
      publishedDate={publishedDate}
      pages={pages}
      formats={formats}
      onBuyNow={() => setShowPricing(true)}
    />
    <div className={`grid grid-cols-1 gap-8 ${
      showPricing
        ? 'lg:grid-cols-[1fr_300px] 2xl:grid-cols-[1fr_360px]'
        : hasFullContent
        ? 'lg:grid-cols-[240px_1fr_300px] 2xl:grid-cols-[280px_1fr_360px]'
        : 'lg:grid-cols-[1fr_300px] 2xl:grid-cols-[1fr_380px]'
    }`}>
      {/* Left Sidebar - TOC Navigation (hidden when pricing is shown) */}
      {hasFullContent && !showPricing && (
        <aside className="hidden lg:block">
          <div
            className="sticky flex flex-col overflow-hidden transition-[top] duration-300"
            style={{
              top: 'calc(var(--sticky-bar-height, 0px) + 1.5rem)',
              maxHeight: 'calc(100vh - var(--sticky-bar-height, 0px) - 2rem)',
            }}
          >
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
        {showPricing ? (
          <PricingTable
            reportTitle={reportTitle ?? ''}
            reportId={reportId}
            reportSlug={reportSlug}
            onBack={() => setShowPricing(false)}
          />
        ) : showFullTOC ? (
          <FullReportTOC
            items={fullReportTOC ?? []}
            onClose={() => setShowFullTOC(false)}
          />
        ) : (
          children
        )}
      </main>

      {/* Right Sidebar - CTA Panel */}
      <aside className="hidden lg:block">
        <div
          className="sticky overflow-y-auto space-y-4 pr-0.5 transition-[top] duration-300"
          style={{
            top: 'calc(var(--sticky-bar-height, 0px) + 1.5rem)',
            maxHeight: 'calc(100vh - var(--sticky-bar-height, 0px) - 2rem)',
          }}
        >
          <BriefWithAI reportTitle={reportTitle} reportSlug={reportSlug} />
          <CustomizeReportCard reportTitle={reportTitle} reportSlug={reportSlug} reportId={reportId} />
          <CTAPanel discounted_price={discounted_price} price={price} reportTitle={reportTitle} reportSlug={reportSlug} reportId={reportId} onBuyNow={() => setShowPricing(true)} />
        </div>
      </aside>
    </div>
    </>
  );
};
