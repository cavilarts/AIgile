import { Db, Collection, ObjectId, OptionalId } from "mongodb";
import clientPromise from "./mongoConnection";
import { Project } from "@/types/project.types";

let db: Db;
let project: Collection<Document>;
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE_NAME);
    project = db.collection("project");
  } catch (e) {
    console.error("MongoDB connection error", e);
  }
}

(async () => {
  await init();
})();

export async function getProject(id: string) {
  try {
    if (!project) await init();

    const result = await project.findOne({ _id: new ObjectId(id) });

    return {
      data: result,
    };
  } catch (e) {
    console.error("getProjects error", e);
    return [];
  }
}

export async function createProject(data: OptionalId<Project>) {
  try {
    if (!project) await init();

    const result = await project.insertOne({
      ...data,
    });

    return result;
  } catch (e) {
    console.error("createProject error", e);
    return [];
  }
}

export async function updateProject(id: string, data: Project) {
  try {
    if (!project) await init();

    const result = await project.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data } }
    );

    return result;
  } catch (e) {
    console.error("updateProject error", e);
    return [];
  }
}
