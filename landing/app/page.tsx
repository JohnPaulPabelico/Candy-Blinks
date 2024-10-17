import Hero from "@/views/hero";
import About from "@/views/about";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Partners from "./components/Partners";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Partners />
      <Footer />
    </>
  );
}
