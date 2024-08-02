import { Db, Collection, OptionalId, ObjectId } from "mongodb";
import clientPromise from "./mongoConnection";
import { TaskApi, TaskDB } from "@/types";
import { getSessionUser } from ".";
import { omit } from "lodash";

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
    const user = await getSessionUser();
    
    const sanitizedData = {
      ...data,
      ...(data.columnId && { columnId: new ObjectId(data.columnId) }),
      ...(data.projectId && { projectId: new ObjectId(data.projectId) }),
      createdBy: user.data._id,
    };

    const result = await task.insertOne(sanitizedData);

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

export async function patchTask(id: string, data: Partial<TaskDB>) {
  try {
    if (!task) await init();
    // Remap data if it contains an _id
    const sanitizedResult = {
      ...omit(data, "_id"),
      ...(data.projectId && { projectId: new ObjectId(data.projectId) }),
      ...(data.columnId && { columnId: new ObjectId(data.columnId) }),
      ...(data.projectId && { boardId: new ObjectId(data.projectId) }),
    };

    const result = await task.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...sanitizedResult } }
    );

    console.log('result', result);
    return result;
  } catch (e) {
    console.error("patchTask error", e);
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

    const result = await task
      .find({ columnId: new ObjectId(columnId) })
      .toArray();

    return result;
  } catch (e) {
    console.error("getTasksByColumnId error", e);
    return [];
  }
}

export async function getTasksQuery(
  query: Partial<TaskDB>
): Promise<TaskApi[]> {
  try {
    if (!task) await init();
    const sanitizedQuery = {
      ...query,
      ...(query.columnId && { columnId: new ObjectId(query.columnId) }),
      ...(query.projectId && { projectId: new ObjectId(query.projectId) }),
    };

    const result = await task.find(sanitizedQuery).toArray();

    return result;
  } catch (e) {
    console.error("getTasksQuery error", e);
    return [];
  }
}
