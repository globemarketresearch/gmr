export interface ServiceBenefit {
  title: string;
  desc: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceCapability {
  title: string;
  desc: string;
}

export type ServiceIconName =
  | "chart-bar"
  | "adjustments"
  | "rocket"
  | "briefcase"
  | "search-circle"
  | "eye"
  | "users";

export interface Service {
  id: number;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  overview: string;
  stats?: ServiceStat[];
  methodology?: string[];
  keyHighlights: string[];
  servicesInclude: string[];
  benefits: ServiceBenefit[];
  icon: ServiceIconName;
  /** "What is X?" explanatory section (GTM, White Space) */
  whatIs?: string;
  /** Closing "Why Choose GMR" summary paragraph */
  whyChooseSummary?: string;
  /** Rich capability cards replacing the plain servicesInclude list */
  capabilityDetails?: ServiceCapability[];
}
