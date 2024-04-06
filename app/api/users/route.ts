import dbConnect from "@/lib/mongodb/dbConnect";
import UserModel, { IUser } from "@/models/UserModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  try {
    await dbConnect();
    const user = await UserModel.findOne({ username: "ressann" });
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
