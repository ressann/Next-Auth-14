"use client";
import { signOut } from "next-auth/react";

export default function page() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex gap-5 border rounded-md shadow-md p-5 w-96 flex-col">
        <header>
          <h1 className=" uppercase font-semibold">Sign Out</h1>
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </small>
        </header>
        <div>
          <button
            onClick={handleSignOut}
            className="w-full bg-slate-950 text-white py-2 rounded-md"
          >
            Signout
          </button>
        </div>
      </div>
    </div>
  );
}
