import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import Providers from "@/components/providers";
import { DM_Sans } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const DM_Sans_init = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Candy Blinks | Candy Machine BLink Generator",
    template: "%s | Candy Blinks",
  },
  description:
    "Create and manage your Candy Machine BLinks effortlessly with our intuitive platform. Simplify NFT distribution and minting with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${DM_Sans_init.className} antialiased`}
      >
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
