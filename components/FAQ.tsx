"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs, type FaqItem } from "@/lib/content";
import { ease } from "@/lib/motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) =>
    setOpenIndex((current) => (current === index ? null : index));

  return (
    <section id="faq" className="relative py-32 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Perguntas frequentes"
          title="Tudo que você"
          accent="precisa saber."
          className="mb-14"
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FaqRow
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-ink-60 mb-4">Ainda tem dúvidas?</p>
          <Button as="a" href="#cta" variant="ghost">
            Falar com um engenheiro
          </Button>
        </div>
      </div>
    </section>
  );
}

interface FaqRowProps {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqRow({ faq, index, isOpen, onToggle }: FaqRowProps) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      className="panel rounded-2xl overflow-hidden"
    >
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full p-6 flex items-center justify-between text-left group"
      >
        <span className="font-medium text-ink text-lg pr-8">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-cream flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-ember" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-ink-60 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
