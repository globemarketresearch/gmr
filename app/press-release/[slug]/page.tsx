import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container, StyledArticleContent, Button, Card, CardContent } from "@/components/ui";
import { getPressReleases, getPressReleaseBySlug, getReportBySlug, isApiError } from "@/lib/api";
import type { Metadata } from "next";
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { TrustedPartnersSidebar } from "@/components/contact";

export const revalidate = 300;

interface PressReleasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const response = await getPressReleases({ status: 'published', limit: 100 });

  if (isApiError(response)) {
    console.error('Failed to fetch press releases for static params:', response.message);
    return [];
  }

  return response.data.map((pressRelease) => ({
    slug: pressRelease.slug,
  }));
}

export async function generateMetadata({ params }: PressReleasePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getPressReleaseBySlug(slug);

    if (isApiError(response)) {
      return {
        title: "Press Release Not Found",
      };
    }

    const pressRelease = response.data;

    const title = pressRelease.metadata?.metaTitle || pressRelease.title;
    const description = pressRelease.metadata?.metaDescription || pressRelease.excerpt;
    const keywords = pressRelease.metadata?.keywords || ["healthcare press releases", "healthcare news", "industry announcements", "healthcare market updates"];

    return {
      title: { absolute: title },
      description,
      keywords,
      openGraph: {
        title: pressRelease.metadata?.metaTitle || pressRelease.title,
        description,
        type: "article",
        publishedTime: pressRelease.publishDate || pressRelease.createdAt,
        authors: pressRelease.authorDetails ? [pressRelease.authorDetails.name] : [pressRelease.author],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `/press-release/${slug}`,
      },
    };
  } catch {
    return { title: "Press Release Not Found" };
  }
}

export default async function PressReleaseDetailPage({ params }: PressReleasePageProps) {
  const { slug } = await params;

  let response;
  try {
    response = await getPressReleaseBySlug(slug);
  } catch {
    notFound();
  }

  if (isApiError(response)) {
    notFound();
  }

  const pressRelease = response.data;

  let relatedReportId: number | null = null;
  if (pressRelease.reportUrl) {
    const reportSlug = pressRelease.reportUrl.split('/').filter(Boolean).pop();
    if (reportSlug) {
      const reportResponse = await getReportBySlug(reportSlug);
      if (!isApiError(reportResponse)) {
        relatedReportId = reportResponse.data.id;
      }
    }
  }

  const articleSchema = generateArticleSchema({
    type: 'NewsArticle',
    title: pressRelease.title,
    description: pressRelease.excerpt,
    url: `https://www.globemarketresearch.com/press-release/${pressRelease.slug}`,
    datePublished: pressRelease.publishDate || pressRelease.createdAt || pressRelease.date,
    dateModified: pressRelease.updatedAt,
    author: pressRelease.authorDetails?.name || pressRelease.author,
    keywords: pressRelease.metadata?.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.globemarketresearch.com' },
    { name: 'Press Releases', url: 'https://www.globemarketresearch.com/press-releases' },
    { name: pressRelease.title, url: `https://www.globemarketresearch.com/press-release/${pressRelease.slug}` },
  ]);

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      {/* ── Article Hero ─────────────────────────────────────────── */}
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
          className="pointer-events-none absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0284c7, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-7" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/press-releases" className="hover:text-white transition-colors">Press Releases</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="truncate max-w-[180px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{pressRelease.title}</span>
          </nav>

          {/* Category + type badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Link href={`/industry/${pressRelease.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <span
                className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full cursor-pointer transition-all"
                style={{ background: 'rgba(2,132,199,0.2)', color: '#7dd3fc', border: '1px solid rgba(2,132,199,0.35)' }}
              >
                {pressRelease.category}
              </span>
            </Link>
            <span
              className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Press Release
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-5 font-bold leading-tight"
            style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', letterSpacing: '-0.03em' }}
          >
            {pressRelease.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-8 leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem' }}>
            {pressRelease.excerpt}
          </p>

          {/* Author bar */}
          <div
            className="flex flex-wrap items-center gap-4 pt-6 text-sm"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: 'var(--accent)' }}
              >
                {pressRelease.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{pressRelease.author}</span>
            </div>
            {pressRelease.date && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <time style={{ color: 'rgba(255,255,255,0.5)' }}>{pressRelease.date}</time>
              </>
            )}
            {pressRelease.readTime && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span>{pressRelease.readTime}</span>
              </>
            )}
            {pressRelease.location && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span>{pressRelease.location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <Section className="pt-8">
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left – article (2/3 width) */}
            <div className="lg:col-span-2">
              <article>
                <StyledArticleContent htmlContent={pressRelease.content} />
              </article>

              <div className="mt-12 pt-8 border-t border-[var(--border)]">
                <Link
                  href="/press-releases"
                  className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  View all press releases
                </Link>
              </div>
            </div>

            {/* Right – sidebar (1/3 width) */}
            <div className="space-y-6">
              <Card>
                <CardContent className="space-y-3 pt-4">
                  {relatedReportId && (
                    <>
                      <Link href={`/request-sample?reportId=${relatedReportId}`}>
                        <Button
                          className="w-full bg-[#E3F2FD] text-[#1565C0] hover:bg-[#BBDEFB] hover:text-[#0D47A1] border-[#90CAF9] hover:border-[#64B5F6]"
                          variant="outline"
                          size="lg"
                        >
                          Request Sample
                        </Button>
                      </Link>
                      <Link href={`/request-customization?reportId=${relatedReportId}`}>
                        <Button
                          className="w-full mt-3 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border-green-200 hover:border-green-300"
                          variant="outline"
                          size="lg"
                        >
                          Customization
                        </Button>
                      </Link>
                    </>
                  )}
                  {pressRelease.reportUrl && (
                    <Link href={pressRelease.reportUrl}>
                      <Button
                        className="w-full mt-3"
                        size="lg"
                      >
                        Read Report
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              <TrustedPartnersSidebar />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
