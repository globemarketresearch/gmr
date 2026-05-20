import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Container, Grid, Card, CardContent, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Globe Market Research | Global Market Intelligence & Consulting",
  description: "Globe Market Research is a global market intelligence and consulting company focused on delivering reliable industry insights, strategic analysis, and data-driven business solutions.",
  keywords: ["about Globe Market Research", "market research company", "market intelligence", "business consulting", "industry research"],
  alternates: {
    canonical: '/about',
  },
};

const coreValues = [
  {
    title: "Research with Integrity",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "blue",
  },
  {
    title: "Client-First Approach",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "purple",
  },
  {
    title: "Insights Built for Action",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "orange",
  },
  {
    title: "Fast Thinking, Accurate Output",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "green",
  },
  {
    title: "Regional Relevance",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "teal",
  },
  {
    title: "Future-Ready Research",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "indigo",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
  green: "bg-emerald-50 text-emerald-600 border-emerald-100",
  teal: "bg-teal-50 text-teal-600 border-teal-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
};

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

const stats = [
  { value: "5,000+", label: "Reports Published" },
  { value: "50+", label: "Industries Covered" },
  { value: "80+", label: "Countries Served" },
  { value: "10+", label: "Years of Expertise" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-center overflow-hidden bg-[#040d1f]">
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

        <Container size="lg" className="py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm font-semibold tracking-widest uppercase text-blue-400">
              About Globe Market Research
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Decisions That Elevate
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              A global market intelligence and consulting company focused on delivering reliable industry insights, strategic analysis, and data-driven business solutions.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100">
        <Container size="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <div className="text-3xl font-bold text-[var(--primary)]">{s.value}</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Our Comprehensive Solutions */}
      <Section padding="xl" className="bg-white">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">Our Comprehensive Solutions</h2>
            <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              We offer both Syndicated Reports and Custom Research across the following industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-14">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Syndicated Reports</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Pre-built, in-depth research reports covering market size, competitive landscape, investment trends, and growth forecasts across 50+ industries — ready for immediate access.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Custom Research</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Tailored intelligence built around your specific business questions. Our analysts design bespoke research frameworks using primary interviews, trend analysis, and validation processes.
                </p>
              </div>
            </div>
          </div>

          {/* Industries grid */}
          <div className="flex flex-wrap gap-3 justify-center">
            {industries.map((ind) => (
              <span
                key={ind}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-[var(--foreground)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                {ind}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who We Are */}
      <Section padding="xl" background="muted">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-5">
              <p className="text-sm font-semibold tracking-widest uppercase text-[var(--primary)]">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                A Team Built for Intelligence
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-lg">
                Globe Market Research is a team of analysts, consultants, data specialists, and industry experts committed to delivering high-quality market intelligence solutions. Our organization works with businesses of all sizes — startups, enterprises, consulting firms, and investment groups.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Our expertise covers both syndicated and customized research solutions. We analyze industry trends, market demand, technological developments, regulatory changes, consumer preferences, and competitive movements to provide meaningful insights that help clients strengthen their market position.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Every report is developed through detailed secondary research, primary interviews, trend analysis, and validation processes to ensure accuracy and business relevance.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/assets/other/Diverse_group_of_business_professionals_202605080342.jpeg"
                alt="Globe Market Research team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section padding="xl" className="bg-white">
        <Container size="xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--primary)] mb-3">What Guides Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">The Values That Drive Us</h2>
          </div>

          <Grid cols={3} gap="lg">
            {coreValues.map((val) => (
              <div
                key={val.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-md transition-shadow group"
              >
                <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-4 ${colorMap[val.color]}`}>
                  {val.icon}
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{val.title}</h3>
                <div className="w-8 h-0.5 bg-[var(--primary)] rounded-full group-hover:w-12 transition-all duration-300" />
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Mission & Vision — dark section */}
      <section className="bg-[#0f172a] text-white">
        <Container size="xl" className="py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium text-blue-300">Our Mission</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Empowering Confident Decisions</h3>
              <p className="text-white/70 leading-relaxed">
                Our mission is to empower organizations with reliable market intelligence, accurate data analysis, and actionable business insights that support confident decision-making. We aim to help businesses understand market shifts, identify growth opportunities, and develop sustainable strategies through comprehensive research solutions.
              </p>
              <p className="text-white/70 leading-relaxed">
                We are committed to maintaining high standards of research quality, transparency, and analytical accuracy in every project we undertake — delivering practical insights that help clients improve operational performance and achieve long-term business success.
              </p>
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-medium text-purple-300">Our Vision</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">A Trusted Global Partner</h3>
              <p className="text-white/70 leading-relaxed">
                Our vision is to become a trusted global partner in market intelligence and business consulting by delivering dependable, innovative, and industry-focused research solutions. We aim to support organizations worldwide with insights that improve strategic planning, investment decisions, and competitive positioning.
              </p>
              <p className="text-white/70 leading-relaxed">
                We envision building a research ecosystem that combines advanced analytics, industry expertise, and global market understanding to create long-term value for our clients as industries continue to evolve through digital transformation and technological innovation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Expertise */}
      <Section padding="xl" background="muted">
        <Container size="lg">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--primary)] mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
              Our Expertise That Makes Us Your Ideal Partner
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced Research Framework",
                desc: "Every report combines secondary research, primary interviews, trend analysis, and rigorous validation processes to ensure accuracy and business relevance.",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
              },
              {
                title: "Global Market Coverage",
                desc: "Our research spans 80+ countries and 50+ industries, delivering insights relevant to regional dynamics, local regulations, and global market movements.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Actionable Intelligence",
                desc: "We believe modern businesses need more than statistics — they need clear interpretation, practical recommendations, and industry-specific insights for strategic planning.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
            ].map((item) => (
              <Card key={item.title} className="overflow-hidden">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-5">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founder's Message */}
      <Section padding="xl" className="bg-white">
        <Container size="md">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] p-10 md:p-14">
            <div className="absolute top-8 left-10 text-blue-400/20">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="currentColor">
                <path d="M0 60V36C0 18 10 6 30 0l6 10C20 14 14 22 14 34h16V60H0zm44 0V36C44 18 54 6 74 0l6 10C64 14 58 22 58 34h16V60H44z" />
              </svg>
            </div>
            <div className="relative z-10 text-center space-y-6">
              <p className="text-sm font-semibold tracking-widest uppercase text-blue-300">Founder&apos;s Message</p>
              <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
                &ldquo;At Globe Market Research, we believe that quality research is the foundation of strong business decisions. Markets are evolving rapidly due to technological advancements, changing customer expectations, and global economic developments. Our goal is to provide research solutions that help organizations understand market realities, reduce business uncertainty, and identify meaningful growth opportunities.&rdquo;
              </blockquote>
              <div className="pt-2">
                <div className="w-12 h-0.5 bg-blue-400 mx-auto mb-4" />
                <p className="text-white/60 text-sm">Founder, Globe Market Research</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section className="bg-[var(--primary)] py-16">
        <Container size="md">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Connect With Us</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Ready to access the intelligence your business needs to grow? Explore our reports or get in touch with our research team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/reports">
                <Button variant="secondary" size="lg" className="bg-white text-[var(--primary)] hover:bg-gray-50">
                  Browse Reports
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="border border-white/40 bg-white/10 text-white hover:bg-white/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
