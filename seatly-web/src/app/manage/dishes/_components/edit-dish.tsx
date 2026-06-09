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
import {
  useGetDishDetailQuery,
  useUpdateDishMutation,
} from "@/queries/use-dish";
import { useUploadImageMutation } from "@/queries/use-media";
import {
  type DishStatusType,
  UpdateDishBody,
  type UpdateDishBodyType,
} from "@/schemas/dish.schema";
import { useEditDishStore } from "@/store/dishes/use-edit-dish";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditDish() {
  const { dishId, setDishId, editDishSheetOpen, setEditDishSheetOpen } =
    useEditDishStore();

  const form = useForm<UpdateDishBodyType>({
    resolver: zodResolver(UpdateDishBody),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
      status: DishStatus.Hidden,
    },
  });

  const name = form.watch("name");

  const { data } = useGetDishDetailQuery({
    enabled: Boolean(dishId),
    id: dishId ?? "",
  });
  const dish = data?.payload.data;

  const [file, setFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | undefined>(
    undefined
  );

  const updateDishMutation = useUpdateDishMutation();
  const uploadImageMutation = useUploadImageMutation();

  const handleResetEditDishForm = () => {
    setDishId(undefined);
    setEditDishSheetOpen(false);
    setFile(null);
    setOriginalImage(undefined);
  };

  useEffect(() => {
    form.reset({
      name: "",
      price: 0,
      description: "",
      image: "",
      status: DishStatus.Hidden,
    });
    setOriginalImage(undefined);
  }, [form, dishId]);

  useEffect(() => {
    if (dish) {
      const { name, price, description, image, status } = dish;
      setOriginalImage(image);
      form.reset({ name, price, description, image, status });
    }
  }, [dish, form]);

  const onSubmit = form.handleSubmit(
    async (values) => {
      if (
        updateDishMutation.isPending ||
        uploadImageMutation.isPending ||
        !dishId
      )
        return;

      try {
        let imageValue = values.image;

        if (file) {
          const formData = new FormData();
          formData.append("image", file);

          const uploadImageResult = await uploadImageMutation.mutateAsync(
            formData
          );
          imageValue = uploadImageResult.payload.data;
        }

        const body: UpdateDishBodyType & { id: string } = {
          id: dishId,
          ...values,
          image: imageValue,
        };

        const result = await updateDishMutation.mutateAsync(body);

        toast.success(result.payload.message);

        handleResetEditDishForm();
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
      open={editDishSheetOpen}
      onOpenChange={(value) => {
        if (!value) {
          handleResetEditDishForm();
        }
      }}
    >
      <SheetContent className="scroll w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Edit Dish</SheetTitle>
          <SheetDescription>Edit dish details in your menu.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 pt-4" noValidate>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Dish Name</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" placeholder="Enter dish name" />
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
                  <FormLabel htmlFor="price">Price (USD)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      min={1}
                      placeholder="Enter dish price (USD)"
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
                  <FormLabel>Dish Image</FormLabel>
                  <DishImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    onFileChange={setFile}
                    altText={name}
                    originalValue={originalImage}
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
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      options={dishStatusOptions}
                      onChange={(value) => {
                        form.setValue("status", value as DishStatusType);
                      }}
                      placeholder="Select a status"
                      emptyText="No status found"
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
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Enter dish description"
                      className="min-h-28"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              isLoading={
                updateDishMutation.isPending || uploadImageMutation.isPending
              }
              className="!mt-6 w-full"
            >
              Save changes
            </SubmitButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
