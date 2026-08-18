import { Reveal } from "@/components/Reveal";

const STATS = [
  { value: "48+", label: "Awards Won" },
  { value: "25+", label: "Years Experience" },
  { value: "1000+", label: "Projects Completed" },
  { value: "500+", label: "Happy Clients" },
];

export function Stats() {
  return (
    <section id="stats" className="bg-bg py-8 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-5">
        <div className="flex flex-col divide-y divide-line sm:grid sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-x-line">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="flex flex-col gap-2 py-7 sm:px-6">
                <span className="text-5xl font-extrabold tracking-tight text-accent sm:text-6xl">
                  {s.value}
                </span>
                <span className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
