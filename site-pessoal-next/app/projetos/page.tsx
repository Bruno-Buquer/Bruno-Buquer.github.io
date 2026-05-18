import {
  ProjetosView,
  type ProjetoItem,
} from "@/components/projetos/ProjetosView";
import type { Metadata } from "next";
import "./projetos.css";

export const metadata: Metadata = {
  title: "Projetos | Bruno Buquer",
};

const projetos: ProjetoItem[] = [
  {
    title: "Lab Works",
    description:
      "Trabalhos envolvendo laboratórios com práticas de API, Classes e CRUD.",
    tech: ["PHP", "MySQL", "JS"],
  },
  {
    title: "Lab Works",
    description:
      "Trabalhos envolvendo laboratórios com práticas de API, Classes e CRUD.",
    tech: ["PHP", "MySQL", "JS"],
  },
  {
    title: "Lab Works",
    description:
      "Trabalhos envolvendo laboratórios com práticas de API, Classes e CRUD.",
    tech: ["PHP", "MySQL", "JS"],
  },
];

export default function ProjetosPage() {
  return <ProjetosView projetos={projetos} />;
}
