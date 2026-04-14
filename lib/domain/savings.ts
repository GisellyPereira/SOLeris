export interface SavingsInput {
  monthlyBill: number;
}

export interface SavingsEstimate {
  monthlyBill: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackYears: number;
  co2TonsPerYear: number;
  reductionPercent: number;
}

const SAVINGS_RATIO = 0.92;
const PAYBACK_BASE_MONTHS = 60;
const PAYBACK_OFFSET_YEARS = 3;
const CO2_KG_PER_REAL = 0.012;
const MIN_PAYBACK_YEARS = 2;

export function estimateSavings({ monthlyBill }: SavingsInput): SavingsEstimate {
  const monthlySavings = Math.round(monthlyBill * SAVINGS_RATIO);
  const yearlySavings = monthlySavings * 12;
  const paybackYears = Math.max(
    MIN_PAYBACK_YEARS,
    Math.round((monthlyBill * PAYBACK_BASE_MONTHS) / yearlySavings) +
      PAYBACK_OFFSET_YEARS,
  );
  const co2TonsPerYear =
    Math.round(monthlyBill * 12 * CO2_KG_PER_REAL * 10) / 10;

  return {
    monthlyBill,
    monthlySavings,
    yearlySavings,
    paybackYears,
    co2TonsPerYear,
    reductionPercent: Math.round(SAVINGS_RATIO * 100),
  };
}

export function formatBRL(value: number): string {
  return `R$ ${Math.round(value).toLocaleString("pt-BR")}`;
}
