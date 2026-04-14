"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { steps, type Step } from "@/lib/content";
import { ease } from "@/lib/motion";

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="como-funciona" ref={ref} className="relative py-32 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="O processo"
          title="Do sol à"
          accent="sua tomada"
          className="mb-24"
        />

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-ink-10 hidden md:block">
            <motion.div style={{ height: progressHeight }} className="w-full bg-ink" />
          </div>

          <ol className="space-y-24">
            {steps.map((step, index) => (
              <StepRow key={step.title} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

interface StepRowProps {
  step: Step;
  index: number;
}

function StepRow({ step, index }: StepRowProps) {
  const isEven = index % 2 === 0;
  const Icon = step.icon;

  return (
    <motion.li
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease }}
      className={`grid md:grid-cols-2 gap-8 items-center list-none ${
        isEven ? "" : "md:[&>div:first-child]:order-2"
      }`}
    >
      <div className={isEven ? "md:text-right md:pr-16" : "md:pl-16"}>
        <div className="eyebrow mb-3">Etapa {String(index + 1).padStart(2, "0")}</div>
        <h3 className="display text-3xl md:text-4xl text-ink mb-4">{step.title}</h3>
        <p className="text-ink-60 text-lg leading-relaxed">{step.description}</p>
      </div>
      <div className={`flex ${isEven ? "md:justify-start" : "md:justify-end"} justify-center`}>
        <motion.div whileHover={{ y: -4 }} className="relative w-44 h-44 md:w-52 md:h-52">
          <div className="relative w-full h-full rounded-[28px] panel flex items-center justify-center">
            <Icon className="w-16 h-16 md:w-20 md:h-20 text-ember" strokeWidth={1.2} />
          </div>
          <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-ink flex items-center justify-center text-cream font-medium text-sm">
            {index + 1}
          </div>
        </motion.div>
      </div>
    </motion.li>
  );
}
