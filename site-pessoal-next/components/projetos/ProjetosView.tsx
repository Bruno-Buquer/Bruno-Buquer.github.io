"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import type { ProjetoItem } from "./types";

export type { ProjetoItem } from "./types";

export function ProjetosView({ projetos }: { projetos: ProjetoItem[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ProjetoItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const closeModal = useCallback(() => {
    setOpen(false);
    setSelected(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  function openModal(p: ProjetoItem, el: HTMLElement) {
    triggerRef.current = el;
    setSelected(p);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeModal]);

  return (
    <main className="projetos-page">
      <div className="main-title">
        <h1>Meus Projetos</h1>
        <p>
          Aqui estão alguns dos projetos que desenvolvi ao longo da minha
          jornada.
        </p>
      </div>

      <section>
        <div className="header-projeto">
          <h2 className="titulo-projeto">Trabalhos Cefet</h2>
          <p>
            Trabalhos desenvolidos durante a matéria do técnico em informática.
          </p>
        </div>

        <div className="container-cards">
          {projetos.map((p, i) => (
            <ProjectCard
              key={`${p.title}-${i}`}
              projeto={p}
              onOpen={openModal}
            />
          ))}
        </div>
      </section>

      <ProjectModal
        open={open}
        selected={selected}
        closeRef={closeRef}
        onClose={closeModal}
      />
    </main>
  );
}
