"use client";

import AccountAvatarUpload from "@/components/account-avatar-upload";
import SubmitButton from "@/components/submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { formatDateTimeToLocaleString } from "@/lib/utils/date";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useUploadImageMutation } from "@/queries/use-media";
import { useGetMeQuery, useUpdateMeMutation } from "@/queries/use-account";
import {
  UpdateMeBody,
  type UpdateMeBodyType,
} from "@/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileSettingsForm() {
  const [file, setFile] = useState<File | null>(null);
  const [originalAvatar, setOriginalAvatar] = useState<string | undefined>();

  const meQuery = useGetMeQuery();
  const updateMeMutation = useUpdateMeMutation();
  const uploadImageMutation = useUploadImageMutation();

  const account = meQuery.data?.payload.data;

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: "",
      avatar: undefined,
    },
  });

  useEffect(() => {
    if (!account) {
      return;
    }

    setFile(null);
    setOriginalAvatar(account.avatar ?? undefined);
    form.reset({
      name: account.name,
      avatar: account.avatar ?? undefined,
    });
  }, [account, form]);

  const handleResetForm = () => {
    if (!account) {
      form.reset();
      setFile(null);
      setOriginalAvatar(undefined);
      return;
    }

    setFile(null);
    setOriginalAvatar(account.avatar ?? undefined);
    form.reset({
      name: account.name,
      avatar: account.avatar ?? undefined,
    });
  };

  const onSubmit = form.handleSubmit(async (values) => {
    if (updateMeMutation.isPending || uploadImageMutation.isPending) {
      return;
    }

    try {
      let avatarValue = values.avatar;

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadImageResult = await uploadImageMutation.mutateAsync(formData);
        avatarValue = uploadImageResult.payload.data;
      }

      const result = await updateMeMutation.mutateAsync({
        name: values.name,
        avatar: avatarValue?.trim() ? avatarValue : undefined,
      });

      toast.success(result.payload.message);
      setFile(null);
      setOriginalAvatar(result.payload.data.avatar ?? undefined);
      form.reset({
        name: result.payload.data.name,
        avatar: result.payload.data.avatar ?? undefined,
      });
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  });

  if (meQuery.isPending && !account) {
    return (
      <Card className="border-border/60 shadow-sm">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="h-64 animate-pulse rounded-2xl bg-muted/60" />
          <div className="space-y-4">
            <div className="h-10 animate-pulse rounded-xl bg-muted/60" />
            <div className="h-24 animate-pulse rounded-xl bg-muted/60" />
            <div className="h-10 animate-pulse rounded-xl bg-muted/60" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (meQuery.isError && !account) {
    return (
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Account profile</CardTitle>
          <CardDescription>
            We could not load your profile information right now.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button type="button" variant="secondary" onClick={() => meQuery.refetch()}>
            Try again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Account profile</CardTitle>
            <CardDescription>
              Keep your identity and profile image up to date across the
              management workspace.
            </CardDescription>
          </div>
          {account?.role ? <Badge variant="secondary">{account.role}</Badge> : null}
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} noValidate>
          <CardContent className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <FormField
              name="avatar"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
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
                    Upload a square image for best results on the navigation
                    menu and account tables.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="profile-name">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="profile-name"
                        placeholder="Enter your full name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email
                  </p>
                  <p className="mt-2 text-sm font-medium">{account?.email ?? "-"}</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Member since
                  </p>
                  <p className="mt-2 text-sm font-medium">
                    {account?.createdAt
                      ? formatDateTimeToLocaleString(account.createdAt)
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background p-4 text-sm text-muted-foreground">
                Your email address is used for authentication and cannot be
                changed from this page.
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" variant="secondary" onClick={handleResetForm}>
              Reset
            </Button>
            <SubmitButton
              isLoading={
                updateMeMutation.isPending || uploadImageMutation.isPending
              }
            >
              Save changes
            </SubmitButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
