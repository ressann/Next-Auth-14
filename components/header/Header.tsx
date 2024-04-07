import { getServerSession } from "next-auth";
import Nav from "@/components/header/Nav";

export const revalidate = 60;

export default async function Header() {
  const session = await getServerSession();
  console.log(session, "server");
  return (
    <header className="p-5 bg-slate-900 text-white">
      <nav className=" flex justify-around items-center">
        <div>
          <h1>My Next Auth</h1>
        </div>
        <Nav />
      </nav>
    </header>
  );
}
