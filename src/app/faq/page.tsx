import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

export const revalidate = 60;

const SITE_URL = "https://www.sairamphotograph.com";

export const metadata: Metadata = {
  title: "FAQ — Photography Pricing, Booking & Details | Sairam Photography Rajahmundry",
  description:
    "Frequently asked questions about Sairam Photography — pricing, booking, availability, and photography services in Rajahmundry. The best photographer in Rajahmundry since 1996.",
  openGraph: {
    title: "FAQ | Sairam Photography — Best Photographer in Rajahmundry",
    description:
      "Answers about photography pricing, packages, availability and booking at Sairam Photography, Rajahmundry's most awarded studio.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

const FAQ_ITEMS = [
  {
    q: "Who is the best photographer in Rajahmundry?",
    a: "Sairam Photography is widely regarded as the best photography studio in Rajahmundry (Rajamahendravaram), Andhra Pradesh. With 25+ years of experience since 1996, 48+ international awards, and AFIP, AFIAP & EFIP photographic distinctions, Sairam is Rajahmundry's most awarded and recognized photographer. He specializes in wedding, portrait, event, commercial, and cinematic photography.",
  },
  {
    q: "How much does a wedding photographer cost in Rajahmundry?",
    a: "Wedding photography pricing in Rajahmundry varies depending on the scope of coverage, number of photographers, and deliverables. At Sairam Photography, wedding packages are tailored to your specific needs — from half-day coverage to full-day documentation with cinematic films. Contact via WhatsApp at +91 98661 09466 or use the booking form on our website for a customized quote.",
  },
  {
    q: "How do I book a photography shoot with Sairam Photography?",
    a: "Booking is easy. You can reach Sairam Photography via WhatsApp at +91 98661 09466, email at sairamphotography73@gmail.com, or use the contact form on our website. We'll discuss your requirements, suggest a date, and confirm your booking. For weddings and events, early booking is recommended as dates fill up quickly.",
  },
  {
    q: "What photography services does Sairam Photography offer?",
    a: "Sairam Photography offers a full range of professional photography services: wedding photography, portrait photography, pre-wedding shoots, family portraits, event photography, commercial and product photography, kids and newborn photography, model portfolios, and cinematic wedding films. Every shoot is approached with the same level of care, creativity and technical excellence.",
  },
  {
    q: "Does Sairam Photography cover weddings outside Rajahmundry?",
    a: "Yes, while based in Rajahmundry, Sairam Photography covers weddings and events across Andhra Pradesh and beyond. Destinations, outstation weddings and travel shoots are all welcome. Get in touch to discuss your specific location and requirements.",
  },
  {
    q: "What awards has Sairam Photography won?",
    a: "Sairam Photography has won 48+ international photography awards, including a Gold Medal from the A.P. State Photography Academy and First Prize at the Sakshi TV Awards 2016. Sairam also holds prestigious photographic distinctions: AFIP (Associate of the Federation of Indian Photography), AFIAP (Artiste FIAP from the International Federation of Photographic Art), and EFIP.",
  },
  {
    q: "Where is Sairam Photography located?",
    a: "Sairam Photography is located on Jawaharlal Nehru Road, near Apollo Pharmacy, Venkateswara Nagar, Rajamahendravaram (Rajahmundry), Andhra Pradesh 533103, India. You can find us on Google Maps or contact us at +91 98661 09466.",
  },
  {
    q: "How long does a photography session take?",
    a: "Session duration depends on the type of shoot. Portrait and couple sessions typically take 1-2 hours. Family sessions take 1-2 hours. Full-day wedding coverage runs 8-12 hours. Pre-wedding shoots usually take 2-3 hours including location changes. We'll discuss the timeline during booking to ensure we capture everything you need.",
  },
  {
    q: "When will I receive my photos after the shoot?",
    a: "Portrait and couple sessions are typically delivered within 5-7 working days. Wedding and event photography is delivered within 2-3 weeks. All images are professionally edited and delivered as high-resolution digital files via online gallery. Cinematic wedding films are delivered within 4-6 weeks.",
  },
  {
    q: "Do you offer prints and albums?",
    a: "Yes, Sairam Photography offers premium photo prints, canvas prints and handcrafted wedding albums. Albums are designed with your input and printed on archival-quality materials. Print packages can be added to any photography booking.",
  },
  {
    q: "Can I see examples of your work before booking?",
    a: "Absolutely. You can browse our full portfolio on the Gallery page, watch cinematic films on the Cinematics page, or read client reviews on the Testimonials page. For specific category examples (wedding, portrait, commercial), visit our Services page. You can also follow Sairam Photography on Instagram @sairamphotography_rajahmundry for regular updates.",
  },
  {
    q: "What makes Sairam Photography different from other photographers in Rajahmundry?",
    a: "Sairam Photography stands out through 25+ years of experience, 48+ international awards (the most by any photographer in Rajahmundry), and a distinctive artistic approach that balances technical precision with genuine emotion. Every photograph is crafted to tell a story — not just document an event. The combination of award-winning expertise, creative vision, and personal attention to every client is what makes Sairam Photography Rajahmundry's top choice.",
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "FAQ",
            item: `${SITE_URL}/faq`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="bg-bg-secondary">
        <section className="bg-bg pt-[68px]">
          <div className="mx-auto max-w-[1280px] px-5 py-16 sm:py-24">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Frequently Asked Questions
              </p>
              <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight text-text">
                Photography Questions,{" "}
                <span className="text-accent">Answered</span>
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Everything you need to know about booking the best photographer
                in Rajahmundry. If you can&apos;t find your answer here, reach
                out via WhatsApp.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-bg-secondary pb-16 sm:pb-24">
          <div className="mx-auto max-w-3xl px-5">
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <Reveal key={i} delay={0.02 * i}>
                  <details className="group rounded-2xl border border-line bg-white">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-base font-bold text-text sm:p-7">
                      {item.q}
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="border-t border-line px-6 pb-6 pt-5 sm:px-7">
                      <p className="text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-bg">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:py-24">
            <Reveal className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Still Have Questions?
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.75rem,5vw,3rem)] font-semibold italic leading-tight text-text">
                Let&apos;s Talk About Your Shoot
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted">
                Reach out via WhatsApp for a quick reply, or use the contact
                form on our website. We&apos;re happy to answer any questions
                about pricing, availability and packages.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/919866109466?text=Hi%20Sairam%2C%20I%20have%20a%20question%20about%20photography."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-deep"
                >
                  Ask on WhatsApp
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 border-2 border-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent hover:text-white"
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
