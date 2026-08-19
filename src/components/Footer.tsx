import Image from "next/image";
import Link from "next/link";
import {
  PHONE_DISPLAY,
  WHATSAPP_URL,
  INSTAGRAM_URL,
  YOUTUBE_URL,
  MAPS_URL,
  EMAIL_URL,
} from "@/lib/site";
import {
  WhatsAppIcon,
  InstagramIcon,
  YoutubeIcon,
  PhoneIcon,
  MailIcon,
  LocationIcon,
} from "@/components/icons";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Services", href: "/#services" },
  { label: "Cinematics", href: "/cinematics" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const SERVICE_LINKS = [
  { label: "Wedding Photography", href: "/#services" },
  { label: "Portrait Photography", href: "/#services" },
  { label: "Event Photography", href: "/#services" },
  { label: "Commercial Photography", href: "/#services" },
  { label: "Cinematic Films", href: "/cinematics" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-secondary">
      <div className="mx-auto max-w-[1280px] px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label="Sairam Photography — home">
              <Image
                src="/images/logo.png"
                alt="Sairam Photography"
                width={387}
                height={197}
                className="h-12 w-auto"
                unoptimized
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Wedding &amp; portrait photographer in Rajahmundry, Andhra
              Pradesh — capturing moments that become memories.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Quick links">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text">
              Quick Links
            </p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text">
              Services
            </p>
            <ul className="mt-4 space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text">
              Get in Touch
            </p>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-muted transition-colors hover:text-accent"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_URL}
                  className="flex items-start gap-3 text-sm text-muted transition-colors hover:text-accent"
                >
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  sairamphotography73@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted transition-colors hover:text-accent"
                >
                  <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Jawaharlal Nehru Rd, Rajamahendravaram
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-muted transition-colors hover:text-accent"
                >
                  <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  @sairamphotography_rajahmundry
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-3 px-5 py-6 sm:flex-row sm:items-center">
          <span className="text-xs text-muted">
            © {new Date().getFullYear()} Sairam Photography. All rights
            reserved.
          </span>
          <span className="text-xs text-muted">
            Wedding Photographer · Rajahmundry, Andhra Pradesh
          </span>
        </div>
      </div>
    </footer>
  );
}
