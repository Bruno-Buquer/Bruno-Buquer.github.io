"use client";

import type { RefObject } from "react";
import type { ProjetoItem } from "./types";

type ProjectModalProps = {
  open: boolean;
  selected: ProjetoItem | null;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

export function ProjectModal({
  open,
  selected,
  closeRef,
  onClose,
}: ProjectModalProps) {
  return (
    <div
      id="modal-projeto"
      className={`modal-overlay${open ? " is-open" : ""}`}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-projeto-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-fechar"
          aria-label="Fechar detalhes do projeto"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 id="modal-projeto-titulo" className="modal-titulo">
          {selected?.title}
        </h3>
        <p className="modal-descricao">{selected?.description}</p>
        <p className="modal-rotulo-tecnologias">Tecnologias</p>
        <ul className="modal-tecnologias" aria-label="Tecnologias do projeto">
          {selected?.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
