import { Section, Container } from "@/components/ui";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Database,
  Map,
  ClipboardCheck,
  Scale,
  Layers,
  Factory,
  ShoppingCart,
  SlidersHorizontal,
  Brain,
  Filter,
  Gauge,
  BookOpenCheck,
  RefreshCw,
  Lock,
  Cpu,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research Methodology | Globe Market Research",
  description:
    "Learn how Globe Market Research collects, verifies, normalises, and publishes market intelligence — our source classification framework, data hierarchy, quality controls, and AI transparency policy.",
  alternates: { canonical: "/research-methodology" },
};

/* ─── data ────────────────────────────────────────────────────────────────── */

const tocParts = [
  {
    part: "Part I",
    title: "Source Management & Input Data Standards",
    desc: "Who provides data, how sources are qualified, and what types of evidence are admissible.",
    Icon: Database,
    accent: "#2563eb",
  },
  {
    part: "Part II",
    title: "Research Scope & Market Coverage",
    desc: "How we define the markets we assess and the parameters that govern each product.",
    Icon: Map,
    accent: "#0891b2",
  },
  {
    part: "Part III",
    title: "Data Collection, Verification & Submission",
    desc: "The mechanics of gathering, cross-checking, and hierarchically ranking evidence.",
    Icon: ClipboardCheck,
    accent: "#059669",
  },
  {
    part: "Part IV",
    title: "Assessment Determination & Quality Controls",
    desc: "How raw data becomes a published assessment — normalisation, expert judgement, and outlier exclusion.",
    Icon: SlidersHorizontal,
    accent: "#7c3aed",
  },
  {
    part: "Part V",
    title: "Publication, Corrections & Revision",
    desc: "Our publication schedule, corrections policy, and methodology review cycle.",
    Icon: RefreshCw,
    accent: "#d97706",
  },
  {
    part: "Part VI",
    title: "Independence, Ethics & Complaints",
    desc: "Conflict-of-interest policies, editorial independence, and how clients raise concerns.",
    Icon: Scale,
    accent: "#dc2626",
  },
];

const sourceTiers = [
  {
    tier: "T1",
    label: "Primary Direct",
    weight: "Highest evidentiary weight",
    accent: "#2563eb",
    desc:
      "Named, identifiable stakeholders with direct operational or financial exposure to the market under study. Includes C-level executives, BU heads, procurement directors, production managers, channel partners, distributors, OEM shipment controllers, regulatory compliance officers, and counterparties confirming executed transactions, shipment volumes, capacity utilization, pricing structures, contracts, or strategic decisions. May include audited internal records, invoices, shipment logs, signed contracts, production schedules, or regulatory filings.",
  },
  {
    tier: "T2",
    label: "Primary Corroborated",
    weight: "Requires independent corroboration",
    accent: "#0891b2",
    desc:
      "Market participants or ecosystem actors with indirect but verifiable knowledge of market activity. Includes brokers, consultants, logistics providers, system integrators, EPC contractors, retail channel managers, customs agents, patent attorneys, or financial intermediaries confirming market activity, deal structures, shipment flows, adoption trends, or contract frameworks. Requires corroboration from at least one independent source or dataset before inclusion in core estimates.",
  },
  {
    tier: "T3",
    label: "Institutional & Published",
    weight: "Institutionally credible, may lag market reality",
    accent: "#059669",
    desc:
      "Government statistics, trade association data, regulatory filings, annual reports, investor documents, peer-reviewed research, and verified exchange data. These sources carry institutional credibility but may lag market reality by days or weeks.",
  },
  {
    tier: "T4",
    label: "Supplementary & Indicative",
    weight: "Context only — never sets a figure alone",
    accent: "#d97706",
    desc:
      "Industry media, expert commentary, conference intelligence, and structured surveys. Used only to corroborate direction and context, never to set a price or market-size figure without higher-tier support.",
  },
];

const qualificationCriteria = [
  {
    title: "Relevance",
    desc:
      "The source must hold a current, active role with direct or indirect exposure to the market being assessed — typically a sales, procurement, trading, origination, or analytical function.",
  },
  {
    title: "Independence",
    desc:
      "The source must not have an undisclosed financial or personal interest that would systematically bias the data they provide.",
  },
  {
    title: "Accountability",
    desc:
      "Sources must be willing to provide their full name, company, and role to our research team, even if their individual identity is kept confidential in published materials.",
  },
  {
    title: "Track Record",
    desc:
      "For returning sources, we maintain a running record of data quality — timeliness, accuracy when independently verified, and internal consistency across submissions.",
  },
];

