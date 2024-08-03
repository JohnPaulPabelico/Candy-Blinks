import React, { useContext } from "react";
import { SiSolana } from "react-icons/si";
import { SiEthereum } from "react-icons/si";
import { SiPolygon } from "react-icons/si";

function About() {
  return (
    <div>
      <section id="about" className={`transition min-h-dvh bg-slate-900`}>
        <div className="p-20"></div>
        <div className="flex justify-center items-center h-full lg:px-0 px-10">
          <div className="text-center text-5xl space font-bold space  flex justify-center text-white items-center ">
            ABOUT THE GUILD
          </div>
        </div>
        <div className="mt-20 flex justify-center  items-center h-full">
          <div className="  min-w-4xl rounded-3xl text-2xl max-w-4xl space flex justify-center lg:mx-32 mx-10 text-white items-center text-justify">
            Welcome to Astral Gaming Guild – where the cosmos of gaming and web3
            technology collide!
            <br></br>
            <br></br>
            We are a dynamic community of gamers, explorers, and innovators
            dedicated to pushing the boundaries of the gaming universe.
            <br></br>
            <br></br>
            At Astral Gaming Guild, we harness the power of blockchain to
            enhance your gaming experience, creating a vibrant ecosystem where
            players can connect, compete, and thrive.
            <br></br>
            <br></br>Join us on this celestial journey as we redefine the future
            of gaming, one block at a time.
          </div>
        </div>
        <div className="mt-20 flex justify-center  items-center">
          <div className="space font-bold text-3xl text-white">Powered by:</div>
        </div>
        <div className="mt-10 flex justify-center  items-center">
          <ul className="flex justify-center gap-10">
            <li>
              <SiSolana
                size={70}
                className="text-white  hover:text-purple-500 hover:scale-125 transition ease-in-out duration-100"
              />
            </li>
            <li>
              <SiEthereum
                size={70}
                className="text-white hover:text-purple-500 hover:scale-125 transition ease-in-out duration-100"
              />
            </li>
            <li>
              <SiPolygon
                size={70}
                className="text-white  hover:text-purple-500 hover:scale-125 transition ease-in-out duration-100"
              />
            </li>
          </ul>
        </div>
        <div className="p-12 lg:p-0"></div>
      </section>
    </div>
  );
}

export default About;
