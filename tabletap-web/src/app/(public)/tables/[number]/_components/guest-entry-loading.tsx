import { Skeleton } from "@/components/ui/skeleton";

export default function GuestEntryLoading() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto px-4">
      <Skeleton className="size-20 rounded-2xl" />
      <div className="flex flex-col items-center gap-2 w-full">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-5 w-52" />
      </div>
      <div className="w-full space-y-4 mt-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
