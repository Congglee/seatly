import SectionHeading from "@/app/(public)/_components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { LANDING_FEATURES } from "@/constants/landing-content";
import { cn } from "@/lib/utils";

export default function Features() {
  return (
    <section
      id="tinh-nang"
      aria-labelledby="features-heading"
      className="scroll-mt-20 border-b border-border/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="features-heading"
          eyebrow="Tính năng cốt lõi"
          title="Đủ cho phục vụ tại bàn — không thừa module bạn không dùng"
          description="Seatly tập trung vào QR menu, order realtime, quản lý bàn & món và thanh toán đơn giản."
        />

        <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
          {LANDING_FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className={cn(
                  "h-full transition-shadow hover:shadow-md",
                  feature.className
                )}
              >
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
