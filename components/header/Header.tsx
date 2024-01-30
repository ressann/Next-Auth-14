import { navLinkData } from "@/lib/data";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession();
  return (
    <header className="p-5 bg-slate-900 text-white">
      <nav className=" flex justify-around items-center">
        <div>
          <h1>My Next Auth</h1>
        </div>
        <div className="flex gap-4 items-center">
          {navLinkData.map((data) => (
            <Link href={data.link} key={data.id}>
              {data.name}
            </Link>
          ))}
          {session ? (
            <Link
              href={"/api/auth/signout?callback=/"}
              className="px-5 py-2 hover:bg-slate-50 bg-slate-200 rounded-md text-slate-950"
            >
              Logout
            </Link>
          ) : (
            <Link
              href={"/api/auth/signin"}
              className="px-5 py-2 hover:bg-slate-50 bg-slate-200 rounded-md text-slate-950"
            >
              Signin
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
