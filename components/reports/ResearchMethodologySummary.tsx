import Link from "next/link";
import {
  Database,
  Map,
  ClipboardCheck,
  SlidersHorizontal,
  RefreshCw,
  Scale,
} from "lucide-react";

const tocParts = [
  {
    part: "Part I",
    title: "Source Management & Input Data Standards",
    desc: "Who provides data, how sources are qualified, and what types of evidence are admissible.",
    Icon: Database,
    accent: "#2563eb",
    href: "/research-methodology#part-1",
  },
  {
    part: "Part II",
    title: "Research Scope & Market Coverage",
    desc: "How we define the markets we assess and the parameters that govern each product.",
    Icon: Map,
    accent: "#0891b2",
    href: "/research-methodology#part-2",
  },
  {
    part: "Part III",
    title: "Data Collection, Verification & Submission",
    desc: "The mechanics of gathering, cross-checking, and hierarchically ranking evidence.",
    Icon: ClipboardCheck,
    accent: "#059669",
    href: "/research-methodology#part-3",
  },
  {
    part: "Part IV",
    title: "Assessment Determination & Quality Controls",
    desc: "How raw data becomes a published assessment — normalisation, expert judgement, and outlier exclusion.",
    Icon: SlidersHorizontal,
    accent: "#7c3aed",
    href: "/research-methodology#part-4",
  },
  {
    part: "Part V",
    title: "Publication, Corrections & Revision",
    desc: "Our publication schedule, corrections policy, and methodology review cycle.",
    Icon: RefreshCw,
    accent: "#d97706",
    href: "/research-methodology#part-5",
  },
  {
    part: "Part VI",
    title: "Independence, Ethics & Complaints",
    desc: "Conflict-of-interest policies, editorial independence, and how clients raise concerns.",
    Icon: Scale,
    accent: "#dc2626",
    href: "/research-methodology#part-6",
  },
];

export default function ResearchMethodologySummary() {
  return (
    <section id="research-methodology" className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-[var(--teal-deep)] mb-3">
        Research Methodology
      </h2>
      <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
        This Research Methodology document governs all market intelligence outputs produced
        by Globe Market Research. It establishes the standards, processes, verification
        protocols, and quality controls that underpin every assessment, forecast, and
        analysis we publish — whether for global biofuels, smartphones, semiconductors,
        energy transition materials, or any other market sector covered by our practice.
      </p>
      <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
        We publish this methodology openly because transparency is the foundation of trust.
        In an era when AI-generated content is widespread, clients deserve to know exactly
        how intelligence is gathered, who gathers it, how data is ranked and normalised, and
        what checks exist before any figure or trend is committed to a published output. This
        document is reviewed and updated at least annually.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <span className="hidden sm:block flex-1 h-px" style={{ background: "var(--border)" }} />
        <span
          className="text-xs font-semibold tracking-[0.22em] uppercase text-center"
          style={{ color: "var(--muted-foreground)" }}
        >
          How This Methodology Is Organised
        </span>
        <span className="hidden sm:block flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tocParts.map(({ part, title, desc, Icon, accent, href }) => (
          <Link
            key={part}
            href={href}
            className="rounded-2xl border p-6 flex flex-col gap-3 bg-[var(--card)] hover:shadow-md transition-shadow"
            style={{ borderColor: `color-mix(in srgb, ${accent} 25%, #e5e7eb)` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `color-mix(in srgb, ${accent} 10%, #f8faff)`,
                  border: `1px solid color-mix(in srgb, ${accent} 20%, #e5e7eb)`,
                }}
              >
                <Icon size={22} strokeWidth={1.75} style={{ color: accent }} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: accent }}>
                  {part}
                </p>
                <h3 className="font-semibold text-base text-[var(--foreground)]">{title}</h3>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
