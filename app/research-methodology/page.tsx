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
    "Our Research Framework: data sources, market scoping, information collection and validation, analytical standards, publication governance, and research integrity practices behind every Globe Market Research deliverable.",
  alternates: { canonical: "/research-methodology" },
};

/* ─── data ────────────────────────────────────────────────────────────────── */

const tocParts = [
  {
    part: "Section I",
    title: "Data Sources & Information Standards",
    desc: "Defines approved information providers, source qualification requirements, and acceptable forms of evidence.",
    Icon: Database,
    accent: "#2563eb",
  },
  {
    part: "Section II",
    title: "Market Definition & Research Scope",
    desc: "Explains market boundaries, segmentation principles, and coverage parameters.",
    Icon: Map,
    accent: "#0891b2",
  },
  {
    part: "Section III",
    title: "Information Collection & Validation Process",
    desc: "Describes data gathering, verification procedures, and evidence prioritization.",
    Icon: ClipboardCheck,
    accent: "#059669",
  },
  {
    part: "Section IV",
    title: "Market Assessment & Quality Assurance",
    desc: "Outlines normalization techniques, analytical judgement, validation procedures, and quality control measures.",
    Icon: SlidersHorizontal,
    accent: "#7c3aed",
  },
  {
    part: "Section V",
    title: "Reporting, Updates & Methodology Governance",
    desc: "Details publication practices, correction procedures, and periodic methodology reviews.",
    Icon: RefreshCw,
    accent: "#d97706",
  },
  {
    part: "Section VI",
    title: "Research Integrity, Ethics & Client Feedback",
    desc: "Explains independence standards, conflict-of-interest policies, and complaint handling procedures.",
    Icon: Scale,
    accent: "#dc2626",
  },
];

const sourceTiers = [
  {
    tier: "Level 1",
    label: "Direct Primary Sources",
    weight: "Highest evidential confidence",
    accent: "#2563eb",
    desc:
      "Identifiable organizations or individuals with direct commercial or operational involvement in the market being assessed. Examples include senior executives, business unit leaders, procurement managers, production supervisors, distributors, OEM shipment teams, compliance officers, and parties directly involved in commercial transactions. Supporting documentation may include audited internal records, shipment reports, contracts, invoices, production schedules, or regulatory submissions.",
  },
  {
    tier: "Level 2",
    label: "Verified Industry Participants",
    weight: "Requires independent confirmation",
    accent: "#0891b2",
    desc:
      "Organizations and professionals possessing indirect yet verifiable knowledge of market conditions, including logistics providers, consultants, brokers, EPC contractors, channel managers, customs specialists, patent experts, and financial intermediaries. Information from these sources must be independently confirmed before contributing to core market estimates.",
  },
  {
    tier: "Level 3",
    label: "Institutional & Public Sources",
    weight: "Credible, may lag latest developments",
    accent: "#059669",
    desc:
      "Government publications, regulatory databases, customs statistics, annual reports, investor presentations, academic research, exchange filings, and industry association publications. While highly credible, these datasets may not fully capture the latest market developments due to reporting delays.",
  },
  {
    tier: "Level 4",
    label: "Contextual & Supporting Sources",
    weight: "Context only — never sets a figure alone",
    accent: "#d97706",
    desc:
      "Industry news, conference discussions, expert commentary, structured opinion surveys, and market observations. These sources provide useful context and directional insights but are not used independently to determine market values or pricing.",
  },
];

const qualificationCriteria = [
  {
    title: "Market Relevance",
    desc:
      "The individual or organization must currently participate in activities directly or indirectly related to the market under evaluation, such as production, sales, procurement, distribution, investment, trading, or market analysis.",
  },
  {
    title: "Objectivity",
    desc:
      "Sources should not possess undisclosed financial, commercial, or personal interests that could materially influence the information they provide.",
  },
  {
    title: "Verification",
    desc:
      "Contributors are required to disclose their name, organization, and professional role to our research team, although confidentiality is maintained in all published outputs where appropriate.",
  },
  {
    title: "Historical Performance",
    desc:
      "Existing contributors are continuously evaluated based on submission quality, responsiveness, consistency, and the accuracy of previously supplied information following independent verification.",
  },
];

const admissibleData = [
  {
    title: "Operational and financial documentation",
    desc:
      "Audited or internally validated records such as production reports, shipment records, procurement agreements, revenue disclosures, capacity utilization statistics, executed contracts, regulatory submissions, and commercial performance reports. Wherever possible, documentation should specify quantities, values, timing, product specifications, geographic coverage, and counterparties.",
  },
  {
    title: "Verified commercial activity",
    desc:
      "Firm purchase commitments, confirmed bids or offers, distribution agreements, investment announcements, production expansion plans, and officially confirmed product launches containing identifiable commercial details and timelines.",
  },
  {
    title: "Validated market intelligence",
    desc:
      "Information obtained through executive interviews, distributor feedback, logistics providers, channel partners, EPC contractors, industry intermediaries, or other ecosystem participants, provided that such information is independently corroborated before influencing market estimates.",
  },
  {
    title: "Structured primary research",
    desc:
      "Data collected through standardized surveys, expert panels, customer questionnaires, or field interviews where sampling methodology, respondent segmentation, weighting procedures, and collection periods are fully documented.",
  },
  {
    title: "Institutional & regulatory publications",
    desc:
      "Official statistics released by government agencies, customs authorities, regulatory bodies, central banks, stock exchanges, multilateral organizations, and recognized trade associations, provided that their classifications align with the market definition under study.",
  },
];

