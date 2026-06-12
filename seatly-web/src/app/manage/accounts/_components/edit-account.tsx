import AccountAvatarUpload from "@/components/account-avatar-upload";
import Combobox from "@/components/combobox";
import SubmitButton from "@/components/submit-button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { accountRoleOptions } from "@/constants/options";
import { Role } from "@/constants/type";
import { handleErrorApi } from "@/lib/utils/api-error";
import {
  useGetAccountDetailQuery,
  useUpdateAccountMutation,
} from "@/queries/use-account";
import { useUploadImageMutation } from "@/queries/use-media";
import {
  UpdateEmployeeAccountBody,
  type UpdateEmployeeAccountBodyType,
} from "@/schemas/account.schema";
import { useEditAccountStore } from "@/store/accounts/use-edit-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditAccount() {
  const {
    accountId,
    setAccountId,
    editAccountSheetOpen,
    setEditAccountSheetOpen,
  } = useEditAccountStore();
  const [file, setFile] = useState<File | null>(null);
  const [originalAvatar, setOriginalAvatar] = useState<string | undefined>();

  const updateAccountMutation = useUpdateAccountMutation();
  const uploadImageMutation = useUploadImageMutation();

  const { data } = useGetAccountDetailQuery({
    id: accountId ?? "",
    enabled: Boolean(accountId),
  });

  const account = data?.payload.data;

  const form = useForm<UpdateEmployeeAccountBodyType>({
    resolver: zodResolver(UpdateEmployeeAccountBody),
    defaultValues: {
      name: "",
      email: "",
      avatar: undefined,
      changePassword: false,
      password: undefined,
      confirmPassword: undefined,
      role: Role.Employee,
    },
  });

  const changePassword = form.watch("changePassword");

  const handleResetEditAccountForm = () => {
    setAccountId(undefined);
    setEditAccountSheetOpen(false);
    setFile(null);
    setOriginalAvatar(undefined);
    form.reset({
      name: "",
      email: "",
      avatar: undefined,
      changePassword: false,
      password: undefined,
      confirmPassword: undefined,
      role: Role.Employee,
    });
  };

  useEffect(() => {
    setFile(null);
    setOriginalAvatar(undefined);

    form.reset({
      name: "",
      email: "",
      avatar: undefined,
      changePassword: false,
      password: undefined,
      confirmPassword: undefined,
      role: Role.Employee,
    });
  }, [accountId, form]);

  useEffect(() => {
    if (!account) return;

    setOriginalAvatar(account.avatar ?? undefined);
    form.reset({
      name: account.name,
      email: account.email,
      avatar: account.avatar ?? undefined,
      changePassword: false,
      password: undefined,
      confirmPassword: undefined,
      role: account.role,
    });
  }, [account, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    if (
      updateAccountMutation.isPending ||
      uploadImageMutation.isPending ||
      !accountId
    )
      return;

    try {
      let avatarValue = values.avatar;

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadImageResult = await uploadImageMutation.mutateAsync(
          formData
        );
        avatarValue = uploadImageResult.payload.data;
      }

      const result = await updateAccountMutation.mutateAsync({
        id: accountId,
        ...values,
        avatar: avatarValue?.trim() ? avatarValue : undefined,
        password:
          values.changePassword && values.password
            ? values.password
            : undefined,
        confirmPassword:
          values.changePassword && values.confirmPassword
            ? values.confirmPassword
            : undefined,
      });

      toast.success(result.payload.message);
      handleResetEditAccountForm();
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  });

  return (
    <Sheet
      open={editAccountSheetOpen}
      onOpenChange={(value) => {
        if (!value) {
          handleResetEditAccountForm();
        }
      }}
    >
      <SheetContent className="scroll w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Chỉnh sửa tài khoản</SheetTitle>
          <SheetDescription>
            Cập nhật thông tin nhân viên và điều chỉnh vai trò truy cập.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 pt-4" noValidate>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="edit-account-name">Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="edit-account-name"
                      placeholder="Nhập họ tên nhân viên"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="edit-account-email">Địa chỉ email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="edit-account-email"
                      type="email"
                      placeholder="Nhập email nhân viên"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="avatar"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh đại diện</FormLabel>
                  <FormControl>
                    <AccountAvatarUpload
                      value={field.value}
                      onChange={field.onChange}
                      onFileChange={setFile}
                      originalValue={originalAvatar}
                      fallbackText={form.watch("name")}
                    />
                  </FormControl>
                  <FormDescription>
                    Tải lên hoặc thay ảnh đại diện hiển thị trong danh sách nhân viên.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="edit-account-role">Vai trò</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      options={accountRoleOptions}
                      onChange={(value) =>
                        form.setValue("role", value as typeof field.value)
                      }
                      placeholder="Chọn vai trò"
                      emptyText="Không tìm thấy vai trò"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="changePassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border border-border/60 p-4">
                  <div className="space-y-1">
                    <FormLabel className="text-sm">Đổi mật khẩu</FormLabel>
                    <FormDescription>
                      Bật tùy chọn này để đặt mật khẩu mới cho tài khoản.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        if (!value) {
                          form.setValue("password", undefined);
                          form.setValue("confirmPassword", undefined);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {changePassword && (
              <>
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="edit-account-password">
                        Mật khẩu mới
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={field.value ?? ""}
                          onChange={(event) =>
                            field.onChange(event.target.value || undefined)
                          }
                          id="edit-account-password"
                          type="password"
                          placeholder="Nhập mật khẩu mới"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="edit-account-confirm-password">
                        Xác nhận mật khẩu mới
                      </FormLabel>
                      <FormControl>
                        <Input
                          value={field.value ?? ""}
                          onChange={(event) =>
                            field.onChange(event.target.value || undefined)
                          }
                          id="edit-account-confirm-password"
                          type="password"
                          placeholder="Nhập lại mật khẩu mới"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <SubmitButton
              isLoading={
                updateAccountMutation.isPending || uploadImageMutation.isPending
              }
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
