import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Sample Report | Globe Market Research",
  description: "Request a free sample of our globe market research reports to experience the depth and quality of our industry analysis.",
  keywords: ["globe report sample", "free globe research", "market research sample"],
  alternates: {
    canonical: '/request-sample',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RequestSampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
