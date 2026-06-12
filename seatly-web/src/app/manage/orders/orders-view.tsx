"use client";

import OrderFilters from "@/app/manage/orders/_components/order-filters";
import OrderTable from "@/app/manage/orders/_components/order-table";
import { getDefaultDateRange } from "@/lib/utils/date";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrdersView() {
  const router = useRouter();
  const [fromDate, setFromDate] = useState(
    () => getDefaultDateRange().fromDate
  );
  const [toDate, setToDate] = useState(() => getDefaultDateRange().toDate);

  const handleResetDateFilter = () => {
    const nextRange = getDefaultDateRange();
    setFromDate(nextRange.fromDate);
    setToDate(nextRange.toDate);
    router.replace("/manage/orders");
  };

  const handleDateRangeChange = ({ from, to }: { from: Date; to: Date }) => {
    setFromDate(from);
    setToDate(to);
    router.replace("/manage/orders");
  };

  return (
    <div className="mt-4 space-y-6">
      <OrderFilters
        fromDate={fromDate}
        toDate={toDate}
        onDateRangeChange={handleDateRangeChange}
        onReset={handleResetDateFilter}
      />
      <OrderTable fromDate={fromDate} toDate={toDate} />
    </div>
  );
}
