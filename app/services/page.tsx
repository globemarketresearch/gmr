import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/api/services";
import { Service } from "@/lib/api/services.types";

export const metadata: Metadata = {
  title: "Research & Consulting Services | Globe Market Research",
  description:
    "From syndicated market reports to custom research and strategy consulting — Globe Market Research delivers the intelligence you need to grow, compete, and win.",
  keywords: [
    "market research services",
    "custom market research",
    "competitive analysis",
    "go to market strategy",
    "business strategy consulting",
    "syndicated reports",
    "white space analysis",
  ],
  alternates: { canonical: "/services" },
};

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Market Intelligence": { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500" },
  "Custom Research":    { bg: "bg-violet-50",  text: "text-violet-700", dot: "bg-violet-500" },
  "Strategy":           { bg: "bg-emerald-50", text: "text-emerald-700",dot: "bg-emerald-500" },
  "Consulting":         { bg: "bg-orange-50",  text: "text-orange-700", dot: "bg-orange-500" },
  "Analytics":          { bg: "bg-cyan-50",    text: "text-cyan-700",   dot: "bg-cyan-500" },
  "Intelligence":       { bg: "bg-rose-50",    text: "text-rose-700",   dot: "bg-rose-500" },
  "Advisory":           { bg: "bg-amber-50",   text: "text-amber-700",  dot: "bg-amber-500" },
};

const accentColors: string[] = [
  "#2563eb", "#7c3aed", "#059669", "#ea580c", "#0891b2", "#e11d48", "#d97706",
];

