import { CompetenciasSection } from "@/components/home/CompetenciasSection";
import { ContatoSection } from "@/components/home/ContatoSection";
import {
  EducacaoSection,
  ExperienciaProfissionalSection,
} from "@/components/home/FormacaoSections";
import { HeroSection } from "@/components/home/HeroSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <CompetenciasSection />
      <EducacaoSection />
      <ExperienciaProfissionalSection />
      <ContatoSection />
    </main>
  );
}
