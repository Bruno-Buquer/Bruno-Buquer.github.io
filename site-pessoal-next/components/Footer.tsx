"use client";

export function Footer() {
  return (
    <footer id="rodape">
      <div className="footer-bottom">
        <p>
          &copy; 2026 Bruno Buquer. Engenheiro da Computação em formação pela
          UERJ.
        </p>
        <a
          href="#"
          className="scroll-top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  );
}
