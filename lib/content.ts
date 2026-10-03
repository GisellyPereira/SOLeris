import { House, Factory, Sprout } from "lucide-react";

export const links = [
  { href: "#sobre", label: "A Soleris" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#projetos", label: "Projetos" },
  { href: "#economia", label: "Simule sua economia" },
];
export const services = [
  {
    name: "Para a sua casa",
    type: "Residencial",
    icon: House,
    text: "Mais liberdade para viver. Um sistema pensado para o seu consumo, seu telhado e os seus planos.",
    image: "/images/panels.jpg",
    benefits: [
      "Dimensionamento personalizado",
      "Integração à rede elétrica",
      "Acompanhamento da geração",
    ],
  },
  {
    name: "Para o seu negócio",
    type: "Comercial",
    icon: Factory,
    text: "Transforme um custo recorrente em uma oportunidade. Energia para o seu negócio crescer com mais previsibilidade.",
    image: "/images/solar.jpg",
    benefits: [
      "Análise do perfil de consumo",
      "Planejamento da implantação",
      "Monitoramento do sistema",
    ],
  },
  {
    name: "Para o seu campo",
    type: "Rural",
    icon: Sprout,
    text: "O sol também trabalha pela sua produção. Soluções para propriedades rurais, irrigação e operações no campo.",
    image: "/images/landscape.jpg",
    benefits: [
      "Estudo das necessidades da operação",
      "Projeto adaptado à propriedade",
      "Orientação para manutenção",
    ],
  },
];
export const projects = [
  {
    name: "Um novo jeito de morar",
    category: "Residencial",
    image: "/images/panels.jpg",
    description:
      "Uma solução integrada à cobertura, pensada para aproveitar a luz do sol e acompanhar a rotina da casa.",
    label: "Autonomia para o dia a dia",
  },
  {
    name: "Energia que move negócios",
    category: "Comercial",
    image: "/images/solar.jpg",
    description:
      "Uma instalação de maior escala, com aproveitamento da área disponível e foco no consumo da operação.",
    label: "Eficiência em cada operação",
  },
  {
    name: "O futuro também vem do campo",
    category: "Rural",
    image: "/images/landscape.jpg",
    description:
      "Geração renovável em uma propriedade rural, conectando produtividade e uso consciente dos recursos.",
    label: "Produtividade com propósito",
  },
];
export const questions = [
  [
    "Como saber se energia solar vale a pena para mim?",
    "O primeiro passo é avaliar suas contas de luz, o espaço disponível e as condições de instalação. A simulação oferece uma referência inicial; uma análise técnica determina o dimensionamento e a viabilidade do projeto.",
  ],
  [
    "O sistema funciona em dias nublados?",
    "Sim, os módulos podem gerar energia com luz difusa, mas a produção varia com as condições do tempo. O projeto considera o clima e o consumo da propriedade ao longo do ano.",
  ],
  [
    "Vou continuar recebendo uma conta de luz?",
    "Em um sistema conectado à rede, sim. Podem permanecer cobranças mínimas, tributos e outros componentes da tarifa. Por isso, reduzir a conta não significa necessariamente zerá-la.",
  ],
  [
    "Tenho energia durante uma queda da rede?",
    "Um sistema convencional conectado à rede desliga durante uma interrupção por segurança. Para alimentar equipamentos durante uma queda, é necessário um sistema específico com armazenamento e capacidade de operação de reserva.",
  ],
  [
    "Como funciona a instalação?",
    "O processo passa por análise de consumo, avaliação técnica, projeto, procedimentos junto à distribuidora, instalação e comissionamento. O cronograma depende das condições do imóvel e das etapas de aprovação.",
  ],
  [
    "E a manutenção dos painéis?",
    "O acompanhamento da geração e inspeções periódicas ajudam a identificar necessidades de limpeza ou manutenção. A frequência e os procedimentos devem seguir as orientações do fabricante e as condições locais.",
  ],
];
