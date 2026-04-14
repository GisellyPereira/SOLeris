import type { Transition, Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export const viewportOnce = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const defaultTransition: Transition = {
  duration: 0.7,
  ease,
};

export const staggered = (i: number, base = 0.15, step = 0.08): Transition => ({
  duration: 0.8,
  delay: base + i * step,
  ease,
});
