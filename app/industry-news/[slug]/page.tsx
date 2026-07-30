import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container } from "@/components/ui";
import { StyledReportContent } from "@/components/reports/StyledReportContent";
import { ArticleContentWrapper } from "@/components/shared/ArticleContentWrapper";
import { getIndustryNewsList, getIndustryNewsBySlug, getReportsByAuthorId, isApiError } from "@/lib/api";
import type { Metadata } from "next";
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { TrustedPartnersSidebar } from "@/components/contact";
import { ShareButtons } from "@/components/shared/ShareButtons";
import RelatedIndustryNewsSection from "@/components/industry-news/RelatedIndustryNewsSection";
import GooglePreferredSource from "@/components/reports/GooglePreferredSource";
import AuthorHoverCard from "@/components/authors/AuthorHoverCard";

export const revalidate = 300;

interface IndustryNewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const response = await getIndustryNewsList({ status: 'published', limit: 100 });

  if (isApiError(response)) {
    console.error('Failed to fetch industry news for static params:', response.message);
    return [];
  }

  return response.data.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: IndustryNewsPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getIndustryNewsBySlug(slug);

    if (isApiError(response)) {
      return {
        title: "Industry News Not Found",
      };
    }

    const industryNews = response.data;

    const title = industryNews.metadata?.metaTitle || industryNews.title;
    const description = industryNews.metadata?.metaDescription || industryNews.excerpt;
    const keywords = industryNews.metadata?.keywords || ["healthcare industry news", "market trends", "industry announcements", "healthcare market updates"];

    return {
      title: { absolute: title },
      description,
      keywords,
      openGraph: {
        title: industryNews.metadata?.metaTitle || industryNews.title,
        description,
        type: "article",
        publishedTime: industryNews.publishDate || industryNews.createdAt,
        authors: industryNews.authorDetails ? [industryNews.authorDetails.name] : [industryNews.author],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `/industry-news/${slug}`,
      },
    };
  } catch {
    return { title: "Industry News Not Found" };
  }
}

export default async function IndustryNewsDetailPage({ params }: IndustryNewsPageProps) {
  const { slug } = await params;

  let response;
  try {
    response = await getIndustryNewsBySlug(slug);
  } catch {
    notFound();
  }

  if (isApiError(response)) {
    notFound();
  }

  const industryNews = response.data;

  const authorReportsResponse = industryNews.authorDetails
    ? await getReportsByAuthorId(industryNews.authorDetails.id, { status: 'published', limit: 1000 })
    : null;
  const authorReports =
    authorReportsResponse && !isApiError(authorReportsResponse) ? authorReportsResponse.data : [];
  const authorArticleCount = authorReports.length;
  const authorLatestPosts = authorReports
    .filter((r) => r.slug !== industryNews.slug)
    .slice(0, 4)
    .map((r) => ({ title: r.title, slug: r.slug, href: `/reports/${r.slug}` }));

  const articleSchema = generateArticleSchema({
    type: 'NewsArticle',
    title: industryNews.title,
    description: industryNews.excerpt,
    url: `https://www.globemarketresearch.com/industry-news/${industryNews.slug}`,
    datePublished: industryNews.publishDate || industryNews.createdAt || industryNews.date,
    dateModified: industryNews.updatedAt,
    author: industryNews.authorDetails?.name || industryNews.author,
    keywords: industryNews.metadata?.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.globemarketresearch.com' },
    { name: 'Industry News', url: 'https://www.globemarketresearch.com/industry-news' },
    { name: industryNews.title, url: `https://www.globemarketresearch.com/industry-news/${industryNews.slug}` },
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
        <div className="relative max-w-[1400px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-7" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/industry-news" className="hover:text-white transition-colors">Industry News</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="truncate max-w-[180px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{industryNews.title}</span>
          </nav>

          {/* Category + type badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Link href={`/industry/${industryNews.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <span
                className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full cursor-pointer transition-all"
                style={{ background: 'rgba(2,132,199,0.2)', color: '#7dd3fc', border: '1px solid rgba(2,132,199,0.35)' }}
              >
                {industryNews.category}
              </span>
            </Link>
            <span
              className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Industry News
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-5 font-bold leading-tight"
            style={{ color: '#fff', fontSize: 'clamp(1.25rem, 4vw, 2.25rem)', letterSpacing: '-0.03em' }}
          >
            {industryNews.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem' }}>
            {industryNews.excerpt}
          </p>

          {/* Author bar */}
          <div
            className="flex flex-wrap items-center gap-4 pt-6 text-sm"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
          >
            {industryNews.authorDetails ? (
              <AuthorHoverCard
                author={industryNews.authorDetails}
                articleCount={authorArticleCount}
                latestPosts={authorLatestPosts}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: 'var(--accent)' }}
                >
                  {industryNews.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{industryNews.author}</span>
              </AuthorHoverCard>
            ) : (
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: 'var(--accent)' }}
                >
                  {industryNews.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{industryNews.author}</span>
              </div>
            )}
            {industryNews.date && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <time style={{ color: 'rgba(255,255,255,0.5)' }}>{industryNews.date}</time>
              </>
            )}
            {industryNews.readTime && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span>{industryNews.readTime}</span>
              </>
            )}
            {industryNews.location && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span>{industryNews.location}</span>
              </>
            )}
            <div className="ml-auto">
              <ShareButtons
                title={industryNews.title}
                url={`https://www.globemarketresearch.com/industry-news/${industryNews.slug}`}
              />
            </div>
          </div>
        </div>
      </div>

      <Section className="pt-8" container={false}>
        <Container size="xl">
          <ArticleContentWrapper
            sidebar={
              <div className="space-y-6">
                <TrustedPartnersSidebar />
              </div>
            }
          >
            <article>
              <StyledReportContent htmlContent={industryNews.content} />
            </article>

            <GooglePreferredSource />

            <RelatedIndustryNewsSection
              categorySlug={industryNews.category.toLowerCase().replace(/\s+/g, '-')}
              categoryName={industryNews.category}
              currentSlug={industryNews.slug}
            />

            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <Link
                href="/industry-news"
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
                View all industry news
              </Link>
            </div>
          </ArticleContentWrapper>
        </Container>
      </Section>
    </>
  );
}
