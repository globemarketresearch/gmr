import { Section, Container } from '@/components/ui';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface Stat {
  value: string;
  label: string;
  icon: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: '2,500+',
    label: 'Reports Published',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    description: 'Published & updated annually',
  },
  {
    value: '150+',
    label: 'Market Consulting',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    description: 'Expert consulting engagements',
  },
  {
    value: '500+',
    label: 'Satisfied Customers',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    description: 'Worldwide happy clients',
  },
  {
    value: '45+',
    label: 'Industries Covered',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    description: 'Across key verticals',
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

                <AnimatedCounter
                  value={stat.value}
                  className="font-display text-4xl font-bold text-[var(--text-primary)] mb-1 block"
                  style={{ letterSpacing: '-0.04em' }}
                />
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
