import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const DM_Sans_init = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CANDYBLINK_URL || ""),
  title: {
    default: "Candy Blinks | Candy Machine BLink Generator",
    template: "%s | Candy Blinks",
  },
  description:
    "Create and manage your Candy Machine BLinks effortlessly with our intuitive platform. Simplify NFT distribution and minting with ease.",
  openGraph: {
    title: "Candy Blinks - Candy Machine BLink Generator",
    description: "Easily generate Candy Machine BLinks",
    url: process.env.NEXT_PUBLIC_CANDYBLINK_URL || "",
    siteName: "CandyBlinks",
    type: "website",
  },
  other: {
    "dscvr:canvas:version": "vNext",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} ${DM_Sans_init.className}`}
          suppressHydrationWarning={true}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
