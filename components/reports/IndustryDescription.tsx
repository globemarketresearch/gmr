"use client";

import { useState } from "react";

const INDUSTRIES = [
  {
    name: "Aerospace and Defense",
    desc: "Research in this category covers aircraft systems, military technologies, space infrastructure, defense electronics, unmanned systems, cybersecurity, protective equipment, communication systems, and related services. The reports examine procurement trends, technology development, government programs, supply-chain conditions, international partnerships, and changing security requirements.",
    more: "Global military expenditure reached USD 2.887 trillion in 2025, increasing by 2.9% in real terms. Commercial aviation also remained active, with global passenger traffic increasing by 5.3% during 2025. These developments are supporting demand for aircraft components, avionics, maintenance services, autonomous platforms, secure communication systems, and domestic defence production capacity.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the aerospace and defence industry in evaluating procurement trends, technology developments, regulatory requirements, competitive strategies, and emerging investment opportunities.",
  },
  {
    name: "Agriculture",
    desc: "Agriculture reports cover farming technologies, seeds, fertilizers, crop protection, irrigation, agricultural machinery, biological products, precision farming, indoor agriculture, and food production systems. The research evaluates farming practices, climate-related risks, government support, technology adoption, food security, and agricultural supply chains.",
    more: "The latest global land and water assessment reports that more than 60% of human-induced land degradation occurs on agricultural land. Agriculture also accounts for more than 70% of global freshwater withdrawals. These pressures are increasing demand for precision irrigation, biological crop inputs, drought-resistant seeds, soil monitoring, satellite-based farm management, efficient machinery, and climate-resilient production systems.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the agriculture industry in analysing crop production, input demand, farm technologies, climate risks, agricultural trade, and productivity improvement opportunities.",
  },
  {
    name: "Automotive and Transportation",
    desc: "This category includes electric vehicles, vehicle components, mobility services, charging infrastructure, autonomous driving, connected vehicles, commercial transport, aftermarket products, and logistics technologies. Reports assess changing customer preferences, emission regulations, vehicle production, new mobility models, software integration, and transportation infrastructure.",
    more: "More than 20 million electric cars were sold worldwide in 2025, representing growth of approximately 20% compared with 2024. Electric-car sales are expected to reach around 23 million units in 2026, accounting for approximately 28% of global car sales. Electrification is increasing investment in batteries, charging networks, power electronics, vehicle software, thermal management, and recycling systems.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the automotive and transportation industry in understanding vehicle demand, electrification trends, mobility technologies, supply-chain changes, and regional growth opportunities.",
  },
  {
    name: "Chemicals and Materials",
    desc: "Chemical and material reports cover specialty chemicals, industrial chemicals, advanced materials, polymers, coatings, composites, adhesives, metals, construction materials, and sustainable alternatives. The analysis includes raw material conditions, production processes, end-use demand, regulatory requirements, environmental concerns, pricing factors, and supply-chain developments.",
    more: "Global chemical production increased by approximately 3.6% in 2025, supported by manufacturing activity and expanding chemical output in Asia. The industry is increasingly focused on low-carbon production, process electrification, recycled materials, safer formulations, bio-based feedstocks, and efficient resource use. Demand is also being influenced by semiconductor manufacturing, batteries, healthcare, construction, automotive production, and renewable energy infrastructure.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the chemicals and materials industry in assessing raw-material availability, production trends, regulatory changes, product innovation, and end-use demand.",
  },
  {
    name: "Consumer Goods",
    desc: "Consumer research covers personal care, home products, clothing, household goods, lifestyle products, sports goods, digital consumer services, and retail categories. The reports study purchasing behavior, product innovation, brand positioning, online sales, distribution channels, sustainability preferences, and demographic changes.",
    more: "Digital purchasing continues to influence product discovery and sales. In the United States, retail e-commerce sales reached a seasonally adjusted USD 326.7 billion in the first quarter of 2026, increasing by 9.8% year over year. Online sales accounted for 16.9% of total retail sales. This shift is increasing the importance of digital storefronts, personalised promotions, direct-to-consumer channels, rapid fulfilment, and consistent customer experiences.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the consumer goods industry in analysing customer behaviour, product demand, pricing strategies, retail channels, brand positioning, and competitive developments.",
  },
  {
    name: "Energy and Power",
    desc: "Energy research includes renewable energy, conventional power, batteries, energy storage, smart grids, transmission systems, hydrogen, charging infrastructure, and energy-management technologies. Reports examine investment activity, energy policies, technology improvements, infrastructure requirements, power demand, and the transition toward lower-emission energy systems.",
    more: "Global electricity generation increased by more than 850 terawatt-hours in 2025. Low-emission sources, including renewable and nuclear energy, provided 43% of global electricity, while renewables alone represented 34%. Global energy investment is expected to reach approximately USD 3.4 trillion in 2026, including around USD 2.2 trillion for clean energy, grids, storage, efficiency, electrification, and low-emission fuels.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the energy and power industry in evaluating electricity demand, generation capacity, renewable energy investment, grid development, regulation, and energy security.",
  },
  {
    name: "Food and Beverages",
    desc: "This category covers packaged food, functional food, beverages, ingredients, food processing, alternative proteins, foodservice products, nutrition, and food packaging. The research considers health preferences, convenience demand, product formulation, distribution changes, food safety, regulatory requirements, and changing consumption patterns.",
    more: "Food affordability and supply security remain important industry considerations. In 2025, approximately 266 million people across 47 countries and territories experienced high levels of acute food insecurity. Around 35.5 million children were acutely malnourished, including nearly 10 million children experiencing severe acute malnutrition. These conditions highlight the importance of resilient food production, nutritional products, affordable formulations, secure supply chains, and reduced food loss.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the food and beverages industry in evaluating consumption patterns, product innovation, ingredient demand, distribution channels, and food safety requirements.",
  },
  {
    name: "Healthcare and Pharmaceuticals",
    desc: "Healthcare reports cover medical devices, pharmaceuticals, biotechnology, diagnostics, digital health, hospital services, therapeutics, clinical technologies, and patient-care solutions. The studies evaluate disease burden, treatment adoption, product development, reimbursement, healthcare spending, regulatory approvals, and changing patient needs.",
    more: "The World Health Statistics 2026 report identified significant gaps in health information systems. At the end of 2025, only 18% of countries were reporting mortality data within one year, while approximately one-third had never reported cause-of-death data. These limitations are increasing the need for digital health records, connected diagnostics, healthcare analytics, interoperable systems, and stronger public-health data infrastructure.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the healthcare and pharmaceuticals industry in assessing treatment demand, product pipelines, regulatory requirements, technology adoption, and competitive positioning.",
  },
  {
    name: "Information and Technology",
    desc: "Technology research covers artificial intelligence, cloud computing, cybersecurity, software, data centers, automation, digital platforms, enterprise applications, and communication technologies. Reports explain technology adoption, business use cases, investment priorities, data requirements, security concerns, regulation, and changes in enterprise operations.",
    more: "Approximately 6 billion people, equal to 74% of the global population, used the internet in 2025. The online population increased by more than 240 million people during the year. More than half of the global population was covered by 5G networks, although significant gaps remained in affordability, digital skills, and connectivity quality. These developments are supporting cloud services, artificial intelligence, cybersecurity, data-centre infrastructure, and enterprise software adoption.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the information technology industry in understanding software adoption, artificial intelligence developments, cloud migration, cybersecurity needs, and digital infrastructure investment.",
  },
  {
    name: "Manufacturing and Construction",
    desc: "This category includes industrial equipment, factory automation, robotics, construction technologies, machinery, tools, building systems, and infrastructure materials. The research examines production activity, equipment replacement, automation, labor availability, infrastructure development, operational efficiency, and industrial investment.",
    more: "Global manufacturing production increased by 1.2% quarter over quarter in the first quarter of 2026, while manufactured exports expanded by 3.5%. Higher-technology manufacturing exports grew by 4.7%. Buildings and construction represent approximately 11% to 13% of global GDP and employ around 9% of the global workforce, showing the category's importance to industrial investment and employment.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the manufacturing and construction industry in evaluating production capacity, infrastructure investment, automation trends, project demand, and operational risks.",
  },
  {
    name: "Packaging",
    desc: "Packaging reports cover flexible packaging, rigid packaging, paper-based products, containers, labels, protective materials, food packaging, healthcare packaging, and smart packaging. The analysis focuses on material selection, waste reduction, product safety, shelf life, transport requirements, recycling, and environmental regulations.",
    more: "Global plastic consumption was expected to reach approximately 516 million tonnes in 2025. Packaging represents around 31% of plastics produced and accounts for approximately 50% of plastic waste. These figures are increasing pressure on manufacturers to adopt recyclable mono-materials, fibre-based alternatives, recycled content, lightweight designs, reusable systems, and improved collection and recovery processes.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the packaging industry in assessing material demand, sustainability requirements, recycling regulations, product innovation, and changing end-user needs.",
  },
  {
    name: "Semiconductor and Electronics",
    desc: "Semiconductor and electronics research covers chips, sensors, memory, processors, electronic components, manufacturing equipment, displays, power electronics, and connected devices. Reports assess production capacity, chip demand, technology cycles, manufacturing processes, supply-chain concentration, government support, and applications across major industries.",
    more: "Worldwide semiconductor sales reached USD 120.6 billion in May 2026, increasing by 9.2% from April 2026 and 104.1% from May 2025. Demand is being driven by artificial intelligence infrastructure, data centres, high-performance computing, automotive electronics, industrial automation, smartphones, and connected devices. Advanced packaging, high-bandwidth memory, power semiconductors, and specialised AI processors are becoming important investment areas.\n\nAt Globe Market Research, we offer comprehensive studies to aid organizations operating in the semiconductor and electronics industry in understanding technology developments, manufacturing capacity, component demand, supply-chain risks, and investment opportunities.",
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
  const [expandedIndustries, setExpandedIndustries] = useState<Record<string, boolean>>({});

  const toggleIndustry = (name: string) => {
    setExpandedIndustries((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section className="border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* <h2 className="text-2xl font-bold text-[var(--teal-deep)] mb-3">
          Global Market Research Reports
        </h2> */}
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
              {INDUSTRIES.map((industry) => {
                const isOpen = !!expandedIndustries[industry.name];
                return (
                  <div key={industry.name}>
                    <h4 className="font-semibold text-[var(--foreground)] mb-1">
                      {industry.name}
                    </h4>
                    <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
                      {industry.desc}
                    </p>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {industry.more.split("\n\n").map((para, i) => (
                          <p
                            key={i}
                            className="text-[var(--muted-foreground)] leading-relaxed text-sm mb-2 last:mb-0"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleIndustry(industry.name)}
                      aria-expanded={isOpen}
                      className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold text-[var(--primary)] hover:opacity-80 transition-opacity"
                    >
                      {isOpen ? "Read Less" : "Read More"}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                );
              })}
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
