import { Db, Collection, OptionalId, ObjectId } from "mongodb";
import clientPromise from "./mongoConnection";
import { Task } from "@/types";

let db: Db;
let task: Collection<Task>;
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

export async function createTask(data: OptionalId<Task>) {
  try {
    if (!task) await init();

    const result = await task.insertOne(task);

    return result;
  } catch (e) {
    console.error("createTask error", e);
    return [];
  }
}

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

export async function getTask(id: string) {
  try {
    if (!task) await init();

    const result = await task.findOne({ _id: new ObjectId(id) });

    return result;
  } catch (e) {
    console.error("getTasks error", e);
    return [];
  }
}

export async function updateTask(id: string, data: Task) {
  try {
    if (!task) await init();

    const result = await task.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data } }
    );

    return result;
  } catch (e) {
    console.error("updateTask error", e);
    return [];
  }
}

export async function deleteTask(id: string) {
  try {
    if (!task) await init();

    const result = await task.deleteOne({ _id: new ObjectId(id) });

    return result;
  } catch (e) {
    console.error("deleteTask error", e);
    return [];
  }
}
