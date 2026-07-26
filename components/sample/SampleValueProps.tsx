import { Card, CardContent } from "@/components/ui";

const REASONS: { title: string; description: string }[] = [
  {
    title: "Research Quality Assurance",
    description: "Review the structure, data and analysis before purchasing.",
  },
  {
    title: "Confirm Relevance",
    description: "Ensure the report covers your market, segments and business requirements.",
  },
  {
    title: "Evaluate the Research Methodology",
    description: "Review the data sources, assumptions and methods used to estimate the market size.",
  },
  {
    title: "Free Customization",
    description: "Get the report tailored to your exact needs at no extra cost.",
  },
  {
    title: "Speak With Expert Consultation",
    description: "Get a free 30-minute consultation to discuss the report scope and your research objectives.",
  },
  {
    title: "No Obligation",
    description: "Requesting a sample does not require you to buy the full report.",
  },
];

const INCLUSIONS: { title: string; description: string }[] = [
  {
    title: "Report Overview",
    description: "A clear introduction to the market, its definition and study coverage.",
  },
  {
    title: "Market Segmentation",
    description: "Detailed coverage of key segments, sub-segments, regions and countries.",
  },
  {
    title: "Research Scope",
    description: "Selected quantitative data, qualitative insights and market trends included in the full report.",
  },
  {
    title: "Report Structure",
    description: "A preview of how market data, charts, tables and analyst insights are presented.",
  },
  {
    title: "Key Findings",
    description: "Market size estimates, growth rate, leading region and dominant segment.",
  },
  {
    title: "Chapter Index",
    description: "An overview of the data, analysis and insights covered in each chapter.",
  },
  {
    title: "Research Methodology",
    description: "A summary of the data collection, validation and market estimation process.",
  },
];

function CheckMark() {
  return (
    <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export function WhyRequestSample() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-4">
          Why Request a Sample?
        </h2>
        <ul className="space-y-3.5">
          {REASONS.map((item) => (
            <li key={item.title} className="flex items-start gap-2.5">
              <CheckMark />
              <p className="text-sm leading-snug text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">{item.title}:</span>{" "}
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function SampleInclusionsSidebar() {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-[var(--text-primary)] mb-5">
        What&apos;s included in this sample?
      </h2>
      <ul className="space-y-5">
        {INCLUSIONS.map((item) => (
          <li key={item.title} className="flex items-start gap-2.5">
            <CheckMark />
            <p className="text-sm leading-snug text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">{item.title}:</span>{" "}
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SampleInclusions() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-1">
          What&apos;s included in this sample?
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-5">
          Every sample is a curated extract of the full report, so you know exactly what you are buying.
        </p>
        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {INCLUSIONS.map((item) => (
            <li key={item.title} className="flex items-start gap-2.5">
              <CheckMark />
              <p className="text-sm leading-snug text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">{item.title}:</span>{" "}
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
