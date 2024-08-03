import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";

const wonderbar = localfont({
  src: [
    {
      path: "../public/fonts/Wonderbar Demo.otf",
      weight: "400",
    },
  ],
  variable: "--font-wonderbar",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Candy Mint",
  description: "A Candy Machine BLink Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={wonderbar.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
