"use client";

import { useState } from "react";

export interface SectionDescriptionItem {
  title: string;
  desc: string;
}

interface SectionDescriptionProps {
  intro: string[];
  itemsHeading?: string;
  items?: SectionDescriptionItem[];
  extra?: string[];
}

export default function SectionDescription({
  intro,
  itemsHeading,
  items,
  extra,
}: SectionDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [introLead, ...introRest] = intro;
  const hasMore = introRest.length > 0 || (items && items.length > 0) || (extra && extra.length > 0);

  return (
    <section className="border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <p className="text-[var(--muted-foreground)] leading-relaxed">{introLead}</p>

        {hasMore && (
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              expanded ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              {introRest.map((p, i) => (
                <p key={i} className="text-[var(--muted-foreground)] leading-relaxed mb-3">
                  {p}
                </p>
              ))}

              {items && items.length > 0 && (
                <div className="mt-3">
                  {itemsHeading && (
                    <h3 className="text-xl font-bold text-[var(--teal-deep)] mb-4">
                      {itemsHeading}
                    </h3>
                  )}
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.title}>
                        <h4 className="font-semibold text-[var(--foreground)] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {extra && extra.length > 0 && (
                <div className="mt-6 space-y-3">
                  {extra.map((p, i) => (
                    <p key={i} className="text-[var(--muted-foreground)] leading-relaxed text-sm">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-[var(--primary)] hover:opacity-80 transition-opacity"
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
        )}
      </div>
    </section>
  );
}
