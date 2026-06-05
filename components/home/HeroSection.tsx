import Link from 'next/link';
import { Button, SearchBar } from '@/components/ui';

const TRENDING_CATEGORIES = [
  { label: 'AI',               href: '/search?q=ai' },
  { label: 'IoT',              href: '/search?q=iot' },
  { label: 'Semiconductor',    href: '/search?q=semiconductor' },
  { label: 'Healthcare',       href: '/search?q=healthcare' },
  { label: 'Biotechnology',    href: '/search?q=biotechnology' },
  { label: 'Solar',            href: '/search?q=solar' },
  { label: 'Electric Vehicle', href: '/search?q=electric+vehicle' },
  { label: 'Packaging',        href: '/search?q=packaging' },
  { label: 'Energy',           href: '/search?q=energy' },
  { label: 'Agriculture',      href: '/search?q=agriculture' },
  { label: 'Robotics',         href: '/search?q=robotics' },
  { label: 'Cybersecurity',    href: '/search?q=cybersecurity' },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#060d1e',
        marginTop: 'calc(-1 * var(--sticky-header-height, 96px))',
      }}
    >

      {/* ── Video background ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <video
          src="/assets/report-assets/DARKBL_1.MP4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle dark overlay to keep text legible over the video */}
        <div className="absolute inset-0" style={{ background: 'rgba(4,8,18,0.45)' }} />
      </div>

      {/* ── Hero content ───────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-14 pt-28 pb-12 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-20">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">

          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/8 text-white/75 text-sm font-body font-medium backdrop-blur-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2CC8D8] opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2CC8D8]" />
            </span>
            Trusted by 500+ Fortune 500 Companies
          </span>

          {/* Headline */}
          <h1
            className="font-display font-bold leading-[1.06]"
            style={{ letterSpacing: '-0.03em', color: '#f0f6ff' }}
          >
            <span className="block text-5xl md:text-6xl xl:text-[5rem]">Trusted Market</span>
            <span className="block text-5xl md:text-6xl xl:text-[5rem] text-[#2CC8D8]">Intelligence</span>
          </h1>

          {/* Subtext */}
          <p className="font-body text-lg md:text-xl max-w-2xl leading-relaxed text-white">
            Reliable research and clear insights to help businesses understand markets, reduce risks,
            and make smarter growth decisions.
          </p>

          {/* Search */}
          <div className="w-full max-w-2xl flex flex-col items-center gap-4">
            <SearchBar
              variant="hero"
              placeholder="Search Market Reports, Forecasts & Statistics"
              className="w-full"
            />

            {/* Trending category chips */}
            <div className="flex flex-wrap justify-center gap-2.5">
              <span className="self-center text-sm font-body mr-1 shrink-0" style={{ color: 'rgba(180,205,240,0.55)' }}>
                Trending:
              </span>
              {TRENDING_CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="
                    inline-flex items-center px-4 py-1.5 rounded-full
                    text-sm font-body font-medium
                    border border-white/15 bg-white/8
                    text-white/65
                    hover:border-[#2CC8D8]/60 hover:text-[#2CC8D8] hover:bg-[#2CC8D8]/10
                    backdrop-blur-sm shadow-sm
                    transition-all duration-150
                  "
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/industry">
              <Button
                size="lg"
                className="bg-[#ec652b] hover:bg-[#d4571f] border-0 text-white shadow-lg shadow-[#ec652b]/30 hover:shadow-[#ec652b]/50 hover:-translate-y-0.5 transition-all duration-200 font-display tracking-tight"
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
                className="border-white/20 text-white/85 hover:bg-white/10 hover:border-white/35 hover:-translate-y-0.5 transition-all duration-200 font-display tracking-tight backdrop-blur-sm"
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
