"use client";

import { useState, useId } from "react";
import { submitNewsletterForm, isFormError } from "@/lib/api";

export default function FooterNewsletter() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    const result = await submitNewsletterForm({ email: email.trim() });

    if (isFormError(result)) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    } else {
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <div>
      <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-400">
        Newsletter
      </h3>

      {status === "success" ? (
        <div
          className="flex items-start gap-3 rounded-lg px-3.5 py-3"
          style={{
            background: "rgba(44,200,216,0.08)",
            border: "1px solid rgba(44,200,216,0.20)",
          }}
        >
          <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-sky-400/20">
            <svg className="h-2.5 w-2.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <p className="text-xs font-medium text-white/80">Subscribed!</p>
            <p className="mt-0.5 text-[11px] text-white/40">
              Weekly market intelligence on its way.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
          <p className="text-xs text-white/40 leading-relaxed">
            Weekly market intelligence, trend alerts, and research briefs.
          </p>

          {/* Email row */}
          <div className="relative">
            <input
              id={inputId}
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full rounded-lg py-2.5 pl-3.5 pr-10 text-xs text-white outline-none placeholder:text-white/20 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: focused
                  ? "1px solid rgba(44,200,216,0.50)"
                  : status === "error"
                  ? "1px solid rgba(239,68,68,0.40)"
                  : "1px solid rgba(255,255,255,0.10)",
                boxShadow: focused ? "0 0 0 3px rgba(44,200,216,0.08)" : "none",
              }}
            />
            {/* Inline submit arrow */}
            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              aria-label="Subscribe"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-md transition-all duration-150 disabled:opacity-40"
              style={{
                background: email.trim() ? "rgba(44,200,216,0.20)" : "transparent",
                color: "#2CC8D8",
              }}
            >
              {status === "loading" ? (
                <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </div>

          {status === "error" && (
            <p className="text-[11px]" style={{ color: "#fca5a5" }}>
              Something went wrong — please try again.
            </p>
          )}

          <p className="text-[10px] text-white/25 leading-snug">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}
