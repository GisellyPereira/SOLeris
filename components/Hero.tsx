"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  Sun,
  TrendingDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { ease } from "@/lib/motion";
import { heroHighlights, partners } from "@/lib/content";
import { palette, serifItalic } from "@/lib/theme";

const HEADLINE_WORDS = ["Energia", "solar", "que", "paga"] as const;
const HEADLINE_ACCENT = "a si mesma.";

const AVATAR_COLORS = ["#c2410c", "#92400e", "#5b6b3a", "#14110f"] as const;

const GENERATION_KWH = 8.42;
const MONTHLY_SAVINGS_BRL = 1847;
const CO2_KG = 312;
const GENERATION_BARS = [28, 46, 62, 78, 92, 86, 74, 58, 48, 64, 80, 70];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-24"
      style={{
        background: `radial-gradient(1200px 600px at 85% 10%, ${palette.bone} 0%, ${palette.cream} 45%, ${palette.cream} 100%)`,
        color: palette.ink,
      }}
    >
      <BackgroundGrid />
      <EmberHalo />

      <motion.div
        style={{ y: parallaxY, opacity: fadeOut }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center"
      >
        <HeroContent />
        <LiveDashboard />
      </motion.div>

      <PartnersStrip />
    </section>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(${palette.ink} 1px, transparent 1px), linear-gradient(90deg, ${palette.ink} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
      }}
    />
  );
}

