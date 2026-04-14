"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Sun, Youtube, type LucideIcon } from "lucide-react";
import { companyInfo } from "@/lib/content";

interface FooterColumn {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

const columns: ReadonlyArray<FooterColumn> = [
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "#" },
      { label: "Projetos", href: "#galeria" },
      { label: "Blog", href: "#" },
      { label: "Carreiras", href: "#" },
    ],
  },
];

const socials: ReadonlyArray<SocialLink> = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const legalLinks: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Privacidade", href: "#" },
  { label: "Termos", href: "#" },
  { label: "LGPD", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-cream border-t border-ink-10 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <BrandColumn />
          {columns.map((column) => (
            <LinkColumn key={column.title} column={column} />
          ))}
          <ContactColumn />
        </div>

        <div className="pt-8 border-t border-ink-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink-60">
          <span>© {new Date().getFullYear()} Soleris. Todos os direitos reservados.</span>
          <nav aria-label="Links legais" className="flex gap-6">
            {legalLinks.map(({ label, href }) => (
              <a key={label} href={href} className="hover:text-ink transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function BrandColumn() {
  return (
    <div className="md:col-span-2">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
          <Sun className="w-4 h-4 text-ember" strokeWidth={2.2} />
        </div>
        <span className="display text-xl text-ink">
          sol<span className="text-accent-serif">eris</span>
        </span>
      </div>
      <p className="text-ink-60 max-w-sm text-sm leading-relaxed mb-6">
        {companyInfo.tagline} {companyInfo.description}
      </p>
      <div className="flex gap-2">
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            whileHover={{ y: -3 }}
            aria-label={label}
            className="w-9 h-9 rounded-full panel flex items-center justify-center hover:bg-bone transition-colors"
          >
            <Icon className="w-4 h-4 text-ink-75" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function LinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-ink-60 mb-4">
        {column.title}
      </h4>
      <ul className="space-y-2.5 text-sm text-ink">
        {column.links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="hover:text-ember transition-colors">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn() {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-ink-60 mb-4">
        Contato
      </h4>
      <ul className="space-y-2.5 text-sm text-ink">
        <li>
          <a
            href={`mailto:${companyInfo.email}`}
            className="hover:text-ember transition-colors"
          >
            {companyInfo.email}
          </a>
        </li>
        <li>{companyInfo.phone}</li>
        <li>{companyInfo.city}</li>
      </ul>
    </div>
  );
}
