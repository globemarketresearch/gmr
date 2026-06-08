import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
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

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.globemarketresearch.com'),
  title: {
    default: "Globe Market Research | Global Market Intelligence & Research Reports",
    template: "%s",
  },
  description: "Globe Market Research delivers trusted global market research, industry insights, trends, forecasts, and data-driven analysis across 45+ sectors worldwide.",
  keywords: ["Globe Market Research", "global market research", "market intelligence", "industry research reports", "market analysis", "business insights"],
  authors: [{ name: "Globe Market Research Team" }],
  icons: {
    icon: [
      { url: "/assets/images/favicon.png", type: "image/png" },
    ],
    apple: "/assets/images/favicon.png",
    shortcut: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Globe Market Research",
    title: "Globe Market Research | Global Market Intelligence & Research Reports",
    description: "Globe Market Research delivers trusted global market research, industry insights, trends, forecasts, and data-driven analysis across 45+ sectors worldwide.",
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
        {/* Content protection: disable right-click, copy, cut, and text selection */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
              document.addEventListener('keydown', function(e) {
                if (
                  (e.ctrlKey || e.metaKey) &&
                  ['c','x','u','s','a','p'].includes(e.key.toLowerCase())
                ) { e.preventDefault(); }
                if (e.key === 'F12') { e.preventDefault(); }
              });
              document.addEventListener('copy', function(e) { e.preventDefault(); });
              document.addEventListener('cut', function(e) { e.preventDefault(); });
            `,
          }}
        />
        {/* Preconnect to third-party origins to reduce connection latency */}
        <link rel="preconnect" href="https://translate.google.com" />
        <link rel="dns-prefetch" href="https://translate.google.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <StructuredData data={generateLocalBusinessSchema()} />
      </head>
      <body className={`${inter.variable} ${roboto.variable} antialiased`}>
        <div id="google_translate_element" className="hidden" />
        <Header />
        <main className="min-h-screen" style={{ paddingTop: "var(--sticky-header-height, 96px)" }}>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-DY50XJZK98" />
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
