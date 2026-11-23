import React from 'react';
import Link from 'next/link';
import { BLACK_FRIDAY_PROMO } from '@/lib/promotions';

interface BlackFridayCardProps {
  /** `sidebar`: stacked card for the desktop right rail. `inline`: compact banner for mobile/tablet. */
  variant?: 'sidebar' | 'inline';
}

/**
 * Black Friday offer block. Visibility (expiry) is decided by the server page
 * and passed down, so this component always renders when mounted.
 */
export const BlackFridayCard: React.FC<BlackFridayCardProps> = ({ variant = 'sidebar' }) => {
  const { year, discountText, displayEndDateLong, ctaHref, ctaLabel } = BLACK_FRIDAY_PROMO;

  if (variant === 'inline') {
    return (
      <div className="rounded-xl bg-[#0b2a5b] px-4 py-4 sm:px-6 text-center shadow-sm">
        <span className="inline-block rounded-full bg-[#22d3ee] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0b2a5b]">
          Limited Time Offer
        </span>
        <p className="mt-2 text-lg sm:text-xl font-extrabold uppercase leading-tight text-white">
          Black Friday Sale {year}
        </p>
        <p className="mt-0.5 text-2xl sm:text-3xl font-extrabold leading-tight text-[#22d3ee]">{discountText}</p>
        <p className="mt-1 text-xs sm:text-sm text-white/85">
          Market Research Reports, Industry Insights &amp; Custom Research Services
        </p>
        <Link
          href={ctaHref}
          className="mt-3 inline-block w-full sm:w-auto rounded-lg bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] px-5 py-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
        >
          {ctaLabel}
        </Link>
        <p className="mt-2 text-[11px] text-white/75">
          Offer Ends {displayEndDateLong} &bull; Terms Apply
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#0b2a5b] px-4 py-4 text-center shadow-sm">
      <span className="inline-block rounded-full bg-[#22d3ee] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0b2a5b]">
        Limited Time Offer
      </span>
      <p className="mt-2.5 text-lg 2xl:text-xl font-extrabold uppercase leading-tight text-white">
        Black Friday Sale {year}
      </p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-white/90">Exclusive Research Offers</p>
      <p className="mt-1 text-[1.65rem] 2xl:text-3xl font-extrabold leading-tight text-[#22d3ee]">{discountText}</p>
      <p className="mt-1 text-xs leading-snug text-white/85">
        Market Research Reports, Industry Insights &amp; Custom Research Services
      </p>
      <Link
        href={ctaHref}
        className="mt-3 block rounded-lg bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] px-3 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-md transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
      >
        {ctaLabel}
      </Link>
      <p className="mt-2 text-[10.5px] text-white/75">
        Offer Ends {displayEndDateLong} &bull; Terms Apply
      </p>
    </div>
  );
};

export default BlackFridayCard;
