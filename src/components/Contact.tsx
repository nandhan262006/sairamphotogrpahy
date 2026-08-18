import { Reveal } from "@/components/Reveal";
import { WHATSAPP_URL, INSTAGRAM_URL, MAPS_URL } from "@/lib/site";
import {
  PhoneIcon,
  MailIcon,
  LocationIcon,
  InstagramIcon,
  ArrowRightIcon,
} from "@/components/icons";

const CONTACT = {
  phone: "+91 98661 09466",
  phoneRaw: "+919866109466",
  email: "hello@sairamphotography.in",
  address: "Jawaharlal Nehru Rd, near Apollo Pharmacy, Venkateswara Nagar, Rajamahendravaram, Andhra Pradesh 533103",
  hours: "Daily · Opens 8:30 am",
  area: "Rajamahendravaram & nearby areas",
  maps: MAPS_URL,
  instagram: INSTAGRAM_URL,
};

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-accent" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3 1.2-6.5-4.8-4.6 6.6-.9L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Contact
          </p>
          <h2 className="mt-3 text-[clamp(2rem,7vw,3.25rem)] font-extrabold tracking-tight text-text">
            Let&rsquo;s Create Something <span className="text-accent">Beautiful</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="space-y-5">
            <Reveal>
              <div className="rounded-2xl border border-line bg-bg-warm p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-accent text-white">
                    <span className="text-lg font-extrabold leading-none">4.9</span>
                  </div>
                  <div>
                    <Stars />
                    <p className="mt-1 text-sm text-muted">
                      240 Google reviews
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Wedding photographer in Rajahmundry, Andhra Pradesh
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
                <li className="flex gap-4 p-5">
                  <LocationIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Address
                    </p>
                    <a
                      href={CONTACT.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm leading-relaxed text-text transition-colors hover:text-accent"
                    >
                      {CONTACT.address}
                    </a>
                    <a
                      href={CONTACT.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent"
                    >
                      Get Directions
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 p-5">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Phone
                    </p>
                    <a
                      href={`tel:${CONTACT.phoneRaw}`}
                      className="mt-1 block text-sm font-semibold text-text hover:text-accent"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 p-5">
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="mt-1 block text-sm font-semibold text-text hover:text-accent"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 p-5">
                  <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Instagram
                    </p>
                    <a
                      href={CONTACT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm font-semibold text-text hover:text-accent"
                    >
                      @sairamphotography
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 p-5">
                  <ArrowRightIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Hours
                    </p>
                    <p className="mt-1 text-sm text-text">{CONTACT.hours}</p>
                    <p className="mt-0.5 text-sm text-muted">
                      {CONTACT.area}
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <form className="rounded-2xl border border-line bg-white p-7 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    Name
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    className="rounded-lg border border-line bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    Phone
                  </span>
                  <input
                    required
                    type="tel"
                    placeholder="Your phone number"
                    className="rounded-lg border border-line bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    Service
                  </span>
                  <select
                    className="rounded-lg border border-line bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option>Wedding Photography</option>
                    <option>Portrait Photography</option>
                    <option>Event Photography</option>
                    <option>Commercial Photography</option>
                    <option>Cinematic Film</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    Message
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your shoot..."
                    className="resize-none rounded-lg border border-line bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  />
                </label>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2.5 bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent-deep"
              >
                Book a Shoot
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </form>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="flex flex-col gap-1 border-b border-line bg-bg-warm px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
                  Visit the Studio
                </p>
                <p className="mt-1 text-sm text-muted">
                  Find us on Jawaharlal Nehru Road, next to Apollo Pharmacy in
                  Venkateswara Nagar.
                </p>
              </div>
              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent sm:mt-0"
              >
                Open in Maps
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
            <iframe
              title="Sairam Photography location map"
              src="https://www.google.com/maps?q=17.0072412,81.7968288&z=16&output=embed"
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
