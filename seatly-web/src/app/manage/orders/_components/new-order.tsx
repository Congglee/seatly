import GuestsDialog from "@/app/manage/orders/_components/guests-dialog";
import TablesDialog from "@/app/manage/orders/_components/tables-dialog";
import SubmitButton from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { DishStatus } from "@/constants/type";
import { cn } from "@/lib/utils";
import { handleErrorApi } from "@/lib/utils/api-error";
import { formatCurrency } from "@/lib/utils/currency";
import { useCreateGuestMutation } from "@/queries/use-account";
import { useGetDishListQuery } from "@/queries/use-dish";
import { useCreateOrderMutation } from "@/queries/use-order";
import {
  CreateOrderBody,
  CreateOrderBodyType,
  type CreateOrdersBodyType,
  type OrderDishItemType,
  type OrderGuestItemType,
  type OrderTableItemType,
} from "@/schemas/order.schema";
import { useNewOrderStore } from "@/store/orders/use-new-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, UserRound } from "lucide-react";
import Image from "next/image";
import { type FormEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function NewOrder() {
  const { newOrderSheetOpen, setNewOrderSheetOpen } = useNewOrderStore();

  const [isNewGuest, setIsNewGuest] = useState(true);
  const [selectedGuest, setSelectedGuest] = useState<OrderGuestItemType | null>(
    null
  );
  const [selectedTable, setSelectedTable] = useState<OrderTableItemType | null>(
    null
  );
  const [orders, setOrders] = useState<CreateOrdersBodyType["orders"]>([]);

  const form = useForm<CreateOrderBodyType>({
    resolver: zodResolver(CreateOrderBody),
    defaultValues: {
      name: "",
      tableNumber: 0,
    },
  });

  const dishListQuery = useGetDishListQuery(
    {
      page: 1,
      limit: 1000,
    },
    {
      enabled: newOrderSheetOpen,
    }
  );
  const createOrderMutation = useCreateOrderMutation();
  const createGuestMutation = useCreateGuestMutation();

  const dishes = useMemo(() => {
    const items = dishListQuery.data?.payload.data.items ?? [];

    return [...items]
      .filter((dish) => dish.status !== DishStatus.Hidden)
      .sort((a, b) => {
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
  }, [dishListQuery.data]);

  const quantityByDishId = useMemo(() => {
    return orders.reduce<Record<string, number>>((result, order) => {
      result[order.dishId] = order.quantity;
      return result;
    }, {});
  }, [orders]);

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

  const handleResetAddOrderForm = () => {
    form.reset({
      name: "",
      tableNumber: 0,
    });
    setIsNewGuest(true);
    setSelectedGuest(null);
    setSelectedTable(null);
    setOrders([]);
  };

  const handleNewOrderSheetOpenChange = (value: boolean) => {
    if (!value) {
      handleResetAddOrderForm();
    }

    setNewOrderSheetOpen(value);
  };

  const handleQuantityChange = (dishId: string, quantity: number) => {
    setOrders((prevOrders) => {
      if (quantity <= 0) {
        return prevOrders.filter((order) => order.dishId !== dishId);
      }

      const orderIndex = prevOrders.findIndex(
        (order) => order.dishId === dishId
      );

      if (orderIndex === -1) {
        return [...prevOrders, { dishId, quantity }];
      }

      const nextOrders = [...prevOrders];
      nextOrders[orderIndex] = {
        ...nextOrders[orderIndex],
        quantity,
      };

      return nextOrders;
    });
  };

  const handleIncrement = (dishId: string) => {
    const currentQuantity = quantityByDishId[dishId] ?? 0;
    handleQuantityChange(dishId, currentQuantity + 1);
  };

  const handleDecrement = (dishId: string) => {
    const currentQuantity = quantityByDishId[dishId] ?? 0;
    handleQuantityChange(dishId, Math.max(0, currentQuantity - 1));
  };

  const canSubmitNewGuest = Boolean(selectedTable) && orders.length > 0;
  const canSubmitExistingGuest =
    Boolean(selectedGuest?.id) &&
    selectedGuest?.tableNumber !== null &&
    orders.length > 0;

  const submitOrder = async (values?: CreateOrderBodyType) => {
    if (orders.length === 0) return;

    try {
      let guestId = selectedGuest?.id;

      if (isNewGuest) {
        if (!values || !selectedTable) {
          return;
        }

        const guestResult = await createGuestMutation.mutateAsync({
          name: values.name,
          tableNumber: values.tableNumber,
        });

        guestId = guestResult.payload.data.id;
      } else {
        if (!selectedGuest) {
          toast.error("Please choose an existing guest.");
          return;
        }

        if (selectedGuest.tableNumber === null) {
          toast.error("This guest is no longer assigned to a table.");
          return;
        }
      }

      if (!guestId) {
        toast.error("Please choose a valid guest before creating the order.");
        return;
      }

      const result = await createOrderMutation.mutateAsync({ guestId, orders });

      toast.success(result.payload.message);
      handleNewOrderSheetOpenChange(false);
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNewGuest) {
      await form.handleSubmit(submitOrder)(event);
      return;
    }

    await submitOrder();
  };

  return (
    <Sheet
      open={newOrderSheetOpen}
      onOpenChange={handleNewOrderSheetOpenChange}
    >
      <SheetContent className="scroll w-full space-y-4 overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Add Order</SheetTitle>
          <SheetDescription>
            Create an order for a new guest or assign dishes to an existing
            guest.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6 pt-4" noValidate>
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">New guest</p>
                <p className="text-xs text-muted-foreground">
                  Switch off to choose an existing guest from the recent list.
                </p>
              </div>
              <Switch checked={isNewGuest} onCheckedChange={setIsNewGuest} />
            </div>

            {isNewGuest ? (
              <div className="space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="guest-name">Guest Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="guest-name"
                          placeholder="Enter guest name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="tableNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between gap-3">
                        <FormLabel>Table</FormLabel>
                        <TablesDialog
                          onTableChoose={(table) => {
                            setSelectedTable(table);
                            field.onChange(table.number);
                          }}
                        />
                      </div>
                      <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
                        {selectedTable ? (
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <Badge variant="secondary">
                              Table {selectedTable.number}
                            </Badge>
                            <span className="text-muted-foreground">
                              {selectedTable.capacity} seats
                            </span>
                            <span className="text-muted-foreground">
                              Status: {selectedTable.status}
                            </span>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No table selected yet.
                          </p>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <GuestsDialog onGuestChoose={setSelectedGuest} />

                <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
                  {selectedGuest ? (
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserRound className="size-5" />
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{selectedGuest.name}</p>
                        <p className="text-muted-foreground">
                          ID: {selectedGuest.id}
                        </p>
                        <p className="text-muted-foreground">
                          Table: {selectedGuest.tableNumber ?? "-"}
                        </p>
                        {selectedGuest.tableNumber === null && (
                          <p className="text-xs text-destructive">
                            This guest cannot be used because no table is
                            assigned.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No existing guest selected yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Dishes</p>
                  <p className="text-xs text-muted-foreground">
                    Add dishes and adjust quantities before creating the order.
                  </p>
                </div>
                <Badge variant="secondary">{totalItems} items</Badge>
              </div>

              {dishListQuery.isPending ? (
                <div className="rounded-lg border border-border/60 p-6 text-center text-sm text-muted-foreground">
                  Loading dishes...
                </div>
              ) : dishes.length === 0 ? (
                <div className="rounded-lg border border-border/60 p-6 text-center text-sm text-muted-foreground">
                  No available dishes found.
                </div>
              ) : (
                <div className="space-y-3">
                  {dishes.map((dish) => {
                    const quantity = quantityByDishId[dish.id] ?? 0;
                    const isUnavailable =
                      dish.status === DishStatus.Unavailable;

                    return (
                      <DishOrderCard
                        key={dish.id}
                        dish={dish}
                        quantity={quantity}
                        isUnavailable={isUnavailable}
                        onIncrement={() => handleIncrement(dish.id)}
                        onDecrement={() => handleDecrement(dish.id)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Selected items</span>
                <span className="font-medium tabular-nums">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated total</span>
                <span className="font-semibold tabular-nums">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>

            <SubmitButton
              isLoading={
                createOrderMutation.isPending || createGuestMutation.isPending
              }
              className="w-full justify-between"
              disabled={
                isNewGuest ? !canSubmitNewGuest : !canSubmitExistingGuest
              }
            >
              <span>Create order</span>
              <span>{formatCurrency(totalPrice)}</span>
            </SubmitButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

function DishOrderCard({
  dish,
  quantity,
  isUnavailable,
  onIncrement,
  onDecrement,
}: {
  dish: OrderDishItemType;
  quantity: number;
  isUnavailable: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-card p-3 transition-colors duration-150",
        isUnavailable && "opacity-60"
      )}
    >
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-28">
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
              className="px-1.5 py-0.5 text-[10px] font-semibold"
            >
              Sold out
            </Badge>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5">
        <div className="space-y-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-sm font-semibold leading-snug text-foreground">
              {dish.name}
            </h3>
            <span className="shrink-0 text-sm font-semibold tabular-nums text-primary">
              {formatCurrency(dish.price)}
            </span>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {dish.description}
          </p>
        </div>
        <div className="flex items-center justify-end gap-1 pt-0.5">
          {!isUnavailable && (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={cn(
                  "size-7 rounded-lg border-border/60 transition-transform duration-100 active:scale-95",
                  quantity === 0 && "invisible"
                )}
                onClick={onDecrement}
                aria-label={`Decrease quantity of ${dish.name}`}
              >
                <Minus className="size-3.5" strokeWidth={2} />
              </Button>

              <span
                className={cn(
                  "w-7 text-center text-sm font-semibold tabular-nums text-foreground transition-opacity duration-100",
                  quantity === 0 && "invisible"
                )}
              >
                {quantity}
              </span>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-7 rounded-lg border-border/60 transition-transform duration-100 active:scale-95"
                onClick={onIncrement}
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
