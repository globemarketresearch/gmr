import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Button } from '@/components/ui';
import { PhoneCall } from 'lucide-react';

interface CustomizeReportCardProps {
  reportTitle?: string;
  reportSlug?: string;
  reportId?: number;
  className?: string;
}

export const CustomizeReportCard = React.forwardRef<HTMLDivElement, CustomizeReportCardProps>(
  ({ reportTitle, reportSlug, reportId, className }, ref) => {
    return (
      <Card ref={ref} className={className}>
        <CardContent className="space-y-4" style={{ border: 'none' }}>
          <h3 className="text-lg font-bold">
            Want a Free Sample?
          </h3>

          <p className="text-sm">
            Get free sample of the report to explore data, methodology, and insights before buying.
          </p>

          <Link href={reportId ? `/request-sample?reportId=${reportId}` : `/request-sample${reportTitle ? `?report=${encodeURIComponent(reportTitle)}${reportSlug ? `&slug=${encodeURIComponent(reportSlug)}` : ''}` : ''}`}>
            <Button
              variant="outline"
              className="w-full mt-4 relative overflow-hidden bg-[#1565C0] text-white hover:text-white hover:bg-[#0D47A1] border-[#1565C0] hover:border-[#0D47A1] focus:ring-[#1565C0] btn-glow-blue"
              size="lg"
            >
              Request Sample
              <span className="btn-shine" aria-hidden="true" />
            </Button>
          </Link>

          <Link href="https://www.globemarketresearch.com/request-analyst-meeting" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="w-full mt-2 relative overflow-hidden bg-[#E0F7FA] text-[#00838F] hover:text-[#006064] hover:bg-[#B2EBF2] border-[#80DEEA] hover:border-[#4DD0E1] focus:ring-[#1DAEBF] btn-glow-teal"
              size="lg"
            >
              <PhoneCall className="w-4 h-4 mr-2" aria-hidden="true" />
              Book Consultation
              <span className="btn-shine" aria-hidden="true" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
);

CustomizeReportCard.displayName = 'CustomizeReportCard';
