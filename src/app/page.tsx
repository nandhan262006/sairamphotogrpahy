import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { CinematicFilms } from "@/components/CinematicFilms";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import {
  getSettings,
  getFeaturedPortfolio,
  getServices,
  getCinematics,
  getTestimonials,
} from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [settings, portfolio, services, cinematics, testimonials] = await Promise.all([
    getSettings(),
    getFeaturedPortfolio(),
    getServices(),
    getCinematics(),
    getTestimonials(),
  ]);

  return (
    <>
      <Navbar />

      <main>
        <Hero heroImage={settings.hero_image} />

        <About aboutImage={settings.about_image} />

        <Portfolio items={portfolio} />

        <Services items={services} />

        <CinematicFilms items={cinematics} />

        <Testimonials items={testimonials} />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
