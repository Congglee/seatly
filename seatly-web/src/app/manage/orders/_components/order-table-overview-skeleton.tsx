import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const SKELETON_CARD_COUNT = 6;

export default function OrderTableOverviewSkeleton() {
  return (
    <div
      className="flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-stretch"
      role="status"
      aria-label="Đang tải tổng quan bàn"
    >
      <span className="sr-only">Đang tải tổng quan bàn</span>
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
        <div
          className="grid w-full grid-cols-[2.5rem_1px_1fr] items-center gap-x-3 rounded-lg border border-transparent bg-secondary px-3 py-2.5 xs:w-auto"
          key={index}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-3 w-8 rounded-sm" />
          </div>
          <Separator
            orientation="vertical"
            className="h-full min-h-[2.75rem] bg-muted-foreground/30"
          />
          {index % 3 === 1 ? (
            <div className="flex min-w-0 items-center justify-start">
              <Skeleton className="h-6 w-[5.5rem] rounded-full" />
            </div>
          ) : (
            <div className="flex min-w-0 flex-row flex-wrap items-center gap-x-4 gap-y-1.5 py-0.5 xs:flex-col xs:items-start xs:gap-1.5">
              <Skeleton className="h-3.5 w-10 rounded-sm" />
              <Skeleton className="h-3.5 w-10 rounded-sm" />
              <Skeleton className="h-3.5 w-10 rounded-sm" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
