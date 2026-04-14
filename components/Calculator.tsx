"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar, Leaf, TrendingDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { estimateSavings, formatBRL } from "@/lib/domain/savings";

const BILL_MIN = 200;
const BILL_MAX = 5000;
const BILL_STEP = 50;
const DEFAULT_BILL = 500;

export default function Calculator() {
  const [bill, setBill] = useState(DEFAULT_BILL);
  const estimate = useMemo(() => estimateSavings({ monthlyBill: bill }), [bill]);

  const sliderProgress = ((bill - BILL_MIN) / (BILL_MAX - BILL_MIN)) * 100;
  const sliderGradient = `linear-gradient(to right, var(--ink) 0%, var(--ink) ${sliderProgress}%, var(--ink-10) ${sliderProgress}%, var(--ink-10) 100%)`;

  return (
    <section id="economia" className="relative py-32 px-6 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Calculadora"
          title="Quanto você pode"
          accent="economizar?"
          className="mb-14"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="panel rounded-[32px] p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <BillInput
              bill={bill}
              sliderGradient={sliderGradient}
              onChange={setBill}
              paybackYears={estimate.paybackYears}
              co2={estimate.co2TonsPerYear}
            />
            <ResultsPanel
              monthlySavings={estimate.monthlySavings}
              yearlySavings={estimate.yearlySavings}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface BillInputProps {
  bill: number;
  sliderGradient: string;
  onChange: (value: number) => void;
  paybackYears: number;
  co2: number;
}

function BillInput({ bill, sliderGradient, onChange, paybackYears, co2 }: BillInputProps) {
  return (
    <div>
      <label htmlFor="bill-slider" className="block text-sm text-ink-60 mb-4">
        Sua conta de luz mensal
      </label>
      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-ink-45 text-2xl">R$</span>
        <motion.span
          key={bill}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          className="display text-6xl md:text-7xl text-ink tabular-nums"
        >
          {bill.toLocaleString("pt-BR")}
        </motion.span>
      </div>
      <input
        id="bill-slider"
        type="range"
        min={BILL_MIN}
        max={BILL_MAX}
        step={BILL_STEP}
        value={bill}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Valor da conta de luz mensal"
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ background: sliderGradient }}
      />
      <div className="flex justify-between text-xs text-ink-45 mt-3">
        <span>{formatBRL(BILL_MIN)}</span>
        <span>{formatBRL(BILL_MAX)}</span>
      </div>

      <div className="mt-10 pt-8 border-t border-ink-10 grid grid-cols-2 gap-6">
        <MetricLabel label="Retorno em" value={`${paybackYears} anos`} />
        <MetricLabel
          label="CO₂/ano"
          value={`${co2}t`}
          icon={<Leaf className="w-3 h-3 text-olive" />}
        />
      </div>
    </div>
  );
}

function MetricLabel({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs uppercase tracking-wider text-ink-60 mb-1">
        {icon}
        {label}
      </div>
      <div className="display text-3xl text-ink">{value}</div>
    </div>
  );
}

interface ResultsPanelProps {
  monthlySavings: number;
  yearlySavings: number;
}

function ResultsPanel({ monthlySavings, yearlySavings }: ResultsPanelProps) {
  const monthlyMV = useMotionValue(0);
  const yearlyMV = useMotionValue(0);

  useEffect(() => {
    const monthly = animate(monthlyMV, monthlySavings, { duration: 0.6 });
    const yearly = animate(yearlyMV, yearlySavings, { duration: 0.6 });
    return () => {
      monthly.stop();
      yearly.stop();
    };
  }, [monthlySavings, yearlySavings, monthlyMV, yearlyMV]);

  const monthlyDisplay = useTransform(monthlyMV, formatBRL);
  const yearlyDisplay = useTransform(yearlyMV, formatBRL);

  return (
    <div className="space-y-3">
      <ResultCard
        icon={<TrendingDown className="w-5 h-5" />}
        label="Economia mensal"
        value={monthlyDisplay}
        highlight
      />
      <ResultCard
        icon={<Calendar className="w-5 h-5" />}
        label="Economia em 1 ano"
        value={yearlyDisplay}
      />

      <Button as="a" href="#cta" className="mt-6 px-6 py-4 group w-full">
        Quero economizar {formatBRL(yearlySavings)}/ano
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Button>
      <p className="text-xs text-ink-45 text-center">
        Estimativa baseada em tarifa média B1 · ajustamos ao seu CEP no orçamento
      </p>
    </div>
  );
}

interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  value: unknown;
  highlight?: boolean;
}

function ResultCard({ icon, label, value, highlight }: ResultCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 flex items-center justify-between ${
        highlight ? "bg-ink" : "panel-cream"
      }`}
      style={highlight ? { color: "#f5efe4" } : {}}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            highlight ? "bg-white/10" : "bg-white text-ink"
          }`}
          style={highlight ? { color: "#e8722c" } : {}}
        >
          {icon}
        </div>
        <span className={`text-sm ${highlight ? "" : "text-ink-60"}`}>
          {label}
        </span>
      </div>
      <motion.span
        className="display text-2xl tabular-nums"
        style={highlight ? { color: "#f5efe4" } : { color: "var(--ink)" }}
      >
        {value as React.ReactNode}
      </motion.span>
    </div>
  );
}
