import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  HeroSection,
  FeaturedReportsSection,
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
  title: "Globe Market Research | Healthcare Market Insights | Reports",
  description: "Globe Market Research delivers trusted market research, insights, trends, forecasts, consulting and data-driven analysis across all healthcare sectors.",
  keywords: ["Globe Market Research", "healthcare market research", "healthcare insights", "healthcare industry trends", "medical market analysis", "healthcare reports"],
  alternates: {
    canonical: 'https://www.globemarketresearch.com',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedReportsSection />
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
