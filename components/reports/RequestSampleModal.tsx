"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Captcha, type CaptchaRef } from "@/components/ui";
import { CountrySelect } from "@/components/ui/country-select";
import { submitRequestSampleForm, isFormError } from "@/lib/api";
import { getDefaultCountry, type Country } from "@/lib/data/countries";
import { isBusinessEmail } from "@/lib/validators";

interface Props {
  reportTitle: string;
  reportSlug: string;
  delayMs?: number;
}

export function RequestSampleModal({ reportTitle, reportSlug, delayMs = 60000 }: Props) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const captchaRef = useRef<CaptchaRef>(null);
  const defaultCountry = getDefaultCountry();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    country: defaultCountry.name,
    countryCode: defaultCountry.code,
    dialCode: defaultCountry.dialCode,
  });

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [dismissed, delayMs]);

  const close = useCallback(() => {
    setOpen(false);
    setDismissed(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCountryChange = (country: Country) => {
    setFormData((prev) => ({
      ...prev,
      country: country.name,
      countryCode: country.code,
      dialCode: country.dialCode,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isBusinessEmail(formData.email)) {
      setError("Please use a business email address.");
      return;
    }

    if (!captchaRef.current?.validate()) {
      setError("Please enter the captcha correctly.");
      return;
    }

    setIsSubmitting(true);

    const response = await submitRequestSampleForm({
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      jobTitle: formData.jobTitle,
      phone: formData.phone ? `${formData.dialCode}${formData.phone}` : undefined,
      country: formData.country,
      countryCode: formData.countryCode,
      dialCode: formData.dialCode,
      reportTitle,
      reportSlug,
    });

    setIsSubmitting(false);

    if (isFormError(response)) {
      setError(response.message);
      captchaRef.current?.reset();
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setDismissed(true);
    }, 3000);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Request a free sample report"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-[var(--border-color)]"
        style={{
          background: "linear-gradient(160deg, #eef6fb 0%, #f8fbff 40%, #edf3fa 100%)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-5 rounded-t-2xl border-b border-[var(--border-color)]"
          style={{ background: "var(--featured-bg)" }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#7dd3fc" }}>
              Free Sample
            </p>
            <h2 className="text-lg font-bold leading-tight" style={{ color: "#fff" }}>
              Get Your Free Report Sample
            </h2>
            <p className="text-xs mt-1 line-clamp-2" style={{ color: "rgba(255,255,255,0.55)" }}>
              {reportTitle}
            </p>
          </div>
          <button
            onClick={close}
            className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.6)" }}
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="relative px-6 py-6 overflow-hidden">
          {/* Decorative dot grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle, #0284c7 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
          />
          <div className="relative">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Request Submitted!</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Your sample request has been received. We will send the report to your email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-fullName" className="block text-xs font-medium mb-1 text-[var(--foreground)]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="modal-fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-[#c8dce9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white/80 text-[var(--foreground)]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-medium mb-1 text-[var(--foreground)]">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-[#c8dce9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white/80 text-[var(--foreground)]"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-company" className="block text-xs font-medium mb-1 text-[var(--foreground)]">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="modal-company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-[#c8dce9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white/80 text-[var(--foreground)]"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="modal-jobTitle" className="block text-xs font-medium mb-1 text-[var(--foreground)]">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="modal-jobTitle"
                    name="jobTitle"
                    required
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-[#c8dce9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white/80 text-[var(--foreground)]"
                    placeholder="VP of Strategy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-[var(--foreground)]">Country *</label>
                  <CountrySelect
                    value={formData.countryCode}
                    onChange={handleCountryChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-medium mb-1 text-[var(--foreground)]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-[#c8dce9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white/80 text-[var(--foreground)]"
                    placeholder="123-456-7890"
                  />
                </div>
              </div>

              <Captcha ref={captchaRef} />

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request Free Sample"}
              </Button>

              <p className="text-[10px] text-center text-[var(--muted-foreground)]">
                Free, no obligation. Delivered within 24 hours.
              </p>
            </form>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
