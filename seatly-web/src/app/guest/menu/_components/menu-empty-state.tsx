import { UtensilsCrossed } from "lucide-react";

export default function MenuEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center">
      <div className="flex items-center justify-center size-16 rounded-2xl bg-muted/60 border border-border/60">
        <UtensilsCrossed
          className="size-7 text-muted-foreground/60"
          strokeWidth={1.5}
        />
      </div>
      <div className="space-y-1.5 max-w-[260px]">
        <h3 className="text-base font-semibold text-foreground">
          Chưa có món khả dụng
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Thực đơn đang được cập nhật. Vui lòng quay lại sau ít phút hoặc nhờ
          nhân viên hỗ trợ.
        </p>
      </div>
    </div>
  );
}
