"use client";

import { useState } from "react";

const INDUSTRIES = [
  {
    name: "Aerospace and Defense",
    desc: "Research in this category covers aircraft systems, military technologies, space infrastructure, defense electronics, unmanned systems, cybersecurity, protective equipment, communication systems, and related services. The reports examine procurement trends, technology development, government programs, supply-chain conditions, international partnerships, and changing security requirements.",
  },
  {
    name: "Agriculture",
    desc: "Agriculture reports cover farming technologies, seeds, fertilizers, crop protection, irrigation, agricultural machinery, biological products, precision farming, indoor agriculture, and food production systems. The research evaluates farming practices, climate-related risks, government support, technology adoption, food security, and agricultural supply chains.",
  },
  {
    name: "Automotive and Transportation",
    desc: "This category includes electric vehicles, vehicle components, mobility services, charging infrastructure, autonomous driving, connected vehicles, commercial transport, aftermarket products, and logistics technologies. Reports assess changing customer preferences, emission regulations, vehicle production, new mobility models, software integration, and transportation infrastructure.",
  },
  {
    name: "Chemicals and Materials",
    desc: "Chemical and material reports cover specialty chemicals, industrial chemicals, advanced materials, polymers, coatings, composites, adhesives, metals, construction materials, and sustainable alternatives. The analysis includes raw material conditions, production processes, end-use demand, regulatory requirements, environmental concerns, pricing factors, and supply-chain developments.",
  },
  {
    name: "Consumer Goods",
    desc: "Consumer research covers personal care, home products, clothing, household goods, lifestyle products, sports goods, digital consumer services, and retail categories. The reports study purchasing behavior, product innovation, brand positioning, online sales, distribution channels, sustainability preferences, and demographic changes.",
  },
  {
    name: "Energy and Power",
    desc: "Energy research includes renewable energy, conventional power, batteries, energy storage, smart grids, transmission systems, hydrogen, charging infrastructure, and energy-management technologies. Reports examine investment activity, energy policies, technology improvements, infrastructure requirements, power demand, and the transition toward lower-emission energy systems.",
  },
  {
    name: "Food and Beverages",
    desc: "This category covers packaged food, functional food, beverages, ingredients, food processing, alternative proteins, foodservice products, nutrition, and food packaging. The research considers health preferences, convenience demand, product formulation, distribution changes, food safety, regulatory requirements, and changing consumption patterns.",
  },
  {
    name: "Healthcare and Pharmaceuticals",
    desc: "Healthcare reports cover medical devices, pharmaceuticals, biotechnology, diagnostics, digital health, hospital services, therapeutics, clinical technologies, and patient-care solutions. The studies evaluate disease burden, treatment adoption, product development, reimbursement, healthcare spending, regulatory approvals, and changing patient needs.",
  },
  {
    name: "Information and Technology",
    desc: "Technology research covers artificial intelligence, cloud computing, cybersecurity, software, data centers, automation, digital platforms, enterprise applications, and communication technologies. Reports explain technology adoption, business use cases, investment priorities, data requirements, security concerns, regulation, and changes in enterprise operations.",
  },
  {
    name: "Manufacturing and Construction",
    desc: "This category includes industrial equipment, factory automation, robotics, construction technologies, machinery, tools, building systems, and infrastructure materials. The research examines production activity, equipment replacement, automation, labor availability, infrastructure development, operational efficiency, and industrial investment.",
  },
  {
    name: "Packaging",
    desc: "Packaging reports cover flexible packaging, rigid packaging, paper-based products, containers, labels, protective materials, food packaging, healthcare packaging, and smart packaging. The analysis focuses on material selection, waste reduction, product safety, shelf life, transport requirements, recycling, and environmental regulations.",
  },
  {
    name: "Semiconductor and Electronics",
    desc: "Semiconductor and electronics research covers chips, sensors, memory, processors, electronic components, manufacturing equipment, displays, power electronics, and connected devices. Reports assess production capacity, chip demand, technology cycles, manufacturing processes, supply-chain concentration, government support, and applications across major industries.",
  },
];

const PRIMARY_RESEARCH = [
  "Manufacturers",
  "Suppliers",
  "Distributors",
  "Technology providers",
  "Industry consultants",
  "Senior executives",
  "Product managers",
  "Sales professionals",
  "End users",
  "Subject specialists",
];

