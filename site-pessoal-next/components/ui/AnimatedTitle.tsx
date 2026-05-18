export type AnimatedTitleSegment = {
  text: string;
  accent?: boolean;
  endLetter?: boolean;
};

type AnimatedTitleProps = {
  segments: AnimatedTitleSegment[];
  className?: string;
};

export function AnimatedTitle({
  segments,
  className = "titulo",
}: AnimatedTitleProps) {
  return (
    <h2 className={className}>
      {segments.flatMap((seg, segIndex) =>
        seg.text.split("").map((ch, i) => {
          const isLast = i === seg.text.length - 1;
          const classes = ["span-form"];
          if (seg.accent) {
            classes.push("span-form-fale");
          }
          if (seg.accent && seg.endLetter && isLast) {
            classes.push("end-letter");
          }
          return (
            <span key={`${segIndex}-${i}`} className={classes.join(" ")}>
              {ch}
            </span>
          );
        }),
      )}
    </h2>
  );
}
