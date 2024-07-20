import { MongoClient, Db, Collection } from "mongodb";
import clientPromise from "./mongoConnection";

let db: Db;
let boards: Collection<Document>;
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db();
    boards = db.collection("boards");
  } catch (e) {
    console.error("MongoDB connection error", e);
  }
}

(async () => {
  await init();
})();

export async function getBoards(id: number) {
  try {
    if (!boards) await init();

    const result = await boards.find({ id }).toArray();

    return {
      board: result,
    };
  } catch (e) {
    console.error("getBoards error", e);
    return [];
  }
}
