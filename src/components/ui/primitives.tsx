import { Reveal } from "./Reveal";

export function Section({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

export function Mono({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[0.68rem] font-normal tracking-[0.28em] uppercase text-ink-dim ${className}`}
    >
      {children}
    </span>
  );
}

export function Index({
  n,
  className = "",
}: {
  n: string;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-xs font-bold tracking-[0.2em] text-accent ${className}`}
    >
      ({n})
    </span>
  );
}

export function Corners({
  className = "",
  inset = "inset-3",
}: {
  className?: string;
  inset?: string;
}) {
  const c = "absolute h-4 w-4 border-accent/60";
  return (
    <div className={`pointer-events-none absolute ${inset} ${className}`} aria-hidden="true">
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

export function Watermark({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none whitespace-nowrap font-display font-bold uppercase leading-none tracking-tight ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  index,
  title,
  text,
  align = "left",
}: {
  index: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "right";
}) {
  const alignCls =
    align === "left" ? "items-start text-left" : "items-end text-right";
  return (
    <Reveal className={`flex flex-col ${alignCls}`}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-accent">
          {index}
        </span>
        <span className="h-px w-12 bg-accent/40" />
      </div>
      <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-tight text-ink text-balance">
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-6 max-w-xl text-base leading-relaxed text-ink-dim text-pretty sm:text-lg ${
            align === "right" ? "ml-auto" : ""
          }`}
        >
          {text}
        </p>
      ) : null}
    </Reveal>
  );
}
