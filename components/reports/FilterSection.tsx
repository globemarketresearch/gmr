'use client';

import { useState } from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--border)] pb-4 mb-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center mb-3 text-left hover:opacity-80 transition-opacity"
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--foreground)]">
          {title}
        </h3>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="space-y-2 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}
