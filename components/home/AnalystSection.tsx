import Image from 'next/image';
import Link from 'next/link';
import { Section, Container } from '@/components/ui';

const panels = [
  {
    image: '/assets/other/Confident_analyst_at_a_standing_202605080343.jpeg',
    label: 'Expert Analysts',
    headline: '50+ Dedicated Research Specialists',
    body: 'Our analysts bring deep domain expertise across healthcare, energy, technology, and financial sectors.',
    accent: 'from-sky-500/80 to-blue-700/80',
  },
  {
    image: '/assets/other/Business_professionals_shaking_hands_in_202605080343.jpeg',
    label: 'Client Partnerships',
    headline: 'Built on Trust & Results',
    body: 'We work as an extension of your team, delivering insights that lead to confident, data-backed decisions.',
    accent: 'from-violet-500/80 to-purple-700/80',
  },
  {
    image: '/assets/other/Clean_corporate_portrait_of_a_202605080343.jpeg',
    label: 'Personalized Service',
    headline: 'Dedicated Account Support',
    body: 'Every client gets a dedicated analyst relationship, ensuring your research needs are always prioritized.',
    accent: 'from-emerald-500/80 to-teal-700/80',
  },
];

export default function AnalystSection() {
  return (
    <Section padding="sm">
      <Container size="xl">
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2
              className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Research You Can Rely On
            </h2>
            <p className="font-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              World-class analysts, trusted methodology, and personalized service — all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {panels.map((panel) => (
              <div
                key={panel.label}
                className="group relative rounded-2xl overflow-hidden h-[340px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
              >
                {/* Background image */}
                <Image
                  src={panel.image}
                  alt={panel.headline}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${panel.accent} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="inline-block font-body text-[11px] font-semibold text-white/70 uppercase tracking-widest mb-2">
                    {panel.label}
                  </span>
                  <h3
                    className="font-display text-xl font-bold text-white leading-snug mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {panel.headline}
                  </h3>
                  <p className="font-body text-sm text-white/75 leading-relaxed">
                    {panel.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/about"
              className="font-body inline-flex items-center gap-2 text-[var(--accent)] font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              Learn more about our team
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
