"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials, type Testimonial } from "@/lib/content";
import { ease } from "@/lib/motion";

const STAR_COUNT = 5;

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-32 px-6 bg-bone overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Clientes"
          title="Quem já vive"
          accent="do sol."
          align="between"
          className="mb-16"
          aside={<RatingSummary />}
        />

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RatingSummary() {
  return (
    <div className="flex items-center gap-4 text-sm text-ink-60">
      <div className="flex items-center gap-1" aria-label="Avaliação 4.9 de 5">
        {Array.from({ length: STAR_COUNT }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-ember" fill="currentColor" />
        ))}
      </div>
      <span>
        <strong className="text-ink">4.9/5</strong> · 2.471 avaliações
      </span>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      whileHover={{ y: -6 }}
      className="panel rounded-[28px] p-8 relative flex flex-col"
    >
      <Quote className="w-7 h-7 text-ember mb-5" strokeWidth={1.5} />

      <blockquote className="text-ink-75 text-base leading-relaxed mb-7 min-h-[7rem]">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="flex items-center justify-between pt-6 border-t border-ink-10 mt-auto">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-ink text-sm">{testimonial.name}</div>
            <div className="text-xs text-ink-60">{testimonial.role}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="display text-2xl text-ember">−{testimonial.reduction}</div>
          <div className="text-[10px] text-ink-60 uppercase tracking-wider">
            na conta
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}
