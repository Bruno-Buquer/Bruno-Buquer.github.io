import { FormacaoCardsSection } from "@/components/sections/FormacaoCardsSection";
import { educacaoCards, experienciaCards, homeTitles } from "@/data/home";

export function EducacaoSection() {
  return (
    <FormacaoCardsSection
      titleSegments={homeTitles.educacao}
      cards={educacaoCards}
    />
  );
}

export function ExperienciaProfissionalSection() {
  return (
    <FormacaoCardsSection
      titleSegments={homeTitles.experiencia}
      cards={experienciaCards}
    />
  );
}