const marketDefinitionDimensions = [
  {
    title: "Market Subject",
    desc:
      "The study clearly identifies the product, technology, service, or industry segment being evaluated. Where multiple variants, technology generations, quality grades, price tiers, or business models exist, each is classified according to predefined segmentation rules. Any harmonization performed between product variants or service levels is fully documented.",
  },
  {
    title: "Coverage Area",
    desc:
      "The geographical boundary of the research is specified before analysis begins. Coverage may extend to individual countries, regional markets, economic blocs, global markets, or defined trade routes. For multinational studies, the reporting basis such as manufacturing location, shipment origin, sales destination, or end-use geography is explicitly stated to avoid ambiguity.",
  },
  {
    title: "Measurement Standard",
    desc:
      "Market size is presented using standardized units appropriate to the industry, including monetary value, shipment volume, production output, installed capacity, or consumption. Wherever unit conversions or normalization procedures are applied, the methodology and assumptions are recorded to maintain consistency throughout the dataset.",
  },
  {
    title: "Reference Currency",
    desc:
      "The currency used for market valuation is identified for every publication. Where local currencies are converted or historical figures are adjusted for inflation or exchange-rate movements, the underlying methodology and reference period are disclosed.",
  },
  {
    title: "Assessment Interval",
    desc:
      "The frequency of reporting is selected according to the pace of market change, data availability, and commercial relevance. Reporting intervals may vary between weekly, monthly, quarterly, or annual depending upon the characteristics of the industry under assessment.",
  },
  {
    title: "Business & Transaction Model",
    desc:
      "The commercial ecosystem of the market is documented, including whether activity is dominated by direct manufacturer sales, distributor networks, OEM agreements, subscription models, public tenders, exchange trading, spot transactions, long-term contracts, or hybrid structures. This understanding supports interpretation of pricing behaviour and demand dynamics.",
  },
  {
    title: "Technical Eligibility",
    desc:
      "Products or services must satisfy predefined technical, regulatory, certification, or performance criteria before inclusion in the assessed market. Where technological differences significantly affect market value, dedicated segmentation rules are established.",
  },
  {
    title: "Industry Ecosystem",
    desc:
      "The study identifies the principal participants influencing market activity, such as integrated manufacturers, contract producers, distributors, digital platforms, institutional buyers, government agencies, retailers, or end users. This forms the basis for competitive analysis and primary research planning.",
  },
];

const reportingFrequencies = [
  {
    title: "Weekly",
    accent: "#dc2626",
    desc:
      "High-frequency coverage reserved for markets where supply-demand balances, pricing behaviour, inventories, or policy developments change rapidly. Such markets typically exhibit active spot trading, short purchasing cycles, and frequent commercial activity requiring continuous monitoring — for example selected commodities, freight markets, renewable energy certificates, and fast-moving electronics channels.",
  },
  {
    title: "Monthly",
    accent: "#2563eb",
    desc:
      "The default publication frequency for most industries. It aligns closely with common manufacturing schedules, procurement cycles, distributor reporting, and commercial negotiations, providing adequate time to conduct primary interviews, validate multiple datasets, reconcile inconsistencies, and refresh forecasting models while remaining responsive to evolving conditions.",
  },
  {
    title: "Quarterly",
    accent: "#059669",
    desc:
      "Suited to industries where market developments are driven by strategic investment decisions, long-term procurement contracts, enterprise budgeting cycles, infrastructure projects, or regulatory implementation schedules. Rather than short-term fluctuations, quarterly assessments focus on structural developments such as technology adoption, capacity additions, regulatory reforms, and major commercial agreements.",
  },
  {
    title: "Annual",
    accent: "#7c3aed",
    desc:
      "Adopted where markets operate through long planning horizons and pricing mechanisms are generally established once per year. These studies consolidate intelligence gathered from annual procurement negotiations, regulatory disclosures, corporate investment announcements, financial reporting, and broader industry developments to provide a comprehensive long-term market perspective.",
  },
];

