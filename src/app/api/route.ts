import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(req: NextRequest) {
  // Getting params
  const seachParams = req.nextUrl.searchParams;
  const userId = seachParams.get("userId");
  try {
    // Handle missing userId
    if (userId == 'undefined' || !userId) {
      return new NextResponse("No user", { status: 400 });
    }
    console.log(userId);

    // Initialize MongoDB
    const client = await clientPromise;
    const db = client.db("campusquest");

    // Get all quests
    const quests = await db.collection("Quests").find({}).toArray();

    // For each quest it looks if there is an entry in the UserQuests collection with the user id and the quest name
    const updatedQuests = await Promise.all(quests.map(async (quest) => {
      const questUserEntry = await db.collection("UserQuests").findOne({ quest: quest.name, user: userId });
      console.log(questUserEntry);
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
    console.log(updatedQuests);
    return NextResponse.json(updatedQuests);
  } catch (e) {
    console.error(e);
    return new NextResponse("Error", { status: 400 });
  }
}

export async function POST(req: NextRequest, res: any) {
  console.log('ici')
  // Getting params
  const seachParams = req.nextUrl.searchParams;
  const code = seachParams.get("code");
  const id = seachParams.get("id");
  console.log(code, id);
  try {
    if (!code) {
      return new NextResponse("Code not found", { status: 400 });
    }
    // Initialize MongoDB
    const client = await clientPromise;
    const db = client.db("campusquest");

    // Finding the quest by code
    const quest = await db.collection("Quests").findOne({ code: code });
    if (!quest) {
      return new NextResponse("Quest not found", { status: 400 });
    }

    console.log(quest);

    // Finding the userQuest by questName and userId and if it is not completed, it updates the completed status
    const userQuest = await db.collection("UserQuests").findOne({ quest: quest?.name, user: id });

    console.log(userQuest);

    // If its already completed, return a message
    if (userQuest && userQuest.completed) {
      console.log('quest already completed')
      return new NextResponse("Quest already completed", { status: 400 });
    } else {
      // Update the userQuest to status completed
      await db.collection("UserQuests").updateOne({ quest: quest?.name, user: id }, { $set: { completed: true } });
      console.log(await db.collection("UserQuests").findOne({ quest: quest?.name, user: id }));
      return NextResponse.json({ message: "Quest completed" });
    }
  } catch (e) {
    console.error(e);
    return new NextResponse("Error", { status: 500 });
  }
}

