import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

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
const DM_Sans_init = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Candy Blinks",
  description: "A Candy Machine BLink Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={wonderbar.variable}>
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
