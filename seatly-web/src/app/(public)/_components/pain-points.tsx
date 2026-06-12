import SectionHeading from "@/app/(public)/_components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANDING_PAIN_POINTS } from "@/constants/landing-content";
import { ArrowRight } from "lucide-react";

export default function PainPoints() {
  return (
    <section
      aria-labelledby="pain-points-heading"
      className="border-b border-border/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="pain-points-heading"
          eyebrow="Vấn đề thực tế"
          title="Quán nhỏ không cần hệ thống lớn — chỉ cần quy trình tại bàn chạy trơn tru"
          description="Seatly được thiết kế cho những pain point phổ biến mà quán ăn và quán nước nhỏ gặp mỗi ngày."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {LANDING_PAIN_POINTS.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader className="space-y-2 pb-2">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 rounded-lg border border-border bg-muted/30 p-3">
                  <ArrowRight
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-foreground">
                    {item.solution}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
