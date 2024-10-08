"use client";

import NavBar from "@/components/navbar";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <div className=" min-h-dvh flex justify-center items-start bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <div className="w-3/4 mt-36 mb-36">
          <span className="text-2xl text-white">Your Collections</span>
          <div className=" bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2">
            <div className="flex ">
              <Image
                src={"/CandyBlinks.png"}
                alt="logo"
                width={100}
                height={100}
                className="rounded-md p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
