'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import type { IndustryNews } from '@/lib/api/industry-news.types';
import IndustryNewsListCard from './IndustryNewsListCard';
import Pagination from '@/components/reports/Pagination';
import FilterSidebar from '@/components/reports/FilterSidebar';
import SectionDescription from '@/components/reports/SectionDescription';
import { getIndustryNewsList, isApiError } from '@/lib/api';
import categories from '@/data/categories.json';

const ITEMS_PER_PAGE = 8;

interface IndustryNewsListingClientProps {
  industryNewsList: IndustryNews[];
  totalItems: number;
  totalPages: number;
}

export default function IndustryNewsListingClient({
  industryNewsList: initialIndustryNewsList,
  totalItems: initialTotalItems,
  totalPages: initialTotalPages,
}: IndustryNewsListingClientProps) {
  const storageKey = 'industry_news_page';
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = categories.find((c) => c.slug === searchParams.get('category')) ?? null;

  const [industryNewsList, setIndustryNewsList] = useState<IndustryNews[]>(initialIndustryNewsList);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [, setTotalItems] = useState(initialTotalItems);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number] | null>(initialCategory);

  const fetchPage = useCallback(async (page: number, categoryId?: number) => {
    setIsLoading(true);
    const response = await getIndustryNewsList({
      status: 'published',
      page,
      limit: ITEMS_PER_PAGE,
      sort_by: 'publish_date_desc',
      ...(categoryId ? { categoryId } : {}),
    });
    if (!isApiError(response)) {
      setIndustryNewsList(response.data);
      if (response.meta) {
        setTotalPages(response.meta.totalPages);
        setTotalItems(response.meta.totalItems);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    const savedPage = saved ? Math.max(1, parseInt(saved, 10) || 1) : 1;
    if (savedPage !== 1 || initialCategory) {
      setCurrentPage(savedPage);
      fetchPage(savedPage, initialCategory?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem(storageKey, String(page));
    await fetchPage(page, activeCategory?.id);
    document.getElementById('industry-news-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategorySelect = async (category: (typeof categories)[number] | null) => {
    setActiveCategory(category);
    setCurrentPage(1);
    sessionStorage.setItem(storageKey, '1');
    router.replace(category ? `/industry-news?category=${category.slug}` : '/industry-news', { scroll: false });
    await fetchPage(1, category?.id);
    document.getElementById('industry-news-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div
        className="relative overflow-hidden border-b border-[var(--border-color)]"
        style={{ background: 'var(--featured-bg)' }}
      >
        <Image
          src="/assets/other/PressReleases.png"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
          priority
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(3,26,61,0.35) 0%, rgba(3,26,61,0.55) 100%)' }} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(2,132,199,0.18) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0284c7, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Industry News</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              aria-hidden="true"
              className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl text-3xl shrink-0 mt-0.5"
              style={{
                background: 'rgba(2,132,199,0.15)',
                border: '1px solid rgba(2,132,199,0.3)',
              }}
            >
              📰
            </div>
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                style={{ background: 'rgba(2,132,199,0.2)', color: '#7dd3fc', border: '1px solid rgba(2,132,199,0.3)' }}
              >
                <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="3"/></svg>
                Industry Updates
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3" style={{ color: '#fff', letterSpacing: '-0.03em' }}>
                Industry News
              </h1>
              <p className="text-sm sm:text-[15px] leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Curated healthcare and market research industry news from Globe Market Research. Stay ahead of the trends shaping the market.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SectionDescription
        intro={[
          "Stay updated with the latest industry developments, company announcements, investment activities, funding rounds, strategic partnerships, mergers and acquisitions, and emerging market trends. Globe Market Research provides timely coverage of major business events, technology advancements, regulatory changes, and market movements across industries. Our news updates highlight how company strategies, capital investments, innovation, and global developments are influencing market growth, competitive landscapes, and future opportunities.",
        ]}
        itemsHeading="What We Cover"
        items={[
          {
            title: "Company Investments",
            desc: "Track major investments, expansion plans, infrastructure development, research initiatives, and strategic spending by leading companies shaping global industries.",
          },
          {
            title: "Company Announcements",
            desc: "Stay informed about new product launches, technology advancements, business expansions, leadership updates, and strategic decisions announced by global organizations.",
          },
          {
            title: "Market News",
            desc: "Access the latest market updates, industry shifts, demand trends, regional developments, and factors influencing business growth across different sectors.",
          },
          {
            title: "Funding & Venture Capital Updates",
            desc: "Follow startup funding rounds, venture capital investments, government funding programs, and financial activities supporting innovation and emerging technologies.",
          },
          {
            title: "Strategic Partnerships & Collaborations",
            desc: "Discover key partnerships, technology collaborations, joint ventures, and ecosystem developments driving innovation and market expansion.",
          },
          {
            title: "Market Impact Analysis",
            desc: "Understand how investments, announcements, partnerships, regulations, and economic factors impact industries, companies, supply chains, and future market opportunities.",
          },
          {
            title: "Recent Developments",
            desc: "Explore recent advancements, industry milestones, technological breakthroughs, and strategic moves shaping the future direction of global markets.",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_288px] gap-10">
          <main id="industry-news-list">
            {isLoading ? (
              <div className="space-y-4 mt-4">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="h-32 bg-[var(--surface)] animate-pulse rounded-xl" />
                ))}
              </div>
            ) : industryNewsList.length > 0 ? (
              <>
                <div>
                  {industryNewsList.map((item) => (
                    <IndustryNewsListCard key={item.id} industryNews={item} />
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-[var(--border-color)] rounded-xl mt-4">
                <div className="text-5xl mb-4">📰</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No industry news found</h3>
                <p className="text-sm text-[var(--text-tertiary)]">Check back later for new updates</p>
              </div>
            )}
          </main>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar
                filters={{ industries: [], regions: [], reportTypes: [], priceRanges: [] }}
                onFilterChange={() => {}}
                totalCount={0}
                activeCategorySlug={activeCategory?.slug}
                onCategorySelect={handleCategorySelect}
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
