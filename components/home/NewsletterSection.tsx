"use client";

import { useState } from "react";
import Link from "next/link";
import {
  submitNewsletterForm,
  isFormError,
} from "@/lib/api";

/* ─── Types ───────────────────────────────────────────────── */
type FormStatus = "idle" | "loading" | "success" | "error";

/* ─── Constants ───────────────────────────────────────────── */
const INTERESTS = [
  { id: "ai",         label: "AI & Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "energy",     label: "Energy" },
  { id: "automotive", label: "Automotive" },
  { id: "fintech",    label: "FinTech" },
  { id: "packaging",  label: "Packaging" },
];

const STATS = [
  { value: "12K+",   label: "Subscribers" },
  { value: "45+",    label: "Industries" },
  { value: "Weekly", label: "Cadence" },
];

/* ─── Shared field shell ──────────────────────────────────── */
const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border:     "1px solid rgba(255,255,255,0.12)",
  color:      "white",
} as const;

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        className="font-body block text-xs font-medium"
        style={{ color: "rgba(255,255,255,0.75)" }}
      >
        {label}{" "}
        {required && <span style={{ color: "#2CC8D8" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Error banner ────────────────────────────────────────── */
function ErrorBanner({ message }: { message: string }) {
  return (
    <p
      className="font-body flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs"
      style={{
        background: "rgba(239,68,68,0.10)",
        border:     "1px solid rgba(239,68,68,0.20)",
        color:      "#fca5a5",
      }}
    >
      <svg
        className="h-3.5 w-3.5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {message}
    </p>
  );
}

/* ─── Submit button ───────────────────────────────────────── */
function SubmitButton({
  disabled,
  loading,
  label,
}: {
  disabled: boolean;
  loading: boolean;
  label: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        background:  "linear-gradient(135deg, #2CC8D8 0%, #19C3D5 50%, #1DAEBF 100%)",
        color:       "#0b1533",
        boxShadow:   !loading ? "0 8px 24px rgba(44,200,216,0.30)" : "none",
      }}
    >
      {/* hover shimmer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-[-110%] skew-x-[-18deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[110%]"
        style={{ width: "60%" }}
      />
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </>
        ) : (
          <>
            {label}
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </span>
    </button>
  );
}

/* ─── Success state ───────────────────────────────────────── */
function SuccessState({
  message,
  onReset,
  resetLabel,
}: {
  message: string;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div
          className="absolute h-20 w-20 animate-ping rounded-full opacity-20"
          style={{ background: "rgba(44,200,216,0.4)", animationDuration: "1.4s" }}
        />
        <div
          className="absolute h-14 w-14 animate-ping rounded-full opacity-30"
          style={{ background: "rgba(44,200,216,0.5)", animationDuration: "1s", animationDelay: "0.2s" }}
        />
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: "rgba(44,200,216,0.2)", border: "1.5px solid #2CC8D8" }}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#2CC8D8" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-display text-xl font-bold text-white">Done!</p>
        <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="font-body text-xs underline underline-offset-4 transition-colors hover:text-white/60"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {resetLabel}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NEWSLETTER FORM
══════════════════════════════════════════════════════════ */
function NewsletterForm() {
  const [email, setEmail]               = useState("");
  const [selectedInterests, setSelected] = useState<string[]>([]);
  const [focused, setFocused]           = useState(false);
  const [status, setStatus]             = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg]         = useState("");

  const toggleInterest = (id: string) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    const result = await submitNewsletterForm({
      email: email.trim(),
      interests: selectedInterests.length
        ? selectedInterests.map(id => INTERESTS.find(i => i.id === id)!.label)
        : undefined,
    });
    if (isFormError(result)) {
      setStatus("error");
      setErrorMsg(result.message || "Something went wrong. Please try again.");
    } else {
      setStatus("success");
      setEmail("");
      setSelected([]);
    }
  };

  if (status === "success")
    return (
      <SuccessState
        message="Your first intelligence brief lands in your inbox this week."
        onReset={() => setStatus("idle")}
        resetLabel="Subscribe another email"
      />
    );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-1">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(44,200,216,0.85)" }}
        >
          Weekly Intelligence Feed
        </p>
        <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
          Enter your work email to receive weekly market insights.
        </p>
      </div>

      {/* Email */}
      <Field label="Work Email" required>
        <div
          className="relative transition-shadow duration-200"
          style={{
            borderRadius: "10px",
            boxShadow: focused
              ? "0 0 0 2px rgba(44,200,216,0.40), 0 0 20px rgba(44,200,216,0.06)"
              : undefined,
          }}
        >
          <div
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-150"
            style={{ color: focused ? "#2CC8D8" : "rgba(255,255,255,0.25)" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="font-body w-full rounded-[10px] py-3 pl-10 pr-4 text-sm outline-none placeholder:text-white/20"
            style={{ ...inputStyle, boxShadow: "none" }}
          />
        </div>
      </Field>

      {/* Interests */}
      <div className="space-y-2.5">
        <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
          Topics of interest <span className="opacity-70">(optional)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(({ id, label }) => {
            const active = selectedInterests.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleInterest(id)}
                className="font-body rounded-full px-3 py-1 text-xs font-medium transition-all duration-150"
                style={{
                  background: active ? "rgba(44,200,216,0.15)" : "rgba(255,255,255,0.05)",
                  border:     active ? "1px solid rgba(44,200,216,0.50)" : "1px solid rgba(255,255,255,0.10)",
                  color:      active ? "#2CC8D8" : "rgba(255,255,255,0.70)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {status === "error" && <ErrorBanner message={errorMsg} />}

      <SubmitButton
        disabled={status === "loading" || !email.trim()}
        loading={status === "loading"}
        label="Subscribe to Intelligence Feed"
      />

      <p
        className="font-body text-center text-[11px] leading-relaxed"
        style={{ color: "rgba(255,255,255,0.50)" }}
      >
        No spam, ever. Unsubscribe anytime.{" "}
        <Link
          href="/legal/privacy-policy"
          className="underline underline-offset-2 transition-colors hover:text-white/60"
        >
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function NewsletterSection() {

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "#0b1533" }}
      aria-label="Subscribe and get in touch"
    >
      {/* ── Diagonal slash accent ─────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(118deg, transparent 0%, transparent 38%, rgba(44,200,216,0.06) 38%, rgba(44,200,216,0.06) 62%, transparent 62%)",
        }}
      />

      {/* ── Data-grid overlay ─────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(44,200,216,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(44,200,216,0.9) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* ── Ambient glows ─────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: "rgba(44,200,216,0.12)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: "rgba(25,195,213,0.10)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-6 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[1fr_500px] lg:items-start">

          {/* ── LEFT: copy + stats ──────────────────────── */}
          <div className="space-y-8 lg:pt-4">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                  style={{ background: "#2CC8D8" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "#2CC8D8" }}
                />
              </span>
              <span
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "#2CC8D8" }}
              >
                Intelligence Feed · Live
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h2
                className="font-display text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-[3.4rem]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Stay Ahead of
              </h2>
              <h2
                className="font-display text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[3.4rem]"
                style={{ letterSpacing: "-0.03em", color: "#2CC8D8" }}
              >
                Market Signals.
              </h2>
            </div>

            <p
              className="font-body max-w-md text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(255,255,255,0.58)" }}
            >
              Exclusive market intelligence, trend alerts, and in-depth research
              summaries — delivered to your inbox every week. No noise, only signal.
            </p>

            {/* Stat strip */}
            <div className="flex flex-wrap gap-8 pt-2">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span
                    className="font-mono text-2xl font-bold tabular-nums"
                    style={{ color: "#2CC8D8" }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-body text-xs uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick-links to full pages */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/contact"
                className="font-body inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-150 hover:bg-white/10"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border:     "1px solid rgba(255,255,255,0.10)",
                  color:      "rgba(255,255,255,0.65)",
                }}
              >
                Full contact form
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/reports"
                className="font-body inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-150 hover:bg-white/10"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border:     "1px solid rgba(255,255,255,0.10)",
                  color:      "rgba(255,255,255,0.65)",
                }}
              >
                Browse reports
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: form card ────────────────────────── */}
          <div
            className="relative rounded-2xl"
            style={{
              background:    "rgba(255,255,255,0.04)",
              border:        "1px solid rgba(44,200,216,0.18)",
              boxShadow:     "0 0 0 1px rgba(44,200,216,0.06) inset, 0 32px 64px rgba(0,0,0,0.4)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Corner accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-px -top-px h-24 w-24 rounded-tr-2xl"
              style={{
                background:
                  "linear-gradient(225deg, rgba(44,200,216,0.20) 0%, transparent 60%)",
              }}
            />

            {/* ── Form area ────────────────────────────── */}
            <div className="px-7 pb-8 pt-7">
              <NewsletterForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
