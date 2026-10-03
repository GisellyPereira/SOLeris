export interface SavingsInput {
  monthlyBill: number;
  reductionPercent?: number;
}
export interface SavingsEstimate {
  monthlyBill: number;
  monthlySavings: number;
  yearlySavings: number;
  reductionPercent: number;
}

/** Illustrative scenarios, not a site survey or a guaranteed financial return. */
export function estimateSavings({
  monthlyBill,
  reductionPercent = 80,
}: SavingsInput): SavingsEstimate {
  const bill = Number.isFinite(monthlyBill) ? Math.max(0, monthlyBill) : 0;
  const reduction = Number.isFinite(reductionPercent)
    ? Math.max(0, Math.min(100, reductionPercent))
    : 80;
  const monthlySavings = Math.round((bill * reduction) / 100);
  return {
    monthlyBill: bill,
    monthlySavings,
    yearlySavings: monthlySavings * 12,
    reductionPercent: reduction,
  };
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
