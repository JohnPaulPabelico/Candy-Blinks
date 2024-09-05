import ConnectWallet from "@/components/connect-wallet";

import React from "react";

export default function Home() {
  return (
    <>
      <div className="w-full flex items-center justify-between p-4">
        <p>Candy Blink</p>
        <ConnectWallet />
      </div>
    </>
  );
}
