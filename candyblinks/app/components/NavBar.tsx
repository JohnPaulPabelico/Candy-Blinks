import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
  });

  return (
    <div
      className={`flex items-center fixed top-0 w-full px-5 min-h-30 justify-between z-10 transition py-5 ${
        barState ? "bg-slate-950" : ""
      } ${isTop ? "lg:bg-transparent" : "backdrop-blur-md shadow-lg "}`}
    >
      <div>
        <span className="lg:ml-5 text-3xl text-red-400 font-bold dm-sans ">
          Candy Blinks
        </span>
      </div>
      <div
        className={`transition ease-out lg:static absolute lg:min-h-fit min-h-screen lg:w-auto w-full top-[100%] left-0 py-10 lg:py-0  ${
          barState ? "bg-slate-950" : "hidden lg:block"
        }`}
      >
        <ul className={`flex-col lg:flex-row flex items-center lg:gap-0`}>
          <li className={`${barState ? "block" : "lg:block hidden"}`}>
            <Link
              className={`lg:text-xl text-3xl dm-sans m-4 hover:text-slate-400 text-slate-100 transition duration-200 `}
              href="#home"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              Home
            </Link>
          </li>
          <li className={`${barState ? "block mt-8" : "lg:block hidden"}`}>
            <Link
              className={` lg:text-xl text-3xl  dm-sans m-4 hover:text-slate-400 text-slate-100 transition duration-200 `}
              href="#about"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              About
            </Link>
          </li>
          <li className={`${barState ? "block mt-8" : "lg:block hidden"}`}>
            <Link
              className={` lg:text-xl text-3xl  dm-sans m-4 hover:text-slate-400 text-slate-100 transition duration-200`}
              href="#explore"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              Explore
            </Link>
          </li>
          <li className={`${barState ? "block mt-8" : "lg:block hidden"}`}>
            <Link
              className={` lg:text-xl text-3xl  dm-sans m-4  hover:text-slate-400 text-slate-100 transition duration-200`}
              href="#contact"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className={`${barState ? "block" : "lg:block hidden"}`}>
          <div className="z-999 lg:block hidden ">
            <SignedOut>
              <div className="flex gap-2 items-center">
                {/* <Link
                  className="text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded duration-200 transition"
                  href="/dashboard"
                >
                  Get Started!
                </Link> */}
                <WalletMultiButton />
              </div>
            </SignedOut>
            <SignedIn>
              <div>
                <Link
                  className="text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded duration-200 transition"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <ul className="flex items-center">
          <li
            className={`ml-5 m-3 text-2xl cursor-pointer hover:text-slate-200 text-slate-100 transition duration-200 
              `}
          >
            {barState ? (
              <GrClose
                onClick={() => {
                  setBarState(!barState);
                  console.log(barState);
                }}
              />
            ) : (
              <FaBars
                onClick={() => {
                  setBarState(!barState);
                  console.log(barState);
                }}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
