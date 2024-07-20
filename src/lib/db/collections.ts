import { CollectionInfo, Db } from "mongodb";
import clientPromise from "./mongoConnection";

let db: Db;
let collections: (CollectionInfo | Pick<CollectionInfo, "name" | "type">)[];
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE_NAME);
    collections = await db.listCollections().toArray();
  } catch (e) {
    console.error("MongoDB connection error", e);
  }
}

(async () => {
  await init();
})();

export async function getCollections() {
  try {
    if (!collections) await init();

    return collections.map((col) => ({
      name: col.name,
      cols: col.type,
    }));
  } catch (e) {
    console.error("getCollections error", e);
    return null;
  }
}
