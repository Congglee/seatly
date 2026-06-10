export const toTimestamp = (value: Date | string) => {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
};

export const formatRelativeTime = (date: Date | string) => {
  const targetDate = date instanceof Date ? date : new Date(date);

  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
