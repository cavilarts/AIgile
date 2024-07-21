import { Db, Collection, ObjectId } from "mongodb";
import clientPromise from "./mongoConnection";
import { Board } from "@/types";

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

export async function getBoard(id: string) {
  try {
    if (!boards) await init();

    const result = await boards.findOne({ _id: new ObjectId(id) });

    return {
      data: result,
    };
  } catch (e) {
    console.error("getBoards error", e);
    return [];
  }
}

export async function createBoard(data: Board) {
  try {
    if (!boards) await init();

    const result = await boards.insertOne({
      ...data,
      column: [],
      tasks: [],
    });

    return result;
  } catch (e) {
    console.error("createBoard error", e);
    return [];
  }
}

export async function updateBoard(id: string, data: Board) {
  try {
    if (!boards) await init();

    const result = await boards.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    return result;
  } catch (e) {
    console.error("updateBoard error", e);
    return [];
  }
}
