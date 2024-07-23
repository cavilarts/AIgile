import { Db, Collection, ObjectId, OptionalId } from "mongodb";
import clientPromise from "./mongoConnection";
import { Optional, Project } from "@/types";

let db: Db;
let project: Collection<Optional<Project, 'tasks' | 'boardName'>>;
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

export async function getProject(id: ObjectId) {
  try {
    if (!project) await init();

    const result = await project.findOne({ _id: new ObjectId(id) });

    return result;
  } catch (e) {
    console.error("getProjects error", e);
    return [];
  }
}

export async function createProject(data: Optional<Project, 'tasks' | 'boardName'>) {
  try {
    if (!project) await init();

    const result = await project.insertOne(data);

    return result;
  } catch (e) {
    console.error("createProject error", e);
    return [];
  }
}

export async function updateProject(id: ObjectId, data: Project) {
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
