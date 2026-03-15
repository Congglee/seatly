"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";
import { DishStatus } from "@/constants/type";
import { type DishType } from "@/schemas/dish.schema";

interface MenuDishCardProps {
  dish: DishType;
  quantity: number;
  onIncrement: (dishId: string) => void;
  onDecrement: (dishId: string) => void;
}

export default function MenuDishCard({
  dish,
  quantity,
  onIncrement,
  onDecrement,
}: MenuDishCardProps) {
  const isUnavailable = dish.status === DishStatus.Unavailable;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-card p-3",
        "transition-colors duration-150",
        isUnavailable && "opacity-60"
      )}
    >
      <div className="relative shrink-0 size-24 sm:size-28 rounded-lg overflow-hidden bg-muted">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className={cn("object-cover", isUnavailable && "grayscale")}
        />
        {isUnavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0.5 font-semibold"
            >
              Sold out
            </Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between min-w-0 gap-1.5">
        <div className="space-y-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-1">
              {dish.name}
            </h3>
            <span className="shrink-0 text-sm font-semibold text-primary tabular-nums">
              {formatCurrency(dish.price)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {dish.description}
          </p>
        </div>
        <div className="flex items-center justify-end gap-1 pt-0.5">
          {!isUnavailable && (
            <>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "size-7 rounded-lg border-border/60",
                  "active:scale-95 transition-transform duration-100",
                  quantity === 0 && "invisible"
                )}
                onClick={() => onDecrement(dish.id)}
                aria-label={`Decrease quantity of ${dish.name}`}
              >
                <Minus className="size-3.5" strokeWidth={2} />
              </Button>

              <span
                className={cn(
                  "w-7 text-center text-sm font-semibold tabular-nums text-foreground",
                  "transition-opacity duration-100",
                  quantity === 0 && "invisible"
                )}
              >
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="size-7 rounded-lg border-border/60 active:scale-95 transition-transform duration-100"
                onClick={() => onIncrement(dish.id)}
                aria-label={`Increase quantity of ${dish.name}`}
              >
                <Plus className="size-3.5" strokeWidth={2} />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
