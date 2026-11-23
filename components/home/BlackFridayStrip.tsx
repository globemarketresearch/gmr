import Link from 'next/link';
import { Container } from '@/components/ui';
import { BLACK_FRIDAY_PROMO, isBlackFridayActive } from '@/lib/promotions';

export default function BlackFridayStrip() {
  if (!isBlackFridayActive()) return null;

  const { discountPercent, displayEndDateShort, ctaHref } = BLACK_FRIDAY_PROMO;

  return (
    <div className="bg-[var(--muted)] pt-8">
      <Container size="xl">
        <Link
          href={ctaHref}
          aria-label={`Black Friday Sale: save up to ${discountPercent} on market research reports. Ends ${displayEndDateShort}. Contact us.`}
          className="group block rounded-xl bg-[#1a1a1a] px-4 py-3 sm:px-6 sm:py-3.5 shadow-md transition-all duration-200 hover:bg-black hover:shadow-lg"
        >
          <p className="text-center font-bold leading-snug text-white text-sm sm:text-base lg:text-lg">
            <span className="whitespace-nowrap">BLACK FRIDAY SALE</span>
            <span className="mx-2 text-white/70">|</span>
            <span>
              Save Up to <span className="text-[#facc15] text-base sm:text-lg lg:text-xl">{discountPercent}</span>
              <span className="hidden lg:inline"> on Market Research Reports</span>
            </span>
            <span className="hidden sm:inline mx-2 text-white/70">|</span>
            <span className="block sm:inline mt-0.5 sm:mt-0 text-[#facc15] whitespace-nowrap">
              Ends {displayEndDateShort}
            </span>
          </p>
        </Link>
      </Container>
    </div>
  );
}
