import { Db, Collection, OptionalId } from "mongodb";
import clientPromise from "./mongoConnection";
import { Column } from "@/types/column.types";

let db: Db;
let boards: Collection<Document>;
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE_NAME);
    boards = db.collection("column");
  } catch (e) {
    console.error("MongoDB connection error", e);
  }
}

(async () => {
  await init();
})();

export async function setColumns(columns: OptionalId<Document>[]) {
  try {
    if (!boards) await init();

    return await boards.insertMany(columns);
  } catch (e) {
    console.error("setColumns error", e);
    return null;
  }
}
