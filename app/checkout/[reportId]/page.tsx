import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getReportBySlug, isApiError } from '@/lib/api';
import { CheckoutWrapper } from '@/components/checkout/CheckoutWrapper';
import { Breadcrumb } from '@/components/ui';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reportId: string }>;
}): Promise<Metadata> {
  const { reportId } = await params;
  const response = await getReportBySlug(reportId);

  if (isApiError(response)) {
    return { title: 'Checkout' };
  }

  return {
    title: `Purchase Request — ${response.data.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ reportId: string }>;
  searchParams: Promise<{ license?: string }>;
}) {
  const { reportId } = await params;
  const { license } = await searchParams;

  const response = await getReportBySlug(reportId);
  if (isApiError(response)) {
    notFound();
  }

  const report = response.data;

  const parsePriceString = (val: string | number | undefined | null): number => {
    if (typeof val === 'number') return val;
    const cleaned = String(val || '0').replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const price = parsePriceString(report.price);
  const discountedPrice = parsePriceString(report.discounted_price);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Reports', href: '/industry' },
    { label: report.title, href: `/reports/${report.slug}` },
    { label: 'Checkout' },
  ];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 md:px-6">
        <div className="mb-6">
          <Link
            href={`/reports/${report.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Report
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-8">Purchase Request</h1>

        <CheckoutWrapper
          reportSlug={report.slug}
          reportTitle={report.title}
          price={price}
          discountedPrice={discountedPrice}
          initialLicenseId={license}
        />
      </div>
    </div>
  );
}
