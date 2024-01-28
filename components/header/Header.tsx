import { navLinkData } from "@/lib/data";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-5 bg-slate-900 text-white">
      <nav className=" flex justify-around items-center">
        <div>
          <h1>My Next Auth</h1>
        </div>
        <div className="flex gap-4">
          {navLinkData.map((data) => (
            <Link href={data.link} key={data.id}>
              {data.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
