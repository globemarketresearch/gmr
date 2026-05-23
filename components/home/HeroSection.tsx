import Link from 'next/link';
import { Button, SearchBar } from '@/components/ui';


export default function HeroSection() {
  return (
    <section className="relative bg-[var(--bg)] overflow-hidden">

      {/* ── Background decorations ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(25,195,213,0.10)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
        {/* Gradient orbs — logo cyan #19C3D5 */}
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full blur-[140px]" style={{background:'rgba(25,195,213,0.30)'}} />
        <div className="absolute top-0 -right-40 w-[500px] h-[500px] rounded-full blur-[120px]" style={{background:'rgba(25,195,213,0.22)'}} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px]" style={{background:'rgba(25,195,213,0.18)'}} />
      </div>

      {/* ── Hero content ───────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[88rem] mx-auto px-6 lg:px-14 pt-24 pb-12 lg:pt-36 lg:pb-18">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">

          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-50 border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-body font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ocean-600" />
            </span>
            Trusted by 500+ Fortune 500 Companies
          </span>

          {/* Headline */}
          <h1
            className="font-display font-bold text-[var(--text-primary)] leading-[1.06]"
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block text-5xl md:text-6xl xl:text-[5rem]">Trusted Market</span>
            <span className="block text-5xl md:text-6xl xl:text-[5rem] text-[#19C3D5]">Intelligence</span>
          </h1>

          {/* Subtext */}
          <p className="font-body text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Reliable research and clear insights to help businesses understand markets, reduce risks,
            and make smarter growth decisions.
          </p>

          {/* Search */}
          <div className="w-full max-w-xl">
            <SearchBar
              variant="hero"
              placeholder="Search reports, markets, industries…"
              className="w-full"
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/industry">
              <Button
                size="lg"
                className="bg-[#ec652b] hover:bg-[#d4571f] border-0 text-white shadow-lg shadow-[#ec652b]/20 hover:shadow-[#ec652b]/35 hover:-translate-y-0.5 transition-all duration-200 font-display tracking-tight"
              >
                Browse Reports
                <svg className="w-4 h-4 ml-2 -mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--surface)] hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200 font-display tracking-tight"
              >
                Talk to an Analyst
              </Button>
            </Link>
          </div>


        </div>
      </div>

    </section>
  );
}
