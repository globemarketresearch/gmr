import Link from 'next/link';
import { Section, Container } from '@/components/ui';

export default function CTASection() {
  return (
    <Section padding="sm">
      <Container size="lg">
        <div className="relative rounded-2xl overflow-hidden px-8 py-12 md:px-16 md:py-16 text-center">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2236] via-[#0c3a5e] to-[#0284c7]" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

          {/* Ambient glows */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Corner accent circles */}
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border border-white/[0.06] pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-body tracking-wide backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
              Get started today
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: '-0.03em' }}>
              Ready to Transform Your Healthcare Strategy?
            </h2>

            <p className="font-body text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Get in touch with our team to see how our research can drive your decisions
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="font-body inline-flex items-center gap-2 bg-white text-[var(--featured-bg)] hover:bg-white/90 font-semibold text-sm px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Contact Sales
              </Link>
              <Link
                href="/industry"
                className="font-body inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white hover:bg-white/20 hover:border-white/40 font-semibold text-sm px-7 py-3 rounded-xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                View Reports
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
