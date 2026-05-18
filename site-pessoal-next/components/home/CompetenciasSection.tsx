import Image from "next/image";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import {
  diferenciais,
  homeTitles,
  programacaoSkills,
} from "@/data/home";

function SkillBadges({ items }: { items: readonly string[] }) {
  return (
    <div className="badges-group">
      {items.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  );
}

export function CompetenciasSection() {
  return (
    <section className="formacao" id="competencias">
      <AnimatedTitle segments={homeTitles.competencias} />

      <div className="habilidades-container">
        <div>
          <h3>Linguagens de Programação</h3>
          <SkillBadges items={programacaoSkills} />
          <Image
            src="/giphy.gif"
            alt="Gif de uma pessoa programando"
            width={400}
            height={280}
            className="img-card-tech"
            unoptimized
          />
        </div>

        <div>
          <h3>Diferenciais</h3>
          <ul>
            {diferenciais.map((item) => (
              <li key={item.title} className="card-formacao">
                <strong>{item.title}</strong> {item.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
