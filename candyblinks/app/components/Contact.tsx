import { FaViber, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiDiscordLine } from "react-icons/ri";
import React, { useContext } from "react";

function Contact() {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy to clipboard.");
    }
  };

  return (
    <div>
      <section
        id="contact"
        className={`lg:min-h-80 min-h-96 transition bg-slate-900`}
      >
        <div className="py-6"></div>
        <div className="flex justify-center text-center">
          <h1 className={`text-6xl font-bold space text-white`}>
            WANT TO PARTNER?
          </h1>
        </div>
        <div className="flex justify-center text-center">
          <h2 className={`text-lg tracking-widest font-bold space `}>
            CONTACT US
          </h2>
        </div>
        <div className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-4 justify-items-center">
          <div>
            <div
              className={`flex justify-center items-center py-2 px-4 space font-bold text-2xl text-white`}
            >
              <FaViber />
              <span className="ml-2">Phone/Viber</span>
            </div>
            <div>
              {" "}
              <span
                onClick={() => copyToClipboard("+63 9263 046 451")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    copyToClipboard("+63 9263 046 451");
                  }
                }}
                tabIndex={0}
                className={`flex justify-center px-4 space font-bold text-xl text-white text-opacity-70 hover:text-purple-500 transition ease-in cursor-pointer `}
              >
                +63 9263 046 451
              </span>
            </div>
          </div>

          <div className="">
            {" "}
            <div
              className={`flex justify-center items-center text-white py-2 px-4 space font-bold text-2xl `}
            >
              <MdOutlineEmail />
              <span className="ml-2">Email</span>
            </div>
            <div>
              {" "}
              <span
                className={`flex justify-center px-4 space font-bold text-xl text-white text-opacity-70 hover:text-purple-500 transition ease-in `}
              >
                <a href="mailto:marjhonmontero32@gmail.com">
                  marjhonmontero32@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="p-5"></div>
      </section>
    </div>
  );
}

export default Contact;
