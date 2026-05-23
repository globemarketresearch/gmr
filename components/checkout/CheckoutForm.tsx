'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { CountrySelect } from '@/components/ui/country-select';
import { getDefaultCountry, type Country } from '@/lib/data/countries';
import { submitRequestSampleForm } from '@/lib/api/forms';

// ─── Payment integrations (kept for future activation) ────────────────────────
// import { PayPalButton } from './PayPalButton';
// import { StripePaymentForm } from './StripePaymentForm';
// import { createOrder, captureOrder, confirmStripeOrder } from '@/lib/api/orders';
// ──────────────────────────────────────────────────────────────────────────────

type Step = 'details' | 'payment' | 'processing' | 'success';

interface CheckoutFormProps {
  reportSlug: string;
  reportTitle: string;
}

interface CustomerDetails {
  customer_name: string;
  customer_email: string;
  customer_company: string;
  customer_job_title: string;
  customer_phone: string;
  customer_country: string;
}

const getInitialDetails = (): CustomerDetails => {
  const defaultCountry = getDefaultCountry();
  return {
    customer_name: '',
    customer_email: '',
    customer_company: '',
    customer_job_title: '',
    customer_phone: '',
    customer_country: defaultCountry.name,
  };
};

export function CheckoutForm({ reportSlug, reportTitle }: CheckoutFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [details, setDetails] = useState<CustomerDetails>(getInitialDetails);
  const [countryCode, setCountryCode] = useState<string>(getDefaultCountry().code);
  const [dialCode, setDialCode] = useState<string>(getDefaultCountry().dialCode);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── Payment state (kept for future activation) ─────────────────────────────
  // const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe'>('stripe');
  // const [orderId, setOrderId] = useState<number | null>(null);
  // const [paypalOrderId, setPaypalOrderId] = useState<string>('');
  // const [stripeClientSecret, setStripeClientSecret] = useState<string>('');
  // ────────────────────────────────────────────────────────────────────────────

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await submitRequestSampleForm({
        fullName: details.customer_name,
        email: details.customer_email,
        company: details.customer_company,
        jobTitle: details.customer_job_title || 'Not specified',
        phone: details.customer_phone || undefined,
        country: details.customer_country,
        countryCode,
        dialCode,
        reportTitle,
        reportSlug,
        additionalInfo: 'Buy Now Request',
      });

      if (!result.success) {
        setError(result.message || 'Failed to submit request. Please try again.');
        return;
      }

      router.push('/order-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Payment handlers (kept for future activation) ──────────────────────────
  // const handlePayPalApprove = async (_paypalOrderId: string) => { ... };
  // const handlePayPalError = (err: unknown) => { ... };
  // const handleStripeSuccess = async () => { ... };
  // const handleStripeError = (message: string) => { ... };
  // ────────────────────────────────────────────────────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCountryChange = (country: Country) => {
    setCountryCode(country.code);
    setDialCode(country.dialCode);
    setDetails(prev => ({ ...prev, customer_country: country.name }));
  };

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="animate-spin h-10 w-10 border-4 border-[var(--primary)] border-t-transparent rounded-full" />
        <p className="text-[var(--foreground)] font-medium">Submitting your request...</p>
        <p className="text-sm text-[var(--muted-foreground)]">Please do not close this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customer_name"
              value={details.customer_name}
              onChange={handleChange}
              required
              placeholder="John Smith"
              className="w-full border border-[var(--border-color)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="customer_email"
              value={details.customer_email}
              onChange={handleChange}
              required
              placeholder="john@company.com"
              className="w-full border border-[var(--border-color)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              We&apos;ll use this to confirm your request and share invoice details.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                name="customer_company"
                value={details.customer_company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full border border-[var(--border-color)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="customer_job_title"
                value={details.customer_job_title}
                onChange={handleChange}
                placeholder="Market Analyst"
                className="w-full border border-[var(--border-color)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Country
              </label>
              <CountrySelect
                value={countryCode}
                onChange={handleCountryChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="customer_phone"
                value={details.customer_phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full border border-[var(--border-color)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          {/* ─── Payment method selector (kept for future activation) ──────────
          <div>
            <p className="text-sm font-medium text-[var(--foreground)] mb-2">Payment method</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setPaymentMethod('stripe')} ... >
                Credit / Debit Card
              </button>
              <button type="button" onClick={() => setPaymentMethod('paypal')} ... >
                PayPal
              </button>
            </div>
          </div>
          ─────────────────────────────────────────────────────────────────── */}

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Purchase Request'}
            </Button>
          </div>

          <p className="text-xs text-center text-[var(--muted-foreground)]">
            By submitting this form you agree to our Terms of Service. Our team will
            reach out within 1 business day with an invoice and delivery details.
          </p>
        </form>
      )}

      {/* ─── Payment step (kept for future activation) ──────────────────────────
      {step === 'payment' && (
        <div className="space-y-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-md p-4 text-sm">
            <p className="font-medium text-[var(--foreground)] mb-1">Delivering to</p>
            <p className="text-[var(--muted-foreground)]">{details.customer_name} · {details.customer_email}</p>
            <button type="button" onClick={() => setStep('details')} className="text-[var(--primary)] text-xs mt-1 hover:underline">
              Edit details
            </button>
          </div>
          ...StripePaymentForm / PayPalButton rendered here...
        </div>
      )}
      ──────────────────────────────────────────────────────────────────────── */}
    </div>
  );
}
