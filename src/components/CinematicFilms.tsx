"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon, CloseIcon, PlayIcon } from "@/components/icons";

export interface CinematicItem {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url: string | null;
  featured: number;
  sort_order: number;
}

export function CinematicFilms({ items }: { items: CinematicItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="cinematics" className="overflow-hidden bg-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Cinematic Films
              </p>
              <h2 className="mt-3 text-[clamp(2rem,7vw,3.25rem)] font-extrabold tracking-tight text-text">
                Films That Feel Alive
              </h2>
            </div>
            <a
              href="/cinematics"
              className="group mb-1 hidden shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-accent sm:inline-flex"
            >
              View More
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((film, i) => (
            <Reveal key={film.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-xl bg-black"
                aria-label={`Play ${film.title}`}
              >
                {film.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={film.thumbnail_url}
                    alt={film.title}
                    className="aspect-video w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  />
                ) : (
                  <video
                    className="aspect-video w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    src={film.video_url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    crossOrigin="anonymous"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:scale-110">
                    <PlayIcon className="ml-0.5 h-4 w-4" />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-bold text-white">
                      {film.title}
                    </span>
                    <span className="block text-xs text-white/70">
                      Click to play with sound
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex sm:hidden">
          <a
            href="/cinematics"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-accent"
          >
            View More
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-accent hover:text-accent"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <motion.video
              key={active}
              className="max-h-full max-w-full"
              src={items[active].video_url}
              autoPlay
              controls
              playsInline
              crossOrigin="anonymous"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
