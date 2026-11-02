import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Order Confirmation — GlobeMarketResearch',
  description: 'Your purchase request has been received. Our team will reach out within 1 business day.',
  robots: { index: false, follow: false },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ paid?: string }>;
}) {
  const { paid } = await searchParams;
  const isPaid = paid === '1';

  return (
    <div className="bg-[var(--background)] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6 py-16">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
            {isPaid ? 'Payment Confirmed!' : 'Request Received!'}
          </h1>
          <p className="text-[var(--muted-foreground)]">
            {isPaid
              ? 'Thank you for your purchase. A confirmation email with your order details is on its way.'
              : 'Thank you for your interest. We’ve received your purchase request and will be in touch shortly.'}
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 text-left space-y-3">
          <h2 className="font-semibold text-[var(--foreground)]">What happens next?</h2>
          {isPaid ? (
            <ol className="space-y-2 text-sm text-[var(--muted-foreground)] list-decimal list-inside">
              <li>You&apos;ll receive an order confirmation email shortly.</li>
              <li>Our team prepares your report for your selected license.</li>
              <li>Your report will be delivered by email within <strong className="text-[var(--foreground)]">2–3 business days</strong>.</li>
            </ol>
          ) : (
            <ol className="space-y-2 text-sm text-[var(--muted-foreground)] list-decimal list-inside">
              <li>Our team will review your request and prepare an invoice.</li>
              <li>You&apos;ll receive an email within <strong className="text-[var(--foreground)]">1 business day</strong> with payment instructions.</li>
              <li>Once payment is confirmed, your report will be delivered within <strong className="text-[var(--foreground)]">2–3 business days</strong>.</li>
            </ol>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/industry">
            <Button variant="outline" size="lg">
              Browse More Reports
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
