import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

export async function GET() {
  try {
    const user = await currentUser();
    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return NextResponse.error({ status: 500 });
  }
}