const admissibleData = [
  {
    title: "Verified operational and financial records",
    desc:
      "Audited or internally validated documents including production reports, shipment logs, sell-through data, procurement contracts, revenue disclosures, regulatory filings, capacity utilization reports, and executed commercial agreements. Records must specify value/volume, timing, specification, geography, and counterparties where permissible.",
  },
  {
    title: "Confirmed commercial signals",
    desc:
      "Named, firm bids, offers, purchase commitments, distribution agreements, announced capacity expansions, investment decisions, or product launch confirmations, with stated specifications, timing, and commercial terms. Must be attributable and open to verification.",
  },
  {
    title: "Corroborated market intelligence",
    desc:
      "Transaction confirmations from intermediaries, channel checks, structured executive interviews, ecosystem partner confirmations (logistics, EPCs, integrators), or multi-source industry verification. Inputs must be clearly described and independently cross-validated before influencing core estimates.",
  },
  {
    title: "Structured surveys and field research",
    desc:
      "Responses to standardized survey instruments, expert panels, or demand-side questionnaires where the sampling framework, respondent segmentation, weighting methodology, and collection period are documented and auditable.",
  },
  {
    title: "Published institutional and regulatory data",
    desc:
      "Appropriately cited and dated statistics from government agencies, customs authorities, central banks, regulatory bodies, stock exchanges, multilateral organizations, and recognized industry associations. Definitions and classification systems must align with the market scope under study.",
  },
];

const marketDefinitionDimensions = [
  {
    title: "Product / Service",
    desc:
      "The exact product, service, technology, or solution category being analysed. Where a market spans multiple models, grades, price bands, or technology variants, the base specification is explicitly stated and segmentation criteria are documented.",
  },
  {
    title: "Geographic Scope",
    desc:
      "The precise geographic coverage of the assessment — country, region, trade bloc, global aggregation, or specific trade corridor. For multinational markets, the base geography or reporting standard is defined.",
  },
  {
    title: "Unit of Measure",
    desc:
      "All market values and volumes are published in a single, unambiguous unit of measure (e.g., USD billion, million units, metric tons, installed capacity in GW). Conversion factors and standardisation rules are documented.",
  },
  {
    title: "Currency",
    desc:
      "The base currency for valuation is clearly stated. Where local-currency equivalents or constant-currency adjustments are used, the exchange-rate source, timing, and inflation adjustments are disclosed.",
  },
  {
    title: "Reporting Frequency",
    desc:
      "Annual, quarterly, monthly, or project-based reporting cycles are selected to match the natural data cadence and structural dynamics of the market, and reviewed periodically.",
  },
  {
    title: "Transaction & Commercial Structure",
    desc:
      "The dominant commercial model of the market — direct sales, distributor-led, subscription-based, OEM supply, tender-driven procurement, spot transactions, long-term contracts, exchange-traded, or hybrid — is defined.",
  },
  {
    title: "Technical & Performance Specifications",
    desc:
      "Minimum technical standards, regulatory certifications, performance benchmarks, or compliance requirements necessary for inclusion in the assessed market are specified, with segmentation rules for technology generations or quality bands.",
  },
  {
    title: "Market Participant Structure",
    desc:
      "Identification of whether the market is driven primarily by integrated manufacturers, fragmented SMEs, digital platforms, government procurement bodies, institutional buyers, or retail consumers.",
  },
];

const reportingFrequencies = [
  {
    title: "Weekly",
    accent: "#dc2626",
    desc:
      "Applied to markets characterized by rapid shifts in demand-supply balance, active spot transactions, policy volatility, or short inventory cycles — e.g., renewable energy credits, freight rates, fast-moving consumer electronics channels, short-cycle industrial inputs.",
  },
  {
    title: "Monthly",
    accent: "#2563eb",
    desc:
      "The most common cadence — appropriate for markets where production planning, procurement cycles, and commercial negotiations typically operate on a monthly basis, allowing sufficient primary data collection and model recalibration within a four-week window.",
  },
  {
    title: "Quarterly",
    accent: "#059669",
    desc:
      "Used for markets driven predominantly by medium- to long-term contracts, structured procurement cycles, capital project milestones, or enterprise budgeting frameworks, where structural indicators meaningfully influence outlooks.",
  },
  {
    title: "Annual",
    accent: "#7c3aed",
    desc:
      "Applied to markets where commercial terms, procurement benchmarks, or pricing agreements are typically established once per year — reflecting consolidated intelligence from producer-consumer negotiations, regulatory disclosures, and consensus industry settlement benchmarks.",
  },
];

const dataHierarchy = [
  "Verified operational and commercial records between independent parties — executed contracts, confirmed shipment or production data, audited revenue disclosures, regulatory filings, procurement records, and transaction-level data representing observable economic activity.",
  "Firm, attributable commercial commitments active within the reporting window — confirmed purchase orders, tender outcomes, distributor stocking decisions, capacity expansion announcements, strategic investment commitments, or published pricing schedules open to the market.",
  "Partially confirmed or indicative commercial signals — non-binding quotes, management guidance ranges, preliminary corporate announcements, channel checks, or structured market intelligence clearly identified as indicative and subject to verification.",
  "Structured survey responses from qualified participants — collected through documented research instruments with defined sampling frameworks, respondent segmentation, and transparent weighting protocols.",
  "Institutional and published datasets — government statistics, customs and trade data, regulatory disclosures, exchange datasets, multilateral agency publications, and industry association reports, incorporated following definitional alignment and cross-source validation.",
];

