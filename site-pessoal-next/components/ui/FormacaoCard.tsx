import type { ReactNode } from "react";

export function FormacaoCard({
  periodo,
  title,
  subtitle,
  children,
}: {
  periodo: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="card-formacao">
      <div className="periodo">{periodo}</div>
      <h3>{title}</h3>
      {subtitle ? <h4>{subtitle}</h4> : null}
      <p>{children}</p>
    </div>
  );
}
