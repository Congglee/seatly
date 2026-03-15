import { Skeleton } from "@/components/ui/skeleton";

function OrderItemCardSkeleton() {
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

function SummaryFooterSkeleton() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto px-4 py-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export default function OrdersSkeleton() {
  return (
    <>
      <div className="space-y-3">
        <OrderItemCardSkeleton />
        <OrderItemCardSkeleton />
        <OrderItemCardSkeleton />
        <OrderItemCardSkeleton />
      </div>
      <SummaryFooterSkeleton />
    </>
  );
}
