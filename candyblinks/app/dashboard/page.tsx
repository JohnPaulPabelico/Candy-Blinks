import React from "react";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements

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
    <SignedIn>
      <div className="min-h-dvh flex justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% via-neutral-950 via-70%  to-neutral-950">
        <span className="text-2xl font-bold text-white mr-10">
          MAMA MO DASHBOARD
        </span>
        <UserButton />
      </div>
    </SignedIn>
  );
}
