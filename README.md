# Soleris

Landing page de uma empresa fictícia de energia solar.

Construída como estudo de design system enxuto e arquitetura limpa em Next.js. Paleta editorial em creme/grafite com acento âmbar queimado, dashboard "ao vivo" no hero, e seções pensadas para conversão (calculadora, prova social, FAQ, CTA).

## Stack

- Next.js 14 + TypeScript
- Tailwind CSS
- Framer Motion
- Lenis (smooth scroll)
- Lucide Icons

## Rodando

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Estrutura

```
app/                 rotas e layout
components/
  ui/                primitivos reutilizáveis (Button, SectionHeader, Counter, TextField)
  *.tsx              seções da página
lib/
  content.ts         todo o conteúdo (copy, links, depoimentos, faqs)
  theme.ts           paleta e tokens visuais
  motion.ts          presets de animação
  hooks/             useCountUp
  domain/            cálculo de economia (puro, testável)
```

A separação entre UI, conteúdo e domínio mantém os componentes finos — qualquer ajuste de copy ou cor acontece em um lugar só.

## Paleta

| Token | Hex |
|-------|-----|
| ink   | `#14110f` |
| cream | `#f5efe4` |
| bone  | `#ebe3d3` |
| ember | `#c2410c` |
| olive | `#5b6b3a` |

## Notas

- Imagens dos projetos são placeholders do Unsplash. Substituir por fotos reais antes de qualquer uso comercial.
- Formulário do CTA exibe estado de sucesso local — sem integração de backend.
