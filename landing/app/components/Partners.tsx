import Image from "next/image";
import React from "react";
import Reveal from "@/components/animations/reveal";

export default function Partners() {
  return (
    <section
      id="partners"
      className="flex justify-center min-h-dvh bg-[radial-gradient(circle_at_left,_var(--tw-gradient-stops))] from-[#45061f]  to-20%  to-neutral-950"
    >
      <div className="">
        <div className="mt-20 text-5xl font-bold dm-sans text-white leading-snug flex justify-center">
          <Reveal>
            <div className="flex flex-col lg:flex-row text-center lg:text-start">
              <div>Our&nbsp;</div>
              <div className="text-red-400">Candy Partners</div>
            </div>
          </Reveal>
        </div>
        <div className="flex justify-center">
          <Reveal>
            <div className="mt-20 grid grid-cols-3 lg:grid-cols-4 gap-10 items-center">
              <Image
                src={"/partners/DSCVR.png"}
                alt="logo"
                width={150}
                height={150}
              />
              <Image
                src={"/partners/DFTB.jpg"}
                alt="logo"
                width={150}
                height={150}
                className="rounded-full"
              />
              <Image
                src={"/partners/Blinkord.png"}
                alt="logo"
                width={150}
                height={150}
                className="rounded-full"
              />
              <Image
                src={"/partners/Superteam.jpg"}
                alt="logo"
                width={150}
                height={150}
                className="rounded-full "
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