const SECONDARY_RESEARCH = [
  "Company annual reports",
  "Investor presentations",
  "Government publications",
  "Regulatory documents",
  "Industry associations",
  "Trade publications",
  "Scientific studies",
  "Patent information",
  "Company websites",
  "Public databases",
];

export default function IndustryDescription() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <h2 className="text-2xl font-bold text-[var(--teal-deep)] mb-3">
          Global Market Research Reports
        </h2>
        <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">
          Explore detailed market research reports designed to support business planning,
          investment analysis, product development, market entry, and competitive strategy.
          Our report store covers established industries, fast-growing technologies, emerging
          business models, and changing customer needs.
        </p>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          Each report brings together market trends, industry developments, competitive
          activity, regulatory factors, regional conditions, and future opportunities in one
          structured document. Whether you are evaluating a new market, planning an expansion,
          studying competitors, or preparing an investment strategy, our reports provide the
          information needed to make better-informed decisions.
        </p>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            expanded ? "grid-rows-[1fr] mt-6" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <h3 className="text-xl font-bold text-[var(--teal-deep)] mb-4">
              Industries Covered
            </h3>
            <div className="space-y-4 mb-10">
              {INDUSTRIES.map((industry) => (
                <div key={industry.name}>
                  <h4 className="font-semibold text-[var(--foreground)] mb-1">
                    {industry.name}
                  </h4>
                  <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
                    {industry.desc}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-[var(--teal-deep)] mb-3">
              Our Research Approach
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 text-sm">
              Every market is studied through a structured research process. The process
              begins with a clear definition of the market, including the products, services,
              technologies, applications, customers, and regions included in the study.
              Information is then collected from reliable public sources, company publications,
              regulatory documents, industry associations, trade databases, interviews, and
              other relevant materials. The findings are reviewed and compared across several
              sources to identify differences, missing information, and important market
              signals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-2">
                  Primary Research
                </h4>
                <p className="text-[var(--muted-foreground)] text-sm mb-2">
                  Primary research may include discussions with:
                </p>
                <ul className="text-[var(--muted-foreground)] text-sm leading-relaxed list-disc pl-5 space-y-0.5">
                  {PRIMARY_RESEARCH.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-2">
                  Secondary Research
                </h4>
                <p className="text-[var(--muted-foreground)] text-sm mb-2">
                  Secondary research may include:
                </p>
                <ul className="text-[var(--muted-foreground)] text-sm leading-relaxed list-disc pl-5 space-y-0.5">
                  {SECONDARY_RESEARCH.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-1">
                  Top-Down Assessment
                </h4>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Globe Market Research applies a top-down assessment to understand the overall
                  size and structure of a market before analyzing individual segments. The
                  process begins by evaluating the broader industry using publicly available
                  information, government statistics, industry associations, company reports,
                  and macroeconomic indicators. The market is then divided into regions, product
                  categories, applications, and end users to develop a consistent market
                  framework. This approach helps ensure that every segment aligns with the
                  overall market environment.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-1">
                  Bottom-Up Assessment
                </h4>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  The bottom-up assessment focuses on building market estimates from individual
                  companies, products, technologies, production capacity, customer demand, and
                  end-use industries. Our analysts review company revenues, product portfolios,
                  production volumes, pricing trends, distribution channels, and industry
                  activity to estimate the contribution of individual market participants.
                  These findings are combined to develop comprehensive market estimates and to
                  identify growth opportunities across different segments and regions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-1">
                  Data Validation
                </h4>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  At Globe Market Research, every market estimate is validated through a
                  structured review process. Information collected from primary interviews is
                  compared with secondary research, industry publications, regulatory
                  databases, company disclosures, trade statistics, and reliable public sources.
                  Multiple data points are cross-checked to identify inconsistencies and improve
                  accuracy. This validation process helps ensure that the final research
                  reflects dependable, well-supported market intelligence.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-1">
                  Analyst Review
                </h4>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Before publication, every report undergoes a detailed review by experienced
                  market research analysts. The review focuses on data consistency, research
                  methodology, market assumptions, segmentation, regional analysis, and industry
                  developments. Analysts verify that the findings are logical, supported by
                  credible evidence, and aligned with current market conditions. This final
                  quality review helps deliver clear, accurate, and business-focused insights
                  that support strategic decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-[var(--primary)] hover:opacity-80 transition-opacity"
        >
          {expanded ? "Read Less" : "Read More"}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
