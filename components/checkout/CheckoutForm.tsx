'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { CountrySelect } from '@/components/ui/country-select';
import { getDefaultCountry, type Country } from '@/lib/data/countries';
import { submitRequestSampleForm } from '@/lib/api/forms';
import { getLicenseTierById, LICENSE_TIERS } from '@/lib/license-tiers';
import { isBusinessEmail } from '@/lib/validators';

// ─── Payment integrations (kept for future activation) ────────────────────────
// import { PayPalButton } from './PayPalButton';
// import { StripePaymentForm } from './StripePaymentForm';
// import { createOrder, captureOrder, confirmStripeOrder } from '@/lib/api/orders';
// ──────────────────────────────────────────────────────────────────────────────

type Step = 'details' | 'payment' | 'processing' | 'success';

interface CheckoutFormProps {
  reportSlug: string;
  reportTitle: string;
  licenseId?: string;
  onLicenseChange?: (id: string) => void;
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

const VisaIcon = () => (
  <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-auto">
    <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#1A1F71" letterSpacing="-0.5">VISA</text>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
    <circle cx="14" cy="12" r="10" fill="#EB001B"/>
    <circle cx="24" cy="12" r="10" fill="#F79E1B"/>
    <path d="M19 4.8a10 10 0 010 14.4A10 10 0 0119 4.8z" fill="#FF5F00"/>
  </svg>
);

const AmexIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 52 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-auto">
    <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="16" fill={active ? '#fff' : '#2E77BC'} letterSpacing="0.5">AMEX</text>
  </svg>
);

const PayPalIcon = () => (
  <svg viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-auto">
    <text x="0" y="16" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="16" fill="#003087">Pay</text>
    <text x="32" y="16" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="16" fill="#009cde">Pal</text>
  </svg>
);

const BankIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

type PaymentMethod = 'visa' | 'mastercard' | 'amex' | 'paypal' | 'wire';

export function CheckoutForm({ reportSlug, reportTitle, licenseId = 'single', onLicenseChange }: CheckoutFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [selectedLicenseId, setSelectedLicenseId] = useState(licenseId);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('visa');
  const [details, setDetails] = useState<CustomerDetails>(getInitialDetails);
  const [countryCode, setCountryCode] = useState<string>(getDefaultCountry().code);
  const [dialCode, setDialCode] = useState<string>(getDefaultCountry().dialCode);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedLicense = getLicenseTierById(selectedLicenseId);

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isBusinessEmail(details.customer_email)) {
      setError('Please use a business email address.');
      return;
    }

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
                  onClick={() => { setSelectedLicenseId(tier.id); onLicenseChange?.(tier.id); }}
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
            <div className="flex flex-wrap gap-2">
              {/* Visa */}
              <button
                type="button"
                onClick={() => setPaymentMethod('visa')}
                className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-150 min-w-[72px] h-10 ${
                  paymentMethod === 'visa'
                    ? 'border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50 bg-white'
                }`}
              >
                <VisaIcon />
              </button>

              {/* Mastercard */}
              <button
                type="button"
                onClick={() => setPaymentMethod('mastercard')}
                className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-150 min-w-[72px] h-10 ${
                  paymentMethod === 'mastercard'
                    ? 'border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50 bg-white'
                }`}
              >
                <MastercardIcon />
              </button>

              {/* Amex */}
              <button
                type="button"
                onClick={() => setPaymentMethod('amex')}
                className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-150 min-w-[72px] h-10 ${
                  paymentMethod === 'amex'
                    ? 'border-[var(--primary)] bg-[var(--primary)] ring-1 ring-[var(--primary)]'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50 bg-white'
                }`}
              >
                <AmexIcon active={paymentMethod === 'amex'} />
              </button>

              {/* PayPal */}
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-150 min-w-[80px] h-10 ${
                  paymentMethod === 'paypal'
                    ? 'border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50 bg-white'
                }`}
              >
                <PayPalIcon />
              </button>

              {/* Wire Transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod('wire')}
                className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border transition-all duration-150 h-10 ${
                  paymentMethod === 'wire'
                    ? 'border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)] text-[var(--primary)]'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50 bg-white text-[var(--muted-foreground)]'
                }`}
              >
                <BankIcon />
                <span className="text-xs font-medium whitespace-nowrap">Wire Transfer</span>
              </button>
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
