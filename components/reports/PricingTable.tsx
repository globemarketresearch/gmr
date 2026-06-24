'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EDITIONS, type EditionId, type LicenseTier } from '@/lib/license-tiers';

interface PricingTableProps {
  reportTitle: string;
  reportId?: number;
  reportSlug?: string;
  onBack: () => void;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#0284c7' }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Accordion({ label, children, defaultOpen = false }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-gray-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 px-0 text-left"
      >
        <span className="text-sm font-medium text-[#1a3a5c]">{label}</span>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

function LicenseCard({
  tier,
  price,
  reportId,
  reportSlug,
  isFeatured,
}: {
  tier: LicenseTier;
  price: number;
  reportId?: number;
  reportSlug?: string;
  isFeatured: boolean;
}) {
  const checkoutHref = tier.isStudentTier
    ? '/contact?subject=Student+License+Request'
    : reportId
    ? `/checkout/${reportId}?license=${tier.id}`
    : reportSlug
    ? `/checkout/${reportSlug}?license=${tier.id}`
    : '/contact';

  const buyLabel = tier.isStudentTier
    ? 'Contact Sales'
    : `Buy Now — ${tier.name.split(' ')[0]}`;

  return (
    <div
      className={`relative flex flex-col rounded-xl border-2 overflow-hidden transition-shadow ${
        isFeatured
          ? 'border-[#1a3a8f] shadow-lg shadow-blue-100'
          : 'border-gray-200 shadow-sm'
      }`}
    >
      {/* Most Popular badge */}
      {tier.badge && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-b-lg">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {tier.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div
        className={`px-5 pt-7 pb-4 text-center ${
          isFeatured
            ? 'bg-gradient-to-br from-[#1a3a8f] to-[#0284c7] text-white'
            : 'bg-white'
        }`}
      >
        <h3 className={`text-base font-semibold ${isFeatured ? 'text-white' : 'text-[#1a3a5c]'}`}>
          {tier.name}
        </h3>
        <div className="mt-3">
          <span className={`text-3xl font-bold ${isFeatured ? 'text-white' : 'text-[#0f2236]'}`}>
            ${price.toLocaleString()}.00
          </span>
        </div>
        <p className={`text-xs mt-1 ${isFeatured ? 'text-blue-100' : 'text-gray-500'}`}>
          {tier.deliverables}
        </p>
      </div>

      {/* Accordions */}
      <div className="flex-1 px-5 bg-white">
        <Accordion label="Data Included" defaultOpen>
          <div className="space-y-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7] mb-0.5">Report Scope</p>
              <p className="text-xs text-gray-600">{tier.reportScope}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7] mb-0.5">Country-Level Segmentation</p>
              <p className="text-xs text-gray-600">{tier.countrySegmentation}</p>
            </div>
          </div>
        </Accordion>

        <Accordion label="Access & Deliverables">
          <ul className="space-y-1.5">
            {tier.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Accordion>

        {(tier.commercials.length > 0) && (
          <Accordion label="Commercials">
            <ul className="space-y-1.5">
              {tier.commercials.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 pt-4 bg-white">
        <Link href={checkoutHref}>
          <button
            type="button"
            className={`w-full py-3 rounded-lg text-sm font-semibold transition-all duration-150 ${
              isFeatured
                ? 'bg-gradient-to-r from-[#1a3a8f] to-[#0284c7] text-white hover:opacity-90 shadow-md'
                : 'bg-[#1a3a8f] text-white hover:bg-[#0284c7]'
            }`}
          >
            {buyLabel}
          </button>
        </Link>
      </div>
    </div>
  );
}

export function PricingTable({ reportTitle, reportId, reportSlug, onBack }: PricingTableProps) {
  const [activeEdition, setActiveEdition] = useState<EditionId>('global');

  const edition = EDITIONS.find((e) => e.id === activeEdition)!;

  return (
    <div className="w-full">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-[#0284c7] hover:text-[#1a3a8f] font-medium mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Report
      </button>

      {/* Recommendation banner */}
      <div
        className="rounded-xl p-5 mb-6 text-white"
        style={{ background: 'linear-gradient(135deg, #1a3a8f 0%, #0284c7 100%)' }}
      >
        <h2 className="text-lg font-bold mb-1">
          Compare &amp; Select Your License — {reportTitle}
        </h2>
        <p className="text-sm text-blue-100 mb-3">
          We recommend the <strong className="text-white">Corporate User License</strong> for maximum value:
        </p>
        <ul className="space-y-1">
          {[
            'Extended Support: Min. 2 years dedicated analyst access',
            'Regular Updates: 8 quarterly updates',
            'All Formats: PDF, PPT, Excel',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-blue-100">
              <span className="text-white font-bold mt-0.5">•</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/, '<strong class="text-white">$1:</strong>') }} />
            </li>
          ))}
        </ul>
      </div>

      {/* Edition tabs */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden mb-6 bg-white">
        {EDITIONS.map((ed) => (
          <button
            key={ed.id}
            type="button"
            onClick={() => setActiveEdition(ed.id)}
            className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 ${
              activeEdition === ed.id
                ? 'border-[#1a3a8f] text-[#1a3a8f] bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-[#1a3a8f] hover:bg-gray-50'
            }`}
          >
            <span className="text-base sm:text-sm">{ed.icon}</span>
            <span className="leading-tight text-center">{ed.label.replace(' Edition', '')}<span className="hidden sm:inline"> Edition</span></span>
          </button>
        ))}
      </div>

      {/* License cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {edition.tiers.map((tier) => (
          <LicenseCard
            key={tier.id}
            tier={tier}
            price={edition.prices[tier.id]}
            reportId={reportId}
            reportSlug={reportSlug}
            isFeatured={tier.id === 'corporate'}
          />
        ))}
      </div>
    </div>
  );
}
