"use client";
import React, { useCallback, useEffect, useState } from "react";

import { SignedIn, useAuth } from "@clerk/nextjs";
import NavBar from "./components/NavBar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import supabase from "../lib/supabaseClient";
import { updateBlink } from "../lib/supabaseRequests";
import Image from "next/image";

interface TruncatedTextProps {
  text: string;
  startChars?: number;
  endChars?: number;
}

interface Blink {
  id: number;
  candymachine_id: string;
  title: string;
  label: string;
  image_url: string;
  description: string;
  created_at: number;
  user_id: string;
}

export default function Dashboard() {
  const { userId } = useAuth();
  const [blinks, setBlinks] = useState<Blink[]>([]); // State to hold the fetched blinks
  const [selectedBlink, setSelectedBlink] = useState<Blink | null>(null);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const getBlink = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("blinks")
        .select("*")
        .eq("user_id", userId);
      if (error) throw error;

      setBlinks(data || []); // Update the state with the fetched blinks
      setLoading(false);
      console.log("data: ", data);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [userId]);

  const deleteBlink = async (id: number) => {
    try {
      const { error } = await supabase
        .from("blinks") // Replace "blinks" with your actual table name if different
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update the state to remove the deleted blink
      setBlinks(blinks.filter((blink) => blink.id !== id));
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
        setSelectedBlink(null); // Close the edit form
      } catch (error) {
        console.error("Failed to update blink: ", error);
        alert("Failed to update blink.");
      }
    }
  };

  const TruncatedText: React.FC<TruncatedTextProps> = ({
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
                <div className="mt-4 text-xl font-bold">{blink.title}</div>
                <span className="text-sm font-thin">
                  <TruncatedText text={blink.candymachine_id} />
                </span>
                <div className="flex justify-end items-center">
                  <div
                    className="mr-4 mt-4 text-xl font-bold text-neutral-500 hover:text-neutral-300 cursor-pointer transition duration-200"
                    onClick={() => editBlink(blink)}
                  >
                    <FaEdit />
                  </div>
                  <div
                    className="mt-4 text-xl font-bold text-red-600 hover:text-red-400 cursor-pointer transition duration-200"
                    onClick={() => deleteBlink(blink.id)}
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
            ))}
            <div
              className={`mr-5 mt-5 bg-neutral-900 border-pink-950 border-2 p-5 text-white rounded-xl w-fit hover:shadow-lg hover:shadow-pink-900/50 hover:border-pink-900 transition duration-200 ${
                loading ? "block" : "hidden"
              }`}
            >
              <div>
                <div className="flex justify-center aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/CandyBlinks.png"
                    alt="logo"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mt-4 text-xl font-bold flex justify-center text-neutral-600">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            </div>
          </div>
        </div>
        {selectedBlink && (
          <>
            <style>{`
              body {
                overflow: hidden;
              }
            `}</style>
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center transition-all pt-[76px] bg-black bg-opacity-60 min-h-dvh">
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
                        onClick={handleSubmit} // Call handleSubmit on click
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
