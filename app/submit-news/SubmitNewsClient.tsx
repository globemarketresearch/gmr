"use client";

import { useState, useRef, useEffect } from "react";
import { Section, Container, Button, Captcha, type CaptchaRef } from "@/components/ui";
import { CountrySelect } from "@/components/ui/country-select";
import { submitPublishNewsForm, isFormError } from "@/lib/api";
import { getDefaultCountry, type Country } from "@/lib/data/countries";

// ── Types ──────────────────────────────────────────────────────────────────

interface PricingPlan {
  badge: string;
  price: string;
  priceNote: string;
  description: string;
  highlight: string;
  buttonLabel: string;
  planKey: string;
}

const PLANS: PricingPlan[] = [
  {
    badge: "Pay\nPer Use",
    price: "$150",
    priceNote: "Per News",
    description: "Submit Your News As Needed",
    highlight: "",
    buttonLabel: "Publish Now",
    planKey: "Pay Per Use – $150/news",
  },
  {
    badge: "10\nCredits",
    price: "$1,500",
    priceNote: "Credits Remain Valid For 12 Months",
    description: "Submit 10 press releases and unlock an instant 10% discount!",
    highlight: "Save 10%",
    buttonLabel: "Activate Credits",
    planKey: "10 Credits – $1,500",
  },
  {
    badge: "25\nCredits",
    price: "$2,500",
    priceNote: "Credits Remain Valid For 12 Months",
    description: "Submit 25 press releases and unlock an instant 20% discount!",
    highlight: "Save 20%",
    buttonLabel: "Activate Credits",
    planKey: "25 Credits – $2,500",
  },
  {
    badge: "50\nCredits",
    price: "$5,000",
    priceNote: "Credits Remain Valid For 12 Months",
    description: "Submit 50 press releases and unlock an instant 30% discount!",
    highlight: "Save 30%",
    buttonLabel: "Activate Credits",
    planKey: "50 Credits – $5,000",
  },
];

const INDUSTRIES = [
  "Healthcare & Life Sciences",
  "Technology & IT",
  "Financial Services & Banking",
  "Energy & Utilities",
  "Automotive & Transportation",
  "Consumer Goods & Retail",
  "Food & Beverages",
  "Chemicals & Materials",
  "Agriculture & Agri-Tech",
  "Aerospace & Defense",
  "Construction & Real Estate",
  "Media & Entertainment",
  "Telecommunications",
  "Pharmaceuticals & Biotechnology",
  "Manufacturing & Industrial",
  "Education & EdTech",
  "Logistics & Supply Chain",
  "Environmental & Sustainability",
  "Other",
];

// ── Pricing Card ───────────────────────────────────────────────────────────

function PricingCard({ plan, onSelect }: { plan: PricingPlan; onSelect: (planKey: string) => void }) {
  return (
    <div className="relative flex flex-col items-center pt-10">
      {/* Floating circular badge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center rounded-full shadow-lg border-4 border-[#eef4fb]"
        style={{
          width: 86,
          height: 86,
          background: "linear-gradient(135deg, #ffffff 0%, #dce8f5 100%)",
        }}
      >
        <span
          className="text-[11px] font-bold text-center leading-tight whitespace-pre-line px-2"
          style={{ color: "#111d40" }}
        >
          {plan.badge}
        </span>
      </div>

      {/* Card body */}
      <div
        className="w-full flex flex-col items-center rounded-2xl pt-14 pb-8 px-6 shadow-xl"
        style={{
          background: "linear-gradient(155deg, #162050 0%, #1a5a90 55%, #2CC8D8 100%)",
          minHeight: 310,
        }}
      >
        {plan.highlight && (
          <span
            className="mb-2 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "rgba(44,200,216,0.25)", color: "#7de8f4" }}
          >
            {plan.highlight}
          </span>
        )}

        <div className="text-5xl font-extrabold text-white tracking-tight">
          {plan.price}
        </div>
        <div className="mt-1 text-xs font-medium italic text-center" style={{ color: "rgba(44,200,216,0.85)" }}>
          {plan.priceNote}
        </div>

        <div className="mt-4 text-sm text-center leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.75)" }}>
          {plan.description}
        </div>

        <button
          onClick={() => onSelect(plan.planKey)}
          className="mt-6 w-full py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #dce8f5 100%)",
            color: "#111d40",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          }}
        >
          {plan.buttonLabel}
        </button>
      </div>
    </div>
  );
}

