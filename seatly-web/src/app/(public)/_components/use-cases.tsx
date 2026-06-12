import SectionHeading from "@/app/(public)/_components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { LANDING_USE_CASES } from "@/constants/landing-content";

export default function UseCases() {
  return (
    <section
      id="danh-cho-ai"
      aria-labelledby="use-cases-heading"
      className="scroll-mt-20 border-b border-border/60 bg-muted/20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="use-cases-heading"
          eyebrow="Dành cho ai"
          title="Phù hợp với quán phục vụ tại bàn quy mô nhỏ đến vừa"
          description="Cà phê, trà sữa, ăn vặt hay quán nước gia đình — Seatly giúp số hóa đúng nhu cầu thiết yếu."
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {LANDING_USE_CASES.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.title}>
                <Card className="h-full">
                  <CardContent className="space-y-4 p-6">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
