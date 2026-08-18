import { Reveal } from "@/components/Reveal";
import { AwardIcon } from "@/components/icons";

const AWARDS = [
  { title: "Best Photographer", desc: "Sakshi TV Awards — First Prize, 2016" },
  { title: "Gold Medal", desc: "A.P. State Photography Academy — Achieved Gold Medal" },
  { title: "AFIP, AFIAP & EFIP", desc: "Honorary Distinctions" },
  { title: "48 International Awards", desc: "From photography competitions worldwide" },
  { title: "Second Prize", desc: "Konaseema Chitra Kala Parishad" },
];

export function Awards() {
  return (
    <section id="awards" className="bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-5">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Recognition
          </p>
          <h2 className="mt-3 text-[clamp(2rem,7vw,3.25rem)] font-extrabold tracking-tight text-text">
            Awards &amp; Achievements
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted">
            Recognized for excellence in photography through national and
            international competitions.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 md:grid md:grid-cols-2">
          {AWARDS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.04}>
              <article
                className="flex items-start gap-4 rounded-md bg-white p-5 transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                style={{ border: "1px solid var(--border)" }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-bg-tint text-accent">
                  <AwardIcon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base font-bold tracking-tight text-text">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{a.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