// ── Modal Form ─────────────────────────────────────────────────────────────

interface ModalFormProps {
  selectedPlan: string;
  onClose: () => void;
}

function ModalForm({ selectedPlan, onClose }: ModalFormProps) {
  const defaultCountry = getDefaultCountry();
  const captchaRef = useRef<CaptchaRef>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    jobTitle: "",
    phone: "",
    country: defaultCountry.name,
    countryCode: defaultCountry.code,
    dialCode: defaultCountry.dialCode,
    pressReleaseTitle: "",
    contentType: "" as "" | "article" | "press-release" | "opinion-piece",
    industry: "",
    content: "",
    additionalNotes: "",
  });
  const [, setCaptchaValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (country: Country) => {
    setFormData({
      ...formData,
      country: country.name,
      countryCode: country.code,
      dialCode: country.dialCode,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!captchaRef.current?.validate()) {
      setError("Please solve the captcha correctly.");
      return;
    }

    if (!formData.contentType) {
      setError("Please select a content type.");
      return;
    }

    setIsSubmitting(true);

    const response = await submitPublishNewsForm({
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      jobTitle: formData.jobTitle || undefined,
      phone: formData.phone ? `${formData.dialCode}${formData.phone}` : undefined,
      country: formData.country,
      countryCode: formData.countryCode,
      dialCode: formData.dialCode,
      pressReleaseTitle: formData.pressReleaseTitle,
      contentType: formData.contentType as "article" | "press-release" | "opinion-piece",
      industry: formData.industry,
      content: formData.content,
      additionalNotes: formData.additionalNotes || undefined,
      selectedPlan,
    });

    setIsSubmitting(false);

    if (isFormError(response)) {
      setError(response.message);
      return;
    }

    setSubmitted(true);
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]";

  const sectionLabelCls =
    "text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-2 pt-1";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{ background: "rgba(11,21,51,0.72)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="modal-scrollbar relative w-full max-w-2xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          background: "var(--surface-raised, #f4f8fd)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Header — GMR navy-to-cyan gradient */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 sm:px-6"
          style={{
            background: "linear-gradient(135deg, #162050 0%, #1a6fa8 50%, #2CC8D8 100%)",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
              Selected Plan
            </p>
            <h2 className="text-base font-bold text-white">{selectedPlan}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 sm:px-6">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(44,200,216,0.12)" }}>
                <svg className="w-8 h-8" style={{ color: "#2CC8D8" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Submission Received!</h3>
              <p className="text-sm text-[var(--muted-foreground)] max-w-sm mx-auto mb-6">
                Our editorial team will review your content and get back to you within 2 business days.
              </p>
              <Button variant="outline" onClick={onClose}>Close</Button>
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

              <p className={sectionLabelCls}>Contact Details</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Full Name *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputCls} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Business Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputCls} placeholder="jane@company.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Company Name *</label>
                  <input type="text" name="company" required value={formData.company} onChange={handleChange} className={inputCls} placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Job Title</label>
                  <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className={inputCls} placeholder="Communications Manager" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Country *</label>
                  <CountrySelect value={formData.countryCode} onChange={handleCountryChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputCls} placeholder="123-456-7890" />
                </div>
              </div>

              <p className={sectionLabelCls}>Submission Details</p>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Press Release / Article Title *</label>
                <input type="text" name="pressReleaseTitle" required value={formData.pressReleaseTitle} onChange={handleChange} className={inputCls} placeholder="e.g. Company X Launches Revolutionary AI Platform for Healthcare" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Content Type *</label>
                  <select name="contentType" required value={formData.contentType} onChange={handleChange} className={inputCls}>
                    <option value="">Select content type</option>
                    <option value="press-release">Press Release</option>
                    <option value="article">Article</option>
                    <option value="opinion-piece">Opinion Piece</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Industry *</label>
                  <select name="industry" required value={formData.industry} onChange={handleChange} className={inputCls}>
                    <option value="">Select industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Content *</label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  value={formData.content}
                  onChange={handleChange}
                  className={`${inputCls} resize-none`}
                  placeholder="Paste your press release or article content here..."
                />
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  Paste the full text of your submission. Minimum 150 words recommended.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-[var(--text-primary)]">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  rows={2}
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className={`${inputCls} resize-none`}
                  placeholder="Any specific publication preferences, embargo dates, or additional context..."
                />
              </div>

              <Captcha ref={captchaRef} onValidationChange={setCaptchaValid} />

              <div
                className="rounded-lg p-3 text-xs"
                style={{
                  background: "rgba(44,200,216,0.08)",
                  border: "1px solid rgba(44,200,216,0.2)",
                  color: "var(--text-secondary)",
                }}
              >
                By submitting, you confirm that the content is accurate, original, and complies with our editorial standards. Publication is not guaranteed and is subject to editorial review.
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Client Component ──────────────────────────────────────────────────

export default function SubmitNewsClient() {
  const [activePlan, setActivePlan] = useState<string | null>(null);

  return (
    <>
      {/* ── Pricing Section ── */}
      <Section className="pt-10 pb-16">
        <Container size="lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {PLANS.map((plan) => (
              <PricingCard key={plan.planKey} plan={plan} onSelect={setActivePlan} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Guidelines Section ── */}
      <Section background="muted" className="py-14">
        <Container size="lg">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Content Submission Guidelines */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
                Content Submission Guidelines
              </h2>
              <div className="space-y-3 text-[var(--text-secondary)] text-[0.9375rem] leading-relaxed">
                <p>
                  All submitted content is reviewed for quality, accuracy, relevance, and editorial value before publication. If the content meets the required standards, it will be considered for publishing. Submissions should be clear, factual, balanced, and suitable for a professional business audience.
                </p>
                <p>
                  Content is accepted across all major industries covered by GMR. Each submission should provide useful information, market relevance, or industry context. Articles, press releases, and opinion pieces must be written in a neutral tone and should not appear overly promotional or unsupported by facts.
                </p>
              </div>
            </div>

            {/* Editorial Standards */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
                Editorial Standards
              </h2>
              <ul className="space-y-3">
                {[
                  "Submitted content will be evaluated for quality, clarity, factual accuracy, and relevance before publication.",
                  "Content may be accepted from all major industries covered by GMR, provided it offers clear industry value.",
                  "Opinions included in articles, press releases, or other submissions must be unbiased and supported by factual information.",
                  "Content should not appear sponsored, overly promotional, or written only to advertise a brand, product, or service.",
                  "Submissions must not include inappropriate, illegal, offensive, misleading, or harmful material.",
                  "Images must be relevant to the submitted content and provided in the correct format, as they may be published exactly as received.",
                  "Content should avoid inflammatory language, exaggerated claims, unattributed opinions, or statements that may affect personal privacy.",
                  "All submissions must be accurate, responsible, and free from potentially libelous or defamatory material.",
                  "Content related to restricted, illegal, or non-acceptable products or services will not be considered for publication.",
                  "Product or service mentions should include proper industry context and should not be used only for direct promotion or advertising.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 list-none">
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: "linear-gradient(135deg, #2CC8D8, #1DAEBF)" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publication Note */}
            <div
              className="rounded-xl p-6 flex gap-3"
              style={{
                background: "var(--surface, #dce8f5)",
                border: "1px solid var(--border-color)",
              }}
            >
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #162050, #2CC8D8)" }}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Publication Note</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Publication is not guaranteed for every submission. Content will be accepted only when it meets editorial quality standards, supports reader value, and aligns with a factual and professional publishing approach.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* ── Modal ── */}
      {activePlan && (
        <ModalForm selectedPlan={activePlan} onClose={() => setActivePlan(null)} />
      )}
    </>
  );
}
