"use client";
import NavBar from "@/components/navbar";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { LuCandy } from "react-icons/lu";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <section className="min-h-[80vh] flex flex-col gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% via-neutral-950 via-50%  to-neutral-950">
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
                Collection Name{" "}
                <span className="text-neutral-400">(0/1000)</span>
              </div>
              <div className="mt-3 text-2xl dm-sans font-medium text-white">
                0.1 SOL
              </div>
              <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer">
                View
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-dvh bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-[#45061f] to-20% to-neutral-950">
        <div className="justify-center flex-col items-center flex">
          <div className="text-5xl font-bold dm-sans text-red-400 flex ">
            <LuCandy />
            &nbsp;Candy Store&nbsp; <LuCandy />
          </div>
          <div className="grid grid-cols-4 gap-8 my-10">
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2 p-5 w-fit">
              <div>
                <Image
                  src={"/CandyBlinks.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="mt-5 text-2xl font-bold">Collection Name</div>
                <div className=" text-md">(0/1000)</div>
                <div className="flex justify-center">
                  <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer w-fit">
                    View
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2 p-5 w-fit">
              <div>
                <Image
                  src={"/CandyBlinks.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="mt-5 text-2xl font-bold">Collection Name</div>
                <div className=" text-md">(0/1000)</div>
                <div className="flex justify-center">
                  <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer w-fit">
                    View
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2 p-5 w-fit">
              <div>
                <Image
                  src={"/CandyBlinks.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="mt-5 text-2xl font-bold">Collection Name</div>
                <div className=" text-md">(0/1000)</div>
                <div className="flex justify-center">
                  <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer w-fit">
                    View
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2 p-5 w-fit">
              <div>
                <Image
                  src={"/CandyBlinks.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="mt-5 text-2xl font-bold">Collection Name</div>
                <div className=" text-md">(0/1000)</div>
                <div className="flex justify-center">
                  <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer w-fit">
                    View
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2 p-5 w-fit">
              <div>
                <Image
                  src={"/CandyBlinks.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="mt-5 text-2xl font-bold">Collection Name</div>
                <div className=" text-md">(0/1000)</div>
                <div className="flex justify-center">
                  <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer w-fit">
                    View
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2 p-5 w-fit">
              <div>
                <Image
                  src={"/CandyBlinks.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="mt-5 text-2xl font-bold">Collection Name</div>
                <div className=" text-md">(0/1000)</div>
                <div className="flex justify-center">
                  <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer w-fit">
                    View
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2 p-5 w-fit">
              <div>
                <Image
                  src={"/CandyBlinks.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="mt-5 text-2xl font-bold">Collection Name</div>
                <div className=" text-md">(0/1000)</div>
                <div className="flex justify-center">
                  <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer w-fit">
                    View
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 border-pink-900 border-2 p-5 w-fit">
              <div>
                <Image
                  src={"/CandyBlinks.png"}
                  alt="logo"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
                <div className="mt-5 text-2xl font-bold">Collection Name</div>
                <div className=" text-md">(0/1000)</div>
                <div className="flex justify-center">
                  <div className="mt-5 text-2xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer w-fit">
                    View
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
