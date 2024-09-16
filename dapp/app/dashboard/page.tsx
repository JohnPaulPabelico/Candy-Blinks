"use client";
import React, { useCallback, useEffect, useState } from "react";

import NavBar from "@/components/navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

import { FaRegCopy } from "react-icons/fa";

import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isBlinksFound, setIsBlinksFound] = useState(true);

  return (
    <div>
      <NavBar />
      <div className=" min-h-dvh flex justify-center items-start bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <div className="w-3/4 mt-36  mb-36">
          <span className="text-2xl text-white">Your Candy Blinks</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"></div>
        </div>
      </div>
    </div>
  );
}
