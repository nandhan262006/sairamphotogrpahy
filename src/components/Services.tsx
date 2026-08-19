"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

const SERVICE_ITEMS = [
  {
    category: "Model",
    title: "Model Photography",
    description:
      "Professional model portfolios that capture your personality and tell your story.",
    image: "/images/MODEL.jpg",
  },
  {
    category: "Weddings",
    title: "Wedding Photography",
    description:
      "Documenting your special day beautifully, from first look to final dance.",
    image: "/images/WEDDING.jpg",
  },
  {
    category: "Couple",
    title: "Couple Photography",
    description:
      "Romantic couple shoots that celebrate your bond and unique story.",
    image: "/images/COUPLE.jpg",
  },
  {
    category: "Family",
    title: "Family Photography",
    description:
      "Creative family portraits that capture love, connection, and precious moments.",
    image: "/images/FAMILY.jpg",
  },
  {
    category: "Engagement",
    title: "Engagement Photography",
    description:
      "Celebrate your engagement with timeless, heartfelt photos.",
    image: "/images/ENGAGEMENT.jpg",
  },
  {
    category: "Haldi",
    title: "Haldi Photography",
    description:
      "Capturing the vibrant colors and joy of your haldi ceremony.",
    image: "/images/HALDI.jpg",
  },
  {
    category: "Kids",
    title: "Kids Photography",
    description:
      "Playful, candid shots that freeze the magic of childhood.",
    image: "/images/KIDS.jpg",
  },
  {
    category: "Newborn",
    title: "Newborn Photography",
    description:
      "Delicate, tender portraits of your newest little love.",
    image: "/images/NEWBORN.jpg",
  },
  {
    category: "Pre-Wedding",
    title: "Pre-Wedding Photography",
    description:
      "Beautiful pre-wedding stories that build excitement for your big day.",
    image: "/images/PREWEDDING.jpg",
  },
];

const ROTATE_MS = 5000;
const CARD_W = "min(300px, 65vw)";
const CARD_H = "min(400px, 87vw)";

export function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragX = useRef<number | null>(null);
  const n = SERVICE_ITEMS.length;

  const go = useCallback(
    (i: number) => {
      setActive(((i % n) + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(active + 1), ROTATE_MS);
    return () => clearInterval(id);
  }, [active, paused, go]);

  return (
    <section
      id="services"
      className="bg-bg py-16 sm:py-24"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1280px] px-5">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Services
          </p>
          <h2 className="mt-3 text-[clamp(2rem,7vw,3.25rem)] font-extrabold tracking-tight text-text">
            What I Do
          </h2>
        </Reveal>

        <div
          className="relative mx-auto mt-14 h-[min(400px,87vw)]"
          style={{ perspective: 1400, touchAction: "pan-y" }}
          onPointerDown={(e) => {
            dragX.current = e.clientX;
            setDragging(true);
          }}
          onPointerMove={() => {
            if (dragX.current !== null) setPaused(true);
          }}
          onPointerUp={(e) => {
            if (dragX.current === null) return;
            const dx = e.clientX - dragX.current;
            if (dx < -40) go(active + 1);
            if (dx > 40) go(active - 1);
            dragX.current = null;
            setDragging(false);
          }}
          onPointerCancel={() => {
            dragX.current = null;
            setDragging(false);
          }}
          onPointerLeave={() => setDragging(false)}
        >
          {SERVICE_ITEMS.map((service, i) => {
            const diff = ((i - active) % n + n) % n;
            const offset = diff > n / 2 ? diff - n : diff;
            const abs = Math.abs(offset);
            const hidden = abs > 2;

            return (
              <button
                key={service.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`View ${service.title}`}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transform: `translateX(calc(-50% + ${offset * 62}%)) rotateY(${offset * -32}deg) scale(${1 - abs * 0.14})`,
                  opacity: hidden ? 0 : 1 - abs * 0.35,
                  zIndex: 20 - abs * 5,
                  transition: "all 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className={`absolute left-1/2 top-0 ${
                  hidden
                    ? "pointer-events-none"
                    : dragging
                      ? "cursor-grabbing"
                      : "cursor-grab"
                }`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 640px) 300px, 65vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-bg-tint to-bg-warm" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-left sm:p-7">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      {service.category}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-bold text-white sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/70">
                      {service.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Reveal className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous service"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            {SERVICE_ITEMS.map((service, i) => (
              <button
                key={service.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to ${service.title}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-8 bg-accent"
                    : "w-2 bg-line hover:bg-muted"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next service"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
