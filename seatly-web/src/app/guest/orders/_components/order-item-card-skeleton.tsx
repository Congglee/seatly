import { Skeleton } from "@/components/ui/skeleton";

export default function OrderItemCardSkeleton() {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-card p-3">
      <Skeleton className="shrink-0 size-20 sm:size-24 rounded-lg" />
      <div className="flex flex-1 flex-col justify-between min-w-0 gap-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="flex items-end justify-between gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
