export function ContactChannelCard({
  label,
  heading,
  detail,
  actionHref,
  actionLabel,
  external,
}: {
  label: string;
  heading: string;
  detail: string;
  actionHref: string;
  actionLabel: string;
  external?: boolean;
}) {
  return (
    <div className="card-formacao card-contato">
      <div className="periodo">{label}</div>
      <h3>{heading}</h3>
      <p>{detail}</p>
      <a
        href={actionHref}
        className="btn-contato"
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        {actionLabel}
      </a>
    </div>
  );
}
