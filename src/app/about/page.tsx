import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ArrowRightIcon } from "@/components/icons";
import { getSettings } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Sairam — Best Photographer in Rajahmundry | Story & Awards",
  description:
    "Meet Sairam — the best photographer in Rajahmundry with 48+ international awards, AFIP, AFIAP & EFIP distinctions. 25+ years of professional photography experience since 1996. Wedding, portrait, event and commercial photography.",
  openGraph: {
    title: "About Sairam | Best Photographer in Rajahmundry",
    description:
      "48+ international awards. AFIP, AFIAP & EFIP distinctions. 25+ years of professional photography in Rajahmundry, Andhra Pradesh.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "https://www.sairamphotograph.com/about",
  },
};

const ACHIEVEMENTS = [
  {
    emoji: "🏆",
    title: "48+ International Awards",
    body: "Recognized through photography competitions at national and international levels.",
  },
  {
    emoji: "🥇",
    title: "Gold Medal",
    body: "Achieved a Gold Medal from the A.P. State Photography Academy.",
  },
  {
    emoji: "🎖",
    title: "AFIP · AFIAP · EFIP",
    body: "Recipient of prestigious photographic distinctions recognizing dedication and excellence in the field.",
  },
  {
    emoji: "🏅",
    title: "Best Photographer",
    body: "First Prize — Sakshi TV Awards, September 1, 2016.",
  },
  {
    emoji: "🥈",
    title: "Second Prize",
    body: "Recognized by Konaseema Chitra Kala Parishad for photographic excellence.",
  },
];

const STATS = [
  { value: "Since 1996", label: "Photography Journey" },
  { value: "48+", label: "International Awards" },
  { value: "AFIP · AFIAP · EFIP", label: "Photographic Distinctions" },
  { value: "25+ Years", label: "Professional Experience" },
];

const VALUES = [
  {
    title: "Emotion",
    body: "Capturing genuine expressions and meaningful moments.",
  },
  {
    title: "Storytelling",
    body: "Creating photographs that communicate more than what is visible.",
  },
  {
    title: "Creativity",
    body: "Finding unique perspectives and fresh ways to see familiar moments.",
  },
  {
    title: "Experience",
    body: "Decades of learning, experimenting, and refining the craft.",
  },
];

export default async function AboutPage() {
  const settings = await getSettings();
  const aboutImage = settings.about_image;

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.sairamphotograph.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Sairam",
            item: "https://www.sairamphotograph.com/about",
          },
        ],
      },
      {
        "@type": "Person",
        name: "Sairam",
        jobTitle: "Photographer",
        description:
          "Award-winning photographer in Rajahmundry with 48+ international awards and AFIP, AFIAP & EFIP distinctions.",
        image: "https://www.sairamphotograph.com/images/og-image.png",
        worksFor: {
          "@type": "ProfessionalService",
          name: "Sairam Photography",
        },
        award: [
          "48+ International Awards",
          "AFIP · AFIAP · EFIP Photographic Distinctions",
          "Gold Medal — A.P. State Photography Academy",
          "Best Photographer — Sakshi TV Awards 2016",
        ],
        alumniOf: {
          "@type": "Organization",
          name: "A.P. State Photography Academy",
        },
        knowsAbout: [
          "Wedding Photography",
          "Portrait Photography",
          "Event Photography",
          "Commercial Photography",
          "Cinematic Wedding Films",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Navbar />

      <main>
        <section className="bg-bg pt-[68px]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:py-24">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                About Sairam
              </p>
              <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight text-text">
                A Passion for Photography.{" "}
                <span className="text-accent">A Journey of a Lifetime.</span>
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="bg-bg">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 pb-16 sm:pb-24 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-14">
            <Reveal className="md:sticky md:top-24">
              <Photo
                src={aboutImage || "/images/about.png"}
                alt="Sairam behind the lens"
                className="aspect-[4/5] w-full rounded-2xl"
                imgClassName="object-cover object-top"
              />
            </Reveal>

            <div>
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                  About Sairam · AFIAP · EFIP
                </p>
                <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted">
                  Sairam&rsquo;s journey as a photographer began in 1996,
                  starting as a casual interest that gradually grew into a deep
                  passion for the art of photography. Over the years, his
                  dedication, creativity, and constant pursuit of better visual
                  storytelling have shaped his distinctive approach to
                  photography.
                </p>
              </Reveal>

              <Reveal delay={0.05} className="mt-12">
                <h2 className="text-2xl font-extrabold tracking-tight text-text">
                  His Story
                </h2>
                <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
                  What began as a simple fascination with capturing moments
                  evolved into a lifelong commitment to the craft. For Sairam,
                  photography is more than simply taking a picture — it is
                  about understanding the moment, seeing the story within it,
                  and preserving an emotion that can be experienced again and
                  again.
                </p>
                <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
                  With years of experience behind the camera, he continues to
                  explore new perspectives while staying true to the
                  fundamentals that make an image meaningful: light,
                  composition, emotion, timing, and storytelling.
                </p>
                <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
                  His work reflects a balance between creative thinking and
                  technical precision, allowing him to approach every subject
                  with a fresh perspective.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-bg-warm">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
            <Reveal className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                His Philosophy
              </p>
              <blockquote className="mt-6 font-serif text-[clamp(1.75rem,5vw,3rem)] font-medium italic leading-tight text-text">
                &ldquo;Every photograph has a story waiting to be remembered.&rdquo;
              </blockquote>
              <p className="mx-auto mt-8 max-w-2xl text-pretty leading-relaxed text-muted">
                For Sairam, the best photograph is not necessarily the most
                technically perfect one. It is the photograph that makes you
                feel something.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
                Whether it is a portrait, celebration, event, or everyday
                moment, his approach focuses on finding the emotion behind the
                frame and turning fleeting moments into lasting memories.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-bg">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Recognition &amp; Achievements
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                Awards &amp; Distinctions
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ACHIEVEMENTS.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={0.05 * i}
                  className="flex flex-col rounded-2xl border border-line bg-white p-7"
                >
                  <span className="text-3xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </Reveal>
              ))}

              <Reveal
                delay={0.25}
                className="flex flex-col justify-center rounded-2xl bg-accent p-7 text-white"
              >
                <span className="font-serif text-4xl font-semibold italic">
                  1996
                </span>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  The journey began — one frame at a time.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-5 py-16">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <Reveal key={stat.value} delay={0.05 * i}>
                  <div className="font-serif text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {stat.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                What Makes His Work Different
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                The Sairam Approach
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((item, i) => (
                <Reveal key={item.title} delay={0.05 * i} className="bg-white p-8">
                  <span className="font-serif text-4xl font-semibold italic text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold uppercase tracking-tight text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-accent">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
            <Reveal className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                  Closing
                </p>
                <h2 className="mt-4 font-serif text-[clamp(2rem,6vw,3.5rem)] font-semibold italic leading-tight text-white">
                  More Than a Photograph. A Memory That Lasts.
                </h2>
                <p className="mt-5 text-pretty leading-relaxed text-white/85">
                  Photography has been Sairam&rsquo;s journey for decades — a
                  journey built around people, stories, creativity, and
                  unforgettable moments.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-text hover:text-white"
                >
                  Read His Story
                </Link>
                <Link
                  href="/#portfolio"
                  className="inline-flex items-center gap-2.5 border-2 border-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-accent"
                >
                  View Portfolio
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
