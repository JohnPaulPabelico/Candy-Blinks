import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";

function Footer() {
  return (
    <div>
      <div className="flex items-center flex-col justify-center p-10 bg-neutral-950 text-primary-content bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#45061f]  to-50%  to-neutral-950">
        <div className="divider "></div>
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className=" mb-[-20px] mt-[-20px]"
        />
        <div className="font-bold dm-sans text-white">
          Candy Blinks <br />
        </div>
        <div className="dm-sans text-white">
          Copyright © 2024 - All right reserved
        </div>
        <div className="mt-10 grid grid-flow-col gap-4">
          <Link
            href="https://x.com/CandyBlinks_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-3xl hover:text-slate-300 transition"
          >
            <BsTwitterX />
          </Link>
        </div>
        ;
      </div>
    </div>
  );
}

export default Footer;
