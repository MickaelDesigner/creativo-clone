import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Hero from "./Hero";
import Services from "./Services";
import ClientsMarquee from "./ClientsMarquee";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import BreakMold from "./BreakMold";
import Technologies from "./Technologies";
import CTA from "./CTA";
import WorkTogether from "./WorkTogether";
import Footer from "./Footer";

export default function HomeContent() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <Services />
        <ClientsMarquee />
        <Projects />
        <Testimonials />
        <BreakMold />
        <Technologies />
        <CTA />
      </main>
      <WorkTogether />
      <Footer />
    </SmoothScroll>
  );
}
