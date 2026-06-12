"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoginBody, LoginBodyType } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/submit-button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/providers/app-provider";
import { useLoginMutation } from "@/queries/use-auth";
import { useEffect } from "react";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils/api-error";
import SearchParamsLoader, {
  useSearchParamsLoader,
} from "@/components/search-params-loader";
import { generateSocketInstace } from "@/lib/utils/socket";

export default function LoginCard() {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  const { searchParams, setSearchParams } = useSearchParamsLoader();
  const clearTokens = searchParams?.get("clearTokens");

  const setRole = useAppStore((state) => state.setRole);
  const setSocket = useAppStore((state) => state.setSocket);

  const loginMutation = useLoginMutation();

  useEffect(() => {
    if (clearTokens) {
      setRole(undefined);
    }
  }, [clearTokens, setRole]);

  const onSubmit = form.handleSubmit(
    async (values) => {
      if (loginMutation.isPending) return;

      try {
        const result = await loginMutation.mutateAsync(values);
        toast.success(result.payload.message);
        setRole(result.payload.data.account.role);
        router.push("/manage/dashboard");
        setSocket(generateSocketInstace(result.payload.data.accessToken));
      } catch (error) {
        handleErrorApi({ error, setError: form.setError });
      }
    },
    (error) => {
      console.log(error);
    }
  );

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none bg-muted dark:bg-card">
      <SearchParamsLoader onParamsReceived={setSearchParams} />
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Chào mừng quay lại</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Địa chỉ email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Nhập địa chỉ email"
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
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                    <Link
                      href="/reset"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Nhập mật khẩu"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              isLoading={loginMutation.isPending}
              size="lg"
              className="w-full"
            >
              Đăng nhập
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
      <Separator />
      <CardContent className="p-7 flex flex-col">
        <Button
          variant="outline"
          size="lg"
          className="w-full hover:bg-secondary hover:text-secondary-foreground"
          disabled={false}
          onClick={() => {}}
        >
          <FcGoogle className="mr-2 size-5" />
          Đăng nhập bằng Google
        </Button>
      </CardContent>
      <Separator />
      <CardContent className="p-4 flex items-center justify-center">
        <p className="text-sm font-medium text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link href="/register">
            <span className="text-primary hover:underline">Đăng ký</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
