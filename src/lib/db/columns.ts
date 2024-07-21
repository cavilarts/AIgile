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

export async function createColumn(data: OptionalId<Column>) {
  try {
    if (!boards) await init();

    const result = await boards.insertOne({
      ...data,
    });

    return {
      data: result,
    };
  } catch (e) {
    console.error("createColumn error", e);
    return [];
  }
}

export async function createColumns(data: OptionalId<Column>[]) {
  try {
    if (!boards) await init();

    const result = await boards.insertMany(data);

    return result;
  } catch (e) {
    console.error("createColumns error", e);
    return [];
  }
}
