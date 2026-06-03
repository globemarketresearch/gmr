import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Analyst Meeting | Globe Market Research",
  description: "Request a meeting with our analyst team to explore our globe market research platform and discover how our insights can drive your strategic decisions.",
  keywords: ["globe market research analyst meeting", "market research analyst", "globe consulting meeting"],
  alternates: {
    canonical: '/request-analyst-meeting',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RequestAnalystMeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
