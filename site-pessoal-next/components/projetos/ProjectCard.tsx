"use client";

import type { ProjetoItem } from "./types";

type ProjectCardProps = {
  projeto: ProjetoItem;
  onOpen: (projeto: ProjetoItem, element: HTMLElement) => void;
};

export function ProjectCard({ projeto, onOpen }: ProjectCardProps) {
  return (
    <div
      className="card-conteudo"
      role="button"
      tabIndex={0}
      onClick={(e) => onOpen(projeto, e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(projeto, e.currentTarget);
        }
      }}
    >
      <h3>{projeto.title}</h3>
      <p>{projeto.description}</p>
      <ul>
        {projeto.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
