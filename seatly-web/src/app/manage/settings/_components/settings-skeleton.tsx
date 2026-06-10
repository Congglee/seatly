import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,260px)_1fr]">
        <Skeleton className="aspect-square w-full max-w-64 rounded-xl" />
        <div className="space-y-5">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}
