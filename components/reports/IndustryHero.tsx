import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface IndustryHeroProps {
  activeCategory?: Category | null;
}

const BASE = '/assets/report-assets/reports-image';
const CATEGORY_IMAGES: Record<string, string> = {
  'Aerospace and Defence':          `${BASE}/aerospace-and-defence.png`,
  'Automotive and Transportation':  `${BASE}/automotive-and-transportation.png`,
  'Chemical and Material':          `${BASE}/chemical-and-material.png`,
  'Consumer Goods':                 `${BASE}/consumer-goods.png`,
  'Manufacturing and Construction': `${BASE}/manufacturing-and-construction.png`,
  'Semiconductor and Electronics':  `${BASE}/semiconductor-and-electronics.png`,
  'Healthcare and Pharmaceuticals': `${BASE}/healthcare-and-pharmaceuticals.png`,
  'Food and Beverages':             `${BASE}/food-and-beverages.png`,
  'Information and Technology':     `${BASE}/information-and-technology.png`,
  'Agriculture':                    `${BASE}/agriculture.png`,
  'Energy and Power':               `${BASE}/energy-and-power.png`,
  'Packaging':                      `${BASE}/packaging.png`,
  'Smart Technologies':             `${BASE}/smart-technologies.png`,
};

export default function IndustryHero({ activeCategory }: IndustryHeroProps) {
  const categoryImage = activeCategory ? CATEGORY_IMAGES[activeCategory.name] : null;

  return (
    <div
      className="relative overflow-hidden border-b border-[var(--border-color)]"
      style={{ background: 'var(--featured-bg)' }}
    >
      {/* Category image — full-width background */}
      {categoryImage && (
        <Image
          src={categoryImage}
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
          priority
        />
      )}
      {/* Subtle gradient overlay so text stays readable without killing the image */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(3,26,61,0.35) 0%, rgba(3,26,61,0.55) 100%)' }} />
      {/* Dot-grid atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(2,132,199,0.18) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
        }}
      />
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #0284c7, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/industry" className="hover:text-white transition-colors">Reports</Link>
          {activeCategory && (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{activeCategory.name}</span>
            </>
          )}
        </nav>

        <div className="flex items-start gap-5">
          <div className="flex-1 min-w-0">
            {/* Label chip */}
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
              style={{
                background: 'rgba(2,132,199,0.2)',
                color: '#7dd3fc',
                border: '1px solid rgba(2,132,199,0.3)',
              }}
            >
              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="3"/>
              </svg>
              Market Intelligence
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3" style={{ color: '#fff', letterSpacing: '-0.03em' }}>
              {activeCategory
                ? `${activeCategory.name} Market Research Reports`
                : 'Global Market Research Reports'}
            </h1>

            <p className="text-sm sm:text-[15px] leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {activeCategory?.description
                ?? 'Browse comprehensive market research reports across all industry segments.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
