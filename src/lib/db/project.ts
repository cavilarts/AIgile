import { Db, Collection, ObjectId, OptionalId, WithId } from "mongodb";
import clientPromise from "./mongoConnection";
import { Optional, Project } from "@/types";
import { getSessionUser } from "./saveUser";

let db: Db;
let project: Collection<Optional<Project, "tasks" | "boardName">>;
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

export async function getProjectBySlug(
  slug: string
): Promise<WithId<Optional<Project, "boardName" | "tasks">> | null> {
  try {
    // const user = await getSessionUser();
    if (!project) await init();

    const result = await project.findOne({ slug });
    // const result = await project.findOne({ slug, createdBy: user.data._id });

    if (!result) return null;

    return result;
  } catch (e) {
    console.error("getProjects error", e);
    return null;
  }
}

export async function createProject(
  data: Optional<
    Project,
    "tasks" | "boardName" | "createdAt" | "lastModifiedAt"
  >
) {
  try {
    if (!project) await init();

    const result = await project.insertOne({
      ...data,
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    });

    return result;
  } catch (e) {
    console.error("createProject error", e);
    return [];
  }
}

export async function patchProject(
  id: string,
  data: Partial<Omit<Project, "createdAt" | "lastModifiedAt">>
) {
  try {
    if (!project) await init();

    const result = await project.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, lastModifiedAt: new Date() } }
    );

    return result;
  } catch (e) {
    console.error("updateProject error", e);
    return [];
  }
}
