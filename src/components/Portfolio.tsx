import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ArrowRightIcon } from "@/components/icons";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  aspect_ratio: string;
  featured: number;
  sort_order: number;
}

export function Portfolio({ items }: { items: PortfolioItem[] }) {
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
              href="/gallery"
              className="group mb-1 hidden shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-accent sm:inline-flex"
            >
              View All Work
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 columns-2 lg:columns-3">
          {items.map((w, i) => (
            <Reveal
              key={w.id}
              delay={(i % 3) * 0.04}
              className="mb-0 break-inside-avoid"
            >
              <a
                href="/gallery"
                className="group relative block overflow-hidden"
              >
                <Photo
                  src={w.image_url}
                  alt={`${w.title} photography by Sairam`}
                  className="w-full"
                  imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  style={{ aspectRatio: `${w.aspect_ratio}` }}
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
            href="/gallery"
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
