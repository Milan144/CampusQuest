import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET() {
  try {
    // Initialize MongoDB
    const client = await clientPromise;
    const db = client.db("campusquest");

    // Get all help requests
    const help = await db.collection("Help").find({}).toArray();

    return NextResponse.json(help)
  } catch (e) {
    console.error(e);
    return new NextResponse("Error", { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  // Getting the new help object from the request body
  const help = req.body;
  try {
    if (!help) {
      return new NextResponse("Missing datas", { status: 400 });
    }
    // Initialize MongoDB
    const client = await clientPromise;
    const db = client.db("campusquest");

    // Insert the new share object into the database
    await db.collection("Help").insertOne(help);
    
    return NextResponse.json({ message: "New help request sent." });
  } catch (e) {
    console.error(e);
    return new NextResponse("Error", { status: 501 });
  }
}
