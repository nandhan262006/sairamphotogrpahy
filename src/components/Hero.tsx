"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ArrowRightIcon } from "@/components/icons";
import { WHATSAPP_URL } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ heroImage }: { heroImage?: string }) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-bg pt-[68px]"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-16 lg:grid-cols-[1fr_1.15fr] lg:py-24">
        <Reveal className="relative order-1 h-[300px] w-full overflow-hidden rounded-3xl sm:h-[400px] lg:order-2 lg:h-[560px]">
          <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
            <Photo
              src={heroImage || "/images/hero.png"}
              alt="Sairam holding a professional camera"
              className="h-full w-full"
              imgClassName="object-cover object-center"
              priority
            />
          </motion.div>
        </Reveal>

        <div className="flex flex-col justify-center lg:order-1 lg:pr-10">
          <Reveal delay={0.05}>
            <span className="block h-0.5 w-12 bg-accent" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Sairam · Storytelling Photography
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="mt-3 text-[clamp(2.75rem,10vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-text">
              Every moment,
              <svg
                className="ml-3 inline-block h-[0.7em] w-[0.7em] align-baseline text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M12 2v20M2 12h20" opacity="0.35" />
                <path d="M12 5l1.4 5.6L19 12l-5.6 1.4L12 19l-1.4-5.6L5 12l5.6-1.4L12 5Z" fill="currentColor" stroke="none" />
              </svg>
              <br />
              <span className="text-outline">kept forever.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Honest, artful photography that freezes your most human moments —
              so you can feel them again, years from now.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2.5 bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-deep"
            >
              View Portfolio
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center bg-text px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent"
            >
              Book Now
            </a>
          </Reveal>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em]">
          Scroll
        </span>
        <motion.span
          className="block h-8 w-px bg-accent"
          animate={{ scaleY: [0, 1], originY: 0 }}
          transition={{ duration: 1.2, ease: EASE, repeat: Infinity, repeatDelay: 0.4 }}
        />
      </motion.a>
    </section>
  );
}
