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
