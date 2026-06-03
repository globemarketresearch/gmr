import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Report Customization | Globe Market Research",
  description: "Customize our globe market research reports to fit your specific needs — add regions, segments, or data points tailored to your business requirements.",
  keywords: ["customize globe report", "tailored market research", "custom globe analysis", "report customization"],
  alternates: {
    canonical: '/request-customization',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RequestCustomizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
