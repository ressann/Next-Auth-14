"use client";

import Link from "next/link";
import { navLinkData } from "@/lib/data";
import { useSession } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();
  return (
    <div className="flex gap-4 items-center">
      {navLinkData.map((data) => (
        <Link href={data.link} key={data.id}>
          {data.name}
        </Link>
      ))}
      {session ? (
        <Link
          href={"/signout"}
          className="px-5 py-2 hover:bg-slate-50 bg-slate-200 rounded-md text-slate-950"
        >
          Logout
        </Link>
      ) : (
        <Link
          href={"/signin"}
          className="px-5 py-2 hover:bg-slate-50 bg-slate-200 rounded-md text-slate-950"
        >
          Signin
        </Link>
      )}
    </div>
  );
}
