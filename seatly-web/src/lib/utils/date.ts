import { endOfDay, startOfDay, format } from "date-fns";

export const toTimestamp = (value: Date | string) => {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
};

export const formatRelativeTime = (date: Date | string) => {
  const targetDate = date instanceof Date ? date : new Date(date);

  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Vừa xong";
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;

  return targetDate.toLocaleDateString("vi-VN", {
    month: "short",
    day: "numeric",
  });
};

export const formatDateTimeToLocaleString = (date: string | Date) => {
  return format(
    date instanceof Date ? date : new Date(date),
    "HH:mm:ss dd/MM/yyyy"
  );
};

export const formatDateTimeToTimeString = (date: string | Date) => {
  return format(date instanceof Date ? date : new Date(date), "HH:mm:ss");
};

export const getDefaultDateRange = () => ({
  fromDate: startOfDay(new Date()),
  toDate: endOfDay(new Date()),
});

export const parseDateInput = (value: string, fallback: Date) => {
  const nextDate = new Date(value);
  return Number.isNaN(nextDate.getTime()) ? fallback : nextDate;
};

export const formatRemainingTime = (remainingMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
