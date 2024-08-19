import React, { useContext } from "react";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import Link from "next/link";

function About() {
  return (
    <section className="flex items-center justify-center min-h-dvh bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-[#45061f]  to-20%  to-neutral-950">
      <div className="text-5xl font-bold dm-sans text-white max-w-50% leading-snug">
        What is <span className="text-red-400">Candy Blinks</span>
      </div>
    </section>
  );
}

export default About;
