import { Section, Container } from '@/components/ui';

interface Stat {
  value: string;
  label: string;
  icon: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: '2,500+',
    label: 'Research Reports',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    description: 'Published & updated annually',
  },
  {
    value: '150+',
    label: 'Countries Covered',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    description: 'Global market coverage',
  },
  {
    value: '45+',
    label: 'Industry Sectors',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    description: 'Across key verticals',
  },
  {
    value: '1,000+',
    label: 'Enterprise Clients',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    description: 'Trust our intelligence',
  },
];

export default function StatsSection() {
  return (
    <Section background="card" padding="sm">
      <Container size="xl">
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]" style={{ letterSpacing: '-0.03em' }}>
              Why Choose Us
            </h2>
            <p className="font-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Trusted by enterprises and organizations worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group bg-[var(--surface-raised)] border border-[var(--border-color)] rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Left accent bar */}

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent)]/15 transition-colors duration-200">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>

                <div className="font-display text-4xl font-bold text-[var(--text-primary)] mb-1" style={{ letterSpacing: '-0.04em' }}>
                  {stat.value}
                </div>
                <div className="font-body text-sm font-semibold text-[var(--text-primary)] mb-0.5">
                  {stat.label}
                </div>
                <div className="font-body text-xs text-[var(--text-secondary)]">
                  {stat.description}
                </div>

                {/* Decorative corner circle */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full overflow-hidden pointer-events-none">
                  <div className="w-full h-full rounded-full bg-[var(--accent)]/5 group-hover:bg-[var(--accent)]/10 transition-colors duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
