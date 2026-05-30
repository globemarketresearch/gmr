import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Globe Market Research | Global Market Intelligence & Consulting",
  description:
    "Globe Market Research is a global market intelligence and consulting company focused on delivering reliable industry insights, strategic analysis, and data-driven business solutions.",
  keywords: [
    "about Globe Market Research",
    "market research company",
    "market intelligence",
    "business consulting",
    "industry research",
  ],
  alternates: { canonical: "/about" },
};

/* ─── data ────────────────────────────────────────────────────────────────── */

const stats = [
  { value: "2,500+", label: "Reports Published" },
  { value: "150+",   label: "Market Consulting" },
  { value: "500+",   label: "Satisfied Customers" },
  { value: "45+",    label: "Industries Covered" },
];

const differentiators = [
  "Precision market insights grounded in multi-source data",
  "Forward-looking trend forecasting across key verticals",
  "Fully customized research solutions for your business goals",
  "End-to-end analytics from raw data to strategic narrative",
  "Global expertise spanning 80+ countries and 50+ industries",
];

const services = [
  {
    title: "Syndicated Reports",
    description:
      "Pre-built, in-depth research covering market size, competitive landscape, investment trends, and growth forecasts across 50+ industries — ready for immediate access.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "blue",
  },
  {
    title: "Custom Research",
    description:
      "Tailored intelligence built around your specific business questions. Our analysts design bespoke frameworks using primary interviews, trend analysis, and validation processes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    color: "purple",
  },
  {
    title: "Market Consulting",
    description:
      "Strategic consulting engagements where our senior analysts work directly with your team to interpret data, validate hypotheses, and co-develop market entry or expansion plans.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "teal",
  },
  {
    title: "Competitive Intelligence",
    description:
      "Deep-dive assessments of competitor positioning, pricing strategies, product portfolios, and go-to-market approaches to help you stay one step ahead.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "orange",
  },
  {
    title: "Sector Forecasting",
    description:
      "Quantitative and qualitative demand projections to support long-range planning, investment decisions, and product roadmap development across rapidly evolving sectors.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    color: "indigo",
  },
  {
    title: "Due Diligence Support",
    description:
      "Independent market validation for M&A, investment, and partnership decisions. We provide third-party perspective on addressable market size, growth drivers, and risk factors.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "green",
  },
];

const serviceColorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue:   { bg: "bg-blue-50",   icon: "text-blue-600",   border: "border-blue-100" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-100" },
  teal:   { bg: "bg-teal-50",   icon: "text-teal-600",   border: "border-teal-100" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-100" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-100" },
  green:  { bg: "bg-emerald-50",icon: "text-emerald-600",border: "border-emerald-100" },
};

const testimonials = [
  {
    name: "Sarah Mitchell",
    title: "VP of Strategy",
    company: "Vertex Dynamics",
    initials: "SM",
    color: "bg-blue-600",
    quote:
      "GMR's custom research gave us clarity on a $1.2B market segment we were unsure about. The insights directly influenced our product roadmap for the next three years.",
  },
  {
    name: "Raj Patel",
    title: "Head of Corporate Development",
    company: "InnovateCorp",
    initials: "RP",
    color: "bg-indigo-600",
    quote:
      "The depth of competitive intelligence we received was unmatched. It helped us identify a gap that we've since turned into a $40M annual revenue line.",
  },
  {
    name: "Laura Chen",
    title: "Director of Market Expansion",
    company: "Orion Global",
    initials: "LC",
    color: "bg-emerald-600",
    quote:
      "We've worked with several research firms. GMR stands out for their turnaround speed, analytical depth, and genuine commitment to understanding our business context.",
  },
  {
    name: "Marcus Weber",
    title: "Managing Director",
    company: "Stratos Capital",
    initials: "MW",
    color: "bg-orange-600",
    quote:
      "Their due diligence support during our Series C evaluation was thorough and unbiased. The sector forecasting saved us from a costly miscalculation.",
  },
];

const industries = [
  "Healthcare & Life Sciences",
  "Information Technology",
  "Consumer Goods & Retail",
  "Energy & Utilities",
  "Manufacturing",
  "Agriculture",
  "Aerospace & Defense",
  "Automotive",
  "Food & Beverages",
  "Chemicals",
  "Packaging",
  "Financial Services",
];

const processSteps = [
  {
    step: "01",
    title: "Define Objectives",
    desc: "We align on your business question, scope, and success criteria before research begins.",
  },
  {
    step: "02",
    title: "Data Collection",
    desc: "Multi-source secondary research combined with targeted primary interviews and surveys.",
  },
  {
    step: "03",
    title: "Analysis & Validation",
    desc: "Rigorous cross-validation of findings against industry benchmarks and expert perspectives.",
  },
  {
    step: "04",
    title: "Strategic Delivery",
    desc: "Insights delivered in actionable formats — reports, dashboards, or live briefings.",
  },
];

