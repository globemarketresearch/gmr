import Link from 'next/link';
import type { IndustryNews } from '@/lib/api/industry-news.types';

interface IndustryNewsListCardProps {
  industryNews: IndustryNews;
}

export default function IndustryNewsListCard({ industryNews }: IndustryNewsListCardProps) {
  let formattedDate = '';
  try {
    if (industryNews.date) {
      const d = new Date(industryNews.date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      }
    }
  } catch {
    formattedDate = industryNews.date || '';
  }

  const initials = industryNews.author
    ? industryNews.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'GM';

  return (
    <Link href={`/industry-news/${industryNews.slug}`} className="group block mb-3">
      <article
        className="relative rounded-xl px-5 py-5 transition-all duration-200 border"
        style={{
          background: 'var(--surface-raised)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'var(--accent)';
          el.style.boxShadow = 'var(--shadow-card-hover)';
          el.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = 'var(--border-color)';
          el.style.boxShadow = 'var(--shadow-card)';
          el.style.transform = 'translateY(0)';
        }}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
            style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
          >
            {industryNews.category || 'Industry News'}
          </span>
          {formattedDate && (
            <time className="text-xs shrink-0" style={{ color: 'var(--text-tertiary)' }}>{formattedDate}</time>
          )}
        </div>

        <h3
          className="text-[16px] font-bold leading-snug mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]"
          style={{ color: 'var(--text-primary)' }}
        >
          {industryNews.title}
        </h3>

        <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
          {industryNews.excerpt}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
              style={{ background: 'var(--accent)' }}
            >
              {initials}
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {industryNews.author}
            </span>
            {industryNews.readTime && (
              <>
                <span style={{ color: 'var(--border-color)' }} className="text-xs">·</span>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{industryNews.readTime}</span>
              </>
            )}
          </div>

          <span
            className="text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 shrink-0"
            style={{ color: 'var(--accent)' }}
          >
            Read More
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
