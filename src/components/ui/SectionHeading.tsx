interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "text-center max-w-2xl mx-auto mb-12"
          : "mb-10"
      }
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <div className="h-px w-8 bg-brand-gold" aria-hidden="true" />
          <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-brand-gold" aria-hidden="true" />
        </div>
      )}
      <h2
        className="font-serif font-bold text-brand-brown leading-tight mb-3"
        style={{ fontSize: "clamp(1.625rem, 3.5vw, 2.5rem)" }}
      >
        {titleHighlight ? (
          <>
            {title}{" "}
            <span className="text-brand-maroon">{titleHighlight}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className="text-muted-foreground leading-relaxed"
          style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
