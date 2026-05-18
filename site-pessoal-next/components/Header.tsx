"use client";

import Link from "next/link";
import { useEffect } from "react";

const links = [
  { href: "/", label: "INÍCIO" },
  { href: "/material", label: "MATERIAL" },
  { href: "/projetos", label: "PROJETOS" },
  { href: "/#contato", label: "CONTATO" },
];

export function Header() {
  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.getElementById("top-bar");
    if (!navbar) return;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        navbar.classList.remove("nav-hidden");
        return;
      }
      if (currentScroll > lastScroll) {
        navbar.classList.add("nav-hidden");
      } else {
        navbar.classList.remove("nav-hidden");
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="top-bar">
      <nav>
        <ul>
          {links.map((item) => (
            <li key={item.href + item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
