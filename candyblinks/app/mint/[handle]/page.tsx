import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mint",
  description: "Easily generate Candy Machine BLinks",
};

export default function Dashboard() {
  return (
    <SignedIn>
      <div className="min-h-dvh flex gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <div>
          <div className="p-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 max-w-[440px] border-pink-900 border-2 m-3">
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
                <div className="mt-3 text-lg dm-sans text-white">Title</div>
              </div>
              <div className="mt-1 text-sm dm-sans text-neutral-400 text-wrap w-full">
                {" "}
                Description - Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </div>
              <button className="mt-3 p-2 rounded-md bg-black hover:bg-neutral-950 transition duration-200 w-full text-white">
                <span className="text-white font-bold">Label</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  );
}
