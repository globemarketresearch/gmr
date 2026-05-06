import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Globe Market Research | Research & Business Inquiries",
  description: "Contact Globe Market Research for healthcare research inquiries, report access, partnerships, or consulting support.",
  keywords: ["contact Globe Market Research", "healthcare research contact", "healthcare consulting inquiry"],
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
