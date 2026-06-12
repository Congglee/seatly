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
import { tableStatusOptions } from "@/constants/options";
import { TableStatus } from "@/constants/type";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useAddTableMutation } from "@/queries/use-table";
import {
  CreateTableBody,
  type CreateTableBodyType,
  type TableStatusType,
} from "@/schemas/table.schema";
import { useNewTableStore } from "@/store/tables/use-new-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function NewTable() {
  const { newTableSheetOpen, setNewTableSheetOpen } = useNewTableStore();

  const form = useForm<CreateTableBodyType>({
    resolver: zodResolver(CreateTableBody),
    defaultValues: {
      number: 0,
      capacity: 2,
      status: TableStatus.Hidden,
    },
  });

  const addTableMutation = useAddTableMutation();

  const handleResetAddTableForm = () => {
    form.reset();
  };

  const handleNewTableSheetOpenChange = (value: boolean) => {
    if (!value) {
      handleResetAddTableForm();
    }
    setNewTableSheetOpen(value);
  };

  const onSubmit = form.handleSubmit(
    async (values) => {
      if (addTableMutation.isPending) return;

      try {
        const result = await addTableMutation.mutateAsync(values);

        toast.success(result.payload.message);

        handleResetAddTableForm();
        setNewTableSheetOpen(false);
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
      open={newTableSheetOpen}
      onOpenChange={handleNewTableSheetOpenChange}
    >
      <SheetContent className="space-y-4 w-full sm:max-w-lg overflow-y-auto scroll">
        <SheetHeader>
          <SheetTitle>Thêm bàn mới</SheetTitle>
          <SheetDescription>
            Tạo bàn mới để theo dõi và phục vụ khách.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="space-y-4 pt-4"
            onReset={handleResetAddTableForm}
            noValidate
          >
            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="number">Số bàn</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="number"
                      type="number"
                      min={1}
                      placeholder="Nhập số bàn"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="capacity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="capacity">Sức chứa</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="capacity"
                      type="number"
                      min={1}
                      placeholder="Nhập sức chứa"
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
                      options={tableStatusOptions}
                      onChange={(value) => {
                        form.setValue("status", value as TableStatusType);
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
              isLoading={addTableMutation.isPending}
              className="!mt-6 w-full"
            >
              Tạo bàn
            </SubmitButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
