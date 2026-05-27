import React from 'react';
import Link from 'next/link';

interface BriefWithAIProps {
  reportTitle?: string;
}

export const BriefWithAI: React.FC<BriefWithAIProps> = ({ reportTitle }) => {
  const query = reportTitle
    ? `Brief me about the "${reportTitle}" market research report`
    : 'Market research report brief';

  const chatGPTUrl = `https://chatgpt.com/?q=${encodeURIComponent(query)}`;
  const perplexityUrl = `https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
        Brief With:
      </p>

      <div className="flex flex-col gap-2">
        {/* ChatGPT */}
        <Link
          href={chatGPTUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-all duration-150 hover:border-[#10a37f]/50 hover:bg-[#f0fdf8] hover:shadow-sm active:scale-[0.98] group"
        >
          {/* ChatGPT / OpenAI logo */}
          <span className="flex-shrink-0 w-[22px] h-[22px] flex items-center justify-center rounded-full bg-[#10a37f]">
            <svg
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[14px] h-[14px]"
              aria-hidden="true"
            >
              <path
                d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.99-3.118 10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.69 4.839 10.081 10.081 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.99 3.118 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.689-4.838 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.497v4.998l-4.331 2.5-4.331-2.5V18z"
                fill="#fff"
              />
            </svg>
          </span>
          <span>ChatGPT</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 ml-auto text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>

        {/* Perplexity */}
        <Link
          href={perplexityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-all duration-150 hover:border-[#6b5ce7]/50 hover:bg-[#f5f3ff] hover:shadow-sm active:scale-[0.98] group"
        >
          {/* Perplexity logo */}
          <span className="flex-shrink-0 w-[22px] h-[22px] flex items-center justify-center rounded-full bg-[#1a1a2e]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[14px] h-[14px]"
              aria-hidden="true"
            >
              <path
                d="M3 3.5h6.75v4.25L3 3.5zm12 0H21L14.25 7.75V3.5h.75zm-5.25 0h.75v16.25h-.75V3.5zm-5.25 0L12 8.625l7.5-5.125"
                stroke="none"
              />
              <path
                d="M12 3L3.5 8.5V15.5L12 21l8.5-5.5V8.5L12 3z"
                stroke="#a78bfa"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 3v18M3.5 8.5l8.5 5.5 8.5-5.5M3.5 15.5l8.5-5.5 8.5 5.5"
                stroke="#a78bfa"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          <span>Perplexity</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 ml-auto text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BriefWithAI;
