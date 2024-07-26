import { Db, Collection, OptionalId, ObjectId } from "mongodb";
import clientPromise from "./mongoConnection";
import { TaskApi, TaskDB } from "@/types";

let db: Db;
let task: Collection<TaskDB>;
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

export async function createTask(data: TaskDB) {
  try {
    if (!task) await init();

    const result = await task.insertOne(data);

    return result;
  } catch (e) {
    console.error("createTask error", e);
    return [];
  }
}

export async function createTasks(data: TaskDB[]) {
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

export async function getTasks(boardId: string) {
  try {
    if (!task) await init();

    const result = await task.find({ boardId }).toArray();

    return result;
  } catch (e) {
    console.error("getTasks error", e);
    return [];
  }
}

export async function updateTask(
  id: string,
  data: Omit<TaskDB, "projectId" | "boardId">
) {
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

export async function getTasksByColumnId(columnId: string): Promise<TaskApi[]> {
  try {
    if (!task) await init();

    const result = await task.find({ columnId }).toArray();

    return result;
  } catch (e) {
    console.error("getTasksByColumnId error", e);
    return [];
  }
}
