import HeroVisual from "@/app/(public)/_components/hero-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const HERO_TRUST_POINTS = [
  "Không cần cài app",
  "Khách quét QR là dùng được",
  "Triển khai nhanh cho quán nhỏ",
] as const;

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border/60"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.12),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-24">
        <div className="space-y-6">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
            QR Ordering · Realtime · Dành cho quán nhỏ
          </Badge>

          <div className="space-y-4">
            <h1
              id="hero-heading"
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
            >
              Gọi món tại bàn bằng QR — nhanh hơn, ít sai sót hơn
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Seatly giúp khách tự xem menu và đặt món trên điện thoại, nhân
              viên xử lý order gần realtime, chủ quán theo dõi vận hành — không
              cần hệ thống POS cồng kềnh.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-11 min-h-[44px] w-full sm:w-auto"
            >
              <Link href="/login">
                Đăng nhập quản lý
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 min-h-[44px] w-full sm:w-auto"
            >
              <a href="#cach-hoat-dong">Xem cách hoạt động</a>
            </Button>
          </div>

          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            {HERO_TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
