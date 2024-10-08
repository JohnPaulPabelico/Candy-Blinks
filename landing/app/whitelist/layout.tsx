import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Whitelist",
  description:
    "Create and manage your Candy Machine BLinks effortlessly with our intuitive platform. Simplify NFT distribution and minting with ease.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
