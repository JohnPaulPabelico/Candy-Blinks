import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
export default function Featured() {
  return (
    <section className="min-h-dvh flex flex-col gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% via-neutral-950 via-70%  to-neutral-950">
      <div className="py-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2">
        <div className="flex justify-center ">
          <div className="text-4xl dm-sans font-bold text-red-400 flex">
            <FaStar />
            &nbsp; Featured Collection&nbsp;
            <FaStar />
          </div>
        </div>
        <div className="flex mt-5 p-4">
          <Image
            src={"/CandyBlinks.png"}
            alt="logo"
            width={300}
            height={300}
            className="rounded-md"
          />
          <div className="w-full flex-col flex items-center justify-center ml-5">
            <div className="mt-3 text-3xl dm-sans font-semibold text-white">
              Collection Name <span className="text-neutral-400">(0/1000)</span>
            </div>
            <div className="mt-3 text-2xl dm-sans font-medium text-white">
              0.1 SOL
            </div>
            <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer">
              Mint
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
