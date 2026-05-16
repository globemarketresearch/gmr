import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container, StyledArticleContent } from "@/components/ui";
import { getBlogs, getBlogBySlug, isApiError } from "@/lib/api";
import type { Metadata } from "next";
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import StatisticsSidebarForm from "@/components/statistics/StatisticsSidebarForm";
import { QuickContactSection } from "@/components/contact";

interface StatisticPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const response = await getBlogs({ status: 'published', limit: 100 });

  if (isApiError(response)) {
    console.error('Failed to fetch statistics for static params:', response.message);
    return [];
  }

  return response.data.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: StatisticPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getBlogBySlug(slug);

    if (isApiError(response)) {
      return {
        title: "Statistic Not Found",
      };
    }

    const blog = response.data;

    // Use metadata fields if available, otherwise fallback to defaults
    const title = blog.metadata?.metaTitle || blog.title;
    const description = blog.metadata?.metaDescription || blog.excerpt;
    const keywords = blog.metadata?.keywords || [];

    return {
      title: { absolute: title },
      description,
      keywords,
      openGraph: {
        title: blog.metadata?.metaTitle || blog.title,
        description,
        type: "article",
        publishedTime: blog.publishDate || blog.createdAt,
        authors: blog.authorDetails ? [blog.authorDetails.name] : [blog.author],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `/statistic/${slug}`,
      },
    };
  } catch {
    return { title: "Statistic Not Found" };
  }
}

export default async function StatisticDetailPage({ params }: StatisticPageProps) {
  const { slug } = await params;

  let response;
  try {
    response = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  if (isApiError(response)) {
    notFound();
  }

  const blog = response.data;

  // Generate structured data schemas
  const articleSchema = generateArticleSchema({
    type: 'Article',
    title: blog.title,
    description: blog.excerpt,
    url: `https://www.globemarketresearch.com/statistic/${blog.slug}`,
    datePublished: blog.publishDate || blog.createdAt || blog.date,
    dateModified: blog.updatedAt,
    author: blog.authorDetails?.name || blog.author,
    keywords: blog.metadata?.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.globemarketresearch.com' },
    { name: 'Statistics', url: 'https://www.globemarketresearch.com/statistics' },
    { name: blog.title, url: `https://www.globemarketresearch.com/statistic/${blog.slug}` },
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
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-7" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/statistics" className="hover:text-white transition-colors">Statistics</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="truncate max-w-[180px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{blog.title}</span>
          </nav>

          {/* Category + type badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Link href={`/industry/${blog.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <span
                className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full cursor-pointer transition-all"
                style={{ background: 'rgba(2,132,199,0.2)', color: '#7dd3fc', border: '1px solid rgba(2,132,199,0.35)' }}
              >
                {blog.category}
              </span>
            </Link>
            <span
              className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Statistics
            </span>
          </div>

          {/* Title */}
          <h1
            className="mb-5 font-bold leading-tight"
            style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', letterSpacing: '-0.03em' }}
          >
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-8 leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem' }}>
            {blog.excerpt}
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
                {blog.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{blog.author}</span>
            </div>
            {blog.date && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <time style={{ color: 'rgba(255,255,255,0.5)' }}>{blog.date}</time>
              </>
            )}
            {blog.readTime && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span>{blog.readTime}</span>
              </>
            )}
            {blog.location && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span>{blog.location}</span>
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
                <StyledArticleContent htmlContent={blog.content} />
              </article>

              <div className="mt-12 pt-8 border-t border-[var(--border)]">
                <Link
                  href="/statistics"
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
                  View all statistics
                </Link>
              </div>
            </div>

            {/* Right – sidebar (1/3 width) */}
            <div className="space-y-6">
              <StatisticsSidebarForm />
              <QuickContactSection />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
