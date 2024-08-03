"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

export default function Dashboard() {
  const [successMessage, setSuccessMessage] = React.useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy to clipboard.");
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center bg-yellow-200">
        {/* BLINK FORM */}
        <div className="bg-red-300 w-3/4 p-5 font-wonderbar rounded-lg ">
          <div className="flex items-center">
            <div className="text-3xl">Add a blink</div>{" "}
            <div
              className="ml-auto text-xl px-4 py-3 bg-red-500 rounded-md hover:bg-red-600 cursor-pointer transition-all delay-100"
              onClick={() => setSuccessMessage(true)}
            >
              Save
            </div>
          </div>
          <div className="mt-5">
            <form>
              <input
                className="text-lg px-3 py-2 bg-white rounded-md text-slate-800 font-sans w-full"
                type="text"
                placeholder="Candy Machine Address"
              />
              <div className="mt-4 flex justify-between">
                <input
                  className="text-lg px-3 py-2 bg-white rounded-md text-slate-800 font-sans w-full"
                  type="text"
                  placeholder="Title"
                />
                <input
                  className="text-lg px-3 py-2 bg-white rounded-md text-slate-800 font-sans w-full ml-3"
                  type="text"
                  placeholder="Label"
                />
                <input
                  className="text-lg px-3 py-2 bg-white rounded-md text-slate-800 font-sans w-full ml-3"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <input
                className="mt-4 text-lg px-3 py-2 bg-white rounded-md text-slate-800 font-sans w-1/2"
                type="text"
                placeholder="Image Url"
              />
            </form>
          </div>
        </div>
        {/* LIST OF BLINKS */}
        <div className="mt-3 bg-red-300 w-3/4 p-5 font-wonderbar rounded-lg ">
          <div className="flex items-center">
            <div className="text-3xl">Your Candy Blinks</div>
          </div>
          <div className="mt-5 bg-red-400 rounded-md font-sans">
            <div className="p-3">
              <ul>
                <li>Blink 1</li>
                <li>Blink 2</li>
                <li>Blink 3</li>
                <li>Blink 4</li>
              </ul>
            </div>
          </div>
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-yellow-300 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className=" mt-5 flex justify-start items-center">
            <div>
              <Image
                src="/logo.png"
                alt="logo"
                width={80}
                height={80}
                className=" mb-[-20px] mt-[-20px]"
              />
            </div>
            <div className="ml-2 text-xl font-wonderbar text-red-400">
              Candy BLinks
            </div>
          </div>
          <li className="mt-10 font-wonderbar text-red-400 text-2xl">
            <a>My Blinks</a>
          </li>
          <li className="font-wonderbar text-red-400 text-2xl">
            <a>settings</a>
          </li>
        </ul>
      </div>{" "}
      {successMessage && (
        <>
          <style>{`
      body {
        overflow: hidden;
      }
    `}</style>
          <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center transition-all fade-in pt-[76px] bg-black bg-opacity-30 min-h-dvh">
            <div className="flex items-center justify-center ">
              <div className="bg-amber-300 p-10 rounded-lg max-w-[384px] lg:max-w-[520.281px] -translate-y-24 drop-shadow-2xl">
                <IoIosClose
                  className="text-5xl ml-auto cursor-pointer hover:text-white translate-x-5 -translate-y-5 transition"
                  onClick={() => {
                    window.location.reload();
                  }}
                />
                <p className="font-wonderbar lg:text-5xl text-4xl -translate-y-8 text-center">
                  Success!
                </p>
                <p className="lg:text-3xl text-xl mt-3 font-wonderbar -translate-y-8 text-center ">
                  You made your candy blink
                </p>
                <div
                  onClick={() =>
                    copyToClipboard(
                      "https://dial.to/?action=solana-action:https://buidlstation.vercel.app/api/actions/mint"
                    )
                  }
                  className="font-wonderbar font-semibold text-xl bg-green-400 px-2 py-1 rounded-full hover:bg-green-500 hover:scale-110 transition duration-50 shadow-lg -translate-y-2 flex justify-center cursor-pointer"
                >
                  Click to copy
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
