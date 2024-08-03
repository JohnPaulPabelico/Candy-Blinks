import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div>
      <section
        id="home"
        className="flex min-h-screen flex-col items-center justify-between p-12 relative bg-yellow-200"
        // style={{
        //   backgroundImage: `url(${Background.src})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPositionY: "40%",

        //   overflow: "hidden",
        // }}
      >
        <div className="mt-8 lg:mt-0 lg:flex items-center justify-center lg:justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:px-10 py-5 w-3/4">
          <div className="relative mr-8 flex justify-center"></div>

          <div>
            <div className="flex justify-center">
              <div className="text-center text-7xl font-semibold font-wonderbar flex justify-center text-red-400 items-center max-w-2xl">
                Candy BLinks
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className={`text-center mt-1 flex justify-center text-red-400 text-2xl font-bold font-wonderbar `}
              >
                Forget about dApps! Just create a BLink for your nft campaign!
              </div>
            </div>
            <div className="lg:max-w-lg "></div>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-10 gap-5">
              <span className="flex justify-center text-3xl lg:mt-8">
                <Link
                  href="/dashboard"
                  className="hover:bg-red-500 p-5 rounded-3xl bg-red-400 text-yellow-100 transition duration-300 font-wonderbar "
                >
                  Create your BLink Now!
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Hero;
