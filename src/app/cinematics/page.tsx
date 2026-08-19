import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CinematicFilms } from "@/components/CinematicFilms";
import { getCinematics } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cinematic Films — Sairam Photography",
  description:
    "Watch Sairam's cinematic wedding, portrait, event and commercial films — stories told through motion and sound.",
};

export default async function CinematicsPage() {
  const films = await getCinematics();

  return (
    <>
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