import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CinematicFilms } from "@/components/CinematicFilms";
import { getCinematics } from "@/lib/data";

export const revalidate = 60;

const SITE_URL = "https://www.sairamphotograph.com";

export const metadata: Metadata = {
  title: "Cinematic Wedding Films | Best Videographer in Rajahmundry",
  description:
    "Watch cinematic wedding films and highlight reels by Sairam Photography — the best videographer in Rajahmundry. Professional wedding cinematography, event films and commercial video production.",
  openGraph: {
    title: "Cinematic Films | Sairam Photography Rajahmundry",
    description:
      "Cinematic wedding films, event films and commercial video production by Rajahmundry's award-winning photographer.",
  },
  alternates: {
    canonical: `${SITE_URL}/cinematics`,
  },
};

export default async function CinematicsPage() {
  const films = await getCinematics();

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cinematic Films",
            item: `${SITE_URL}/cinematics`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Cinematic Films by Sairam Photography",
        itemListElement: films.map((film, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "VideoObject",
            name: film.title,
            description: `${film.title} — cinematic wedding film by Sairam Photography, Rajahmundry.`,
            thumbnailUrl: film.thumbnail_url
              ? film.thumbnail_url
              : `${SITE_URL}/images/hero.png`,
            contentUrl: film.video_url,
            embedUrl: film.video_url,
            uploadDate: new Date().toISOString().slice(0, 10),
            publisher: {
              "@type": "Organization",
              name: "Sairam Photography",
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <Navbar />
      <main>
        <section className="bg-bg pt-[68px]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Cinematic Films
            </p>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight text-text">
              Films That <span className="text-accent">Feel Alive</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted">
              Stories told through motion, light, and sound. Click any film to
              watch it play with audio.
            </p>
          </div>
        </section>

        <CinematicFilms items={films} />
      </main>
      <Footer />
    </>
  );
}