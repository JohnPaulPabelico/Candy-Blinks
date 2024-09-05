"use client";
import useMount from "@/hooks/useMount";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

export default function ConnectWallet() {
  const mounted = useMount();

  if (!mounted) {
    return <></>;
  }

  return <WalletMultiButton />;
}
