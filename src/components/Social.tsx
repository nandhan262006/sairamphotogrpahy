import { Reveal } from "@/components/Reveal";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedinIcon,
} from "@/components/icons";

const SOCIAL = [
  { label: "Facebook", icon: FacebookIcon, href: "#" },
  { label: "Instagram", icon: InstagramIcon, href: "#" },
  { label: "YouTube", icon: YoutubeIcon, href: "#" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "#" },
];

export function Social() {
  return (
    <section id="social" className="bg-bg-warm py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-5 text-center">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Follow Me
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,6vw,2.75rem)] font-extrabold tracking-tight text-text">
            Stay Connected
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex items-center justify-center gap-4">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-black transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              <s.icon className="h-5 w-5" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
