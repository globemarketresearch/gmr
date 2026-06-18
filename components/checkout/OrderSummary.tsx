'use client';

import { Card, CardContent } from '@/components/ui';
import { getLicenseTierById, type LicenseTierFlat } from '@/lib/license-tiers';

interface OrderSummaryProps {
  reportTitle: string;
  reportSlug: string;
  price: number;
  discountedPrice: number;
  currency?: string;
  licenseId?: string;
}

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export function OrderSummary({
  reportTitle,
  currency = 'USD',
  licenseId = 'single',
}: OrderSummaryProps) {
  const license: LicenseTierFlat = getLicenseTierById(licenseId);

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Order Summary</h2>

        <div className="border-b border-[var(--border)] pb-4 space-y-1">
          <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide font-medium">Report</p>
          <p className="font-medium text-[var(--foreground)] leading-snug text-sm">{reportTitle}</p>
        </div>

        {/* License */}
        <div className="border-b border-[var(--border)] pb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--muted-foreground)]">License type</span>
            <span className="text-sm font-semibold text-[var(--foreground)]">{license.name}</span>
          </div>
          <ul className="space-y-1.5 mt-2">
            {license.includes.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-xs text-[var(--muted-foreground)]">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="flex justify-between font-bold text-lg">
          <span className="text-[var(--foreground)]">Total</span>
          <span className="text-[var(--foreground)]">
            {currency} {license.price.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
