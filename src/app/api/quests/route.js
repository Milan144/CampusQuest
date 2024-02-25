import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("campusquest");

    const quests = await db.collection("Quests").find({}).toArray();

    return NextResponse.json(quests);
  } catch (e) {
    console.error(e);
    return NextResponse.error({ status: 500 });
  }
}
