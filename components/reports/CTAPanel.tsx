'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { LICENSE_TIERS, type LicenseTier } from '@/lib/license-tiers';

interface CTAPanelProps {
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
  reportId?: number;
}

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const CTAPanel = React.forwardRef<HTMLDivElement, CTAPanelProps>(
  ({ reportTitle, reportSlug, reportId }, ref) => {
    const [selected, setSelected] = useState<LicenseTier>(LICENSE_TIERS[0]);

    const checkoutHref = reportId
      ? `/checkout/${reportId}?license=${selected.id}`
      : reportSlug
      ? `/checkout/${reportSlug}?license=${selected.id}`
      : '/contact';

    return (
      <Card ref={ref}>
        <CardContent className="space-y-3 pt-4 pb-4">
          {/* License selector tabs */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
              Select License
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {LICENSE_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelected(tier)}
                  className={`relative text-left rounded-md px-2.5 py-2 text-xs border transition-all duration-150 ${
                    selected.id === tier.id
                      ? 'border-[var(--primary)] bg-[var(--primary)]/8 text-[var(--primary)] font-semibold'
                      : 'border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-2 right-1.5 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {tier.badge}
                    </span>
                  )}
                  <span className="block leading-tight">{tier.name}</span>
                  <span className={`block font-bold mt-0.5 ${selected.id === tier.id ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'}`}>
                    ${tier.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* What's included */}
          <div className="pt-1 border-t border-[var(--border)]">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
              What&apos;s Included
            </h4>
            <ul className="space-y-1.5">
              {selected.includes.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs text-[var(--muted-foreground)]">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA buttons */}
          <div className="space-y-2 pt-1">
            <Link href={checkoutHref}>
              <Button className="w-full relative overflow-hidden btn-glow-teal" size="lg">
                Buy Now — ${selected.price.toLocaleString()}
                <span className="btn-shine" aria-hidden="true" />
              </Button>
            </Link>
            <Link href={reportId ? `/request-customization?reportId=${reportId}` : `/request-customization${reportTitle ? `?report=${encodeURIComponent(reportTitle)}${reportSlug ? `&slug=${encodeURIComponent(reportSlug)}` : ''}` : ''}`}>
              <Button
                variant="outline"
                className="w-full mt-1 bg-[#E3F2FD] hover:text-[#1565C0] text-[#1565C0] hover:bg-[#BBDEFB] border-[#90CAF9] hover:border-[#64B5F6] focus:ring-[#2196F3]"
                size="lg"
              >
                Customize This Report
              </Button>
            </Link>
          </div>

          {/* Payment methods */}
          <div className="pt-2 border-t border-[var(--border)]">
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-2 font-semibold">
              Accepted Payments
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Credit / Debit Card */}
              <div className="flex items-center gap-1 bg-[var(--surface,#f8fafc)] border border-[var(--border)] rounded px-2 py-1">
                <svg className="w-4 h-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" strokeLinecap="round" />
                </svg>
                <span className="text-[10px] text-[var(--muted-foreground)] font-medium">Card</span>
              </div>
              {/* PayPal */}
              <div className="flex items-center gap-1 bg-[var(--surface,#f8fafc)] border border-[var(--border)] rounded px-2 py-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 21H4.5L6.5 8h5.5c2.5 0 4.5 1.5 4 4.5C15.5 15.5 13 17 10.5 17H8.5L7.5 21Z" fill="#003087"/>
                  <path d="M10.5 17h2c2.5 0 5-1.5 5.5-4.5.5-2.5-1-4.5-3.5-4.5H11" fill="#009cde"/>
                </svg>
                <span className="text-[10px] text-[var(--muted-foreground)] font-medium">PayPal</span>
              </div>
              {/* Wire Transfer */}
              <div className="flex items-center gap-1 bg-[var(--surface,#f8fafc)] border border-[var(--border)] rounded px-2 py-1">
                <svg className="w-4 h-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="text-[10px] text-[var(--muted-foreground)] font-medium">Wire</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

CTAPanel.displayName = 'CTAPanel';
