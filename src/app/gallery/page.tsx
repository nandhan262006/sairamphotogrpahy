import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { getGalleryPortfolio } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery — Sairam Photography",
  description:
    "Browse the full photo gallery from Sairam Photography — weddings, portraits, events, commercial and fashion shoots.",
};

export default async function GalleryPage() {
  const items = await getGalleryPortfolio();

  return (
    <>
      <Navbar />

      <main className="bg-bg-secondary">
        <section className="bg-bg pt-[68px]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:py-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Gallery
              </p>
              <h1 className="mt-3 text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight text-text">
                The <span className="text-accent">Full Collection</span>
              </h1>
              <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
                A growing collection of moments — weddings, portraits, events and
                more. New photos are added regularly.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-bg-secondary pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1280px] px-5">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line bg-white p-16 text-center">
                <p className="text-lg font-semibold text-text">No photos here yet</p>
                <p className="mt-2 text-sm text-muted">
                  Photos that aren&rsquo;t featured on the homepage will appear here.
                </p>
              </div>
            ) : (
              <div className="columns-2 lg:columns-3">
                {items.map((w, i) => (
                  <Reveal
                    key={w.id}
                    delay={(i % 3) * 0.04}
                    className="mb-4 break-inside-avoid"
                  >
                    <Link href="/#contact" className="group relative block overflow-hidden rounded-xl">
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
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}