import { CONTACT_INFO } from '@/lib/contact';

export default function QuickContactSection() {
  return (
    <div className="bg-[#E8F1F8] rounded-lg p-4 space-y-3">
      <h2 className="text-xl font-bold text-[var(--foreground)]">
        Quick Contact
      </h2>

      <div className="space-y-2">
        {/* Email */}
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--muted-foreground)]">Email Us</p>
            <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
              {CONTACT_INFO.email}
            </p>
          </div>
        </a>
      </div>

      <div className="pt-3 border-t border-[var(--border-light)]">
        <div className="flex items-center gap-2 text-xs text-[var(--primary-dark)]">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">24×7 Sales & Support Available</span>
        </div>
      </div>
    </div>
  );
}
