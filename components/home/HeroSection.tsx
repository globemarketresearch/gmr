import Link from 'next/link';
import Image from 'next/image';
import { Button, SearchBar } from '@/components/ui';

const industries = [
  { name: 'Healthcare & Pharma', growth: '+14.2%', color: '#10b981' },
  { name: 'Technology & AI', growth: '+22.8%', color: '#0284c7' },
  { name: 'Energy & Utilities', growth: '+8.5%', color: '#f59e0b' },
  { name: 'Financial Services', growth: '+11.3%', color: '#7c3aed' },
];

const avatars = [
  { bg: '#0284c7', letter: 'A' },
  { bg: '#7c3aed', letter: 'M' },
  { bg: '#059669', letter: 'S' },
  { bg: '#d97706', letter: 'R' },
  { bg: '#dc2626', letter: 'K' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] flex flex-col">

      {/* ── Background decorations ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(2,132,199,0.12)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_85%_70%_at_50%_0%,#000_60%,transparent_100%)]" />
        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-ocean-400/20 blur-[120px]" />
        <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] rounded-full bg-ocean-300/15 blur-[100px]" />
        <div className="absolute -bottom-16 left-1/3 w-[400px] h-[400px] rounded-full bg-ocean-200/25 blur-[80px]" />
      </div>

      {/* ── Hero body ──────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[88rem] mx-auto px-6 lg:px-14 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 xl:gap-24 items-center">

            {/* Left: copy */}
            <div className="flex flex-col items-start gap-7">

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
                className="font-display font-bold text-[var(--text-primary)] leading-[1.08]"
                style={{ letterSpacing: '-0.03em' }}
              >
                <span className="block text-5xl md:text-6xl xl:text-[4.5rem]">Market Intelligence</span>
                <span className="block text-5xl md:text-6xl xl:text-[4.5rem] mt-1 text-[#0284c7]">Worldwide.</span>
              </h1>

              {/* Subtext */}
              <p className="font-body text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
                Access comprehensive market research, expert analyst forecasts, and real-time
                industry data to power strategic decisions across 45+ global sectors.
              </p>

              {/* Search */}
              <div className="w-full max-w-lg">
                <SearchBar
                  variant="hero"
                  placeholder="Search reports, markets, industries…"
                  className="w-full"
                />
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
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

              {/* Social proof */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-2">
                  {avatars.map(({ bg, letter }) => (
                    <div
                      key={letter}
                      className="w-8 h-8 rounded-full border-2 border-[var(--bg)] flex items-center justify-center text-white text-xs font-bold font-display flex-shrink-0"
                      style={{ background: bg }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="font-body text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--text-primary)] font-semibold">2,000+</span> analysts rely on our insights
                </p>
              </div>
            </div>

            {/* Right: dashboard visual */}
            <div className="relative hidden lg:flex items-center justify-center py-8">
              {/* Soft shadow halo */}
              <div className="absolute inset-4 bg-ocean-400/10 rounded-3xl blur-3xl" aria-hidden />

              <div className="relative w-full max-w-[460px]">

                {/* Main card */}
                <div className="relative bg-white border border-[var(--border-color)] rounded-2xl p-6 shadow-[var(--shadow-xl)]">

                  {/* Card header */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="font-body text-[11px] text-[var(--text-tertiary)] uppercase tracking-widest mb-1">Global Market Overview</p>
                      <p className="font-display text-base font-semibold text-[var(--text-primary)] leading-tight">Q2 2025 Intelligence Report</p>
                    </div>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-[11px] font-medium font-body flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
                      Live
                    </span>
                  </div>

                  {/* Dashboard image */}
                  <div className="relative mb-5">
                    <div className="flex items-end justify-between mb-2 px-0.5">
                      <span className="font-display text-2xl font-bold text-[var(--text-primary)]">$4.82T</span>
                      <span className="font-body text-xs text-emerald-600 font-semibold">↑ 12.4% YoY</span>
                    </div>
                    <div className="h-[108px] w-full rounded-xl overflow-hidden">
                      <Image
                        src="/assets/other/Data_analytics_dashboard_floating_in_202605080342.jpeg"
                        alt="Data analytics dashboard"
                        width={420}
                        height={108}
                        className="w-full h-full object-cover object-top"
                        priority
                      />
                    </div>
                  </div>

                  {/* Industry rows */}
                  <div className="space-y-1">
                    {industries.map(({ name, growth, color }) => (
                      <div
                        key={name}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--surface)] transition-colors duration-150"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                          <span className="font-body text-[13px] text-[var(--text-secondary)]">{name}</span>
                        </div>
                        <span className="font-body text-[12px] font-semibold tabular-nums" style={{ color }}>{growth}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating card — top left */}
                <div className="absolute -top-5 -left-10 bg-white border border-[var(--border-color)] rounded-xl px-3.5 py-3 shadow-[var(--shadow-card-hover)]">
                  <p className="font-body text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-0.5">New This Week</p>
                  <p className="font-display text-xl font-bold text-[var(--text-primary)]">38 Reports</p>
                  <p className="font-body text-[11px] text-emerald-600 mt-0.5">↑ 6 more than last week</p>
                </div>

                {/* Floating card — bottom right */}
                <div className="absolute -bottom-5 -right-10 bg-white border border-[var(--border-color)] rounded-xl px-3.5 py-3 shadow-[var(--shadow-card-hover)]">
                  <p className="font-body text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-0.5">Forecast Accuracy</p>
                  <p className="font-display text-xl font-bold text-[var(--text-primary)]">97.4%</p>
                  <p className="font-body text-[11px] text-[var(--text-secondary)] mt-0.5">Analyst-verified</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
