import {
  Sun,
  PanelTop,
  Home,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
}

export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
}

export interface Project {
  image: string;
  title: string;
  location: string;
  power: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  reduction: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PartnerBrand {
  name: string;
}

export const navLinks: readonly NavLink[] = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#economia", label: "Economia" },
  { href: "#galeria", label: "Projetos" },
  { href: "#depoimentos", label: "Clientes" },
  { href: "#faq", label: "FAQ" },
];

export const partners: readonly PartnerBrand[] = [
  { name: "CANADIAN SOLAR" },
  { name: "GROWATT" },
  { name: "FRONIUS" },
  { name: "ABGD" },
  { name: "INMETRO" },
  { name: "ANEEL" },
];

export const heroHighlights: readonly string[] = [
  "Simulação gratuita em 90 segundos",
  "Financiamento sem entrada",
  "Garantia de 25 anos nos módulos",
  "Equipe própria — sem terceirizar",
];

export const steps: readonly Step[] = [
  {
    icon: Sun,
    title: "Sol capturado",
    description:
      "Painéis fotovoltaicos de alta eficiência transformam luz em energia desde o amanhecer.",
  },
  {
    icon: PanelTop,
    title: "Inversor inteligente",
    description:
      "Converte corrente contínua em alternada com 98% de eficiência certificada.",
  },
  {
    icon: Home,
    title: "Sua casa alimentada",
    description:
      "Energia limpa flui direto para seus aparelhos, zerando a conta de luz.",
  },
  {
    icon: Zap,
    title: "Excedente na rede",
    description:
      "O que sobra vira crédito na distribuidora, usado em dias nublados ou à noite.",
  },
];

export const stats: readonly Stat[] = [
  {
    value: 2400,
    suffix: "+",
    label: "Lares energizados",
    caption: "em todo o Brasil",
  },
  {
    value: 48,
    suffix: " GWh",
    label: "Energia gerada",
    caption: "limpa e renovável",
  },
  {
    value: 12,
    suffix: "M",
    prefix: "R$ ",
    label: "Economizado",
    caption: "pelos nossos clientes",
  },
  {
    value: 18000,
    suffix: "t",
    label: "CO₂ evitado",
    caption: "equivale a 300 mil árvores",
  },
];

export const projects: readonly Project[] = [
  {
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    title: "Residencial Jardim das Palmeiras",
    location: "São Paulo, SP",
    power: "8.4 kWp",
  },
  {
    image:
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1200&q=80",
    title: "Condomínio Vista Verde",
    location: "Campinas, SP",
    power: "124 kWp",
  },
  {
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    title: "Fazenda Sol Nascente",
    location: "Ribeirão Preto, SP",
    power: "85 kWp",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80",
    title: "Comercial Centro Empresarial",
    location: "Belo Horizonte, MG",
    power: "42 kWp",
  },
  {
    image:
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&q=80",
    title: "Casa de Praia Maresias",
    location: "São Sebastião, SP",
    power: "12 kWp",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&q=80",
    title: "Indústria TechParts",
    location: "Curitiba, PR",
    power: "210 kWp",
  },
];

export const testimonials: readonly Testimonial[] = [
  {
    name: "Ricardo Mendes",
    role: "Empresário · Alphaville",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    quote:
      "Em 30 dias minha conta caiu de R$ 1.840 para R$ 82. A equipe da Soleris foi impecável do projeto à instalação.",
    reduction: "95%",
  },
  {
    name: "Ana Carolina Lima",
    role: "Arquiteta · Jardins",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    quote:
      "Buscava algo esteticamente bonito além de econômico. Os painéis se integraram ao design da casa como se sempre tivessem estado lá.",
    reduction: "92%",
  },
  {
    name: "Fernando Oliveira",
    role: "Médico · Campinas",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    quote:
      "Já recuperei metade do investimento em 2 anos. Melhor decisão financeira que tomei na última década.",
    reduction: "89%",
  },
];

export const faqs: readonly FaqItem[] = [
  {
    question: "Quanto tempo leva para instalar o sistema?",
    answer:
      "Do projeto à instalação completa, o prazo médio é de 30 a 45 dias. A instalação física no telhado leva apenas 2 a 3 dias.",
  },
  {
    question: "E se o sistema quebrar? Qual a garantia?",
    answer:
      "Painéis têm 25 anos de garantia de desempenho. Inversores, 10 anos. Nossa mão de obra é garantida por 5 anos. Suporte técnico 24/7.",
  },
  {
    question: "Preciso de bateria ou fico sem luz quando cai a rede?",
    answer:
      "Você permanece conectado à rede elétrica. O excedente gerado vira crédito que abate contas futuras por até 60 meses. Bateria é opcional para autonomia total.",
  },
  {
    question: "Funciona em dias nublados ou no inverno?",
    answer:
      "Sim. Os painéis geram energia mesmo com pouca luz — cerca de 25% a 40% da capacidade. No inverno, os créditos acumulados no verão compensam.",
  },
  {
    question: "Como é o financiamento? Posso parcelar?",
    answer:
      "Trabalhamos com BV, Santander e Sicoob. Parcelas em até 84 meses, com taxas a partir de 0,99% a.m. A parcela costuma ser menor que a economia mensal na conta.",
  },
  {
    question: "Preciso fazer reforma no telhado?",
    answer:
      "Na maioria dos casos, não. Fazemos inspeção estrutural gratuita antes da instalação e os painéis são fixados sem danificar as telhas.",
  },
];

export const companyInfo = {
  name: "soleris",
  tagline: "Energia solar para quem vê a casa como investimento de longo prazo.",
  description:
    "Projetos engenheirados, instalação própria, performance monitorada.",
  email: "contato@soleris.com.br",
  phone: "(11) 9999-9999",
  whatsapp: "5511999999999",
  city: "São Paulo, SP",
} as const;
