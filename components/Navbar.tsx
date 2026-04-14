"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, Sun, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/content";

const SCROLL_RANGE = [0, 120] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const width = useTransform(scrollY, [...SCROLL_RANGE], ["100%", "92%"]);
  const y = useTransform(scrollY, [...SCROLL_RANGE], [0, 12]);
  const boxShadow = useTransform(scrollY, [...SCROLL_RANGE], [
    "0 0 0 rgba(0,0,0,0)",
    "0 18px 40px -18px rgba(20,17,15,0.22), 0 2px 6px -3px rgba(20,17,15,0.12)",
  ]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.header
      style={{ y }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <motion.div
        style={{ width, boxShadow }}
        className="glass-light rounded-full max-w-6xl w-full"
      >
        <div className="px-5 md:px-6 py-2.5 flex items-center justify-between gap-4">
          <Brand />

          <nav className="hidden md:flex items-center gap-7" aria-label="Principal">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-[13px] text-ink-75 hover:text-ink transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              as="a"
              href="#cta"
              className="hidden sm:inline-flex px-5 py-2 text-[13px]"
            >
              Simular economia
            </Button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-ink-20 text-ink"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      {mobileOpen && <MobileMenu onClose={closeMobile} />}
    </motion.header>
  );
}

function Brand() {
  return (
    <motion.a
      href="#"
      className="flex items-center gap-2.5 group"
      whileHover={{ scale: 1.02 }}
      aria-label="Soleris — Página inicial"
    >
      <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
        <Sun className="w-4 h-4 text-ember" strokeWidth={2.2} />
      </div>
      <span className="display text-[18px] tracking-tight text-ink">
        sol<span className="text-accent-serif">eris</span>
      </span>
    </motion.a>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:hidden absolute top-full mt-2 left-4 right-4 glass-light rounded-3xl p-4 flex flex-col gap-1"
    >
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="px-4 py-3 rounded-2xl text-sm text-ink hover:bg-cream transition-colors"
        >
          {link.label}
        </a>
      ))}
      <Button
        as="a"
        href="#cta"
        onClick={onClose}
        className="mt-2"
      >
        Simular economia
      </Button>
    </motion.div>
  );
}
