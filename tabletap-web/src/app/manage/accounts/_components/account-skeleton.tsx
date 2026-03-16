export default function AccountSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="space-y-3 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-14 animate-pulse rounded-md bg-muted/60"
          />
        ))}
      </div>
    </div>
  );
}
