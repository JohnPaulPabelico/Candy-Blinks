"use client";

import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { RiEyeFill } from "react-icons/ri";
import ConnectWallet from "./connect-wallet";
import { LuCandy } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" ? (
        <div
          className={`flex items-center fixed top-0 w-full px-5 min-h-30 justify-start transition py-5 backdrop-blur-md shadow-lg bg-black/50`}
        >
          <div className="flex items-center justify-center">
            <div>
              <Image
                src={"/logo.png"}
                alt="logo"
                width={50}
                height={50}
                className="ml-5 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              />
            </div>
            <ul className="ml-10 flex justify-center items-center gap-5">
              <li className="text-lg dm-sans ml-5 flex justify-center items-center">
                <Link
                  href="/dashboard"
                  className={`flex justify-center items-center ${
                    pathname === "/dashboard" ? "text-red-300" : "text-white"
                  }`}
                >
                  <RxDashboard /> <span className="ml-2">Hub</span>
                </Link>
              </li>
              <li className="text-lg dm-sans ml-5 flex justify-center items-center">
                <Link
                  href="/create"
                  className={`flex justify-center items-center ${
                    pathname === "/create" ? "text-red-300" : "text-white"
                  }`}
                >
                  <LuCandy /> <span className="ml-2">Create</span>
                </Link>
              </li>
              <li className="text-lg dm-sans ml-5 flex justify-center items-center">
                <Link
                  href="/enlist"
                  className={`flex justify-center items-center ${
                    pathname === "/enlist" ? "text-red-300" : "text-white"
                  }`}
                >
                  <RiEyeFill /> <span className="ml-2">Enlist</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="ml-auto mr-5">
            <ConnectWallet />
          </div>
        </div>
      ) : (
        // This is the NavBar for the root "/"
        <div className="flex absolute justify-between items-center top-0 w-full p-5 min-h-30">
          <div className="flex items-center justify-center">
            <span className="text-3xl dm-sans ml-5 font-bold text-red-400">
              Candy Blinks
            </span>
          </div>
          <Link
            className="text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
            href={"/dashboard"}
          >
            Create NFT Collection
          </Link>
          <div className="mr-5 items-center">
            <ConnectWallet />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
