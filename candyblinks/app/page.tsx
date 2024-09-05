"use client";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import About from "./components/About";
import useRendered from "@/hooks/useRendered";

export default function Home() {
  const rendered = useRendered();

  return (
    <main>
      {rendered && (
        <div>
          <NavBar />
          <Hero />
          <About />
          <Footer />
        </div>
      )}
    </main>
  );
}
