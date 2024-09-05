import Link from "next/link";
import Image from "next/image";
import React from "react";
import Reveal from "@/components/animations/reveal";
import { FaCode } from "react-icons/fa6";
import { TbBoxMultiple } from "react-icons/tb";
import { GrDeploy } from "react-icons/gr";

export default function About() {
  return (
    <section
      id="about"
      className="flex justify-center min-h-dvh bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-[#45061f]  to-20%  to-neutral-950"
    >
      <div>
        <div className="mt-20 text-5xl font-bold dm-sans text-white leading-snug flex justify-center">
          <Reveal>
            <div className="flex flex-col lg:flex-row text-center lg:text-start">
              <div>What is&nbsp;</div>
              <div className="text-red-400">Candy Blinks</div>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-10">
          <Reveal>
            <div className="p-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 max-w-[440px] border-pink-900 border-2 mx-4">
              <Image
                src={"/CandyBlinks.png"}
                alt="logo"
                width={400}
                height={400}
                className="rounded-md"
              />
              <div className="mt-3">
                <div className="text-sm dm-sans text-neutral-400 flex items-center ">
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  candyblinks.fun
                </div>
                <div className="mt-3 text-lg dm-sans text-white">
                  <div className="mt-3 text-lg dm-sans text-white">
                    Candy Machine Blink
                  </div>
                </div>
                <div className="text-sm dm-sans text-neutral-400 text-wrap w-full">
                  CandyBlinks is a powerful no-code platform that empowers you
                  to create and deploy multiple Metaplex&apos;s Candy Machine
                  powered Blinks in just a few clicks. No coding required, just
                  pure creativity!
                </div>
                <button className="mt-3 p-2 rounded-md bg-black hover:bg-neutral-950 transition duration-200 w-full text-white">
                  <span className="text-white font-bold">Mint</span>
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div className=" bg-neutral-900 border-pink-950 border-2 p-5 text-white rounded-xl ">
                <div>
                  <div className="text-3xl p-4 bg-gradient-to-b from-red-400 to-red-700 rounded-lg w-fit">
                    <FaCode />
                  </div>
                </div>
                <div className="mt-4 text-xl font-bold">
                  Build without Boundaries
                </div>
                <div className="w-80 text-md text-neutral-400">
                  Create stunning Blinks without writing a single line of code.
                  CandyBlinks makes your ideas come to life effortlessly!
                </div>
              </div>
              <div className="mt-5 bg-neutral-900 border-pink-950 border-2 p-5 text-white rounded-xl ">
                <div>
                  <div className="text-3xl p-4 bg-gradient-to-b from-red-400 to-red-700 rounded-lg w-fit">
                    <TbBoxMultiple />
                  </div>
                </div>
                <div className="mt-4 text-xl font-bold">
                  Multiply Your Magic
                </div>
                <div className="w-80 text-md text-neutral-400">
                  Launch multiple Blinks simultaneously with ease, saving you
                  time and expanding your reach instantly.
                </div>
              </div>
              <div className="mt-5 bg-neutral-900 border-pink-950 border-2 p-5 text-white rounded-xl ">
                <div>
                  <div className="text-3xl p-4 bg-gradient-to-b from-red-400 to-red-700 rounded-lg w-fit">
                    <GrDeploy />
                  </div>
                </div>
                <div className="mt-4 text-xl font-bold">
                  One Click to Launch
                </div>
                <div className="w-80 text-md text-neutral-400">
                  Share your custom Candy Blink to any Blink supported websites
                  and deploy it instantly! It&apos;s as simple as share and
                  shine!
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
