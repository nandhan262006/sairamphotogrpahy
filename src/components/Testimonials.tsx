"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { QuoteIcon, ArrowRightIcon } from "@/components/icons";

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  location: string | null;
  quote: string;
  avatar_url: string | null;
  featured: number;
  sort_order: number;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], seed = 20260819): T[] {
  const rand = mulberry32(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-accent" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3 1.2-6.5-4.8-4.6 6.6-.9L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: TestimonialItem }) {
  return (
    <figure className="flex h-full w-[320px] shrink-0 flex-col justify-between rounded-2xl border border-line bg-white p-7 sm:w-[380px]">
      <div>
        <Stars />
        <QuoteIcon className="mt-4 h-6 w-6 text-accent/40" />
        <blockquote className="mt-3 text-pretty text-[15px] leading-relaxed text-muted">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-5">
        <div className="flex items-center gap-3">
          {t.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.avatar_url}
              alt={t.name}
              className="h-10 w-10 rounded-full border border-line object-cover"
            />
          ) : null}
          <div>
            <p className="text-sm font-bold text-text">{t.name}</p>
            <p className="text-xs uppercase tracking-[0.12em] text-muted">
              {t.role}
            </p>
          </div>
        </div>
        {t.location ? (
          <span className="rounded-full bg-bg-tint px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-accent">
            {t.location}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function Testimonials({ items: propItems }: { items: TestimonialItem[] }) {
  const [items] = useState(() => shuffle(propItems, 20260819));
  const doubled = [...items, ...items];

  return (
    <section id="testimonials" className="overflow-hidden bg-bg-warm py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Testimonials
          </p>
          <h2 className="mt-3 text-[clamp(2rem,7vw,3.25rem)] font-extrabold tracking-tight text-text">
            Loved Across <span className="text-accent">Rajahmundry</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted">
            Highly rated by clients for weddings, portraits, events, and more —
            each moment captured with heart.
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        <div className="animate-marquee flex w-max gap-5 px-5">
          {doubled.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1280px] justify-center px-5">
        <Link
          href="/testimonials"
          className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-accent"
        >
          Read All Reviews
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
