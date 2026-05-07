import Link from 'next/link';
import { Section, Container } from '@/components/ui';
import { truncate } from '@/lib/utils';
import categories from '@/data/categories.json';

const categoryIcons: Record<string, string> = {
  biotechnology: 'M9 3a1 1 0 000 2h.01M15 3a1 1 0 000 2h.01M9 7a3 3 0 016 0v1a3 3 0 01-3 3 3 3 0 01-3-3V7zm-2 8a5 5 0 0110 0v1H7v-1zm1-3h8m-4 0v3',
  'clinical-diagnostics': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  'healthcare-services': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  'laboratory-equipment': 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'healthcare-it': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'medical-devices': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'medical-imaging': 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  'therapeutic-area': 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
  'life-sciences': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  dental: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
  pharmaceuticals: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'animal-health': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
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
              className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden bg-[var(--featured-bg)] p-8 flex flex-col justify-between shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[0]} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
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
                  {featured.description}
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
                  className="group relative rounded-2xl overflow-hidden bg-[var(--surface-raised)] border border-[var(--border-color)] p-5 flex flex-col justify-between shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
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
                    <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 hidden md:block">
                      {truncate(category.description, 65)}
                    </p>
                  </div>
                  <div className="relative z-10 mt-2">
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