function EmberHalo() {
  return (
    <div
      aria-hidden
      className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${palette.ember}22 0%, transparent 60%)`,
        filter: "blur(40px)",
      }}
    />
  );
}

function HeroContent() {
  return (
    <div>
      <AuthorityBadge />
      <Headline />
      <Description />
      <HighlightList />
      <Actions />
      <SocialProof />
    </div>
  );
}

function AuthorityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-8 bg-white border border-ink-10"
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: palette.ember }}
      />
      <span
        className="text-[11px] uppercase tracking-[0.22em]"
        style={{ color: "rgba(20,17,15,0.7)" }}
      >
        Homologada ANEEL · INMETRO Classe A
      </span>
    </motion.div>
  );
}

function Headline() {
  return (
    <h1
      className="display text-5xl md:text-6xl lg:text-[80px] text-ink leading-[0.98] mb-7"
    >
      {HEADLINE_WORDS.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15 + index * 0.07, ease }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.9,
          delay: 0.15 + HEADLINE_WORDS.length * 0.07,
          ease,
        }}
        className="inline-block relative"
        style={{ ...serifItalic, color: palette.ember }}
      >
        {HEADLINE_ACCENT}
        <HeadlineUnderline />
      </motion.span>
    </h1>
  );
}

function HeadlineUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 12"
      className="absolute -bottom-2 left-0 w-full"
      fill="none"
    >
      <motion.path
        d="M2 8 Q 80 2, 150 6 T 298 4"
        stroke={palette.ember}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      />
    </svg>
  );
}

function Description() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.75 }}
      className="text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
      style={{ color: "rgba(20,17,15,0.7)" }}
    >
      Projeto engenheirado, instalação em{" "}
      <strong className="text-ink font-medium">até 30 dias</strong> e retorno
      garantido em{" "}
      <strong className="text-ink font-medium">menos de 4 anos</strong>. Sua
      próxima conta pode vir{" "}
      <strong className="text-ember font-semibold">95% mais barata</strong>.
    </motion.p>
  );
}

function HighlightList() {
  return (
    <motion.ul
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="grid sm:grid-cols-2 gap-2.5 mb-10 max-w-lg"
    >
      {heroHighlights.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm"
          style={{ color: "rgba(20,17,15,0.8)" }}
        >
          <CheckCircle2
            className="w-4 h-4 shrink-0 mt-0.5"
            style={{ color: palette.ember }}
          />
          {item}
        </li>
      ))}
    </motion.ul>
  );
}

function Actions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.05 }}
      className="flex flex-col sm:flex-row gap-3 mb-10"
    >
      <Button as="a" href="#economia" className="group px-7 py-4">
        Calcular minha economia
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Button>
      <Button as="a" href="#como-funciona" variant="ghost" className="px-7 py-4">
        Falar com um engenheiro
      </Button>
    </motion.div>
  );
}

function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.25 }}
      className="flex items-center gap-5 pt-6 border-t border-ink-10"
    >
      <div className="flex -space-x-2">
        {AVATAR_COLORS.map((color, index) => (
          <div
            key={index}
            className="w-9 h-9 rounded-full"
            style={{ background: color, border: `2px solid ${palette.cream}` }}
          />
        ))}
      </div>
      <div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5"
              fill={palette.ember}
              style={{ color: palette.ember }}
            />
          ))}
          <span className="text-sm font-semibold ml-1.5 text-ink">4.9/5</span>
        </div>
        <div className="text-xs" style={{ color: "rgba(20,17,15,0.6)" }}>
          +2.400 famílias atendidas · NPS 87
        </div>
      </div>
    </motion.div>
  );
}

function LiveDashboard() {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  const generation = useCountUp(GENERATION_KWH, 2200, started);
  const savings = useCountUp(MONTHLY_SAVINGS_BRL, 2200, started);
  const co2 = useCountUp(CO2_KG, 2200, started);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="relative rounded-[28px] p-6 md:p-7 bg-white border border-ink-10"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.8) inset, 0 30px 60px -30px rgba(20,17,15,0.25), 0 10px 25px -15px rgba(20,17,15,0.15)",
        }}
      >
        <DashboardHeader />
        <DashboardMetrics
          generation={generation}
          savings={savings}
          co2={co2}
        />
        <GenerationChart />
        <DashboardFooter />
      </motion.div>

      <RatingBadge />
      <LiveProductionBadge />
    </motion.div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ background: palette.olive }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: palette.olive }}
          />
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(20,17,15,0.5)" }}
        >
          Monitorando · ao vivo
        </span>
      </div>
      <div
        className="flex items-center gap-1.5 text-xs"
        style={{ color: "rgba(20,17,15,0.6)" }}
      >
        <Sun className="w-3.5 h-3.5" style={{ color: palette.ember }} />
        Jardins — SP
      </div>
    </div>
  );
}

interface DashboardMetricsProps {
  generation: number;
  savings: number;
  co2: number;
}

function DashboardMetrics({ generation, savings, co2 }: DashboardMetricsProps) {
  const metrics = [
    {
      label: "Gerando hoje",
      value: generation.toFixed(2),
      caption: "kWh",
      accent: palette.ember,
      icon: null,
    },
    {
      label: "Economia no mês",
      value: `R$${Math.round(savings).toLocaleString("pt-BR")}`,
      caption: "−93% vs. concessionária",
      accent: palette.ink,
      icon: <TrendingDown className="w-3 h-3" />,
      captionColor: palette.olive,
    },
    {
      label: "CO₂ evitado",
      value: Math.round(co2).toString(),
      caption: "kg / mês",
      accent: palette.ink,
      icon: null,
    },
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl p-4 panel-cream"
          style={{ background: palette.cream }}
        >
          <div
            className="text-[10px] uppercase tracking-wider mb-1.5"
            style={{ color: "rgba(20,17,15,0.7)" }}
          >
            {metric.label}
          </div>
          <div
            className="display text-2xl md:text-[28px] tabular-nums leading-none"
            style={{ color: metric.accent }}
          >
            {metric.value}
          </div>
          <div
            className="text-[11px] mt-1 flex items-center gap-1"
            style={{
              color: "captionColor" in metric ? metric.captionColor : "rgba(20,17,15,0.6)",
            }}
          >
            {metric.icon}
            {metric.caption}
          </div>
        </div>
      ))}
    </div>
  );
}

function GenerationChart() {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: palette.cream, border: "1px solid rgba(20,17,15,0.05)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs" style={{ color: "rgba(20,17,15,0.8)" }}>
          Curva de geração
        </span>
        <span className="text-[10px]" style={{ color: "rgba(20,17,15,0.6)" }}>
          últimas 12h
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-20">
        {GENERATION_BARS.map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.9, delay: 1 + index * 0.05, ease }}
            className="flex-1 rounded-t-[3px]"
            style={{
              background: `linear-gradient(180deg, ${palette.ember} 0%, #f59e0b 100%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DashboardFooter() {
  return (
    <div
      className="mt-5 pt-5 flex items-center justify-between text-xs"
      style={{ borderTop: "1px solid rgba(20,17,15,0.1)", color: "rgba(20,17,15,0.75)" }}
    >
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5" style={{ color: palette.ember }} />
        Garantia 25 anos
      </span>
      <span>Payback em 3,8 anos</span>
    </div>
  );
}

function RatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 bg-white border border-ink-10"
      style={{ boxShadow: "0 20px 40px -20px rgba(20,17,15,0.25)" }}
    >
      <div className="flex items-center gap-1 mb-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3"
            fill={palette.ember}
            style={{ color: palette.ember }}
          />
        ))}
        <span className="text-xs font-semibold ml-1 text-ink">4.9</span>
      </div>
      <div className="text-[10px]" style={{ color: "rgba(20,17,15,0.7)" }}>
        2.471 avaliações verificadas
      </div>
    </motion.div>
  );
}

function LiveProductionBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="absolute -top-5 -right-4 rounded-2xl px-4 py-3 bg-white border border-ink-10 flex items-center gap-3"
      style={{ boxShadow: "0 20px 40px -20px rgba(20,17,15,0.25)" }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: palette.ink }}
      >
        <Sun className="w-4 h-4" style={{ color: palette.ember }} fill="currentColor" />
      </div>
      <div>
        <div
          className="text-[10px] uppercase tracking-wider"
          style={{ color: "rgba(20,17,15,0.7)" }}
        >
          Produzindo agora
        </div>
        <div className="text-sm font-semibold tabular-nums text-ink">4,86 kW</div>
      </div>
    </motion.div>
  );
}

function PartnersStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-0 left-0 right-0 border-t border-ink-10"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-6">
        <span
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{ color: "rgba(20,17,15,0.7)" }}
        >
          Parceiros & certificações
        </span>
        <ul
          className="flex flex-wrap items-center gap-x-10 gap-y-3"
          style={{ color: "rgba(20,17,15,0.6)" }}
        >
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="text-xs font-semibold tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              {partner.name}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
