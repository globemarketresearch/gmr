import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Button } from '@/components/ui';

interface BookConsultationCardProps {
  className?: string;
}

export const BookConsultationCard = React.forwardRef<HTMLDivElement, BookConsultationCardProps>(
  ({ className }, ref) => {
    return (
      <Card ref={ref} className={className}>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
              style={{ background: 'rgba(29,174,191,0.12)' }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#1DAEBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </span>
            <h3 className="text-lg font-bold leading-tight">Talk to an Analyst</h3>
          </div>

          <p className="text-sm text-[var(--muted-foreground)]">
            Get expert guidance on this report before you buy.
          </p>

          <Link href="/contact">
            <Button
              variant="outline"
              className="w-full mt-2 relative overflow-hidden bg-[#E0F7FA] text-[#00838F] hover:text-[#006064] hover:bg-[#B2EBF2] border-[#80DEEA] hover:border-[#4DD0E1] focus:ring-[#1DAEBF] btn-glow-teal"
              size="lg"
            >
              Book a Consultation
              <span className="btn-shine" aria-hidden="true" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
);

BookConsultationCard.displayName = 'BookConsultationCard';
