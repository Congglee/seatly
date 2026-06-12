"use client";

import SectionHeading from "@/app/(public)/_components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LANDING_HOW_IT_WORKS_TABS } from "@/constants/landing-content";

export default function HowItWorks() {
  return (
    <section
      id="cach-hoat-dong"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-20 border-b border-border/60 bg-muted/20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="Luồng nghiệp vụ"
          title="Cách Seatly hoạt động cho từng vai trò"
          description="Từ khách quét QR đến nhân viên xử lý order và chủ quán theo dõi vận hành — tất cả trên một nền tảng web gọn."
        />

        <Tabs defaultValue="guest" className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-0">
            {LANDING_HOW_IT_WORKS_TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="min-h-[44px] px-4 py-2.5"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {LANDING_HOW_IT_WORKS_TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {tab.steps.map((step) => (
                  <li key={step.step}>
                    <Card className="h-full">
                      <CardContent className="space-y-3 p-5">
                        <span
                          className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                          aria-hidden="true"
                        >
                          {step.step}
                        </span>
                        <div className="space-y-1.5">
                          <h3 className="text-base font-semibold tracking-tight">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ol>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
