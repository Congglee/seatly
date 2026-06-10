"use client";

import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function ManageFilters() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDate({ from, to });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 lg:gap-x-2">
      <DatePicker
        date={date}
        onDateSelect={handleDateSelect}
        variant="outline"
      />
    </div>
  );
}
