import { ArrowUpRight } from "lucide-react";

/** A folded S: two interlocking surfaces that suggest light crossing a solar module. */
export function SolerisMark() {
  return (
    <svg
      className="soleris-mark"
      viewBox="0 0 54 62"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13 2H51L37 18H19L7 31H28L14 47H0L13 32H0L13 17H38L51 2"
        fill="currentColor"
      />
      <path
        d="M40 60H3L17 44H35L47 31H26L40 15H54L41 30H54L41 45H16L3 60"
        fill="currentColor"
        opacity=".55"
      />
    </svg>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#inicio"
      aria-label="Soleris — início"
    >
      <SolerisMark />
      <span className="brand-wordmark">soleris</span>
    </a>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="section-eyebrow">{children}</div>;
}
export function Action({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a className={`action ${secondary ? "action-secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
