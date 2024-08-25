"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SignedIn, useAuth } from "@clerk/nextjs";
import NavBar from "./components/NavBar";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import { createBlink } from "../lib/supabaseRequests";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createNoopSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import {
  fetchCandyMachine,
  CandyMachine,
  fetchCandyGuard,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { clusterApiUrl } from "@solana/web3.js";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

const candyBlinkUrl = process.env.NEXT_PUBLIC_CANDYBLINK_URL || "";

type InputField =
  | "candyMachineId"
  | "title"
  | "label"
  | "iconUrl"
  | "description";

export default function Dashboard() {
  const [candyMachineId, setCandyMachineId] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const { userId } = useAuth();
  const ref = useRef<HTMLFormElement>(null);

  const [touchedInputs, setTouchedInputs] = useState<
    Record<InputField, boolean>
  >({
    candyMachineId: false,
    title: false,
    label: false,
    iconUrl: false,
    description: false,
  });

  const generateRandomText = (length: number): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  const handleBlur = (field: InputField) => {
    setTouchedInputs((prev) => ({ ...prev, [field]: true }));
  };

  const endpoint = clusterApiUrl("devnet");

  const fetchCandyGuards = async () => {
    if (candyMachineId)
      try {
        const umi = createUmi(endpoint)
          .use(mplCandyMachine())
          .use(mplTokenMetadata());
        const candyMachineAddress = publicKey(candyMachineId);
        const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
        const candyGuard = await fetchCandyGuard(
          umi,
          candyMachine.mintAuthority
        );
        console.log("candyguards:", candyGuard.guards);
        console.log("solPayment: ", candyGuard.guards.solPayment);
        console.log("CandyMachine:", candyMachine);
      } catch (error) {
        console.error("Error fetching candy machine:", error);
      }
  };

  const handleCreateBlink = async () => {
    if (
      !candyMachineId ||
      !title ||
      !label ||
      !iconUrl ||
      !description ||
      !userId
    ) {
      console.error("All fields must be filled");
      return;
    }

    try {
      const candyMachineAddress = publicKey(candyMachineId);
      const umi = createUmi(endpoint)
        .use(mplCandyMachine())
        .use(mplTokenMetadata());
      try {
        const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
        const candyGuard = await fetchCandyGuard(
          umi,
          candyMachine.mintAuthority
        );

        // // candyGuard.guards; // All guard settings.
        // // candyGuard.guards.botTax; // Bot Tax settings.
        // // candyGuard.guards.solPayment; // Sol Payment settings.

        console.log("candyguards:", candyGuard.guards);
        console.log("solPayment: ", candyGuard.guards.solPayment);
        console.log("CandyMachine:", candyMachine);
      } catch (error) {
        console.error("Error fetching candy machine:", error);
        Toast.fire({
          icon: "warning",
          title: "Cannot find Candy Machine",
        });
        return;
      }
    } catch (error) {
      console.error("Error creating public key:", error);
      Toast.fire({
        icon: "warning",
        title: "Candy Machine ID is not valid",
      });
      return;
    }

    try {
      const randomText = generateRandomText(8);
      const currentTime = new Date().getTime();
      const data = await createBlink(
        candyMachineId || "", // Default to empty string
        title || "",
        label || "",
        iconUrl || "",
        description || "",
        userId || "", // Default to empty string
        randomText || "",
        currentTime
      );

      console.log("data: ", data);
      ref.current?.reset();
      setSuccess(true);
      setCandyMachineId("");
      setTitle("");
      setLabel("");
      setIconUrl("");
      setDescription("");
    } catch (error) {
      console.error("Error creating blink: ", error);
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#ffffff",
    color: "#000000",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const candyMachineIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCandyMachineId(inputValue);
    setTouchedInputs((prev) => ({ ...prev, candyMachineId: true }));
    console.log("candyMachineId: ", candyMachineId);
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTitle(inputValue);
    setTouchedInputs((prev) => ({ ...prev, title: true }));
    console.log("title: ", title);
  };

  const labelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLabel(inputValue);
    setTouchedInputs((prev) => ({ ...prev, label: true }));
    console.log("label: ", label);
  };

  const iconUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIconUrl(inputValue);
    setTouchedInputs((prev) => ({ ...prev, iconUrl: true }));
    console.log("iconUrl: ", iconUrl);
  };

  const descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setDescription(inputValue);
    setTouchedInputs((prev) => ({ ...prev, description: true }));
    console.log("description: ", description);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      Toast.fire({
        icon: "success",
        title: "Blink copied successfully",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy to clipboard.");
    }
  };

  return (
    <SignedIn>
      <NavBar />
      <div className="min-h-dvh flex gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <form className="w-full max-w-xl" ref={ref}>
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
              className={`input input-bordered w-full bg-black text-white ${
                touchedInputs.candyMachineId && !candyMachineId
                  ? "input-error"
                  : ""
              }`}
              onChange={(e) => candyMachineIdChange(e)}
              onBlur={() => handleBlur("candyMachineId")}
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
                className={`input input-bordered w-full bg-black text-white ${
                  touchedInputs.title && !title ? "input-error" : ""
                }`}
                onChange={(e) => titleChange(e)}
                onBlur={() => handleBlur("title")}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text dm-sans text-white">Label</span>
              </div>
              <input
                type="text"
                placeholder=""
                className={`input input-bordered w-full bg-black text-white ${
                  touchedInputs.label && !label ? "input-error" : ""
                }`}
                onChange={(e) => labelChange(e)}
                onBlur={() => handleBlur("label")}
              />
            </label>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text dm-sans text-white">
                Icon URL{" "}
                <span className="text-neutral-400 italic">
                  (Only Imgur links are supported right now)
                </span>
              </span>
            </div>
            <input
              type="text"
              placeholder=""
              className={`input input-bordered w-full bg-black text-white ${
                touchedInputs.iconUrl && !iconUrl ? "input-error" : ""
              }`}
              onChange={(e) => iconUrlChange(e)}
              onBlur={() => handleBlur("iconUrl")}
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-white">Description</span>
            </div>
            <textarea
              className={`textarea textarea-bordered h-24 w-full bg-black text-white ${
                touchedInputs.description && !description ? "input-error" : ""
              }`}
              placeholder=""
              onChange={(e) => descriptionChange(e)}
              onBlur={() => handleBlur("description")}
            ></textarea>
          </label>
          <div className="w-full flex justify-center">
            <div
              className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
              onClick={handleCreateBlink}
            >
              Save!
            </div>{" "}
            {/* <div
              className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
              onClick={fetchCandyGuards}
            >
              test!
            </div> */}
          </div>
        </form>
        <div>
          <div className="label">
            <span className="label-text dm-sans text-white">Blink Preview</span>
          </div>
          <div className="p-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 max-w-[440px] border-pink-900 border-2">
            {iconUrl ? (
              <Image
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
              <div className="mt-1 text-sm dm-sans text-neutral-400 text-wrap w-full">
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
        </div>{" "}
        {success && (
          <>
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center transition-all fade-in pt-[76px] bg-black bg-opacity-60 min-h-dvh overflow-hidden">
              <div className="flex items-center justify-center ">
                <div className="p-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 max-w-[440px] border-pink-900 border-2 -translate-y-24">
                  <IoIosClose
                    className="text-4xl ml-auto cursor-pointer hover:text-neutral-300 translate-x-5 -translate-y-5 transition text-white"
                    onClick={() => {
                      setSuccess(false);
                    }}
                  />
                  <p className="text-white font-bold lg:text-5xl text-4xl -translate-y-8 text-center dm-sans mt-5">
                    Success!
                  </p>
                  <p className="dm-sans lg:text-2xl text-xl mt-3 pixelify -translate-y-8 text-center text-white font-semibold">
                    <span className="text-red-400">Candy Blink</span> Created
                  </p>
                  {/* <div
                    className="text-center text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
                    onClick={() => {
                      copyToClipboard(candyBlinkUrl);
                    }}
                  >
                    Click to Copy Blink
                  </div> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </SignedIn>
  );
}
