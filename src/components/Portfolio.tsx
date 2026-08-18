import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ArrowRightIcon } from "@/components/icons";

const WORK = [
  {
    title: "Portraits",
    src: "/images/hero.png",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Weddings",
    src: "/images/about.png",
    className: "lg:col-span-2",
  },
  {
    title: "Events",
    src: "/images/5f91365b-9b6f-447a-bce3-701e2a4a9509.png",
    className: "",
  },
  {
    title: "Commercial",
    src: "/images/fa75e4ff-1005-4de4-8b9a-2ae041a76ead.png",
    className: "",
  },
  {
    title: "Fashion",
    src: "/images/911beb5d-450e-4561-9e77-71359b6fde4e.jpeg",
    className: "lg:col-span-2",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Portfolio
              </p>
              <h2 className="mt-3 text-[clamp(2rem,7vw,3.25rem)] font-extrabold tracking-tight text-text">
                My Recent Work
              </h2>
            </div>
            <a
              href="#contact"
              className="group mb-1 hidden shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-accent sm:inline-flex"
            >
              View All Work
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] lg:grid-cols-4">
          {WORK.map((w, i) => (
            <Reveal
              key={w.title}
              delay={i * 0.04}
              className={w.className}
            >
              <a
                href="#contact"
                className="group relative block h-full w-full overflow-hidden rounded-xl"
              >
                <Photo
                  src={w.src}
                  alt={`${w.title} photography by Sairam`}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-4 pt-14">
                  <p className="text-base font-bold text-white">{w.title}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex sm:hidden">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-accent"
          >
            View All Work
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
