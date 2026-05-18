import type { ReactNode } from "react";
import { AnimatedTitle, type AnimatedTitleSegment } from "@/components/ui/AnimatedTitle";
import { FormacaoCard } from "@/components/ui/FormacaoCard";

export type FormacaoCardItem = {
  periodo: string;
  title: string;
  subtitle?: string;
  description: ReactNode;
};

type FormacaoCardsSectionProps = {
  id?: string;
  titleSegments: AnimatedTitleSegment[];
  cards: FormacaoCardItem[];
};

export function FormacaoCardsSection({
  id,
  titleSegments,
  cards,
}: FormacaoCardsSectionProps) {
  return (
    <section className="formacao" id={id}>
      <AnimatedTitle segments={titleSegments} />
      <div className="container-cards">
        {cards.map((card, index) => (
          <FormacaoCard
            key={`${card.title}-${card.periodo}-${index}`}
            periodo={card.periodo}
            title={card.title}
            subtitle={card.subtitle}
          >
            {card.description}
          </FormacaoCard>
        ))}
      </div>
    </section>
  );
}
