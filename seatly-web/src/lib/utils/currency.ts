export const formatCurrency = (
  value: number,
  options?: { showSymbol?: boolean }
) => {
  return new Intl.NumberFormat("vi-VN", {
    style: options?.showSymbol !== false ? "currency" : "decimal",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatCompactCurrency = (value: number) => {
  return `${new Intl.NumberFormat("vi-VN", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value)} ₫`;
};