const dataHierarchy = [
  "Level 1 – Verified Commercial Evidence: confirmed economic activity between independent parties, including executed commercial contracts, audited financial statements, verified shipment records, production reports, procurement documentation, customs declarations, regulatory filings, and other transaction-level records demonstrating measurable market activity.",
  "Level 2 – Confirmed Market Commitments: commercially binding commitments active during the reporting period, including finalized purchase orders, successful tender awards, inventory stocking decisions by distributors, announced production capacity additions, strategic investment approvals, and officially published pricing schedules.",
  "Level 3 – Indicative Commercial Intelligence: indicative market signals incorporated after appropriate review where fully confirmed information is unavailable, including preliminary corporate announcements, management guidance, distributor feedback, channel intelligence, non-binding quotations, and structured industry discussions — clearly identified as provisional.",
  "Level 4 – Structured Primary Research: responses collected through surveys, executive interviews, expert panels, and standardized questionnaires, evaluated according to predefined sampling methodologies and weighted by respondent relevance, market representation, geographic coverage, and statistical consistency.",
  "Level 5 – Published Institutional Information: government publications, customs databases, regulatory agencies, international organizations, stock exchange disclosures, industry associations, and other publicly available institutional datasets, evaluated for definitional consistency, reporting methodology, and compatibility with the market under analysis before integration.",
];

const verificationStandards = [
  {
    title: "Verified Operational or Commercial Records",
    desc:
      "Verification is performed wherever practical through independent confirmation mechanisms, including reconciliation with audited financial statements, customs documentation, regulatory filings, shipment records, contractual counterparties, logistics providers, banking intermediaries, or other organizations possessing direct knowledge of the reported activity.",
  },
  {
    title: "Industry Participant & Published Intelligence",
    desc:
      "Information obtained from industry participants, intermediaries, consultants, or published intelligence is validated through comparison with multiple independent datasets covering the same market, geography, and reporting period. Analysts also evaluate consistency with historical performance, production capacity, macroeconomic indicators, and prevailing industry conditions.",
  },
  {
    title: "Primary Research Responses",
    desc:
      "Individual submissions are assessed for logical consistency, completeness, response quality, and the presence of abnormal or contradictory values before inclusion. Where unusual findings are identified, respondents may be contacted for clarification before aggregation.",
  },
];

const samplingLayers = [
  {
    layer: "Upstream",
    subtitle: "Supply Ecosystem",
    Icon: Factory,
    accent: "#2563eb",
    image: "/assets/methodology/Picture1.png",
    imgWidth: 1544,
    imgHeight: 791,
    desc: "Upstream research examines the factors that influence the availability, cost, and evolution of key inputs entering the market.",
    objectives: [
      "Evaluating availability and pricing of raw materials and critical inputs",
      "Monitoring supplier concentration and dependency across the supply chain",
      "Tracking inflationary and deflationary pressures affecting production costs",
      "Identifying technological advancements in materials, components, and upstream processes",
      "Monitoring capacity additions, production constraints, and supply disruptions",
      "Understanding procurement relationships, sourcing strategies, and contractual arrangements between suppliers and manufacturers",
    ],
  },
  {
    layer: "Midstream",
    subtitle: "Manufacturing & Production",
    Icon: Layers,
    accent: "#059669",
    image: "/assets/methodology/Picture2.png",
    imgWidth: 1544,
    imgHeight: 791,
    desc: "Midstream research focuses on the operational activities that convert inputs into commercially available products and services.",
    objectives: [
      "Production capacity, utilisation rates, and manufacturing expansion plans",
      "Pricing models, cost structures, discount strategies, and profitability",
      "Adoption of automation, digital technologies, and manufacturing innovation",
      "Competitive positioning, product differentiation, and strategic initiatives",
      "Production bottlenecks, inventory management, and supply-demand balancing",
      "Procurement practices and supplier relationship management",
      "Effects of macroeconomic conditions, regulatory developments, and trade policies on manufacturing operations",
    ],
  },
  {
    layer: "Downstream",
    subtitle: "Commercial Market & Demand",
    Icon: ShoppingCart,
    accent: "#7c3aed",
    image: "/assets/methodology/Picture3.png",
    imgWidth: 1544,
    imgHeight: 791,
    desc: "The downstream research layer focuses on understanding purchasing behaviour, commercial activity, and end-user market dynamics.",
    objectives: [
      "Examining purchasing criteria and supplier evaluation processes",
      "Monitoring demand patterns, consumption behaviour, and procurement cycles",
      "Assessing pricing sensitivity, negotiation practices, and buying preferences",
      "Understanding distribution networks, channel economics, and intermediary roles",
      "Tracking EPC project pipelines, infrastructure investments, and capital expenditure trends",
      "Evaluating customer satisfaction, supplier switching behavior, and long-term loyalty drivers",
      "Identifying emerging applications and unmet needs in end-use markets",
    ],
  },
];

const samplingDimensions = ["Geographic Representation", "Stakeholder Category", "Organization Size", "Functional Responsibility"];