function ServiceIcon({ name, color }: { name: string; color: string }) {
  const cls = `w-6 h-6`;
  const icons: Record<string, React.ReactNode> = {
    "chart-bar": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    "adjustments": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    "rocket": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.818m2.88 7.84m-1.244-5.28a6 6 0 01-.836-3.16" />
      </svg>
    ),
    "briefcase": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    "search-circle": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "eye": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    "users": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };
  return (
    <span style={{ color }} className="flex items-center justify-center">
      {icons[name] ?? icons["briefcase"]}
    </span>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const color = accentColors[index % accentColors.length];
  const catStyle = categoryColors[service.category] ?? categoryColors["Advisory"];

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#e8edf2] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Accent bar */}
      <div className="h-1 w-full" style={{ background: color }} />

      <div className="flex flex-col flex-1 p-7">
        {/* Icon + category */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${color}15` }}
          >
            <ServiceIcon name={service.icon} color={color} />
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${catStyle.bg} ${catStyle.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
            {service.category}
          </span>
        </div>

        {/* Title & tagline */}
        <h3 className="text-xl font-bold text-[#0f2236] mb-1 group-hover:text-[#1a5fcc] transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-[13px] font-medium mb-3" style={{ color }}>
          {service.tagline}
        </p>
        <p className="text-[14px] text-[#5a6a7a] leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-2 mb-6 flex-1">
          {service.servicesInclude.slice(0, 5).map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[13px] text-[#4a5a6a]">{item}</span>
            </li>
          ))}
          {service.servicesInclude.length > 5 && (
            <li className="text-[12px] font-medium pl-6.5" style={{ color }}>
              +{service.servicesInclude.length - 5} more capabilities
            </li>
          )}
        </ul>

        {/* CTA */}
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-[13px] font-semibold transition-all duration-200 group/link mt-auto"
          style={{ color }}
        >
          Explore Solution
          <svg
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #071828 0%, #0b2340 50%, #0a1e30 100%)",
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full opacity-10 blur-[80px]" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
        <div className="absolute bottom-[-60px] left-[10%] w-[300px] h-[300px] rounded-full opacity-10 blur-[60px]" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-sky-400/80 tracking-[0.12em] uppercase mb-6 px-3 py-1.5 rounded-full border border-sky-400/20 bg-sky-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Globe Market Research
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Research &amp; Consulting{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #a78bfa)" }}>
                Services
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mb-10">
              From ready-to-use syndicated reports to high-stakes custom research and strategic advisory — we deliver the market intelligence that powers confident decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", boxShadow: "0 8px 24px rgba(37,99,235,0.4)" }}
              >
                Speak to an Analyst
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/reports"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white/70 border border-white/15 hover:bg-white/8 hover:text-white transition-all duration-200"
              >
                Browse Reports
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 pt-10 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,500+", label: "Research Reports" },
              { value: "50+",    label: "Industry Verticals" },
              { value: "1,000+", label: "Global Clients" },
              { value: "10+",    label: "Years of Expertise" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-white">{value}</div>
                <div className="text-[13px] text-white/40 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[12px] font-bold text-blue-600 tracking-[0.14em] uppercase mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2236] mb-4">
              Our Core Service Offerings
            </h2>
            <p className="text-[16px] text-[#5a6a7a] max-w-2xl mx-auto">
              Seven integrated service lines — each delivering specialized intelligence, strategy, or advisory to help you outperform in your market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.slice(0, 6).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          {/* 7th card — full width accent */}
          {services[6] && (
            <div className="mt-7">
              <div
                className="group relative rounded-2xl overflow-hidden border border-[#e8edf2] shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #0f2236 0%, #1a3a58 100%)" }}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 p-8 lg:p-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.15)" }}>
                    <ServiceIcon name={services[6].icon} color="#f59e0b" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-semibold text-amber-400/80 tracking-[0.1em] uppercase">{services[6].category}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-[13px] font-semibold text-amber-400">{services[6].tagline}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{services[6].title}</h3>
                    <p className="text-[14px] text-white/55 leading-relaxed max-w-2xl">{services[6].description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {services[6].servicesInclude.slice(0, 4).map((item) => (
                        <span key={item} className="text-[12px] text-white/50 bg-white/8 px-3 py-1 rounded-full border border-white/10">
                          {item}
                        </span>
                      ))}
                      <span className="text-[12px] text-amber-400/70 px-3 py-1">
                        +{services[6].servicesInclude.length - 4} more
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/services/${services[6].slug}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 transition-all duration-200"
                  >
                    Explore Solution
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[12px] font-bold text-blue-600 tracking-[0.14em] uppercase mb-3">Our Approach</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f2236] mb-4">How We Deliver Insights</h2>
            <p className="text-[16px] text-[#5a6a7a] max-w-xl mx-auto">
              A proven four-step process that turns raw data into strategic clarity.
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-[40px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-blue-200 via-violet-200 to-emerald-200" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Scoping & Discovery",
                  desc: "We start with a structured brief to crystallize your research objectives, audience, and required outputs.",
                  color: "#2563eb",
                },
                {
                  step: "02",
                  title: "Data Collection",
                  desc: "Primary interviews, surveys, and proprietary databases are activated in parallel to maximize data breadth and speed.",
                  color: "#7c3aed",
                },
                {
                  step: "03",
                  title: "Analysis & Validation",
                  desc: "Multi-layer expert analysis and senior peer review ensure accuracy, strategic relevance, and zero noise.",
                  color: "#059669",
                },
                {
                  step: "04",
                  title: "Delivery & Support",
                  desc: "Tailored deliverables in your preferred format, with analyst Q&A and post-delivery support included.",
                  color: "#d97706",
                },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="relative text-center">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 font-extrabold text-2xl text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 8px 24px ${color}30` }}
                  >
                    {step}
                  </div>
                  <h3 className="text-[16px] font-bold text-[#0f2236] mb-2">{title}</h3>
                  <p className="text-[13px] text-[#5a6a7a] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications / Trust bar ── */}
      <section className="py-10 bg-[#f8fafc] border-y border-[#e8edf2]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-10 text-center">
            {[
              { label: "ISO 9001 Certified", icon: "🏅" },
              { label: "GDPR Compliant",     icon: "🔒" },
              { label: "ESOMAR Member",      icon: "🌐" },
              { label: "ISO 27001 Secure",   icon: "🛡️" },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2.5 text-[13px] font-semibold text-[#4a5a6a]">
                <span className="text-xl">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #071828 0%, #0b2340 100%)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Start Your Research Project?
          </h2>
          <p className="text-[16px] text-white/55 max-w-xl mx-auto mb-10">
            Whether you need a single report or a full research partnership, our team is ready to scope your project today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", boxShadow: "0 8px 24px rgba(37,99,235,0.4)" }}
            >
              Contact Our Team
            </Link>
            <Link
              href="/request-analyst-meeting"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-semibold text-white/70 border border-white/15 hover:bg-white/8 hover:text-white transition-all duration-200"
            >
              Schedule a Meeting
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
