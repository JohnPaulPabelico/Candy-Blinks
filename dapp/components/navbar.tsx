"use client";

import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { RiEyeFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import ConnectWallet from "./connect-wallet";
import { LuCandy } from "react-icons/lu";

const NavBar: React.FC = () => {
  return (
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
          />
        </div>
        <ul className="ml-10 flex justify-center items-center gap-5">
          <li className="text-lg dm-sans text-white ml-5 flex justify-center items-center ">
            <div className="flex justify-center items-center">
              <RxDashboard /> <span className="ml-2">Hub</span>
            </div>
          </li>
          <li className="text-lg dm-sans text-red-300 ml-5 flex justify-center items-center">
            <LuCandy /> <span className="ml-2 ">Create</span>
          </li>
          <li className="text-lg dm-sans text-white ml-5 flex justify-center items-center">
            <RiEyeFill /> <span className="ml-2 ">Enlist</span>
          </li>
          <li className="text-lg dm-sans text-white ml-5 flex justify-center items-center">
            <div className="flex justify-center items-center">
              <IoMdSettings /> <span className="ml-2">Settings</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="ml-auto mr-5">
        <ConnectWallet />
      </div>
    </div>
  );
};

export default NavBar;
