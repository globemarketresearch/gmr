import Link from 'next/link';
import { Section, Container, Badge, Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { getReports, isApiError } from '@/lib/api';

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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]" style={{ letterSpacing: '-0.03em' }}>
              Featured Research
            </h2>
            <p className="font-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore our latest market research reports and gain actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reports.map((report, index) => (
              <Link
                key={report.id}
                href={`/reports/${report.slug}`}
                className="group relative bg-[var(--surface-raised)] border border-[var(--border-color)] rounded-2xl p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
              >
                {/* Subtle accent glow on first card */}
                {index === 0 && (
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[var(--accent)]/5 to-transparent rounded-2xl pointer-events-none" />
                )}

                <div className="relative z-10 space-y-3 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={index === 0 ? 'primary' : 'outline'} size="sm">{report.category}</Badge>
                    <span className="font-body text-xs text-[var(--text-secondary)]">{formatDate(report.date)}</span>
                    {index === 0 && (
                      <span className="ml-auto inline-flex items-center gap-1 text-xs font-body text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-1 rounded-full font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent)] transition-colors duration-200 line-clamp-2" style={{ letterSpacing: '-0.02em' }}>
                    {report.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {report.summary}
                  </p>
                </div>

                <div className="relative z-10 mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--accent)] font-body group-hover:gap-3 transition-all duration-200">
                  Read Full Report
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/industry">
              <Button variant="outline" size="md">
                View All Reports
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
