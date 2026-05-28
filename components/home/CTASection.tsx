import Link from 'next/link';
import Image from 'next/image';
import { Section, Container } from '@/components/ui';

export default function CTASection() {
  return (
    <Section padding="sm">
      <Container size="lg">
        <div className="relative rounded-lg overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2236] via-[#0c3a5e] to-[#0284c7]" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

          {/* World map image — right side decoration */}
          {/* <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block">
            <Image
              src="/assets/other/Professional_world_map_with_glowing_202605080342.jpeg"
              alt=""
              fill
              className="object-cover object-center opacity-20 mix-blend-luminosity"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c3a5e] to-transparent" />
          </div> */}

          {/* Ambient glows */}
          <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-body tracking-wide backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
                Get started today
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: '-0.03em' }}>
                Ready to Power Your Business Decisions?
              </h2>

              <p className="font-body text-lg text-white/70 max-w-xl leading-relaxed">
                Get in touch with our team to see how our research can drive your decisions
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
                <Link
                  href="/contact"
                  className="font-body inline-flex items-center gap-2 bg-white text-[var(--featured-bg)] hover:bg-white/90 font-semibold text-sm px-7 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Contact Sales
                </Link>
                <Link
                  href="/industry"
                  className="font-body inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white hover:bg-white/20 hover:border-white/40 font-semibold text-sm px-7 py-3 rounded-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  View Reports
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Globe image panel */}
            <div className="hidden lg:block flex-shrink-0 w-[380px] h-[300px] relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/assets/other/Abstract_digital_globe_with_flowing_202605080343.jpeg"
                alt="Global market research coverage"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2236]/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-white text-sm font-semibold">150+ Countries Analyzed</p>
                <p className="font-body text-white/60 text-xs mt-0.5">Global reach, local expertise</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
