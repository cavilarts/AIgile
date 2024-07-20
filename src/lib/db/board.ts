import { Db, Collection, ObjectId } from "mongodb";
import clientPromise from "./mongoConnection";

let db: Db;
let boards: Collection<Document>;
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE_NAME);
    boards = db.collection("board");
  } catch (e) {
    console.error("MongoDB connection error", e);
  }
}

(async () => {
  await init();
})();

export async function getBoards(id: string) {
  try {
    if (!boards) await init();

    const result = await boards.findOne({ _id: new ObjectId(id) });

    return {
      board: result,
    };
  } catch (e) {
    console.error("getBoards error", e);
    return [];
  }
}
