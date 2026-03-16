import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Utensils className="size-3.5 text-primary" strokeWidth={2} />
                <span className="text-xs font-medium text-primary tracking-wide">
                  Restaurant management, simplified
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-foreground">
              Your restaurant,
              <br />
              <span className="bg-gradient-to-r from-primary to-[#f97316] bg-clip-text text-transparent">
                just a tap away
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[52ch]">
              Streamline your operations from order to payment. TableTap gives
              your guests a frictionless dining experience while keeping your
              kitchen running smoothly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-xl h-12 px-6 text-sm font-semibold active:scale-[0.98] transition-transform duration-100"
              >
                <Link href="/login">
                  Get started
                  <ArrowRight className="size-4 ml-1" strokeWidth={2} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl h-12 px-6 text-sm font-semibold border-border/60 active:scale-[0.98] transition-transform duration-100"
              >
                <Link href="#dishes">Browse menu</Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/banner.png"
              alt="TableTap restaurant management platform showcasing a vibrant dining experience"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
