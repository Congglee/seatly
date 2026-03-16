"use client";

import Image from "next/image";
import Link from "next/link";
import { DishStatus } from "@/constants/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/currency";
import { cn } from "@/lib/utils";
import { useGetDishListQuery } from "@/queries/use-dish";
import type { DishListResType } from "@/schemas/dish.schema";
import { ArrowRight, Clock3, Flame, Star } from "lucide-react";
import { useMemo } from "react";

type LandingDish = DishListResType["data"]["items"][number];

const LANDING_DISH_LIMIT = 6;

const dishStatusBadge = {
  [DishStatus.Available]: {
    label: "Available",
    icon: Star,
    className:
      "bg-emerald-500/90 text-white border-transparent backdrop-blur-sm",
  },
  [DishStatus.Unavailable]: {
    label: "Unavailable",
    icon: Clock3,
    className:
      "bg-amber-500/90 text-white border-transparent backdrop-blur-sm",
  },
  [DishStatus.Hidden]: {
    label: "Hidden",
    icon: Flame,
    className:
      "bg-zinc-700/90 text-white border-transparent backdrop-blur-sm",
  },
} as const;

function DishCard({
  dish,
}: {
  dish: LandingDish;
}) {
  const statusConfig = dishStatusBadge[dish.status];
  const BadgeIcon = statusConfig.icon;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-muted">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />

        <div className="absolute left-3 top-3">
          <Badge
            className={cn(
              "gap-1 px-2 py-0.5 text-[11px] font-semibold",
              statusConfig.className
            )}
          >
            <BadgeIcon className="size-3" strokeWidth={2} />
            {statusConfig.label}
          </Badge>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <div className="flex items-end justify-between gap-3">
            <h3 className="min-w-0 text-lg font-semibold leading-snug tracking-tight text-white line-clamp-2">
              {dish.name}
            </h3>
            <span className="shrink-0 text-base font-semibold text-white tabular-nums">
              {formatCurrency(dish.price)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 border border-t-0 border-border/60 bg-background/95 p-4 md:p-5">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {dish.description}
        </p>

        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2.5 py-1 font-medium">
            Live menu item
          </span>
          <span>ID: {dish.id.slice(0, 8)}</span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-white/20" />
    </article>
  );
}

function DishCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border/60 bg-background">
      <div className="aspect-[4/3] animate-pulse bg-muted" />
      <div className="space-y-3 p-4 md:p-5">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export default function LandingDishes() {
  const dishListQuery = useGetDishListQuery({
    page: 1,
    limit: LANDING_DISH_LIMIT * 2,
  });

  const dishes = useMemo(
    () =>
      (dishListQuery.data?.payload.data.items ?? [])
        .filter((dish) => dish.status !== DishStatus.Hidden)
        .slice(0, LANDING_DISH_LIMIT),
    [dishListQuery.data?.payload.data.items]
  );

  return (
    <section id="dishes" className="py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
              Our signature dishes
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-[50ch] leading-relaxed">
              Crafted with care using the finest ingredients. Each plate tells a
              story of flavor and tradition.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden sm:inline-flex shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground gap-1.5 active:scale-[0.98] transition-transform duration-100"
          >
            <Link href="/login">
              View full menu
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </Button>
        </div>

        {dishListQuery.isLoading ? (
          <div className="grid auto-rows-[24rem] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-5">
            {Array.from({ length: LANDING_DISH_LIMIT }).map((_, index) => (
              <DishCardSkeleton key={index} />
            ))}
          </div>
        ) : dishListQuery.isError ? (
          <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 px-6 py-12 text-center">
            <p className="text-base font-medium text-foreground">
              We could not load the latest dishes right now.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please try again in a moment to explore the current menu.
            </p>
          </div>
        ) : dishes.length > 0 ? (
          <div className="grid auto-rows-[24rem] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-5">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 px-6 py-12 text-center">
            <p className="text-base font-medium text-foreground">
              No dishes are available yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              New menu items will appear here as soon as they are published.
            </p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Button
            asChild
            variant="outline"
            className="rounded-xl active:scale-[0.98] transition-transform duration-100"
          >
            <Link href="/login">
              View full menu
              <ArrowRight className="size-4 ml-1" strokeWidth={2} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
