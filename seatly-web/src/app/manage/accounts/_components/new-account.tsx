import AccountAvatarUpload from "@/components/account-avatar-upload";
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
import { handleErrorApi } from "@/lib/utils/api-error";
import { useCreateAccountMutation } from "@/queries/use-account";
import { useUploadImageMutation } from "@/queries/use-media";
import {
  CreateEmployeeAccountBody,
  type CreateEmployeeAccountBodyType,
} from "@/schemas/account.schema";
import { useNewAccountStore } from "@/store/accounts/use-new-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function NewAccount() {
  const { newAccountSheetOpen, setNewAccountSheetOpen } = useNewAccountStore();
  const [file, setFile] = useState<File | null>(null);

  const createAccountMutation = useCreateAccountMutation();
  const uploadImageMutation = useUploadImageMutation();

  const form = useForm<CreateEmployeeAccountBodyType>({
    resolver: zodResolver(CreateEmployeeAccountBody),
    defaultValues: {
      name: "",
      email: "",
      avatar: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetNewAccountForm = () => {
    form.reset();
    setFile(null);
  };

  const handleSheetOpenChange = (value: boolean) => {
    if (!value) {
      handleResetNewAccountForm();
    }

    setNewAccountSheetOpen(value);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    if (createAccountMutation.isPending || uploadImageMutation.isPending)
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

      const result = await createAccountMutation.mutateAsync({
        ...values,
        avatar: avatarValue?.trim() ? avatarValue : undefined,
      });

      toast.success(result.payload.message);
      handleResetNewAccountForm();
      setNewAccountSheetOpen(false);
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  });

  return (
    <Sheet open={newAccountSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetContent className="scroll w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Thêm tài khoản</SheetTitle>
          <SheetDescription>
            Tạo tài khoản nhân viên mới cho hoạt động quản trị.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 pt-4" noValidate>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="account-name">Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="account-name"
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
                  <FormLabel htmlFor="account-email">Địa chỉ email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="account-email"
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
                      fallbackText={form.watch("name")}
                    />
                  </FormControl>
                  <FormDescription>
                    Tải ảnh đại diện cho tài khoản nhân viên.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="account-password">Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="account-password"
                      type="password"
                      placeholder="Nhập mật khẩu"
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
                  <FormLabel htmlFor="account-confirm-password">
                    Xác nhận mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="account-confirm-password"
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              isLoading={
                createAccountMutation.isPending || uploadImageMutation.isPending
              }
              className="!mt-6 w-full"
            >
              Tạo tài khoản
            </SubmitButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
