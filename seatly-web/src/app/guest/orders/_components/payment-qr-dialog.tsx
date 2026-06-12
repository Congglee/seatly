import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";
import { formatRemainingTime } from "@/lib/utils/date";
import type { CreateGuestQrPaymentResType } from "@/schemas/payment.schema";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type PaymentQRData = CreateGuestQrPaymentResType["data"];

const QR_SIZE = 240;

interface PaymentQRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: PaymentQRData | null;
  isCreating: boolean;
  isPaid: boolean;
  isCheckingStatus: boolean;
  onCreatePayment: () => void;
  onCheckStatus: () => void | Promise<void>;
}

export default function PaymentQRDialog({
  open,
  onOpenChange,
  payment,
  isCreating,
  isPaid,
  isCheckingStatus,
  onCreatePayment,
  onCheckStatus,
}: PaymentQRDialogProps) {
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    if (!open || !payment) {
      setRemainingMs(0);
      return;
    }

    const updateRemainingTime = () => {
      setRemainingMs(new Date(payment.expiresAt).getTime() - Date.now());
    };

    updateRemainingTime();
    const intervalId = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(intervalId);
  }, [open, payment]);

  const expiresAtMs = payment ? new Date(payment.expiresAt).getTime() : 0;
  const rawRemainingMs = payment ? remainingMs || expiresAtMs - Date.now() : 0;
  const effectiveRemainingMs = Number.isFinite(rawRemainingMs)
    ? rawRemainingMs
    : 0;
  const isExpired = Boolean(payment) && effectiveRemainingMs <= 0 && !isPaid;
  const canShowQr = Boolean(payment) && !isCreating && !isPaid;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[calc(100vw-2rem)] gap-4 overflow-y-auto rounded-2xl p-4 sm:max-w-lg sm:p-6 md:max-w-xl">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle>Thanh toán chuyển khoản</DialogTitle>
          <DialogDescription>
            Quét mã QR bằng ứng dụng ngân hàng. Hệ thống sẽ tự xác nhận sau khi
            nhận đúng số tiền và nội dung.
          </DialogDescription>
        </DialogHeader>

        {isPaid ? (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-5 text-center">
            <CheckCircle2 className="mx-auto size-9 text-emerald-600 dark:text-emerald-400" />
            <p className="mt-3 text-sm font-semibold text-foreground">
              Thanh toán thành công
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Cảm ơn bạn. Hóa đơn đã được xác nhận và đơn hàng đã được cập nhật.
            </p>
          </div>
        ) : isCreating ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-border bg-muted/30 px-4 py-8 text-center">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="mt-3 text-sm font-semibold text-foreground">
              Đang tạo mã QR
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Vui lòng chờ trong giây lát.
            </p>
          </div>
        ) : payment ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-xs text-muted-foreground">
                Số tiền cần chuyển
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                {formatCurrency(payment.amount)}
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Badge variant="outline" className="rounded-md tabular-nums">
                  {payment.bankCode === "TPB"
                    ? "TP Bank (TPB)"
                    : payment.bankCode}
                </Badge>
                <span className="text-xs font-medium text-muted-foreground tabular-nums">
                  {payment.bankAccount}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "flex flex-col items-center rounded-xl border border-border bg-background p-3",
                isExpired && "opacity-60",
                isCheckingStatus && "opacity-80"
              )}
            >
              <div className="rounded-lg border border-border/50 bg-white p-1">
                <Image
                  src={payment.qrUrl}
                  alt="Mã QR thanh toán chuyển khoản"
                  width={QR_SIZE}
                  height={QR_SIZE}
                  unoptimized
                  className="block size-[220px] rounded-md sm:size-[240px]"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Nội dung chuyển khoản
              </p>
              <p className="mt-1 rounded-md bg-muted px-2 py-1 font-mono text-sm font-semibold tracking-wide text-foreground">
                {payment.code}
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5" />
                  Thời gian còn lại
                </span>
                <span
                  className={cn(
                    "font-semibold tabular-nums",
                    isExpired ? "text-destructive" : "text-foreground"
                  )}
                >
                  {isExpired
                    ? "Đã hết hạn"
                    : formatRemainingTime(effectiveRemainingMs)}
                </span>
              </div>
              <Separator className="bg-border/60" />
              <p>
                Sau khi chuyển khoản, vui lòng chờ vài giây để hệ thống tự xác
                nhận. Không cần gửi ảnh biên lai nếu số tiền và nội dung đã
                chính xác.
              </p>
              {isCheckingStatus && (
                <div className="flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-2 text-primary">
                  <Loader2 className="size-3.5 animate-spin" />
                  <span className="font-medium">
                    Đang kiểm tra trạng thái thanh toán...
                  </span>
                </div>
              )}
            </div>

            {payment.hasProcessingOrders && (
              <div className="flex gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                <p>
                  Một số món vẫn đang được xử lý. Bạn vẫn có thể thanh toán
                  trước, nhưng nếu gọi thêm món sau đó hệ thống sẽ tạo hóa đơn
                  mới.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-muted/30 px-4 py-6 text-center">
            <p className="text-sm font-semibold text-foreground">
              Chưa có mã QR thanh toán
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tạo mã QR để thanh toán đúng số tiền hiện tại.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-2 sm:space-x-0">
          {isPaid ? (
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Hoàn tất
            </Button>
          ) : isExpired ? (
            <Button
              onClick={onCreatePayment}
              disabled={isCreating}
              className="w-full gap-2"
            >
              {isCreating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <RefreshCcw className="size-4" />
              )}
              Tạo mã QR mới
            </Button>
          ) : (
            <>
              {canShowQr && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCheckStatus}
                  disabled={isCheckingStatus}
                  className="w-full"
                >
                  {isCheckingStatus && (
                    <Loader2 className="size-4 animate-spin" />
                  )}
                  {isCheckingStatus ? "Đang kiểm tra..." : "Kiểm tra lại"}
                </Button>
              )}
              {!payment && (
                <Button
                  onClick={onCreatePayment}
                  disabled={isCreating}
                  className="w-full gap-2"
                >
                  {isCreating && <Loader2 className="size-4 animate-spin" />}
                  Tạo mã QR
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
