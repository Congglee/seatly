import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";

interface OrderFiltersProps {
  fromDate: Date;
  toDate: Date;
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  onReset: () => void;
}

export default function OrderFilters({
  fromDate,
  toDate,
  onDateRangeChange,
  onReset,
}: OrderFiltersProps) {
  const selectedDateRange: DateRange = {
    from: fromDate,
    to: toDate,
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex w-full flex-col gap-1.5 sm:w-fit">
          <p className="text-sm font-medium">Khoảng thời gian</p>
          <DatePicker
            id="orders-date-range"
            date={selectedDateRange}
            onDateSelect={onDateRangeChange}
            variant="outline"
            numberOfMonths={2}
            className="h-10 w-full justify-start text-left font-normal sm:w-auto"
            aria-label="Chọn khoảng thời gian cho đơn hàng"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onReset}
        >
          Đặt lại ngày
        </Button>
      </div>
    </div>
  );
}
