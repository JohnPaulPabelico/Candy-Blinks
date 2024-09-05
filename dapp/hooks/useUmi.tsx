"use client";
import React, { useEffect, useState } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Umi } from "@metaplex-foundation/umi";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { mplCandyMachine } from "@metaplex-foundation/mpl-core-candy-machine";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

export default function useUmi() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [umi, setUmi] = useState<Umi | null>(null);

  useEffect(() => {
    setUmi(
      createUmi(connection)
        .use(walletAdapterIdentity(wallet))
        .use(mplToolbox())
        .use(mplCore())
        .use(mplCandyMachine())
    );
  }, [connection, wallet]);

  return umi;
}
