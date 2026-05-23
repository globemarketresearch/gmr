export interface ServiceBenefit {
  title: string;
  desc: string;
}

export interface ServiceStat {
  value: string;
  label: string;
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
}
