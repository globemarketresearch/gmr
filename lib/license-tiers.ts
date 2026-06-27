export type LicenseTierId = 'single' | 'corporate' | 'excel' | 'student';
export type EditionId = 'global' | 'region' | 'country';

export interface LicenseTier {
  id: LicenseTierId;
  name: string;
  badge?: string;
  deliverables: string;
  includes: string[];
  commercials: string[];
  reportScope: string;
  countrySegmentation: string;
  isStudentTier?: boolean;
}

export interface Edition {
  id: EditionId;
  label: string;
  icon: string;
  prices: Record<LicenseTierId, number>;
  tiers: LicenseTier[];
}

const GLOBAL_TIERS: LicenseTier[] = [
  {
    id: 'single',
    name: 'Single User License',
    deliverables: 'PDF + Excel',
    reportScope: 'Competitive analysis, Technology readiness, 5 regions and 34 countries',
    countrySegmentation: 'Top 15 Countries, Segmentation Analysis',
    includes: [
      'Report accessible by 1 user only',
      'PDF + Excel formats',
      'Email delivery within 24 hrs',
    ],
    commercials: [
      'Free 15% or 32 hours of customisation',
      'Free post-sale service assistance',
      'Direct access to lead analysts – 4 hours free consultation',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate User License',
    badge: 'Most Popular',
    deliverables: 'PDF + Excel + PPT',
    reportScope: 'Competitive analysis, Technology readiness, 5 regions and 34 countries',
    countrySegmentation: 'Top 15 Countries, Segmentation Analysis',
    includes: [
      'Unlimited user access (within organization)',
      'PDF + Excel + PPT formats',
      'Email delivery within 24 hrs',
      'Exclusive previews of upcoming research',
      '15% discount on your next purchase',
    ],
    commercials: [
      'Free 30% or 64 hours of customisation',
      'Direct access to lead analysts – 8 hours free consultation',
    ],
  },
  {
    id: 'excel',
    name: 'Excel License',
    deliverables: 'Raw Data Workbook (.xlsx)',
    reportScope: 'Competitive analysis, Technology readiness, 5 regions and 34 countries',
    countrySegmentation: 'Top 15 Countries, Segmentation Analysis',
    includes: [
      'All Data Tables & Charts',
      'Granular Market Splits Included',
      'Full Data Customization',
      'Single user access',
      'Email delivery within 24 hrs',
    ],
    commercials: [],
  },
  {
    id: 'student',
    name: 'Student User License',
    deliverables: 'Academic Use Only',
    reportScope: 'Academic Use Only',
    countrySegmentation: 'Subject to university ID verification',
    isStudentTier: true,
    includes: [
      'Academic use only',
      'Specific data available for project usage',
      'Remaining data is confidential',
    ],
    commercials: [
      'Submit university ID to access',
      'Contact sales for specific data availability',
    ],
  },
];

const REGION_TIERS: LicenseTier[] = [
  {
    id: 'single',
    name: 'Single User License',
    deliverables: 'PDF + Excel',
    reportScope: 'Full breakdown of 1 Target Regional Zone',
    countrySegmentation: 'Regional segmentation analysis',
    includes: [
      'Report accessible by 1 user only',
      'PDF + Excel formats',
      'Email delivery within 24 hrs',
    ],
    commercials: [
      'Free 15% or 32 hours of customisation',
      'Direct access to lead analysts – 3 hours free consultation',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate User License',
    badge: 'Most Popular',
    deliverables: 'PDF + Excel + PPT',
    reportScope: 'Full breakdown of 1 Target Regional Zone',
    countrySegmentation: 'Regional segmentation analysis',
    includes: [
      'Unlimited Regional Sharing',
      'PDF + Excel + PPT formats',
      'Email delivery within 24 hrs',
    ],
    commercials: [
      'Free 30% or 64 hours of customisation',
      'Direct access to lead analysts – 6 hours free consultation',
    ],
  },
  {
    id: 'excel',
    name: 'Excel License',
    deliverables: 'Raw Data Workbook (.xlsx)',
    reportScope: 'Breakdown of 1 Target Regional Zone',
    countrySegmentation: 'Regional Data Tables & Charts',
    includes: [
      'Regional Data Tables & Charts',
      'Single user access',
      'Email delivery within 24 hrs',
    ],
    commercials: [],
  },
  {
    id: 'student',
    name: 'Student User License',
    deliverables: 'Academic Use Only',
    reportScope: 'Academic Use Only',
    countrySegmentation: 'Subject to university ID verification',
    isStudentTier: true,
    includes: [
      'Academic use only',
      'Specific data available for project usage',
      'Remaining data is confidential',
    ],
    commercials: [
      'Submit university ID to access',
      'Contact sales for specific data availability',
    ],
  },
];

const COUNTRY_TIERS: LicenseTier[] = [
  {
    id: 'single',
    name: 'Single User License',
    deliverables: 'PDF + Excel',
    reportScope: 'Isolated 1 Country Specific Data Matrix',
    countrySegmentation: 'Single country segmentation analysis',
    includes: [
      'Report accessible by 1 user only',
      'PDF + Excel formats',
      'Email delivery within 24 hrs',
    ],
    commercials: [
      'Free 15% or 32 hours of customisation',
      'Direct access to lead analysts – 3 hours free consultation',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate User License',
    badge: 'Most Popular',
    deliverables: 'PDF + Excel + PPT',
    reportScope: 'Isolated 1 Country Specific Data Matrix',
    countrySegmentation: 'Single country segmentation analysis',
    includes: [
      'Enterprise-wide Country sharing',
      'PDF + Excel + PPT formats',
      'Email delivery within 24 hrs',
    ],
    commercials: [
      'Free 30% or 64 hours of customisation',
      'Direct access to lead analysts – 6 hours free consultation',
    ],
  },
  {
    id: 'excel',
    name: 'Excel License',
    deliverables: 'Raw Data Workbook (.xlsx)',
    reportScope: 'Isolated 1 Country Specific Data Matrix',
    countrySegmentation: 'Single Country Tables & Charts',
    includes: [
      'Single Country Tables & Charts',
      'Single user access',
      'Email delivery within 24 hrs',
    ],
    commercials: [],
  },
  {
    id: 'student',
    name: 'Student User License',
    deliverables: 'Academic Use Only',
    reportScope: 'Academic Use Only',
    countrySegmentation: 'Subject to university ID verification',
    isStudentTier: true,
    includes: [
      'Academic use only',
      'Specific data available for project usage',
      'Remaining data is confidential',
    ],
    commercials: [
      'Submit university ID to access',
      'Contact sales for specific data availability',
    ],
  },
];

export const EDITIONS: Edition[] = [
  {
    id: 'global',
    label: 'Global Coverage',
    icon: '🌐',
    prices: { single: 3499, corporate: 5449, excel: 1799, student: 799 },
    tiers: GLOBAL_TIERS,
  },
  {
    id: 'region',
    label: 'Regional Coverage',
    icon: '🗺️',
    prices: { single: 2999, corporate: 4199, excel: 1499, student: 699 },
    tiers: REGION_TIERS,
  },
  {
    id: 'country',
    label: 'Country Coverage',
    icon: '📍',
    prices: { single: 1999, corporate: 2690, excel: 990, student: 499 },
    tiers: COUNTRY_TIERS,
  },
];

// Backward-compatible flat tier list (Global edition prices) for checkout components
export interface LicenseTierFlat extends LicenseTier {
  price: number;
}

export const LICENSE_TIERS: LicenseTierFlat[] = EDITIONS[0].tiers.map((tier) => ({
  ...tier,
  price: EDITIONS[0].prices[tier.id],
}));

export function getLicenseTierById(id: string): LicenseTierFlat {
  return LICENSE_TIERS.find((t) => t.id === id) ?? LICENSE_TIERS[0];
}
