"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "solidLight";

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  solidLight: "bg-white text-ink hover:bg-cream",
};

const hoverTransform = { y: -2 };
const tapTransform = { scale: 0.98 };

type ButtonAsButton = BaseProps &
  Omit<HTMLMotionProps<"button">, "ref"> & { as?: "button" };

type ButtonAsAnchor = BaseProps &
  Omit<HTMLMotionProps<"a">, "ref"> & { as: "a"; href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors";
  const cls = `${base} ${variantClass[variant]} ${className}`;

  if ("as" in props && props.as === "a") {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        whileHover={hoverTransform}
        whileTap={tapTransform}
        className={cls}
        {...(rest as HTMLMotionProps<"a">)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      whileHover={hoverTransform}
      whileTap={tapTransform}
      className={cls}
      {...(rest as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
});
