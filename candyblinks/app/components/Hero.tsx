import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

function Hero() {
  return (
    <div>
      <section className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="text-5xl font-bold dm-sans text-white max-w-96 leading-snug">
          Deploy your NFT Campaigns with{" "}
          <span className="text-red-400">Candy Blinks</span>
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
