'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { CountrySelect } from '@/components/ui/country-select';
import { getDefaultCountry, type Country } from '@/lib/data/countries';
import { submitRequestSampleForm } from '@/lib/api/forms';
import { getLicenseTierById, LICENSE_TIERS } from '@/lib/license-tiers';

// ─── Payment integrations (kept for future activation) ────────────────────────
// import { PayPalButton } from './PayPalButton';
// import { StripePaymentForm } from './StripePaymentForm';
// import { createOrder, captureOrder, confirmStripeOrder } from '@/lib/api/orders';
// ──────────────────────────────────────────────────────────────────────────────

type Step = 'details' | 'payment' | 'processing' | 'success';
type PaymentMethod = 'card' | 'paypal' | 'wire';

interface CheckoutFormProps {
  reportSlug: string;
  reportTitle: string;
  licenseId?: string;
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

const PAYMENT_METHODS: { id: PaymentMethod; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard, Amex',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 21H4.5L6.5 8h5.5c2.5 0 4.5 1.5 4 4.5C15.5 15.5 13 17 10.5 17H8.5L7.5 21Z" fill="#003087"/>
        <path d="M10.5 17h2c2.5 0 5-1.5 5.5-4.5.5-2.5-1-4.5-3.5-4.5H11" fill="#009cde"/>
      </svg>
    ),
  },
  {
    id: 'wire',
    label: 'Wire Transfer',
    description: 'Bank transfer / SWIFT',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export function CheckoutForm({ reportSlug, reportTitle, licenseId = 'single' }: CheckoutFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [selectedLicenseId, setSelectedLicenseId] = useState(licenseId);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [details, setDetails] = useState<CustomerDetails>(getInitialDetails);
  const [countryCode, setCountryCode] = useState<string>(getDefaultCountry().code);
  const [dialCode, setDialCode] = useState<string>(getDefaultCountry().dialCode);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedLicense = getLicenseTierById(selectedLicenseId);

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
        additionalInfo: `Buy Now Request — License: ${selectedLicense.name} (USD ${selectedLicense.price.toLocaleString()}) — Payment: ${paymentMethod}`,
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
        <form onSubmit={handleDetailsSubmit} className="space-y-6">

          {/* ── License Selection ─────────────────────────────────────── */}
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)] mb-3">License Type</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LICENSE_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedLicenseId(tier.id)}
                  className={`relative text-left rounded-lg px-3 py-2.5 border transition-all duration-150 ${
                    selectedLicenseId === tier.id
                      ? 'border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-2.5 right-2 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {tier.badge}
                    </span>
                  )}
                  <span className={`block text-xs font-medium leading-tight ${selectedLicenseId === tier.id ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'}`}>
                    {tier.name}
                  </span>
                  <span className={`block text-sm font-bold mt-0.5 ${selectedLicenseId === tier.id ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'}`}>
                    ${tier.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Payment Method ────────────────────────────────────────── */}
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Payment Method</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 border text-left transition-all duration-150 ${
                    paymentMethod === method.id
                      ? 'border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  <span className={paymentMethod === method.id ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}>
                    {method.icon}
                  </span>
                  <div>
                    <p className={`text-xs font-semibold leading-tight ${paymentMethod === method.id ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'}`}>
                      {method.label}
                    </p>
                    <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{method.description}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">
              Our team will send payment instructions to your email after submission.
            </p>
          </div>

          {/* ── Your Details ──────────────────────────────────────────── */}
          <div className="border-t border-[var(--border)] pt-6 space-y-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Your Details</p>

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
          </div>

          <div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : `Submit Purchase Request — USD ${selectedLicense.price.toLocaleString()}`}
            </Button>
          </div>

          <p className="text-xs text-center text-[var(--muted-foreground)]">
            By submitting this form you agree to our Terms of Service. Our team will
            reach out within 1 business day with an invoice and payment details.
          </p>
        </form>
      )}
    </div>
  );
}
