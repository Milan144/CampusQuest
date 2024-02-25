import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    // Getting params
    const seachParams = req.nextUrl.searchParams;

    const userId = seachParams.get("userId");

    console.log(userId);
    
    // Handle missing userId
    if (!userId) {
      return NextResponse.error();
    }

    // Initialize MongoDB
    const client = await clientPromise;
    const db = client.db("campusquest");

    // Get all quests
    const quests = await db.collection("Quests").find({}).toArray();

    // For each quest it looks if there is an entry in the UserQuests collection with the user id and the quest name
    const updatedQuests = await Promise.all(quests.map(async (quest) => {
      const questUserEntry = await db.collection("UserQuests").findOne({ quest: quest.name, user: userId });
      if (questUserEntry) {
        // If there is an entry, it updates the quest object with the completed status
        quest.completed = questUserEntry.completed;
      } else {
        // If there is no entry, it creates a new entry in the UserQuests collection
        const newUserQuest = {
          quest: quest.name,
          user: userId,
          completed: false
        };
        await db.collection("UserQuests").insertOne(newUserQuest);
        quest.completed = false;
      }
      return quest;
    }));

    return NextResponse.json(updatedQuests);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
