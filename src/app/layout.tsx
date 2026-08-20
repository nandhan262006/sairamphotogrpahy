import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://www.sairamphotograph.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sairam Photography | Best Photographer in Rajahmundry",
    template: "%s | Sairam Photography",
  },
  description:
    "Sairam Photography — the best photography studio in Rajahmundry (Rajamundry). Award-winning wedding, portrait, event, commercial and cinematic photography since 1996. 48+ international awards. Book your shoot today.",
  keywords: [
    "best photographer in rajahmundry",
    "best photographer in rajamundry",
    "sairam photography",
    "sairamphotography",
    "wedding photographer rajahmundry",
    "portrait photography rajahmundry",
    "event photography rajahmundry",
    "commercial photography rajahmundry",
    "cinematic wedding films rajahmundry",
    "photography studio rajahmundry",
    "top photographer andhra pradesh",
    "award winning photographer rajahmundry",
  ],
  authors: [{ name: "Sairam Photography" }],
  creator: "Sairam Photography",
  publisher: "Sairam Photography",
  applicationName: "Sairam Photography",
  category: "Photography Studio",
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Sairam Photography",
    title: "Sairam Photography | Best Photographer in Rajahmundry",
    description:
      "Award-winning photography studio in Rajahmundry. Wedding, portrait, event, commercial and cinematic photography since 1996. 48+ international awards.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sairam Photography — Best Photographer in Rajahmundry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sairam Photography | Best Photographer in Rajahmundry",
    description:
      "Award-winning photography studio in Rajahmundry. Wedding, portrait, event, commercial and cinematic photography since 1996.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Sairam Photography",
    alternateName: "Sairam Photography Rajahmundry",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-image.png`,
    description:
      "Best photography studio in Rajahmundry. Wedding, portrait, event, commercial and cinematic photography since 1996. 48+ international awards.",
    telephone: "+919866109466",
    email: "sairamphotography73@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jawaharlal Nehru Rd, near Apollo Pharmacy, Venkateswara Nagar",
      addressLocality: "Rajamahendravaram",
      addressRegion: "Andhra Pradesh",
      postalCode: "533103",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+919866109466",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "te"],
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.0005,
      longitude: 81.804,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Rajahmundry",
      },
      {
        "@type": "City",
        name: "Rajamundry",
      },
      {
        "@type": "State",
        name: "Andhra Pradesh",
      },
    ],
    priceRange: "$$",
    foundingDate: "1996",
    founder: {
      "@type": "Person",
      name: "Sairam",
      jobTitle: "Photographer",
    },
    award: [
      "48+ International Awards",
      "AFIP · AFIAP · EFIP Photographic Distinctions",
      "Gold Medal — A.P. State Photography Academy",
      "Best Photographer — Sakshi TV Awards 2016",
    ],
    knowsAbout: [
      "Wedding Photography",
      "Portrait Photography",
      "Event Photography",
      "Commercial Photography",
      "Cinematic Wedding Films",
      "Pre-Wedding Photography",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    sameAs: [
      "https://www.instagram.com/sairamphotography_rajahmundry",
      "https://www.youtube.com/@sairamphotographyrajahmund3517",
      "https://maps.app.goo.gl/pRbQexQCo7ZfCRDQ9",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Photography",
            description: "Professional wedding photography and cinematography in Rajahmundry",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Portrait Photography",
            description: "Professional portrait and family photography sessions",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Event Photography",
            description: "Corporate events, celebrations and function photography",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Photography",
            description: "Product, brand and commercial photography",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cinematic Wedding Films",
            description: "Cinematic wedding films and highlight reels",
          },
        },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What photography services does Sairam Photography offer in Rajahmundry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sairam Photography offers wedding, portrait, family, event, commercial, fashion, kids, newborn, and pre-wedding photography, plus cinematic wedding films and highlight reels.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Sairam Photography located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The studio is located on Jawaharlal Nehru Road, near Apollo Pharmacy, Venkateswara Nagar, Rajamahendravaram, Andhra Pradesh 533103.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book a photography shoot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Book via WhatsApp at +91 98661 09466 or email sairamphotography73@gmail.com. You can also use the booking form on the website.",
        },
      },
      {
        "@type": "Question",
        name: "How much experience does Sairam have as a photographer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sairam has over 25 years of professional experience, beginning in 1996, with 48+ international awards and AFIP, AFIAP, and EFIP photographic distinctions.",
        },
      },
      {
        "@type": "Question",
        name: "Does Sairam Photography cover events outside Rajahmundry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Sairam Photography serves Rajamahendravaram and nearby areas across Andhra Pradesh.",
        },
      },
    ],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sairam Photography",
    url: SITE_URL,
    publisher: {
      "@type": "ProfessionalService",
      name: "Sairam Photography",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-bg font-sans text-text">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
