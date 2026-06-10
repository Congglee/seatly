import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";

interface DashboardFiltersProps {
  fromDate: Date;
  toDate: Date;
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  onReset: () => void;
}

export default function DashboardFilters({
  fromDate,
  toDate,
  onDateRangeChange,
  onReset,
}: DashboardFiltersProps) {
  const selectedDateRange: DateRange = {
    from: fromDate,
    to: toDate,
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex w-fit flex-col gap-1.5">
          <p className="text-sm font-medium">Date range</p>
          <DatePicker
            id="dashboard-date-range"
            date={selectedDateRange}
            onDateSelect={onDateRangeChange}
            variant="outline"
            numberOfMonths={2}
            className="h-10 justify-start text-left font-normal"
            aria-label="Choose dashboard date range"
          />
        </div>
        <Button type="button" variant="outline" onClick={onReset}>
          Reset dates
        </Button>
      </div>
    </div>
  );
}
