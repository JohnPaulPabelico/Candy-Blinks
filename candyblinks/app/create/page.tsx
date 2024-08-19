import React from "react";

import { SignedIn } from "@clerk/nextjs";
import NavBar from "./components/NavBar";

export default async function Dashboard() {
  // // Get the userId from auth() -- if null, the user is not signed in
  // const { userId } = auth();

  // if (userId) {
  //   // Query DB for user specific information or display assets only to signed in users
  // }

  // // Get the Backend API User object when you need access to the user's information
  // const user = await currentUser();
  // // Use `user` to render user details or create UI elements

  return (
    <SignedIn>
      <NavBar />
      <div className="min-h-dvh flex justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% via-neutral-950 via-70%  to-neutral-950">
        <form className="w-full max-w-xl">
          <label className="form-control">
            <div className="label">
              <span className="label-text dm-sans text-white">
                Candy Machine ID
              </span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full bg-black text-white"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="form-control">
              <div className="label">
                <span className="label-text dm-sans text-white">Title</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full bg-black text-white"
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text dm-sans text-white">Label</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full bg-black text-white"
              />
            </label>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text dm-sans text-white">Icon URL</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full bg-black text-white"
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-white">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 w-full bg-black text-white"
              placeholder=""
            ></textarea>
          </label>
        </form>
      </div>
    </SignedIn>
  );
}
