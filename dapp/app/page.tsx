"use client";
import ConnectWallet from "@/components/connect-wallet";
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
      <div className="w-full flex items-center justify-between p-4">
        <p>Candy Blink</p>
        <ConnectWallet />
      </div>

      <Button
        onClick={() => {
          mutate();
        }}
      >
        Fucking Create Candy Machine
      </Button>
    </>
  );
}
