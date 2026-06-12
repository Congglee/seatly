import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CtaBand() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-b border-border/60 bg-primary/10 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="final-cta-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Sẵn sàng số hóa phục vụ tại bàn?
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Thiết lập menu, bàn và mã QR — bắt đầu quản lý quán ngay hôm nay với
          Seatly.
        </p>
        <Button asChild size="lg" className="h-11 min-h-[44px]">
          <Link href="/login">
            Đăng nhập quản lý
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