const normalisationAdjustments = [
  {
    title: "Regional Alignment",
    desc: "Where submitted information relates to a geography different from the defined market scope, adjustments are made using observable regional pricing differentials, trade statistics, logistics costs, import-export flows, demographic indicators, or consumption patterns so that all information reflects the study's designated geographic boundary.",
  },
  {
    title: "Product Harmonization",
    desc: "Markets frequently include multiple product variants differing in technical specifications, performance characteristics, certification levels, quality grades, or technology generations. Where necessary, submitted information is adjusted using established market premiums, discount relationships, or comparable commercial benchmarks so that all observations represent the defined reference product.",
  },
  {
    title: "Reporting Period Alignment",
    desc: "Information received at different points within the reporting window is adjusted where measurable market movements have occurred between the original observation date and the reporting cut-off, using relevant market indices, pricing benchmarks, demand indicators, and comparable commercial transactions.",
  },
  {
    title: "Volume & Scale Adjustment",
    desc: "Commercial activity often occurs across varying production volumes, project sizes, or contract scales. Where measurable economies of scale influence pricing or market value, observations are normalized to the representative scale applicable to the defined market segment.",
  },
  {
    title: "Currency Standardization",
    desc: "Financial information reported in local currencies is converted into the study's reporting currency using independently recognised foreign exchange reference rates applicable at the time the commercial activity occurred. Where appropriate, inflation adjustments are also incorporated to improve comparability across reporting periods.",
  },
];

const expertJudgementUses = [
  "Determining whether information satisfies quality standards.",
  "Selecting the most appropriate normalization methodology.",
  "Resolving conflicting evidence from multiple contributors.",
  "Interpreting incomplete datasets.",
  "Developing market estimates in sectors where observable commercial activity remains limited.",
];

const expertJudgementControls = [
  "The lead analyst records the issue requiring judgement, the evidence evaluated, alternative interpretations considered, and the final analytical conclusion.",
  "Before publication, a second qualified researcher independently reviews these decisions. Where necessary, additional supporting evidence or further justification may be requested before approval is granted.",
  "If a judgement materially differs from historical methodology, established market behavior, or previous reporting practice, the matter is escalated to the Head of Research for formal review before publication.",
  "Consistency across research teams is maintained through analyst training programs, documented market-specific guidance, periodic calibration exercises, and internal methodology workshops.",
];

const outlierFactors = [
  "The degree of deviation from other observations collected during the same reporting cycle.",
  "Consistency with movements observed across related industries, substitute products, upstream inputs, and downstream demand indicators.",
  "The historical reliability of the contributing source.",
  "Whether the observed difference results from definitional or technical variations that can reasonably be corrected through standardization rather than exclusion.",
];

const dataSparseSignals = [
  "The most recently validated market estimate.",
  "Historical trends observed over preceding reporting periods.",
  "Movements in upstream raw materials and downstream demand sectors.",
  "Commercial intelligence obtained through ongoing engagement with qualified market participants.",
  "Macroeconomic, regulatory, trade, and institutional indicators relevant to the market.",
];

const prePublicationReview = [
  {
    title: "Analytical Consistency Review",
    desc: "Results are evaluated against previous reporting periods together with broader market trends, macroeconomic conditions, related industries, and historical relationships to confirm that the findings remain logically coherent.",
  },
  {
    title: "Independent Technical Review",
    desc: "A second qualified analyst reviews the complete research file, including source documentation, validation records, analytical assumptions, standardization procedures, and calculation methodology. Publication approval is granted only after confirming that established research procedures have been followed consistently throughout the project.",
  },
  {
    title: "Senior Approval Process",
    desc: "Where a proposed estimate significantly changes previous market values, materially alters forecast direction, or exceeds internally defined significance thresholds, additional approval from the Head of Research is required before publication.",
  },
  {
    title: "AI Compliance Verification",
    desc: "As part of the final review, the responsible analyst confirms that no generative AI system has been used as an original source of market information. Any AI-assisted activities must remain limited to supporting functions such as data organization, translation, transcription, or analytical assistance. Every published conclusion must ultimately be supported by independently verified evidence and documented analytical procedures.",
  },
];

const publicationDisclosures = [
  "Defined Market Scope — every report clearly specifies the market being assessed, including the product or service boundary, geographic coverage, reporting unit, valuation currency, and any relevant segmentation used throughout the analysis.",
  "Reported Market Estimates — published outputs present the final market size, forecast, or analytical metric using either a single point estimate or an appropriate value range, depending on the maturity of the market, availability of evidence, and degree of uncertainty associated with the analysis.",
  "Analytical Basis — the methodology supporting each published figure is clearly identified, whether analysis supported primarily by verified primary research, model-based estimation using validated datasets, structured expert assessment, or continuation of a previously published benchmark where new evidence is insufficient.",
  "Supporting Market Context — where appropriate, publications summarize the principal market developments that influenced the assessment, including changes in regulation, technology adoption, supply-chain conditions, macroeconomic developments, geopolitical events, pricing movements, or seasonal demand patterns.",
];

const correctionTriggers = [
  "Subsequent verification showing that information originally incorporated into the analysis was inaccurate, incomplete, or intentionally misrepresented.",
  "Errors identified within calculations, currency conversions, normalization procedures, statistical processing, or forecasting models.",
  "Identification that information was included — or omitted — in a manner inconsistent with the documented research methodology.",
];

const methodologyChangeSteps = [
  "A formal proposal is developed describing the recommended modification, the reason for the change, the expected impact on published research, and any implementation considerations.",
  "Where changes could materially influence published outputs or reporting practices, selected clients, contributors, or industry experts may be invited to provide feedback during a defined consultation period before implementation.",
  "Following review, the Head of Research provides final authorization for material methodological revisions. Once approved, the change becomes part of the official research framework and is incorporated into future publications.",
  "Changes that improve clarity without affecting analytical outcomes — such as editorial revisions, formatting improvements, explanatory notes, or typographical corrections — may be implemented directly by the Head of Research without requiring formal consultation.",
];

