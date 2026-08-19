import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { QuoteIcon, ArrowRightIcon } from "@/components/icons";
import { getAllTestimonials } from "@/lib/data";

export const revalidate = 60;

const SITE_URL = "https://www.sairamphotograph.com";
const GBP_URL = "https://maps.app.goo.gl/pRbQexQCo7ZfCRDQ9";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Sairam Photography Rajahmundry",
  description:
    "Read verified client reviews for Sairam Photography — the best wedding and portrait photographer in Rajahmundry. Rated 5 stars by couples, families and businesses across Andhra Pradesh.",
  openGraph: {
    title: "Client Reviews | Sairam Photography Rajahmundry",
    description:
      "Real reviews from wedding, portrait, event and commercial photography clients across Rajahmundry and Andhra Pradesh.",
    images: ["/images/about.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/testimonials`,
  },
};

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-accent" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3 1.2-6.5-4.8-4.6 6.6-.9L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();
  const reviewCount = testimonials.length;
  const avgRating = reviewCount > 0 ? 5 : 0;

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Sairam Photography",
    url: SITE_URL,
    image: `${SITE_URL}/images/about.png`,
    telephone: "+919866109466",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jawaharlal Nehru Rd, near Apollo Pharmacy, Venkateswara Nagar",
      addressLocality: "Rajamahendravaram",
      addressRegion: "Andhra Pradesh",
      postalCode: "533103",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount,
      bestRating: 5,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewBody: t.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <Navbar />

      <main className="bg-bg-secondary">
        <section className="bg-bg pt-[68px]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:py-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Testimonials
              </p>
              <h1 className="mt-3 text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight text-text">
                Loved Across <span className="text-accent">Rajahmundry</span>
              </h1>
              <div className="mt-5 flex items-center gap-4">
                <Stars />
                <p className="text-sm text-muted">
                  Rated {avgRating}.0 by clients across Andhra Pradesh
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-[1280px] px-5 py-10">
            <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-accent text-white">
                  <span className="text-xl font-extrabold leading-none">4.9</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Stars />
                    <span className="text-sm font-bold text-text">4.9 on Google</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Rated by 240+ clients across Rajahmundry &amp; Andhra Pradesh
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={GBP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-deep"
                >
                  Write a Review
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
                <a
                  href={GBP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border-2 border-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent hover:text-white"
                >
                  See on Google
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-bg-secondary pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1280px] px-5">
            {testimonials.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line bg-white p-16 text-center">
                <p className="text-lg font-semibold text-text">
                  No reviews yet
                </p>
                <p className="mt-2 text-sm text-muted">
                  Check back soon for client stories.
                </p>
              </div>
            ) : (
              <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                {testimonials.map((t) => (
                  <Reveal key={t.id} className="mb-5 break-inside-avoid">
                    <figure className="flex flex-col justify-between rounded-2xl border border-line bg-white p-7">
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
                        {t.location ? (
                          <span className="rounded-full bg-bg-tint px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-accent">
                            {t.location}
                          </span>
                        ) : null}
                      </figcaption>
                    </figure>
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
