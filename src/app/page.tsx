import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { CinematicFilms } from "@/components/CinematicFilms";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <About />

        <Portfolio />

        <Services />

        <CinematicFilms />

        <Testimonials />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
