import React from "react";

import { SignedIn } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import NavBar from "./components/NavBar";

export default async function Dashboard() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements

  return (
    <SignedIn>
      <NavBar />
      <div className="min-h-dvh flex justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950  to-neutral-950">
        <span className="text-2xl font-bold text-white mr-10">
          MAMA MO SETTINGS
        </span>
      </div>
    </SignedIn>
  );
}