/* ─── component ──────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden bg-[#040d1f]">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/other/Abstract_digital_globe_with_flowing_202605080343.jpeg"
            alt=""
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040d1f]/60 via-[#040d1f]/50 to-[#040d1f]" />
        </div>

        <Container size="lg" className="py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-blue-400">
              <span className="w-8 h-px bg-blue-400" />
              About Globe Market Research
              <span className="w-8 h-px bg-blue-400" />
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15]">
              See Beyond Data.<br />
              <span className="text-blue-400">Make Decisions That Matter.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              A global market intelligence and consulting company delivering reliable industry insights,
              strategic analysis, and data-driven solutions that drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link href="/reports">
                <Button size="lg" className="bg-[var(--primary)] text-white hover:bg-blue-700 font-semibold">
                  Browse Our Reports
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="border border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <Container size="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s) => (
              <div key={s.label} className="py-8 px-6 text-center group">
                <div className="flex items-baseline justify-center gap-0.5">
                  <AnimatedCounter
                    value={s.value}
                    className="text-3xl font-bold text-[var(--primary)]"
                  />
                </div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── The Core Values Behind GMR ── */}
      <section className="bg-white py-16 md:py-20">
        <Container size="lg">
          {/* Decorated heading */}
          <div className="flex items-center gap-5 mb-12">
            <span className="flex-1 h-px bg-gray-200" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center whitespace-nowrap">
              The Core Values Behind{" "}
              <span className="text-[#E07B00]">GMR</span>
            </h2>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* G · M · R cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* G — Global Reach */}
            <div className="group rounded-2xl border border-gray-100 bg-white hover:border-[#1E3A6E]/30 hover:shadow-lg transition-all duration-300 p-10 flex flex-col items-center gap-5">
              <Image src="/assets/other/gmr_g.png" alt="G" width={96} height={96} className="object-contain" />
              <div className="text-center space-y-1">
                <p className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-gray-500">
                  Global Reach
                </p>
                <p className="text-[0.68rem] tracking-widest uppercase text-gray-400">
                  — What Shapes Us?
                </p>
              </div>
              <p className="text-sm text-center text-[var(--muted-foreground)] leading-relaxed">
                Our research spans 80+ countries, capturing regional dynamics, local market regulations,
                and global macro trends that shape industry trajectories.
              </p>
            </div>

            {/* M — Market Intelligence */}
            <div className="group rounded-2xl border border-gray-100 bg-white hover:border-[#00C2F0]/30 hover:shadow-lg transition-all duration-300 p-10 flex flex-col items-center gap-5">
              <Image src="/assets/other/gmr_m.png" alt="M" width={96} height={96} className="object-contain" />
              <div className="text-center space-y-1">
                <p className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-gray-500">
                  Market Intelligence
                </p>
                <p className="text-[0.68rem] tracking-widest uppercase text-gray-400">
                  — How We Work?
                </p>
              </div>
              <p className="text-sm text-center text-[var(--muted-foreground)] leading-relaxed">
                We synthesize quantitative data with qualitative insight — primary interviews, expert panels,
                and competitive mapping — to produce intelligence you can act on.
              </p>
            </div>

            {/* R — Research Precision */}
            <div className="group rounded-2xl border border-gray-100 bg-white hover:border-[#1E3A6E]/30 hover:shadow-lg transition-all duration-300 p-10 flex flex-col items-center gap-5">
              <Image src="/assets/other/gmr_r.png" alt="R" width={96} height={96} className="object-contain" />
              <div className="text-center space-y-1">
                <p className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-gray-500">
                  Research Precision
                </p>
                <p className="text-[0.68rem] tracking-widest uppercase text-gray-400">
                  — What We Promise?
                </p>
              </div>
              <p className="text-sm text-center text-[var(--muted-foreground)] leading-relaxed">
                Every deliverable undergoes rigorous multi-layer validation — cross-checking sources,
                expert review, and analytical triangulation to ensure accuracy you can stake decisions on.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Who We Are ── */}
      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)]">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight">
                A Team Built for Intelligence
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-[1.0625rem]">
                Globe Market Research is a team of analysts, consultants, data specialists, and industry
                experts committed to delivering high-quality market intelligence. We work with businesses
                of all sizes — startups, enterprises, consulting firms, and investment groups — across every
                major vertical.
              </p>

              <ul className="space-y-3 pt-1">
                {differentiators.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link href="/contact">
                  <Button className="bg-[var(--primary)] text-white hover:bg-blue-700 font-semibold">
                    Talk to Our Team
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/assets/other/Diverse_group_of_business_professionals_202605080342.jpeg"
                  alt="Globe Market Research team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-[var(--foreground)]">80+ Countries</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Global research coverage</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── What We Do ── */}
      <section className="bg-white py-16 md:py-24">
        <Container size="xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-3">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">What We Do</h2>
            <p className="mt-4 text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg">
              Comprehensive research and intelligence solutions tailored to the decisions your business needs to make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => {
              const c = serviceColorMap[svc.color];
              return (
                <div
                  key={svc.title}
                  className="rounded-2xl border border-gray-100 bg-white p-7 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.icon} border ${c.border} flex items-center justify-center mb-5`}>
                    {svc.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{svc.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="bg-gray-50 border-t border-gray-100 py-14">
        <Container size="lg">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-2">Coverage</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">Industries We Cover</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {industries.map((ind) => (
              <span
                key={ind}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-[var(--foreground)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-default"
              >
                {ind}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Mission & Vision (dark) ── */}
      <section className="bg-[#0a1628] text-white py-20 md:py-28">
        <Container size="xl">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-3">Our Purpose</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Mission, Vision & Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            {/* Mission */}
            <div className="bg-[#0a1628] p-8 md:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/20 mb-2">
                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-semibold text-blue-300 tracking-wide uppercase">Mission</span>
              </div>
              <h3 className="text-xl font-bold text-white">Empowering Confident Decisions</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Empower organizations with reliable market intelligence, accurate data analysis, and
                actionable insights that support confident decision-making. We help businesses understand
                market shifts, identify growth opportunities, and develop sustainable strategies.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#0a1628] p-8 md:p-10 space-y-4 border-l border-r border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/20 mb-2">
                <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs font-semibold text-purple-300 tracking-wide uppercase">Vision</span>
              </div>
              <h3 className="text-xl font-bold text-white">A Trusted Global Partner</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Become a trusted global partner in market intelligence by delivering dependable, innovative,
                and industry-focused research. We support organizations worldwide with insights that improve
                strategic planning, investment decisions, and competitive positioning.
              </p>
            </div>

            {/* Values */}
            <div className="bg-[#0a1628] p-8 md:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 mb-2">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Values</span>
              </div>
              <h3 className="text-xl font-bold text-white">Integrity-Led Research</h3>
              <ul className="space-y-2.5">
                {["Research with integrity", "Client-first approach", "Analytical rigor", "Transparent methodology", "Continuous innovation"].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-white/60 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Our Research Process ── */}
      <section className="bg-white py-16 md:py-24">
        <Container size="lg">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">Our Research Process</h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gray-200" />

            <div className="grid md:grid-cols-4 gap-8 relative">
              {processSteps.map((step, i) => (
                <div key={step.step} className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 border-2 border-[var(--primary)]/20 flex items-center justify-center z-10 relative bg-white">
                      <span className="text-xl font-bold text-[var(--primary)]">{step.step}</span>
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="md:hidden absolute top-1/2 -right-4 w-8 h-px bg-gray-200" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">{step.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-gray-50 border-t border-gray-100 py-16 md:py-24">
        <Container size="xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] mb-3">Client Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">What Our Clients Say</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-1 border-t border-gray-50">
                  <div className={`w-9 h-9 rounded-full ${t.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--foreground)]">{t.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{t.title}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Founder's Message ── */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <Container size="md">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#1e3a8a] p-10 md:p-16">
            {/* Decorative quote mark */}
            <div className="absolute top-6 left-8 text-blue-400/15 select-none pointer-events-none">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="currentColor">
                <path d="M0 60V36C0 18 10 6 30 0l6 10C20 14 14 22 14 34h16V60H0zm44 0V36C44 18 54 6 74 0l6 10C64 14 58 22 58 34h16V60H44z" />
              </svg>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-500/5 border border-blue-500/10" />
            <div className="absolute -bottom-8 right-16 w-32 h-32 rounded-full bg-blue-500/5 border border-blue-500/10" />

            <div className="relative z-10 text-center space-y-6">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-300">Founder&apos;s Message</p>
              <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
                &ldquo;At Globe Market Research, we believe that quality research is the foundation of strong
                business decisions. Markets are evolving rapidly due to technological advancements, changing
                customer expectations, and global economic developments. Our goal is to provide research
                solutions that help organizations understand market realities, reduce business uncertainty,
                and identify meaningful growth opportunities.&rdquo;
              </blockquote>
              <div className="pt-2">
                <div className="w-12 h-0.5 bg-blue-400 mx-auto mb-4" />
                <p className="text-white/50 text-sm font-medium">Founder, Globe Market Research</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--primary)] py-16 md:py-20">
        <Container size="md">
          <div className="text-center space-y-6">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-200">Get Started</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Partner With GMR</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Ready to access the intelligence your business needs to grow? Explore our reports or connect
              with our research team for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/reports">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[var(--primary)] hover:bg-gray-50 font-semibold shadow-lg"
                >
                  Browse Reports
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="border border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
