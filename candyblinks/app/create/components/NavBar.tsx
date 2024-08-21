"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { RxDashboard } from "react-icons/rx";
import { RiEyeFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";

const NavBar: React.FC = () => {
  const [barState, setBarState] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center fixed top-0 w-full px-5 min-h-30 justify-start transition py-5 backdrop-blur-md shadow-lg bg-black/50`}
    >
      <div className="flex items-center justify-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="logo"
            width={50}
            height={50}
            className="ml-5 cursor-pointer"
          />
        </Link>
        <ul className="ml-10 flex justify-center items-center gap-5">
          <li className="text-lg dm-sans text-white ml-5 flex justify-center items-center ">
            <Link
              href={"/dashboard"}
              className="flex justify-center items-center"
            >
              <RxDashboard /> <span className="ml-2">Hub</span>
            </Link>
          </li>
          <li className="text-lg dm-sans text-red-300 ml-5 flex justify-center items-center">
            <RiEyeFill /> <span className="ml-2 ">Create</span>
          </li>
          <li className="text-lg dm-sans text-white ml-5 flex justify-center items-center">
            <Link
              href={"/settings"}
              className="flex justify-center items-center"
            >
              <IoMdSettings /> <span className="ml-2">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="ml-auto mr-5">
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
