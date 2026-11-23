/**
 * Site-wide promotional campaigns (frontend only — no pricing/checkout impact).
 *
 * `displayEndDate` is what visitors see on the banners.
 * `expiresAt` is when the banners actually stop rendering (may be later than the displayed date).
 */
export const BLACK_FRIDAY_PROMO = {
  enabled: true,
  year: 2026,
  discountText: 'UP TO 25% OFF',
  discountPercent: '25%',
  displayEndDateShort: 'Nov 30, 2026',
  displayEndDateLong: '30 November 2026',
  // Banners auto-hide after end of day 5 Dec 2026 (IST).
  expiresAt: '2026-12-05T23:59:59+05:30',
  ctaHref: '/contact',
  ctaLabel: 'Explore Black Friday Deals',
} as const;

export function isBlackFridayActive(now: Date = new Date()): boolean {
  return BLACK_FRIDAY_PROMO.enabled && now.getTime() <= new Date(BLACK_FRIDAY_PROMO.expiresAt).getTime();
}

/** Header item the sale ribbon hangs from. */
export type SaleRibbonAnchor = 'cta' | 'contact';

/**
 * "YEAR END SALE" ribbon that hangs from a header item (desktop only).
 * `anchor`: 'cta' = under "Request Custom Research", 'contact' = under the "Contact" nav link.
 * Set `enabled: false` to remove it immediately; otherwise it auto-hides after `expiresAt`.
 */
export const YEAR_END_SALE_PROMO = {
  enabled: true,
  label: 'Year End Sale',
  anchor: 'cta' as SaleRibbonAnchor,
  // Ribbon auto-hides after end of day 31 Dec 2026 (IST).
  expiresAt: '2026-12-31T23:59:59+05:30',
  ctaHref: '/contact',
} as const;

export function isYearEndSaleActive(now: Date = new Date()): boolean {
  return YEAR_END_SALE_PROMO.enabled && now.getTime() <= new Date(YEAR_END_SALE_PROMO.expiresAt).getTime();
}
