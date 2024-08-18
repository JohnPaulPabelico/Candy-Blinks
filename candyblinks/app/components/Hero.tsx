import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

function Hero() {
  return (
    <div
    // style={{
    //   backgroundImage: `url(/Bg.webp)`,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   overflow: "hidden",
    // }}
    >
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-t from-neutral-950 from-60%  to-pink-950 ">
        <div>
          <div className="text-5xl font-bold dm-sans text-white max-w-96 leading-snug">
            Deploy your NFT Campaigns with{" "}
            <span className="text-red-400">Candy Blinks</span>
          </div>
          <div>
            <button className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded">
              Get Started!
            </button>
          </div>
        </div>
        <div>
          <Image
            src="/logo.png"
            alt="logo"
            width={500}
            height={500}
            className="ml-20"
          />
        </div>
      </section>
    </div>
  );
}

export default Hero;
