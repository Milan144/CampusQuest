import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET() {
  try {
    // Initialize MongoDB
    const client = await clientPromise;
    const db = client.db("campusquest");

    // Get all shared posts
    const share = await db.collection("Share").find({}).toArray();

    return NextResponse.json(share)
  } catch (e) {
    console.error(e);
    return new NextResponse("Error", { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  // Getting the new share object from the request body
  const share = await req.json();

  try {
    if (!share) {
      return new NextResponse("Missing datas", { status: 400 });
    }
    // Initialize MongoDB
    const client = await clientPromise;
    const db = client.db("campusquest");

    // Insert the new share object into the database
    await db.collection("Share").insertOne(share);
    
    return NextResponse.json({ message: "New post shared." });
  } catch (e) {
    console.error(e);
    return new NextResponse("Error", { status: 501 });
  }
}

