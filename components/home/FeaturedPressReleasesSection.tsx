import Link from 'next/link';
import { Section, Container } from '@/components/ui';
import { getPressReleases, isApiError } from '@/lib/api';
import type { PressRelease } from '@/lib/api/press-releases.types';

function formatShortDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getCategoryStyle(category: string): string {
  const c = (category || '').toLowerCase();
  if (c.includes('health') || c.includes('medical') || c.includes('pharma')) return 'text-rose-600';
  if (c.includes('tech') || c.includes('ai') || c.includes('software')) return 'text-blue-600';
  if (c.includes('finance') || c.includes('banking') || c.includes('market')) return 'text-violet-600';
  if (c.includes('energy') || c.includes('environ')) return 'text-yellow-600';
  if (c.includes('retail') || c.includes('consumer')) return 'text-orange-500';
  return 'text-teal-600';
}

function PressReleaseCard({ pr, index }: { pr: PressRelease; index: number }) {
  const isFirst = index === 0;
  const displayDate = formatShortDate(pr.publishDate || pr.date);

  return (
    <Link
      href={`/press-release/${pr.slug}`}
      className="group bg-[var(--surface-raised)] border border-[var(--border-color)] rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold tracking-wider uppercase ${getCategoryStyle(pr.category)}`}>
          {pr.category || 'Press Release'}
        </span>
        {displayDate && (
          <span className="text-xs text-[var(--text-tertiary)] font-medium">{displayDate}</span>
        )}
      </div>

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-2">
        <div
          aria-hidden="true"
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl text-lg shrink-0 mt-0.5"
          style={{
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.18)',
          }}
        >
          📰
        </div>
        <h3 className="font-bold text-[var(--text-primary)] text-[1.05rem] leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
          {pr.title}
        </h3>
      </div>

      {/* Excerpt */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4 flex-1">
        {pr.excerpt}
      </p>

      {/* Location tag if present */}
      {pr.location && (
        <div className="flex items-center gap-1.5 mb-3">
          <svg className="w-3 h-3 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs text-[var(--text-tertiary)]">{pr.location}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
            style={{ background: 'rgba(249,115,22,0.75)' }}
          >
            {(pr.author || 'GM').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <span className="text-xs text-[var(--text-secondary)] font-medium truncate max-w-[100px]">
            {pr.author || 'GMR Editorial'}
          </span>
          {pr.readTime && (
            <span className="text-xs text-[var(--text-tertiary)]">· {pr.readTime}</span>
          )}
        </div>
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isFirst
              ? 'bg-orange-500 text-white group-hover:bg-orange-600'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] group-hover:bg-[var(--border-color)]'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default async function FeaturedPressReleasesSection() {
  const response = await getPressReleases({
    status: 'published',
    limit: 6,
    sort_by: 'publish_date_desc',
  });

  if (isApiError(response) || response.data.length === 0) {
    return null;
  }

  const pressReleases = response.data;

  return (
    <Section background="muted" padding="sm">
      <Container size="xl">
        <div className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(249,115,22,0.08)', color: '#ea580c', border: '1px solid rgba(249,115,22,0.18)' }}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="3" /></svg>
                  In the News
                </span>
              </div>
              <h2
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)]"
                style={{ letterSpacing: '-0.03em' }}
              >
                Latest Press Releases
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] max-w-xl">
                Official announcements, market milestones, and coverage from the global research community
              </p>
            </div>
            <Link
              href="/press-releases"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-color)] rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:border-orange-400 hover:text-orange-600 transition-colors duration-200 shrink-0"
            >
              View All
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pressReleases.map((pr, index) => (
              <PressReleaseCard key={pr.id} pr={pr} index={index} />
            ))}
          </div>

          {/* Mobile "View All" */}
          <div className="text-center md:hidden">
            <Link
              href="/press-releases"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:border-orange-400 hover:text-orange-600 transition-colors duration-200"
            >
              View All Press Releases
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
