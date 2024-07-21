import { Db, Collection, OptionalId } from "mongodb";
import clientPromise from "./mongoConnection";
import { Task } from "@/types/task.types";

let db: Db;
let task: Collection<Document>;
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE_NAME);
    task = db.collection("tasks");
  } catch (e) {
    console.error("MongoDB connection error", e);
  }
}

(async () => {
  await init();
})();

export async function createTasks(data: OptionalId<Task>[]) {
  try {
    if (!data) await init();

    const result = await task.insertMany(data);

    return result;
  } catch (e) {
    console.error("createTasks error", e);
    return [];
  }
}
