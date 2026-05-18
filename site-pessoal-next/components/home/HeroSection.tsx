import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section id="sobre-mim">
      <div id="info">
        <h1>Bruno Buquer Barroso</h1>
        <p>
          Sou um desenvolvedor full-stack dinâmico e monitor bolsista na UERJ -
          Nova Friburgo. No momento, estou cursando a graduação de Engenharia
          da Computação, tendo um grande interesse tanto na área de
          programação Web quanto na área de pesquisa em IA e Machine Learning.
          Atuo em projetos de extensão Além disso, também sou programador de
          jogos com foco 2D pela plataforma GameMaker.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ex unde
          similique minima quas voluptatum ab in officiis accusantium sequi
          culpa repellendus natus suscipit, est beatae? Labore voluptate nihil
          dicta.
        </p>
        <div id="botões">
          <ButtonLink href={site.urls.github} external>
            Curriculo - PDF
          </ButtonLink>
          <ButtonLink href={site.urls.linkedin} external>
            Linkedin
          </ButtonLink>
          <ButtonLink href={site.urls.github} external>
            GitHub
          </ButtonLink>
        </div>
      </div>
      <Image
        src="/BrunoMic.png"
        alt="Imagem de Bruno Buquer em um palco"
        width={400}
        height={500}
        style={{ height: "auto", maxWidth: 400 }}
        priority
        sizes="(max-width: 768px) 80vw, 400px"
      />
    </section>
  );
}