const verificationStandards = [
  {
    title: "Tier 1 — Verified Operational or Commercial Records",
    desc:
      "We seek independent confirmation where feasible, including counterparty validation, reconciliation with regulatory filings, shipment documentation, audited disclosures, or corroboration from intermediaries (logistics providers, financial institutions, channel partners) with direct knowledge of the activity.",
  },
  {
    title: "Tier 2 & Tier 3 — Intelligence Inputs",
    desc:
      "We apply cross-verification against at least two independent sources covering the same market segment and reporting period, and assess alignment with historical trends, capacity indicators, and macroeconomic drivers for plausibility.",
  },
  {
    title: "Structured Survey Data",
    desc:
      "Individual responses are reviewed for internal consistency, logical coherence, and statistical outliers. Responses identified as anomalous are flagged for clarification or follow-up before aggregation.",
  },
];

const samplingLayers = [
  {
    layer: "Upstream",
    subtitle: "Supply Ecosystem",
    Icon: Factory,
    accent: "#2563eb",
    image: "/assets/methodology/Picture1.png",
    imgWidth: 1533,
    imgHeight: 739,
    desc: "Understanding the fundamental supply-side dynamics that influence cost structures, availability, and technological evolution.",
    objectives: [
      "Assessing raw material availability, pricing trends, and supply volatility",
      "Understanding supplier concentration and dependency risks",
      "Tracking input cost inflation/deflation and margin pressures",
      "Evaluating innovation in materials, components, and technologies",
      "Identifying capacity expansions, bottlenecks, and supply disruptions",
      "Understanding supplier-manufacturer relationships and contract structures",
    ],
  },
  {
    layer: "Midstream",
    subtitle: "Manufacturing & Integration",
    Icon: Layers,
    accent: "#059669",
    image: "/assets/methodology/Picture2.png",
    imgWidth: 1464,
    imgHeight: 782,
    desc: "Capturing core market mechanics, including production, pricing, and competitive dynamics.",
    objectives: [
      "Evaluating production capacity, utilisation rates, and expansion plans",
      "Understanding pricing strategies, discounting practices, and margin structures",
      "Tracking technology adoption, automation, and product innovation",
      "Assessing competitive positioning and differentiation strategies",
      "Identifying supply-demand imbalances and production constraints",
      "Understanding procurement strategies and supplier dependencies",
      "Evaluating impact of macroeconomic and regulatory changes on production",
    ],
  },
  {
    layer: "Downstream",
    subtitle: "Market & Demand Layer",
    Icon: ShoppingCart,
    accent: "#7c3aed",
    image: "/assets/methodology/Picture3.png",
    imgWidth: 1377,
    imgHeight: 731,
    desc: "Focusing on demand-side intelligence, capturing how markets behave commercially.",
    objectives: [
      "Understanding purchase decision criteria and supplier selection processes",
      "Tracking demand trends, consumption patterns, and order cycles",
      "Identifying pricing sensitivity and negotiation dynamics",
      "Evaluating channel structures, distributor roles, and margins",
      "Assessing project pipelines (EPC) and capital expenditure trends",
      "Understanding customer satisfaction, switching behavior, and loyalty drivers",
      "Identifying emerging applications and unmet needs in end-use markets",
    ],
  },
];

const samplingDimensions = ["Geography", "Stakeholder Type", "Company Size", "Functional Role"];

const normalisationAdjustments = [
  {
    title: "Geographic / Market Scope",
    desc: "Adjusting reported values or volumes to the study's base geography using observable regional differentials, trade flow data, logistics costs, or consumption-weighted benchmarks.",
  },
  {
    title: "Product / Technical Specification",
    desc: "Adjusting for differences in model configuration, technology generation, performance tier, grade, or certification level using established market premiums, discounts, or comparable benchmarks.",
  },
  {
    title: "Timing",
    desc: "Where data points originate earlier in the reporting window, adjusting for observable market movements between the original data timestamp and the close of the collection window using relevant indices or benchmarks.",
  },
  {
    title: "Scale or Volume",
    desc: "Where reported volumes, contract sizes, or deployment scales fall outside the typical range for the defined market segment, normalising values to the representative market scale where a measurable volume-value relationship exists.",
  },
  {
    title: "Currency",
    desc: "Converting local-currency values to the base reporting currency using the prevailing exchange rate at the time the underlying activity occurred, sourced from an independent and widely recognised FX benchmark.",
  },
];

const expertJudgementUses = [
  "Determining whether a submitted data point meets admissibility and quality criteria.",
  "Deciding whether and how to apply normalisation adjustments to a data point.",
  "Identifying, investigating, and excluding statistical or contextual outliers.",
  "Interpreting incomplete datasets or reconciling conflicting signals across multiple sources.",
  "Establishing a defensible market estimate or outlook in data-sparse environments where observable evidence is limited.",
];

