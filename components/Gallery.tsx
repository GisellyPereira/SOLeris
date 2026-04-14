"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, type Project } from "@/lib/content";
import { ease } from "@/lib/motion";

const IMAGE_OVERLAY =
  "linear-gradient(180deg, transparent 30%, rgba(20,17,15,0.55) 65%, rgba(20,17,15,0.95) 100%)";

export default function Gallery() {
  return (
    <section id="galeria" className="relative py-32 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Portfólio"
          title="Obras"
          accent="entregues."
          align="between"
          className="mb-14"
          aside={
            <a
              href="#cta"
              className="inline-flex items-center gap-1 text-sm text-ink hover:text-ember transition-colors"
            >
              Ver todos os projetos <ArrowUpRight className="w-4 h-4" />
            </a>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href="#cta"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease }}
      whileHover={{ y: -6 }}
      className="group relative rounded-[24px] overflow-hidden cursor-pointer panel block"
      aria-label={`Projeto ${project.title} em ${project.location}`}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.power}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: IMAGE_OVERLAY }} />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream/95 backdrop-blur text-[11px] font-medium text-ink tracking-wide">
          {project.power}
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4 text-ink" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3
          className="display text-xl md:text-2xl mb-1.5"
          style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
        >
          {project.title}
        </h3>
        <div
          className="flex items-center gap-1.5 text-sm"
          style={{
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          <MapPin className="w-3.5 h-3.5" />
          {project.location}
        </div>
      </div>
    </motion.a>
  );
}
