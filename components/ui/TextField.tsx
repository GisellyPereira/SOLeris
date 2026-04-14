"use client";

import type { InputHTMLAttributes } from "react";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  onValueChange: (value: string) => void;
}

export function TextField({
  label,
  onValueChange,
  id,
  ...rest
}: TextFieldProps) {
  const inputId = id ?? `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[11px] text-ink-60 mb-1.5 uppercase tracking-[0.15em]"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-xl bg-white text-ink placeholder:text-ink-45 focus:outline-none focus:ring-2 focus:ring-ember/40 transition-shadow"
        style={{ border: "1px solid var(--ink-10)" }}
        {...rest}
      />
    </div>
  );
}
