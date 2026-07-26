import type { Metadata } from "next";
import Link from "next/link";
import { getMediaMentions, isApiError } from "@/lib/api";

export const metadata: Metadata = {
  title: "Media Mentions",
  description: "Our research and insights have been featured across respected global publications and digital platforms.",
  alternates: {
    canonical: '/media-mentions',
  },
};

export const revalidate = 300;

export default async function MediaMentionsPage() {
  const response = await getMediaMentions();
  const mentions = isApiError(response) ? [] : response.data;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--teal-deep)] mb-4">
          Featured Across Leading Publications
        </h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          Our research and insights have been featured across respected global publications and
          digital platforms. Media organizations, industry experts, and business leaders use our
          findings to support discussions on business, technology, healthcare, innovation, and
          emerging global markets.
        </p>
      </div>

      {mentions.length === 0 ? (
        <p className="text-center text-[var(--muted-foreground)]">
          Media mentions will appear here soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {mentions.map((mention) => {
            return (
              <div
                key={mention.id}
                className="relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 h-full bg-[var(--card)] hover:shadow-md transition-shadow"
              >
                {mention.link && (
                  <a
                    href={mention.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read coverage on ${mention.title}`}
                    className="absolute inset-0 z-0 rounded-2xl"
                  />
                )}

                <div className="relative z-[1] flex flex-col items-center justify-center gap-3 w-full pointer-events-none">
                  <div className="w-full h-16 flex items-center justify-center">
                    {mention.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mention.imageUrl}
                        alt={mention.title}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <span className="font-semibold text-[var(--foreground)] text-center">
                        {mention.title}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-[var(--muted-foreground)] text-center">
                    {mention.title}
                  </span>
                  {mention.reportSlug && mention.reportLinkText && (
                    <Link
                      href={`/reports/${mention.reportSlug}`}
                      target="_blank"
                      rel="noopener"
                      className="pointer-events-auto relative z-10 text-xs underline text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-center"
                    >
                      {mention.reportLinkText}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
