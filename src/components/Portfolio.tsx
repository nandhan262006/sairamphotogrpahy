import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ArrowRightIcon } from "@/components/icons";

const WORK = [
  { title: "Portraits", src: "/images/gallery1.jpg", ratio: 4 / 5 },
  { title: "Weddings", src: "/images/gallery2.jpg", ratio: 4 / 5 },
  { title: "Events", src: "/images/gallery3.jpg", ratio: 4 / 5 },
  { title: "Commercial", src: "/images/gallery4.jpg", ratio: 4 / 5 },
  { title: "Fashion", src: "/images/gallery5.jpg", ratio: 1440 / 1746 },
  { title: "Portraits", src: "/images/gallery6.jpg", ratio: 1440 / 1746 },
  { title: "Weddings", src: "/images/gallery7.jpg", ratio: 4 / 5 },
  { title: "Events", src: "/images/gallery8.jpg", ratio: 4 / 5 },
  { title: "Commercial", src: "/images/gallery9.jpg", ratio: 4 / 5 },
  { title: "Fashion", src: "/images/gallery10.jpg", ratio: 4 / 5 },
  { title: "Portraits", src: "/images/gallery11.webp", ratio: 4 / 5 },
  { title: "Weddings", src: "/images/gallery12.jpg", ratio: 4 / 5 },
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

        <div className="mt-10 columns-2 lg:columns-3">
          {WORK.map((w, i) => (
            <Reveal
              key={w.src}
              delay={(i % 3) * 0.04}
              className="mb-0 break-inside-avoid"
            >
              <a
                href="#contact"
                className="group relative block overflow-hidden"
              >
                <Photo
                  src={w.src}
                  alt={`${w.title} photography by Sairam`}
                  className="w-full"
                  imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  style={{ aspectRatio: `${w.ratio}` }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-4 pt-14">
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
