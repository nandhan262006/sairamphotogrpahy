"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { QuoteIcon } from "@/components/icons";

const TESTIMONIALS = [
  {
    name: "Anitha & Ravi",
    role: "Wedding Clients",
    location: "Rajahmundry",
    quote:
      "Sairam captured our wedding so beautifully that we relive it every time we watch the album. Truly the best photographer in Rajahmundry.",
  },
  {
    name: "Kiran Kumar",
    role: "Portrait Session",
    location: "Rajahmundry",
    quote:
      "Professional, patient, and incredibly talented. The portraits came out stunning — worth every rupee. Highly recommended.",
  },
  {
    name: "Sravani Devi",
    role: "Event Client",
    location: "Rajahmundry",
    quote:
      "Our family function was documented with so much care and creativity. Every photo tells a story. Five stars all the way.",
  },
  {
    name: "Mohan Rao",
    role: "Commercial Client",
    location: "Rajahmundry",
    quote:
      "The product and brand images Sairam delivered elevated our business presence completely. Exceptional eye for detail.",
  },
  {
    name: "Lakshmi Prasanna",
    role: "Maternity Shoot",
    location: "Rajahmundry",
    quote:
      "He made us feel so comfortable and natural in front of the camera. The memories we now have are priceless.",
  },
  {
    name: "Suresh Babu",
    role: "Birthday Shoot",
    location: "Rajahmundry",
    quote:
      "Sairam is the most reliable photographer I have worked with. Timely, creative, and the results are always outstanding.",
  },
  {
    name: "Divya Sree",
    role: "Fashion Shoot",
    location: "Rajahmundry",
    quote:
      "Bold, artistic, and unique. He sees things others miss. My portfolio shots turned out magazine-quality.",
  },
  {
    name: "Venkatesh & Padma",
    role: "Anniversary Shoot",
    location: "Rajahmundry",
    quote:
      "We had the best experience. He turned simple moments into beautiful memories. Cannot thank him enough.",
  },
];

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

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
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
        <div>
          <p className="text-sm font-bold text-text">{t.name}</p>
          <p className="text-xs uppercase tracking-[0.12em] text-muted">
            {t.role}
          </p>
        </div>
        <span className="rounded-full bg-bg-tint px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-accent">
          {t.location}
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const [items] = useState(() => shuffle(TESTIMONIALS, 20260819));
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

      <div className="marquee-paused mt-12">
        <div className="animate-marquee flex w-max gap-5 px-5">
          {doubled.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
