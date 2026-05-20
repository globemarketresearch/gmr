import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/lib/api/services";
import { Service } from "@/lib/api/services.types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: { absolute: `${service.title} | Globe Market Research` },
    description: service.description,
  };
}

const accentColors: Record<string, string> = {
  "Market Intelligence": "#2563eb",
  "Custom Research":    "#7c3aed",
  "Strategy":           "#059669",
  "Consulting":         "#ea580c",
  "Analytics":          "#0891b2",
  "Intelligence":       "#e11d48",
  "Advisory":           "#d97706",
};

function ServiceIcon({ name, size = 28 }: { name: string; size?: number }) {
  const s = `${size}px`;
  const icons: Record<string, React.ReactNode> = {
    "chart-bar": (
      <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    "adjustments": (
      <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    "rocket": (
      <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.818m2.88 7.84m-1.244-5.28a6 6 0 01-.836-3.16" />
      </svg>
    ),
    "briefcase": (
      <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    "search-circle": (
      <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "eye": (
      <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    "users": (
      <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };
  return <span>{icons[name] ?? icons["briefcase"]}</span>;
}

function RelatedServiceCard({ service, accent }: { service: Service; accent: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-start gap-4 p-5 rounded-xl border border-[#e8edf2] bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}18`, color: accent }}
      >
        <ServiceIcon name={service.icon} size={20} />
      </div>
      <div className="min-w-0">
        <h4 className="text-[13px] font-semibold text-[#0f2236] group-hover:text-blue-700 transition-colors leading-tight mb-1">
          {service.title}
        </h4>
        <p className="text-[12px] text-[#7a8a9a] line-clamp-2">{service.description}</p>
      </div>
    </Link>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const accent = accentColors[service.category] ?? "#2563eb";
  const allServices = getAllServices();
  const related = allServices.filter((s) => s.id !== service.id).slice(0, 4);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071828 0%, #0b2340 60%, #0a1e30 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-[-60px] right-[-60px] w-[380px] h-[380px] rounded-full blur-[80px]" style={{ background: `radial-gradient(circle, ${accent}40, transparent)`, opacity: 0.15 }} />

        <div className="relative max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-white/35 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/60">{service.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start gap-10">
            <div className="flex-1">
              {/* Category badge */}
              <div
                className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5 border"
                style={{ color: accent, background: `${accent}15`, borderColor: `${accent}30` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                {service.category}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl font-semibold mb-5" style={{ color: `${accent}cc` }}>
                {service.tagline}
              </p>
              <p className="text-[16px] text-white/55 leading-relaxed max-w-2xl mb-8">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: `0 8px 24px ${accent}40` }}
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/request-analyst-meeting"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white/65 border border-white/15 hover:bg-white/8 hover:text-white transition-all duration-200"
                >
                  Schedule a Meeting
                </Link>
              </div>
            </div>

            {/* Icon card */}
            <div
              className="flex-shrink-0 w-full lg:w-64 rounded-2xl border p-8 flex flex-col items-center text-center gap-4"
              style={{ borderColor: `${accent}30`, background: `${accent}0d` }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: `${accent}20`, color: accent }}
              >
                <ServiceIcon name={service.icon} size={36} />
              </div>
              <div>
                <div className="text-[22px] font-extrabold text-white">Expert-Led</div>
                <div className="text-[12px] text-white/40 mt-1">{service.category} Service</div>
              </div>
              <div className="w-full h-px bg-white/8" />
              <Link
                href="/services"
                className="text-[12px] font-semibold text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Overview */}
              <div className="bg-white rounded-2xl border border-[#e8edf2] shadow-sm p-8 mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                  <h2 className="text-xl font-bold text-[#0f2236]">Service Overview</h2>
                </div>
                <p className="text-[15px] text-[#4a5a6a] leading-relaxed">{service.overview}</p>
              </div>

              {/* Key Highlights */}
              <div className="bg-white rounded-2xl border border-[#e8edf2] shadow-sm p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                  <h2 className="text-xl font-bold text-[#0f2236]">Key Highlights</h2>
                </div>
                <div className="space-y-5">
                  {service.keyHighlights.map((highlight, i) => (
                    <div key={i} className="flex gap-4">
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
                        style={{ background: accent }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-[14px] text-[#4a5a6a] leading-relaxed pt-1">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-2xl border border-[#e8edf2] shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                  <h2 className="text-xl font-bold text-[#0f2236]">What&apos;s Included</h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.servicesInclude.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ color: accent }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[14px] text-[#4a5a6a]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
              {/* Benefits */}
              <div className="bg-white rounded-2xl border border-[#e8edf2] shadow-sm p-6">
                <h3 className="text-[15px] font-bold text-[#0f2236] mb-4">Why Choose GMR</h3>
                <div className="space-y-4">
                  {service.benefits.map((b) => (
                    <div key={b.title} className="flex gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold"
                        style={{ background: accent }}
                      >
                        ✓
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#1a2b3c]">{b.title}</div>
                        <div className="text-[12px] text-[#7a8a9a] mt-0.5">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-white text-center"
                style={{ background: `linear-gradient(135deg, #071828, #0b2340)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `${accent}25`, color: accent }}
                >
                  <ServiceIcon name={service.icon} size={22} />
                </div>
                <h3 className="text-[16px] font-bold mb-2">Ready to Begin?</h3>
                <p className="text-[12px] text-white/50 mb-5 leading-relaxed">
                  Speak with a domain expert and get a scoped proposal within 24 hours.
                </p>
                <Link
                  href="/contact"
                  className="block w-full py-2.5 text-[13px] font-semibold text-white rounded-xl transition-all duration-200 hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}
                >
                  Contact Us
                </Link>
                <Link
                  href="/request-analyst-meeting"
                  className="block w-full mt-2.5 py-2.5 text-[12px] font-medium text-white/50 border border-white/12 rounded-xl hover:bg-white/8 hover:text-white/80 transition-all duration-200"
                >
                  Schedule Meeting
                </Link>
              </div>

              {/* Related services */}
              <div className="bg-white rounded-2xl border border-[#e8edf2] shadow-sm p-6">
                <h3 className="text-[15px] font-bold text-[#0f2236] mb-4">Related Services</h3>
                <div className="space-y-3">
                  {related.map((s) => (
                    <RelatedServiceCard
                      key={s.id}
                      service={s}
                      accent={accentColors[s.category] ?? "#2563eb"}
                    />
                  ))}
                </div>
                <Link
                  href="/services"
                  className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
                  style={{ color: accent }}
                >
                  View all services
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #071828 0%, #0b2340 100%)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Partner with Globe Market Research
          </h2>
          <p className="text-[15px] text-white/50 max-w-xl mx-auto mb-8">
            Our experts are ready to scope your {service.title.toLowerCase()} engagement and deliver results fast.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, boxShadow: `0 8px 24px ${accent}40` }}
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-semibold text-white/65 border border-white/15 hover:bg-white/8 hover:text-white transition-all duration-200"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
