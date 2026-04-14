"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { defaultTransition, fadeUp, viewportOnce } from "@/lib/motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  accent?: string;
  description?: ReactNode;
  align?: "center" | "left" | "between";
  aside?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  aside,
  className = "",
}: SectionHeaderProps) {
  if (align === "between") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={defaultTransition}
        className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${className}`}
      >
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="display text-5xl md:text-6xl text-ink mt-4 leading-[1]">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-accent-serif">{accent}</span>
              </>
            )}
          </h2>
        </div>
        {aside}
      </motion.div>
    );
  }

  const alignClass = align === "center" ? "text-center" : "";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={defaultTransition}
      className={`${alignClass} ${className}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display text-5xl md:text-7xl text-ink mt-4 leading-[1]">
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-accent-serif">{accent}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-ink-60 max-w-2xl mx-auto mt-5 text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
