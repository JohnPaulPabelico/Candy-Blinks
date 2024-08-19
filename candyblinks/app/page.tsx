"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");
import * as web3 from "@solana/web3.js";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { useEffect, useMemo, useState } from "react";
import About from "./components/About";

export default function Home() {
  const [rendered, setrendered] = useState(false);

  useEffect(() => {
    setrendered(true);
  }, [setrendered]);

  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
    <main>
      {rendered && (
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <div>
                <NavBar />
                <Hero />
                <About />
                {/* <Hero /> */}
                <Footer />
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      )}
    </main>
  );
}
