"use client";
import React, { useState } from "react";
import Image from "next/image";

import { SignedIn } from "@clerk/nextjs";
import NavBar from "./components/NavBar";

export default function Dashboard() {
  const [candyMachineId, setCandyMachineId] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [description, setDescription] = useState("");

  // // Get the userId from auth() -- if null, the user is not signed in
  // const { userId } = auth();

  // if (userId) {
  //   // Query DB for user specific information or display assets only to signed in users
  // }

  // // Get the Backend API User object when you need access to the user's information
  // const user = await currentUser();
  // // Use `user` to render user details or create UI elements

  const candyMachineIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCandyMachineId(inputValue);
    console.log("candyMachineId: ", candyMachineId);
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTitle(inputValue);
    console.log("title: ", title);
  };

  const labelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLabel(inputValue);
    console.log("label: ", label);
  };

  const iconUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIconUrl(inputValue);
    console.log("iconUrl: ", iconUrl);
  };

  const descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
    console.log("description: ", description);
  };

  return (
    <SignedIn>
      <NavBar />
      <div className="min-h-dvh flex gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <form className="w-full max-w-xl">
          <div className=" text-5xl dm-sans font-semibold text-white">
            Create a <span className="text-red-400">Candy Blink</span>
          </div>
          <div className=" mt-2 mb-10 text-md dm-sans text-neutral-300">
            Bring your Candy Blink to life with personalized details that make
            it uniquely yours. Just fill in the form below, and watch your Candy
            Blink sparkle!
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text dm-sans text-white">
                Candy Machine ID
              </span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full bg-black text-white"
              onChange={(e) => candyMachineIdChange(e)}
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="form-control">
              <div className="label">
                <span className="label-text dm-sans text-white">Title</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full bg-black text-white"
                onChange={(e) => titleChange(e)}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text dm-sans text-white">Label</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full bg-black text-white"
                onChange={(e) => labelChange(e)}
              />
            </label>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text dm-sans text-white">Icon URL</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full bg-black text-white"
              onChange={(e) => iconUrlChange(e)}
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-white">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 w-full bg-black text-white"
              placeholder=""
              onChange={(e) => descriptionChange(e)}
            ></textarea>
          </label>
          <div className="w-full flex justify-center">
            <button className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg">
              Save!
            </button>
          </div>
        </form>

        <div>
          <div className="label">
            <span className="label-text dm-sans text-white">Blink Preview</span>
          </div>
          <div className="p-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 max-w-[440px] border-pink-900 border-2">
            {iconUrl ? (
              <img
                src={iconUrl}
                alt="icon"
                width={400}
                height={400}
                className="rounded-md"
              />
            ) : (
              <Image
                src={"/CandyBlinks.png"}
                alt="logo"
                width={400}
                height={400}
                className="rounded-md"
              />
            )}
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
                  {title ? title : "Title"}
                </div>
              </div>
              <div className="text-sm dm-sans text-neutral-400 text-wrap w-full">
                {description
                  ? description
                  : "Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </div>
              <button className="mt-3 p-2 rounded-md bg-black hover:bg-neutral-950 transition duration-200 w-full text-white">
                <span className="text-white font-bold">
                  {label ? label : "Label"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  );
}
