import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const revalidate = 60;

const SITE_URL = "https://www.sairamphotograph.com";

export const metadata: Metadata = {
  title: "Best Photography Services in Rajahmundry | Wedding, Portrait & Commercial",
  description:
    "Sairam Photography — best photography services in Rajahmundry, Andhra Pradesh. Wedding photography, portrait sessions, event coverage, commercial shoots, cinematic films and more. 48+ international awards. Book now.",
  keywords: [
    "best photography services rajahmundry",
    "wedding photographer rajahmundry",
    "portrait photography rajahmundry",
    "event photography rajahmundry",
    "commercial photographer rajahmundry",
    "pre-wedding photography rajahmundry",
    "cinematic wedding films rajahmundry",
    "photography studio rajahmundry",
    "family portrait rajahmundry",
    "kids photography rajahmundry",
  ],
  openGraph: {
    title: "Photography Services in Rajahmundry | Sairam Photography",
    description:
      "Wedding, portrait, event, commercial and cinematic photography services by Rajahmundry's most awarded photographer. 48+ international awards.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

const SERVICES = [
  {
    slug: "wedding-photography",
    title: "Wedding Photography",
    tagline: "Documenting your special day beautifully",
    description:
      "Sairam Photography is the best wedding photographer in Rajahmundry, capturing the beauty, emotion and joy of your special day. From the first look to the final dance, every moment is preserved with artistry and care. With 25+ years of experience and 48+ international awards, Sairam brings technical mastery and genuine passion to every wedding he covers.",
    details: [
      "Full-day wedding coverage",
      "Ceremony, reception and candid moments",
      "Traditional and contemporary styles",
      "Couple portraits and family group photos",
      "Edited high-resolution images",
      "Online gallery for sharing",
    ],
    file: "WEDDING.jpg",
  },
  {
    slug: "portrait-photography",
    title: "Portrait Photography",
    tagline: "Professional portraits that tell your story",
    description:
      "Portrait photography in Rajahmundry by an award-winning photographer. Whether it's an individual portrait, family session or couple shoot, Sairam captures authentic expressions and genuine emotion. His approach focuses on making you feel comfortable so your true personality shines through every frame.",
    details: [
      "Individual and couple portraits",
      "Family and group sessions",
      "Indoor and outdoor locations",
      "Professional lighting and composition",
      "Retouched high-resolution images",
      "Print-ready digital files",
    ],
    file: "gallery1.jpg",
  },
  {
    slug: "event-photography",
    title: "Event Photography",
    tagline: "Every celebration deserves to be remembered",
    description:
      "Event photography in Rajahmundry covering corporate functions, birthday parties, anniversaries, festivals and special celebrations. Sairam's experience means he knows how to be in the right place at the right time — capturing key moments without interrupting the flow of your event.",
    details: [
      "Corporate events and conferences",
      "Birthday and anniversary parties",
      "Festival and cultural celebrations",
      "Candid and staged photography",
      "Same-day preview images available",
      "Full event documentation",
    ],
    file: "gallery3.jpg",
  },
  {
    slug: "commercial-photography",
    title: "Commercial Photography",
    tagline: "Elevating brands through visual storytelling",
    description:
      "Commercial photography in Rajahmundry for businesses, brands and products. Sairam's commercial work has been recognized internationally for its creativity, precision and ability to communicate brand stories through compelling images. From product shots to brand campaigns, every image is crafted with intention.",
    details: [
      "Product photography",
      "Brand and lifestyle shoots",
      "Food and restaurant photography",
      "Corporate headshots and team photos",
      "Advertising and marketing imagery",
      "Post-production and retouching",
    ],
    file: "gallery4.jpg",
  },
  {
    slug: "pre-wedding-photography",
    title: "Pre-Wedding Photography",
    tagline: "Beautiful stories that build excitement for your big day",
    description:
      "Pre-wedding photography in Rajahmundry — romantic, creative and personalized shoots that celebrate your love story before the wedding. Sairam works with couples to choose meaningful locations and create images that reflect their unique bond. A perfect way to build anticipation and create lasting memories.",
    details: [
      "Location scouting in Rajahmundry",
      "Multiple outfit changes",
      "Couple-themed creative concepts",
      "Golden hour and natural light sessions",
      "Edited image collection",
      "Social media ready images",
    ],
    file: "PREWEDDING.jpg",
  },
  {
    slug: "cinematic-wedding-films",
    title: "Cinematic Wedding Films",
    tagline: "Your wedding story as a cinematic film",
    description:
      "Cinematic wedding films in Rajahmundry — turning your wedding day into a short film with music, emotion and artistry. Sairam's cinematic approach combines documentary storytelling with a film-like aesthetic, creating wedding videos that feel like watching a movie of your most important day.",
    details: [
      "Full wedding film (20-40 minutes)",
      "Highlight reel (3-5 minutes)",
      "Drone footage where available",
      "Licensed music and sound design",
      "Color graded cinematic look",
      "Digital delivery and online sharing",
    ],
    file: "hero.png",
  },
  {
    slug: "family-photography",
    title: "Family Photography",
    tagline: "Creative portraits that capture love and connection",
    description:
      "Family photography in Rajahmundry — creative, natural and heartfelt family portraits. Sairam understands that every family is unique, and his approach focuses on genuine interactions rather than stiff, formal poses. The result is a collection of images that truly reflect your family's personality and bond.",
    details: [
      "Immediate and extended family groups",
      "Maternity and newborn sessions",
      "Lifestyle and candid approach",
      "Indoor studio or outdoor locations",
      "Multiple poses and groupings",
      "High-resolution edited images",
    ],
    file: "FAMILY.jpg",
  },
  {
    slug: "kids-photography",
    title: "Kids & Newborn Photography",
    tagline: "Freezing the magic of childhood",
    description:
      "Kids and newborn photography in Rajahmundry — playful, tender and full of personality. Sairam has a gentle approach with children and babies, creating images that capture their unique spirit at every stage. From newborn posed sessions to active toddler shoots, every image is crafted with care.",
    details: [
      "Newborn posed and lifestyle sessions",
      "Baby milestone photography",
      "Kids portrait sessions",
      "Family integration shots",
      "Safe and comfortable environment",
      "Beautifully retouched images",
    ],
    file: "NEWBORN.jpg",
  },
  {
    slug: "model-photography",
    title: "Model Photography",
    tagline: "Professional portfolios that make an impact",
    description:
      "Model and fashion photography in Rajahmundry — creating professional portfolios, comp cards and editorial images. Sairam's model work has been recognized for its creativity and technical excellence, helping aspiring and professional models build portfolios that stand out.",
    details: [
      "Model portfolio development",
      "Comp card creation",
      "Fashion and editorial shoots",
      "Headshot and full-body sessions",
      "Creative direction and styling support",
      "Publication-ready images",
    ],
    file: "MODEL.jpg",
  },
];

export default async function ServicesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Photography Services",
            item: `${SITE_URL}/services`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Photography Services by Sairam Photography Rajahmundry",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.description.slice(0, 200),
            provider: {
              "@type": "ProfessionalService",
              name: "Sairam Photography",
              url: SITE_URL,
            },
            areaServed: {
              "@type": "City",
              name: "Rajahmundry",
            },
            url: `${SITE_URL}/services#${s.slug}`,
          },
        })),
      },
      ...SERVICES.map((s) => ({
        "@type": "Service",
        name: s.title,
        description: s.description,
        provider: {
          "@type": "ProfessionalService",
          name: "Sairam Photography",
          url: SITE_URL,
        },
        areaServed: {
          "@type": "City",
          name: "Rajahmundry",
        },
        url: `${SITE_URL}/services#${s.slug}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navbar />

      <main className="bg-bg-secondary">
        <section className="bg-bg pt-[68px]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:py-24">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Our Services
              </p>
              <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight text-text">
                Best Photography Services in{" "}
                <span className="text-accent">Rajahmundry</span>
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                From weddings and portraits to events, commercial shoots and
                cinematic films — Sairam Photography offers the full range of
                professional photography services in Rajahmundry, Andhra Pradesh.
                48+ international awards. Since 1996.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-bg-secondary pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1280px] px-5">
            <div className="space-y-20">
              {SERVICES.map((service, i) => (
                <Reveal
                  key={service.slug}
                  className={`scroll-mt-24`}
                >
                  <div id={service.slug} className="scroll-mt-24">
                  <div
                    className={`grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start ${
                      i % 2 === 1 ? "lg:grid-cols-[1.15fr_1fr]" : ""
                    }`}
                  >
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-2 font-serif text-lg italic text-accent">
                        {service.tagline}
                      </p>
                      <p className="mt-5 text-pretty leading-relaxed text-muted">
                        {service.description}
                      </p>
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {service.details.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2.5 text-sm text-muted"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            {d}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#contact"
                        className="mt-8 inline-flex items-center gap-2.5 bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-deep"
                      >
                        Book {service.title}
                      </a>
                    </div>

                    <div
                      className={`relative overflow-hidden rounded-2xl ${
                        i % 2 === 1 ? "lg:order-1" : ""
                      }`}
                    >
                      <Image
                        src={`/images/${service.file}`}
                        alt={`${service.title} by Sairam Photography in Rajahmundry`}
                        width={600}
                        height={800}
                        className="h-full w-full object-cover"
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-bg">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
            <Reveal className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Why Sairam Photography
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                Rajahmundry&rsquo;s Most Awarded Photographer
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  num: "48+",
                  label: "International Awards",
                  desc: "Recognized at national and international photography competitions.",
                },
                {
                  num: "25+",
                  label: "Years Experience",
                  desc: "Professional photography since 1996 in Rajahmundry and beyond.",
                },
                {
                  num: "240+",
                  label: "Happy Clients",
                  desc: "Weddings, portraits, events and commercial shoots across Andhra Pradesh.",
                },
                {
                  num: "4.9",
                  label: "Google Rating",
                  desc: "Rated 4.9 stars on Google by verified clients in Rajahmundry.",
                },
              ].map((stat) => (
                <Reveal
                  key={stat.label}
                  className="rounded-2xl border border-line bg-white p-7 text-center"
                >
                  <div className="font-serif text-4xl font-semibold text-accent">
                    {stat.num}
                  </div>
                  <p className="mt-2 text-sm font-bold text-text">{stat.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {stat.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-accent">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
            <Reveal className="text-center">
              <h2 className="font-serif text-[clamp(1.75rem,5vw,3rem)] font-semibold italic leading-tight text-white">
                Ready to Book the Best Photographer in Rajahmundry?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-white/85">
                Contact Sairam Photography today to discuss your shoot. Whether
                it&apos;s a wedding, portrait, event or commercial project — your
                story deserves to be told beautifully.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/919866109466?text=Hi%20Sairam%2C%20I%27d%20like%20to%20book%20a%20photography%20shoot."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-text hover:text-white"
                >
                  Book on WhatsApp
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 border-2 border-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-accent"
                >
                  Contact Form
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
