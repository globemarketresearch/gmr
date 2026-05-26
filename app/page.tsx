import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  HeroSection,
  FeaturedReportsSection,
  FeaturedStatisticsSection,
  FeaturedPressReleasesSection,
  IndustryCategoriesSection,
  AnalystSection,
  StatsSection,
  TrustedPartnersSection,
  TestimonialsSection,
  CTASection,
  StatsSectionSkeleton,
  TestimonialsSectionSkeleton,
} from '@/components/home';

// Enable ISR with 5-minute revalidation
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Globe Market Research | Global Market Intelligence & Research Reports",
  description: "Globe Market Research delivers trusted global market research, industry insights, trends, forecasts, and data-driven analysis across 45+ sectors worldwide.",
  keywords: ["Globe Market Research", "global market research", "market intelligence", "industry research reports", "market analysis", "business insights"],
  alternates: {
    canonical: 'https://www.globemarketresearch.com',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedReportsSection />
      <FeaturedStatisticsSection />
      <FeaturedPressReleasesSection />
      <IndustryCategoriesSection />
      <AnalystSection />

      <Suspense fallback={<StatsSectionSkeleton />}>
        <StatsSection />
      </Suspense>

      <TrustedPartnersSection />

      <Suspense fallback={<TestimonialsSectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <CTASection />
    </>
  );
}
