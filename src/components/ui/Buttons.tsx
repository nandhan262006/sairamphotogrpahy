export function CtaButton({
  children = "GET STARTED",
  href = "#",
  className = "",
  dark = false,
}: {
  children?: React.ReactNode;
  href?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group relative inline-flex items-center justify-between gap-6 overflow-hidden px-7 py-4 font-mono text-xs font-bold tracking-[0.22em] uppercase transition-all duration-300 active:translate-y-px active:scale-[0.98] ${
        dark
          ? "bg-paper text-noir hover:bg-white"
          : "bg-accent text-paper hover:bg-accent-bright"
      } ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 text-sm leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent-deep transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

export function GhostLink({
  children,
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-3 font-mono text-xs font-bold tracking-[0.22em] text-accent uppercase ${className}`}
    >
      <span className="mono-link">{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}
