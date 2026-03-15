"use client";

import MenuDishCard from "@/app/guest/menu/_components/menu-dish-card";
import MenuEmptyState from "@/app/guest/menu/_components/menu-empty-state";
import MenuOrderSummary from "@/app/guest/menu/_components/menu-order-summary";
import MenuSkeleton from "@/app/guest/menu/_components/menu-skeleton";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { DishStatus } from "@/constants/type";
import { cn } from "@/lib/utils";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useDishListQuery } from "@/queries/use-dish";
import { useGuestOrderDishMutation } from "@/queries/use-guest";
import { GuestCreateOrdersBodyType } from "@/schemas/guest.schema";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function GuestMenuView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<GuestCreateOrdersBodyType>([]);

  const dishListQuery = useDishListQuery({ page: 1, limit: DEFAULT_LIMIT });
  const createGuestOrderMutation = useGuestOrderDishMutation();

  const router = useRouter();

  useEffect(() => {
    if (!dishListQuery.error) {
      return;
    }

    handleErrorApi({ error: dishListQuery.error });
  }, [dishListQuery.error]);

  const dishes = useMemo(
    () => dishListQuery.data?.payload.data.items ?? [],
    [dishListQuery.data]
  );

  const quantityByDishId = useMemo(() => {
    return orders.reduce<Record<string, number>>((result, order) => {
      result[order.dishId] = order.quantity;
      return result;
    }, {});
  }, [orders]);

  const visibleDishes = useMemo(() => {
    return dishes.filter((dish) => {
      if (dish.status === DishStatus.Hidden) {
        return false;
      }

      if (!searchQuery.trim()) {
        return true;
      }

      const query = searchQuery.toLowerCase().trim();

      return (
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query)
      );
    });
  }, [dishes, searchQuery]);

  const sortedDishes = useMemo(() => {
    return [...visibleDishes].sort((a, b) => {
      if (
        a.status === DishStatus.Available &&
        b.status === DishStatus.Unavailable
      ) {
        return -1;
      }

      if (
        a.status === DishStatus.Unavailable &&
        b.status === DishStatus.Available
      ) {
        return 1;
      }

      return 0;
    });
  }, [visibleDishes]);

  const availableDishCount = useMemo(() => {
    return sortedDishes.filter((dish) => dish.status === DishStatus.Available)
      .length;
  }, [sortedDishes]);

  const handleQuantityChange = useCallback(
    (dishId: string, quantity: number) => {
      setOrders((prevOrders) => {
        if (quantity <= 0) {
          return prevOrders.filter((order) => order.dishId !== dishId);
        }

        const currentOrderIndex = prevOrders.findIndex(
          (order) => order.dishId === dishId
        );

        if (currentOrderIndex === -1) {
          return [...prevOrders, { dishId, quantity }];
        }

        const nextOrders = [...prevOrders];
        nextOrders[currentOrderIndex] = {
          ...nextOrders[currentOrderIndex],
          quantity,
        };

        return nextOrders;
      });
    },
    []
  );

  const handleIncrement = useCallback(
    (dishId: string) => {
      const currentQuantity = quantityByDishId[dishId] ?? 0;
      handleQuantityChange(dishId, currentQuantity + 1);
    },
    [handleQuantityChange, quantityByDishId]
  );

  const handleDecrement = useCallback(
    (dishId: string) => {
      const currentQuantity = quantityByDishId[dishId] ?? 0;
      handleQuantityChange(dishId, Math.max(0, currentQuantity - 1));
    },
    [handleQuantityChange, quantityByDishId]
  );

  const totalItems = useMemo(() => {
    return orders.reduce((result, order) => result + order.quantity, 0);
  }, [orders]);

  const totalPrice = useMemo(() => {
    return dishes.reduce((result, dish) => {
      const quantity = quantityByDishId[dish.id] ?? 0;

      if (quantity === 0) {
        return result;
      }

      return result + quantity * dish.price;
    }, 0);
  }, [dishes, quantityByDishId]);

  const createGuestOrders = useCallback(async () => {
    if (orders.length === 0 || createGuestOrderMutation.isPending) {
      return;
    }

    try {
      await createGuestOrderMutation.mutateAsync(orders);
      router.push("/guest/orders");
    } catch (error) {
      handleErrorApi({ error });
    }
  }, [createGuestOrderMutation, orders, router]);

  return (
    <>
      <div className="max-w-lg mx-auto w-full px-4 pt-0 pb-2">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60"
            strokeWidth={1.5}
          />
          <Input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-10 pl-9 pr-4 rounded-xl text-sm bg-muted/40 border-border/60 placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-colors duration-200"
          />
        </div>
      </div>
      <Separator className="bg-border/40 max-w-lg mx-auto w-full" />
      {!dishListQuery.isPending && sortedDishes.length > 0 && (
        <div className="max-w-lg mx-auto w-full px-4 pt-3 pb-1">
          <p className="text-xs text-muted-foreground tabular-nums">
            {availableDishCount} {availableDishCount === 1 ? "dish" : "dishes"}{" "}
            available
            {sortedDishes.length > availableDishCount && (
              <span className="text-muted-foreground/60">
                {" "}
                &middot; {sortedDishes.length - availableDishCount} sold out
              </span>
            )}
          </p>
        </div>
      )}
      <div
        className={cn(
          "flex-1 max-w-lg mx-auto w-full px-4 py-3",
          totalItems > 0 ? "pb-40" : "pb-8"
        )}
      >
        {dishListQuery.isPending ? (
          <MenuSkeleton />
        ) : sortedDishes.length === 0 ? (
          <MenuEmptyState />
        ) : (
          <div className="space-y-3">
            {sortedDishes.map((dish) => (
              <MenuDishCard
                key={dish.id}
                dish={dish}
                quantity={quantityByDishId[dish.id] ?? 0}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))}
          </div>
        )}
      </div>
      <MenuOrderSummary
        totalItems={totalItems}
        totalPrice={totalPrice}
        isSubmitting={createGuestOrderMutation.isPending}
        onSubmit={createGuestOrders}
      />
    </>
  );
}
