'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';

interface CTAPanelProps {
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
  reportId?: number;
  onBuyNow?: () => void;
}

export const CTAPanel = React.forwardRef<HTMLDivElement, CTAPanelProps>(
  ({ reportTitle, reportSlug, reportId, onBuyNow }, ref) => {
    const checkoutHref = reportId
      ? `/checkout/${reportId}`
      : reportSlug
      ? `/checkout/${reportSlug}`
      : '/contact';

    return (
      <Card ref={ref}>
        <CardContent className="space-y-2 pt-4 pb-4">
          {onBuyNow ? (
            <Button
              className="w-full relative overflow-hidden btn-glow-teal"
              size="lg"
              onClick={onBuyNow}
            >
              Buy Now
              <span className="btn-shine" aria-hidden="true" />
            </Button>
          ) : (
            <Link href={checkoutHref}>
              <Button className="w-full relative overflow-hidden btn-glow-teal" size="lg">
                Buy Now
                <span className="btn-shine" aria-hidden="true" />
              </Button>
            </Link>
          )}
          <Link href={reportId ? `/request-customization?reportId=${reportId}` : `/request-customization${reportTitle ? `?report=${encodeURIComponent(reportTitle)}${reportSlug ? `&slug=${encodeURIComponent(reportSlug)}` : ''}` : ''}`}>
            <Button
              variant="outline"
              className="w-full mt-1 bg-[#E3F2FD] hover:text-[#1565C0] text-[#1565C0] hover:bg-[#BBDEFB] border-[#90CAF9] hover:border-[#64B5F6] focus:ring-[#2196F3]"
              size="lg"
            >
              Customize This Report
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
);

CTAPanel.displayName = 'CTAPanel';
