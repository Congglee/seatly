import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TableStatus } from "@/constants/type";
import {
  useGetTableDetailQuery,
  useUpdateTableMutation,
} from "@/queries/use-table";
import {
  TableStatusType,
  UpdateTableBody,
  UpdateTableBodyType,
} from "@/schemas/table.schema";
import { useEditTableStore } from "@/store/tables/use-edit-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { tableStatusOptions } from "@/constants/options";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import QRCodeTable from "@/components/qrcode-table";
import Link from "next/link";
import { getTableLink } from "@/lib/utils/table-link";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Check, Copy, ExternalLink, QrCode } from "lucide-react";
import { handleErrorApi } from "@/lib/utils/api-error";

export default function EditTable() {
  const {
    tableNumber,
    setTableNumber,
    editTableSheetOpen,
    setEditTableSheetOpen,
  } = useEditTableStore();

  const form = useForm<UpdateTableBodyType>({
    resolver: zodResolver(UpdateTableBody),
    defaultValues: {
      capacity: 2,
      status: TableStatus.Hidden,
      changeToken: false,
    },
  });

  const { data } = useGetTableDetailQuery({
    enabled: Boolean(tableNumber),
    id: tableNumber ?? 0,
  });
  const table = data?.payload.data;

  const updateTableMutation = useUpdateTableMutation();

  const [copied, setCopied] = useState(false);

  const handleCopyUrl = useCallback(() => {
    if (!table) return;

    const url = getTableLink({ token: table.token, tableNumber: table.number });

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success("Đã sao chép URL");
      setTimeout(() => setCopied(false), 2000);
    });
  }, [table]);

  const handleResetEditTableForm = () => {
    setTableNumber(undefined);
    setEditTableSheetOpen(false);
  };

  useEffect(() => {
    form.reset({
      capacity: 2,
      status: TableStatus.Hidden,
      changeToken: false,
    });
  }, [form, tableNumber]);

  useEffect(() => {
    if (table) {
      const { capacity, status } = table;
      form.reset({
        capacity,
        status,
        changeToken: form.getValues("changeToken"),
      });
    }
  }, [table, form]);

  const onSubmit = form.handleSubmit(
    async (values) => {
      if (updateTableMutation.isPending || !tableNumber) return;

      try {
        const body: UpdateTableBodyType & { id: number } = {
          id: tableNumber,
          ...values,
        };

        const result = await updateTableMutation.mutateAsync(body);

        toast.success(result.payload.message);

        handleResetEditTableForm();
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
      open={editTableSheetOpen}
      onOpenChange={(value) => {
        if (!value) {
          handleResetEditTableForm();
        }
      }}
    >
      <SheetContent className="space-y-4 w-full sm:max-w-lg overflow-y-auto scroll">
        <SheetHeader>
          <SheetTitle>Edit Table</SheetTitle>
          <SheetDescription>Edit the table details.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 pt-4" noValidate>
            <FormItem>
              <Label htmlFor="number">Table Number</Label>
              <Input
                id="number"
                type="number"
                value={table?.number ?? 0}
                readOnly
              />
            </FormItem>
            <FormField
              name="capacity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="capacity">Capacity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="capacity"
                      type="number"
                      min={1}
                      placeholder="Enter capacity"
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
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      options={tableStatusOptions}
                      onChange={(value) => {
                        form.setValue("status", value as TableStatusType);
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
              name="changeToken"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-md border px-3 py-3 !space-y-0">
                  <div className="space-y-0.5">
                    <FormLabel htmlFor="changeToken" className="leading-none">
                      Change QR Code
                    </FormLabel>
                    <p className="text-xs text-muted-foreground leading-snug">
                      Change the QR code for this table
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      id="changeToken"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">QR Code</Label>
              </div>
              {data && table ? (
                <div className="rounded-xl border border-border/60 bg-muted/30 p-5 space-y-4">
                  <div className="flex justify-center">
                    <QRCodeTable
                      token={table.token}
                      tableNumber={table.number}
                      width={220}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground tracking-wider">
                      Table call URL
                    </span>
                    <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background px-3 py-2.5">
                      <code className="flex-1 text-xs break-all font-mono text-foreground/80 leading-relaxed select-all">
                        {getTableLink({
                          token: table.token,
                          tableNumber: table.number,
                        })}
                      </code>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={handleCopyUrl}
                          className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground active:scale-95"
                          aria-label="Sao chép URL"
                        >
                          {copied ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <Link
                          href={getTableLink({
                            token: table.token,
                            tableNumber: table.number,
                          })}
                          target="_blank"
                          className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground active:scale-95"
                          aria-label="Mở URL trong tab mới"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <SubmitButton
              isLoading={updateTableMutation.isPending}
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
