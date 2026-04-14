"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  MessageCircle,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { companyInfo } from "@/lib/content";
import { palette, serifItalic } from "@/lib/theme";

interface LeadFormState {
  name: string;
  phone: string;
  bill: string;
}

const EMPTY_FORM: LeadFormState = { name: "", phone: "", bill: "" };

const reassurances: ReadonlyArray<{ icon: LucideIcon; text: string }> = [
  { icon: Clock, text: "Resposta em menos de 24h" },
  { icon: Shield, text: "Dados criptografados · LGPD" },
  { icon: Sparkles, text: "Sem custo e sem compromisso" },
];

export default function CTA() {
  const [form, setForm] = useState<LeadFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof LeadFormState>(key: K) =>
    (value: LeadFormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="cta" className="relative py-32 px-6 bg-ink overflow-hidden">
      <EmberGlow />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <Pitch />
          <LeadForm
            form={form}
            submitted={submitted}
            onChange={update}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}

function EmberGlow() {
  return (
    <div
      aria-hidden
      className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(194,65,12,0.35) 0%, transparent 60%)",
        filter: "blur(30px)",
      }}
    />
  );
}

function Pitch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <span className="eyebrow" style={{ color: palette.emberSoft }}>
        Próximo passo
      </span>
      <h2
        className="display text-5xl md:text-6xl mt-4 leading-[1] mb-6"
        style={{ color: palette.cream }}
      >
        Um estudo sob medida.{" "}
        <span style={{ ...serifItalic, color: palette.emberLight }}>
          Em 24 horas.
        </span>
      </h2>
      <p
        className="text-lg max-w-md mb-8"
        style={{ color: "rgba(245, 239, 228, 0.85)" }}
      >
        Sem compromisso, sem vendedor insistente. Um engenheiro analisa seu
        consumo e devolve o dimensionamento exato.
      </p>

      <ul className="space-y-3">
        {reassurances.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-3 text-sm"
            style={{ color: palette.cream }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(245, 239, 228, 0.12)" }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: palette.emberSoft }} />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface LeadFormProps {
  form: LeadFormState;
  submitted: boolean;
  onChange: <K extends keyof LeadFormState>(
    key: K,
  ) => (value: LeadFormState[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function LeadForm({ form, submitted, onChange, onSubmit }: LeadFormProps) {
  if (submitted) {
    return <SuccessCard />;
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15 }}
      onSubmit={onSubmit}
      className="bg-cream rounded-[28px] p-7 md:p-8 space-y-4"
      style={{
        boxShadow:
          "0 40px 80px -30px rgba(0,0,0,0.5), 0 10px 30px -15px rgba(0,0,0,0.3)",
      }}
    >
      <header>
        <div className="eyebrow mb-1">Formulário</div>
        <h3 className="display text-2xl text-ink">Receba seu estudo gratuito</h3>
      </header>

      <TextField
        label="Nome completo"
        value={form.name}
        onValueChange={onChange("name")}
        placeholder="João Silva"
        required
        autoComplete="name"
      />
      <TextField
        label="WhatsApp"
        type="tel"
        value={form.phone}
        onValueChange={onChange("phone")}
        placeholder="(11) 99999-9999"
        required
        autoComplete="tel"
      />
      <TextField
        label="Conta de luz mensal"
        value={form.bill}
        onValueChange={onChange("bill")}
        placeholder="R$ 500,00"
        required
        inputMode="numeric"
      />

      <div className="grid grid-cols-1 gap-3 pt-2">
        <Button as="button" type="submit" className="group py-4">
          Receber estudo gratuito
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
        <Button
          as="a"
          href={`https://wa.me/${companyInfo.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
        >
          <MessageCircle className="w-4 h-4" />
          Preferir WhatsApp
        </Button>
      </div>
    </motion.form>
  );
}

function SuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-cream rounded-[28px] p-10 text-center"
      style={{
        boxShadow:
          "0 40px 80px -30px rgba(0,0,0,0.5), 0 10px 30px -15px rgba(0,0,0,0.3)",
      }}
    >
      <div className="eyebrow mb-2">Recebido</div>
      <h3 className="display text-3xl text-ink mb-3">
        Obrigado! Estamos analisando.
      </h3>
      <p className="text-ink-60">
        Um engenheiro da Soleris entrará em contato em menos de 24 horas com seu
        estudo personalizado.
      </p>
    </motion.div>
  );
}
