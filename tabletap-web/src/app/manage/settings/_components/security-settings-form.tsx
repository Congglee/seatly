"use client";

import authApiRequest from "@/apis/auth.api";
import SubmitButton from "@/components/submit-button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { decodeToken } from "@/lib/jwt-decode";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useAppStore } from "@/providers/app-provider";
import { useChangePasswordMutation } from "@/queries/use-account";
import {
  ChangePasswordBody,
  type ChangePasswordBodyType,
} from "@/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SecuritySettingsForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setRole = useAppStore((state) => state.setRole);

  const changePasswordMutation = useChangePasswordMutation();

  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetForm = () => {
    form.reset();
  };

  const onSubmit = form.handleSubmit(async (values) => {
    if (changePasswordMutation.isPending) {
      return;
    }

    try {
      const result = await changePasswordMutation.mutateAsync(values);

      await authApiRequest.setTokenToCookie({
        accessToken: result.payload.data.accessToken,
        refreshToken: result.payload.data.refreshToken,
      });

      setRole(decodeToken(result.payload.data.accessToken).role);

      queryClient.invalidateQueries({ queryKey: ["account-me"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });

      toast.success(result.payload.message);
      form.reset();
      router.refresh();
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  });

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Change password</CardTitle>
            <CardDescription>
              Use a strong password that you do not reuse in other services.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} noValidate>
          <CardContent className="grid gap-6">
            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="old-password">Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="old-password"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="new-password">New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
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
                  <FormLabel htmlFor="confirm-password">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="confirm-password"
                      type="password"
                      placeholder="Re-enter new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" variant="secondary" onClick={handleResetForm}>
              Reset
            </Button>
            <SubmitButton isLoading={changePasswordMutation.isPending}>
              Save changes
            </SubmitButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
