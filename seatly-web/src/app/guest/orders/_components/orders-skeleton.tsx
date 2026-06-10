import OrderItemCardSkeleton from "@/app/guest/orders/_components/order-item-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersSkeleton() {
  return (
    <>
      <div className="space-y-3">
        <OrderItemCardSkeleton />
        <OrderItemCardSkeleton />
        <OrderItemCardSkeleton />
        <OrderItemCardSkeleton />
      </div>
      <div className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-lg mx-auto px-4 py-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </>
  );
}
