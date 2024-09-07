"use client";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import useCreateCandyMachine from "@/hooks/useCreateCandyMachine";

import React, { useEffect } from "react";

export default function Home() {
  const { mutate, error, data } = useCreateCandyMachine();

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <NavBar />

      <div className="min-h-dvh flex flex-col gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <div>Create Candy Machine</div>
        <form className="flex flex-col w-fit gap-4">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Collection Name"
          />
          <input
            type="number"
            name="items"
            id="items"
            placeholder="Number of Items"
          />
        </form>
        <Button
          onClick={() => {
            mutate();
          }}
          className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
        >
          Create Candy Machine
        </Button>
      </div>
    </>
  );
}
