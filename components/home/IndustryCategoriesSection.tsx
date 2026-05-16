import Link from 'next/link';
import Image from 'next/image';
import { Section, Container } from '@/components/ui';
import { truncate } from '@/lib/utils';
import categories from '@/data/categories.json';

const categoryIcons: Record<string, string> = {
  'aerospace-and-defence': 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
  'automotive-and-transportation': 'M8 17l4-4 4 4m0-10l-4 4-4-4M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  'chemical-and-material': 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'consumer-goods': 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  'manufacturing-and-construction': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  'semiconductor-and-electronics': 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  'healthcare-and-pharmaceuticals': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'food-and-beverages': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  'information-and-technology': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  agriculture: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'energy-and-power': 'M13 10V3L4 14h7v7l9-11h-7z',
  packaging: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'smart-technologies': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
};

const accentColors = [
  'from-sky-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-500',
  'from-rose-500 to-pink-600',
  'from-indigo-500 to-blue-600',
  'from-green-500 to-emerald-600',
  'from-blue-500 to-indigo-600',
  'from-orange-500 to-amber-600',
  'from-teal-500 to-cyan-600',
  'from-fuchsia-500 to-violet-600',
];

export default function IndustryCategoriesSection() {
  const featured = categories[0];
  const rest = categories.slice(1);

  return (
    <Section padding="sm">
      <Container size="xl">
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]" style={{ letterSpacing: '-0.03em' }}>
              Industry Coverage
            </h2>
            <p className="font-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Comprehensive research across key global market sectors
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px]">
            {/* Featured tile — spans 2×2 */}
            <Link
              href={`/industry/${featured.slug}`}
              className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden bg-[var(--featured-bg)] p-8 flex flex-col justify-between shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[0]} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              {/* Decorative healthcare icon image */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 opacity-20 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                <Image
                  src="/assets/other/Minimalist_3D_healthcare_industry_icon,_202605080343.jpeg"
                  alt=""
                  fill
                  className="object-cover rounded-full"
                  aria-hidden
                />
              </div>
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-sky-400/20 to-transparent rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentColors[0]} flex items-center justify-center mb-4 shadow-lg`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={categoryIcons[featured.slug] ?? categoryIcons['biotechnology']} />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2" style={{ letterSpacing: '-0.025em' }}>
                  {featured.name}
                </h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  {(featured as { description?: string }).description ?? ''}
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-1.5 text-sky-300 text-sm font-medium font-body group-hover:gap-3 transition-all duration-200">
                <span>Explore Reports</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Remaining tiles */}
            {rest.map((category, i) => {
              const gradient = accentColors[(i + 1) % accentColors.length];
              const icon = categoryIcons[category.slug];
              return (
                <Link
                  key={category.id}
                  href={`/industry/${category.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-[var(--surface-raised)] border border-[var(--border-color)] p-5 flex flex-col shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative z-10 space-y-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon ?? categoryIcons['biotechnology']} />
                      </svg>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-[var(--text-primary)] leading-snug" style={{ letterSpacing: '-0.01em' }}>
                      {category.name}
                    </h3>
                    {(category as { description?: string }).description && (
                      <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 hidden md:block">
                        {truncate((category as { description?: string }).description ?? '', 65)}
                      </p>
                    )}
                  </div>
                  <div className="absolute top-4 right-5 z-10">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 font-body">
                      View
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
