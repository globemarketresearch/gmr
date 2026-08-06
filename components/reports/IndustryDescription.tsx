"use client";

import { useState } from "react";
import categories from "@/data/categories.json";
import { INDUSTRY_MORE } from "@/data/industry-more";

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

  const toggleIndustry = (slug: string) => {
    setExpandedIndustries((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <section className="border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
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
              {categories.map((category) => {
                const isOpen = !!expandedIndustries[category.slug];
                const more = INDUSTRY_MORE[category.slug];
                return (
                  <div key={category.slug}>
                    <h4 className="font-semibold text-[var(--foreground)] mb-1">
                      {category.name}
                    </h4>
                    <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
                      {category.description}
                    </p>
                    {more && (
                      <>
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isOpen ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            {more.split("\n\n").map((para, i) => (
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
                          onClick={() => toggleIndustry(category.slug)}
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
                      </>
                    )}
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
