"use client";
import React, { useCallback, useEffect, useState } from "react";
import { SignedIn, useAuth } from "@clerk/nextjs";
import NavBar from "./components/NavBar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getBlinks, updateBlink, deleteBlink } from "../lib/supabaseRequests";
import Image from "next/image";
import SkeletonCard from "./components/SkeletonCard";
import { FaRegCopy } from "react-icons/fa";
import Swal from "sweetalert2";
import EmptySkeletonCard from "./components/EmptySkeletonCard";

export default function Dashboard() {
  const { userId } = useAuth();
  const [blinks, setBlinks] = useState<Blink[]>([]);
  const [selectedBlink, setSelectedBlink] = useState<Blink | null>(null);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isBlinksFound, setIsBlinksFound] = useState(true);

  const getBlink = useCallback(async () => {
    try {
      const data = await getBlinks(userId!);

      setBlinks(data);

      if (!data || data.length === 0) {
        setLoading(false);
        setIsBlinksFound(false);
        return;
      }

      setIsBlinksFound(true);
      setLoading(false);
      console.log("data: ", data);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [userId]);

  const removeBlink = async (id: number) => {
    try {
      const deletedBlinkId = await deleteBlink(id);

      setBlinks((prevBlinks) =>
        prevBlinks.filter((blink) => blink.id !== deletedBlinkId)
      );
      Toast.fire({
        icon: "success",
        title: "Blink deleted successfully",
      });
      if (blinks.length === 0) setIsBlinksFound(false);
    } catch (error) {
      console.error("Failed to delete blink: ", error);
      alert("Failed to delete blink.");
    }
  };

  useEffect(() => {
    if (userId) {
      getBlink();
    }
  }, [userId, getBlink]);

  const editBlink = (blink: Blink) => {
    setSelectedBlink(blink);
    setTitle(blink.title);
    setLabel(blink.label);
    setIconUrl(blink.image_url);
    setDescription(blink.description);
  };

  const handleSubmit = async () => {
    if (selectedBlink) {
      try {
        console.log("selectedBlink: ", selectedBlink);
        const currentTime = new Date().getTime();
        const updatedBlink = await updateBlink(
          selectedBlink.id,
          title,
          label,
          iconUrl,
          description,
          currentTime
        );
        setBlinks(
          blinks.map((blink) =>
            blink.id === selectedBlink.id ? (updatedBlink[0] as Blink) : blink
          )
        );
        setSelectedBlink(null);
      } catch (error) {
        console.error("Failed to update blink: ", error);
        alert("Failed to update blink.");
      }
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

  const TruncatedTextSplit: React.FC<TruncatedTextSplitProps> = ({
    text,
    startChars = 6,
    endChars = 6,
  }) => {
    const truncate = (str: string) => {
      if (str.length <= startChars + endChars) return str;
      return `${str.slice(0, startChars)}.....${str.slice(-endChars)}`;
    };

    return <span className="text-sm font-normal">{truncate(text)}</span>;
  };

  return (
    <SignedIn>
      <NavBar />
      <div className=" min-h-dvh flex justify-center items-start bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <div className="w-3/4 mt-36  mb-36">
          <span className="text-2xl text-white">Your Candy Blinks</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {blinks.map((blink) => (
              <div
                key={blink.id}
                className="mr-5 mt-5 bg-neutral-900 border-pink-950 border-2 p-5 text-white rounded-xl w-fit hover:shadow-lg hover:shadow-pink-900/50 hover:border-pink-900 transition duration-200"
              >
                <div>
                  <div className="flex justify-center aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={blink.image_url}
                      alt="logo"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-start items-center">
                  <div className="mr-auto text-xl font-bold">{blink.title}</div>
                  <div
                    className="mr-4 text-xl font-bold text-neutral-500 hover:text-neutral-300 cursor-pointer transition duration-200"
                    onClick={() => editBlink(blink)}
                  >
                    <FaEdit />
                  </div>
                  <div
                    className=" text-xl font-bold text-red-600 hover:text-red-400 cursor-pointer transition duration-200"
                    onClick={() => removeBlink(blink.id)}
                  >
                    <MdDelete />
                  </div>
                </div>
                <span className="text-sm font-thin text-neutral-400">
                  <TruncatedTextSplit text={blink.candymachine_id} />
                </span>

                <div className="mt-4 flex justify-start items-center">
                  <div className="text-sm font-semibold mr-auto flex items-center justify-start ">
                    Handle: &nbsp;
                    <span className="font-light text-sm">
                      {blink.handle} &nbsp;
                    </span>
                    <span
                      className="text-neutral-400 text-lg cursor-pointer hover:text-white transition duration-200 tooltip"
                      data-tip={"https://candyblinks.fun/mint/" + blink.handle}
                      onClick={() => {
                        copyToClipboard(
                          "https://candyblinks.fun/mint/" + blink.handle
                        );
                      }}
                    >
                      <FaRegCopy />
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <SkeletonCard loading={loading} />
            <EmptySkeletonCard
              loading={loading}
              isBlinksFound={isBlinksFound}
            />
          </div>
        </div>
        {selectedBlink && (
          <>
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center transition-all pt-[76px] bg-black bg-opacity-60 min-h-dvh overflow-hidden">
              <div className="flex items-center justify-center">
                <div className="p-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 max-w-[440px] border-pink-900 border-2 -translate-y-24">
                  <form className="w-full max-w-xl">
                    <div className="text-3xl dm-sans font-semibold text-white">
                      Edit Details
                    </div>
                    <div className="mt-4 text-sm dm-sans  text-neutral-400">
                      Candy Machine ID: {selectedBlink.candymachine_id}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text dm-sans text-white">
                            Title
                          </span>
                        </div>
                        <input
                          type="text"
                          value={title}
                          className="input input-bordered w-full bg-black text-white"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </label>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text dm-sans text-white">
                            Label
                          </span>
                        </div>
                        <input
                          type="text"
                          value={label}
                          className="input input-bordered w-full bg-black text-white"
                          onChange={(e) => setLabel(e.target.value)}
                        />
                      </label>
                    </div>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text dm-sans text-white">
                          Icon URL
                        </span>
                      </div>
                      <input
                        type="text"
                        value={iconUrl}
                        className="input input-bordered w-full bg-black text-white"
                        onChange={(e) => setIconUrl(e.target.value)}
                      />
                    </label>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text text-white">
                          Description
                        </span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered h-24 w-full bg-black text-white"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </label>
                    <div className="w-full flex justify-center gap-5">
                      <div
                        className="mt-5 text-xl bg-neutral-500 hover:bg-neutral-600 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
                        onClick={() => setSelectedBlink(null)}
                      >
                        Cancel
                      </div>
                      <div
                        className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
                        onClick={handleSubmit}
                      >
                        Save!
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </SignedIn>
  );
}
