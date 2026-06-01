import { notFound } from "next/navigation";
// import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getReports, getReportBySlug, isApiError } from "@/lib/api";
import { Breadcrumb, Card, CardContent } from "@/components/ui";
// import { Download } from "lucide-react";
import { ReportContentWrapper } from "@/components/reports/ReportContentWrapper";
import { ReportShareButtons } from "@/components/reports/ReportShareButtons";
import { StyledReportContent } from "@/components/reports/StyledReportContent";
import { MarketGrowthChart } from "@/components/reports/charts/MarketGrowthChart";
import MeetTheTeam from "@/components/reports/MeetTheTeam";
import FAQ from "@/components/reports/FAQ";
import { parseHTMLAndGenerateTOC, addStaticSectionsToTOC } from "@/lib/html-toc-utils";
import type { SidebarTOCItem } from "@/lib/toc-utils";
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, generateProductSchema, generateDatasetSchema } from "@/components/seo/StructuredData";
import RelatedReportsSection from "@/components/reports/RelatedReportsSection";
import { ReportStickyBar } from "@/components/reports/ReportStickyBar";
import categories from "@/data/categories.json";

const CHART_DISCLAIMER =
  "The graph shows projected market growth until 2035 based on CAGR analysis. Actual outcomes may vary depending on changing demand, competition, and economic factors.";

/**
 * Processes raw HTML content server-side to add performance attributes to CDN images.
 * Images load directly from the CDN to avoid server-side fetch issues in production.
 */
function processHtmlImages(html: string, reportSlug: string): string {
  return html.replace(
    /<img([^>]*?)>/gi,
    (match, attrs: string) => {
      const hasCdnSrc = /src="https:\/\/cdn\.globemarketresearch\.com\//i.test(attrs);
      if (!hasCdnSrc) return match;

      let newAttrs = attrs;
      if (!newAttrs.includes('loading=')) newAttrs += ` loading="lazy"`;
      if (!newAttrs.includes('decoding=')) newAttrs += ` decoding="async"`;

      return `<img${newAttrs}><span class="report-chart-disclaimer"><span class="report-chart-disclaimer__icon" tabindex="0" aria-label="${CHART_DISCLAIMER}">i<span class="report-chart-disclaimer__tooltip" role="tooltip">${CHART_DISCLAIMER}</span></span><span class="report-chart-disclaimer__cta">To gain greater insights - <a href="/request-sample?report=${reportSlug}" target="_blank" rel="noopener noreferrer">request a sample report PDF</a></span></span>`;
    }
  );
}

// Enable ISR with 10-minute revalidation
export const revalidate = 600;

