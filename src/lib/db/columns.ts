import { Db, Collection, OptionalId, ObjectId } from "mongodb";
import clientPromise from "./mongoConnection";
import { Column } from "@/types/column.types";
import { Board, Optional } from "@/types";

let db: Db;
let column: Collection<Optional<Column, "description" | "companyId" | "tasks">>;
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE_NAME);
    column = db.collection("column");
  } catch (e) {
    console.error("MongoDB connection error", e);
  }
}

(async () => {
  await init();
})();

export async function getColumnsByProjectId(projectId: string) {
  if (!column) await init();

  try {
    if (!column) await init();

    const result = await column.find({ projectId }).toArray();

    return result;
  } catch (e) {
    console.error("getColumnsByProjectId error", e);
    return [];
  }
}

export async function createColumn(data: OptionalId<Column>) {
  try {
    if (!column) await init();

    const result = await column.insertOne(data);

    return {
      data: result,
    };
  } catch (e) {
    console.error("createColumn error", e);
    return [];
  }
}

export async function createColumns(
  data: OptionalId<Optional<Column, "description" | "companyId" | "tasks">>[]
) {
  try {
    if (!column) await init();

    const result = await column.insertMany(data);

    return result;
  } catch (e) {
    console.error("createColumns error", e);
    return [];
  }
}

export async function getColumn(id: string) {
  try {
    if (!column) await init();

    const result = await column.findOne({ _id: new ObjectId(id) });

    return result;
  } catch (e) {
    console.error("getColumn error", e);
    return [];
  }
}

export async function getColumns(boardId: string) {
  try {
    if (!column) await init();

    const result = await column.find({ boardId }).toArray();

    return result;
  } catch (e) {
    console.error("getColumns error", e);
    return [];
  }
}