const expertJudgementControls = [
  "The lead analyst responsible for a study must document the judgement applied, the supporting information considered, and the conclusion reached within the research file prior to publication.",
  "All analyses are reviewed by a second qualified analyst — either a peer or senior reviewer — before publication. The reviewer may challenge, request clarification, or require re-justification of any judgement exercised.",
  "Judgements that deviate materially from historical precedent, established methodology, or recent market trends are escalated to the Head of Research for additional review and approval.",
  "Consistency across analysts is supported through formal training programs, internal methodology documentation for each covered market, and periodic cross-team calibration exercises.",
];

const outlierFactors = [
  "The magnitude of deviation relative to other data points collected during the same reporting window.",
  "Whether the deviation aligns with or contradicts observable movements in related markets, comparable segments, or underlying demand-supply indicators.",
  "The historical reliability and track record of the submitting source, including consistency with previous submissions.",
  "Whether the deviation can be reasonably addressed through a documented normalisation adjustment rather than requiring full exclusion of the data point.",
];

const dataSparseSignals = [
  "The most recent published estimate or benchmark for the same market segment.",
  "Short-term historical trends and observable direction in demand, supply, or pricing indicators.",
  "Movements in related markets, substitute technologies, upstream inputs, or downstream demand sectors.",
  "Qualitative intelligence from verified market participants gathered through ongoing industry engagement.",
  "Relevant institutional or regulatory datasets that provide contextual signals for the period under review.",
];

const prePublicationReview = [
  {
    title: "Internal Plausibility Check",
    desc: "The proposed output is compared against prior reporting periods and against movements in related markets or macro indicators to confirm overall consistency and logical coherence.",
  },
  {
    title: "Peer Review",
    desc: "A second qualified analyst reviews the research file, verifies that all data inputs and adjustments have been applied appropriately, and either approves the output or requests clarification before publication.",
  },
  {
    title: "Escalation Trigger",
    desc: "Any proposed change that exceeds predefined significance thresholds or materially alters the market outlook requires additional sign-off from the Head of Research.",
  },
  {
    title: "AI-Output Verification",
    desc: "The lead analyst confirms that no generative AI output has been used as a primary data source and that all analytical conclusions are grounded in verifiable evidence and documented methodologies.",
  },
];

const publicationDisclosures = [
  "Market definition, including product or service scope, geographic coverage, unit of measure, and base currency.",
  "The published estimate or metric, expressed as a point estimate or range depending on the market structure and data availability.",
  "Indication of evidential basis, such as primary-data supported analysis, modeled estimation, expert judgement applied, or prior value carried forward where applicable.",
  "Relevant qualitative context, including regulatory developments, supply-chain disruptions, technological shifts, or seasonal demand factors that influenced the analysis.",
];

const correctionTriggers = [
  "An output relied on data that is later determined to be inaccurate, misreported, or submitted in bad faith.",
  "A calculation, normalization, or conversion error occurred during the preparation of the analysis.",
  "A data input was included or excluded in a manner inconsistent with the stated research methodology.",
];

const methodologyChangeSteps = [
  "A formal change proposal is prepared, outlining the rationale, scope, and expected impact on published outputs.",
  "Affected clients and contributing sources may be consulted for a defined feedback period prior to implementation.",
  "The final change is approved by the Head of Research and recorded in the internal revision history.",
  "Minor or clarificatory updates (such as typographical corrections or explanatory additions) may be implemented without a formal consultation period at the discretion of the Head of Research.",
];

const editorialIndependence = [
  "Analysts responsible for producing market intelligence and assessments do not participate in revenue-generating activities that could create a financial interest in the outcome of their analysis.",
  "Research outputs are determined solely on the basis of verifiable evidence and the methodology described in this document. No client, investor, or external party may direct, alter, or influence the analytical conclusions presented.",
  "The firm does not accept payments, gifts, or incentives from market participants in exchange for favourable coverage, preferential analysis, or altered market conclusions.",
];

const aiTransparencyPolicy = [
  "AI systems are never used as primary data sources for any market intelligence output, forecast, or market-size estimate.",
  "AI tools may be used for limited support functions such as data structuring, translation of source materials, transcription of interviews, or preliminary anomaly detection within large datasets. In all cases, AI outputs are treated as preliminary aids and are subject to full human verification.",
  "All published analysis must be traceable to human-verified evidence, including primary data sources, documented research inputs, and analyst-reviewed methodologies.",
  "AI-generated forecasts or third-party automated market estimates are not used as inputs into the firm's research outputs, regardless of the source platform.",
];

const complaintTopics = [
  "The methodology applied to a specific study or market estimate.",
  "Whether a particular data submission was appropriately incorporated or excluded.",
  "A suspected error, omission, or potential conflict of interest in a published output.",
];

/* ─── small reusable bits ────────────────────────────────────────────────── */

