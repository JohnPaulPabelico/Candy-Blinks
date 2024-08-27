"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { IoIosClose } from "react-icons/io";
import Swal from "sweetalert2";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import {
  fetchCandyMachine,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { clusterApiUrl } from "@solana/web3.js";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { useSupabaseClerkClient } from "../../lib/supabaseClerkClient";

const candyBlinkUrl = process.env.NEXT_PUBLIC_CANDYBLINK_URL || "";

export default function Dashboard() {
  const [candyMachineId, setCandyMachineId] = useState("");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const { userId } = useAuth();
  const ref = useRef<HTMLFormElement>(null);

  const client = useSupabaseClerkClient();

  const [touchedInputs, setTouchedInputs] = useState<
    Record<InputField, boolean>
  >({
    candyMachineId: false,
    title: false,
    label: false,
    iconUrl: false,
    description: false,
  });

  const handleBlur = (field: InputField) => {
    setTouchedInputs((prev) => ({ ...prev, [field]: true }));
  };

  const endpoint = clusterApiUrl("devnet");

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

  return (
    <SignedIn>
      <div className="min-h-dvh flex gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <div>
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
      </div>
    </SignedIn>
  );
}
