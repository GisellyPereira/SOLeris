"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Counter } from "@/components/ui/Counter";
import { stats, type Stat } from "@/lib/content";
import { ease } from "@/lib/motion";

export default function Stats() {
  return (
    <section className="relative py-32 px-6 bg-bone overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Nossos números"
          title="Impacto"
          accent="mensurável."
          align="between"
          className="mb-16"
          aside={
            <p className="text-ink-60 max-w-sm">
              Cada watt instalado é rastreado, auditado e reportado.
              Transparência é parte do produto.
            </p>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: Stat;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      whileHover={{ y: -4 }}
      className="panel rounded-3xl p-7"
    >
      <div className="display text-4xl md:text-5xl text-ink mb-3 tabular-nums">
        <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <div className="text-ink font-medium mb-1">{stat.label}</div>
      <div className="text-sm text-ink-60">{stat.caption}</div>
    </motion.div>
  );
}
