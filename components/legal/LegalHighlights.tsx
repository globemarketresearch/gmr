"use client";

import {
  ShieldCheck,
  Database,
  UserCheck,
  Eye,
  FileText,
  Ban,
  Gift,
  BadgeCheck,
  Handshake,
  LockKeyhole,
  Truck,
  Award,
  type LucideIcon,
} from "lucide-react";

interface IconCard {
  Icon: LucideIcon;
  label: string;
  accent: string;
}

interface HighlightSet {
  cards: IconCard[];
}

const highlightSets: Record<string, HighlightSet> = {
  privacy: {
    cards: [
      { Icon: ShieldCheck, label: "Data Confidentiality",    accent: "#2563eb" },
      { Icon: Database,    label: "Encrypted Management",    accent: "#0891b2" },
      { Icon: UserCheck,   label: "Client Rights Protected", accent: "#059669" },
      { Icon: Eye,         label: "Complete Transparency",   accent: "#7c3aed" },
    ],
  },
  refund: {
    cards: [
      { Icon: FileText,   label: "Report Access Included", accent: "#2563eb" },
      { Icon: Ban,        label: "No Refunds Policy",      accent: "#dc2626" },
      { Icon: Gift,       label: "Free Sample Report",     accent: "#059669" },
      { Icon: BadgeCheck, label: "Confirm Before Buying",  accent: "#d97706" },
    ],
  },
  terms: {
    cards: [
      { Icon: Handshake,   label: "Simple Agreement Terms",     accent: "#2563eb" },
      { Icon: LockKeyhole, label: "Client IP Protection",       accent: "#7c3aed" },
      { Icon: Truck,       label: "Reliable Delivery Timeline", accent: "#0891b2" },
      { Icon: Award,       label: "Quality Assured",            accent: "#059669" },
    ],
  },
};

function detectSet(slug: string, category?: string): HighlightSet | null {
  const key = `${slug} ${category ?? ""}`.toLowerCase();
  if (/privacy|data.?protect|confidential/.test(key)) return highlightSets.privacy;
  if (/refund|return|purchase|payment|cancel/.test(key)) return highlightSets.refund;
  if (/term|condition|agreement|intellectual|copyright|ip\b/.test(key)) return highlightSets.terms;
  return null;
}

interface LegalHighlightsProps {
  slug: string;
  category?: string;
}

export default function LegalHighlights({ slug, category }: LegalHighlightsProps) {
  const set = detectSet(slug, category);
  if (!set) return null;

  return (
    <section className="my-10" aria-label="Key highlights">
      <style>{`
        @keyframes lh-shimmer {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(300%)  skewX(-15deg); }
        }

        .lh-card {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          padding: 28px 16px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: default;
          user-select: none;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 0 0 0 transparent;
          transition:
            transform 0.26s cubic-bezier(.34,1.56,.64,1),
            box-shadow 0.26s ease,
            border-color 0.26s ease;
        }

        @media (prefers-color-scheme: dark) {
          .lh-card {
            background: color-mix(in srgb, var(--muted) 80%, white);
            border-color: var(--border);
          }
        }

        .lh-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 16px 16px 0 0;
          background: var(--lh-accent, #2563eb);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(.34,1,.64,1);
        }

        .lh-card:hover {
          transform: translateY(-5px);
          border-color: color-mix(in srgb, var(--lh-accent, #2563eb) 40%, #e5e7eb);
          box-shadow:
            0 12px 32px -8px color-mix(in srgb, var(--lh-accent, #2563eb) 20%, transparent),
            0 4px 16px -4px rgba(0,0,0,0.1);
        }

        .lh-card:hover::before {
          transform: scaleX(1);
        }

        /* shimmer sweep */
        .lh-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            color-mix(in srgb, var(--lh-accent, #2563eb) 8%, white) 50%,
            transparent 60%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.1s;
        }
        .lh-card:hover .lh-shimmer {
          opacity: 1;
          animation: lh-shimmer 0.5s ease forwards;
        }

        /* icon shell */
        .lh-icon-shell {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: color-mix(in srgb, var(--lh-accent, #2563eb) 10%, #f8faff);
          border: 1px solid color-mix(in srgb, var(--lh-accent, #2563eb) 18%, #e5e7eb);
          transition:
            background 0.26s ease,
            border-color 0.26s ease,
            transform 0.3s cubic-bezier(.34,1.56,.64,1);
        }

        .lh-card:hover .lh-icon-shell {
          background: color-mix(in srgb, var(--lh-accent, #2563eb) 16%, #f0f4ff);
          border-color: color-mix(in srgb, var(--lh-accent, #2563eb) 35%, #e5e7eb);
          transform: scale(1.1) rotate(-5deg);
        }

        .lh-icon {
          color: var(--lh-accent, #2563eb);
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
          position: relative;
          z-index: 1;
        }

        /* divider line */
        .lh-line {
          width: 20px;
          height: 1.5px;
          border-radius: 99px;
          margin-bottom: 10px;
          background: color-mix(in srgb, var(--lh-accent, #2563eb) 35%, #e5e7eb);
          transition: width 0.26s ease, background 0.26s ease;
        }

        .lh-card:hover .lh-line {
          width: 32px;
          background: var(--lh-accent, #2563eb);
        }

        /* label */
        .lh-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-align: center;
          line-height: 1.45;
          color: #6b7280;
          transition: color 0.2s ease;
        }

        .lh-card:hover .lh-label {
          color: #111827;
        }
      `}</style>

      <div className="flex items-center gap-4 mb-8">
        <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
        <span className="shrink-0 font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--muted-foreground)" }}>
          Key Highlights
        </span>
        <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {set.cards.map(({ Icon, label, accent }) => (
          <div
            key={label}
            className="lh-card"
            style={{ "--lh-accent": accent } as React.CSSProperties}
          >
            <div className="lh-shimmer" />
            <div className="lh-icon-shell">
              <Icon className="lh-icon" size={26} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div className="lh-line" />
            <p className="lh-label">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
