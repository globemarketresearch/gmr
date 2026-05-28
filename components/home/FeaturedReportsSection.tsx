import Link from 'next/link';
import { Section, Container } from '@/components/ui';
import { getReports, isApiError } from '@/lib/api';
import type { Report } from '@/lib/api/reports.types';

function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function getCategoryStyle(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('tech') || c.includes('it') || c.includes('software')) return 'text-blue-600';
  if (c.includes('retail') || c.includes('consumer') || c.includes('food') || c.includes('beverage')) return 'text-orange-500';
  if (c.includes('energy') || c.includes('environment')) return 'text-yellow-600';
  if (c.includes('finance') || c.includes('banking') || c.includes('insurance')) return 'text-violet-600';
  return 'text-emerald-600';
}

function formatMarketSize(raw: string | undefined): string {
  if (!raw) return '';
  return raw.replace(' bn', 'B').replace(' trillion', 'T').replace(' million', 'M');
}

function getForecastYear(forecastPeriod: string | undefined): string {
  if (!forecastPeriod) return '';
  const parts = forecastPeriod.split('-');
  return parts[parts.length - 1];
}

const SparklineChart = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" fill="none" aria-hidden="true">
    <path
      d="M2 36 C15 32, 30 26, 44 18 C56 11, 66 5, 78 2"
      stroke="#f97316"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="78" cy="2" r="3.5" fill="#f97316" />
  </svg>
);

function ReportCard({ report, index }: { report: Report; index: number }) {
  const isFirst = index === 0;
  const forecastYear = getForecastYear(report.forecastPeriod);
  const marketSize = formatMarketSize(report.marketSize2032);
  const hasMetrics = marketSize && report.cagr;

  return (
    <Link
      href={`/reports/${report.slug}`}
      className="group bg-[var(--surface-raised)] border border-[var(--border-color)] rounded-lg p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold tracking-wider uppercase ${getCategoryStyle(report.category)}`}>
          {report.category}
        </span>
        <span className="text-xs text-[var(--text-tertiary)] font-medium">{formatShortDate(report.date)}</span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-[var(--text-primary)] text-[1.05rem] leading-snug line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors duration-200">
        {report.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4 flex-1">
        {report.summary || report.description}
      </p>

      {/* Market metrics box */}
      {hasMetrics && (
        <div className="bg-[var(--surface)] rounded-lg px-4 py-3 flex items-center justify-between mb-4">
          <div>
            <p className="text-[1.35rem] font-bold text-[var(--text-primary)] leading-none">{marketSize}</p>
            {forecastYear && (
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Market by {forecastYear}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <SparklineChart />
            <span className="text-xs font-semibold text-orange-500">↑ {report.cagr} CAGR</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--text-tertiary)] font-medium">
          {report.pages}+ pages
          {report.region && report.region !== 'Global' ? ` · ${report.region}` : ''}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            From {report.price}
          </span>
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
      </div>
    </Link>
  );
}

export default async function FeaturedReportsSection() {
  const response = await getReports({
    status: 'published',
    limit: 3,
  });

  if (isApiError(response) || response.data.length === 0) {
    return null;
  }

  const reports = response.data;

  return (
    <Section background="muted" padding="sm">
      <Container size="xl">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2
              className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Featured Research
            </h2>
            <p className="font-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore our latest market research reports and gain actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reports.map((report, index) => (
              <ReportCard key={report.id} report={report} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/industry"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-color)] rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              View All Reports
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
