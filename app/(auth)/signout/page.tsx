"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    const signout = await signOut({ callbackUrl: "/" });
  };
  useEffect(() => {
    if (!session) redirect("/api/auth/signin");
  });
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
