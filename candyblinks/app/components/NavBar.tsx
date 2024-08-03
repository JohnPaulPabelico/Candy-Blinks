import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

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
      className={`flex items-center lg:fixed fixed top-0 w-full  px-5 min-h-30 justify-between z-10 transition py-3 ${
        barState ? "bg-slate-950" : "bg-yellow-300/50"
      } ${isTop ? "lg:bg-transparent" : "backdrop-blur-sm shadow-lg"}`}
    >
      <div>
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="ml-10 rounded-full mb-[-20px] mt-[-20px]"
        />
      </div>
      <div>
        <span className="ml-5 text-3xl text-red-400 font-bold font-wonderbar  lg:visible invisible">
          Candy Blinks
        </span>
      </div>
      <div
        className={`transition ease-out lg:ml-auto lg:static absolute  lg:min-h-fit min-h-screen lg:w-auto w-full top-[100%] left-0 py-10 lg:py-0  ${
          barState ? "bg-slate-950" : "bg-transparent"
        }`}
      >
        <ul
          className={`flex-col lg:flex-row flex items-center gap-16 lg:gap-0`}
        >
          <li className={`${barState ? "block" : "invisible lg:visible"}`}>
            <Link
              className={`lg:ml-8 lg:text-xl text-3xl  font-wonderbar font-bold rounded-full m-2 hover:text-red-500 text-red-400 transition duration-200 `}
              href="#home"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              Home
            </Link>
          </li>
          <li className={`${barState ? "block" : "invisible lg:visible"}`}>
            <Link
              className={` lg:text-xl text-3xl  font-wonderbar font-bold rounded-full m-2 hover:text-red-500 text-red-400 transition duration-200 `}
              href="#about"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              About
            </Link>
          </li>
          <li className={`${barState ? "block" : "invisible lg:visible"}`}>
            <Link
              className={` lg:text-xl text-3xl  font-wonderbar font-bold rounded-full m-2 hover:text-red-500 text-red-400 transition duration-200`}
              href="#explore"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              Explore
            </Link>
          </li>
          <li className={`${barState ? "block" : "invisible lg:visible"}`}>
            <Link
              className={` lg:text-xl text-3xl  font-wonderbar font-bold rounded-full m-2 hover:text-red-500 text-red-400 transition duration-200`}
              href="#contact"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              Contact
            </Link>
          </li>
          <li className={`${barState ? "block" : "invisible lg:visible"}`}>
            <Link
              className={`lg:ml-5 lg:text-xl text-3xl  font-wonderbar font-bold rounded-lg m-2 hover:scale-50 text-yellow-100 transition duration-200 px-5 py-1 hover:bg-red-500 bg-red-400 lg:mr-10`}
              href="https://discord.gg/astralember"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setBarState(false);
                console.log(barState);
              }}
            >
              login
            </Link>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="flex items-center">
          <li
            className={`ml-5 m-3 text-2xl cursor-pointer hover:text-slate-200 text-red-400 transition duration-200 lg:hidden
              `}
          >
            {barState ? (
              <GrClose
              // onClick={() => {
              //   setBarState(!barState);
              //   console.log(barState);
              // }}
              />
            ) : (
              <FaBars
              // onClick={() => {
              //   setBarState(!barState);
              //   console.log(barState);
              // }}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
