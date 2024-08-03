import React, { useContext } from "react";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import Link from "next/link";

function Footer() {
  return (
    <div>
      <footer className="footer footer-center p-10 bg-yellow-400 text-primary-content">
        <aside className="text-white">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className=" mb-[-20px] mt-[-20px]"
          />
          <p className="font-bold text-white">
            Candy Blinks <br />
          </p>
          <p className=" space">Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-slate-300 transition"
            >
              <BsTwitterX />
            </Link>

            {/* <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-slate-300 transition"
            >
              <BsFacebook />
            </Link>

            <Link
              href="https://discord.gg/astralember"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-slate-300 transition"
            >
              <BsDiscord />
            </Link> */}
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
