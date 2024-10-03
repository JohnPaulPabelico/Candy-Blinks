"use client";

import NavBar from "@/components/navbar";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <div className=" min-h-dvh flex justify-center items-start bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <div className="w-3/4 mt-36  mb-36">
          <span className="text-2xl text-white">Your Collections</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"></div>
        </div>
      </div>
    </div>
  );
}
