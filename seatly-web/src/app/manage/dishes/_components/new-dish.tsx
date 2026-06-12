import DishImageUpload from "@/app/manage/dishes/_components/dish-image-upload";
import Combobox from "@/components/combobox";
import SubmitButton from "@/components/submit-button";
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
import { Textarea } from "@/components/ui/textarea";
import { dishStatusOptions } from "@/constants/options";
import { DishStatus } from "@/constants/type";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useAddDishMutation } from "@/queries/use-dish";
import { useUploadImageMutation } from "@/queries/use-media";
import {
  CreateDishBody,
  type CreateDishBodyType,
  type DishStatusType,
} from "@/schemas/dish.schema";
import { useNewDishStore } from "@/store/dishes/use-new-dish";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function NewDish() {
  const { newDishSheetOpen, setNewDishSheetOpen } = useNewDishStore();

  const [file, setFile] = useState<File | null>(null);

  const form = useForm<CreateDishBodyType>({
    resolver: zodResolver(CreateDishBody),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: undefined,
      status: DishStatus.Hidden,
    },
  });

  const name = form.watch("name");

  const addDishMutation = useAddDishMutation();
  const uploadImageMutation = useUploadImageMutation();

  const handleResetAddDishForm = () => {
    form.reset();
    setFile(null);
  };

  const handleNewDishSheetOpenChange = (value: boolean) => {
    if (!value) {
      handleResetAddDishForm();
    }
    setNewDishSheetOpen(value);
  };

  const onSubmit = form.handleSubmit(
    async (values) => {
      if (addDishMutation.isPending || uploadImageMutation.isPending) return;

      try {
        let body = values;

        if (file) {
          const formData = new FormData();
          formData.append("image", file);

          const uploadImageResult = await uploadImageMutation.mutateAsync(
            formData
          );
          const imageUrl = uploadImageResult.payload.data;

          body = { ...values, image: imageUrl };
        }

        const result = await addDishMutation.mutateAsync(body);

        toast.success(result.payload.message);

        handleResetAddDishForm();
        setNewDishSheetOpen(false);
      } catch (error) {
        handleErrorApi({ error, setError: form.setError });
      }
    },
    (error) => {
      console.log(error);
    }
  );

  return (
    <Sheet open={newDishSheetOpen} onOpenChange={handleNewDishSheetOpenChange}>
      <SheetContent className="scroll w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Thêm món mới</SheetTitle>
          <SheetDescription>
            Tạo món mới để quản lý trong thực đơn.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="space-y-4 pt-4"
            onReset={handleResetAddDishForm}
            noValidate
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Tên món</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" placeholder="Nhập tên món" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Giá (VND)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      min={1}
                      placeholder="Nhập giá món (VND)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh món</FormLabel>
                  <DishImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    onFileChange={setFile}
                    altText={name}
                  />
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
                      options={dishStatusOptions}
                      onChange={(value) => {
                        form.setValue("status", value as DishStatusType);
                      }}
                      placeholder="Chọn trạng thái"
                      emptyText="Không tìm thấy trạng thái"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Nhập mô tả món"
                      className="min-h-28"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              isLoading={
                addDishMutation.isPending || uploadImageMutation.isPending
              }
              className="!mt-6 w-full"
            >
              Tạo món
            </SubmitButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
