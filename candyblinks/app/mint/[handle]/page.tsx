import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Mint",
  description:
    "Create and manage your Candy Machine BLinks effortlessly with our intuitive platform. Simplify NFT distribution and minting with ease.",
};

interface Params {
  handle: string;
}

export default function Page({ params }: { params: Params }) {
  const { handle } = params;

  const redirectUrl = `https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fcandyblinks.fun%2Fblinks%2Fmint%2F${handle}&cluster=devnet`;

  redirect(redirectUrl);

  return null;
}
