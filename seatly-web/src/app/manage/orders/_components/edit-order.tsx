import { DishesDialog } from "@/app/manage/orders/_components/dishes-dialog";
import Combobox from "@/components/combobox";
import SubmitButton from "@/components/submit-button";
import { formatCurrency } from "@/lib/utils/currency";
import { UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { orderStatusOptions } from "@/constants/options";
import { OrderStatus } from "@/constants/type";
import {
  useGetOrderDetailQuery,
  useUpdateOrderMutation,
} from "@/queries/use-order";
import { DishListResType } from "@/schemas/dish.schema";
import {
  OrderStatusType,
  UpdateOrderBody,
  UpdateOrderBodyType,
} from "@/schemas/order.schema";
import { useEditOrderStore } from "@/store/orders/use-edit-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils/api-error";

export default function EditOrder() {
  const { orderId, setOrderId, editOrderSheetOpen, setEditOrderSheetOpen } =
    useEditOrderStore();

  const [selectedDish, setSelectedDish] = useState<
    DishListResType["data"]["items"][number] | null
  >(null);

  const form = useForm<UpdateOrderBodyType>({
    resolver: zodResolver(UpdateOrderBody),
    defaultValues: {
      status: OrderStatus.Pending,
      dishId: "",
      quantity: 1,
    },
  });

  const { data } = useGetOrderDetailQuery({
    enabled: Boolean(orderId),
    id: orderId ?? "",
  });
  const order = data?.payload.data;

  const updateOrderMutation = useUpdateOrderMutation();

  const handleResetEditOrderForm = () => {
    setOrderId(undefined);
    setEditOrderSheetOpen(false);
  };

  useEffect(() => {
    form.reset({
      status: OrderStatus.Pending,
      dishId: "",
      quantity: 1,
    });
    setSelectedDish(null);
  }, [form, orderId]);

  useEffect(() => {
    if (order) {
      const { status, dishSnapshot, quantity } = order;
      form.reset({ status, dishId: dishSnapshot.dishId ?? "", quantity });
      setSelectedDish(dishSnapshot);
    }
  }, [order, form]);

  const onSubmit = form.handleSubmit(
    async (values) => {
      if (updateOrderMutation.isPending || !orderId) return;

      try {
        const body: UpdateOrderBodyType & { orderId: string } = {
          orderId,
          ...values,
        };
        const result = await updateOrderMutation.mutateAsync(body);
        toast.success(result.payload.message);
        handleResetEditOrderForm();
      } catch (error) {
        handleErrorApi({ error, setError: form.setError });
      }
    },
    (error) => {
      console.log(error);
    }
  );

  return (
    <Sheet
      open={editOrderSheetOpen}
      onOpenChange={(value) => {
        if (!value) {
          handleResetEditOrderForm();
        }
      }}
    >
      <SheetContent className="scroll w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Chỉnh sửa đơn hàng</SheetTitle>
          <SheetDescription>Cập nhật thông tin đơn hàng.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 pt-4" noValidate>
            <FormField
              name="dishId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Món ăn</FormLabel>
                  {selectedDish ? (
                    <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
                      <Image
                        src={selectedDish.image}
                        alt={selectedDish.name}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="truncate text-sm font-semibold leading-snug">
                          {selectedDish.name}
                        </p>
                        <p className="text-sm font-medium tabular-nums text-primary">
                          {formatCurrency(selectedDish.price)}
                        </p>
                        {selectedDish.description && (
                          <p className="line-clamp-2 text-xs text-muted-foreground">
                            {selectedDish.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border border-dashed border-border py-6">
                      <div className="text-center">
                        <UtensilsCrossed className="mx-auto size-8 text-muted-foreground/50" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Chưa chọn món
                        </p>
                      </div>
                    </div>
                  )}
                  <DishesDialog
                    onDishChoose={(dish) => {
                      field.onChange(dish.id);
                      setSelectedDish(dish);
                    }}
                    onResetDish={() => {
                      field.onChange(order?.dishSnapshot.dishId ?? "");
                      setSelectedDish(order?.dishSnapshot ?? null);
                    }}
                    canReset={Boolean(order?.dishSnapshot.dishId)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="quantity">Số lượng</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="quantity"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Nhập số lượng"
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numberValue = Number(value);

                        if (isNaN(numberValue)) {
                          return;
                        }

                        field.onChange(numberValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="status">Trạng thái</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      options={orderStatusOptions}
                      onChange={(value) => {
                        form.setValue("status", value as OrderStatusType);
                      }}
                      placeholder="Chọn trạng thái"
                      emptyText="Không tìm thấy trạng thái"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              isLoading={updateOrderMutation.isPending}
              className="!mt-6 w-full"
            >
              Lưu thay đổi
            </SubmitButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