const editorialIndependence = [
  "Separation of Commercial & Research Functions — analysts responsible for preparing market estimates, forecasts, and strategic assessments are not involved in sales, business development, or other commercial activities that could influence their analytical judgement or create financial incentives related to research outcomes.",
  "Evidence-Based Decision Making — all conclusions published by the firm are derived solely from validated information collected through the research methodology described in this document. External stakeholders including clients, investors, suppliers, or industry participants cannot influence, modify, or direct analytical findings.",
  "Zero-Tolerance for Undue Influence — the organization does not accept financial compensation, gifts, favors, or other incentives intended to obtain favorable market coverage, influence analytical conclusions, or alter published estimates.",
];

const aiTransparencyPolicy = [
  "No AI-Generated Market Evidence — generative AI platforms are never considered acceptable primary sources for market sizing, forecasting, pricing analysis, competitive intelligence, or strategic market conclusions. All published findings must ultimately originate from independently verified human sources or documented institutional datasets.",
  "Permitted Support Activities — AI-based technologies may be used only to assist researchers with operational tasks such as organizing large datasets, translating source materials, transcribing interviews, identifying potential anomalies or inconsistencies, and improving document management and workflow efficiency. Outputs produced through AI systems are treated only as preliminary analytical aids and always require human review before use.",
  "Human Accountability — every market estimate, forecast, and analytical conclusion published by the organization remains the responsibility of the assigned research team. Researchers must verify all evidence, validate analytical assumptions, and ensure complete traceability between published conclusions and their supporting documentation.",
  "Exclusion of Third-Party AI Forecasts — forecasts, market estimates, or analytical conclusions generated by external AI platforms are not incorporated into our published research, irrespective of their origin or popularity.",
];

