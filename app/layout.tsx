import type { Metadata } from "next";
import { Inter, Krub } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StructuredData, generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const krub = Krub({
  variable: "--font-krub",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.globemarketresearch.com'),
  title: {
    default: "Globe Market Research | Healthcare Market Insights & Research Reports",
    template: "%s",
  },
  description: "Globe Market Research delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  keywords: ["Globe Market Research", "healthcare market research", "healthcare insights", "healthcare industry trends", "medical market analysis", "healthcare reports"],
  authors: [{ name: "Globe Market Research Team" }],
  icons: {
    icon: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Globe Market Research",
    title: "Globe Market Research | Healthcare Market Insights & Research Reports",
    description: "Globe Market Research delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GlobeMarketResearch',
    creator: '@GlobeMarketResearch',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to third-party origins to reduce connection latency */}
        <link rel="preconnect" href="https://translate.google.com" />
        <link rel="dns-prefetch" href="https://translate.google.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <StructuredData data={generateLocalBusinessSchema()} />
      </head>
      <body className={`${inter.variable} ${krub.variable} antialiased`}>
        <div id="google_translate_element" className="hidden" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-NJ1DNL58KB" />
        <Script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/22449271.js"
        />
      </body>
    </html>
  );
}
