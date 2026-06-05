'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckoutForm } from './CheckoutForm';
import { OrderSummary } from './OrderSummary';

interface CheckoutWrapperProps {
  reportSlug: string;
  reportTitle: string;
  price: number;
  discountedPrice: number;
  initialLicenseId?: string;
}

export function CheckoutWrapper({
  reportSlug,
  reportTitle,
  price,
  discountedPrice,
  initialLicenseId = 'single',
}: CheckoutWrapperProps) {
  const [selectedLicenseId, setSelectedLicenseId] = useState(initialLicenseId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left: form */}
      <div className="lg:col-span-3 bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
        <CheckoutForm
          reportSlug={reportSlug}
          reportTitle={reportTitle}
          licenseId={selectedLicenseId}
          onLicenseChange={setSelectedLicenseId}
        />
      </div>

      {/* Right: order summary */}
      <div className="lg:col-span-2 space-y-4">
        <OrderSummary
          reportTitle={reportTitle}
          reportSlug={reportSlug}
          price={price}
          discountedPrice={discountedPrice}
          currency="USD"
          licenseId={selectedLicenseId}
        />

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 text-xs text-[var(--muted-foreground)] space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your information is handled securely</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Our team will follow up within 1 business day</span>
          </div>
        </div>

        <p className="text-xs text-[var(--muted-foreground)]">
          Questions?{' '}
          <Link href="/contact" className="text-[var(--primary)] hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