const complaintTopics = [
  "Interpretation of the methodology applied within a specific study.",
  "Treatment of particular datasets or research inputs.",
  "Suspected factual errors or omissions.",
  "Concerns regarding methodological consistency.",
  "Potential conflicts of interest associated with a published output.",
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
        <Container size="md">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-4xl">
            Methodology Overview
          </h2>
          <p className="text-base text-[var(--muted-foreground)] mb-4 leading-relaxed">
            This Research Framework defines the principles and procedures applied to every
            market intelligence deliverable prepared by our organization. It outlines the
            research standards, validation practices, analytical processes, and quality
            assurance measures that support each market estimate, forecast, and strategic
            assessment we produce across industries, including biofuels, semiconductors,
            consumer electronics, energy transition materials, and other sectors within our
            coverage.
          </p>
          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            We make this methodology publicly available because transparency is fundamental to
            credible market intelligence. As AI-assisted content becomes increasingly common,
            stakeholders should clearly understand how information is sourced, who validates it,
            how evidence is prioritized and standardized, and what review mechanisms are
            followed before any findings are incorporated into a final publication.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="md">
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
              The methodology is organized into six major sections, each representing a distinct
              stage in the market intelligence process.
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

          {/* ══════════ SECTION I ══════════ */}
          <section className="my-14" id="part-1">
            <PartHeading Icon={Database} accent="#2563eb" eyebrow="Section I" title="Data Sources & Information Standards" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              Reliable market intelligence begins with reliable information. This section
              establishes the standards for qualifying data providers, identifying acceptable
              evidence, maintaining source records, and ensuring that every data submission is
              properly documented and reviewed before entering the analytical process.
            </p>

            <h3 className="text-xl font-semibold mb-3">1.1 Principles of Evidence-Based Market Intelligence</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Our research methodology gives the greatest importance to primary market evidence,
              including company revenues, production utilization, shipment activity, channel
              performance, procurement behavior, and consumption trends. Such information
              receives priority because it originates directly from market participants, is
              time-specific, and can generally be verified through independent sources or
              counterparties.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Secondary materials — including government statistics, trade association
              databases, published surveys, industry reports, and reputable media publications —
              are used to strengthen market understanding and provide additional context.
              However, they are not considered substitutes for primary evidence when producing
              market-sensitive estimates or strategic assessments.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              In situations where primary information is limited, particularly within emerging,
              fragmented, or low-transparency markets, structured expert assessment is applied
              using the governance procedures described in Section IV. Rather than withholding
              an assessment due to limited data availability, we clearly disclose the type and
              strength of evidence supporting the published estimate.
            </p>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 mb-10 flex items-start gap-3">
              <Cpu size={20} strokeWidth={1.75} className="text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                <strong>Artificial intelligence tools are not treated as original market data
                sources.</strong> AI-generated public content is regarded as supportive material
                only and never as market evidence. Computational technologies may assist with
                translation, data organization, statistical processing, and anomaly detection,
                but every published conclusion must ultimately be supported by information
                verified through qualified human sources.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">1.2 Information Source Hierarchy</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              All information providers are categorized within a four-level hierarchy according
              to the quality, proximity, and reliability of the evidence they contribute.
              Higher-ranked sources receive greater analytical weight, while lower-tier
              information is used primarily for contextual validation when stronger evidence is
              unavailable.
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
                      className="px-3 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 whitespace-nowrap"
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

            <h3 className="text-xl font-semibold mb-3">1.3 Source Approval & Qualification</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Every new source must satisfy predefined qualification standards before being
              admitted into our research network:
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
              Sources demonstrating repeated inconsistencies, unverifiable submissions, or
              persistent delays may be reassessed, downgraded, or removed from the approved
              contributor network. All such actions are documented within our internal source
              management system.
            </p>

            <h3 className="text-xl font-semibold mb-3">1.4 Acceptable Forms of Data</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              The following categories of information are considered admissible for research
              purposes, listed broadly in order of analytical priority:
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
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Information received after the completion of the designated collection period will
              generally not be incorporated into the current research cycle. Instead, it may be
              retained, validated, and considered for subsequent market updates or forecasting
              exercises.
            </p>
          </section>

          {/* ══════════ SECTION II ══════════ */}
          <section className="my-14" id="part-2">
            <PartHeading Icon={Map} accent="#0891b2" eyebrow="Section II" title="Market Scoping & Coverage Methodology" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Every market intelligence study begins with a clearly documented scope that
              establishes exactly what is included and excluded from the analysis. Defining
              these parameters at the outset ensures that market estimates, forecasts, and
              competitive assessments remain consistent across reporting periods and comparable
              across regions and product categories.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              Each published study is supported by an individual Market Specification Document,
              available to subscribed clients or upon request, which records the scope,
              assumptions, classifications, and reporting standards applicable to that specific
              market.
            </p>

            <h3 className="text-xl font-semibold mb-3">2.1 Establishing the Market Boundary</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Before research activities commence, every market is mapped against a standardized
              set of defining parameters. These parameters create a common analytical framework
              that guides data collection, validation, modelling, and reporting:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
              {marketDefinitionDimensions.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--card)]">
                  <h4 className="font-semibold text-base mb-2 text-[var(--foreground)]">{title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3">2.2 Selection of Reporting Cycle</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              The publication schedule for each market is determined after evaluating the speed
              at which commercial conditions evolve, the availability of reliable information,
              and the reporting requirements of end users:
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
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              The suitability of every reporting cycle is periodically reassessed to ensure that
              publication frequency continues to reflect changes in market maturity,
              transparency, liquidity, and client information requirements.
            </p>
          </section>

          {/* ══════════ SECTION III ══════════ */}
          <section className="my-14" id="part-3">
            <PartHeading Icon={ClipboardCheck} accent="#059669" eyebrow="Section III" title="Data Acquisition, Validation & Primary Research Methodology" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              The quality of any market assessment depends on the integrity of the underlying
              data. This section explains how information is collected, ranked, validated, and
              incorporated into our analytical models, while also describing the framework
              governing primary research activities and contributor management.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.1 Evidence Ranking & Data Weighting Framework</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Information collected during the research process is not treated equally. Each
              dataset is evaluated according to its reliability, traceability, and proximity to
              actual market activity before being incorporated into market estimates or
              forecasts. Our analytical models apply the following hierarchy when assigning
              evidential weight:
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
              Any departure from this evidence hierarchy requires documented methodological
              justification together with approval from the lead research team. All weighting
              decisions are retained within the project documentation for audit purposes.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.2 Data Validation & Quality Assurance</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              No information enters the analytical model without undergoing an appropriate
              validation process. The depth of verification depends upon both the significance
              of the information and its position within the evidence hierarchy:
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
              Information that cannot be verified to the required confidence level within the
              designated research window is excluded from the current assessment. Nevertheless,
              all excluded submissions remain documented within the research archive together
              with the reason for exclusion to preserve transparency and support future reviews.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.3 Managing Source Concentration Risk</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Maintaining diversity among information providers is essential for reducing
              analytical bias and strengthening research reliability. Whenever a limited number
              of contributors represent a significant proportion of total information collected,
              additional review procedures are implemented:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Where a single organization contributes more than half of the material evidence supporting a particular assessment, the research lead performs an independent validation before the information influences market estimates. This review compares submitted data against historical trends, external datasets, macro indicators, and structural characteristics of the market. The validation process and supporting rationale are formally documented.",
                "If reliance on a narrow contributor base continues across successive reporting cycles, additional primary research is initiated to diversify information sources — expanding executive interviews, identifying new value-chain participants, incorporating supplementary datasets, or revisiting weighting methodologies. Persistent concentration may also trigger a formal methodological review of sampling design or segmentation assumptions.",
                "Contributor identities remain confidential throughout the research process. Individual names and organizations are not disclosed in published reports unless the underlying information originates from publicly available corporate disclosures or regulatory filings.",
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
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              All assessments relating to source concentration are recorded as part of the
              project&apos;s governance documentation.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.4 Primary Research Framework</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Primary research forms the foundation of our market intelligence process. Rather
              than collecting information from isolated stakeholders, research activities are
              designed to capture perspectives across the complete industry ecosystem, ensuring
              that supply-side, production-side, and demand-side dynamics are represented within
              every study.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Our primary research methodology follows the complete value chain, allowing
              analysts to understand how information flows from raw material sourcing through
              manufacturing to final market demand. The framework consists of three
              interconnected research layers — Supply Ecosystem (Upstream), Production &amp;
              Manufacturing (Midstream), and Commercial Market &amp; End Users (Downstream).
              Within each layer, respondents are selected according to four standardised sampling
              dimensions:
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
              This structured sampling approach improves dataset balance, minimizes
              representation bias, and enables meaningful comparison across industries and
              regions.
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

          {/* ══════════ SECTION IV ══════════ */}
          <section className="my-14" id="part-4">
            <PartHeading Icon={SlidersHorizontal} accent="#7c3aed" eyebrow="Section IV" title="Analytical Framework, Market Estimation & Quality Assurance" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              Once information has been collected and validated, it enters the analytical stage
              where it is transformed into market estimates, forecasts, and strategic insights.
              This section outlines the principles used to standardize diverse datasets, apply
              analytical judgement, manage anomalous information, address low-data environments,
              and perform final quality assurance before publication.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Gauge size={20} className="text-purple-600" aria-hidden="true" /> 4.1 Data Standardization Framework
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Market data originates from numerous sources, each reporting information using
              different specifications, geographic boundaries, reporting periods, currencies,
              and commercial assumptions. Before analysis begins, all collected information is
              standardized to ensure that every data point is directly comparable with the
              defined scope of the study.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              The objective of standardization is to eliminate inconsistencies that arise from
              differences in reporting practices rather than genuine market behavior. Typical
              standardization procedures include the following:
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
              Every standardization adjustment is documented as part of the analytical record.
              Analysts record the nature of the adjustment, the methodology applied, supporting
              assumptions, and its quantitative impact to ensure complete transparency and
              auditability.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Brain size={20} className="text-purple-600" aria-hidden="true" /> 4.2 Application of Analytical Judgement
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Although quantitative evidence forms the foundation of every market assessment,
              certain analytical decisions cannot be resolved through predefined formulas alone.
              In such situations, informed professional judgement is applied within a structured
              governance framework. Analytical judgement may be required when:
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
              <Filter size={20} className="text-purple-600" aria-hidden="true" /> 4.3 Identification & Treatment of Exceptional Data
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Not every submitted observation accurately reflects prevailing market conditions.
              Certain data points may differ significantly from the broader body of evidence due
              to reporting errors, exceptional commercial circumstances, definitional
              inconsistencies, or isolated transactions. Rather than automatically excluding such
              information, analysts perform a structured assessment considering:
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
              Information is removed from analysis only when sufficient evidence demonstrates
              that inclusion would reduce the reliability of the final assessment. Whenever a
              data point is excluded, the decision is explicitly documented — the original
              submission remains permanently retained within the project archive together with
              the justification supporting its exclusion. No submitted information is removed
              without documentation.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.4 Analytical Approach for Limited-Visibility Markets</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Certain industries — particularly emerging technologies, niche applications, or
              highly fragmented sectors — may not generate sufficient observable commercial
              activity during every reporting period. Rather than discontinuing market coverage,
              our methodology incorporates structured procedures for producing responsible
              assessments under conditions of limited information. Where primary market evidence
              is insufficient, analysts evaluate multiple complementary sources, including:
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
                When the available evidence suggests directional market movement but remains
                insufficient to quantify that movement with confidence, analysts may determine
                that the previous reporting value remains the most reliable published estimate.
                In such circumstances, the previous value is intentionally carried forward and
                clearly identified as a continued benchmark rather than a newly calculated market
                estimate. This distinction is disclosed transparently within the published
                analysis.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BookOpenCheck size={20} className="text-purple-600" aria-hidden="true" /> 4.5 Final Review Prior to Publication
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Every market estimate, forecast, and analytical conclusion undergoes a formal
              quality assurance process before publication. The review consists of multiple
              independent stages designed to ensure methodological consistency, analytical
              accuracy, and evidential integrity:
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

          {/* ══════════ SECTION V ══════════ */}
          <section className="my-14" id="part-5">
            <PartHeading Icon={RefreshCw} accent="#d97706" eyebrow="Section V" title="Publication Governance, Corrections & Methodology Oversight" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              The final stage of the research lifecycle focuses on how market intelligence is
              communicated, maintained, and updated. This section establishes the standards
              governing publication, the procedures for correcting errors, and the framework used
              to review and refine the research methodology over time. These controls help
              ensure that every published output remains transparent, reliable, and consistent
              throughout its lifecycle.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.1 Publication & Disclosure Requirements</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Every published market study, forecast, or analytical deliverable is accompanied by
              sufficient methodological disclosure to enable users to understand the scope of the
              research and the basis on which conclusions have been reached. At a minimum, each
              publication includes the following information:
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
              Whenever expert judgement forms a significant component of the assessment — or
              where an earlier estimate has intentionally been carried forward — this is
              explicitly disclosed. The methodology underlying every published figure remains
              transparent and is never intentionally obscured.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.2 Error Management & Revision Policy</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Despite rigorous quality controls, situations may arise where published information
              requires correction. Our objective is to address material errors promptly,
              transparently, and in accordance with documented research procedures. A formal
              correction may be issued under circumstances including, but not limited to:
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
              Corrections are based exclusively on information that existed, or could reasonably
              have been obtained, during the original reporting period. Previously published
              research is not revised solely because additional information becomes available
              after the reporting window has officially closed — instead, newly available
              information is incorporated into subsequent reporting cycles where appropriate.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              Whenever a correction is issued, the element of the publication that has been
              amended, the reason for the revision, the effective date of the correction, and
              both the original and revised values are recorded and communicated. Correction
              notices remain permanently associated with the original publication to preserve
              historical transparency and provide a complete audit trail.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.3 Methodology Governance & Continuous Improvement</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Maintaining methodological consistency requires regular review and controlled
              evolution. This research framework is formally evaluated at least once every
              calendar year and may also be reviewed whenever significant structural developments
              occur within the industries covered by our research. These reviews are conducted
              jointly by the Research Team and the Methodology Committee, with feedback obtained
              where appropriate from clients, industry participants, academic experts, or other
              relevant stakeholders. Proposed changes affecting the research framework follow a
              structured governance process:
            </p>
            <ol className="space-y-3 mb-10">
              {methodologyChangeSteps.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--muted-foreground)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Every approved revision is recorded within the methodology revision history
              together with the implementation date and supporting rationale, ensuring
              consistency across reporting periods while allowing the methodology to evolve in
              response to changing market conditions and best research practices.
            </p>
          </section>

          {/* ══════════ SECTION VI ══════════ */}
          <section className="my-14" id="part-6">
            <PartHeading Icon={Scale} accent="#dc2626" eyebrow="Section VI" title="Research Integrity, Confidentiality & Governance" />
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              The credibility of market intelligence depends not only on analytical rigor but
              also on the ethical standards that govern the research process. This section
              defines the principles that safeguard research independence, protect confidential
              information, regulate the responsible use of artificial intelligence, and establish
              a structured mechanism for addressing client feedback or formal complaints.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <ShieldCheck size={20} className="text-red-600" aria-hidden="true" /> 6.1 Research Independence & Objectivity
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Maintaining independent and unbiased analysis is a fundamental principle of our
              research practice. To preserve the integrity of every market assessment, clear
              separation is maintained between research activities and commercial operations. The
              following principles apply across all published work:
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
              The long-term value of our research depends upon impartiality. Accordingly,
              protecting analytical independence remains a core organizational responsibility.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Lock size={20} className="text-red-600" aria-hidden="true" /> 6.2 Information Security & Source Protection
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
              Protecting confidential information is an essential component of the research
              process. All contributors providing information during the course of primary
              research are treated as confidential sources unless the information originates
              from publicly available documents or disclosures. Neither the identity of
              individual contributors nor the organizations supplying proprietary information is
              revealed within published reports, presentations, or client deliverables — research
              findings are presented only in aggregated or anonymized form to prevent
              identification of individual participants.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10">
              Research documentation, interview records, supporting datasets, and source
              information are maintained within secure systems protected through controlled
              access procedures. Only authorized research personnel may access identifiable
              contributor information where required for research purposes. To support future
              verification, quality assurance, and audit requirements, research records and
              supporting evidence are retained for a minimum period of five years in accordance
              with internal data governance policies.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Cpu size={20} className="text-red-600" aria-hidden="true" /> 6.3 Responsible Use of Artificial Intelligence
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Artificial intelligence can improve research efficiency but cannot replace
              validated market evidence or professional analytical judgement. Accordingly, the
              organization applies clear governance principles regarding the use of AI throughout
              the research process:
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
              These principles ensure that technological tools enhance — but never replace — the
              judgement, accountability, and verification responsibilities of experienced
              analysts.
            </p>

            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <MessageCircle size={20} className="text-red-600" aria-hidden="true" /> 6.4 Client Queries, Complaints & Review Procedure
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              We encourage clients, research contributors, and industry participants to seek
              clarification whenever questions arise regarding our research methodology or
              published findings. Requests may relate to matters including:
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
              All requests should be submitted in writing to the Head of Research. Upon receipt
              of a complaint or clarification request, acknowledgement will normally be provided
              within two business days, and a detailed response will ordinarily be issued within
              ten business days following initial review.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Where additional investigation is required due to the complexity of the issue, an
              interim progress update will be communicated within ten business days, with the
              objective of concluding the review and providing a final written response within
              thirty business days. If the requesting party believes that the matter has not been
              adequately resolved, the issue may be referred to senior management for an
              independent review. All complaints, clarification requests, investigative findings,
              and final resolutions are recorded within a centralized governance register,
              periodically reviewed by the organization&apos;s methodology oversight committee to
              identify recurring issues, improve research processes, and strengthen overall
              quality assurance.
            </p>
          </section>

        </Container>
      </Section>
    </>
  );
}
