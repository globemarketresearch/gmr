export interface LicenseTier {
  id: 'single' | 'multi' | 'corporate' | 'dataset';
  name: string;
  price: number;
  badge?: string;
  includes: string[];
  notIncluded?: string[];
}

export const LICENSE_TIERS: LicenseTier[] = [
  {
    id: 'single',
    name: 'Single User',
    price: 3199,
    includes: [
      'Single user access (1 device)',
      'PDF format',
      'Non-printable & non-shareable',
      'Email delivery within 24 hrs',
      'Analyst support (6 months)',
    ],
  },
  {
    id: 'multi',
    name: 'Multi User',
    price: 5599,
    includes: [
      'Up to 5 users',
      'PDF format (printable)',
      'Internal sharing permitted',
      'Email delivery within 24 hrs',
      'Analyst support (6 months)',
      'Free updates (1 year)',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    price: 6999,
    badge: 'Best Value',
    includes: [
      'Unlimited users (org-wide)',
      'PDF + Excel formats',
      'Printable & shareable internally',
      'Email delivery within 24 hrs',
      'Priority analyst support (1 year)',
      'Free updates (1 year)',
    ],
  },
  {
    id: 'dataset',
    name: 'Data Set (Excel)',
    price: 1690,
    includes: [
      'Excel data file (.xlsx)',
      'Market size & forecast data',
      'Fully editable raw data',
      'Single user access',
      'Email delivery within 24 hrs',
    ],
  },
];

export function getLicenseTierById(id: string): LicenseTier {
  return LICENSE_TIERS.find((t) => t.id === id) ?? LICENSE_TIERS[0];
}
