import test from "node:test";
import assert from "node:assert/strict";
import { estimateSavings } from "../lib/domain/savings.ts";

test("monthly and annual savings follow the selected scenario", () => {
  const result = estimateSavings({ monthlyBill: 600, reductionPercent: 80 });
  assert.equal(result.monthlySavings, 480);
  assert.equal(result.yearlySavings, 5760);
  assert.equal(
    estimateSavings({ monthlyBill: 600, reductionPercent: 60 }).monthlySavings,
    360,
  );
  assert.equal(
    estimateSavings({ monthlyBill: 600, reductionPercent: 90 }).monthlySavings,
    540,
  );
});
test("invalid values do not create negative or non-finite estimates", () => {
  for (const value of [-100, NaN, Infinity]) {
    const result = estimateSavings({ monthlyBill: value });
    assert.equal(result.monthlySavings, 0);
    assert.equal(result.yearlySavings, 0);
  }
  assert.equal(
    estimateSavings({ monthlyBill: 500, reductionPercent: 120 }).monthlySavings,
    500,
  );
  assert.equal(
    estimateSavings({ monthlyBill: 500, reductionPercent: -1 }).monthlySavings,
    0,
  );
  assert.equal(
    estimateSavings({ monthlyBill: 500, reductionPercent: NaN }).monthlySavings,
    400,
  );
});
