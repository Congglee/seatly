import { Suspense } from "react";
import Logo from "@/components/logo";
import GuestEntryForm from "@/app/(public)/tables/[number]/_components/guest-entry-form";
import GuestEntryFallback from "@/app/(public)/tables/[number]/_components/guest-entry-fallback";

export default function GuestTableEntryPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col bg-background">
      <header className="flex items-center justify-center py-6 sm:py-12 px-4">
        <Logo
          wrapperClassName="pointer-events-none select-none"
          logoClassName="size-7"
          textClassName="text-xl"
        />
      </header>
      <div className="flex-1 flex items-start justify-center pb-8">
        <Suspense fallback={<GuestEntryFallback />}>
          <GuestEntryForm />
        </Suspense>
      </div>
    </main>
  );
}
