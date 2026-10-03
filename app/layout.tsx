import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soleris — Boa energia. Para a sua vida. Para o futuro.",
  description:
    "Explore soluções de energia solar para casas, negócios e propriedades rurais. Simule cenários de economia e planeje seu próximo passo com a Soleris.",
  openGraph: {
    title: "Soleris — Boa energia para um novo futuro",
    description:
      "Uma energia melhor. Uma relação mais próxima. Conheça as possibilidades da energia solar.",
    type: "website",
    locale: "pt_BR",
    siteName: "Soleris",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
