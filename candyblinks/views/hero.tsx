import Link from "next/link";
import Image from "next/image";
import React from "react";
import Reveal from "@/components/animations/reveal";

export default function Hero() {
  return (
    <section className="flex items-center justify-center min-h-dvh bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% via-neutral-950 via-70%  to-neutral-950 ">
      <Reveal>
        <div className="text-center lg:text-start flex flex-col items-center lg:items-start">
          <Image
            src="/logo.png"
            alt="logo"
            width={500}
            height={500}
            className="block lg:hidden"
          />
          <div className="text-5xl font-bold dm-sans text-white max-w-96 leading-snug">
            Deploy your NFT Campaigns with{" "}
            <span className="text-red-400">Candy Blinks</span>
          </div>
          <div className="mt-5">
            <Link
              href="/login"
              className="text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg"
            >
              Get Started!
            </Link>
          </div>
          <div className="mt-5 text-white flex items-center dm-sans justify-center lg:justify-start">
            <span>Powered by &nbsp;</span>
            <Image
              src={"/SolanaLogo.png"}
              alt={"Solana Logo"}
              width={100}
              height={100}
            />
          </div>
        </div>
      </Reveal>
      <Reveal>
        <Image
          src="/logo.png"
          alt="logo"
          width={500}
          height={500}
          className="ml-20 lg:block hidden"
        />
      </Reveal>
    </section>
  );
}
