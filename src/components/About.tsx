import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ArrowRightIcon } from "@/components/icons";

const STATS = [
  { value: "25+", label: "Years Experience" },
  { value: "48+", label: "International Awards" },
  { value: "AFIP · AFIAP · EFIP", label: "Photographic Distinctions" },
];

export function About({ aboutImage }: { aboutImage?: string }) {
  return (
    <section id="about" className="bg-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:grid md:grid-cols-2 md:items-center md:gap-14 lg:gap-20">
        <div className="order-2 md:order-1">
          <Reveal>
            <Photo
              src={aboutImage || "/images/about.png"}
              alt="Sairam behind the lens"
              className="aspect-[4/5] w-full rounded-2xl"
              imgClassName="object-cover object-top"
            />
          </Reveal>
        </div>

        <div className="order-1 md:order-2">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              About Sairam
            </p>
            <h2 className="mt-4 text-[clamp(2rem,7vw,3.25rem)] font-extrabold tracking-tight text-text">
              Behind <span className="text-accent">the Lens</span>
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted">
              Photography has been Sairam&rsquo;s passion since 1996. What began
              as a simple fascination with capturing moments has grown into a
              lifelong journey of creativity, storytelling, and visual
              expression.
            </p>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted">
              With 25+ years of experience and recognition through 48+
              international awards, Sairam brings together technical expertise
              and a genuine love for the art of photography.
            </p>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-text">
              Every frame has a story. His job is to make it unforgettable.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="/about"
              className="group mt-8 inline-flex items-center gap-2.5 bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-deep"
            >
              Read My Story
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <div className="font-serif text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted sm:text-[0.7rem]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
