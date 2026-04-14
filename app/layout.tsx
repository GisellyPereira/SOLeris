import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const siteUrl = "https://soleris.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Soleris — Energia solar que paga a si mesma",
    template: "%s · Soleris",
  },
  description:
    "Sistemas de energia solar premium. Reduza até 95% da sua conta de luz em até 30 dias, com retorno em menos de 4 anos.",
  keywords: [
    "energia solar",
    "painel solar",
    "economia de luz",
    "soleris",
    "fotovoltaico",
  ],
  openGraph: {
    title: "Soleris — Energia solar que paga a si mesma",
    description:
      "Projeto engenheirado, instalação em até 30 dias, retorno em menos de 4 anos.",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Soleris",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soleris — Energia solar que paga a si mesma",
    description:
      "Reduza até 95% da sua conta de luz. Instalação em 30 dias, retorno em 4 anos.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-cream text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