function PartHeading({
  Icon,
  accent,
  eyebrow,
  title,
}: {
  Icon: React.ElementType;
  accent: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
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
        <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: accent }}>
          {eyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">{title}</h2>
      </div>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────────────────── */

export default function ResearchMethodologyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="bg-[var(--muted)]">
        <Container size="sm">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-4xl">
            Research Methodology
          </h2>
          <p className="text-xl text-[var(--muted-foreground)] mb-4 leading-relaxed">
            This Research Methodology document governs all market intelligence outputs produced
            by Globe Market Research. It establishes the standards, processes, verification
            protocols, and quality controls that underpin every assessment, forecast, and
            analysis we publish — whether for global biofuels, smartphones, semiconductors,
            energy transition materials, or any other market sector covered by our practice.
          </p>
          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            We publish this methodology openly because transparency is the foundation of trust.
            In an era when AI-generated content is widespread, clients deserve to know exactly
            how intelligence is gathered, who gathers it, how data is ranked and normalised, and
            what checks exist before any figure or trend is committed to a published output. This
            document is reviewed and updated at least annually.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="sm">
          {/* ── Table of Contents ── */}
          <section className="my-10" aria-label="How this methodology is organised">
            <div className="flex items-center gap-4 mb-8">
              <span className="hidden sm:block flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="font-semibold tracking-[0.22em] uppercase text-center" style={{ color: "var(--muted-foreground)" }}>
                How This Methodology Is Organised
              </span>
              <span className="hidden sm:block flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              This document is divided into six substantive parts that mirror the lifecycle of a
              market intelligence assessment, followed by a glossary and revision history.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tocParts.map(({ part, title, desc, Icon, accent }) => (
                <div
                  key={part}
                  className="rounded-2xl border p-6 flex flex-col gap-3 bg-[var(--card)]"
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
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ PART I ══════════ */}
          <section className="my-14" id="part-1">
            <PartHeading Icon={Database} accent="#2563eb" eyebrow="Part I" title="Source Management & Input Data Standards" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              The reliability of any market intelligence output is only as strong as the
              reliability of its inputs. This part establishes who qualifies as an approved data
              source, what types of information are admissible, how sources are onboarded and
              periodically reviewed, and how data submissions are recorded.
            </p>

            <h3 className="text-xl font-semibold mb-3">1.1 Rationale for Source-Based Intelligence</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Our methodology prioritises primary market evidence — company-level revenues,
              production capacity utilization and channel sell-through data, consumption
              intensity — over secondary or derived data. This hierarchy exists because primary
              evidence is observable, timestamped, and, in principle, verifiable by
              counterparties. Credible published data (published indices, trade association
              databases, surveys, press reports) may supplement primary evidence but does not
              substitute for it in price-sensitive or market-moving assessments.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Where primary evidence is unavailable — as is common in illiquid, nascent, or opaque
              markets — we employ structured expert judgement governed by the protocols described
              in Part IV. We never suppress an assessment solely due to thin data; we make
              explicit what type of evidence underpins the final figure.
            </p>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 mb-10 flex items-start gap-3">
              <Cpu size={20} strokeWidth={1.75} className="text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                <strong>AI language models are NOT used as primary data sources.</strong>{" "}
                Publicly accessible AI-generated text does not constitute market evidence. We do
                use computational tools to assist in data processing, translation, and
                pattern-flagging, but every published assessment must be anchored in
                human-verified, primary market contact.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">1.2 Source Classification Framework</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              We classify all data sources on a four-tier hierarchy. Higher-tier sources receive
              greater weight in assessment determination. Sources at Tiers 3 and 4 may only be
              used where Tier 1 and 2 evidence is absent or insufficient.
            </p>
            <div className="grid grid-cols-1 gap-4 mb-10">
              {sourceTiers.map(({ tier, label, weight, desc, accent }) => (
                <div
                  key={tier}
                  className="rounded-2xl border p-6 bg-[var(--card)]"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 25%, #e5e7eb)` }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        background: `color-mix(in srgb, ${accent} 12%, #f8faff)`,
                        border: `1px solid color-mix(in srgb, ${accent} 25%, #e5e7eb)`,
                        color: accent,
                      }}
                    >
                      {tier}
                    </span>
                    <h4 className="font-semibold text-base text-[var(--foreground)]">{label}</h4>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
                    >
                      {weight}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3">1.3 Source Qualification & Onboarding</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Before any individual or organisation is admitted to our source network, they must
              satisfy the following qualification criteria:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
              {qualificationCriteria.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="font-semibold text-base mb-2 text-[var(--foreground)]">{title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              Sources who provide persistently inaccurate, unverifiable, or late data may be
              downgraded or removed from the approved network. A source removed on quality
              grounds is recorded in our internal source registry with the reason noted.
            </p>

            <h3 className="text-xl font-semibold mb-3">1.4 What Data May Be Submitted</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Admissible data types, in descending order of evidential weight, are:
            </p>
            <ol className="space-y-3 mb-6">
              {admissibleData.map(({ title, desc }, i) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-[var(--foreground)]">{title}: </span>
                    <span className="text-[var(--muted-foreground)] leading-relaxed">{desc}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              Data received after the applicable collection window closes will not be
              incorporated into the analysis cycle it was intended for, but may be retained,
              logged, and applied to subsequent reporting or forecasting periods following
              validation.
            </p>

            <h3 className="text-xl font-semibold mb-3">1.5 Submission Channels & Record-Keeping</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Sources may submit data through the following channels: direct telephone call with
              a research analyst (call notes recorded and retained), secure email to a designated
              research inbox, our proprietary survey platform, or direct interview — in-person or
              via video conference (notes retained with source consent).
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              All submissions are timestamped and assigned a unique reference number. The
              complete submission log, including source identity (held confidentially), data
              type, and collection timestamp, is retained for a minimum of one year. This audit
              trail supports both internal quality review and, where contractually required,
              client audits.
            </p>
          </section>

          {/* ══════════ PART II ══════════ */}
          <section className="my-14" id="part-2">
            <PartHeading Icon={Map} accent="#0891b2" eyebrow="Part II" title="Research Scope & Market Coverage" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              Each market product we publish is governed by a formal specification that defines
              precisely what is being measured. Clients can find the specification for any
              individual market in the relevant product&apos;s specification sheet, available on
              request or via the client dashboard.
            </p>

            <h3 className="text-xl font-semibold mb-3">2.1 Market Definition</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Every assessed market must be defined along the following dimensions before a first
              publication:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
              {marketDefinitionDimensions.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="font-semibold text-base mb-2 text-[var(--foreground)]">{title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3">2.2 Reporting Frequencies</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              The reporting cadence is aligned with market dynamism, data availability, and the
              strategic decision-making cycles of end users:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
              {reportingFrequencies.map(({ title, accent, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border p-5 bg-[var(--card)]"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 25%, #e5e7eb)` }}
                >
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2"
                    style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}
                  >
                    {title}
                  </span>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              Reporting frequency is periodically reviewed to ensure it remains consistent with
              market evolution, liquidity patterns, data transparency, and client
              decision-making requirements.
            </p>

            <h3 className="text-xl font-semibold mb-3">2.3 Market Activation, Suspension & Deactivation</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              A new market study, forecast coverage, or intelligence track may be activated once
              sufficient primary and published source coverage has been established, the market
              definition framework has passed internal methodological review, and minimum data
              reliability thresholds are met. Activation requires peer validation of scope,
              segmentation logic, data availability, and modelling approach. Clients are notified
              in advance of formal publication, including disclosure of scope, assumptions, and
              reporting cadence.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Coverage may be temporarily suspended if prevailing conditions prevent the
              production of reliable, defensible analysis — for example during force majeure
              events, regulatory shocks, geopolitical disruptions, structural supply-chain
              breakdowns, data blackouts, or periods of extreme illiquidity. In such cases,
              clients are informed promptly, with a transparent explanation of the constraints
              and an indicative timeline for reassessment or resumption.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              A market coverage area may be permanently deactivated if the underlying industry
              segment ceases to operate at commercially meaningful scale, consolidates into a
              broader category rendering the original segmentation obsolete, or undergoes
              structural transformation such that previously defined specifications are no longer
              representative. Historical datasets and archived reports remain accessible for
              continuity and benchmarking purposes, and clients are provided advance notice and,
              where relevant, a transition plan.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              All activation, suspension, and deactivation decisions are documented internally
              with rationale, supporting evidence, and governance approval records to ensure
              transparency and institutional consistency.
            </p>
          </section>

          {/* ══════════ PART III ══════════ */}
          <section className="my-14" id="part-3">
            <PartHeading Icon={ClipboardCheck} accent="#059669" eyebrow="Part III" title="Data Collection, Verification & Submission" />

            <h3 className="text-xl font-semibold mb-3">3.1 Data Hierarchy & Prioritisation</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Not all data inputs carry equal analytical weight. Our market intelligence and
              assessment process prioritises evidence in the following order, consistent with
              institutional best practice:
            </p>
            <ol className="space-y-3 mb-6">
              {dataHierarchy.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--muted-foreground)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              All prioritisation decisions are documented within the research file, and any
              deviation from this hierarchy requires explicit methodological justification and
              senior analyst approval.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.2 Verification Standards</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              All data submitted for inclusion in a market assessment, sizing exercise, or
              forecast is subject to verification. The level of verification applied is
              proportionate to the evidential weight and materiality of the submission:
            </p>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {verificationStandards.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="font-semibold text-base mb-2 text-[var(--foreground)]">{title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              Evidence that cannot be verified to an appropriate standard within the applicable
              collection window is excluded from the analysis. Excluded inputs are logged, with
              the reason for exclusion documented and retained in the audit archive to ensure
              transparency and methodological integrity.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.3 Submissions from Concentrated Sources</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Where a single organisation or a limited group of contributors provides a
              disproportionately large share of total data inputs for a given assessment or
              reporting cycle, enhanced scrutiny is applied to mitigate concentration risk and
              potential bias:
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "If one source accounts for more than 50% of total material inputs within a reporting period, the lead analyst conducts an independent validation review before incorporating the data, cross-checking against historical trends, alternative datasets, and structural market indicators — with the rationale documented in the project audit file.",
                "Where source concentration risk is identified, efforts are made to broaden contributor coverage through additional primary outreach, supplementary datasets, or alternative verification channels. If concentration persists across two consecutive reporting cycles, a formal methodology review may be initiated.",
                "Contributor confidentiality is maintained at all times. Individual source identities are not disclosed in published reports or client materials, except where information originates from publicly attributable documents or regulatory disclosures.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.4 Primary Research Sampling Framework</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Our B2B primary research framework is structured along the industry value chain,
              enabling a holistic capture of market dynamics across supply creation, production,
              and end-use demand. Each layer is sampled across four standardised dimensions:
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {samplingDimensions.map((dim) => (
                <span
                  key={dim}
                  className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-[var(--foreground)] shadow-sm"
                >
                  {dim}
                </span>
              ))}
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              This ensures comparability, balance, and decision relevance across all datasets.
              The framework is divided into Upstream (Supply Ecosystem), Midstream (Manufacturing
              &amp; Integration), and Downstream (Market &amp; Demand):
            </p>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {samplingLayers.map(({ layer, subtitle, Icon, accent, desc, objectives }) => (
                <div
                  key={layer}
                  className="rounded-2xl border p-6 bg-[var(--card)] flex flex-col"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 25%, #e5e7eb)` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `color-mix(in srgb, ${accent} 10%, #f8faff)`,
                      border: `1px solid color-mix(in srgb, ${accent} 20%, #e5e7eb)`,
                    }}
                  >
                    <Icon size={22} strokeWidth={1.75} style={{ color: accent }} aria-hidden="true" />
                  </div>
                  <h4 className="font-bold text-lg text-[var(--foreground)]">{layer}</h4>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: accent }}>
                    {subtitle}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">{desc}</p>
                  <ul className="space-y-2 mt-auto">
                    {objectives.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: accent }}
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ── Sampling distribution diagrams ── */}
            <div className="mt-10 space-y-8">
              {samplingLayers.map(({ layer, subtitle, accent, image, imgWidth, imgHeight }) => (
                <div
                  key={layer}
                  className="rounded-2xl border p-6 bg-[var(--card)]"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 25%, #e5e7eb)` }}
                >
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                    <h4 className="font-semibold text-base text-[var(--foreground)]">
                      {layer} Sampling Distribution
                    </h4>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{
                        color: accent,
                        background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${accent} 20%, transparent)`,
                      }}
                    >
                      {subtitle}
                    </span>
                  </div>
                  <div className="w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={`${layer} (${subtitle}) sampling distribution across geography, stakeholder type, company size, and functional role`}
                      width={imgWidth}
                      height={imgHeight}
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ PART IV ══════════ */}
          <section className="my-14" id="part-4">
            <PartHeading Icon={SlidersHorizontal} accent="#7c3aed" eyebrow="Part IV" title="Assessment Determination & Quality Controls" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              This part describes the analytical processes applied to collected data to produce a
              final, published assessment. It covers normalisation, expert judgement, outlier
              exclusion, and the special protocols applied in illiquid or data-thin markets.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Gauge size={20} className="text-purple-600" aria-hidden="true" /> 4.1 Normalisation
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Markets and datasets are inherently heterogeneous. Reported information may differ
              from the defined base specification in geography, product configuration, timing,
              scale, or currency. Normalisation is the process of adjusting submitted data so that
              all inputs align with the defined base parameters, allowing consistent comparison,
              aggregation, and analysis. Common normalisation adjustments include:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
              {normalisationAdjustments.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="font-semibold text-base mb-2 text-[var(--foreground)]">{title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              All normalisation decisions are treated as forms of expert analytical judgement and
              are subject to internal methodological controls. Each adjustment applied during a
              reporting cycle is recorded in the research file, including the magnitude of the
              adjustment and the supporting rationale, ensuring transparency and auditability.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Brain size={20} className="text-purple-600" aria-hidden="true" /> 4.2 Expert Judgement
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Expert judgement is the application of domain expertise and analytical reasoning to
              decisions that cannot be resolved through mechanical data processing or automated
              models alone. It is an inherent and legitimate component of market intelligence;
              our protocols ensure it is applied consistently, transparently, and subject to
              independent oversight. Expert judgement may be applied when:
            </p>
            <ul className="space-y-2 mb-6">
              {expertJudgementUses.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Controls on Expert Judgement
            </h4>
            <ol className="space-y-3 mb-10">
              {expertJudgementControls.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--muted-foreground)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Filter size={20} className="text-purple-600" aria-hidden="true" /> 4.3 Exclusion of Outliers
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              An outlier is a data point that deviates materially from the central tendency of
              the remaining evidence in a manner that cannot be explained by legitimate market
              conditions, structural differences, or definitional variations. The following
              factors are considered when evaluating whether to exclude a data point:
            </p>
            <ul className="space-y-2 mb-6">
              {outlierFactors.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              Exclusion of a data point is always explicit and documented. Data is never silently
              discarded. Any excluded submission remains archived in the research audit file with
              the reason for exclusion recorded to preserve transparency and methodological
              integrity.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.4 Determination in Data-Sparse or Illiquid Markets</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Not all markets generate sufficient observable data in every reporting cycle. Our
              methodology accommodates periods of reduced data availability without requiring the
              suspension of coverage or the introduction of unsupported estimates. Where no
              admissible primary data is available within a given reporting window, the lead
              analyst applies structured expert judgement, drawing on:
            </p>
            <ul className="space-y-2 mb-6">
              {dataSparseSignals.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 mb-10 flex items-start gap-3">
              <RefreshCw size={20} strokeWidth={1.75} className="text-purple-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                If the combined weight of available evidence does not provide a sufficiently clear
                indication of whether and by how much the market has shifted since the previous
                reporting cycle, the prior value may be carried forward (&ldquo;rolled
                over&rdquo;) and clearly flagged as such in the published output. A rolled-over
                figure is never presented as a newly derived market estimate.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BookOpenCheck size={20} className="text-purple-600" aria-hidden="true" /> 4.5 Verification & Pre-Publication Review
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Before any market estimate, forecast, or analytical output is published, it
              undergoes a structured pre-publication review process:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prePublicationReview.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="font-semibold text-base mb-2 text-[var(--foreground)]">{title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ PART V ══════════ */}
          <section className="my-14" id="part-5">
            <PartHeading Icon={RefreshCw} accent="#d97706" eyebrow="Part V" title="Publication, Corrections & Revision" />

            <h3 className="text-xl font-semibold mb-3">5.1 Publication Standards</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              All published market estimates, forecasts, and analytical outputs include the
              following standard disclosures, either presented directly in the report or
              referenced through the methodology documentation:
            </p>
            <ul className="space-y-3 mb-6">
              {publicationDisclosures.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              Where outputs rely primarily on expert judgement or where prior-period values are
              carried forward due to limited new evidence, this status is explicitly disclosed.
              The analytical basis of any published output is never obscured.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.2 Corrections Policy</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              We are committed to correcting material errors promptly and transparently. A
              correction may be issued when:
            </p>
            <ul className="space-y-3 mb-6">
              {correctionTriggers.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Corrections are limited to information that was available — or should reasonably
              have been available — during the relevant reporting window. Previously published
              outputs are not retroactively revised solely to incorporate data that emerged after
              the reporting period closed.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              All corrections are published with a clear statement describing what was changed,
              the reason for the correction, and the date of the update. Both the original value
              and the corrected value are disclosed, and correction notices remain archived
              alongside the original publication for transparency.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.3 Methodology Review & Change Process</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              This research methodology is reviewed formally at least once per year and
              additionally when structural changes occur in the markets covered. Reviews are
              conducted by the Research team and the internal Methodology Committee and may
              include structured consultation with clients or industry participants. Material
              changes to the methodology follow a structured process:
            </p>
            <ol className="space-y-3">
              {methodologyChangeSteps.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--muted-foreground)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ══════════ PART VI ══════════ */}
          <section className="my-14" id="part-6">
            <PartHeading Icon={Scale} accent="#dc2626" eyebrow="Part VI" title="Independence, Ethics & Complaints" />

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <ShieldCheck size={20} className="text-red-600" aria-hidden="true" /> 6.1 Editorial Independence
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Our firm maintains strict editorial independence between its research function and
              all commercial, sales, and advisory activities. Specifically:
            </p>
            <ul className="space-y-3 mb-6">
              {editorialIndependence.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              The credibility and value of our intelligence are grounded in objectivity. Any
              practice that compromises analytical independence would undermine the integrity of
              the research itself.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Lock size={20} className="text-red-600" aria-hidden="true" /> 6.2 Data Security & Confidentiality
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Contributor identities and sensitive data are treated with strict confidentiality.
              We do not disclose, directly or indirectly, which specific organisations or
              individuals contributed information to a particular study or dataset. Published
              outputs present aggregated intelligence without identifying individual sources.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              All research data is stored on secure, access-controlled systems. Access to
              identifiable source information is restricted to authorized research personnel.
              Research audit files and supporting datasets are retained for a minimum of five
              years to ensure traceability and methodological accountability.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Cpu size={20} className="text-red-600" aria-hidden="true" /> 6.3 AI Transparency Policy
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              In response to the growing prevalence of AI-generated content and automated
              analysis, the firm adopts the following explicit safeguards:
            </p>
            <ul className="space-y-3 mb-6">
              {aiTransparencyPolicy.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              This policy ensures that every published insight remains grounded in verified
              evidence and accountable human analysis.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <MessageCircle size={20} className="text-red-600" aria-hidden="true" /> 6.4 Complaints & Clarification Process
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Clients, contributing sources, or market participants may request clarification or
              submit a complaint regarding:
            </p>
            <ul className="space-y-3 mb-6">
              {complaintTopics.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Requests should be submitted in writing to the Head of Research. We commit to
              acknowledging receipt within two business days and providing a substantive response
              within ten business days.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Where a matter requires formal investigation, an interim update will be provided
              within ten business days, with a final response issued within thirty business days.
              If the complainant is not satisfied with the response, the matter may be escalated
              to senior management for further review. All complaints and their resolutions are
              recorded in a central log and reviewed periodically by the internal methodology
              governance committee.
            </p>
          </section>

        </Container>
      </Section>
    </>
  );
}
