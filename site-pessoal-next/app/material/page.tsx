import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Material | Bruno Buquer",
};

export default function MaterialPage() {
  return (
    <main className="page-placeholder">
      <h1>Em construção, xablau!</h1>
      <p className="page-placeholder-lead">
        <Link href="/" className="btn-contato page-placeholder-link">
          Volte para a home
        </Link>
      </p>
    </main>
  );
}
