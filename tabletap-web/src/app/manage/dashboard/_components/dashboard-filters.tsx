import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface DashboardFiltersProps {
  fromDate: Date;
  toDate: Date;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onReset: () => void;
}

export default function DashboardFilters({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onReset,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm lg:flex-row lg:items-end lg:justify-between">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-1.5">
          <p className="text-sm font-medium">From</p>
          <Input
            type="datetime-local"
            value={format(fromDate, "yyyy-MM-dd'T'HH:mm")}
            onChange={(event) => onFromDateChange(event.target.value)}
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium">To</p>
          <Input
            type="datetime-local"
            value={format(toDate, "yyyy-MM-dd'T'HH:mm")}
            onChange={(event) => onToDateChange(event.target.value)}
            className="h-10"
          />
        </div>
        <div className="flex items-end gap-2">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset dates
          </Button>
        </div>
      </div>
    </div>
  );
}
