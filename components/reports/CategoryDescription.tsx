"use client";

import { useState } from "react";
import { INDUSTRY_MORE } from "@/data/industry-more";

interface Category {
  name: string;
  slug: string;
  description?: string;
}

interface CategoryDescriptionProps {
  category: Category;
}

export default function CategoryDescription({ category }: CategoryDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const more = INDUSTRY_MORE[category.slug];
  const [firstPara, ...restParas] = more ? more.split("\n\n") : [];

  if (!category.description) return null;

  return (
    <section className="border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {more && (
          <>
            <p className="text-[var(--muted-foreground)] leading-relaxed text-sm mb-3 last:mb-0">
              {firstPara}
            </p>

            {restParas.length > 0 && (
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  expanded ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  {restParas.map((para, i) => (
                    <p key={i} className="text-[var(--muted-foreground)] leading-relaxed text-sm mb-3 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[var(--primary)] hover:opacity-80 transition-opacity"
            >
              {expanded ? "Read Less" : "Read More"}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
