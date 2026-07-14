export default function GooglePreferredSource() {
  return (
    <section className="mb-12">
      <div
        className="rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-[var(--card)]"
        style={{ borderColor: 'color-mix(in srgb, #4285F4 25%, #e5e7eb)' }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'color-mix(in srgb, #4285F4 10%, #f8faff)',
            border: '1px solid color-mix(in srgb, #4285F4 20%, #e5e7eb)',
          }}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.64v3h3.88c2.27-2.09 3.57-5.17 3.57-8.83z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A11.998 11.998 0 0 0 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.26a12 12 0 0 0 0 10.8l4.01-3.11z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.26 6.6l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75z"
            />
          </svg>
        </div>

        <div className="flex-1">
          <p
            className="text-xs font-bold tracking-[0.15em] uppercase mb-1.5"
            style={{ color: '#4285F4' }}
          >
            Google · Preferred Sources
          </p>
          <h3 className="font-semibold text-lg text-[var(--foreground)] mb-2">
            Don&apos;t miss the latest market research insights and industry updates on Google.
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            Add Globe Market Research as a preferred source in the Google app to see our
            reports, analysis, and market stories in your news suggestions.
          </p>
        </div>

        <a
          href="https://www.google.com/preferences/source?q=globemarketresearch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
          style={{ background: '#4285F4', color: '#fff' }}
        >
          Add as Preferred Source
        </a>
      </div>
    </section>
  );
}
