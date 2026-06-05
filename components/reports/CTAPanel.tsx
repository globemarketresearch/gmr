'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            <Image
              src="/assets/other/secure-payments.png"
              alt="Accepted payment methods"
              width={300}
              height={40}
              className="w-full h-auto mix-blend-multiply"
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);

CTAPanel.displayName = 'CTAPanel';
