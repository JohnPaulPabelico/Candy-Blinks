import Image from "next/image";
import Link from "next/link";

import React, { useContext } from "react";
import Background from "../public/explorebg.png";
import { Reveal } from "./Animations/Reveal";
import Carousel from "./Carousel";

const partnerslides = ["/partners/Partner1.webp", "/partners/Partner2.webp"];
function Explore() {
  return (
    <div>
      <section
        id="explore"
        className="flex min-h-screen flex-col items-center justify-between p-12 relative"
        style={{
          backgroundImage: `url(${Background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "40%",

          overflow: "hidden",
        }}
      >
        <div className="">
          <div className="p-12"></div>
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-5xl space lg:p-10 p-5 rounded-xl bg-slate-900/60 backdrop-blur-sm font-bold space text-white items-center">
              <div className="mb-10">EXPLORE OUR PARTNERS</div>
              <div className="rounded-3xl max-w-4xl lg:visible hidden lg:block">
                <Carousel autoSlide={true}>
                  {partnerslides.map((s, index) => (
                    <Image
                      key={index}
                      alt="slides"
                      src={s}
                      height={800}
                      width={900}
                      className="rounded-3xl"
                    />
                  ))}
                </Carousel>
              </div>
              <div className="rounded-3xl lg:hidden">
                <Image
                  alt="slides"
                  src={partnerslides[0]}
                  width={1200}
                  height={800}
                  className="rounded-3xl"
                ></Image>
                <Image
                  alt="slides"
                  src={partnerslides[1]}
                  width={1200}
                  height={800}
                  className="mt-10 rounded-3xl"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Explore;
