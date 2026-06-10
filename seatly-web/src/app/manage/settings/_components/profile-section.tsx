import SettingsSection from "@/app/manage/settings/_components/settings-section";
import AccountAvatarUpload from "@/components/account-avatar-upload";
import SubmitButton from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Role } from "@/constants/type";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useGetMeQuery, useUpdateMeMutation } from "@/queries/use-account";
import { useUploadImageMutation } from "@/queries/use-media";
import { UpdateMeBody, type UpdateMeBodyType } from "@/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ShieldCheck, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileSection() {
  const { data } = useGetMeQuery();
  const account = data?.payload.data;

  const updateMeMutation = useUpdateMeMutation();
  const uploadImageMutation = useUploadImageMutation();

  const [file, setFile] = useState<File | null>(null);
  const [originalAvatar, setOriginalAvatar] = useState<string | undefined>();

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: "",
      avatar: undefined,
    },
  });

  useEffect(() => {
    if (!account) return;

    setOriginalAvatar(account.avatar ?? undefined);
    form.reset({
      name: account.name,
      avatar: account.avatar ?? undefined,
    });
  }, [account, form]);

  const handleResetProfileForm = () => {
    setFile(null);
    form.reset({
      name: account?.name ?? "",
      avatar: account?.avatar ?? undefined,
    });
  };

  const isPending = updateMeMutation.isPending || uploadImageMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
    if (isPending) return;

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

      const result = await updateMeMutation.mutateAsync({
        ...values,
        avatar: avatarValue?.trim() ? avatarValue : undefined,
      });

      toast.success(result.payload.message);
      setFile(null);
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  });

  const isOwner = account?.role === Role.Owner;

  return (
    <Form {...form}>
      <form noValidate onSubmit={onSubmit}>
        <SettingsSection
          title="Profile"
          description="Update how your account appears across the workspace."
          icon={UserCog}
          footer={
            <>
              <Button
                type="button"
                variant="ghost"
                className="w-full sm:w-auto"
                disabled={isPending}
                onClick={handleResetProfileForm}
              >
                Reset
              </Button>
              <SubmitButton
                isLoading={isPending}
                disabled={!account}
                className="w-full sm:w-auto"
              >
                Save changes
              </SubmitButton>
            </>
          }
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-8">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Profile photo</FormLabel>
                  <FormControl>
                    <AccountAvatarUpload
                      value={field.value}
                      onChange={field.onChange}
                      onFileChange={setFile}
                      originalValue={originalAvatar}
                      fallbackText={form.watch("name")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="settings-name">Display name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="settings-name"
                        placeholder="Enter your full name"
                      />
                    </FormControl>
                    <FormDescription>
                      This name is shown to your team and on activity logs.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label htmlFor="settings-email">Email address</Label>
                <div className="relative">
                  <Input
                    id="settings-email"
                    type="email"
                    value={account?.email ?? ""}
                    readOnly
                    disabled
                    className="pr-10"
                    placeholder="you@example.com"
                  />
                  <Lock className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your email is used for sign-in and cannot be changed here.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-lg border border-border/60 bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background text-muted-foreground">
                    <ShieldCheck className="size-4" />
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Access role</p>
                    <p className="text-xs text-muted-foreground">
                      Determines what you can manage in the workspace.
                    </p>
                  </div>
                </div>
                <Badge
                  variant={isOwner ? "default" : "secondary"}
                  className="w-fit"
                >
                  {account?.role ?? "—"}
                </Badge>
              </div>
            </div>
          </div>
        </SettingsSection>
      </form>
    </Form>
  );
}
