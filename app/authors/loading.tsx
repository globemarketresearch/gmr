import { Skeleton } from '@/components/ui';

function AuthorCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-[var(--card)] p-6 space-y-4">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" width={64} height={64} className="flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export default function AuthorsLoading() {
  return (
    <div className="bg-[var(--background)]">
      {/* Breadcrumb Bar Skeleton */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Skeleton className="h-5 w-48" />
        </div>
      </div>

      <div className="px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-96 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <AuthorCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
