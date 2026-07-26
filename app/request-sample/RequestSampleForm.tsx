"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Section, Container, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Captcha, type CaptchaRef } from "@/components/ui";
import { CountrySelect } from "@/components/ui/country-select";
import { QuickContactSection } from "@/components/contact";
import { WhyRequestSample, SampleInclusionsSidebar } from "@/components/sample/SampleValueProps";
import TrustedPartnersSection from "@/components/home/TrustedPartnersSection";
import { submitRequestSampleForm, isFormError } from "@/lib/api";
import { getDefaultCountry, type Country } from "@/lib/data/countries";
import { isBusinessEmail } from "@/lib/validators";

interface RequestSampleFormProps {
  reportTitle?: string;
  reportSlug?: string;
}

export default function RequestSampleForm({ reportTitle = "", reportSlug = "" }: RequestSampleFormProps) {
  const defaultCountry = getDefaultCountry();
  const captchaRef = useRef<CaptchaRef>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    country: defaultCountry.name,
    countryCode: defaultCountry.code,
    dialCode: defaultCountry.dialCode,
    jobTitle: "",
    reportTitle: reportTitle,
    reportSlug: reportSlug,
    additionalInfo: "",
  });
  const [, setCaptchaValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    if (!isBusinessEmail(formData.email)) {
      setError("Please use a business email address.");
      return;
    }

    // Validate CAPTCHA
    if (!captchaRef.current?.validate()) {
      setError("Please enter the captcha correctly.");
      return;
    }

    setIsSubmitting(true);

    // Prepare data for API - combine dialCode with phone and only send country name
    const apiData = {
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      jobTitle: formData.jobTitle,
      phone: formData.phone ? `${formData.dialCode}${formData.phone}` : undefined,
      country: formData.country,
      countryCode: formData.countryCode,
      dialCode: formData.dialCode,
      reportTitle: formData.reportTitle,
      reportSlug: formData.reportSlug || undefined,
      additionalInfo: formData.additionalInfo || undefined,
    };

    // Submit to API
    const response = await submitRequestSampleForm(apiData);

    setIsSubmitting(false);

    if (isFormError(response)) {
      // Handle error
      setError(response.message);
      return;
    }

    // Success
    setSubmitted(true);
  };

  return (
    <>
      <Section padding="lg" background="muted" className="pb-8">
        <Container size="lg">
          {reportSlug && (
            <div className="mb-6">
              <Link
                href={`/reports/${reportSlug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Report
              </Link>
            </div>
          )}
          <div className="text-center space-y-4">
            <Badge variant="primary" size="md">
              Request Sample
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Get a Free Report Sample</h1>
            {reportTitle && (
              <p className="text-xl font-medium text-[var(--foreground)] max-w-3xl mx-auto">
                {reportTitle}
              </p>
            )}
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Preview the quality and depth of our research before making a purchase decision. Receive a comprehensive sample within 24 hours.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container size="lg">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Column - What's Included (1/4 width) */}
            <div className="lg:col-span-1 lg:order-1 order-3">
              <SampleInclusionsSidebar />
            </div>

            {/* Middle Column - Form (2/4 width) */}
            <div className="lg:col-span-2 lg:order-2 order-1">
              <Card>
              <CardHeader>
                <CardTitle>Request Your Free Sample</CardTitle>
                <CardDescription>
                  Fill out the form below and we will send you a comprehensive sample report.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          name="jobTitle"
                          required
                          value={formData.jobTitle}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="VP of Strategy"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium mb-2">
                          Country *
                        </label>
                        <CountrySelect
                          value={formData.countryCode}
                          onChange={handleCountryChange}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                          placeholder="123-456-7890"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reportTitle" className="block text-sm font-medium mb-2">
                        Report Title *
                      </label>
                      <input
                        type="text"
                        id="reportTitle"
                        name="reportTitle"
                        required
                        value={formData.reportTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
                        placeholder="E.g., Telemedicine Market Report 2025-2032"
                      />
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">
                        Specify which report you would like to receive a sample of
                      </p>
                    </div>

                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none bg-[var(--background)]"
                        placeholder="Any specific sections or questions you'd like addressed in the sample..."
                      />
                    </div>

                    <Captcha
                      ref={captchaRef}
                      onValidationChange={setCaptchaValid}
                    />

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> By submitting this form, you agree to receive the sample report and occasional updates about our research. We respect your privacy and never share your information.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Request Free Sample"}
                    </Button>
                  </form>
                  )}
              </CardContent>
            </Card>

              <div className="mt-8 text-center">
              <p className="text-sm text-[var(--muted-foreground)]">
                Questions about our sample reports?{" "}
                <a href="/contact" className="text-[var(--primary)] hover:underline font-medium">
                  Contact us
                </a>
              </p>
            </div>
          </div>

          {/* Right Column - Why Request a Sample + Quick Contact (1/4 width) */}
          <div className="lg:col-span-1 lg:order-3 order-2 space-y-6">
            <WhyRequestSample />
            <QuickContactSection />
          </div>
        </div>
        </Container>
      </Section>

      {/* Trusted by Leading Companies */}
      <TrustedPartnersSection
        title="Trusted by Leading Companies"
        subtitle="Global enterprises rely on our research to guide their strategic decisions"
      />
    </>
  );
}

