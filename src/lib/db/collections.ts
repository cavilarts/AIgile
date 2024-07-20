import { Db, Collection, CollectionInfo } from "mongodb";
import clientPromise from "./mongoConnection";

let db: Db;
let collections: string[];
let client;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = client.db();
    collections = (await db.listCollections().toArray()).map((col) => col.name);
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

    return {
      collections: collections,
    };
  } catch (e) {
    console.error("getCollections error", e);
    return [];
  }
}
