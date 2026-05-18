import type { FormacaoCardItem } from "@/components/sections/FormacaoCardsSection";
import type { AnimatedTitleSegment } from "@/components/ui/AnimatedTitle";
import { site } from "@/data/site";

export const homeTitles = {
  competencias: [
    { text: "Habilidades", accent: true, endLetter: true },
    { text: " & Tecnologias" },
  ] satisfies AnimatedTitleSegment[],

  educacao: [{ text: "Educação" }] satisfies AnimatedTitleSegment[],

  experiencia: [
    { text: "Formação", accent: true, endLetter: true },
    { text: " Profissional" },
  ] satisfies AnimatedTitleSegment[],

  contato: [
    { text: "Cont", accent: true },
    { text: "ato" },
  ] satisfies AnimatedTitleSegment[],
};

export const programacaoSkills = [
  "HTML & CSS",
  "JavaScript",
  "C & C++",
  "PHP",
  "Python",
  "SQL",
  "GML (GameMaker)",
] as const;

export const diferenciais: { title: string; body: string }[] = [
  {
    title: "Comunicação Interpessoal:",
    body: "Colaboração eficiente em equipes multidisciplinares.",
  },
  {
    title: "Didática e Ensino:",
    body: "Experiência em monitoria com foco em aprendizado integral.",
  },
  {
    title: "Capacidade Analítica:",
    body: "Resolução de problemas lógicos e complexos.",
  },
  {
    title: "Inglês Avançado:",
    body: "Proficiência em leitura, escrita e comunicação técnica.",
  },
];

export const educacaoCards: FormacaoCardItem[] = [
  {
    periodo: "2023 — 2025",
    title: "Técnico em Informática",
    subtitle: "CEFET-RJ | Nova Friburgo",
    description:
      "Foco em desenvolvimento de sistemas, algoritmos, banco de dados e infraestrutura de TI.",
  },
  {
    periodo: "2023 — 2025",
    title: "Ensino Médio",
    subtitle: "CEFET-RJ | Nova Friburgo",
    description: "Formação integrada de excelência em nível federal.",
  },
  {
    periodo: "2026 — atual",
    title: "Graduação em Engenharia da Computação",
    subtitle: "UERJ | Nova Friburgo",
    description: "Formação integrada de excelência em nível federal.",
  },
];

export const experienciaCards: FormacaoCardItem[] = [
  {
    periodo: "2024",
    title: "Programador full-stack",
    subtitle: "Wegia - LAJE",
    description:
      'Desenvolvi e implementei o metódo de integração "Mercado Pago", desenvolvendo tanto a interface front-end quanto o sistema back-end. Além de ajudar e lidar com resolução de bug\'s e otimização do site como um todo.',
  },
  {
    periodo: "2025",
    title: 'Monitor de "Algoritmos e programação"',
    subtitle: "CEFET-RJ | Nova Friburgo",
    description:
      "Como monitor, ministrei aulas para mais de 20 aluno no curso de Algoritmos. Minhas responsabilidades incluíam esclarecer conceitos, auxiliar na realização de exercícios e promover um ambiente de aprendizagem produtivo na introdução de programação em C++.",
  },
];

export type ContactChannel = {
  label: string;
  heading: string;
  detail: string;
  actionHref: string;
  actionLabel: string;
  external?: boolean;
};

export const contactChannels: ContactChannel[] = [
  {
    label: "E-mail",
    heading: "Envie uma mensagem",
    detail: site.email,
    actionHref: `mailto:${site.email}`,
    actionLabel: "Enviar E-mail",
  },
  {
    label: "Telefone",
    heading: "Vamos conversar?",
    detail: site.phoneDisplay,
    actionHref: site.urls.whatsapp,
    actionLabel: "Chamar no WhatsApp",
    external: true,
  },
  {
    label: "Instagram",
    heading: "Siga meu trabalho",
    detail: "@bruno.buquer",
    actionHref: site.urls.instagram,
    actionLabel: "Ver Perfil",
    external: true,
  },
];
