"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) redirect("/api/auth/signin");
  });
  return (
    <div>
      <div>
        <header>
          <h1>Sign Out</h1>
        </header>
        <div>
          <button onClick={() => signOut()}>Signout</button>
        </div>
      </div>
    </div>
  );
}
