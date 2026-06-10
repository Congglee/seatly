export const formatCurrency = (
  value: number,
  options?: { showSymbol?: boolean }
) => {
  return new Intl.NumberFormat("en-US", {
    style: options?.showSymbol !== false ? "currency" : "decimal",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatCompactCurrency = (value: number) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(0)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`;
  return value.toString();
};
