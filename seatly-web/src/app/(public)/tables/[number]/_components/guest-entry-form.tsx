"use client";

import SubmitButton from "@/components/submit-button";
import GuestEntryError, {
  GUEST_ENTRY_TOKEN_ERROR_CONTENT,
  resolveGuestEntryTokenErrorType,
} from "@/app/(public)/tables/[number]/_components/guest-entry-error";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleErrorApi } from "@/lib/utils/api-error";
import { generateSocketInstace } from "@/lib/utils/socket";
import { useAppStore } from "@/providers/app-provider";
import { useGuestLoginMutation } from "@/queries/use-guest";
import { GuestLoginBody, GuestLoginBodyType } from "@/schemas/guest.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Users, UtensilsCrossed } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function GuestEntryForm() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tableNumber = Number(params.number);
  const token = searchParams.get("token");
  const normalizedToken = token?.trim() ?? "";

  const [tokenErrorType, setTokenErrorType] =
    useState<ReturnType<typeof resolveGuestEntryTokenErrorType>>(null);
  const tokenFromUrlErrorType = resolveGuestEntryTokenErrorType({ token });
  const activeTokenErrorType = tokenErrorType ?? tokenFromUrlErrorType;

  const form = useForm<GuestLoginBodyType>({
    resolver: zodResolver(GuestLoginBody),
    defaultValues: {
      name: "",
      token: normalizedToken,
      tableNumber,
    },
  });

  const loginMutation = useGuestLoginMutation();

  const setSocket = useAppStore((state) => state.setSocket);
  const setRole = useAppStore((state) => state.setRole);

  const onSubmit = form.handleSubmit(
    async (values) => {
      if (loginMutation.isPending) return;

      try {
        const result = await loginMutation.mutateAsync(values);
        setRole(result.payload.data.guest.role);
        setSocket(generateSocketInstace(result.payload.data.accessToken));
        router.push("/guest/menu");
      } catch (error) {
        const matchedTokenErrorType = resolveGuestEntryTokenErrorType({
          token: normalizedToken,
          error,
        });

        if (matchedTokenErrorType) {
          setTokenErrorType(matchedTokenErrorType);
          return;
        }

        handleErrorApi({ error, setError: form.setError });
      }
    },
    (error) => {
      console.log(error);
    }
  );

  if (activeTokenErrorType) {
    const errorContent = GUEST_ENTRY_TOKEN_ERROR_CONTENT[activeTokenErrorType];

    return (
      <GuestEntryError
        title={errorContent.title}
        description={errorContent.description}
        actionLabel={errorContent.actionLabel}
        onAction={() => router.push("/")}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="flex items-center justify-center size-20 rounded-2xl bg-primary/10 border border-primary/20">
            <UtensilsCrossed
              className="size-9 text-primary"
              strokeWidth={1.5}
            />
          </div>
          <Badge className="absolute -top-2 -right-3 tabular-nums bg-primary text-primary-foreground border-2 border-background px-2.5 py-0.5 text-xs font-bold shadow-sm">
            #{tableNumber}
          </Badge>
        </div>
      </div>
      <div className="text-center space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Chào mừng đến bàn {tableNumber}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
          Nhập tên của bạn để tham gia bàn này và bắt đầu xem thực đơn.
        </p>
      </div>
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 text-muted-foreground text-xs font-medium">
        <Users className="size-3.5" strokeWidth={1.5} />
        <span>Tối đa 4 khách tại bàn này</span>
      </div>
      <div className="w-full pt-1">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="guest-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Tên của bạn
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="guest-name"
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn An"
                      autoFocus
                      className="h-12 rounded-xl px-4 text-base bg-muted/40 border-border/60 placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-colors duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              isLoading={loginMutation.isPending}
              disabled={loginMutation.isPending}
              className="w-full h-12 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] active:translate-y-[1px] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Vào bàn
              <ArrowRight className="size-4" />
            </SubmitButton>
          </form>
        </Form>
      </div>
      <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-[260px] mx-auto text-center">
        Sau khi vào bàn, bạn có thể xem thực đơn và đặt món cho bàn này.
      </p>
    </div>
  );
}
