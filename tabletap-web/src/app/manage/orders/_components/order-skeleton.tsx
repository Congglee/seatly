import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = 5;

export default function OrderSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 px-1 py-2">
        <Skeleton className="h-9 w-40 lg:w-64" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="rounded-md border">
        <div className="border-b px-4 py-3">
          <div className="flex items-center gap-6">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b px-4 py-4 last:border-0"
          >
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="size-8 shrink-0 rounded-md" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-7 shrink-0 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 shrink-0 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-8 w-[140px] rounded-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 shrink-0 rounded-full" />
              <Skeleton className="h-3.5 w-20" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="size-8 shrink-0 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
