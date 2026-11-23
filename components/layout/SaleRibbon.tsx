import Link from "next/link";
import { cn } from "@/lib/utils";
import { YEAR_END_SALE_PROMO, isYearEndSaleActive, type SaleRibbonAnchor } from "@/lib/promotions";

/**
 * "YEAR END SALE" ribbon. Renders only where `YEAR_END_SALE_PROMO.anchor`
 * matches `anchor`, so moving it between header items is a one-line config change.
 * The parent element must be `position: relative`.
 */
export default function SaleRibbon({ anchor }: { anchor: SaleRibbonAnchor }) {
  if (YEAR_END_SALE_PROMO.anchor !== anchor || !isYearEndSaleActive()) return null;

  return (
    <Link
      href={YEAR_END_SALE_PROMO.ctaHref}
      className={cn("sale-ribbon", anchor === "contact" && "sale-ribbon--contact")}
      aria-label={`${YEAR_END_SALE_PROMO.label}: contact us for year end offers`}
    >
      {YEAR_END_SALE_PROMO.label}
    </Link>
  );
}