export async function generateStaticParams() {
  const response = await getReports({ status: 'published', limit: 1000 });

  if (isApiError(response)) {
    console.error('Failed to fetch reports for static generation:', response.message);
    return [];
  }

  return response.data.map((report) => ({
    slug: report.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getReportBySlug(slug);

    if (isApiError(response)) {
      return {
        title: "Report Not Found",
      };
    }

    const report = response.data;

    // Use meta fields if available, fallback to regular fields
    const title = report.meta_title || report.title;
    const description = report.meta_description || report.description;

    // Parse meta_keywords if available, otherwise use default keywords
    const keywords = report.meta_keywords
      ? report.meta_keywords.split(',').map(k => k.trim()).filter(Boolean)
      : ["healthcare market research", "healthcare industry analysis", report.category, report.region];

    return {
      title: { absolute: title },
      description,
      keywords,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: report.date,
        images: [
          {
            url: `/reports/${slug}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`/reports/${slug}/opengraph-image`],
      },
      alternates: {
        canonical: `/reports/${slug}`,
      },
    };
  } catch {
    return { title: "Report Not Found" };
  }
}

interface Report {
  id: number;
  slug: string;
  title: string;
  description: string;
  summary?: string;
  category: string;
  date: string;
  price: string;
  discounted_price: string;
  region: string;
  year: string;
  reportType: string;
  pages: number;
  formats?: string[];
  reportCode?: string;
  baseYear?: string;
  forecastPeriod?: string;
  marketSize2024?: string;
  marketSize2032?: string;
  cagr?: string;
  marketDetails?: string;
  keyFindings?: string[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  segmentation?: {
    byType?: Array<{ name: string; share: string; description?: string }>;
    byApplication?: Array<{ name: string; share: string }>;
    byEndUser?: Array<{ name: string; share: string }>;
    byRegion?: Array<{ name: string; share: string; cagr?: string }>;
  };
  keyPlayers?: Array<{ name: string; marketShare: string; headquarters: string }>;
  tableOfContents?: Array<{ id: string; title: string; level: number }>;
  fullReportTOC?: Array<{ id: string; title: string; number?: string; children?: Array<{ id: string; title: string; number?: string }> }>;
  teamMemberIds?: string[];
  relatedReportIds?: number[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  authors: Array<{
    id: number;
    name: string;
    role?: string;
    bio?: string;
    imageUrl?: string;
    linkedinUrl?: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch report from API
  let response;
  try {
    response = await getReportBySlug(slug);
  } catch (error) {
    // Re-throw network errors so ISR doesn't cache them as 404
    throw error;
  }

  if (isApiError(response)) {
    if (response.statusCode === 404) {
      notFound();
    }
    // Non-404 errors (network issues, server errors) should not be cached as 404
    console.error('Failed to fetch report:', response.message);
    throw new Error(`Failed to load report: ${response.message}`);
  }

  const report = response.data as Report;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Reports', href: '/industry' },
    { label: report.title },
  ];

  const hasFullContent = !!(report.fullReportTOC && report.marketDetails);

  // Parse marketDetails HTML and generate TOC with IDs
  let sidebarTOC: SidebarTOCItem[] = [];
  let marketDetailsWithIds = report.marketDetails || '';

  if (hasFullContent && report.marketDetails) {
    const { toc, htmlWithIds } = parseHTMLAndGenerateTOC(report.marketDetails);
    marketDetailsWithIds = processHtmlImages(htmlWithIds, report.slug);

    // Add static sections from the page to TOC
    const staticSections: SidebarTOCItem[] = [];

    // Add Competitive Landscape section if key players exist
    if (report.keyPlayers && report.keyPlayers.length > 0) {
      staticSections.push(
        { id: 'competitive', title: 'Competitive Landscape', level: 2 },
        { id: 'key-players', title: 'Key Market Players', level: 3 }
      );
    }

    // Add Team and FAQ sections
    const allSections: SidebarTOCItem[] = [
      ...toc,
      ...staticSections,
      ...addStaticSectionsToTOC(
        [],
        !!(report.authors && report.authors.length > 0),
        !!(report.faqs && report.faqs.length > 0)
      )
    ];

    sidebarTOC = allSections;
  }

  const baseYearLabel = report.baseYear || '2024';
  const forecastEndYear = report.forecastPeriod?.split('-')[1] || '2032';
  const forecastRangeLabel = report.forecastPeriod || `${baseYearLabel}-${forecastEndYear}`;

  const metricCards = [
    {
      label: `Revenue, ${baseYearLabel}`,
      value: report.marketSize2024 || '—',
      bg: 'bg-gradient-to-br from-[#dde8f0] to-[#eef4f9]',
      labelColor: 'text-[#4a7090]',
      valueColor: 'text-[#0f2236]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 44c0-6.627 5.373-12 12-12s12 5.373 12 12"
            stroke="#0284c7"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M12 48h40" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M28 28V18c0-3.314 2.686-6 6-6s6 2.686 6 6v2"
            stroke="#0284c7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M24 36v-6" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 32v-4" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="20" r="2" fill="#0284c7" />
        </svg>
      ),
    },
    {
      label: `Forecast, ${forecastEndYear}`,
      value: report.marketSize2032 || '—',
      bg: 'bg-gradient-to-br from-[#dde8f0] to-[#eef4f9]',
      labelColor: 'text-[#4a7090]',
      valueColor: 'text-[#0f2236]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 46l10-18 10 12 12-22 12 28"
            stroke="#0284c7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 52h44" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="28" r="2" fill="#0284c7" />
          <circle cx="30" cy="40" r="2" fill="#0284c7" />
          <circle cx="42" cy="20" r="2" fill="#0284c7" />
          <circle cx="54" cy="48" r="2" fill="#0284c7" />
        </svg>
      ),
    },
    {
      label: `CAGR, ${forecastRangeLabel}`,
      value: report.cagr || '—',
      bg: 'bg-gradient-to-br from-[#dde8f0] to-[#eef4f9]',
      labelColor: 'text-[#4a7090]',
      valueColor: 'text-[#0f2236]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 40h6v-8h-6v8zm12 0h6V20h-6v20zm12 0h6V28h-6v12zm12 0h6V16h-6v24z"
            fill="#0284c7"
            opacity="0.3"
          />
          <path d="M12 44h40" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M12 34c6-4 10-6 16-6s10 2 16 6 10 6 16 6"
            stroke="#0284c7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40 18l4-4 4 4"
            stroke="#0284c7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: 'Report Coverage',
      value: report.region,
      bg: 'bg-gradient-to-br from-[#dde8f0] to-[#eef4f9]',
      labelColor: 'text-[#4a7090]',
      valueColor: 'text-[#0f2236]',
      icon: (
        <svg
          aria-hidden
          className="w-10 h-10"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="28" r="14" stroke="#0284c7" strokeWidth="3" />
          <path d="M32 14v4m0 28v4m14-14h4M14 32h4" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 44l-6 6" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 44l6 6" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Fetch related reports
  // TODO: Fetch related reports from API when relatedReportIds are provided
  // const relatedReports: Report[] = [];

  const categorySlug = categories.find(
    (c) => c.name.toLowerCase() === report.category.toLowerCase()
  )?.slug ?? report.category.toLowerCase().replace(/\s+/g, '-');

  const reportUrl = `https://www.globemarketresearch.com/reports/${report.slug}`;
  const reportKeywords = report.meta_keywords?.split(',').map(k => k.trim()).filter(Boolean);

  // Generate structured data schemas
  const reportOgImage = `https://www.globemarketresearch.com/reports/${report.slug}/opengraph-image`;

  const articleSchema = generateArticleSchema({
    type: 'Report',
    title: report.title,
    description: report.description,
    url: reportUrl,
    datePublished: report.date,
    author: report.authors && report.authors.length > 0 ? report.authors.map((author) => author.name) : undefined,
    keywords: reportKeywords,
    image: reportOgImage,
  });

  const productDescription = report.description ||
    `${report.title} - Comprehensive market research report covering market size, trends, forecasts, and competitive landscape in the ${report.category} sector.`;

  const productSchema = generateProductSchema({
    name: report.title,
    description: productDescription,
    url: reportUrl,
    price: report.price,
    discountedPrice: report.discounted_price,
    category: report.category,
    reportCode: report.reportCode || `HF${report.id}`,
    keywords: reportKeywords,
    datePublished: report.date,
    image: reportOgImage,
  });

  const datasetSchema = generateDatasetSchema({
    name: `${report.title} - Market Data`,
    description: `Market research dataset for ${report.title}. Includes market size, CAGR, and forecast data for ${report.forecastPeriod || `${baseYearLabel}–${forecastEndYear}`}.`,
    url: reportUrl,
    datePublished: report.date,
    keywords: reportKeywords,
    temporalCoverage: report.forecastPeriod
      ? report.forecastPeriod.replace('-', '/')
      : `${baseYearLabel}/${forecastEndYear}`,
    variableMeasured: [
      ...(report.marketSize2024 ? [`Market Size (${baseYearLabel}): ${report.marketSize2024}`] : []),
      ...(report.marketSize2032 ? [`Market Size (${forecastEndYear}): ${report.marketSize2032}`] : []),
      ...(report.cagr ? [`CAGR (${report.forecastPeriod || `${baseYearLabel}–${forecastEndYear}`}): ${report.cagr}`] : []),
    ],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.globemarketresearch.com' },
    { name: 'Reports', url: 'https://www.globemarketresearch.com/industry' },
    { name: report.title, url: reportUrl },
  ]);

  const faqSchema = report.faqs && report.faqs.length > 0 ? generateFAQSchema(report.faqs) : null;

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={productSchema} />
      <StructuredData data={datasetSchema} />
      <StructuredData data={breadcrumbSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}

      <div className="bg-[var(--background)]">
        {/* ── Report Hero ──────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden border-b border-[var(--border-color)]"
          style={{ background: 'var(--featured-bg)' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(2,132,199,0.14) 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #0284c7, transparent 70%)' }}
          />
          <div className="relative max-w-[1400px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/industry" className="hover:text-white transition-colors">Reports</Link>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/industry/${categorySlug}`} className="hover:text-white transition-colors">{report.category}</Link>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Link href={`/industry/${categorySlug}`}>
                <span
                  className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full cursor-pointer"
                  style={{ background: 'rgba(2,132,199,0.2)', color: '#7dd3fc', border: '1px solid rgba(2,132,199,0.35)' }}
                >
                  {report.category}
                </span>
              </Link>
              <span
                className="inline-flex text-[10px] font-medium uppercase tracking-wide px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                {report.region}
              </span>
              {report.reportType && (
                <span
                  className="inline-flex text-[10px] font-medium uppercase tracking-wide px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  {report.reportType}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="mb-4 font-bold leading-tight"
              style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', letterSpacing: '-0.03em', maxWidth: '900px' }}
            >
              {report.title}
            </h1>

            {/* Summary / Description */}
            {(report.summary || report.description) && (
              <p
                className="mb-8 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.62)', fontSize: '1.0rem' }}
              >
                {report.summary || report.description}
              </p>
            )}

            {/* Report metadata strip */}
            <div
              className="flex flex-wrap items-center justify-between gap-4 pt-5 text-sm"
              style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { label: 'Report Code', value: report.reportCode || `HF${report.id}` },
                  { label: 'Published', value: report.date },
                  { label: 'Pages', value: report.pages ? `${report.pages}+` : '—' },
                  { label: 'Format', value: 'PDF, Excel' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.label}</p>
                    <p className="font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Social Share Buttons */}
              <ReportShareButtons
                title={report.title}
                url={`https://www.globemarketresearch.com/reports/${report.slug}`}
              />
            </div>
          </div>
        </div>

        {/* Sticky "Request Sample + Buy Now" bar — appears on scroll */}
        <ReportStickyBar
          reportTitle={report.title}
          reportSlug={report.slug}
          reportId={report.id}
          publishedDate={report.date}
          pages={report.pages}
          formats={report.formats}
        />

        <div className="border-b border-border bg-card">
          <div className="max-w-[1400px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

      <div className="max-w-[1400px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReportContentWrapper
          tableOfContents={sidebarTOC}
          fullReportTOC={report.fullReportTOC}
          hasFullContent={hasFullContent}
          price={report.price}
          discounted_price={report.discounted_price}
          reportTitle={report.title}
          reportSlug={report.slug}
          reportId={report.id}
        >
          <article>
              <section className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {metricCards.map((card) => (
                    <Card
                      key={card.label}
                      className={`${card.bg} border border-transparent hover:border-[#0284c7]/30 hover:from-[#bdd8ed] hover:to-[#d6ecf8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default`}
                    >
                      <CardContent className="flex items-center gap-3" style={{padding: '8px'}}>
                        {card.icon}
                        <div>
                          <p className={`text-sm lg:text-[10px] 2xl:text-xs font-semibold ${card.labelColor}`}>{card.label}</p>
                          <p className={`text-lg lg:text-xs 2xl:text-base font-bold ${card.valueColor}`}>{card.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {hasFullContent ? (
                <>
                  <section className="mb-12">
                    <h2 id="overview" className="text-2xl font-bold text-[var(--teal-deep)] mb-6 scroll-mt-24">
                      Market Size and Forecast
                    </h2>
                    {report.marketSize2024 && report.marketSize2032 && report.cagr && (
                      <div className="mb-8">
                        <MarketGrowthChart
                          marketSize2024={report.marketSize2024}
                          marketSize2032={report.marketSize2032}
                          cagr={report.cagr}
                          forecastPeriod={report.forecastPeriod}
                        />
                      </div>
                    )}
                    <StyledReportContent
                      htmlContent={marketDetailsWithIds}
                      reportSlug={report.slug}
                    />

                    {report.keyFindings && report.keyFindings.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                          Key Findings
                        </h3>
                        <div className="bg-[var(--surface)] rounded-lg py-4 px-6 border border-[var(--border-color)]">
                          <ul className="list-disc list-outside ml-5 space-y-0">
                            {report.keyFindings.map((finding, index) => (
                              <li key={index} className="text-[var(--text-primary)] py-4 border-b border-[var(--border-color)] last:border-b-0">
                                {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Images (Refer Below) */}

                  <section className="mb-12">
                    <h2 id="competitive" className="text-2xl font-bold text-[var(--teal-deep)] mb-6 scroll-mt-24">
                      Competitive Landscape
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                      The market is characterized by intense competition among established players
                      and emerging companies. Strategic partnerships, mergers and acquisitions, and
                      product innovation are key strategies employed by market participants.
                    </p>

                    {report.keyPlayers && report.keyPlayers.length > 0 && (
                      <div id="key-players" className="scroll-mt-24">
                        <h3 className="text-base font-semibold text-[#000000] mb-3">
                          Key Market Players
                        </h3>
                        <div className="grid gap-1.5">
                          {report.keyPlayers.map((player, index) => (
                            <Card key={index} className="hover:shadow-sm transition-shadow">
                              <CardContent className="py-2 px-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-[var(--foreground)] text-sm">
                                    {player.name}
                                  </h4>
                                  {player.marketShare && !['XX', 'xx'].includes(player.marketShare) && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-[var(--muted-foreground)]">Market Share</span>
                                      <span className="text-sm font-bold text-[var(--primary)]">
                                        {player.marketShare}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>

                  {/* <section className="mb-12">
                    <h2 id="drivers" className="text-3xl font-bold text-[var(--foreground)] mb-6 scroll-mt-24">
                      Market Drivers & Opportunities
                    </h2>
                    <div className="prose prose-lg max-w-none text-[var(--muted-foreground)]">
                      <ul className="space-y-3">
                        <li>Increasing adoption of digital health technologies</li>
                        <li>Growing investment in healthcare infrastructure</li>
                        <li>Favorable government policies and reimbursement frameworks</li>
                        <li>Rising healthcare expenditure in emerging markets</li>
                        <li>Technological advancements and innovation</li>
                      </ul>
                    </div>
                  </section>

                  <section className="mb-12">
                    <h2 id="challenges" className="text-3xl font-bold text-[var(--foreground)] mb-6 scroll-mt-24">
                      Challenges & Restraints
                    </h2>
                    <div className="prose prose-lg max-w-none text-[var(--muted-foreground)]">
                      <ul className="space-y-3">
                        <li>Data privacy and security concerns</li>
                        <li>Regulatory compliance complexity</li>
                        <li>High initial implementation costs</li>
                        <li>Integration challenges with legacy systems</li>
                        <li>Limited digital literacy in certain regions</li>
                      </ul>
                    </div>
                  </section> */}

                  {/* NEW SECTIONS */}
                  <MeetTheTeam teamMembers={report.authors} />

                  {/* FAQ Section */}
                  {report.faqs && <FAQ faqs={report.faqs} />}
                </>
              ) : (
                <section className="prose prose-lg max-w-none">
                  <h2>Executive Summary</h2>
                  <p>
                    This report provides comprehensive analysis of the {report.category.toLowerCase()}
                    sector in the healthcare industry. Our research covers market trends, key players,
                    growth opportunities, and strategic recommendations.
                  </p>

                  <h2>Key Findings</h2>
                  <ul>
                    <li>Market size and growth projections</li>
                    <li>Competitive landscape analysis</li>
                    <li>Regulatory environment overview</li>
                    <li>Technology trends and innovations</li>
                  </ul>

                  <h2>Market Size and Forecast</h2>
                  <p>
                    The healthcare market continues to evolve with new technologies, changing
                    regulations, and shifting patient demographics. This section provides detailed
                    insights into current market conditions.
                  </p>
                </section>
              )}

              {/* Related Reports */}
              <RelatedReportsSection
                categorySlug={categorySlug}
                categoryName={report.category}
                currentReportSlug={report.slug}
              />
            </article>
        </ReportContentWrapper>
      </div>
      </div>
    </>
  );
}



// Images Section - To be added within the full content condition
// {report.marketSize2024 && report.marketSize2032 && report.cagr && (
//   <section className="mb-12">
//     <h2 id="market-size" className="text-3xl font-bold text-[var(--foreground)] mb-6 scroll-mt-24">
//       Market Size & Forecast
//     </h2>
//     <p className="text-[var(--muted-foreground)] mb-8">
//       The market is projected to grow from {report.marketSize2024} in{' '}
//       {report.baseYear || '2024'} to {report.marketSize2032} by{' '}
//       {report.forecastPeriod?.split('-')[1] || '2032'}, at a CAGR of{' '}
//       {report.cagr} during the forecast period.
//     </p>

//     {/* Market Analysis Charts */}
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg shadow-sm border border-[var(--border)] p-6">
//         <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
//           Market Size by Segment (2020-2024)
//         </h3>
//         <Image
//           src="/assets/images/chart1.png"
//           alt="Global Medical Device Market - Bar Chart showing market size by segment from 2020-2024"
//           width={1200}
//           height={600}
//           className="w-full h-auto max-w-4xl mx-auto"
//           priority
//         />
        
//       {/* Download Sample Report CTA */}
//       <div className="rounded-2xl pt-6">
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
//           <p className="text-[var(--muted-foreground)] text-base sm:text-lg font-medium">
//             To learn more about this report,
//           </p>
//           <Link href={`/request-sample?report=${report.slug}`}>
//             <Button
//               variant="primary"
//               size="lg"
//               className="gap-2 shadow-primary hover:shadow-primary-lg whitespace-nowrap"
//             >
//               <Download className="w-5 h-5" />
//               Download Free Sample
//             </Button>
//           </Link>
//         </div>
//       </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-[var(--border)] p-6">
//         <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
//           Market Distribution by Segment
//         </h3>
//         <Image
//           src="/assets/images/chart2.png"
//           alt="Global Medical Device Market - Pie Chart showing market distribution by segment 2020-2024"
//           width={1200}
//           height={600}
//           className="w-full h-auto max-w-4xl mx-auto"
//         />
//     </div>
//       </div>

//   </section>
// )}
