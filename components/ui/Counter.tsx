"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

const formatNumber = (value: number, decimals: number) =>
  decimals === 0
    ? Math.round(value).toLocaleString("pt-BR")
    : value.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 2.2,
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const value = useMotionValue(0);
  const display = useTransform(
    value,
    (current) => `${prefix}${formatNumber(current, decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, to, duration, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
